import fitz

pdf_path = r'C:\Users\sagnikadmin\Desktop\CV_Sagnik\Sagnik_Dutta_RESUME.pdf'
doc = fitz.open(pdf_path)
print(f'pages={len(doc)}')
for i, page in enumerate(doc, 1):
    text = page.get_text('text', sort=True)
    print(f'--- PAGE {i} ---')
    print(text)
