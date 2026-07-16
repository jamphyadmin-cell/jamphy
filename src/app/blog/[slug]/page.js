import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import ViewCounter from '@/components/ViewCounter';

// Calculate read time based on word count
function getReadTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = await prisma.post.findUnique({
    where: { slug: resolvedParams.slug },
    include: { author: true }
  });

  if (!post || post.status !== 'PUBLISHED') {
    return { title: 'Post Not Found | Jamphy' };
  }

  return {
    title: `${post.title} | Jamphy Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author.name],
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const post = await prisma.post.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      author: {
        select: { name: true, image: true, username: true }
      }
    }
  });

  if (!post || post.status !== 'PUBLISHED') {
    notFound();
  }

  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.email === "jamphy.admin@gmail.com";
  const isAuthor = session?.user?.id === post.author.id;
  const canEdit = isAdmin || isAuthor;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: post.coverImage ? [post.coverImage] : [],
    datePublished: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: [{
      '@type': 'Person',
      name: post.author.name,
      url: post.author.username ? `https://jamphy.com/profile/${post.author.username}` : undefined
    }]
  };

  return (
    <article className="min-h-screen bg-obsidian-deep py-20 px-4 sm:px-6 lg:px-8 font-body">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto mt-10">
        
        {/* Back Button and Edit Button */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-cyber-green hover:text-white transition-colors font-bold text-sm bg-cyber-green/10 px-4 py-2 rounded-full border border-cyber-green/20">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Blog
          </Link>

          {canEdit && (
            <Link href={`/blog/${post.slug}/edit`} className="inline-flex items-center gap-2 text-electric-violet hover:text-white transition-colors font-bold text-sm bg-electric-violet/10 px-4 py-2 rounded-full border border-electric-violet/20">
              <span className="material-symbols-outlined text-[16px]">edit</span>
              Edit Post
            </Link>
          )}
        </div>

        {/* Header */}
        <header className="mb-12">
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 mb-6">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 text-xs font-bold bg-electric-violet/20 text-electric-violet rounded-full border border-electric-violet/30 uppercase tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white font-display-lg uppercase tracking-tight mb-8 leading-[1.1]">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 py-6 border-y border-white/10">
            <div className="w-12 h-12 rounded-full bg-zinc-800 overflow-hidden border border-white/20 relative">
              {post.author.image ? (
                <Image src={post.author.image} alt={post.author.name || 'Author'} fill className="object-cover" sizes="48px" />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-lg font-bold text-white bg-electric-violet">
                  {post.author.name ? post.author.name[0] : 'U'}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-white">{post.author.name}</span>
              <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span>{getReadTime(post.content)} min read</span>
                <span>•</span>
                <ViewCounter slug={post.slug} initialViews={post.views} />
              </div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-16 border border-white/10 shadow-2xl">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-invert max-w-none 
          prose-headings:font-display-lg prose-headings:uppercase prose-headings:font-black prose-headings:tracking-tight
          prose-h2:text-electric-violet prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-10
          prose-h3:text-cyber-green prose-h3:text-3xl prose-h3:mt-16 prose-h3:mb-8
          prose-p:text-on-surface-variant prose-p:text-xl prose-p:leading-[2.2] prose-p:mb-12
          prose-a:text-electric-violet prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white prose-strong:font-bold
          prose-blockquote:border-l-4 prose-blockquote:border-electric-violet prose-blockquote:bg-white/5 prose-blockquote:p-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-white prose-blockquote:text-xl
          prose-ul:my-10 prose-ul:text-xl prose-ul:leading-[2.2] prose-ul:list-disc
          prose-ol:my-10 prose-ol:text-xl prose-ol:leading-[2.2] prose-ol:list-decimal
          prose-li:text-on-surface-variant prose-li:mb-4
          marker:text-electric-violet
          prose-code:text-cyber-green prose-code:bg-black/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {post.content}
          </ReactMarkdown>
        </div>

      </div>
    </article>
  );
}
