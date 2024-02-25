import type { Meta, StoryObj } from '@storybook/vue3'

import { M3Button } from '@/components/button'

const meta = {
  title: 'Components/M3Button',

  component: M3Button,

  argTypes: {
    appearance: {
      control: 'select',
      options: ['elevated', 'filled', 'outlined', 'text', 'tonal'],
    },

    disabled: {
      control: 'boolean',
    },
  },

  args: {
    appearance: 'filled',
    disabled: false,
  },

  render: (args: unknown) => ({
    components: { M3Button },

    setup () {
      return { args }
    },

    template: '<M3Button v-bind="args">Text</M3Button>',
  }),

  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof M3Button>

export default meta

type Story = StoryObj<typeof meta>

export const FilledButton: Story = {
  args: {
    appearance: 'filled',
  },
}

export const OutlinedButton: Story = {
  args: {
    appearance: 'outlined',
  },
}

export const TextButton: Story = {
  args: {
    appearance: 'text',
  },
}

export const TonalButton: Story = {
  args: {
    appearance: 'tonal',
  },
}
