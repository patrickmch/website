import posts from './blogPosts.json';

export type BlogPost = (typeof posts)[number];
export const blogPosts: BlogPost[] = [...posts].sort((a, b) => b.published.localeCompare(a.published));
export const blogDescription = 'Practical notes on making work easier with better processes, software, and AI.';
export const postPath = (post: BlogPost) => `/blog/${post.slug}/`;
export const postTitle = (post: BlogPost) => `${post.title} | Patrick McHeyser`;
export const displayDate = (date: string) => new Intl.DateTimeFormat('en-GB', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
}).format(new Date(`${date}T12:00:00Z`));

export const postSchema = (post: BlogPost) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.description,
  datePublished: post.published,
  author: { '@type': 'Person', name: post.author, url: 'https://mcheyser.com/about' },
  mainEntityOfPage: `https://mcheyser.com${postPath(post)}`,
  image: 'https://mcheyser.com/og.png',
});
