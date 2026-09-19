import { defineComponent, h } from 'vue';
import { decorateSvg, signArtwork } from '@road-signs/core';
import type { Sign } from '@road-signs/core';
import type { PropType } from 'vue';

export const RoadSign = defineComponent({
  name: 'RoadSign',
  inheritAttrs: false,
  props: {
    sign: { type: Object as PropType<Sign>, required: true },
    size: { type: [Number, String] as PropType<number | string>, default: 64 },
    width: { type: [Number, String] as PropType<number | string> },
    height: { type: [Number, String] as PropType<number | string> },
    title: { type: String },
    description: { type: String },
  },
  setup(props, { attrs }) {
    return () => {
      const resolvedWidth = props.width ?? props.size;
      const resolvedHeight = props.height ?? props.size;
      const resolvedTitle = props.title ?? props.sign.name;
      const resolvedDesc = props.description ?? props.sign.description;

      const artwork = signArtwork(props.sign);
      if (artwork === null) return null;

      // Raster-only sign (no vector source). `src` is a self-contained data URI.
      if (artwork.kind === 'png') {
        return h('img', {
          ...attrs,
          alt: resolvedTitle,
          height: resolvedHeight,
          src: artwork.src,
          title: resolvedDesc,
          width: resolvedWidth,
        });
      }

      const svgWithA11y = decorateSvg(artwork.svg, {
        description: resolvedDesc,
        descId: `rs-desc-${props.sign.id}`,
        height: resolvedHeight,
        title: resolvedTitle,
        titleId: `rs-title-${props.sign.id}`,
        width: resolvedWidth,
      });

      return h('span', {
        ...attrs,
        style: {
          display: 'contents',
          ...(typeof attrs.style === 'object' ? (attrs.style as Record<string, unknown>) : {}),
        },
        innerHTML: svgWithA11y,
      });
    };
  },
});
