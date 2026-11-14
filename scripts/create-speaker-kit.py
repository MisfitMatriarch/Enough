"""Generate Tanya's two-page speaker kit from approved site copy and photographs.
Local authoring dependencies: reportlab, fonttools[woff], brotli. No visitor data.
"""
from pathlib import Path
from tempfile import TemporaryDirectory
from fontTools.ttLib import TTFont as FontFile
from fontTools.varLib.instancer import instantiateVariableFont
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from xml.sax.saxutils import escape

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets/downloads/tanya-hicks-speaker-kit.pdf'
W,H=595.276,841.89
CREAM=HexColor('#fbf7ef'); INK=HexColor('#173d45'); TEAL=HexColor('#075c6a'); BERRY=HexColor('#a71850'); MUTED=HexColor('#495b61'); PALE=HexColor('#eaf0eb')
with TemporaryDirectory() as folder:
 for src,name in [('cormorant-garamond-400.woff2','Cormorant'),('figtree-var.woff2','Figtree')]:
  font=FontFile(ROOT/'assets/fonts'/src)
  if 'fvar' in font:font=instantiateVariableFont(font,{'wght':400},inplace=False)
  font.flavor=None;dest=Path(folder)/(name+'.ttf');font.save(dest)
  pdfmetrics.registerFont(TTFont(name,str(dest)))
 c=canvas.Canvas(str(OUT),pagesize=(W,H),pageCompression=1)
 c.setTitle('Tanya Hicks | Speaker and organiser kit')
 c.setAuthor('Tanya Hicks');c.setSubject('Speaking, MC, panels and workshops. Less fixing. More living.')
 def text(value,x,y,width,size=11.3,leading=16,font='Figtree',colour=INK):
  style=ParagraphStyle('kit',fontName=font,fontSize=size,leading=leading,textColor=colour)
  p=Paragraph(value,style);_,height=p.wrap(width,H);p.drawOn(c,x,y-height);return y-height
 def label(value,x,y):
  c.setFillColor(TEAL);c.setFont('Figtree',8.2);c.drawString(x,y,value.upper())
 def bg(page):
  c.setFillColor(CREAM);c.rect(0,0,W,H,fill=1,stroke=0)
  label('Tanya Hicks / Speaker & organiser kit',42,H-34)
  c.setStrokeColor(HexColor('#d8d7ca'));c.line(42,46,W-42,46)
  c.setFont('Figtree',8);c.setFillColor(MUTED);c.drawString(42,30,'TANYAHICKS.COM   /   NOVEMBER 2026');c.drawRightString(W-42,30,f'{page:02d}')
 def link(labeltext,url,x,y):
  c.setFont('Figtree',10);c.setFillColor(TEAL);c.drawString(x,y,labeltext)
  c.linkURL(url,(x,y-3,x+pdfmetrics.stringWidth(labeltext,'Figtree',10),y+12),relative=0,thickness=0)
 bg(1)
 label('Therapist. Speaker. Author. Founder.',42,772)
 text('Tanya<br/>Hicks',42,746,250,size=65,leading=57,font='Cormorant')
 c.drawImage(ImageReader(str(ROOT/'assets/brand/tanya-speaking-portrait-960.jpg')),310,529,width=243,height=243,mask='auto')
 text('Less fixing.<br/>More living.',42,602,250,size=34,leading=33,font='Cormorant',colour=BERRY)
 text('Life deals the cards.<br/>I teach you how to play YOURS right.',42,489,510,size=30,leading=31,font='Cormorant')
 text('Tanya Hicks brings therapeutic understanding, lived experience and community leadership into conversations about identity, change, belonging and possibility. Her work explores how recognising our strengths and accommodating our challenges can make more room for our genius and joy.',42,405,510,size=11.7,leading=17.5)
 label('Selected experience',42,306)
 rows=[('Empowering Women Expo','Sunshine Coast, 2026. Introduction and keynote moments.'),('Women Changing the World','London, 2025. Keynote and panel.'),('Neurodivergent Minds Conference','Sunshine Coast, 2025. Opening keynote and MC.')]
 y=284
 for title,desc in rows:
  text(title,42,y,510,size=20,leading=23,font='Cormorant')
  y=text(desc,42,y-26,510,size=10.5,leading=15)-19
 link('Watch Tanya speak','https://tanyahicks.com/speaking/#speaking-reel',42,95)
 link('Explore event credits','https://tanyahicks.com/media/',210,95)
 link('Enquire about your event','https://tanyahicks.com/speaking/#enquiry',386,95)
 c.showPage();bg(2)
 label('Shape the conversation around your audience',42,772)
 text('An idea your audience<br/>can take into life.',42,746,500,size=43,leading=42,font='Cormorant')
 # Two distinctly labelled talks, keeping the second a concept.
 c.setFillColor(PALE);c.rect(42,451,511,174,fill=1,stroke=0)
 label('Signature keynote',60,603)
 text('FREE 2B ME: Less Fixing. More Living.',60,586,474,size=26,leading=27,font='Cormorant')
 text('Explore the energy people spend hiding or squashing parts of themselves, and what becomes possible when the whole person is welcome. Audiences are invited to notice hidden effort, identify a useful change and give a strength or source of joy more room.',60,546,474,size=11,leading=16)
 c.setFillColor(PALE);c.rect(42,253,511,180,fill=1,stroke=0)
 label('New keynote concept',60,411)
 text('Life Deals the Cards.<br/>Learn to Play Yours Right.',60,394,474,size=26,leading=27,font='Cormorant')
 text('Recognise the strengths and challenges in your hand. Consider what to hold, what to let go and when to change your approach. Define winning for yourself and choose a next step, including the support or conditions that could make it possible.',60,328,474,size=11,leading=16)
 label('Ways to work together',42,228)
 text('Keynotes · MC and event hosting · Panels · Workshops',42,210,511,size=11.5,leading=17)
 text('For conferences, workplaces, leadership events, professional forums and community gatherings. In person or online. Format, access, dates and fees are agreed directly with Tanya.',42,180,511,size=10.5,leading=15.5)
 link('tanyahicks.com/speaking','https://tanyahicks.com/speaking/',42,105)
 link('sparkly@neurodivergentempowered.com','mailto:sparkly@neurodivergentempowered.com',42,84)
 link('Biographies & photographs','https://tanyahicks.com/media/',386,84)
 c.save()
print(OUT)
