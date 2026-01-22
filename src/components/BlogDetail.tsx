import { useQuery } from "@tanstack/react-query"
import { fetchBlogById } from "@/services/api"
import { motion } from "framer-motion"
import { ThumbsUp, MessageCircle } from "lucide-react"

interface BlogDetailProps {
    id: string | null;
}

export function BlogDetail({ id }: BlogDetailProps) {
    const { data: blog, isLoading, error } = useQuery({
        queryKey: ['blog', id],
        queryFn: () => fetchBlogById(id!),
        enabled: !!id,
    })

    if (!id) return null;
    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading story...</div>
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Error loading story</div>
    if (!blog) return <div className="min-h-screen flex items-center justify-center">Story not found</div>

    return (
        <article className="min-h-screen bg-white pb-24">
            <div className="h-[70vh] relative overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src={blog.coverImage}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 lg:p-24 text-white">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-4xl mx-auto space-y-6"
                    >
                        <div className="flex items-center gap-4">
                            <span className="px-3 py-1 border border-white/30 backdrop-blur-sm rounded-full text-xs font-bold tracking-widest uppercase bg-black/20 text-white" style={{ color: 'white' }}>
                                {blog.category[0]}
                            </span>
                            <span className="text-white text-sm font-medium drop-shadow-sm" style={{ color: 'white' }}>{blog.readTime || '5 min read'}</span>
                        </div>
                        <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight drop-shadow-md text-white" style={{ color: 'white' }}>{blog.title}</h1>
                        <div className="flex items-center gap-4 pt-4">
                            {blog.author && (
                                <>
                                    <img src={blog.author.avatar} alt="Author" className="w-10 h-10 rounded-full border-2 border-white/20" />
                                    <div>
                                        <p className="text-sm font-bold text-white" style={{ color: 'white' }}>{blog.author.name}</p>
                                        <p className="text-xs text-white/80" style={{ color: 'rgba(255,255,255,0.8)' }}>{blog.author.role}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 -mt-12 relative z-10">
                <div className="bg-white p-8 md:p-12 rounded-t-3xl shadow-sm border-t border-gray-100">
                    <p className="font-serif text-2xl md:text-3xl leading-relaxed text-gray-900 mb-12 italic border-l-4 border-black pl-6">
                        "{blog.description}"
                    </p>

                    <div className="prose prose-lg prose-gray max-w-none font-serif">
                        <div className="whitespace-pre-wrap text-xl leading-8 text-gray-800">
                            <span className="float-left text-7xl leading-[0.8] font-bold mr-3 mt-2 font-serif">
                                {blog.content.charAt(0)}
                            </span>
                            {blog.content.slice(1)}
                        </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-gray-100">
                        <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-gray-400">Filed Under</h3>
                        <div className="flex flex-wrap gap-2 mb-12">
                            {blog.category.map(c => (
                                <span key={c} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors cursor-pointer">
                                    {c}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center justify-between py-8 border-y border-gray-100">
                            <div className="flex gap-6">
                                <button className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
                                    <ThumbsUp className="w-6 h-6" />
                                    <span className="font-medium text-lg">Like</span>
                                </button>
                                <button className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
                                    <MessageCircle className="w-6 h-6" />
                                    <span className="font-medium text-lg">Comment</span>
                                </button>
                            </div>
                            <div className="text-gray-400 text-sm">
                                Share this story
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}
