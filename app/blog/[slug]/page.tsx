import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Clock, Tag, ArrowRight } from "lucide-react";
import { getBlogPost, blogPosts } from "@/lib/blog-data";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Donut Studio Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="section-base min-h-screen">

      {/* Hero */}
      <div className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover brightness-50"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg,#080300)] via-black/30 to-transparent" />

        {/* Back button */}
        <div className="absolute top-28 left-0 right-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 rounded-full hover:bg-white/15">
              <ChevronLeft size={15} />
              Înapoi la Blog
            </Link>
          </div>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 pb-12 pt-20 bg-gradient-to-t from-[var(--bg,#080300)] to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-[#BC8157] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                <Tag size={10} />
                {post.category}
              </span>
              <span className="text-white/50 text-sm">{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="flex items-center gap-1.5 text-white/50 text-sm">
                <Clock size={12} />
                {post.readTime} citire
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight max-w-3xl">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">

          {/* Content */}
          <article className="space-y-6">
            {/* Excerpt lead */}
            <p className="text-xl leading-relaxed font-medium border-l-2 border-[#BC8157] pl-6"
              style={{ color: "var(--text-70)" }}>
              {post.excerpt}
            </p>

            {/* Sections */}
            {post.content.map((section, i) => {
              if (section.type === "heading") {
                return (
                  <h2 key={i} className="font-display text-2xl sm:text-3xl text-[var(--text)] pt-4 pb-1">
                    {section.text}
                  </h2>
                );
              }
              if (section.type === "list" && section.items) {
                return (
                  <ul key={i} className="space-y-3">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-[var(--text-65)] leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#BC8157] mt-2.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-[var(--text-65)] leading-relaxed text-base sm:text-[17px]">
                  {section.text}
                </p>
              );
            })}

            {/* Divider */}
            <div className="flex items-center gap-4 pt-6">
              <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              <span className="text-[#BC8157] text-lg">🍩</span>
              <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            </div>

            {/* CTA */}
            <div className="rounded-3xl p-8 border border-[#BC8157]/20 bg-[#BC8157]/6 text-center">
              <p className="font-display text-2xl text-[var(--text)] mb-3">Îți este poftă?</p>
              <p className="text-[var(--text-55)] mb-6 text-sm">
                Descoperă colecția noastră de gogoși artizanale, pregătite cu ingrediente naturale premium.
              </p>
              <Link href="/menu"
                className="inline-flex items-center gap-2 bg-[#BC8157] hover:bg-[#9a6540] text-white px-7 py-3.5 rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-[#BC8157]/25 hover:-translate-y-0.5 text-sm">
                Descoperă meniul
                <ArrowRight size={16} />
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Article info */}
            <div className="rounded-2xl border border-[#BC8157]/15 overflow-hidden"
              style={{ background: "var(--surface)" }}>
              <div className="px-5 py-4 border-b border-[#BC8157]/10">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-40)" }}>
                  Despre articol
                </p>
              </div>
              <div className="px-5 py-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: "var(--text-45)" }}>Categorie</span>
                  <span className="text-[#BC8157] font-medium">{post.category}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: "var(--text-45)" }}>Publicat</span>
                  <span style={{ color: "var(--text-70)" }}>{post.date}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: "var(--text-45)" }}>Timp citire</span>
                  <span style={{ color: "var(--text-70)" }}>{post.readTime}</span>
                </div>
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="rounded-2xl border border-[#BC8157]/15 overflow-hidden"
                style={{ background: "var(--surface)" }}>
                <div className="px-5 py-4 border-b border-[#BC8157]/10">
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-40)" }}>
                    Articole similare
                  </p>
                </div>
                <div className="p-3 space-y-2">
                  {related.map((r) => (
                    <Link key={r.slug} href={`/blog/${r.slug}`}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#BC8157]/8 transition-colors group">
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={r.coverImage} alt={r.title} width={56} height={56} className="w-full h-full object-cover brightness-110" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-snug text-[var(--text)] group-hover:text-[#BC8157] transition-colors line-clamp-2">
                          {r.title}
                        </p>
                        <p className="text-xs mt-1" style={{ color: "var(--text-40)" }}>{r.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
