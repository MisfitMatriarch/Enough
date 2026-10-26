from PIL import Image, ImageDraw, ImageFont, ImageFilter
B='/home/user/Enough/assets/brand/'
W,H=1280,720
CREAM=(251,247,239); TEAL=(8,118,138); MAG=(171,35,110); INK=(24,51,79); GOLD=(202,164,90)
def F(n,s): return ImageFont.truetype('fonts/'+n+'.ttf',s)
# Closing card
card=Image.new('RGB',(W,H),CREAM)
band=Image.open(B+'footer-band-1024.jpg').convert('RGB'); bh=int(band.height*W/band.width); band=band.resize((W,bh),Image.LANCZOS)
mask=Image.linear_gradient('L').resize((W,bh))  # 0 top -> 255 bottom
band_y=H-int(bh*0.40); card.paste(band,(0,band_y),mask)
ph=Image.open(B+'phoenix-dark-480.png').convert('RGBA'); ph=ph.resize((190,190),Image.LANCZOS); card.paste(ph,((W-190)//2,58),ph)
d=ImageDraw.Draw(card)
def center(text,font,y,fill):
    w=d.textlength(text,font=font); d.text(((W-w)/2,y),text,font=font,fill=fill)
f=F('cormorant-garamond-500',70)
center('Less fixing.',f,268,TEAL); center('More living.',f,338,MAG)
d.line([(W/2-60,432),(W/2+60,432)],fill=GOLD,width=2)
center('tanyahicks.com',F('figtree-500',26),450,INK)
card.save('endcard.png')
# Lower third (RGBA)
lt=Image.new('RGBA',(W,H),(0,0,0,0)); d2=ImageDraw.Draw(lt)
x,y,w,h=48,40,430,92
d2.rectangle([x,y,x+w,y+h],fill=(251,247,239,236)); d2.rectangle([x,y,x+3,y+h],fill=GOLD+(255,))
d2.text((x+22,y+10),'Tanya Hicks',font=F('cormorant-garamond-500',40),fill=TEAL+(255,))
d2.text((x+23,y+58),'Empowering Women Expo · Sunshine Coast',font=F('figtree-500',17),fill=INK+(255,))
lt.save('lowerthird.png')
