import type { Meta, StoryObj } from '@storybook/react';

import { Image } from './Image';

import { hideControls } from '@/storybook/controls';

const meta = {
  title: 'Blocks/Image',
  component: Image,
  argTypes: hideControls('fallbackIcon', 'children'),
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ValidImage: Story = {
  args: {
    width: 96,
    height: 96,
    src: 'https://avatars.githubusercontent.com/u/84640980?v=4',
  },
} satisfies Story;

export const InvalidImage: Story = {
  args: {
    width: 96,
    height: 96,
    src: 'https://avatars.gitontent.com/u/84640980?v=4',
  },
} satisfies Story;

export const WithFallback: Story = {
  args: {
    width: 96,
    height: 96,
    src: 'https://avatars.gitontent.com/u/84640980?v=4',
    fallbackIcon: <span>😕</span>,
  },
} satisfies Story;

export const WithBadge: Story = {
  args: {
    width: 48,
    height: 48,
    src: 'https://avatars.githubusercontent.com/u/84640980?v=4',
    fallbackIcon: <span>😕</span>,
    children: <Image.Badge type="number">42</Image.Badge>,
  },
} satisfies Story;

export const WithChildren: Story = {
  args: {
    width: 48,
    height: 48,
    children: '😕',
  },
  render: (props) => (
    <Image {...props}>
      {(Number(props?.width) || 0) <= 28 ? '😕' : '🤨'}
    </Image>
  ),
} satisfies Story;
