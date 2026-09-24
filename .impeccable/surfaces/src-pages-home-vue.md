---
version: 1
slug: "src-pages-home-vue"
primary_target: "src/pages/home.vue"
related_targets: ["src/pages/catalog.vue","src/pages/product.vue","src/pages/checkout.vue"]
---

# Surface: storefront (home, catalogue, product, checkout)

Mode: Persuade on home; Operate on catalogue, product, cart and checkout, inside the same world.

Audience and job: a hiring manager clicking through a portfolio store for a few minutes; in fiction, a streetwear shopper picking a pair and a size. Success: home → catalogue → product → size → cart → checkout with no dead end, and a memory of the box wall.

Constraints: Vue 3 + Tailwind + SCSS, no new npm deps, fonts via Google Fonts link, GitHub Pages subpath, photos are mixed Unsplash shots with varied backgrounds.

## Direction contract

THESIS: Every pair is a box in a wall, and the end label of the box is the product card. Refuses the white grid of floating packshots that every sneaker store ships.

OWN-WORLD: Kraft box-board orange owns the page as ground. Ink-black print: condensed caps for names and headlines, monospaced digits for size runs, prices and codes. Tissue white appears only inside an opened box (photo wells, drawer, cart, forms). Every label carries a vertical colourway chip strip on its right edge and a finger notch on its top edge. 1.5px ink rules, square corners, no shadows, no gradients. Depth comes from overlap and offset only.

STORY: The visitor sees a wall of labelled boxes and gets it immediately: a multi-brand sneaker store. They pull a box (it slides out), open it (product page: tissue, photos, full label), pick a size straight off the printed size run, and drop the box in the bag.

FIRST VIEWPORT: Left five columns: a huge condensed two-line slogan, one mono line under it, primary «Открыть каталог» and secondary «Новинки», three small "new on the shelf" labels below. Right seven columns: a wall of box ends, three across; one box is pulled out and open, a real photo sitting on tissue. Bottom strip: live catalogue counters (pairs, brands, size range) and the most-wanted pair.

FORM: challenger textiles-weave-drape-fashion-sneaker-box-stacks, verdict wins over grounded candidate 6 (court markings); seed key 53486fc7, re-roll 1. Signature interaction: box pull on hover and focus, lid lift into the product page. Motion grammar: pull 180ms, lid 320ms, reduced motion becomes a cross-fade.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Mixed Unsplash backgrounds: photos sit in tissue wells with object-fit contain to unify them.
