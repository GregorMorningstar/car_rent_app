import React from 'react';

type Post = {
	id: number;
	title: string;
	body: string;
	slug: string;
	meta_title?: string;
	meta_description?: string;
	meta_keywords?: string;
	og_image?: string;
	canonical_url?: string;
	image_path?: string;
	user?: {
		id: number;
		name: string;
	};
	created_at?: string;
};

interface PostCardProps {
	post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
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
				{post.body.length > 200 ? post.body.slice(0, 200) + '...' : post.body}
			</div>
			<a
				href={post.canonical_url || `/posts/${post.slug}`}
				className="text-blue-600 hover:underline font-medium"
			>
				Read more
			</a>
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
