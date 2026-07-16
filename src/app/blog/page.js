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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col bg-obsidian-surface border border-obsidian-elevated rounded-3xl overflow-hidden hover:border-electric-violet/50 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(139,92,246,0.1)]">
                
                {/* Cover Image */}
                <div className="relative w-full h-48 bg-zinc-900 overflow-hidden">
                  {post.coverImage ? (
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-electric-violet/20 to-cyber-green/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl text-white/50">menu_book</span>
                    </div>
                  )}
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                      <span className="px-3 py-1 text-xs font-bold bg-black/60 backdrop-blur-md text-white rounded-full border border-white/10 uppercase tracking-wide">
                        {post.tags[0]}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-electric-violet transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-on-surface-variant line-clamp-3 mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  
                  {/* Footer metadata */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden border border-white/10 relative">
                        {post.author.image ? (
                          <Image src={post.author.image} alt={post.author.name || 'Author'} fill className="object-cover" sizes="32px" />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full text-xs font-bold text-white bg-electric-violet">
                            {post.author.name ? post.author.name[0] : 'U'}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white truncate max-w-[100px]">{post.author.name}</span>
                        <span className="text-[10px] text-zinc-500">
                          {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-cyber-green bg-cyber-green/10 px-2 py-1 rounded-md">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {getReadTime(post.content)} min
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
