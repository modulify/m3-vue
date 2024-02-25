import type { Meta, StoryObj } from '@storybook/vue3'

import { M3Checkbox } from '@/components/checkbox'
import { ref } from 'vue'

const meta = {
  title: 'Components/M3Checkbox',

  component: M3Checkbox,

  args: {
    disabled: false,
  },

  render: (args: unknown) => ({
    components: { M3Checkbox },

    setup () {
      return {
        args,
        model: ref(false),
      }
    },

    template: `
        <div style="display: flex; align-items: center;">
            <M3Checkbox
                v-model:model="model"
                v-bind="args"
            /> Choice
        </div>
    `,
  }),

  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof M3Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const BooleanCheckbox: Story = {}
