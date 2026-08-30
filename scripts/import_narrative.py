# scripts/import_narrative.py
"""One-shot: convert Finally-Narasi-Pertama into MDX posts (first archive)."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "private" / "_narrative_raw.txt"
OUT = ROOT / "src" / "content" / "posts"

# Piece definitions: title marker → metadata
# Body starts after metadata block (after "Lapisan makna" line) or after title for pengantar.
PIECES = [
    {
        "marker": "Kata pengantar",
        "title": "Kata Pengantar — The Narrative Ideas",
        "slug": "kata-pengantar-the-narrative-ideas",
        "category": "notes",
        "tags": ["the-narrative", "pengantar", "refleksi"],
        "date": "2025-01-01",
        "featured": True,
        "excerpt": "Buku ini berisi kumpulan narasi dan fragmen dari luka dan kesadaran — dibuka lewat kata pengantar penulis.",
        "pullQuote": "Menulis membuat saya mengenal diri saya lebih dalam.",
        "subtitle": "The Narrative - Ideas",
        "meta_skip": False,
        "is_pengantar": True,
    },
    {
        "marker": "Anak Miskin",
        "title": "Anak Miskin",
        "slug": "anak-miskin",
        "category": "notes",
        "tags": ["the-narrative", "sosial", "eksistensial"],
        "date": "2025-01-08",
        "featured": False,
        "excerpt": "Narasi reflektif tentang kemiskinan, moral, dan nasib - penderitaan kelas bawah sebagai cermin eksistensi.",
        "pullQuote": "Harapan hanyalah omong kosong, dan ketakutan adalah jiwa kami.",
        "subtitle": "Narasi reflektif + kritik sosial",
    },
    {
        "marker": "Penyakitan",
        "title": "Penyakitan",
        "slug": "penyakitan",
        "category": "notes",
        "tags": ["the-narrative", "tubuh", "psikologis"],
        "date": "2025-01-15",
        "featured": False,
        "excerpt": "Tubuh sebagai simbol penderitaan jiwa — sakit yang bukan hanya biologis, tapi spiritual.",
        "pullQuote": "Kesepian adalah kematian. Dan itu menakutkan, lebih dari apa pun.",
        "subtitle": "Narasi psikologis",
    },
    {
        "marker": "Menjadi Tolol, Untuk Melawak",
        "title": "Menjadi Tolol, Untuk Melawak",
        "slug": "menjadi-tolol-untuk-melawak",
        "category": "notes",
        "tags": ["the-narrative", "identitas", "sosial"],
        "date": "2025-01-22",
        "featured": False,
        "excerpt": "Perjuangan diterima: antara diriku yang asli dan diriku yang mereka sukai.",
        "pullQuote": "Aku terlalu tolol untuk menjadi diriku sendiri.",
        "subtitle": "Narasi realis + kritik sosial",
    },
    {
        "marker": "Kesepian Yang Dididik",
        "title": "Kesepian Yang Dididik",
        "slug": "kesepian-yang-dididik",
        "category": "esai",
        "tags": ["the-narrative", "kesepian", "sosial"],
        "date": "2025-01-29",
        "featured": False,
        "excerpt": "Lingkungan yang mengajarkan keterasingan — adaptasi semu, penerimaan palsu, dan kesendirian yang dipelajari.",
        "pullQuote": "Biarlah kesepian ini menjadi satu-satunya pelajaran yang masih bisa kuterima.",
        "subtitle": "Narasi reflektif tentang lingkungan sosial",
    },
    {
        "marker": "Anak Dari Diam",
        "title": "Anak Dari Diam",
        "slug": "anak-dari-diam",
        "category": "notes",
        "tags": ["the-narrative", "identitas", "keluarga"],
        "date": "2025-02-05",
        "featured": False,
        "excerpt": "Diam ayah, pencarian jati diri, dan kesadaran yang tumbuh tanpa suara.",
        "pullQuote": "Mungkin diamnya ayah bukan kekosongan, tapi kesederhanaan yang tak sempat kupahami.",
        "subtitle": "Narasi biografis-fiktif",
    },
    {
        "marker": "Nadir",
        "title": "Nadir",
        "slug": "nadir",
        "category": "esai",
        "tags": ["the-narrative", "kesendirian", "filosofi"],
        "date": "2025-02-12",
        "featured": True,
        "excerpt": "Kesepian sebagai jalan menuju kesadaran — catatan tentang pemuda Nadir dan kesendirian yang melahirkan makna.",
        "pullQuote": "Siapa pun yang telah terjatuh ke dunia, ia tetap bermakna, sebab ia adalah Tuhan itu sendiri.",
        "subtitle": "Fiksi eksistensial / narasi filosofis",
    },
    {
        "marker": "Vespera",
        "title": "Vespera",
        "slug": "vespera",
        "category": "esai",
        "tags": ["the-narrative", "cinta", "kesepian"],
        "date": "2025-02-19",
        "featured": True,
        "excerpt": "Dari mengamati cinta orang lain hingga berani menjalaninya — kebahagiaan yang lahir dari keberanian, bukan pengamatan.",
        "pullQuote": "Beruntung sekali aku menemukannya — kesepian lain yang mau menerima dan mengubahku.",
        "subtitle": "Narasi romantis-eksistensial",
    },
    {
        "marker": "Etherea",
        "title": "Etherea",
        "slug": "etherea",
        "category": "esai",
        "tags": ["the-narrative", "kematian", "metafisik"],
        "date": "2025-02-26",
        "featured": False,
        "excerpt": "Setelah kematian, pencarian tentang makna dan Tuhan larut menjadi cahaya hampa — dan ketidakpastian tetap bagian dari ada.",
        "pullQuote": "Di sini aku tidak merasakan apa pun — hanya cahaya tanpa tugas menyinari cerminnya.",
        "subtitle": "Prosa metafisik",
    },
    {
        "marker": "Anak Itu Aku",
        "title": "Anak Itu Aku",
        "slug": "anak-itu-aku",
        "category": "esai",
        "tags": ["the-narrative", "trauma", "identitas"],
        "date": "2025-03-05",
        "featured": False,
        "excerpt": "Gion — masa kecil yang penuh luka, isolasi, dan pembentukan diri hingga ia hanya menunggu kematian dengan damai yang pahit.",
        "pullQuote": "Selamat tinggal masa laluku. Benar. Aku Gion.",
        "subtitle": "Narasi psikologis + biografi karakter",
    },
]


def clean_text(s: str) -> str:
    s = s.replace("\uFFFD", "—")
    s = s.replace("�", "—")
    # normalize weird spaces
    s = re.sub(r"[ \t]+", " ", s)
    return s.strip()


def is_meta_line(line: str) -> bool:
    prefixes = (
        "Jenis Teks",
        "Tema Utama",
        "Sub Tema",
        "Lapisan makna",
    )
    return any(line.startswith(p) for p in prefixes)


def split_sections(paras: list[str]) -> dict[str, list[str]]:
    """Return marker -> list of body paragraphs (cleaned)."""
    # Find indices of piece markers (exact title lines)
    markers = [p["marker"] for p in PIECES]
    indices: list[tuple[str, int]] = []
    for i, line in enumerate(paras):
        if line in markers:
            indices.append((line, i))

    sections: dict[str, list[str]] = {}
    for n, (marker, start) in enumerate(indices):
        end = indices[n + 1][1] if n + 1 < len(indices) else len(paras)
        chunk = paras[start + 1 : end]  # skip title line itself
        sections[marker] = chunk
    return sections


def body_from_chunk(chunk: list[str], is_pengantar: bool = False) -> str:
    i = 0
    if not is_pengantar:
        while i < len(chunk):
            line = chunk[i]
            if not line:
                i += 1
                continue
            if is_meta_line(line):
                i += 1
                continue
            break

    paras_out: list[str] = []
    for line in chunk[i:]:
        line = clean_text(line) if line else ""
        if not line:
            continue
        if is_meta_line(line) and not is_pengantar:
            continue
        paras_out.append(line)

    md_parts: list[str] = []
    for p in paras_out:
        if p in {"—", "-", "–", "―"}:
            md_parts.append("---\n")
            continue
        if (p.startswith("“") or p.startswith('"') or p.startswith("‘")) and len(p) < 220:
            md_parts.append(f"> {p}\n")
            continue
        md_parts.append(f"{p}\n")

    return "\n".join(md_parts).strip() + "\n"


def reading_time(text: str) -> int:
    words = len(re.findall(r"\w+", text, flags=re.UNICODE))
    return max(1, round(words / 200))


def frontmatter(meta: dict, body: str) -> str:
    rt = reading_time(body)
    tags = ", ".join(f'"{t}"' for t in meta["tags"])
    sub = meta.get("subtitle") or ""
    cover = f"/images/covers/{meta['category']}/{meta['slug']}.webp"
    return f"""---
title: "{meta['title']}"
subtitle: "{sub}"
category: "{meta['category']}"
tags: [{tags}]
date: "{meta['date']}"
slug: "{meta['slug']}"
featured: {str(meta['featured']).lower()}
excerpt: "{meta['excerpt']}"
coverImage: "{cover}"
readingTime: {rt}
pullQuote: "{meta['pullQuote']}"
series: "The Narrative - Ideas"
seriesOrder: {meta.get('order', 0)}
---

"""


def main():
    raw = RAW.read_text(encoding="utf-8")
    paras = [clean_text(p) if p.strip() else "" for p in raw.split("\n")]
    sections = split_sections(paras)

    OUT.mkdir(parents=True, exist_ok=True)

    # Delete existing posts
    for old in OUT.glob("*.mdx"):
        old.unlink()
        print("deleted", old.name)

    missing = []
    for order, meta in enumerate(PIECES, start=1):
        meta = {**meta, "order": order}
        marker = meta["marker"]
        if marker not in sections:
            missing.append(marker)
            continue
        body = body_from_chunk(
            sections[marker],
            is_pengantar=meta.get("is_pengantar", False),
        )
        content = frontmatter(meta, body) + body
        path = OUT / f"{meta['slug']}.mdx"
        path.write_text(content, encoding="utf-8")
        print(f"wrote {path.name} ({reading_time(body)} min, {meta['category']})")

    if missing:
        raise SystemExit(f"Missing sections: {missing}")

    print("done. posts:", len(list(OUT.glob('*.mdx'))))


if __name__ == "__main__":
    main()
