import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageSquare, Heart, Reply, ChevronLeft, ChevronRight } from "lucide-react";

interface Comment {
  id: number;
  author: string;
  text: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
}

export default function CommentSection() {
  const [allComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Dr. Sarah Chen",
      text: "This is exactly the kind of nuanced discussion we need in medicine. The evidence presented here really highlights the complexity of screening recommendations.",
      timestamp: "2 hours ago",
      likes: 12,
      replies: [
        {
          id: 11,
          author: "Mike Johnson",
          text: "I agree completely. The false positive rates are concerning.",
          timestamp: "1 hour ago",
          likes: 3,
          replies: []
        },
        {
          id: 12,
          author: "Dr. Emily Rodriguez",
          text: "But we can't ignore the lives saved by early detection.",
          timestamp: "45 minutes ago",
          likes: 8,
          replies: []
        },
        {
          id: 13,
          author: "Alex Thompson",
          text: "Great point about the psychological impact on patients.",
          timestamp: "30 minutes ago",
          likes: 2,
          replies: []
        }
      ]
    },
    {
      id: 2,
      author: "Jennifer Martinez",
      text: "As someone who has been through multiple screenings, I appreciate seeing both perspectives laid out clearly.",
      timestamp: "3 hours ago",
      likes: 18,
      replies: []
    },
    {
      id: 3,
      author: "Dr. Robert Kim",
      text: "The cost-benefit analysis section was particularly insightful. Healthcare policy needs this level of detail.",
      timestamp: "4 hours ago",
      likes: 7,
      replies: [
        {
          id: 31,
          author: "Lisa Wong",
          text: "Absolutely. The economic impact is often overlooked.",
          timestamp: "3 hours ago",
          likes: 4,
          replies: []
        },
        {
          id: 32,
          author: "Dr. Mark Davis",
          text: "We need more studies on long-term outcomes.",
          timestamp: "2 hours ago",
          likes: 6,
          replies: []
        }
      ]
    },
    {
      id: 4,
      author: "Patient Advocate",
      text: "Thank you for presenting both sides fairly. This helps patients make informed decisions.",
      timestamp: "5 hours ago",
      likes: 25,
      replies: []
    },
    {
      id: 5,
      author: "Dr. Anna Patel",
      text: "The guidelines need updating based on latest research. This debate format is excellent.",
      timestamp: "6 hours ago",
      likes: 11,
      replies: []
    },
    {
      id: 6,
      author: "Health Researcher",
      text: "More randomized controlled trials are needed to settle this debate definitively.",
      timestamp: "7 hours ago",
      likes: 14,
      replies: []
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [showMoreReplies, setShowMoreReplies] = useState<number[]>([]);

  const commentsPerPage = 5;
  const totalPages = Math.ceil(allComments.length / commentsPerPage);
  const startIndex = (currentPage - 1) * commentsPerPage;
  const currentComments = allComments.slice(startIndex, startIndex + commentsPerPage);

  const handleSubmit = () => {
    if (newComment.trim() && username.trim()) {
      // In a real app, this would be added to the backend
      setNewComment("");
      alert("Comment submitted successfully!");
    } else {
      alert("Please enter both your name and comment.");
    }
  };

  const handleReply = (parentId: number) => {
    if (replyText.trim() && username.trim()) {
      // In a real app, this would be added to the backend
      setReplyText("");
      setReplyingTo(null);
      alert("Reply submitted successfully!");
    } else {
      alert("Please enter both your name and reply.");
    }
  };

  const handleLike = (commentId: number) => {
    // In a real app, this would update the backend
    console.log(`Liked comment ${commentId}`);
  };

  const toggleShowMoreReplies = (commentId: number) => {
    setShowMoreReplies(prev => 
      prev.includes(commentId) 
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <MessageSquare className="mr-3 h-6 w-6 text-gray-600" />
        Discussion
      </h2>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <Input
            placeholder="Enter your name or username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="max-w-xs"
          />
          <Textarea
            placeholder="Share your thoughts on this debate..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            Post Comment
          </Button>
        </div>

        <div className="space-y-6">
          {currentComments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-b-0">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">
                    {comment.author.charAt(0)}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-gray-900">{comment.author}</span>
                    <span className="text-sm text-gray-500">{comment.timestamp}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{comment.text}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{comment.timestamp}</span>
                    <button 
                      onClick={() => handleLike(comment.id)}
                      className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                    >
                      <Heart className="h-4 w-4" />
                      <span>{comment.likes}</span>
                    </button>
                    <button 
                      onClick={() => setReplyingTo(comment.id)}
                      className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
                    >
                      <Reply className="h-4 w-4" />
                      <span>Reply</span>
                    </button>
                  </div>

                  {comment.replies.length > 0 && (
                    <div className="mt-4 space-y-4 pl-6 border-l-2 border-gray-100">
                      {/* Show only first reply by default */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">
                              {comment.replies[0].author.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-gray-900">{comment.replies[0].author}</span>
                              <span className="text-sm text-gray-500">{comment.replies[0].timestamp}</span>
                            </div>
                            <p className="text-gray-700">{comment.replies[0].text}</p>
                            <button 
                              onClick={() => handleLike(comment.replies[0].id)}
                              className="flex items-center space-x-1 hover:text-red-500 transition-colors mt-2 text-sm text-gray-500"
                            >
                              <Heart className="h-3 w-3" />
                              <span>{comment.replies[0].likes}</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Show more replies if expanded */}
                      {showMoreReplies.includes(comment.id) && comment.replies.slice(1).map((reply) => (
                        <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-gray-600">
                                {reply.author.charAt(0)}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium text-gray-900">{reply.author}</span>
                                <span className="text-sm text-gray-500">{reply.timestamp}</span>
                              </div>
                              <p className="text-gray-700">{reply.text}</p>
                              <button 
                                onClick={() => handleLike(reply.id)}
                                className="flex items-center space-x-1 hover:text-red-500 transition-colors mt-2 text-sm text-gray-500"
                              >
                                <Heart className="h-3 w-3" />
                                <span>{reply.likes}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Show more replies button */}
                      {comment.replies.length > 1 && (
                        <button
                          onClick={() => toggleShowMoreReplies(comment.id)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          {showMoreReplies.includes(comment.id) 
                            ? `Hide ${comment.replies.length - 1} replies`
                            : `Show ${comment.replies.length - 1} more replies`
                          }
                        </button>
                      )}
                    </div>
                  )}

                  {replyingTo === comment.id && (
                    <div className="mt-4 space-y-3">
                      <Input
                        placeholder="Enter your name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="max-w-xs"
                      />
                      <Textarea
                        placeholder="Write a reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="min-h-[80px]"
                      />
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => handleReply(comment.id)}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Post Reply
                        </Button>
                        <Button 
                          onClick={() => setReplyingTo(null)}
                          size="sm"
                          variant="outline"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-4 pt-6 border-t">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            
            <Button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}