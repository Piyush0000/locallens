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
    <div className="min-h-screen pt-24 md:pt-32 pb-24 md:pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-gray-900 dark:text-white mb-2">Local Feed</h1>
          <p className="text-gray-600 dark:text-gray-400">Discover what's trending in your community</p>
        </motion.div>

        {/* AI Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-800 p-6 mb-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-green-600 dark:text-green-400">AI Weekly Summary</span>
              </div>
              <p className="text-gray-900 dark:text-white mb-2">
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
              <Card className="overflow-hidden hover:shadow-xl transition-all bg-white dark:bg-slate-800 border-0">
                {/* Post Header */}
                <div className="p-4 flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <img src={post.userAvatar} alt={post.userName} />
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="text-gray-900 dark:text-white">{post.userName}</h4>
                    <p className="text-gray-500 dark:text-gray-400">{post.timestamp}</p>
                  </div>
                </div>

                {/* Post Image */}
                <div className="relative aspect-square overflow-hidden group cursor-pointer">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Post Actions */}
                <div className="p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={`gap-2 ${likedPosts.includes(post.id) ? 'text-red-500' : ''}`}
                    >
                      <Heart
                        className={`w-5 h-5 ${likedPosts.includes(post.id) ? 'fill-red-500' : ''}`}
                      />
                      <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 ml-auto">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Caption */}
                  <p className="text-gray-900 dark:text-white mb-2">
                    <span className="mr-2">{post.userName}</span>
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
