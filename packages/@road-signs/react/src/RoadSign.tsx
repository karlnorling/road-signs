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
}: RoadSignProps<T>): React.ReactElement {
  const resolvedWidth = width ?? size;
  const resolvedHeight = height ?? size;
  const resolvedTitle = title ?? sign.name;
  const resolvedDesc = description ?? sign.description;

  const titleId = `rs-title-${sign.id}`;
  const descId = `rs-desc-${sign.id}`;

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
}) as <T extends Sign = Sign>(props: RoadSignProps<T>) => React.ReactElement;
