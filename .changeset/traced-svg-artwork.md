---
'@road-signs/cl': patch
'@road-signs/co': patch
'@road-signs/cy': patch
'@road-signs/cz': patch
'@road-signs/dk': patch
'@road-signs/ee': patch
'@road-signs/fr': patch
'@road-signs/in': patch
'@road-signs/is': patch
'@road-signs/kh': patch
'@road-signs/kr': patch
'@road-signs/li': patch
'@road-signs/ma': patch
'@road-signs/me': patch
'@road-signs/mk': patch
'@road-signs/mt': patch
'@road-signs/nz': patch
'@road-signs/rs': patch
'@road-signs/si': patch
'@road-signs/th': patch
'@road-signs/tr': patch
'@road-signs/ua': patch
'@road-signs/za': patch
---

Replace monochrome traced artwork with the real coloured SVG, which was already
on disk but losing a glob race to the trace. 270 signs across 23 countries now
render in colour instead of as black shapes.
