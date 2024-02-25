<template>
    <button
        ref="root"
        :type="type"
        :class="{
            ['m3-icon-button']: true,
            ['m3-icon-button_' + appearance]: true,
            ['m3-icon-button_toggleable']: toggleable,
            ['m3-icon-button_selected']: toggleable && selected,
        }"
        :disabled="disabled"
        v-bind="$attrs"
        @click="onClick"
    >
        <span class="m3-icon-button__state">
            <slot />
        </span>
    </button>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Appearance } from '~types/components/navigation'

import { ref } from 'vue'
import { applyRippleEffect } from '../ripple'
import { provideM3IconAppearance } from '@/components/icon/injections'

const props = defineProps({
  type: {
    type: String as PropType<HTMLButtonElement['type']>,
    default: 'button',
  },

  appearance: {
    type: String as PropType<Appearance>,
    validator: (appearance: string) => ['filled', 'outlined', 'standard', 'tonal'].includes(appearance),
    default: 'standard',
  },

  toggleable: {
    type: Boolean,
    default: false,
  },

  selected: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
})

const root = ref<HTMLElement | null>(null)

defineExpose({
  focus: () => root.value?.focus(),
  blur: () => root.value?.blur(),
})

provideM3IconAppearance(() => props.toggleable && props.selected ? 'filled' : 'outlined')

const onClick = (event: MouseEvent) => {
  const el = root.value
  if (el) {
    applyRippleEffect(el, event)
  }
}
</script>