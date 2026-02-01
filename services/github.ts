import { GistData } from '../types';

export const extractGistId = (url: string): string | null => {
  try {
    // Handle full URLs: https://gist.github.com/username/ID or https://gist.github.com/ID
    const urlObj = new URL(url);
    if (urlObj.hostname !== 'gist.github.com') return null;
    
    const parts = urlObj.pathname.split('/').filter(Boolean);
    
    // Pattern: /username/id or /id
    if (parts.length > 0) {
      return parts[parts.length - 1];
    }
    return null;
  } catch (e) {
    // Handle plain IDs if pasted directly, though URL is expected
    if (/^[a-f0-9]{20,32}$/.test(url)) {
      return url;
    }
    return null;
  }
};

export const fetchGist = async (id: string): Promise<GistData> => {
  const response = await fetch(`https://api.github.com/gists/${id}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Gist not found. Please check the URL.');
    }
    if (response.status === 403) {
      throw new Error('Rate limit exceeded or access denied.');
    }
    throw new Error(`GitHub API Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data as GistData;
};
