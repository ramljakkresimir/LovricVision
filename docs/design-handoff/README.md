# Handoff: Lovrić Vision — jednostranačni web (landing)

## Overview
Jednostranačni marketinški web za Lovrić Vision — PVC i ALU stolarija (prozori, balkonska vrata) te plisé komarnici, vanjske žaluzine i ALU klizni sustavi. Tržište: Zagreb i Slavonija (HR). Cilj stranice: povjerenje kroz tehničku preciznost + prikupljanje upita za besplatnu izmjeru.

## About the Design Files
Datoteke u ovom paketu su **dizajnerske reference izrađene u HTML-u** — prototip koji pokazuje željeni izgled i ponašanje, a ne produkcijski kod za direktno kopiranje. Zadatak je **rekreirati ovaj dizajn u postojećem okruženju ciljnog projekta** (React/Next.js, Vue, Astro, WordPress tema…) koristeći njegove ustaljene obrasce i biblioteke. Ako okruženje još ne postoji, odabrati prikladan framework (za ovakvu statičnu marketinšku stranicu preporuka: Astro ili Next.js sa statičkim renderiranjem) i implementirati dizajn ondje.

`Lovric Vision.dc.html` je autorska datoteka u vlasničkom "Design Component" formatu (predložak + logička klasa). Struktura markupa i svi inline stilovi su čitljivi i mjerodavni; runtime wrapper (`support.js`, `<x-dc>`, `{{ }}` rupe, `sc-if`) nije dio isporuke i treba ga zamijeniti ekvivalentima ciljnog frameworka.

## Fidelity
**High-fidelity.** Boje, tipografija, razmaci i ponašanja su finalni i treba ih rekreirati precizno. Jedina iznimka: sve fotografije su placeholderi (prugasti pravokutnici s monospace opisom i preporučenom rezolucijom) — pravu fotografiju isporučuje klijent.

## Design Tokens

### Boje
| Token | Hex | Upotreba |
|---|---|---|
| ink | `#0E0E0D` | antracit — tamne sekcije, primarni gumb, tekst na svijetloj podlozi |
| bone | `#F3EFE7` | topla bjelokost — glavna pozadina, tekst na tamnoj podlozi |
| copper | `#B5793A` | akcent — linkovi, hover primarnog gumba, istaknuta riječ u naslovu, okviri spec-kartica |
| copper-dark | `#8E5B26` | hover linka |
| muted-on-bone | `#5A554C` | sekundarni tekst na svijetlom |
| muted-on-ink | `#A8A29A` | sekundarni tekst na tamnom |
| placeholder-bone | `#EAE4D8` | pozadina foto-placeholdera (svijetlo) |
| placeholder-ink | `#171715` | pozadina foto-placeholdera (tamno) |
| hairline-on-bone | `rgba(14,14,13,0.14)` | tanke linije/obrubi |
| hairline-on-ink | `rgba(243,239,231,0.14)` | tanke linije/obrubi |
| mono-label | `#6B6558` (svijetlo) / `#8C877E` (tamno) | monospace oznake placeholdera |

Nema gradijenata osim suptilnog `linear-gradient(180deg, #24241f, #141413)` na placeholderu visoke slike. Nema sjena nigdje na stranici.

### Tipografija
- Display / naslovi: **Fraunces** (Google Fonts, opsz 9..144, weights 300–600), koristi se isključivo `font-weight: 400`, `letter-spacing: -0.02em` do `-0.025em`, `line-height: 1.02–1.15`. Fallback: Georgia, serif.
- Tijelo: **Inter** (300/400/500). Fallback: system-ui, sans-serif.
- Monospace (samo oznake placeholdera): `ui-monospace, SFMono-Regular, Menlo, monospace`, 10.5–12px.

Skala (fluidno, `clamp()`):
| Element | Veličina |
|---|---|
| H1 hero | `clamp(42px, 5.6vw, 76px)` |
| H2 "Više od prozora" | `clamp(34px, 5vw, 68px)` |
| H2 ostale sekcije | `clamp(30px, 3.6vw, 48px)` |
| H3 scroll-blok | `clamp(20px, 2.4vw, 30px)` |
| H3 kartica usluge | `24px` |
| Hero paragraf | `17.5px / 1.65` |
| Standardni paragraf | `15–16.5px / 1.6` |
| Scroll-blok paragraf | `clamp(13px, 1.1vw, 15px) / 1.6` |
| Statistike (Fraunces) | `34px / 1` |
| Label forme | `13.5px` |
| Nav link | `14.5px` |

### Ostalo
- Border radius: **2px** (samo gumbi). Sve ostalo: 0.
- Obrubi: 1px hairline.
- Maksimalna širina sadržaja: **1240px**, horizontalni padding `clamp(20px, 4vw, 28px)`.
- Vertikalni ritam sekcija: `clamp(72px, 11vh, 130px)`.

## Screens / Views
Jedna stranica, šest sekcija odozgo prema dolje. Alternacija pozadina: bone → ink → bone → ink → bone → ink (footer).

### 1. Header (sticky)
- `position: sticky; top: 0; z-index: 50`, pozadina `rgba(243,239,231,0.92)` + `backdrop-filter: blur(10px)`, donji hairline.
- Flex red, `flex-wrap: wrap`, gap `12px clamp(16px, 2.4vw, 36px)`, padding `14px 20px`.
- Lijevo: wordmark "Lovrić Vision" u Fraunces 21px, riječ "Vision" u copper.
- Sredina/desno (`margin-left: auto`): Stolarija / Usluge / Projekti / Kontakt — 14.5px, boja muted-on-bone, sidra na `#profil`, `#usluge`, `#projekti`, `#kontakt`.
- Desno: outline gumb "Zatraži ponudu" (1px ink obrub, 9px 18px, radius 2px). Hover: ispuna ink, tekst bone.

### 2. Hero (`#vrh`, bone)
- Dvostupčani grid `repeat(auto-fit, minmax(min(100%, 380px), 1fr))`, gap `clamp(40px, 5vw, 64px)`, `align-items: end`.
- Lijevo: H1 "Preciznost<br>u svakom sloju"; paragraf (max 46ch, `text-wrap: pretty`): "PVC i ALU stolarija za kuće i poslovne objekte u Zagrebu i Slavoniji. Mjerimo, proizvodimo i ugrađujemo prozore, balkonska vrata i klizne sustave — s dokumentiranim tehničkim vrijednostima, ne obećanjima."
- Dva CTA-a (flex, gap 12px, padding 15px 30px): primarni "Zatraži ponudu" (ink ispuna, bone tekst, hover copper) → `#kontakt`; sekundarni "Pogledaj radove" (1px obrub `rgba(14,14,13,0.25)`, hover obrub ink) → `#projekti`.
- Desno: 4 statistike u gridu `repeat(auto-fit, minmax(140px, 1fr))`, gap 28px/40px. Vrijednost u Fraunces 34px, opis 14px muted:
  - 18 god. — iskustva u ugradnji
  - 2 pogona — Zagreb i Slavonija
  - 0,85 — W/m²K na Elegant 76 X
  - 10 god. — jamstva na okov
- Ispod: široki foto-placeholder, `margin-top: 72px`, visina `min(56vh, 520px)`, oznake `[ foto — otvorena balkonska vrata, pogled prema van ]` i `3200 × 1400 px`.

### 3. "Više od prozora" (`#profil`, ink) — signature scroll sekcija
Referenca ponašanja: welmonte.com (visoka slika kroz koju se skrola, informacije se otkrivaju uz nju).

- Sekcija: `position: relative; overflow: hidden`, `margin-top: 110px`, padding `clamp(70px, 12vh, 130px) 0`.
- Centrirani uvod: H2 "Više od **prozora**" (riječ "prozora" u copper) + paragraf "Pametni sustavi, vrhunski materijali i precizna ugradnja za komfor koji traje godinama." (max 46ch). Donji razmak `clamp(40px, 8vh, 90px)`.
- Ispod: jedan CSS grid s **dva djeteta u istoj ćeliji** (`grid-area: 1 / 1`), max-width 1240px:
  1. **Visoka slika** — `justify-self: center`, `width: clamp(160px, 30vw, 420px)`, `aspect-ratio: 1 / 5.4`. U produkciji: PNG s **transparentnom pozadinom**, preporučeno ~1000 × 5400 px — vertikalni prikaz prozora/profila koji se proteže kroz nekoliko ekrana. Slika se ne animira; ona je duga i korisnik skrola pored nje.
  2. **Stupac teksta** — `display: flex; flex-direction: column; justify-content: space-between`, gap `clamp(60px, 14vh, 160px)`, padding `clamp(40px, 10vh, 120px) 0`.
- Šest tekstualnih blokova naizmjenično lijevo/desno od slike:
  - Širina bloka mora se računati prema **slobodnom prostoru pored slike**, ne prema stupcu: `width: clamp(150px, calc(50% - clamp(160px, 30vw, 420px) / 2 - 30px), 340px)`.
  - Lijevi blokovi: `align-self: flex-start; text-align: right`. Desni: `align-self: flex-end; text-align: left`.
  - Sadržaj (redom):
    1. **Elegant 76 X** — "Šesterokomorni profil, 76 mm ugradbene dubine. Stabilno krilo koje ostaje ravno i nakon godina rada."
    2. **Troslojno staklo** — "4/16/4/16/4 s dva low-e sloja i punjenjem argonom. Ug 0,5 W/m²K."
    3. **Čelično ojačanje** — "Zatvoreni čelični profil u okviru i krilu — statika za velike staklene površine."
    4. **Zvučna izolacija** — "Tri brtvene ravnine i asimetrično staklo prigušuju do 42 dB vanjske buke."
    5. **Tri brtve** — "Obodno brtvljenje krila zaustavlja propuh i vlagu prije nego dođu do prostora."
    6. **0,85 W/m²K** — "Toplinska propusnost cijelog prozora, mjereno s ugradnjom po RAL smjernicama."

### 4. Naše usluge (`#usluge`, bone)
- H2 "Naše usluge" + paragraf "Sve mjerimo na licu mjesta i ugrađujemo vlastitim timom. Bez podizvođača." (donji razmak 56px).
- Grid `repeat(auto-fit, minmax(min(100%, 280px), 1fr))`, gap `clamp(32px, 4vw, 44px)`. Bez kartica, bez sjena — samo placeholder (visina 230px) + naslov + tekst.
  - **Plisé komarnici** — "Harmonika mreža bez opruga, za prozore i vrata. Nagazni profil od 6 mm, vodilica u boji stolarije."
  - **Vanjske žaluzine** — "ALU lamele C/Z 80, ručno ili motorno upravljanje sa Somfy pogonom i integracijom u pametni dom."
  - **ALU klizni sustavi** — "Podizno-klizne stijene do 3 m visine krila, s ravnim pragom i staklom bez vidljivog okvira."

### 5. Realizirani projekti (`#projekti`, ink)
- Redak: H2 "Realizirani projekti" + desno paragraf "Obiteljska kuća, Velika Gorica — 24 pozicije, ALU klizna stijena 4,2 m, vanjske žaluzine." (max 34ch), `flex-wrap: wrap`.
- Veliki placeholder `min(64vh, 620px)` — `[ foto — pročelje kuće, večernje svjetlo ]`, 3200 × 1800 px.
- Ispod tri placeholdera visine 200px: detalj okova / interijer, Osijek / ugradnja u tijeku.

### 6. Poziv na akciju (`#kontakt`, bone)
- Dva stupca `repeat(auto-fit, minmax(min(100%, 340px), 1fr))`, gap `clamp(44px, 5vw, 72px)`.
- Lijevo: H2 "Izmjera je besplatna", paragraf "Pošaljite nacrt ili samo približne dimenzije. Javljamo se u roku od jednog radnog dana s ponudom i terminom izmjere.", pa kontakt popis: Zagreb — Radnička cesta 52 / Slavonski Brod — Osječka 118 / +385 1 234 5678 (tel:) / ponude@lovricvision.hr (mailto:).
- Desno: forma, gornji hairline + padding-top 28px, gap 20px:
  - Red od dva polja: **Ime i prezime** (required), **Telefon ili e-mail** (required)
  - **Lokacija objekta** — placeholder "Zagreb, Osijek, Slavonski Brod…"
  - **Što vas zanima** — textarea 4 retka, placeholder "Npr. 12 prozora i dvoja balkonska vrata, novogradnja"
  - Gumb "Pošalji upit" (ink ispuna, hover copper), `justify-self: start`.
  - Text inputi: bez okvira, samo donja linija `1px rgba(14,14,13,0.3)`; fokus → linija copper. Textarea: puni 1px obrub, fokus copper. Font 16px (sprječava zoom na iOS-u).

### 7. Footer (ink)
- Grid `repeat(auto-fit, minmax(min(100%, 200px), 1fr))`, gap 40px, padding `64px 0 40px`.
- Stupci: wordmark + "PVC i ALU stolarija, sjenila i klizni sustavi. Zagreb i Slavonija." | Zagreb (Radnička cesta 52, pon–pet 8–16 h) | Slavonija (Osječka 118, Sl. Brod, pon–pet 8–16 h) | Kontakt (telefon, e-mail).
- Donji red iznad hairlinea: "© 2026 Lovrić Vision d.o.o." i "OIB 12345678901".

## Interactions & Behavior
- **Scroll reveal (jedina animacija na stranici).** Šest `[data-feat]` blokova u `#profil` startaju na `opacity: 0; transform: translateY(16px)`. IntersectionObserver s `rootMargin: '0px 0px -22% 0px'` postavlja `opacity: 1; transform: none`; tranzicija `opacity .7s ease, transform .7s ease`. Nakon prvog otkrivanja element se prestaje promatrati (bez ponovnog skrivanja pri skrolanju gore).
- **prefers-reduced-motion: reduce** → blokovi se odmah postavljaju na vidljivo stanje, observer se ne kreira; `scroll-behavior` se vraća na `auto`.
- **Smooth scroll** na `html` za navigacijska sidra.
- **Hover:** primarni gumbi ink → copper; outline gumb → ispuna ink; linkovi copper → `#8E5B26` s podcrtom.
- **Fokus:** globalno `:focus-visible { outline: 2px solid #B5793A; outline-offset: 3px }` — mora ostati vidljiv u implementaciji.
- **Forma:** submit se presreće (`preventDefault`), stanje `sent` prebacuje formu u potvrdu: okvir 1px copper, pozadina `rgba(181,121,58,0.07)`, naslov "Upit je zaprimljen" (Fraunces 26px) + "Hvala. Javljamo se na navedeni kontakt u roku od jednog radnog dana." U produkciji: zamijeniti stvarnim slanjem (validacija, honeypot/anti-spam, e-mail na ponude@lovricvision.hr).
- **Nema fade-in animacija po ostalim sekcijama** — namjerno.

## State Management
Jedno stanje: `sent: boolean` (forma poslana). Bez dohvaćanja podataka; sav sadržaj je statičan.

## Responsive behavior
Bez media queryja — sve je riješeno s `clamp()`, `min()`, `max()` i `grid-template-columns: repeat(auto-fit, minmax(min(100%, Npx), 1fr))`, pa se stupci prelamaju sami. Dvije stvari provjeriti pri implementaciji:
1. U `#profil` tekstualni blokovi ne smiju prelaziti preko visoke slike na širinama ≥ ~768px (formula gore to rješava); ispod ~420px dopušten je minimum od 150px pa blok može lagano zaći na sliku — ako se koristi PNG s transparentnom pozadinom to je prihvatljivo, inače na mobitelu složiti slika-pa-tekst jedno ispod drugog.
2. Sticky header se prelama u dva reda na uskim ekranima — u produkciji razmotriti hamburger izbornik ispod ~640px.

## Assets
Nema isporučenih slika. Svi vizuali su placeholderi (`repeating-linear-gradient` pruge + monospace opis). Klijent isporučuje:
| Mjesto | Sadržaj | Preporučeno |
|---|---|---|
| Hero | Otvorena balkonska vrata, pogled prema van | 3200 × 1400 px |
| #profil | **Vertikalni prozor/profil, PNG s transparentnom pozadinom** | ~1000 × 5400 px |
| Usluge ×3 | Plisé komarnik, vanjske žaluzine, ALU klizni sustav | ~1200 × 900 px |
| Projekti | Pročelje kuće, večernje svjetlo | 3200 × 1800 px |
| Projekti ×3 | Detalj okova, interijer (Osijek), ugradnja u tijeku | ~1200 × 800 px |

Fontovi: Fraunces i Inter s Google Fontsa (`display=swap`). U produkciji ih po mogućnosti self-hostati.

Napomena: svi podaci (adrese, telefon, e-mail, OIB, statistike, brojevi projekata) su placeholderi iz dizajna — potvrditi s klijentom prije objave.

## Files
- `Lovric Vision.dc.html` — cjeloviti dizajn (izvorna datoteka iz alata).
- `README.md` — ovaj dokument.
