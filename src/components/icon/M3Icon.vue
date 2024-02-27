<template>
    <span
        :class="['m3-icon', 'm3-icon_' + appearance]"
        v-bind="$attrs"
    >
        {{ name }}
    </span>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'
import type { Appearance } from '~types/components/icon'

import { M3IconAppearance } from '@/components/icon'
import {
  computed,
  inject,
  ref,
} from 'vue'

defineProps({
  name: {
    type: String,
    required: true,
  },
})

const inherited = inject<Ref<Appearance | null>>(M3IconAppearance, ref(null))
const appearance = computed(() => inherited.value ?? props.appearance)
</script>