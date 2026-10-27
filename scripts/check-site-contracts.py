"""Read-only release check for links, assets and the existing Netlify form routes."""

from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
import sys
from urllib.parse import unquote, urlsplit


FORM_NAMES = {
    "speaking-booking", "book-preorders", "be-first-to-know",
    "free2bme-updates", "supervision-interest", "associate-interest",
}


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.references = []
        self.forms = []
        self.current_form = None
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag in {"a", "link"} and attrs.get("href"):
            self.references.append((attrs["href"], tag == "a"))
        if tag in {"img", "script", "source", "track", "video"}:
            for field in ("src", "poster"):
                if attrs.get(field):
                    self.references.append((attrs[field], False))
            for item in attrs.get("srcset", "").split(","):
                if item.strip():
                    self.references.append((item.strip().split()[0], False))
        if tag == "form":
            self.current_form = {"attrs": attrs, "fields": []}
            self.forms.append(self.current_form)
        if tag in {"input", "select", "textarea"} and self.current_form is not None:
            self.current_form["fields"].append(attrs)

    def handle_endtag(self, tag):
        if tag == "form":
            self.current_form = None


def check(directory):
    root = directory.resolve()
    files = sorted(root.rglob("*.html"))
    if not files:
        return ["No built HTML pages found; run npm run build first."], 0, 0, 0
    pages = {path.resolve(): Page(path.read_text()) for path in files}
    errors = []
    seen_forms = set()
    form_instances = 0
    reference_count = 0
    for path, page in pages.items():
        name = str(path.relative_to(root))
        for identifier, count in Counter(page.ids).items():
            if count > 1:
                errors.append(f"{name}: duplicate id {identifier!r}")
        for reference, is_link in page.references:
            url = urlsplit(reference)
            if url.scheme or url.netloc:
                continue
            reference_count += 1
            target = ((root / unquote(url.path).lstrip("/")) if url.path.startswith("/")
                      else path.parent / unquote(url.path)).resolve() if url.path else path
            if not target.is_relative_to(root):
                errors.append(f"{name}: reference escapes publish directory: {reference}")
                continue
            if target.is_dir():
                target /= "index.html"
            if not target.is_file():
                errors.append(f"{name}: missing local target {reference}")
            elif is_link and url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
                errors.append(f"{name}: missing anchor {reference}")
        for form in page.forms:
            attrs = form["attrs"]
            name_attr = attrs.get("name")
            if attrs.get("data-netlify") != "true":
                continue  # The separate JavaScript reservation flow is covered by its unit tests.
            form_instances += 1
            seen_forms.add(name_attr)
            if name_attr not in FORM_NAMES:
                errors.append(f"{name}: unexpected Netlify form name {name_attr!r}")
            hidden = [f for f in form["fields"] if f.get("name") == "form-name"]
            if len(hidden) != 1 or hidden[0].get("value") != name_attr or hidden[0].get("type") != "hidden":
                errors.append(f"{name}: hidden form-name does not match {name_attr!r}")
            if attrs.get("method", "").upper() != "POST":
                errors.append(f"{name}: Netlify form must retain POST")
            action = root / attrs.get("action", "").lstrip("/") / "index.html"
            if not attrs.get("action", "").startswith("/") or not action.is_file():
                errors.append(f"{name}: missing form success page")
    for missing in sorted(FORM_NAMES - seen_forms):
        errors.append(f"Missing required Netlify form route {missing!r}")
    return errors, len(files), reference_count, form_instances


if __name__ == "__main__":
    errors, pages, references, forms = check(Path(sys.argv[1] if len(sys.argv) > 1 else "dist"))
    for error in errors:
        print("FAIL " + error)
    if errors:
        sys.exit(1)
    print(f"PASS {pages} HTML pages, {references} local references and {forms} Netlify form instances across {len(FORM_NAMES)} routes")
