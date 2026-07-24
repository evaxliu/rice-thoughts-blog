// import Link from "next/link"
import { BlogPostContent } from "@/src/app/components/BlogPostContent";
import { wisp } from "@/src/lib/wisp";
import type { Metadata } from "next";

interface Params {
  slug: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { post } = await wisp.getPost(slug);
    if (!post) return { title: "Post not found" };

    const url = `https://ricethoughts.com/blog/${slug}`;
    const description = post.description ?? undefined;
    const image = post.image ?? "https://ricethoughts.com/Kengdoru.png";

    return {
      title: post.title,
      description,
      alternates: { canonical: url },
      openGraph: {
        type: "article",
        title: post.title,
        description,
        url,
        siteName: "Rice Thoughts Blog",
        publishedTime: post.publishedAt
          ? new Date(post.publishedAt).toISOString()
          : undefined,
        images: [{ url: image, width: 1200, height: 630 }],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description,
        images: [image],
      },
    };
  } catch {
    return { title: "Post not found" };
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const result = await wisp.getPost(slug);

  return <BlogPostContent post={result.post} slug={slug} />;
}