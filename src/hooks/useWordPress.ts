import { useState, useEffect } from 'react';
import { wpRequest, WPPost, WPPage, WPMedia } from '@/integrations/wordpress/client';

// Fetch WordPress posts
export function usePosts(params?: { perPage?: number; page?: number }) {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();
        queryParams.set('_embed', 'true');
        if (params?.perPage) queryParams.set('per_page', String(params.perPage));
        if (params?.page) queryParams.set('page', String(params.page));
        
        const data = await wpRequest<WPPost[]>(`/wp/v2/posts?${queryParams}`);
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch posts'));
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [params?.perPage, params?.page]);

  return { posts, loading, error };
}

// Fetch WordPress pages
export function usePages() {
  const [pages, setPages] = useState<WPPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true);
        const data = await wpRequest<WPPage[]>('/wp/v2/pages');
        setPages(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch pages'));
      } finally {
        setLoading(false);
      }
    };
    fetchPages();
  }, []);

  return { pages, loading, error };
}

// Fetch WordPress media
export function useMedia(mediaId?: number) {
  const [media, setMedia] = useState<WPMedia | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!mediaId) {
      setLoading(false);
      return;
    }
    
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const data = await wpRequest<WPMedia>(`/wp/v2/media/${mediaId}`);
        setMedia(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch media'));
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, [mediaId]);

  return { media, loading, error };
}
