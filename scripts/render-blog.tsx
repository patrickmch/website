import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogPage, { BlogArticle, BlogNotFound } from '../pages/BlogPage';
import { blogDescription, blogPosts, postPath, postSchema, postTitle } from '../content/blog';

// The build renders the same reader-facing components as client navigation.
export function renderBlogPages() {
  const pages = [
    { path: '/blog/', title: 'Blog | Patrick McHeyser', description: blogDescription, content: <BlogPage />, post: null, noIndex: false },
    ...blogPosts.map(post => ({ path: postPath(post), title: postTitle(post), description: post.description, content: <BlogArticle post={post} />, post, noIndex: false })),
    { path: '/blog/404.html', title: 'Post not found | Patrick McHeyser', description: 'This post may have moved. Browse the blog to find an article.', content: <BlogNotFound />, post: null, noIndex: true },
  ];
  return pages.map(page => ({
    path: page.path,
    title: page.title,
    description: page.description,
    noIndex: page.noIndex,
    published: page.post?.published,
    schema: page.post ? postSchema(page.post) : null,
    html: renderToStaticMarkup(<StaticRouter location={page.path}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>{page.content}</main>
      <Footer />
    </StaticRouter>),
  }));
}
