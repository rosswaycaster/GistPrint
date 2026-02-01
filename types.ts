export interface GistFile {
  filename: string;
  type: string;
  language: string | null;
  raw_url: string;
  size: number;
  truncated: boolean;
  content: string;
}

export interface GistData {
  id: string;
  description: string | null;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  } | null;
  files: Record<string, GistFile>;
  created_at: string;
  updated_at: string;
}

export interface GistError {
  message: string;
}
