import LandingLayout from '@/layouts/landing-layout';
import { Head, usePage } from '@inertiajs/react';

type UserRef = { id: number; name: string } | null;
type Post = {
  id: number;
  title: string;
  content: string;
  image_path?: string | null;
  user?: UserRef;
  created_at?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  og_image?: string | null;
  canonical_url?: string | null;
};

export default function BlogShow() {
  const { post } = usePage<{ post: Post }>().props;

  return (
    <LandingLayout title={post.title || 'Artykuł'}>
      <Head>
        {post.meta_description && (
          <meta name="description" content={post.meta_description} />
        )}
        {post.meta_keywords && (
          <meta name="keywords" content={post.meta_keywords} />
        )}
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.meta_title || post.title} />
        {post.meta_description && (
          <meta property="og:description" content={post.meta_description} />
        )}
        {post.og_image && <meta property="og:image" content={post.og_image} />}
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.meta_title || post.title} />
        {post.meta_description && (
          <meta name="twitter:description" content={post.meta_description} />
        )}
        {post.og_image && <meta name="twitter:image" content={post.og_image} />}
        {post.canonical_url && (
          <link rel="canonical" href={post.canonical_url} />
        )}
      </Head>
      <section className="pt-16 md:pt-20 pb-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{post.title}</h1>
          <div className="text-sm text-muted-foreground">
            {post.user && <span>By {post.user.name}</span>}
            {post.created_at && <span> • {new Date(post.created_at).toLocaleDateString('pl-PL')}</span>}
          </div>
          {post.image_path && (
            <img src={post.image_path} alt={post.title} className="w-full rounded-lg object-cover" />
          )}
          <div className="prose max-w-none">
            {post.content}
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
