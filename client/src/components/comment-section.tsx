import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, ThumbsUp, Reply } from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  text: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
}

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Dr. Sarah Johnson",
      text: "Great debate! I appreciate both perspectives. In my practice, I've seen how individual risk factors really matter in screening decisions.",
      timestamp: "2 hours ago",
      likes: 12,
      replies: [
        {
          id: 2,
          author: "NurseCarol",
          text: "Absolutely agree. Patient education is key regardless of which approach we take.",
          timestamp: "1 hour ago",
          likes: 5,
          replies: []
        }
      ]
    },
    {
      id: 3,
      author: "HealthAdvocate2024",
      text: "The cost-effectiveness argument is compelling, but we can't put a price on peace of mind for patients.",
      timestamp: "3 hours ago",
      likes: 8,
      replies: []
    },
    {
      id: 4,
      author: "MedStudent_Jane",
      text: "This really helped me understand the complexity of screening guidelines. Thank you for the balanced presentation.",
      timestamp: "4 hours ago",
      likes: 15,
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: "Anonymous User",
        text: newComment,
        timestamp: "Just now",
        likes: 0,
        replies: []
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const handleSubmitReply = (parentId: number) => {
    if (replyText.trim()) {
      const reply: Comment = {
        id: Date.now(),
        author: "Anonymous User",
        text: replyText,
        timestamp: "Just now",
        likes: 0,
        replies: []
      };
      
      setComments(prev => prev.map(comment => 
        comment.id === parentId 
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      ));
      setReplyText('');
      setReplyingTo(null);
    }
  };

  const handleLike = (commentId: number, isReply: boolean = false, parentId?: number) => {
    setComments(prev => prev.map(comment => {
      if (isReply && comment.id === parentId) {
        return {
          ...comment,
          replies: comment.replies.map(reply =>
            reply.id === commentId ? { ...reply, likes: reply.likes + 1 } : reply
          )
        };
      }
      return comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment;
    }));
  };

  return (
    <div className="mb-12">
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <MessageCircle className="h-6 w-6 text-gray-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">
            Discussion ({comments.length} comments)
          </h2>
        </div>

        {/* New Comment Form */}
        <div className="mb-8">
          <Textarea
            placeholder="Share your thoughts on this debate..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mb-4"
            rows={3}
          />
          <Button 
            onClick={handleSubmitComment}
            disabled={!newComment.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Post Comment
          </Button>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <div className="font-semibold text-gray-800">{comment.author}</div>
                <div className="text-sm text-gray-500">{comment.timestamp}</div>
              </div>
              <p className="text-gray-700 mb-3 leading-relaxed">{comment.text}</p>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleLike(comment.id)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-sm">{comment.likes}</span>
                </button>
                <button
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <Reply className="h-4 w-4" />
                  <span className="text-sm">Reply</span>
                </button>
              </div>

              {/* Reply Form */}
              {replyingTo === comment.id && (
                <div className="mt-4 ml-6">
                  <Textarea
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="mb-2"
                    rows={2}
                  />
                  <div className="flex space-x-2">
                    <Button 
                      size="sm"
                      onClick={() => handleSubmitReply(comment.id)}
                      disabled={!replyText.trim()}
                    >
                      Reply
                    </Button>
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyText('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="mt-4 ml-6 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-semibold text-gray-800">{reply.author}</div>
                        <div className="text-sm text-gray-500">{reply.timestamp}</div>
                      </div>
                      <p className="text-gray-700 mb-2 leading-relaxed">{reply.text}</p>
                      <button
                        onClick={() => handleLike(reply.id, true, comment.id)}
                        className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span className="text-sm">{reply.likes}</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}