import type { Sign } from '@road-signs/core';

const esc = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');

/**
 * Base class for road sign custom elements.
 *
 * Usage after registering a country's signs:
 *   import { registerRoadSign } from '@road-signs/elements';
 *   import { getSign } from '@road-signs/us';
 *   registerRoadSign('road-sign-us', getSign);
 */
export class RoadSignElement extends HTMLElement {
  static readonly observedAttributes = ['sign-id', 'size', 'width', 'height', 'title', 'description'];

  #sign: Sign | undefined;

  set sign(value: Sign) {
    this.#sign = value;
    this.#render();
  }

  connectedCallback(): void {
    this.#render();
  }

  attributeChangedCallback(): void {
    this.#render();
  }

  #render(): void {
    if (!this.#sign) return;

    const size = this.getAttribute('size') ?? '64';
    const resolvedWidth = this.getAttribute('width') ?? size;
    const resolvedHeight = this.getAttribute('height') ?? size;
    const resolvedTitle = this.getAttribute('title') ?? this.#sign.name;
    const resolvedDesc = this.getAttribute('description') ?? this.#sign.description;

    const titleId = `rs-title-${this.#sign.id}`;
    const descId = `rs-desc-${this.#sign.id}`;

    const svgWithA11y = this.#sign.svg
      .replace(
        /<svg\b/,
        `<svg role="img" aria-labelledby="${titleId} ${descId}" width="${esc(resolvedWidth)}" height="${esc(resolvedHeight)}"`,
      )
      .replace(/>/, `><title id="${titleId}">${esc(resolvedTitle)}</title><desc id="${descId}">${esc(resolvedDesc)}</desc>`);

    this.style.display = 'contents';
    this.innerHTML = svgWithA11y;
  }
}
