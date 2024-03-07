import type { Meta, StoryObj } from '@storybook/vue3'

import { M3Checkbox } from '@/components/checkbox'
import { ref } from 'vue'

import makeId from '@/utils/id'

const meta = {
  title: 'Components/M3Checkbox',

  component: M3Checkbox,

  args: {
    disabled: false,
  },

  render: (args: unknown) => ({
    components: { M3Checkbox },

    setup () {
      const id = makeId('m3-checkbox')

      return {
        id,
        args,
        model: ref(false),
      }
    },

    template: `
        <div style="display: flex; align-items: center;">
            <M3Checkbox
                :id="id"
                v-model:model="model"
                v-bind="args"
            /> <label :for="id">Choice</label>
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
