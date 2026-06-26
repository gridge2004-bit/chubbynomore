## Fix Product Card Images & Text Fitting

### Problem
The two product cards ("Compounded Weight Loss" and "Brand-name Weight Loss") have images that are constrained in small fixed-size containers, causing them to appear cut off or awkwardly scaled. The large serif titles (40–48px) compete for horizontal space with the image, making text feel cramped and prone to awkward line breaks.

### Changes

1. **ProductTile layout**: Change from `grid-cols-[1fr_auto]` (title squeezed next to image) to a vertical stack layout. Place the image in its own row with a larger, aspect-ratio-preserving container so the medication photo displays fully without being cropped. This gives both the image and text adequate breathing room.

2. **Title typography**: Reduce the product card title size and let it flow naturally instead of forcing a manual `<br>` split. This prevents awkward word breaks like "Brand-" / "name" when the container is narrow.

3. **Image container**: Replace the rigid `h-[120px] w-[140px]` / `sm:h-[170px] sm:w-[200px]` box with a flex container that respects the image's natural aspect ratio using `object-contain` and generous max-height/width constraints.

4. **Spacing & sizing**: Tighten vertical padding slightly and ensure subtitle, medication list, and price rows read cleanly without crowding.

No changes to other sections, data-trust grid, or global styles.