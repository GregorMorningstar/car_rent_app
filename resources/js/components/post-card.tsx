import React from 'react';
import { Link } from '@inertiajs/react';

type Post = {
	id: number;
	title: string;
	content?: string | null;
	slug?: string | null;
	meta_title?: string | null;
	meta_description?: string | null;
	meta_keywords?: string | null;
	og_image?: string | null;
	canonical_url?: string | null;
	image_path?: string | null;
	user?: {
		id: number;
		name: string;
	} | null;
	created_at?: string | null;
};

interface PostCardProps {
	post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
	const content = (post.content ?? '').toString();
	return (
		<div className="bg-white rounded shadow p-4 mb-4">
			{post.image_path && (
				<img
					src={post.image_path}
					alt={post.title}
					className="w-full h-48 object-cover rounded mb-3"
				/>
			)}
			<h2 className="text-xl font-bold mb-2">{post.title}</h2>
			<div className="text-gray-600 text-sm mb-2">
				{post.user && <span>By {post.user.name}</span>}
				{post.created_at && (
					<span> • {new Date(post.created_at).toLocaleDateString()}</span>
				)}
			</div>
			<div className="mb-3 text-gray-800">
				{content.length > 200 ? content.slice(0, 200) + '...' : content}
			</div>
			<Link
				href={`/blog/${post.id}`}
				className="text-blue-600 hover:underline font-medium"
			>
				Read more
			</Link>
			{/* SEO meta info (optional, for debugging/preview) */}
			{/*
			<div className="mt-2 text-xs text-gray-400">
				<div>Meta title: {post.meta_title}</div>
				<div>Meta desc: {post.meta_description}</div>
				<div>Keywords: {post.meta_keywords}</div>
			</div>
			*/}
		</div>
	);
};

export default PostCard;
