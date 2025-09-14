import LandingLayout from '@/layouts/landing-layout';
import { usePage } from '@inertiajs/react';

type UserRef = { id: number; name: string } | null;
type Post = {
  id: number;
  title: string;
  content: string;
  image_path?: string | null;
  user?: UserRef;
  created_at?: string | null;
};

export default function BlogShow() {
  const { post } = usePage<{ post: Post }>().props;

  return (
    <LandingLayout title={post.title || 'Artykuł'}>
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