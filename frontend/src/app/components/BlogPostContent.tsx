"use client";
import { GetPostResult } from "@/src/lib/wisp";
import Link from "next/link";
import { useEffect, useState } from "react";
import sanitize, { defaults } from "sanitize-html";
import { Eyebrow, Meta, Page, formatDate } from "./Postfeed";

type RecArticle = {
  id: string;
  slug: string;
  title: string;
};

export const PostContent = ({ content }: { content: string }) => {
  const sanitizedContent = sanitize(content, {
    allowedTags: [
      "b",
      "br",
      "i",
      "em",
      "strong",
      "a",
      "img",
      "h1",
      "h2",
      "h3",
      "code",
      "pre",
      "p",
      "li",
      "ul",
      "ol",
      "blockquote",
      // tables
      "td",
      "th",
      "table",
      "tr",
      "tbody",
      "thead",
      "tfoot",
      "small",
      "div",
      "iframe",
    ],
    allowedAttributes: {
      ...defaults.allowedAttributes,
      "*": ["style"],
      iframe: ["src", "allowfullscreen", "style"],
      a: ["href", "target", "rel"],
      p: ["align", "style"],
    },
    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com"],
  });
  return (
    <div
      className="mx-auto"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    ></div>
  );
};

function readingTime(html: string) {
  const words = html.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export const BlogPostContent = (props: { post: GetPostResult["post"]; slug: string; }) => {
  const post = props.post
  const slug = props.slug

  const [recs, setRecs] = useState<RecArticle[]>([]);

  useEffect(() => {
    if (!slug) return;
    
    fetch(`https://rice-thoughts-production.up.railway.app/recs?slug=${slug}`)
    // fetch(`http://127.0.0.1:8000/recs?slug=${slug}`)
      .then((response) => response.json())
      .then((data) => setRecs(data.recommendations ?? []))
      .catch((error) => console.error("Error fetching recommendations:", error));
  }, [slug]);

  if (!post) return null;
  const { title, content, tags } = post;

  return (
    <Page>
      <article className="border-t border-line pt-8 md:pt-10">
        <Eyebrow>{(tags[0]?.name ?? "Article").toUpperCase()}</Eyebrow>

        <h1 className="mt-4 font-serif text-3xl font-normal text-pretty text-ink-strong sm:text-4xl md:text-display">
          {title}
        </h1>

        {post.description && (
          <p className="mt-4 text-base leading-relaxed text-pretty text-muted sm:text-lg">
            {post.description}
          </p>
        )}

        <Meta
          className="mt-6"
          parts={[
            formatDate(post.publishedAt || post.createdAt),
            readingTime(content),
            ...tags.map((tag) => tag.name),
          ]}
        />

        <div className="
          mt-9 wrap-break-word text-base leading-body text-body sm:text-lg
          prose-headings:font-serif prose-headings:font-normal prose-headings:leading-tight
          prose-headings:text-ink-strong
          prose-h1:mt-10 prose-h1:mb-0 prose-h1:text-2xl md:prose-h1:text-3xl
          prose-h2:mt-10 prose-h2:mb-0 prose-h2:text-2xl md:prose-h2:text-3xl
          prose-h3:mt-8 prose-h3:mb-0 prose-h3:text-xl md:prose-h3:text-2xl
          prose-p:mt-6 prose-p:mb-0
          prose-ul:mt-6 prose-ul:list-disc prose-ul:pl-6
          prose-ol:mt-6 prose-ol:list-decimal prose-ol:pl-6
          prose-li:mt-2
          prose-a:text-accent-soft prose-a:underline prose-a:underline-offset-2
          prose-strong:text-ink
          prose-img:mt-8 prose-img:h-auto prose-img:max-w-full
          prose-code:rounded prose-code:bg-line-soft prose-code:px-1.5 prose-code:py-0.5
          prose-code:text-ink
          prose-pre:mt-6 prose-pre:overflow-x-auto prose-pre:bg-line-soft prose-pre:p-4
          [&_pre_code]:bg-transparent [&_pre_code]:p-0
          prose-blockquote:mt-8 prose-blockquote:border-l-2 prose-blockquote:border-accent
          prose-blockquote:pl-6 prose-blockquote:font-serif prose-blockquote:leading-snug
          prose-blockquote:text-ink-strong prose-blockquote:text-xl md:prose-blockquote:text-2xl
          [&_table]:mt-6 [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto
          [&_iframe]:mt-6 [&_iframe]:max-w-full
        ">
          <PostContent content={content} />
        </div>

        {recs.length > 0 && (
          <section className="mt-12 md:mt-14">
            <div className="border-b border-line pb-4">
              <Eyebrow>KEEP READING</Eyebrow>
            </div>
            {recs.map((rec) => (
              <Link
                key={rec.id}
                href={`/blog/${rec.slug}`}
                className="block border-b border-line-soft py-5 last:border-b-0"
              >
                <div className="wrap-break-word font-serif text-lg leading-tight text-ink sm:text-xl">
                  {rec.title}
                </div>
              </Link>
            ))}
          </section>
        )}
      </article>
    </Page>
  );
};