"""Check the homepage change against its pinned base without network requests.

Run: python3 scripts/check-homepage.py
Browser checks remain a separate release gate.
"""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
BASE = "6968300b951726bd244cdd08a8ca7979b5547532"

class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.ids, self.links, self.assets = [], [], []
        self.h1 = 0
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.append(a["id"])
        if tag == "h1":
            self.h1 += 1
        if tag == "a" and "href" in a:
            self.links.append(a["href"])
        if "src" in a:
            self.assets.append(a["src"])
        if tag == "link" and a.get("rel") in ("stylesheet", "preload", "icon"):
            self.assets.append(a["href"])
        if "srcset" in a:
            self.assets.extend(v.strip().split()[0] for v in a["srcset"].split(","))

before = subprocess.check_output(["git", "show", BASE + ":index.html"], cwd=ROOT, text=True)
after = (ROOT / "index.html").read_text()
old, new = Page(before), Page(after)
assert new.h1 == 1, "Homepage must have one H1"
assert not [k for k, v in Counter(new.ids).items() if v > 1], "Duplicate IDs"
assert set(old.ids) <= set(new.ids), "Existing deep-link target removed"
assert {u for u in old.links if not u.startswith("#")} <= set(new.links), "Existing destination removed"
for link in new.links:
    if link.startswith("#"):
        assert link[1:] in new.ids, "Missing anchor: " + link
    elif link.startswith("/") and not link.startswith("//"):
        path = ROOT / unquote(urlsplit(link).path).lstrip("/")
        assert path.is_file() or (path / "index.html").is_file(), "Missing route: " + link
for asset in new.assets:
    if asset.startswith("/"):
        assert (ROOT / unquote(asset).lstrip("/")).is_file(), "Missing asset: " + asset
scripts = lambda s: re.findall(r"<script>([\s\S]*?)</script>", s)
assert scripts(before) == scripts(after), "Existing accessibility/acknowledgement script changed"
css = (ROOT / "assets/css/home-more-living.css").read_text()
js = (ROOT / "assets/js/home-more-living.js").read_text()
assert not re.search(r"(?:height|max-height)\s*:\s*\d+(?:d?vh|svh)", css), "Viewport-height cap"
assert not re.search(r"overflow(?:-y)?\s*:\s*(?:auto|scroll)", css), "Nested page scroller"
assert not re.search(r"addEventListener\(['\"](?:wheel|touchmove)", js), "Scroll interception"
assert 'Community partnerships' in after
assert 'Free or subsidised support and community access, subject to capacity.' not in after
assert 'Your identity is not up for debate.' in after
assert 'max-height:none;overflow:visible' in css
assert '<div hidden class="f-choices"' in after, "No-JS controls must stay hidden"
print("PASS: existing anchors, destinations, assets and accessibility scripts preserved")
print("PASS: one H1, unique IDs, valid local links, no page height cap or nested scroller")
print("PASS: community partnerships and LGBTQI+ content; progressive enhancement fallback")
