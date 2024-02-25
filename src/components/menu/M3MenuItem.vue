<template>
    <M3Link
        ref="root"
        :to="to"
        :href="href"
        :class="{
            'm3-menu-item': true,
            'm3-menu-item_selected': selected,
            'm3-menu-item_disabled': disabled,
        }"
        @click="onInteraction"
        @keyup.enter="onInteraction"
    >
        <span class="m3-menu-item__state">
            <span
                v-if="'leading' in $slots"
                class="m3-menu-item__icon"
            >
                <slot name="leading" />
            </span>

            <span class="m3-menu-item__content">
                <slot />
            </span>

            <span
                v-if="'trailing' in $slots"
                class="m3-menu-item__icon"
            >
                <slot name="trailing" />
            </span>
        </span>
    </M3Link>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

import { M3Link } from '@/components/link'

import { applyRippleEffect } from '@/components/ripple'
import { ref } from 'vue'

defineProps({
  to: {
    type: null as unknown as PropType<RouteLocationRaw>,
    default: undefined,
  },

  href: {
    type: null as unknown as PropType<string | undefined>,
    validator: (href: unknown) => typeof href === 'string' || typeof href === 'undefined',
    default: undefined,
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

const root = ref<InstanceType<(typeof M3Link)> | null>(null)

const onInteraction = (event: KeyboardEvent | MouseEvent) => {
  const _root = root.value
  if (_root) {
    applyRippleEffect(_root.getElement() as HTMLElement, event)
  }
}
</script>