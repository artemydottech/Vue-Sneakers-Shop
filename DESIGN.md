---
name: Пара
description: A multi-brand sneaker store drawn as a wall of kraft shoe boxes, where each box end label is the product card.
colors:
  board: "#d6bc96"
  board-side: "#ad8b61"
  board-deep: "#6f5236"
  board-shelf: "#c3a47b"
  ink: "#15110e"
  ink-soft: "#2a211b"
  tissue: "#f5f2ec"
  tissue-lit: "#ffffff"
  forest: "#4f6b46"
  brick: "#a8352a"
typography:
  display:
    fontFamily: "Oswald, 'Arial Narrow', sans-serif"
    fontSize: "clamp(3rem, 6.4vw, 5.25rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Oswald, 'Arial Narrow', sans-serif"
    fontSize: "3.75rem"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: "0.01em"
  title:
    fontFamily: "Oswald, 'Arial Narrow', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: "0.01em"
  body:
    fontFamily: "'Golos Text', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    fontFeature: "'tnum' 1"
  body-sm:
    fontFamily: "'Golos Text', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  label:
    fontFamily: "Oswald, 'Arial Narrow', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.43
    letterSpacing: "0.06em"
  mono:
    fontFamily: "'JetBrains Mono', ui-monospace, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.33
  price:
    fontFamily: "'JetBrains Mono', ui-monospace, Menlo, monospace"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.25
rounded:
  none: "0px"
  notch: "9999px"
spacing:
  wall-gap: "10px"
  label-pad: "16px"
  card-gap: "20px"
  gutter-sm: "16px"
  gutter-md: "24px"
  gutter-lg: "40px"
  section: "64px"
  container: "1440px"
components:
  button-solid:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.tissue}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  button-solid-hover:
    backgroundColor: "{colors.ink-soft}"
    textColor: "{colors.tissue}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.tissue}"
  button-line-tissue:
    backgroundColor: "{colors.tissue}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  field:
    backgroundColor: "{colors.tissue}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  field-hover:
    backgroundColor: "{colors.tissue-lit}"
  chip:
    backgroundColor: "{colors.tissue}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
  chip-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.tissue}"
  size-cell:
    backgroundColor: "{colors.tissue}"
    textColor: "{colors.ink}"
    typography: "{typography.mono}"
    rounded: "{rounded.none}"
    height: "56px"
  size-cell-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.tissue}"
  size-cell-sold-out:
    backgroundColor: "rgba(173, 139, 97, 0.4)"
    textColor: "{colors.ink}"
  box-label:
    backgroundColor: "{colors.board}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "20px 16px 16px"
  box-side:
    backgroundColor: "{colors.board-deep}"
    rounded: "{rounded.none}"
  photo-well:
    backgroundColor: "{colors.tissue}"
    rounded: "{rounded.none}"
    padding: "10px"
  stamp-sale:
    backgroundColor: "{colors.brick}"
    textColor: "{colors.tissue}"
    typography: "{typography.mono}"
    rounded: "{rounded.none}"
    padding: "4px 8px"
  stamp-new:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.tissue}"
    typography: "{typography.mono}"
    rounded: "{rounded.none}"
    padding: "4px 8px"
  colorway-strip:
    width: "14px"
  header:
    backgroundColor: "{colors.board}"
    textColor: "{colors.ink}"
    height: "72px"
  footer:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.tissue}"
  cart-drawer:
    backgroundColor: "{colors.tissue}"
    textColor: "{colors.ink}"
    width: "440px"
---

# Design System: Пара

## Overview

**Creative North Star: "The Stockroom Wall"**

Every pair is a shoe box on a stockroom shelf, and the printed end label of that box is the product card. The page itself is kraft box-board: a muted kraft shelf that runs edge to edge on every route, with lighter kraft box ends standing on it and ink-black print on top. The kraft stays low in chroma on purpose: colour belongs to the photos and colourway strips, not to the cardboard. Names and headings are set like a stencilled box label in condensed caps. Anything countable (prices, sizes, stock, order numbers, colourway codes) is set in a monospaced face, the way a warehouse label prints its data. Tissue paper appears when a box is opened: photo wells, the cart drawer, forms, order sheets.

The system is flat and ruled. Every edge is a 1.5px ink line, every corner is square, and there are no gradients or blurred shadows. Depth is physical: a box label sits on a darker box-side slab, and on hover or focus the label slides up and left off it, as if pulled from the shelf. Colour beyond board, ink and tissue is limited to two stamps: brick for sales and scarcity, forest for new arrivals. Real colour comes from the product photos and from each label's vertical colourway strip.

Density is medium to high. The home hero packs a wall of box ends three across, catalogue grids run three or four up, and data is dense mono text. It still reads calm, because the palette is so narrow and the grid is ruled rather than floated.

**Key Characteristics:**
- Two-tone kraft: a darker shelf ground on every page, lighter box faces on it; ink print; tissue only inside opened boxes and on paper controls.
- 1.5px ink rules on every edge, zero radius, no shadows, no gradients.
- Condensed caps for names, mono for every number, a plain grotesque for sentences.
- Box labels carry a finger notch on the top edge and a colourway strip on the right edge.
- Hover and focus pull a box out of the wall (180ms); opening a product lifts the lid (320ms clip reveal).

## Colors

A three-material palette (board, ink, tissue) with two small stamp colours; hue comes from photography and colourway strips, not from the UI.

### Primary
- **Kraft Shelf** (`board-shelf`): the page ground on every route, the mobile filter sheet and its sticky bar, and the fill of the finger notch. Ink on it measures about 8:1.
- **Kraft Board** (`board`): the box-label face, the header and the mobile buy bar. Lighter than the shelf so a box reads as an object standing on it. Ink on board measures about 10:1.
- **Box Side** (`board-side`): skeleton blocks, and (at 40% alpha) sold-out size cells. Ink on it measures about 5.9:1.
- **Box Shadow Face** (`board-deep`): used only as the offset slab behind a box label (the box's side face) and as a fill in the empty-state box illustration. Never a text background.

### Secondary
- **Sale Brick** (`brick`): sale-percentage stamps, the low-stock dot on size cells, the filled favourite heart, and the 2px error outline on fields and the size grid.
- **Shelf Forest** (`forest`): the «Новинка» stamp only.

### Neutral
- **Print Ink** (`ink`): all text, every rule, solid buttons, selected states, the footer ground, the cart scrim at 60% alpha, inner dividers at 30% alpha.
- **Worn Ink** (`ink-soft`): hover fill of solid buttons and active filter chips.
- **Tissue** (`tissue`): photo wells, drawer, forms, fields, chips, size cells, order and checkout sheets, text on ink and on stamps.
- **Lit Tissue** (`tissue-lit`): hover and focus fill of tissue controls (fields, chips, size cells, delivery and payment options). Nothing rests on it.

### Named Rules
**The Kraft Ground Rule.** The shelf is the ground of every page and box faces are always one step lighter than it. Kraft stays desaturated; never push it back to a saturated orange, which fights every product photo. White or tissue never becomes the page background; tissue is what you find inside a box.

**The Two Stamps Rule.** Brick and forest are stamps: small, bordered, mono-set. They never fill a panel, a button or a section.

**The Ink Inversion Rule.** Interactive state is an inversion: hover, pressed and selected turn a control ink with tissue text. There is no accent colour for state.

## Typography

**Display Font:** Oswald (with Arial Narrow)
**Body Font:** Golos Text (with system-ui)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, Menlo)

**Character:** Oswald in caps reads as a stencilled box label; JetBrains Mono reads as the printed data strip under it. Golos Text is a quiet Cyrillic grotesque kept for sentences only. Body text uses tabular figures globally.

### Hierarchy
- **Display** (700, clamp(3rem, 6.4vw, 5.25rem), 0.9–0.95): the home hero slogan only, uppercase, two lines.
- **Headline** (500, 3rem → 3.75rem section titles, 3.75rem → 4.5rem page titles, 0.95): section and page titles, uppercase via the label-caps style.
- **Title** (500, 1.5rem on cards, 1.25–1.875rem in cart and panels, 0.95): product names on box labels, legends, drawer headings. Uppercase, clamped to two lines on box ends.
- **Body** (400, 1rem, 1.625): descriptions, reviews, steps, capped at 36–65ch. Body-sm (0.875rem) for field text, chips, delivery notes.
- **Label** (500, 0.875rem, 0.06–0.08em tracking, uppercase): buttons, header navigation, footer headings, "see all" links.
- **Mono** (400, 0.75rem, uppercase for colourways and breadcrumbs): colourway codes, size runs (11px), dates, counts, breadcrumbs, stamps.
- **Price** (700, 1.125rem on cards up to 2.25rem on the product panel): every rouble figure. Old prices sit beside it struck through, never recoloured.

### Named Rules
**The Stencil and Ledger Rule.** Names and headings are Oswald caps; every number is JetBrains Mono. Golos never sets a price, a size or a count.

**The Caps Only Rule.** Oswald is always uppercase. There is no sentence-case display type.

## Layout

A single centred container, max 1440px, with 16px / 24px / 40px side gutters at base / sm / lg. Sections stack full-width, split by 1.5px ink rules, with 64px vertical padding.

The home hero is a 12-column split at lg: five columns of slogan, subline, two buttons and three "just on the shelf" tissue labels; seven columns of box wall. The wall is a dense grid (two across on phones, three from sm) with 10px gaps and fixed row heights (5.5–6rem). One box is pulled out and open: it spans two columns and four rows, offset -20px up and left over its neighbours. An ink band of live counters with tissue text closes the hero; it is the one dark break in the kraft above the footer.

Product grids run one column, two from 480px, and three or four from 1024px, with 20px column and 28px row gaps. New arrivals scroll horizontally as a snap shelf of 260–300px cards that bleeds to the viewport edge. The catalogue uses a 280px sticky filter column beside the grid at lg, and a full-screen shelf sheet for filters below lg. The product page splits 7/5: a sticky gallery on the left, the full label panel on the right. Below lg a fixed board bar carries price, favourite and add-to-cart. Checkout is a form column plus a 400px sticky order sheet.

**The Ruled Grid Rule.** Tables of equal cells (size pickers, size filters, brand wall) share their borders: the container draws the top and left rule, each cell draws its bottom and right rule. Cells never float with gaps.

## Elevation & Depth

The system has no box-shadow and no blur. Depth comes from overlap and offset. A box label is a bordered board face sitting exactly on top of a bordered board-deep slab, the box's side. At rest the two coincide; on hover and focus-within the face translates -4px to -6px on both axes, exposing the side (the "pull"). Open, standalone boxes (product panel, checkout and order sheets, the hero's pulled box) show the side permanently, offset 8px down and right (20px on the hero box). The only other depth is the cart drawer and the mobile filter sheet sliding over a 60% ink scrim.

### Named Rules
**The Box Side Rule.** Depth is a solid, ink-ruled board-deep slab behind a box, never a shadow. The slab only appears behind things that are boxes: labels, sheets, panels.

**The Pull Rule.** Lift is movement, not shadow. Hover and keyboard focus move the box out by 4–6px over 180ms on the pull curve; image scale inside the well is at most 1.03.

## Shapes

Every corner is square (0px). The only curve in the system is the finger notch: a 40 × 12px half-round cut-out on the top edge of a box label, drawn with 1.5px ink on its left, right and bottom edges and filled with the colour behind it. Borders are 1.5px ink throughout; inner dividers inside a sheet drop to 1px at 30% ink. The colourway strip is a 14px vertical band on a label's right edge, split into equal colour cells by 1px ink lines. Icons are drawn in the same language: 24px grid, 1.6px stroke, square caps, mitred joins.

**The Square Corner Rule.** Radius is 0 everywhere. The notch is the one rounded form, and it only appears on box labels and sheets.

## Components

### Buttons
Printed and blunt: ink-ruled rectangles set in label caps.
- **Shape:** square (0px), 1.5px ink border, 12px × 20px padding, 12px icon gap; hero and checkout buttons grow to 16px × 24px at 1rem.
- **Solid:** ink fill, tissue text. The primary action on every screen: open catalogue, add to cart, checkout, apply filters.
- **Hover / Focus:** solid softens to worn ink; line buttons invert to ink. Focus is a 2px ink outline offset 2px. Colour transitions run 180ms.
- **Line:** transparent over board with ink text; **Line on tissue** gives the same button a tissue face for use on busy grounds (mobile filter trigger).
- **Disabled:** 50% opacity, not-allowed cursor.

### Chips
- **Style:** tissue face, 1.5px ink border, 8px × 12px, body-sm text.
- **State:** selected inverts to ink with tissue text; unselected hover goes to lit tissue. Active-filter chips above the catalogue are always ink with a close icon.

### Cards / Containers
- **Corner Style:** square (0px).
- **Background:** board face for box labels; tissue for sheets (checkout summary, orders, review summary, drawer).
- **Shadow Strategy:** the Box Side slab (see Elevation & Depth), never box-shadow.
- **Border:** 1.5px ink on every side.
- **Internal Padding:** 16px on card labels (20px top to clear the notch), 20–28px on the product panel, 24px on sheets.

### Inputs / Fields
- **Style:** tissue face, 1.5px ink border, square, 12px × 16px, body-sm, placeholder at 70% ink. Numeric fields (price, phone) switch to mono.
- **Focus:** fill lifts to lit tissue plus the global 2px ink focus outline.
- **Error:** a 2px brick outline on the field and a semibold ink message under it. Error text itself stays ink.

### Navigation
- **Header:** sticky, board ground, 64px (72px at lg), bottom rule. Wordmark «Пара» in Oswald 700 at 1.875rem. Links in label caps with 0.08em tracking; hover and current page get a 1.5px underline offset 6px. Search is a tissue field; the cart is a solid button with a mono count.
- **Mobile:** links move to a second horizontally scrolling row under a top rule; search collapses to an icon link.
- **Footer:** ink ground, tissue text, 3.75rem wordmark, label-caps column headings, mono credit line under a 30% tissue rule.

### Box Label (signature)
The product card and every product-bearing panel. A board face over a board-deep side slab, notch on top, colourway strip on the right. Card variant: a tissue photo well (10px padding, inner 1.5px ink frame, 5:4 photo), sale and new stamps butted into the well's top-left corner, a 40px tissue favourite square in its top-right, then name in title caps, colourway in mono, optional size run, price in mono bold. Box-end variant (home wall): name, mono colourway, a full-colour photo framed in ink, and the strip. Category boxes use the same full-colour photo. Photos are never desaturated or blended into the board: on kraft, a sepia photo turns the whole page one beige tone.

### Size Picker (signature)
A ruled grid of 56px mono cells, four across (six from sm), with a bordered EU / US / UK / СМ segmented switch. Selected cell inverts to ink and bold. Sold-out cells are struck through on 40% box side. A 6px brick square in the corner marks two or fewer pairs left. Switching systems slides the numbers vertically. A missing selection draws a 2px brick outline around the whole grid.

### Stamps
Mono, bold, 4px × 8px, tissue text on brick («−25%») or forest («Новинка»), bordered in ink and butted into a corner rather than floating.

## Do's and Don'ts

### Do:
- **Do** keep the shelf (#c3a47b) as the page ground and board (#d6bc96) as the box face on every route, including error and empty states.
- **Do** draw every edge with a 1.5px ink rule and keep every corner at 0px.
- **Do** give every product-bearing box a board-deep side slab, a top-edge finger notch and a right-edge colourway strip.
- **Do** set every price, size, count, date and code in JetBrains Mono, and every product name and heading in uppercase Oswald.
- **Do** show state by ink inversion: ink fill, tissue text.
- **Do** pull boxes 4–6px up and left on hover and on keyboard focus (180ms, cubic-bezier(0.16, 1, 0.3, 1)); open product routes with the 320ms lid reveal.
- **Do** build equal-cell tables as ruled grids with shared borders.
- **Do** keep small text on board or tissue; box side is only for large mono figures.

### Don't:
- **Don't** use box-shadow, blur, glow or gradients anywhere; depth is the Box Side slab.
- **Don't** round a corner. The finger notch is the only curve.
- **Don't** use brick or forest for anything larger than a stamp, a dot, a heart or an error outline.
- **Don't** make tissue or white the page ground, and don't put a white card grid of floating packshots on the board.
- **Don't** set prices or sizes in Golos Text or in Oswald.
- **Don't** set Oswald in lowercase or sentence case.
- **Don't** add a UI accent colour for links, focus or selection; ink does all of it.
