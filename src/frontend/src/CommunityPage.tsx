import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Post {
  id: number;
  author: string;
  message: string;
  likes: number;
  time: string;
  liked: boolean;
}

interface Thread {
  id: number;
  emoji: string;
  title: string;
  posts: Post[];
  postCount: number;
  lastActivity: string;
  expanded: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const INITIAL_THREADS: Thread[] = [
  {
    id: 1,
    emoji: "😴",
    title: "Sleep Training Tips",
    postCount: 234,
    lastActivity: "2 min ago",
    expanded: false,
    posts: [
      {
        id: 1,
        author: "Meena R.",
        message:
          "The 4-7-8 soothing method worked wonders for us at 3 months! Give it 5 nights.",
        likes: 14,
        time: "2 hours ago",
        liked: false,
      },
      {
        id: 2,
        author: "Priya S.",
        message:
          "White noise machine was a game changer. Baby sleeps 6 hours straight now.",
        likes: 9,
        time: "5 hours ago",
        liked: false,
      },
      {
        id: 3,
        author: "Aisha K.",
        message:
          "Consistent bedtime routine at 7pm made all the difference for us.",
        likes: 7,
        time: "1 day ago",
        liked: false,
      },
    ],
  },
  {
    id: 2,
    emoji: "🤱",
    title: "Breastfeeding Support",
    postCount: 412,
    lastActivity: "5 min ago",
    expanded: false,
    posts: [
      {
        id: 1,
        author: "Divya M.",
        message:
          "Nipple shield saved my breastfeeding journey. Don't give up too early!",
        likes: 22,
        time: "3 hours ago",
        liked: false,
      },
      {
        id: 2,
        author: "Roopa T.",
        message:
          "Lactation consultant visit at week 2 helped me with latch issues completely.",
        likes: 18,
        time: "6 hours ago",
        liked: false,
      },
      {
        id: 3,
        author: "Sunita B.",
        message:
          "Fenugreek tea boosted my milk supply noticeably after 3 days.",
        likes: 11,
        time: "2 days ago",
        liked: false,
      },
    ],
  },
  {
    id: 3,
    emoji: "🥦",
    title: "Baby's First Foods",
    postCount: 189,
    lastActivity: "12 min ago",
    expanded: false,
    posts: [
      {
        id: 1,
        author: "Lakshmi P.",
        message:
          "Started with mashed banana at 6 months. Baby loved it from the first bite!",
        likes: 16,
        time: "4 hours ago",
        liked: false,
      },
      {
        id: 2,
        author: "Rekha G.",
        message:
          "Introduce one new food every 3 days to spot any allergies. Works perfectly.",
        likes: 20,
        time: "1 day ago",
        liked: false,
      },
      {
        id: 3,
        author: "Tara N.",
        message:
          "Sweet potato puree was our baby's absolute favourite first veggie!",
        likes: 13,
        time: "3 days ago",
        liked: false,
      },
    ],
  },
  {
    id: 4,
    emoji: "💪",
    title: "Postpartum Recovery",
    postCount: 327,
    lastActivity: "18 min ago",
    expanded: false,
    posts: [
      {
        id: 1,
        author: "Anjali V.",
        message:
          "Pelvic floor exercises starting at week 6 really helped my recovery.",
        likes: 25,
        time: "1 hour ago",
        liked: false,
      },
      {
        id: 2,
        author: "Deepa C.",
        message:
          "Iron-rich foods made a huge difference to my energy levels postpartum.",
        likes: 19,
        time: "8 hours ago",
        liked: false,
      },
      {
        id: 3,
        author: "Nisha F.",
        message:
          "Don't rush the timeline. Every body heals differently. Be kind to yourself.",
        likes: 30,
        time: "2 days ago",
        liked: false,
      },
    ],
  },
  {
    id: 5,
    emoji: "🧴",
    title: "Baby Skin & Care",
    postCount: 156,
    lastActivity: "1 hour ago",
    expanded: false,
    posts: [
      {
        id: 1,
        author: "Shalini H.",
        message:
          "Coconut oil works brilliantly for cradle cap. Just massage gently and rinse.",
        likes: 17,
        time: "3 hours ago",
        liked: false,
      },
      {
        id: 2,
        author: "Kavya W.",
        message:
          "Use fragrance-free products only for the first year. Saved us from so many rashes.",
        likes: 21,
        time: "1 day ago",
        liked: false,
      },
      {
        id: 3,
        author: "Usha D.",
        message:
          "Pat dry instead of rubbing after bath. Baby skin stays so much softer.",
        likes: 8,
        time: "4 days ago",
        liked: false,
      },
    ],
  },
  {
    id: 6,
    emoji: "💜",
    title: "Mom Mental Health",
    postCount: 298,
    lastActivity: "30 min ago",
    expanded: false,
    posts: [
      {
        id: 1,
        author: "Pooja L.",
        message:
          "It's okay to not feel okay. Postpartum depression is real and treatable. Ask for help.",
        likes: 45,
        time: "2 hours ago",
        liked: false,
      },
      {
        id: 2,
        author: "Smita A.",
        message:
          "10 minutes of alone time daily for journaling completely changed my mindset.",
        likes: 32,
        time: "6 hours ago",
        liked: false,
      },
      {
        id: 3,
        author: "Radha O.",
        message:
          "Talking to a therapist postpartum was the best decision I made for myself.",
        likes: 38,
        time: "1 day ago",
        liked: false,
      },
    ],
  },
];

const FEATURED_STORIES = [
  {
    id: 1,
    emoji: "🌸",
    title: "How I Survived My First Month as a New Mom",
    excerpt:
      "The sleepless nights, the tiny victories — here's my honest journey through the most beautiful chaos of my life.",
    author: "Priya Sharma",
    readTime: "4 min read",
    likes: 234,
  },
  {
    id: 2,
    emoji: "🌟",
    title: "Breastfeeding Didn't Come Easy — And That's Okay",
    excerpt:
      "No one told me it would be this hard. But with patience, support, and the right help, we found our rhythm.",
    author: "Ananya Reddy",
    readTime: "6 min read",
    likes: 189,
  },
  {
    id: 3,
    emoji: "💪",
    title: "My Postpartum Body: Learning to Love Myself Again",
    excerpt:
      "The changes were real, but so was my strength. Here's how I rebuilt my confidence after my baby was born.",
    author: "Kavitha Nair",
    readTime: "5 min read",
    likes: 312,
  },
];

const TRENDING_TOPICS = [
  "#FirstTrimester",
  "#BabyMilestones",
  "#PostpartumRecovery",
  "#BabyNamesIndia",
  "#MorningWellness",
  "#SleepTraining",
  "#BreastfeedingTips",
  "#BabyFood",
  "#NewMomLife",
  "#PregnancyGlow",
  "#MomCommunity",
  "#NestingMode",
  "#BabySkin",
  "#PostpartumYoga",
];

// ─── CommunityPage ─────────────────────────────────────────────────────────────
interface CommunityPageProps {
  onLogout: () => void;
  topNavSlot: React.ReactNode;
  bottomNavSlot: React.ReactNode;
}

export default function CommunityPage({
  onLogout: _onLogout,
  topNavSlot,
  bottomNavSlot,
}: CommunityPageProps) {
  const [threads, setThreads] = useState<Thread[]>(INITIAL_THREADS);
  const [newMessages, setNewMessages] = useState<Record<number, string>>({});
  const [quickAsk, setQuickAsk] = useState("");
  const [quickAskPosted, setQuickAskPosted] = useState(false);
  const [storyLikes, setStoryLikes] = useState<Record<number, number>>({});

  const toggleThread = (id: number) =>
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, expanded: !t.expanded } : t)),
    );

  const likePost = (threadId: number, postId: number) =>
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? {
              ...t,
              posts: t.posts.map((p) =>
                p.id === postId
                  ? {
                      ...p,
                      likes: p.liked ? p.likes - 1 : p.likes + 1,
                      liked: !p.liked,
                    }
                  : p,
              ),
            }
          : t,
      ),
    );

  const addPost = (threadId: number) => {
    const msg = newMessages[threadId]?.trim();
    if (!msg) return;
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? {
              ...t,
              postCount: t.postCount + 1,
              lastActivity: "just now",
              posts: [
                ...t.posts,
                {
                  id: Date.now(),
                  author: "You",
                  message: msg,
                  likes: 0,
                  time: "just now",
                  liked: false,
                },
              ],
            }
          : t,
      ),
    );
    setNewMessages((prev) => ({ ...prev, [threadId]: "" }));
  };

  const handleQuickAsk = () => {
    if (!quickAsk.trim()) return;
    setQuickAskPosted(true);
    setTimeout(() => setQuickAskPosted(false), 3000);
    setQuickAsk("");
  };

  const likeStory = (id: number) =>
    setStoryLikes((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #F8F4FB 0%, #EDE4F5 100%)",
        minHeight: "100vh",
      }}
    >
      {topNavSlot}

      <main className="max-w-4xl mx-auto px-4 pt-20 pb-24">
        {/* Page Header */}
        <div
          className="rounded-3xl px-8 py-6 mb-8 animate-fade-in"
          style={{
            background: "linear-gradient(135deg, #8E5C9F 0%, #B07CC6 100%)",
            boxShadow: "0 12px 40px rgba(142,92,159,0.25)",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="text-4xl">👩‍👩‍👧</div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Mothers Community
              </h1>
              <p className="text-purple-200 text-sm mt-1">
                Connect, share, and support each other on this journey
              </p>
            </div>
            <div
              className="ml-auto hidden sm:flex flex-col items-center px-5 py-3 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.18)" }}
            >
              <span className="text-white text-xs opacity-80">Members</span>
              <span className="text-white font-bold text-xl">12,483</span>
            </div>
          </div>
        </div>

        {/* Quick Ask */}
        <div
          className="rounded-2xl p-5 mb-8"
          style={{
            background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(192,132,222,0.2)",
            boxShadow: "0 4px 16px rgba(142,92,159,0.08)",
          }}
        >
          <p className="font-bold text-purple-800 mb-1">Ask the Community</p>
          <p className="text-purple-400 text-xs mb-3">
            Get answers from thousands of mothers like you 💜
          </p>
          <textarea
            value={quickAsk}
            onChange={(e) => setQuickAsk(e.target.value)}
            placeholder="Ask anything — parenting tips, health questions, experiences..."
            className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none"
            rows={3}
            style={{
              border: "1.5px solid #D8C0F0",
              color: "#2B1F3A",
              background: "#F8F4FB",
            }}
            data-ocid="community.quick_ask.textarea"
          />
          {quickAskPosted ? (
            <div className="mt-2 text-center text-sm font-semibold text-purple-600 animate-fade-in">
              ✓ Your question has been posted! Mothers will respond soon 💜
            </div>
          ) : (
            <button
              type="button"
              onClick={handleQuickAsk}
              disabled={!quickAsk.trim()}
              data-ocid="community.quick_ask.submit_button"
              className="mt-3 px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #8E5C9F, #B07CC6)",
              }}
            >
              Post Question
            </button>
          )}
        </div>

        {/* Trending Topics */}
        <div className="mb-8">
          <p className="font-bold text-purple-800 mb-3 text-sm uppercase tracking-wide">
            🔥 Trending Topics
          </p>
          <div className="flex flex-wrap gap-2">
            {TRENDING_TOPICS.map((tag) => (
              <button
                key={tag}
                type="button"
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:bg-purple-100"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(192,132,222,0.3)",
                  color: "#8E5C9F",
                }}
                data-ocid="community.trending.tag"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Discussion Threads */}
        <div className="mb-8">
          <p className="font-bold text-purple-800 mb-4 text-base">
            💬 Discussion Threads
          </p>
          <div className="flex flex-col gap-3">
            {threads.map((thread) => (
              <div
                key={thread.id}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(192,132,222,0.2)",
                  boxShadow: "0 4px 16px rgba(142,92,159,0.06)",
                }}
                data-ocid={`community.thread.${thread.id}`}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-purple-50/60 transition-colors"
                  onClick={() => toggleThread(thread.id)}
                  data-ocid={`community.thread.toggle.${thread.id}`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">{thread.emoji}</span>
                    <div className="text-left flex-1">
                      <div className="font-semibold text-purple-800 text-sm">
                        {thread.title}
                      </div>
                      <div className="flex gap-3 mt-0.5">
                        <span className="text-purple-400 text-xs">
                          {thread.postCount} posts
                        </span>
                        <span className="text-purple-300 text-xs">·</span>
                        <span className="text-purple-400 text-xs">
                          Active {thread.lastActivity}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="hidden sm:block px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: "#F0E8FA", color: "#8E5C9F" }}
                    >
                      Join Discussion
                    </span>
                    <span className="text-purple-400 text-xs">
                      {thread.expanded ? "▲" : "▼"}
                    </span>
                  </div>
                </button>

                {thread.expanded && (
                  <div className="px-5 pb-5">
                    <div className="flex flex-col gap-3 mb-4">
                      {thread.posts.map((post) => (
                        <div
                          key={post.id}
                          className="bg-purple-50/60 rounded-xl p-3"
                          data-ocid={`community.post.${post.id}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-purple-700 text-xs">
                              {post.author}
                            </span>
                            <span className="text-purple-400 text-xs">
                              {post.time}
                            </span>
                          </div>
                          <p className="text-purple-800 text-sm leading-relaxed mb-2">
                            {post.message}
                          </p>
                          <button
                            type="button"
                            onClick={() => likePost(thread.id, post.id)}
                            className={`flex items-center gap-1 text-xs transition-colors ${post.liked ? "text-pink-500" : "text-purple-400 hover:text-pink-400"}`}
                            data-ocid={`community.like.button.${post.id}`}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill={post.liked ? "currentColor" : "none"}
                              stroke="currentColor"
                              strokeWidth="2"
                              aria-hidden="true"
                            >
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            {post.likes}
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <textarea
                        placeholder="Share your experience..."
                        className="text-sm rounded-xl px-3 py-2 resize-none flex-1 outline-none"
                        rows={2}
                        style={{
                          border: "1.5px solid #D8C0F0",
                          color: "#2B1F3A",
                          background: "#FAF5FF",
                        }}
                        value={newMessages[thread.id] || ""}
                        onChange={(e) =>
                          setNewMessages((prev) => ({
                            ...prev,
                            [thread.id]: e.target.value,
                          }))
                        }
                        data-ocid="community.new_post.textarea"
                      />
                      <button
                        type="button"
                        onClick={() => addPost(thread.id)}
                        className="self-end px-4 py-2 rounded-xl text-white text-sm font-semibold"
                        style={{
                          background:
                            "linear-gradient(135deg, #8E5C9F, #B07CC6)",
                        }}
                        data-ocid="community.new_post.submit_button"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Featured Stories */}
        <div className="mb-8">
          <p className="font-bold text-purple-800 mb-4 text-base">
            🌟 Featured Stories
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURED_STORIES.map((story) => (
              <div
                key={story.id}
                className="rounded-2xl p-5 flex flex-col gap-3"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(192,132,222,0.2)",
                  boxShadow: "0 4px 16px rgba(142,92,159,0.06)",
                }}
                data-ocid={`community.story.${story.id}`}
              >
                <div className="text-3xl">{story.emoji}</div>
                <h3 className="font-bold text-purple-800 text-sm leading-snug">
                  {story.title}
                </h3>
                <p className="text-purple-500 text-xs leading-relaxed flex-1">
                  {story.excerpt}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <div>
                    <p className="text-purple-700 text-xs font-semibold">
                      {story.author}
                    </p>
                    <p className="text-purple-400 text-xs">{story.readTime}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => likeStory(story.id)}
                    className="flex items-center gap-1 text-purple-400 hover:text-pink-500 transition-colors text-xs"
                    data-ocid={`community.story.like.${story.id}`}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    {story.likes + (storyLikes[story.id] ?? 0)}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {bottomNavSlot}
    </div>
  );
}
