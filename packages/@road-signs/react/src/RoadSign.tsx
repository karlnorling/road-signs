import * as React from 'react';
import { decorateSvg, signArtwork } from '@road-signs/core';
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

  const artwork = signArtwork(sign);
  if (artwork === null) return null;

  // Raster-only sign (no vector source). `src` is a self-contained data URI.
  if (artwork.kind === 'png') {
    return (
      <img
        alt={resolvedTitle}
        aria-label={ariaLabel}
        className={className}
        height={resolvedHeight}
        src={artwork.src}
        style={style}
        title={resolvedDesc}
        width={resolvedWidth}
      />
    );
  }

  const svgWithA11y = decorateSvg(artwork.svg, {
    description: resolvedDesc,
    descId: `rs-desc-${sign.id}`,
    height: resolvedHeight,
    title: resolvedTitle,
    titleId: `rs-title-${sign.id}`,
    width: resolvedWidth,
  });

  return (
    <span
      aria-label={ariaLabel}
      className={className}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: SVGs are build-time generated and SVGO-optimised
      dangerouslySetInnerHTML={{ __html: svgWithA11y }}
      style={{ display: 'contents', ...style }}
    />
  );
}) as <T extends Sign = Sign>(props: RoadSignProps<T>) => React.ReactElement | null;
