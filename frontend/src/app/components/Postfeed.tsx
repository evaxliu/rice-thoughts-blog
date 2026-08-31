import Link from "next/link";
import type { GetPostsResult } from "@/src/lib/wisp";

type Post = GetPostsResult["posts"][number];

export function formatDate(value: Date | string) {
  return Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export function Meta({ parts, className = "" }: { parts: string[]; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-faint ${className}`}>
      {parts.map((part, i) => (
        <span key={`${part}-${i}`} className="flex items-center gap-x-2.5">
          {i > 0 && <span aria-hidden className="opacity-50">·</span>}
          <span className={i === 0 ? "whitespace-nowrap" : ""}>{part}</span>
        </span>
      ))}
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-label font-semibold tracking-label text-eyebrow">{children}</div>
  );
}

export function Page({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-page px-4 sm:px-6 md:px-8">{children}</div>;
}

function postMetaParts(post: Post) {
  return [
    formatDate(post.publishedAt || post.createdAt),
    ...post.tags.map((tag) => tag.name),
  ];
}

export default function PostFeed({
  posts,
  eyebrow = "FEATURED",
  emptyTitle,
  emptyDescription,
}: {
  posts: Post[];
  eyebrow?: string;
  emptyTitle?: string;
  emptyDescription?: string;
}) {
  const [featured, ...rest] = posts;

  return (
    <Page>
      <section className="border-y border-line py-8 sm:py-10 md:py-11">
        <Eyebrow>{eyebrow}</Eyebrow>
        {featured ? (
          <>
            <h1 className="mt-4 font-serif text-3xl font-normal text-balance text-ink-strong sm:text-4xl md:text-display">
              <Link
                href={`/blog/${featured.slug}`}
                className="wrap-break-word text-ink-strong transition-opacity hover:opacity-80"
              >
                {featured.title}
              </Link>
            </h1>
            {featured.description && (
              <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                {featured.description}
              </p>
            )}
            <Meta parts={postMetaParts(featured)} className="mt-6" />
          </>
        ) : (
          <>
            <h1 className="mt-4 font-serif text-3xl font-normal text-balance text-ink-strong sm:text-4xl md:text-display">
              {emptyTitle}
            </h1>
            {emptyDescription && (
              <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                {emptyDescription}
              </p>
            )}
          </>
        )}
      </section>

      <ul className="mt-2">
        {rest.map((post) => (
          <li key={post.id} className="border-b border-line-soft last:border-b-0">
            <article className="py-6 sm:py-7">
              <h2 className="font-serif text-xl font-normal sm:text-2xl md:text-title">
                <Link
                  href={`/blog/${post.slug}`}
                  className="wrap-break-word text-ink decoration-line underline-offset-4 hover:underline"
                >
                  {post.title}
                </Link>
              </h2>
              {post.description && (
                <p className="mt-2 text-sm leading-normal text-muted sm:text-base">
                  {post.description}
                </p>
              )}
              <Meta parts={postMetaParts(post)} className="mt-3" />
            </article>
          </li>
        ))}
      </ul>
    </Page>
  );
}