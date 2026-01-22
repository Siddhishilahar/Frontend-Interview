import { useQuery } from "@tanstack/react-query"
import { fetchBlogs } from "@/services/api"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ThumbsUp, MessageCircle } from "lucide-react"

interface BlogListProps {
    onSelectBlog: (id: string) => void;
    selectedId: string | null;
}

export function BlogList({ onSelectBlog }: BlogListProps) {
    const { data: blogs, isLoading, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogs,
    })

    if (isLoading) return <div className="p-12 text-center text-gray-400">Loading stories...</div>
    if (error) return <div className="p-12 text-center text-red-500">Error loading stories</div>

    const featured = blogs?.[0];
    const others = blogs?.slice(1);

    return (
        <div className="max-w-7xl mx-auto px-6 pb-24">
            {featured && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-16 group cursor-pointer"
                    onClick={() => onSelectBlog(featured.id)}
                >
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="relative overflow-hidden rounded-2xl aspect-[16/10]">
                            <img
                                src={featured.coverImage}
                                alt={featured.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="w-8 h-px bg-brand-accent"></span>
                                <span className="text-sm font-bold tracking-widest uppercase text-brand-accent">Featured Story</span>
                            </div>
                            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight group-hover:text-gray-600 transition-colors">
                                {featured.title}
                            </h2>
                            <p className="text-lg text-gray-500 leading-relaxed line-clamp-3">
                                {featured.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm font-medium text-gray-400">
                                <span>{featured.readTime || '5 min read'}</span>
                                <span>•</span>
                                <span>{new Date(featured.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                                <button className="flex items-center gap-2 hover:text-black transition-colors group/btn text-gray-500">
                                    <ThumbsUp className="w-5 h-5" />
                                    <span className="font-medium">Like</span>
                                </button>
                                <button className="flex items-center gap-2 hover:text-black transition-colors text-gray-500">
                                    <MessageCircle className="w-5 h-5" />
                                    <span className="font-medium">Comment</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {others?.map((blog, idx) => (
                    <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group cursor-pointer flex flex-col gap-4"
                        onClick={() => onSelectBlog(blog.id)}
                    >
                        <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-gray-100">
                            <img
                                src={blog.coverImage}
                                alt={blog.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-white/90 backdrop-blur text-[10px] font-bold tracking-wider uppercase rounded-full">
                                    {blog.category[0]}
                                </span>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-serif text-2xl font-bold leading-tight mb-2 group-hover:underline decoration-1 underline-offset-4 decoration-gray-300">
                                {blog.title}
                            </h3>
                            <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-3">
                                {blog.description}
                            </p>
                            <div className="flex gap-2">
                                {blog.tags?.slice(0, 2).map(tag => (
                                    <span key={tag} className="text-[10px] text-gray-400 font-medium px-2 py-1 bg-gray-50 rounded-md">#{tag}</span>
                                ))}
                            </div>
                            <div className="flex items-center gap-4 pt-4 mt-2 border-t border-gray-100 text-gray-500">
                                <button className="flex items-center gap-1.5 hover:text-black transition-colors group/btn">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span className="text-xs font-medium">Like</span>
                                </button>
                                <button className="flex items-center gap-1.5 hover:text-black transition-colors">
                                    <MessageCircle className="w-4 h-4" />
                                    <span className="text-xs font-medium">Comment</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
