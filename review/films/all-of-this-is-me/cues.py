import json
# Edit decision list (source seconds on the review copy)
A=(1.05,3.75); Bs=(13.75,45.25); XF=0.12
offB=(A[1]-A[0])-Bs[0]-XF   # B starts where A ends, minus the crossfade
# Measured speech segments (source seconds) with reconciled wording, split into caption lines
segs=[
 (1.16,3.53,["…embracing who I am."]),
 (13.92,21.63,["So I learned my mindfulness and yoga training from Tammy,","and one of the beautiful things about mindfulness is acceptance."]),
 (22.63,26.17,["Acceptance.","Acceptance for all of you."]),
 (26.44,31.45,["So instead of trying to squash this little bit here","that you don’t like, and you kick it and try and"]),
 (31.53,35.26,["boot it out the door, accepting,","getting the heart bigger,"]),
 (36.07,37.42,["and accepting all of it."]),
 (37.58,40.90,["And that’s what I’ve been on a journey to do,"]),
 (40.97,44.60,["and I’ve had an amazing team of different people","that have helped me in doing that."]),
]
cues=[]
for s,e,lines in segs:
    tot=sum(len(l) for l in lines); t=s
    for l in lines:
        d=(e-s)*len(l)/tot; cues.append((t,t+d,l)); t+=d
def out(t): return t-A[0] if t<=A[1] else t+offB
def ts(t,vtt):
    h=int(t//3600); m=int(t%3600//60); s=t%60
    return f"{h:02d}:{m:02d}:{s:06.3f}" if vtt else f"{h}:{m:02d}:{s:05.2f}"
vtt=["WEBVTT",""]; ass_ev=[]
for i,(s,e,l) in enumerate(cues,1):
    a,b=out(s),out(e)+0.15
    if i<len(cues): b=min(b,out(cues[i][0])-0.02)
    vtt+= [str(i),f"{ts(a,True)} --> {ts(b,True)}",l,""]
    ass_ev.append(f"Dialogue: 0,{ts(a,False)},{ts(b,False)},Cap,,0,0,0,,{l}")
open('all-of-this-is-me.en.vtt','w').write("\n".join(vtt))
hdr="""[Script Info]
ScriptType: v4.00+
PlayResX: 1280
PlayResY: 720
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,Figtree,34,&H00FFFFFF,&H00FFFFFF,&H3A4F3318,&H3A4F3318,0,0,0,0,100,100,0,0,3,9,0,2,120,120,44,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
open('captions.ass','w').write(hdr+"\n".join(ass_ev)+"\n")
json.dump({'A':A,'B':Bs,'xf':XF,'speech_len':(A[1]-A[0])+(Bs[1]-Bs[0])-XF},open('edl.json','w'))
print(open('all-of-this-is-me.en.vtt').read()); print('speech length',(A[1]-A[0])+(Bs[1]-Bs[0])-XF)
