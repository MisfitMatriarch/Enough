"""Content and markup checks for the reconciled homepage. Not a browser test."""
from html.parser import HTMLParser
from collections import Counter
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
class Inspect(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack=[]; self.blocks=[]; self.active=[]; self.main=False; self.ids=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        if tag=='main':self.main=True
        if tag in ('p','h1','h2','h3','blockquote') and self.main:self.active.append([tag,[]])
        if tag not in ('area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'):self.stack.append(tag)
    def handle_endtag(self,tag):
        assert self.stack and self.stack[-1]==tag, f'Mismatched closing tag: {tag}, stack {self.stack[-5:]}'
        self.stack.pop()
        if self.active and self.active[-1][0]==tag:
            kind,parts=self.active.pop();self.blocks.append((kind,' '.join(''.join(parts).split())))
        if tag=='main':self.main=False
    def handle_data(self,data):
        for _,parts in self.active:parts.append(data)

s=(ROOT/'index.html').read_text(); page=Inspect();page.feed(s)
assert not page.stack,'Unclosed HTML elements'
long=Counter(t for _,t in page.blocks if len(t)>55)
assert not [t for t,n in long.items() if n>1], 'Repeated substantial copy'
text=' '.join(t for _,t in page.blocks)
assert text.count('You don’t have to become less of yourself to have more of a life.')==1
assert text.count('More room for the person you are.')==1
assert 'Women, in their own right' not in text and 'woman you are' not in text
assert s.count('class="route-map"')==0 and s.count('class="permission-statement"')==1
assert 'Headspace Caloundra: Rainbow Social Group' in s
assert 'Every second Monday, 3:30–4:30 pm, starting 21 September 2026.' in s
assert 'aged 12–16' in s and 'href="tel:0752224009"' in s
assert 'id="f-stage"' in s
assert 'class="effort-picture"' not in s
assert s.count('class="future-open"')==1
assert 'they don’t need permission.' in s
assert not re.search(r'<(?:aside|section) class="(?:turn|leadership|closing|lang)\b',s),'Redundant quote section'
for ref in re.findall(r'aria-(?:labelledby|controls)="([^"]+)"',s):
    assert all(i in page.ids for i in ref.split()),ref
print('PASS: balanced HTML; no repeated substantial paragraph or heading')
print('PASS: user corrections, event details, visual labels and accessible references')
print('PASS: no duplicate directory, one closing and one permission statement')
