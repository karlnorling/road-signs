import * as React from 'react';
import type { Sign } from '@road-signs/core';

export interface RoadSignProps<T extends Sign = Sign> {
  sign: T;
  /** Width and height in pixels (or any CSS length string). Defaults to 64. */
  size?: number | string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  /** Accessible title injected as <title> inside the SVG. Defaults to sign.name. */
  title?: string;
  /** Accessible description injected as <desc> inside the SVG. Defaults to sign.description. */
  description?: string;
  'aria-label'?: string;
}

const esc = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');

const pickPng = (sign: Sign): string | undefined => {
  const png = sign.assets?.png;
  if (!png) return undefined;
  return png[2048] ?? png[1024] ?? png[768] ?? png[512] ?? png[240];
};

export const RoadSign = React.memo(function RoadSign<T extends Sign = Sign>({
  sign,
  size = 64,
  width,
  height,
  className,
  style,
  title,
  description,
  'aria-label': ariaLabel,
}: RoadSignProps<T>): React.ReactElement | null {
  const resolvedWidth = width ?? size;
  const resolvedHeight = height ?? size;
  const resolvedTitle = title ?? sign.name;
  const resolvedDesc = description ?? sign.description;

  const titleId = `rs-title-${sign.id}`;
  const descId = `rs-desc-${sign.id}`;

  // Fall back to a raster <img> for PDF-extracted signs that have no inline SVG.
  if (!sign.svg) {
    const pngSrc = pickPng(sign);
    if (!pngSrc) return null;
    return (
      <img
        alt={resolvedTitle}
        aria-label={ariaLabel}
        className={className}
        height={resolvedHeight}
        src={pngSrc}
        style={style}
        title={resolvedDesc}
        width={resolvedWidth}
      />
    );
  }

  const svgWithA11y = sign.svg
    .replace(
      /<svg\b/,
      `<svg role="img" aria-labelledby="${titleId} ${descId}" width="${esc(String(resolvedWidth))}" height="${esc(String(resolvedHeight))}"`,
    )
    .replace(/>/, `><title id="${titleId}">${esc(resolvedTitle)}</title><desc id="${descId}">${esc(resolvedDesc)}</desc>`);

  return (
    <span
      aria-label={ariaLabel}
      className={className}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: SVGs are server-generated and SVGO-optimised
      dangerouslySetInnerHTML={{ __html: svgWithA11y }}
      style={{ display: 'contents', ...style }}
    />
  );
}) as <T extends Sign = Sign>(props: RoadSignProps<T>) => React.ReactElement | null;
