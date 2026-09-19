import { decorateSvg, escapeHtml, signArtwork } from '@road-signs/core';
import type { Sign } from '@road-signs/core';

/** A country package's `getSign` function. */
export type SignLookup = (id: string) => Sign | undefined;

/**
 * Base class for road sign custom elements.
 *
 * A sign can be supplied two ways:
 *   - the `sign` property, for code that already has the object in hand;
 *   - the `sign-id` attribute, which is resolved through the lookup passed to
 *     `registerRoadSign` — this is what makes the element usable from plain
 *     markup, with no JavaScript per instance.
 *
 *   import { registerRoadSign } from '@road-signs/elements';
 *   import { getSign } from '@road-signs/us';
 *
 *   registerRoadSign('road-sign-us', getSign);
 *   // <road-sign-us sign-id="w1-1-turn" size="64"></road-sign-us>
 */
export class RoadSignElement extends HTMLElement {
  static readonly observedAttributes = [
    'sign-id',
    'size',
    'width',
    'height',
    'title',
    'description',
  ];

  /** Set by `registerRoadSign` on the subclass it defines. */
  static lookup: SignLookup | undefined;

  #sign: Sign | undefined;

  set sign(value: Sign | undefined) {
    this.#sign = value;
    this.#render();
  }

  get sign(): Sign | undefined {
    return this.#sign ?? this.#fromAttribute();
  }

  connectedCallback(): void {
    this.#render();
  }

  attributeChangedCallback(): void {
    this.#render();
  }

  #fromAttribute(): Sign | undefined {
    const id = this.getAttribute('sign-id');
    if (id === null) return undefined;
    const { lookup } = this.constructor as typeof RoadSignElement;
    return lookup?.(id);
  }

  #render(): void {
    const sign = this.#sign ?? this.#fromAttribute();
    if (!sign) {
      this.innerHTML = '';
      return;
    }

    const size = this.getAttribute('size') ?? '64';
    const width = this.getAttribute('width') ?? size;
    const height = this.getAttribute('height') ?? size;
    const title = this.getAttribute('title') ?? sign.name;
    const description = this.getAttribute('description') ?? sign.description;

    const artwork = signArtwork(sign);
    if (artwork === null) {
      this.innerHTML = '';
      return;
    }

    this.style.display = 'contents';

    // Raster-only sign (no vector source). `src` is a self-contained data URI.
    if (artwork.kind === 'png') {
      this.innerHTML =
        `<img src="${escapeHtml(artwork.src)}" alt="${escapeHtml(title)}" ` +
        `title="${escapeHtml(description)}" ` +
        `width="${escapeHtml(width)}" height="${escapeHtml(height)}" />`;
      return;
    }

    this.innerHTML = decorateSvg(artwork.svg, {
      description,
      descId: `rs-desc-${sign.id}`,
      height,
      title,
      titleId: `rs-title-${sign.id}`,
      width,
    });
  }
}

/**
 * Define a custom element bound to one country's catalogue.
 *
 * Re-registering the same tag name is a no-op rather than a DOMException, so
 * calling this from module scope in more than one entry point is safe.
 */
export const registerRoadSign = (tagName: string, lookup: SignLookup): void => {
  if (customElements.get(tagName) !== undefined) return;
  class CountryRoadSignElement extends RoadSignElement {
    static override lookup = lookup;
  }
  customElements.define(tagName, CountryRoadSignElement);
};
