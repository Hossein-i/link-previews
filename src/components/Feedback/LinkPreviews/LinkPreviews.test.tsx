import { render, screen, waitFor } from '@testing-library/react';

import { useLinkPreviews, UseLinkPreviewsReturn } from './hooks';
import { LinkPreviews } from './LinkPreviews';

import '@testing-library/jest-dom';
import { AppRoot } from '@/components/Service';

// Mock the useLinkPreviews hook
jest.mock('./hooks/useLinkPreviews', () => ({
  useLinkPreviews: jest.fn(),
}));

// Define the mock implementation with TypeScript types
const mockUseLinkPreviews = useLinkPreviews as jest.Mock<UseLinkPreviewsReturn>;

describe('LinkPreviews', () => {
  it('should render loading state', () => {
    mockUseLinkPreviews.mockImplementation(() => ({
      loading: true,
      metadata: undefined,
      error: undefined,
      retry: jest.fn(),
      fetcher: jest.fn(),
    }));

    render(
      <AppRoot>
        <LinkPreviews url="https://example.com" />
      </AppRoot>,
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('should render error state', () => {
    mockUseLinkPreviews.mockImplementation(() => ({
      loading: false,
      metadata: undefined,
      error: 'Failed to fetch',
      retry: jest.fn(),
      fetcher: jest.fn(),
    }));

    render(
      <AppRoot>
        <LinkPreviews url="https://example.com" />
      </AppRoot>,
    );

    expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument();
  });

  it('should render success state', async () => {
    mockUseLinkPreviews.mockImplementation(() => ({
      loading: false,
      metadata: {
        title: 'Test Title',
        description: 'Test Description',
        image: 'test.jpg',
        url: 'https://example.com',
      },
      error: undefined,
      retry: jest.fn(),
      fetcher: jest.fn(),
    }));

    render(
      <AppRoot>
        <LinkPreviews url="https://example.com" />
      </AppRoot>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Test Title/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src', 'test.jpg');
    });
  });
});