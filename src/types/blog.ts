export interface Blog {
  id: number;
  title: string;
  content: string;
  slug: string;
  coverImage: string | null;
  meta?: {
    title?: string;
    description?: string;
  };
  createdAt: string;
}
