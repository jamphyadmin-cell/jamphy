import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';

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
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    include: {
      author: {
        select: { name: true, image: true }
      }
    }
  });

  return (
    <div className="min-h-screen bg-obsidian-deep py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-10">
        
        {/* Back to Home Button */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-cyber-green hover:text-white transition-colors font-bold text-sm bg-cyber-green/10 px-4 py-2 rounded-full border border-cyber-green/20">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Home
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-black text-white font-display-lg uppercase tracking-tight mb-4">
            Jamphy Blog
          </h1>
          <p className="text-lg text-on-surface-variant font-body-md">
            Insights, strategies, and deep dives into IIT JAM Physics preparation.
          </p>
        </div>

        {/* Blog Grid */}
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
