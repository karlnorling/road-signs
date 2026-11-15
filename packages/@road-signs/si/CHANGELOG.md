# @road-signs/si

## 0.1.2

### Patch Changes

- aee57d4: Replace monochrome traced artwork with the real coloured SVG, which was already
  on disk but losing a glob race to the trace. 270 signs across 23 countries now
  render in colour instead of as black shapes.

## 0.1.1

### Patch Changes

- f798cfd: Add a README to every package, so the npm page for each one documents what it
  contains and how to use it instead of rendering blank.

  Country READMEs are generated from the same metadata that drives the docs site
  plus live counts read from each registry, so they cannot drift from the code.

- Updated dependencies [f798cfd]
  - @road-signs/core@0.1.1
