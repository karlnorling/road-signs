---
'@road-signs/ag': minor
'@road-signs/bb': minor
'@road-signs/bs': minor
'@road-signs/dm': minor
'@road-signs/et': minor
'@road-signs/ls': minor
'@road-signs/lu': minor
'@road-signs/ly': minor
'@road-signs/mg': minor
'@road-signs/mw': minor
'@road-signs/mz': minor
'@road-signs/na': minor
'@road-signs/rw': minor
'@road-signs/sz': minor
'@road-signs/tm': minor
'@road-signs/tn': minor
'@road-signs/zm': minor
---

Register artwork that was already downloaded but never added to the registry.

`yarn fill-gaps` registered a Commons file only when that run downloaded it.
A country whose artwork had been fetched earlier therefore got nothing: the
run that would have registered it found nothing left to download. Luxembourg
held 407 SVGs on disk and shipped four signs.

Registration now covers every file in a category. No new artwork was fetched
for this release -- every sign below was already on disk.

| package                                 | before | after     |
| --------------------------------------- | ------ | --------- |
| `lu`                                    | 4      | 405       |
| `ls` `mg` `mw` `mz` `na` `rw` `sz` `zm` | 45-47  | ~900 each |
| `ag`                                    | 0      | 47        |
| `et`                                    | 0      | 17        |
| `tm` `tn` `bb` `bs` `dm` `ly`           | 0      | 1-5 each  |

All of them report 100% artwork coverage. The eight SADC packages carry the
regional catalogue their `fill-gaps` configuration already named; `za`, `zw`
and `tz` list only country-specific categories and so remain at 322.
