"""Generate the one-page review PDF. Run with the bundled Python runtime."""
from pathlib import Path
from tempfile import TemporaryDirectory
from fontTools.ttLib import TTFont as Font
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parent.parent
out = ROOT / 'review' / 'more-room-for-me.pdf'
out.parent.mkdir(exist_ok=True)
with TemporaryDirectory() as temporary:
    for name, source in [('Figtree', 'figtree-var.woff2'), ('Cormorant', 'cormorant-garamond-500.woff2')]:
        font = Font(ROOT / 'assets/fonts' / source)
        if 'fvar' in font:
            from fontTools.varLib.instancer import instantiateVariableFont
            font = instantiateVariableFont(font, {'wght': 400}, inplace=False)
        font.flavor = None
        target = Path(temporary) / (name + '.ttf')
        font.save(target)
        pdfmetrics.registerFont(TTFont(name, str(target)))
    c = canvas.Canvas(str(out), pagesize=A4)
    c.setTitle('More room for me | FREE 2B ME')
    c.setAuthor('Tanya Hicks')
    w, h = A4
    c.setFillColor(HexColor('#FBF7EF')); c.rect(0, 0, w, h, fill=1, stroke=0)
    c.drawImage(str(ROOT / 'assets/brand/phoenix-dark-240.png'), 46, h-109, 68, 68, mask='auto')
    c.setFillColor(HexColor('#082B58')); c.setFont('Figtree', 12)
    c.drawString(130, h-67, 'FREE 2B ME'); c.setFont('Figtree', 10)
    c.drawString(130, h-86, 'Less fixing. More living.')
    c.setFont('Cormorant', 37); c.drawString(46, h-165, 'MORE ROOM FOR ME')
    c.setFont('Figtree', 14); c.drawString(46, h-197, 'What would make you more free to be you?')
    c.setFont('Figtree', 13)
    y = h-248
    for prompt in ['More of this:', 'Less of this:', 'Something that would help:']:
        c.setFillColor(HexColor('#082B58')); c.drawString(46, y, prompt)
        c.setStrokeColor(HexColor('#8798A9')); c.setLineWidth(.6)
        for offset in [32, 63]: c.line(46, y-offset, w-46, y-offset)
        y -= 111
    c.setFillColor(HexColor('#082B58')); c.setFont('Figtree', 11)
    c.drawString(46, 248, 'WORDS YOU CAN BORROW')
    c.setFont('Figtree', 12)
    for line, yy in [('“What would help me take part is…”', 215), ('“Could we try a different way?”', 188), ('“I’d like support with this, while keeping a say.”', 161)]:
        c.drawString(46, yy, line)
    c.setFont('Cormorant', 23); c.drawString(46, 108, 'Keep making room for you.')
    c.setFont('Figtree', 9); c.drawString(46, 52, 'Tanya Hicks · free2bme.global/free2bme/')
    c.setStrokeColor(HexColor('#1DB8CF')); c.setLineWidth(3); c.line(46, 78, w-46, 78)
    c.showPage(); c.save()
print(out)
