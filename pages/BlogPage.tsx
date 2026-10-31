import { Link, useParams } from 'react-router-dom';
import { blogDescription, blogPosts, displayDate, postPath, postSchema, postTitle, type BlogPost } from '../content/blog';
import { usePageMeta } from '../hooks/usePageMeta';

export default function BlogPage() {
  usePageMeta('Blog | Patrick McHeyser', blogDescription, '/blog/');
  return <div className="container blog">
    <header className="blog__intro">
      <h1>Blog</h1>
      <p className="lead">{blogDescription}</p>
    </header>
    <ul className="blog__posts">
      {blogPosts.map(post => <li key={post.slug}>
        <article className="blog-entry">
          <p className="blog__date"><time dateTime={post.published}>{displayDate(post.published)}</time></p>
          <div>
            <h2><Link to={postPath(post)}>{post.title}</Link></h2>
            <p className="blog-entry__summary">{post.description}</p>
          </div>
        </article>
      </li>)}
    </ul>
  </div>;
}

export function BlogArticle({ post }: { post: BlogPost }) {
  usePageMeta(postTitle(post), post.description, postPath(post), {
    type: 'article', published: post.published, schema: postSchema(post),
  });
  return <div className="container blog">
    <article className="blog-article">
      <Link className="blog__back" to="/blog/">Back to the blog</Link>
      <header className="blog-article__header">
        <h1>{post.title}</h1>
        <p className="blog-article__meta">
          <Link to="/about" rel="author">{post.author}</Link>
          <time dateTime={post.published}>{displayDate(post.published)}</time>
        </p>
      </header>
      <div className="blog-article__body">
        {post.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </div>
      <footer className="blog-article__footer"><Link className="blog__back" to="/blog/">Back to the blog</Link></footer>
    </article>
  </div>;
}

export function BlogNotFound() {
  usePageMeta('Post not found | Patrick McHeyser', 'This post may have moved. Browse the blog to find an article.', '/blog/', { noIndex: true });
  return <div className="container blog">
    <div className="blog__intro">
      <h1>Post not found</h1>
      <p className="lead">This post may have moved. Browse the blog to find an article.</p>
      <Link className="blog__back" to="/blog/">Back to the blog</Link>
    </div>
  </div>;
}

export function BlogPostRoute() {
  const { slug } = useParams();
  const post = blogPosts.find(item => item.slug === slug);
  return post ? <BlogArticle post={post} /> : <BlogNotFound />;
}
