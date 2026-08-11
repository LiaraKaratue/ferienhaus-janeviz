import { WP_BASE_URL } from '@/config/wordpress';

// WordPress API Error
export class WPError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'WPError';
  }
}

// Public WordPress API request (no auth)
export async function wpRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${WP_BASE_URL}/wp-json${path}`, {
    headers: { Accept: 'application/json', ...init?.headers },
    ...init,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new WPError(
      error?.message || `WordPress request failed: ${response.status}`,
      response.status,
      error?.code
    );
  }

  return response.json() as Promise<T>;
}

// WordPress Types
export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
  };
}

export interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  title: { rendered: string };
  media_details?: {
    width: number;
    height: number;
    sizes?: Record<string, { source_url: string; width: number; height: number }>;
  };
}
