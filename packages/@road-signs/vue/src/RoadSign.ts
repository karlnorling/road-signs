import { defineComponent, h } from 'vue';
import type { Sign } from '@road-signs/core';
import type { PropType } from 'vue';

const esc = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');

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

      const titleId = `rs-title-${props.sign.id}`;
      const descId = `rs-desc-${props.sign.id}`;

      const svgWithA11y = props.sign.svg
        .replace(
          /<svg\b/,
          `<svg role="img" aria-labelledby="${titleId} ${descId}" width="${esc(String(resolvedWidth))}" height="${esc(String(resolvedHeight))}"`,
        )
        .replace(/>/, `><title id="${titleId}">${esc(resolvedTitle)}</title><desc id="${descId}">${esc(resolvedDesc)}</desc>`);

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
