import zipfile
import xml.etree.ElementTree as ET
import json
import re

path = r"C:\Users\nadem\Downloads\TRACER STUDY ANG. 6.xlsx"
with zipfile.ZipFile(path, "r") as z:
    shared_strings = []
    if "xl/sharedStrings.xml" in z.namelist():
        ss_root = ET.fromstring(z.read("xl/sharedStrings.xml"))
        for si in ss_root.findall("{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si"):
            t = "".join([node.text or "" for node in si.iter() if node.text])
            shared_strings.append(t)

    sheet_root = ET.fromstring(z.read("xl/worksheets/sheet1.xml"))
    rows = []
    for r in sheet_root.findall(".//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}row"):
        row_cells = {}
        for c in r.findall("{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c"):
            ref = c.attrib.get("r", "")
            col = "".join([ch for ch in ref if ch.isalpha()])
            t = c.attrib.get("t")
            v = c.find("{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v")
            val = v.text if v is not None else ""
            if t == "s" and val != "":
                val = shared_strings[int(val)]
            row_cells[col] = val
        if row_cells:
            rows.append(row_cells)

headers = rows[0]
print("Total rows:", len(rows))

students = []
seen_names = set()

for i, r in enumerate(rows[1:], 1):
    raw_name = (r.get("C") or "").strip()
    if not raw_name or raw_name.upper() == "NAMA":
        continue
    
    # clean name
    name = " ".join(raw_name.split())
    
    # status in col E
    raw_status = (r.get("E") or "").strip()
    
    # detail fields
    company = (r.get("G") or r.get("T") or r.get("F") or "").replace("✔", "").strip()
    position = (r.get("I") or r.get("H") or "").replace("✔", "").strip()
    degree = (r.get("L") or r.get("J") or "").replace("✔", "").strip()
    campus = (r.get("M") or r.get("K") or "").replace("✔", "").strip()
    business = (r.get("O") or r.get("N") or "").replace("✔", "").strip()
    
    status_label = "Lulus"
    keterangan = "Alumni Angkatan 6"
    kategori = "Lainnya"

    if raw_status.lower() == "bekerja":
        kategori = "Bekerja"
        status_label = "Bekerja"
        if company and not company.isdigit():
            keterangan = f"Bekerja di {company}"
        else:
            keterangan = "Telah Bekerja"
    elif "kuliah" in raw_status.lower() or "melanjutkan" in raw_status.lower():
        kategori = "Melanjutkan Studi"
        status_label = "Kuliah"
        if campus and not campus.isdigit():
            if degree and len(degree) < 15:
                keterangan = f"{degree} di {campus}"
            else:
                keterangan = f"Kuliah di {campus}"
        else:
            keterangan = "Melanjutkan Pendidikan Tinggi"
    elif "wirausaha" in raw_status.lower():
        kategori = "Wirausaha"
        status_label = "Wirausaha"
        keterangan = "Membuka Wirausaha Mandiri"
    elif "pengangguran" in raw_status.lower():
        kategori = "Mencari Kerja"
        status_label = "Persiapan Karir"
        keterangan = "Menunggu Penempatan / Persiapan Karir"
    else:
        kategori = "Alumni"
        status_label = "Lulus Resmi"
        keterangan = "Alumni Angkatan 6 (2023/2024)"

    student_data = {
        "id": i,
        "nisn": f"006{i:04d}",
        "name": name,
        "angkatan": "6",
        "tahunLulus": "2024",
        "tahunAjaran": "2023/2024",
        "statusKelulusan": "LULUS",
        "kategori": kategori,
        "statusAktivitas": status_label,
        "keterangan": keterangan,
        "institusi": campus if kategori == "Melanjutkan Studi" else (company if kategori == "Bekerja" else ""),
        "jurusan": degree if kategori == "Melanjutkan Studi" else ""
    }
    students.append(student_data)

print(f"Total students processed: {len(students)}")
from collections import Counter
print("Kategori breakdown:", Counter(s["kategori"] for s in students))

with open(r"c:\Users\nadem\Skomda-website\frontend\src\data\alumni-angkatan-6.json", "w", encoding="utf-8") as f:
    json.dump(students, f, ensure_ascii=False, indent=2)

print("Saved to frontend/src/data/alumni-angkatan-6.json!")
