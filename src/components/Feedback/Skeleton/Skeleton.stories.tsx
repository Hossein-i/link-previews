import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Skeleton } from './Skeleton';

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div
      style={{
        width: '400px',
        border: '1px dashed #9747FF',
        borderRadius: '5px',
        padding: '20px',
      }}
    >
      <Skeleton {...args}>
        <div>Hello World...</div>
      </Skeleton>
    </div>
  ),
} satisfies Story;
