import type { Prop } from 'vue'

import type {
  Size,
  Variant,
} from '~types/components/fab-button'

import {
  sizes,
  variants,
} from '@/components/fab-button/values'

export const size: Prop<Size, 'md'> = {
  type: String as PropType<Size>,
  validator: (size: string) => sizes.includes(size),
  default: 'md',
}

export const variant: Prop<Variant, 'primary'> = {
  type: String as PropType<Variant>,
  validator: (variant: string) => variants.includes(variant),
  default: 'primary',
}