## Apply the SEO/AEO edits described in the upload

The upload is a Lovable chat log describing SEO/AEO changes a prior session claimed to ship. The current site is missing most of them. I'll implement each item to match.

### 1. Homepage & root metadata
- Change `src/routes/index.tsx` `<title>` to: `Online GLP-1 Weight Loss Program | Compounded Semaglutide & Tirzepatide | ChubbyNoMore`
- Rewrite the home meta description to a keyword-forward one-sentence version (who it's for, what it is, delivery/pricing highlights).
- Keep `__root.tsx` as sitewide defaults (og:type website, twitter card, social image).

### 2. New H2 sections on the home page (query-driven, AEO-friendly)
Add three new sections between existing sections (after `CompoundedVsBrand`, before `HowItWorks`):
- **"Who qualifies for GLP-1 weight loss treatment?"** — short paragraph + bulleted eligibility criteria (BMI ≥ 30, or ≥ 27 with a weight-related condition, adult, US-based, not pregnant, no contraindications).
- **"Semaglutide vs Tirzepatide — which is right for me?"** — intro paragraph plus a **comparison table** covering: drug class, trial data (STEP-1 vs SURMOUNT-1 average loss), dosing schedule, price, brand equivalents, common side effects, best fit.
- **"Who this is not for"** — bulleted list of contraindications (personal/family history of MTC or MEN 2, pregnancy/breastfeeding, active pancreatitis, severe GI disease, under 18, etc.).

### 3. Per-medication detail pages at `/medications/$slug`
Create `src/routes/medications.$slug.tsx` with real content for 8 slugs:
`semaglutide, tirzepatide, foundayo, wegovy-tablets, zepbound, wegovy-pens, ozempic, mounjaro`

Each page renders:
- Hero: name, tag row (brand vs compounded), price, "Check if I qualify" CTA
- Summary paragraph
- **Who is this for** (candidate profile)
- **Who this is not for** (contraindications)
- **Dosage** table (titration schedule)
- **Common side effects** + **Serious side effects**
- **Monitoring plan**
- **Pricing**
- **FAQs** (4–6 per medication)
- Data lives in a `medications` map keyed by slug in `src/data/medications.ts`.

Per-page head() sets:
- `<title>` — `${name} — Online prescription & pricing | ChubbyNoMore`
- `description` — one-sentence, keyword-forward
- `<link rel="canonical">` to `https://chubbynomore.com/medications/${slug}` (leaf only)
- og:title, og:description, og:type=article, og:url
- JSON-LD scripts: `Drug` schema (name, activeIngredient, drugClass, prescriptionStatus) **and** `FAQPage` schema built from the page's FAQ list.

### 4. Wire the pricing cards to detail pages
On the home page, the "Learn more" button in `DetailedProductCard` currently opens the qualify modal. Change it to `<Link to="/medications/$slug" params={{ slug: card.id }}>` so each medication card links to its detail page. Keep "Get Started" opening the modal.

### 5. sitemap + routeTree
- Update `public/robots.txt` / add `src/routes/sitemap[.]xml.ts` with the 8 medication URLs + `/`.
- Let the TanStack Router plugin regenerate `routeTree.gen.ts` (no manual edit).

### Technical notes
- No backend changes; all content is static.
- No changes to unrelated sections (Hero, cards, FAQ, marquee, footer, modal).
- Uses existing color tokens and typography; no new deps.

### Out of scope
- Rewriting hero copy or visuals.
- Building a CMS or fetching medication content from a database.
- Blog/article routes.

Proceed?