import type { PropType, VNode } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

import { M3Link } from '@/components/link'

import {
  defineComponent,
  h,
  ref,
} from 'vue'

import { applyRippleEffect } from '@/components/ripple'

const SHAPE_FLAG_ARRAY_CHILDREN = 16
const SHAPE_FLAG_TEXT = 8

const inlines = ['b', 'i', 'span', 'strong']

const is = (node: VNode, type: string) => node.type.toString() === type
const isComment = (node: VNode) => is(node, 'Symbol(Comment)')
const isTextual = (node: VNode) => [...inlines, 'Symbol(Text)', 'Symbol()'].some(t => is(node, t)) || node.shapeFlag === SHAPE_FLAG_TEXT

const normalize = (content: VNode[]): [VNode, boolean][] => {
  const normalized: [VNode, boolean][] = []
  content.forEach(node => {
    if (node.shapeFlag === SHAPE_FLAG_ARRAY_CHILDREN) {
      return normalized.push(...normalize(node.children as VNode[]))
    }

    if (!isComment(node)) {
      normalized.push([node, !isTextual(node)])
    }
  })

  return normalized
}

const renderContent = (content: [VNode, boolean][]) => content.map(([node, isIcon]) => h('span', {
  class: {
    'm3-button__icon': isIcon,
    'm3-button__text': !isIcon,
  },
}, { ...node }))

export default defineComponent({
  props: {
    type: {
      type: String as PropType<HTMLButtonElement['type']>,
      default: 'button',
    },

    to: {
      type: null as unknown as PropType<RouteLocationRaw>,
      default: undefined,
    },

    href: {
      type: String,
      default: undefined,
    },

    appearance: {
      type: String as PropType<'elevated' | 'filled' | 'outlined' | 'text' | 'tonal'>,
      validator: (appearance: string) => ['elevated', 'filled', 'outlined', 'text', 'tonal'].includes(appearance),
      default: 'filled',
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  // eslint-disable-next-line max-lines-per-function
  setup (props, { attrs, expose, slots }) {
    const root = ref<InstanceType<(typeof M3Link)> | null>(null)

    const onInteraction = (event: KeyboardEvent | MouseEvent) => {
      const _button = root.value?.getElement()
      if (_button) {
        applyRippleEffect(_button, event)
      }
    }

    expose({
      focus: () => root.value?.focus(),
      blur: () => root.value?.blur(),
    })

    const onClick = (event: MouseEvent) => onInteraction(event)
    const onKeyup = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        onInteraction(event)
      }
    }

    return () => {
      const content = normalize('default' in slots ? slots.default?.() ?? [] : [])

      const hasText = content.some(([, isIcon]) => !isIcon)
      const [, hasLeadingIcon] = content[0] ?? [null, false]
      const [, hasTrailingIcon] = content[content.length - 1] ?? [null, false]

      return h(M3Link, {
        ref: root,
        type: props.type,
        to: props.to,
        href: props.href,
        ...attrs,
        class: [attrs.class, {
          ['m3-button']: true,
          ['m3-button_' + props.appearance]: true,
          ['m3-button_has-leading-icon']: hasText && hasLeadingIcon,
          ['m3-button_has-trailing-icon']: hasText && hasTrailingIcon,
        }],
        disabled: props.disabled,
        onClick,
        onKeyup,
      }, () => h('span', {
        class: 'm3-button__state',
      }, renderContent(content)))
    }
  },
})