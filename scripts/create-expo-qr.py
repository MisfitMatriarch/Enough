"""Create print assets only after verifying the public QR destination and PDF links."""
from pathlib import Path
from urllib.request import urlopen
from urllib.parse import urljoin
import json
import qrcode
import qrcode.image.svg

ROOT = Path(__file__).resolve().parent.parent
settings = json.loads((ROOT / 'content/expo.json').read_text())
if not settings['reflection']['approved']:
    raise SystemExit('Approve the PDF before generating print QR assets.')
url = settings['canonicalUrl']
with urlopen(url, timeout=20) as response:
    if response.geturl().rstrip('/') != url.rstrip('/'):
        raise SystemExit('The destination redirects elsewhere. Check the final route before printing.')
    page = response.read().decode('utf-8')
    if 'Download my free reflection sheet' not in page or settings['reflection']['url'] not in page:
        raise SystemExit('The published page does not contain the approved reflection download.')
with urlopen(urljoin(url, settings['reflection']['url']), timeout=20) as response:
    if not response.read(5).startswith(b'%PDF-'):
        raise SystemExit('The public reflection URL does not serve a PDF.')
out = ROOT / 'review' / 'qr'
out.mkdir(parents=True, exist_ok=True)
qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=32, border=4)
qr.add_data(url)
qr.make(fit=True)
qr.make_image(fill_color='black',back_color='white').save(out / 'free2bme-expo-qr.png')
qr.make_image(image_factory=qrcode.image.svg.SvgPathImage).save(out / 'free2bme-expo-qr.svg')
print('QR files created. Scan an actual-size printed proof on two phones before print release.')
