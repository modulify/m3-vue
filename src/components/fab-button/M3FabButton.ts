import type { PropType, VNode } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

import { M3Link } from '@/components/link'

import {
  defineComponent,
  h,
  ref,
} from 'vue'

import { applyRippleEffect } from '@/components/ripple'
import { normalize } from '@/utils/runtime'

import {
  size,
  variant,
} from '@/components/fab-button/properties'

const wrap = (content: [VNode, boolean][]) => content.map(([node, isIcon]) => h('span', {
  class: {
    'm3-fab-button__icon': isIcon,
    'm3-fab-button__text': !isIcon,
  },
}, { ...node }))

export default defineComponent({
  name: 'M3FabButton',

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

    variant,

    size,

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  // eslint-disable-next-line max-lines-per-function
  setup (props, { attrs, expose, slots }) {
    const root = ref<InstanceType<(typeof M3Link)> | null>(null)

    expose({
      focus: () => root.value?.focus(),
      blur: () => root.value?.blur(),
    })

    const onInteraction = (event: KeyboardEvent | MouseEvent) => {
      const _button = root.value?.getElement()
      if (_button) {
        applyRippleEffect(_button, event)
      }
    }

    const onClick = (event: MouseEvent) => onInteraction(event)
    const onKeydown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault()
        onInteraction(event)
      }
    }
    const onKeyup = (event: KeyboardEvent) => {
      if (event.code === 'Enter') {
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
          ['m3-fab-button']: true,
          ['m3-fab-button_' + props.variant]: props.variant !== variant.default,
          ['m3-fab-button_' + props.size]: props.size !== size.default,
          ['m3-fab-button_has-leading-icon']: hasText && hasLeadingIcon,
          ['m3-fab-button_has-trailing-icon']: hasText && hasTrailingIcon,
        }],
        disabled: props.disabled,
        onClick,
        onKeydown,
        onKeyup,
      }, () => h('span', {
        class: 'm3-fab-button__state',
      }, wrap(content)))
    }
  },
})