import Link from "next/link";
import Image from "next/image";
import { Clock, Tag, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

export const metadata = {
  title: "Blog — Donut Studio",
  description: "Povești, curiozități și magia din spatele gogoșilor artizanale.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="section-base min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16 max-w-2xl mt-8">
<h1 className="font-display text-5xl sm:text-6xl text-[var(--text)] leading-none mb-5">
            Povești despre<br />
            <span className="text-[#BC8157]">gogoși</span>
          </h1>
          <p className="text-lg text-[var(--text-55)] leading-relaxed">
            Descoperă istoria, magia și pasiunea din spatele fiecărei gogoși artizanale.
          </p>
        </div>

        {/* Featured post */}
        <Link href={`/blog/${featured.slug}`} className="group block mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-[#BC8157]/15 hover:border-[#BC8157]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#BC8157]/10"
            style={{ background: "var(--card-bg, var(--surface))" }}>
            {/* Image */}
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                className="object-cover brightness-110 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 lg:bg-gradient-to-l" />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 bg-[#BC8157] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  <Tag size={10} />
                  {featured.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <div className="flex items-center gap-4 text-xs mb-5" style={{ color: "var(--text-40)" }}>
                <span>{featured.date}</span>
                <span className="w-1 h-1 rounded-full bg-[#BC8157]/40" />
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {featured.readTime} citire
                </span>
              </div>
              <h2 className="font-display text-3xl lg:text-4xl text-[var(--text)] leading-tight mb-4 group-hover:text-[#BC8157] transition-colors duration-300">
                {featured.title}
              </h2>
              <p className="text-[var(--text-55)] leading-relaxed mb-8 text-base">
                {featured.excerpt}
              </p>
              <div className="inline-flex items-center gap-2 text-[#BC8157] font-semibold text-sm group-hover:gap-3 transition-all duration-200">
                Citește articolul
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </Link>

        {/* Rest of posts */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <div className="h-full rounded-3xl overflow-hidden border border-[#BC8157]/12 hover:border-[#BC8157]/35 transition-all duration-500 hover:shadow-xl hover:shadow-[#BC8157]/8 hover:-translate-y-1"
                  style={{ background: "var(--card-bg, var(--surface))" }}>
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover brightness-110 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 bg-[#BC8157]/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                        <Tag size={10} />
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs mb-4" style={{ color: "var(--text-40)" }}>
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-[#BC8157]/40" />
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {post.readTime} citire
                      </span>
                    </div>
                    <h3 className="font-display text-xl text-[var(--text)] leading-snug mb-3 group-hover:text-[#BC8157] transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[var(--text-50)] leading-relaxed mb-5 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-[#BC8157] font-semibold text-sm group-hover:gap-2.5 transition-all duration-200">
                      Citește mai mult
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
