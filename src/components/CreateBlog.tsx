import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createBlog } from "@/services/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"

interface CreateBlogProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export function CreateBlog({ onSuccess, onCancel }: CreateBlogProps) {
    const queryClient = useQueryClient()
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        content: "",
        coverImage: ""
    })

    const mutation = useMutation({
        mutationFn: createBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
            onSuccess()
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutation.mutate({
            ...formData,
            category: formData.category.split(',').map(c => c.trim().toUpperCase()),
            date: new Date().toISOString(),
        })
    }

    return (
        <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
            onSubmit={handleSubmit}
        >
            <div className="space-y-4">
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-400">Headline</label>
                <Input
                    className="text-4xl md:text-5xl font-serif font-bold !bg-gray-50 !border !border-gray-200 rounded-lg px-4 py-4 shadow-sm focus-visible:ring-1 focus-visible:ring-black placeholder:text-gray-400 h-auto !text-black"
                    placeholder="Title of your story..."
                    required
                    value={formData.title}
                    onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="block text-sm font-bold uppercase tracking-widest text-gray-400">Category</label>
                    <Input
                        className="!bg-gray-50 !border !border-gray-200 rounded-lg px-3 py-2 focus-visible:ring-1 focus-visible:ring-black text-lg !text-black"
                        placeholder="e.g. TECHNOLOGY, DESIGN"
                        required
                        value={formData.category}
                        onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-bold uppercase tracking-widest text-gray-400">Cover Image URL</label>
                    <Input
                        className="!bg-gray-50 !border !border-gray-200 rounded-lg px-3 py-2 focus-visible:ring-1 focus-visible:ring-black text-lg !text-black"
                        placeholder="https://..."
                        value={formData.coverImage}
                        onChange={e => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-400">Summary</label>
                <Textarea
                    className="min-h-[100px] !bg-gray-50 !border !border-gray-200 rounded-lg resize-None p-3 text-lg font-serif italic text-gray-600 focus-visible:ring-1 focus-visible:ring-black !text-black"
                    placeholder="A short description..."
                    required
                    value={formData.description}
                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-400">Story Content</label>
                <Textarea
                    className="min-h-[400px] !bg-gray-50 !border !border-gray-200 rounded-lg px-4 py-4 text-xl font-serif leading-relaxed resize-none focus-visible:ring-1 focus-visible:ring-black !text-black"
                    placeholder="Tell your story..."
                    required
                    value={formData.content}
                    onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                />
            </div>

            <div className="flex justify-end pt-8 border-t border-gray-100">
                <Button type="button" variant="ghost" onClick={onCancel} className="mr-4">Dismiss</Button>
                <Button type="submit" className="bg-black text-white px-8 rounded-full hover:bg-gray-800" disabled={mutation.isPending}>
                    {mutation.isPending ? 'Publishing...' : 'Publish Story'}
                </Button>
            </div>
        </motion.form>
    )
}
