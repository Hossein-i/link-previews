import { render, screen, waitFor } from '@testing-library/react';

import { useLinkPreviews } from './useLinkPreviews';

import '@testing-library/jest-dom';

// Mock the fetch function
(global.fetch as unknown) = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 'success', data: { title: 'Test Title', description: 'Test Description', image: 'test.jpg', url: 'https://example.com' } }),
  }),
);

// A test component to use the hook
const TestComponent = ({ url }: { url: string }) => {
  const { loading, metadata, error } = useLinkPreviews({ url });

  if (loading) { return <div>Loading...</div>; }
  if (error) { return <div>{error}</div>; }
  return <div>{metadata?.title}</div>;
};

describe('useLinkPreviews', () => {
  it('should fetch metadata successfully', async () => {
    render(<TestComponent url="https://example.com" />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Test Title/i)).toBeInTheDocument();
    });
  });

  it('should handle fetch error', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Failed to fetch')));

    render(<TestComponent url="https://example.com" />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument();
    });
  });
});