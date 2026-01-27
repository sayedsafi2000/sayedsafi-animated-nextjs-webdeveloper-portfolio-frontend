'use client'

import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useInView } from 'react-intersection-observer'
import { Star } from 'lucide-react'
import { blogAPI } from '@/lib/api'

type CommentItem = {
  _id: string
  name: string
  message: string
  rating?: number
  createdAt: string
}

type Stats = {
  commentsCount: number
  ratingsCount: number
  ratingsTotal: number
  ratingsAverage: number
}

type Props = {
  slug: string
  initialStats?: Partial<Stats>
  onStatsChange?: (stats: Stats) => void
}

const DEFAULT_LIMIT = 10

export default function BlogComments({ slug, initialStats, onStatsChange }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '200px' })

  const [comments, setComments] = useState<CommentItem[]>([])
  const [stats, setStats] = useState<Stats>(() => ({
    commentsCount: initialStats?.commentsCount ?? 0,
    ratingsCount: initialStats?.ratingsCount ?? 0,
    ratingsTotal: initialStats?.ratingsTotal ?? 0,
    ratingsAverage: initialStats?.ratingsAverage ?? 0,
  }))

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState<number>(0)
  const [hoverRating, setHoverRating] = useState<number>(0)
  const [website, setWebsite] = useState('') // honeypot
  const [submitting, setSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const averageText = useMemo(() => {
    const avg = stats.ratingsAverage ?? (stats.ratingsCount > 0 ? stats.ratingsTotal / stats.ratingsCount : 0)
    return avg > 0 ? avg.toFixed(1) : '0.0'
  }, [stats])

  const hasMore = page < totalPages

  const loadComments = async (targetPage: number, mode: 'replace' | 'append') => {
    try {
      setError(null)
      setLoading(true)

      const res = await blogAPI.getComments(slug, { limit: DEFAULT_LIMIT, page: targetPage })
      const data = res?.data

      const newComments: CommentItem[] = data?.comments || []
      const pagination = data?.pagination
      const newStats: Stats | undefined = data?.stats

      setComments((prev) => (mode === 'append' ? [...prev, ...newComments] : newComments))

      const nextPage = pagination?.page ?? targetPage
      const nextTotalPages = pagination?.pages ?? 1
      setPage(nextPage)
      setTotalPages(nextTotalPages)

      if (newStats) {
        setStats(newStats)
        onStatsChange?.(newStats)
      }
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Failed to load comments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!inView) return
    loadComments(1, 'replace')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, slug])

  const submitComment = async (e: FormEvent) => {
    e.preventDefault()
    setSuccessMsg(null)
    setError(null)

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedMessage = message.trim()

    if (trimmedName.length < 2) {
      setError('Please enter your name')
      return
    }
    if (trimmedMessage.length < 5) {
      setError('Please write a longer comment (min 5 characters)')
      return
    }

    setSubmitting(true)
    try {
      const payload: any = {
        name: trimmedName,
        message: trimmedMessage,
        website, // honeypot
      }
      if (trimmedEmail) payload.email = trimmedEmail
      if (rating >= 1 && rating <= 5) payload.rating = rating

      const res = await blogAPI.createComment(slug, payload)

      const created = res?.data?.comment as CommentItem | undefined
      const newStats = res?.data?.stats as Stats | undefined

      if (created?._id) {
        setComments((prev) => [created, ...prev])
      }
      if (newStats) {
        setStats(newStats)
        onStatsChange?.(newStats)
      }

      setMessage('')
      setRating(0)
      setHoverRating(0)
      setSuccessMsg('Thanks! Your comment has been submitted.')
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ||
        (Array.isArray(e?.response?.data?.errors) ? e.response.data.errors?.[0]?.msg : null) ||
        'Failed to submit comment'
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso)
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    } catch {
      return iso
    }
  }

  return (
    <section id="comments" ref={ref} className="mt-14">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Comments & Ratings
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Share your feedback and rate this post.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => {
              const value = i + 1
              const filled = value <= Math.round(Number(averageText))
              return (
                <Star
                  key={value}
                  className={`h-4 w-4 ${filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                  aria-hidden="true"
                />
              )
            })}
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold">{averageText}</span>
            <span className="text-gray-500 dark:text-gray-400"> ({stats.ratingsCount || 0})</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <form onSubmit={submitComment} className="space-y-4">
          {/* Honeypot (hidden from humans) */}
          <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
            <label>
              Website
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                autoComplete="name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Your name"
                required
                minLength={2}
                maxLength={80}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email <span className="text-gray-400">(optional)</span>
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="you@example.com"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Email is not shown publicly.
              </p>
            </div>
          </div>

          {/* Rating */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Rating <span className="text-gray-400">(optional)</span>
              </label>
              {rating > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setRating(0)
                    setHoverRating(0)
                  }}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, i) => {
                  const value = i + 1
                  const active = value <= (hoverRating || rating)
                  return (
                    <button
                      key={value}
                      type="button"
                      onMouseEnter={() => setHoverRating(value)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(value)}
                      className="p-1"
                      aria-label={`Rate ${value} star`}
                    >
                      <Star
                        className={`h-6 w-6 ${active ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                        aria-hidden="true"
                      />
                    </button>
                  )
                })}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {rating > 0 ? `${rating}/5` : 'No rating'}
              </span>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Comment <span className="text-red-500">*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Write your comment..."
              required
              minLength={5}
              maxLength={2000}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
          {successMsg && (
            <p className="text-sm text-green-600 dark:text-green-400">{successMsg}</p>
          )}

          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Be respectful. Spam will be ignored.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {submitting ? 'Submitting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {stats.commentsCount || comments.length} Comment{(stats.commentsCount || comments.length) === 1 ? '' : 's'}
          </h3>
          {loading && (
            <span className="text-sm text-gray-500 dark:text-gray-400">Loading...</span>
          )}
        </div>

        {comments.length === 0 && !loading ? (
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30 p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No comments yet. Be the first to comment!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((c) => (
              <div
                key={c._id}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold">
                      {(c.name || '?').trim().charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white leading-tight">
                        {c.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(c.createdAt)}
                      </p>
                    </div>
                  </div>

                  {typeof c.rating === 'number' && c.rating >= 1 ? (
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => {
                        const value = i + 1
                        const filled = value <= c.rating!
                        return (
                          <Star
                            key={value}
                            className={`h-4 w-4 ${filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                            aria-hidden="true"
                          />
                        )
                      })}
                    </div>
                  ) : null}
                </div>

                <p className="mt-4 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {c.message}
                </p>
              </div>
            ))}
          </div>
        )}

        {hasMore && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => loadComments(page + 1, 'append')}
              disabled={loading}
              className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Loading...' : 'Load more'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

