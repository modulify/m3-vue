<template>
    <M3FabButton :variant="variant" :size="size">
        <template v-if="label.length">
            <M3Icon
                v-if="icon.length"
                :name="icon"
            />

            {{ label }}
        </template>

        <M3Icon
            v-else-if="icon.length"
            :name="icon"
        />
    </M3FabButton>
</template>

<script lang="ts" setup>
import { M3FabButton } from '@/components/fab-button'
import { M3Icon } from '@/components/icon'

import * as properties from '@/components/fab-button/properties'

defineProps({
  variant: properties.variant,

  size: properties.size,

  icon: {
    type: String,
    default: '',
  },

  label: {
    type: String,
    default: '',
  },
})
</script>