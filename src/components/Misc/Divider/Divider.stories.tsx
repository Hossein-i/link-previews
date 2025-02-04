import type { Meta, StoryObj } from '@storybook/react';

import { Divider } from './Divider';

const meta = {
  title: 'Misc/Divider',
  component: Divider,
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ padding: 16, background: 'var(--tgui--secondary_bg_color)' }}>
      <div style={{ background: 'var(--tgui--bg_color)' }}>
        <div>Divider is under</div>
        <Divider {...args} />
        <div>Divider is above</div>
      </div>
    </div>
  ),
} satisfies Story;
