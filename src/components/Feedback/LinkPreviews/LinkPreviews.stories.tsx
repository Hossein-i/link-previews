import type { Meta, StoryObj } from '@storybook/react';

import { LinkPreviews } from './LinkPreviews';

import { hideControls } from '@/storybook/controls';

const meta = {
  title: 'Feedback/LinkPreviews',
  component: LinkPreviews,
  argTypes: hideControls('fetcher', 'children', 'placeholder', 'fallback'),
} satisfies Meta<typeof LinkPreviews>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    url: 'https://react.dev/learn',
    fetcher: async (_prevState, formData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: 'success',
            data: {
              title: 'Quick Start – React',
              description:
                'The library for web and native user interfaces',
              image: 'https://react.dev/images/og-learn.png',
              url: formData.get('url')?.toString() ?? '',
            },
          });
        }, 5000);
      });
    },
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
      <LinkPreviews {...args} />
    </div>
  ),
} satisfies Story;

export const Fallback: Story = {
  args: {
    url: 'https://example.com',
    fetcher: async () => {
      return new Promise((_resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Something went wrong!'));
        }, 5000);
      });
    },
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
      <LinkPreviews {...args} />
    </div>
  ),
} satisfies Story;
