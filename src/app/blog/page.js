import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Blog | Jamphy',
  description: 'Read the latest strategies, study plans, and mathematical insights for IIT JAM Physics preparation.',
};

// Calculate read time based on word count
function getReadTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export default async function BlogPage() {
  const session = await getServerSession(authOptions);
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    include: {
      author: {
        select: { name: true, image: true, username: true }
      }
    }
  });

  return (
    <div className="min-h-screen bg-obsidian-deep py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-2 relative">
        
        {/* Back to Home Button (Absolute on Desktop, Normal on Mobile) */}
        <div className="mb-8 md:absolute md:top-2 md:left-4 z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-cyber-green hover:text-white transition-colors font-bold text-sm bg-cyber-green/10 px-4 py-2 rounded-full border border-cyber-green/20">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Home
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 pt-2 md:pt-10">
          <h1 className="text-5xl font-black text-white font-display-lg uppercase tracking-tight mb-4">
            Jamphy Blog
          </h1>
          <p className="text-lg text-on-surface-variant font-body-md mb-8">
            Insights, strategies, and deep dives into IIT JAM Physics preparation.
          </p>
          {session?.user ? (
            <Link
              href="/blog/new"
              className="inline-flex items-center gap-2 bg-electric-violet text-white font-bold px-6 py-3 rounded-xl hover:bg-[#8B5CF6]/90 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">edit</span>
              Write for Jamphy
            </Link>
          ) : (
            <Link
              href="/blog/new"
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">edit</span>
              Write for Jamphy
            </Link>
          )}
        </div>

        {/* Blog Grid */}
        {/* Write for Jamphy CTA Banner */}
        <div className="mb-12 bg-gradient-to-r from-electric-violet/10 to-cyber-green/10 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Share your knowledge</h3>
            <p className="text-sm text-on-surface-variant">Write an article on strategy, theory, or problem-solving for IIT JAM Physics. All submissions are reviewed by moderators.</p>
          </div>
          <Link
            href="/blog/new"
            className="shrink-0 inline-flex items-center gap-2 bg-electric-violet text-white font-bold px-5 py-2.5 rounded-xl hover:bg-[#8B5CF6]/90 transition-all whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
            Submit Article
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center p-12 bg-obsidian-surface border border-obsidian-elevated rounded-3xl">
            <span className="material-symbols-outlined text-6xl text-electric-violet mb-4">article</span>
            <h2 className="text-2xl font-bold text-white mb-2">Check back soon!</h2>
            <p className="text-on-surface-variant">We are crafting the first batch of articles.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => {
              // The first post is "featured" and spans 2 columns on large screens
              const isFeatured = index === 0;

              return (
                <Link key={post.id} href={`/blog/${post.slug}`} className={`group flex flex-col bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 ${isFeatured ? 'lg:col-span-2 lg:flex-row' : ''}`}>
                  
                  {/* Cover Image */}
                  <div className={`relative bg-zinc-900 overflow-hidden ${isFeatured ? 'w-full lg:w-3/5 h-64 lg:h-auto' : 'w-full h-52'}`}>
                    {post.coverImage ? (
                      <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-electric-violet/20 to-cyber-green/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <span className="material-symbols-outlined text-4xl text-white/50">menu_book</span>
                      </div>
                    )}
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                        <span className="px-3 py-1 text-[10px] font-bold bg-white/10 backdrop-blur-md text-white rounded-md border border-white/20 uppercase tracking-wide">
                          {post.tags[0]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`p-6 flex flex-col flex-1 justify-center ${isFeatured ? 'lg:w-2/5 lg:p-8' : ''}`}>
                    <h2 className={`${isFeatured ? 'text-3xl' : 'text-xl'} font-bold text-white mb-3 line-clamp-3 group-hover:text-gray-300 transition-colors tracking-tight leading-snug`}>
                      {post.title}
                    </h2>
                    
                    {isFeatured && (
                      <p className="text-base text-zinc-400 line-clamp-3 mb-6">
                        {post.excerpt}
                      </p>
                    )}
                    
                    {/* Footer metadata */}
                    <div className="flex items-center text-sm text-zinc-500 gap-2 mt-auto pt-4 border-t border-white/5">
                      <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>•</span>
                      <span>{getReadTime(post.content)} min read</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">visibility</span>{post.views}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
