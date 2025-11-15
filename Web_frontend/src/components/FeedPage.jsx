import { useState } from "react";
import { Heart, MessageCircle, Share2, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { communityPosts } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function FeedPage() {
  const [likedPosts, setLikedPosts] = useState([]);

  const handleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-24 md:pb-16 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-purple-100 mb-2 text-4xl font-bold neon-glow">Local Feed</h1>
          <p className="text-cyan-200">Discover what's trending in your community</p>
        </motion.div>

        {/* AI Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="card-gradient border-2 border-green-500/30 p-6 mb-8 overflow-hidden relative">
            <motion.div 
              className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-green-400" />
                <span className="text-green-400">AI Weekly Summary</span>
              </div>
              <p className="text-gray-200 mb-2">
                Here's what's trending in your area this week:
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Cozy cafes are popular
                </Badge>
                <Badge variant="secondary">
                  🎨 Art galleries getting buzz
                </Badge>
                <Badge variant="secondary">
                  🌿 Nature spots trending
                </Badge>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {communityPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all card-gradient card-3d border-0">
                {/* Post Header */}
                <div className="p-4 flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Avatar className="w-10 h-10">
                      <img src={post.userAvatar} alt={post.userName} />
                    </Avatar>
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="text-purple-100">{post.userName}</h4>
                    <p className="text-cyan-200">{post.timestamp}</p>
                  </div>
                </div>

                {/* Post Image */}
                <div className="relative aspect-square overflow-hidden group cursor-pointer">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ImageWithFallback
                      src={post.image}
                      alt={post.caption}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>

                {/* Post Actions */}
                <div className="p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className={`gap-2 ${likedPosts.includes(post.id) ? 'text-red-500' : ''}`}
                      >
                        <motion.div
                          animate={likedPosts.includes(post.id) ? { scale: [1, 1.3, 1] } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          <Heart
                            className={`w-5 h-5 ${likedPosts.includes(post.id) ? 'fill-red-500' : ''}`}
                          />
                        </motion.div>
                        <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                      </Button>
                    </motion.div>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 ml-auto">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Caption */}
                  <p className="text-purple-100 mb-2">
                    <span className="mr-2 font-semibold text-cyan-200">{post.userName}</span>
                    {post.caption}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="rounded-2xl px-8"
          >
            Load More Posts
          </Button>
        </motion.div>
      </div>
    </div>
  );
}