import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Link } from './Link';

const meta = {
  title: 'Blocks/Link',
  component: Link,
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    href: 'https://github.com/Hossein-i/link-previews',
    target: '_blank',
  },
  render: (args) => (
    <div
      style={{
        width: '400px',
        border: '1px dashed #9747FF',
        borderRadius: '5px',
        padding: '20px',
      }}
    >
      <Link {...args}>Click Me</Link>
    </div>
  ),
} satisfies Story;
