import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BlogList } from '@/components/BlogList'
import { BlogDetail } from '@/components/BlogDetail'
import { CreateBlog } from '@/components/CreateBlog'
import { Button } from '@/components/ui/button'
import { Plus, User, Search, Menu } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type ViewState = 'HOME' | 'DETAIL' | 'CREATE';

function App() {
  const [view, setView] = useState<ViewState>('HOME')
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null)

  const handleSelectBlog = (id: string) => {
    setSelectedBlogId(id)
    setView('DETAIL')
  }

  const handleCreateNew = () => {
    setView('CREATE')
  }

  const handleBackToHome = () => {
    setView('HOME')
  }

  const handleCreateSuccess = () => {
    setView('HOME')
  }

  return (
    <div className="min-h-screen bg-white font-sans text-brand-primary selection:bg-brand-primary selection:text-white">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between pointer-events-none"
      >
        <div className="pointer-events-auto flex items-center gap-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-gray-100">

          {(view === 'DETAIL' || view === 'CREATE') && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToHome}
                className="rounded-full hover:bg-gray-100 px-3 font-medium flex items-center gap-2 text-gray-500 hover:text-black"
              >
                <span className="text-lg">←</span> Back
              </Button>
              <div className="w-px h-4 bg-gray-300" />
            </>
          )}

          <div
            className="flex items-center gap-3 cursor-pointer select-none group"
            onClick={handleBackToHome}
          >
            <div className="w-8 h-8 bg-black text-white rounded-md flex items-center justify-center font-serif font-bold text-xs tracking-tighter transition-transform group-hover:scale-105">
              CA
            </div>
            <span className="font-serif font-bold text-lg tracking-tight text-gray-900">
              MONK
            </span>
          </div>

          {view === 'HOME' && (
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500 ml-2">
              <div className="w-px h-4 bg-gray-200" />
              <span onClick={handleBackToHome} className="cursor-pointer hover:text-black transition-colors">Stories</span>
              <span className="cursor-pointer hover:text-black transition-colors">Culture</span>
              <span className="cursor-pointer hover:text-black transition-colors">Podcast</span>
            </nav>
          )}
        </div>

        <div className="pointer-events-auto flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-gray-100">
          <Button variant="ghost" size="icon" onClick={() => { }} className="rounded-full hover:bg-gray-100">
            <Search className="w-5 h-5 text-gray-600" />
          </Button>
          <div className="w-px h-6 bg-gray-200" />
          <Button
            onClick={handleCreateNew}
            className="rounded-full bg-black text-white hover:bg-black/90 px-6"
          >
            Create
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </motion.header>

      <main className="pt-24 min-h-screen">
        <AnimatePresence mode="wait">
          {view === 'HOME' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            >
              <BlogList onSelectBlog={handleSelectBlog} selectedId={null} />
            </motion.div>
          )}

          {view === 'DETAIL' && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="relative z-10"
            >
              <BlogDetail id={selectedBlogId} />
            </motion.div>
          )}

          {view === 'CREATE' && (
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed inset-0 z-40 bg-white overflow-y-auto pt-24 pb-12"
            >
              <div className="max-w-3xl mx-auto px-6">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="font-serif text-4xl font-bold">New Start</h2>
                </div>
                <CreateBlog onSuccess={handleCreateSuccess} onCancel={handleBackToHome} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
