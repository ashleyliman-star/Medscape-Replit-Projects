import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageSquare, Heart, Reply, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Comment, InsertComment } from "@shared/schema";

interface CommentWithTimestamp extends Omit<Comment, 'createdAt'> {
  timestamp: string;
  replies: CommentWithTimestamp[];
}

interface CommentSectionProps {
  debateId: string;
}

export default function CommentSection({ debateId }: CommentSectionProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [showMoreReplies, setShowMoreReplies] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
  const commentsPerPage = 10;

  // Load liked comments from localStorage on component mount
  useEffect(() => {
    const storedLikes = localStorage.getItem(`likedComments_${debateId}`);
    if (storedLikes) {
      try {
        const likes = JSON.parse(storedLikes);
        setLikedComments(new Set(likes));
      } catch (error) {
        console.error('Error parsing liked comments from localStorage:', error);
      }
    }
  }, [debateId]);

  // Save liked comments to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`likedComments_${debateId}`, JSON.stringify(Array.from(likedComments)));
  }, [likedComments, debateId]);

  // Fetch comments for this debate
  const { data: comments = [], isLoading } = useQuery<Comment[]>({
    queryKey: [`/api/comments/${debateId}`]
  });

  // Create comment mutation
  const createCommentMutation = useMutation({
    mutationFn: (commentData: InsertComment) => 
      apiRequest('POST', '/api/comments', commentData),
    onSuccess: () => {
      // Invalidate both the specific debate comments and the general comments query
      queryClient.invalidateQueries({ queryKey: [`/api/comments/${debateId}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/comments/breast-cancer-surveillance`] });
      
      setNewComment("");
      setAuthorName("");
      setReplyTo(null);
      setReplyText("");
      setCurrentPage(1); // Reset to first page to show new comment
      
      toast({
        title: "Comment posted!",
        description: "Your comment has been successfully added to the discussion.",
        variant: "default",
      });
    }
  });

  // Like comment mutation
  const likeCommentMutation = useMutation({
    mutationFn: (commentId: number) => 
      apiRequest('POST', `/api/comments/${commentId}/like`),
    onSuccess: () => {
      // Invalidate both the specific debate comments and the general comments query
      queryClient.invalidateQueries({ queryKey: [`/api/comments/${debateId}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/comments/breast-cancer-surveillance`] });
    }
  });

  // Transform database comments to display format
  const transformComments = (dbComments: Comment[]): CommentWithTimestamp[] => {
    const commentMap = new Map<number, CommentWithTimestamp>();
    const topLevelComments: CommentWithTimestamp[] = [];

    // First pass: create all comments
    dbComments.forEach(comment => {
      const transformedComment: CommentWithTimestamp = {
        ...comment,
        timestamp: formatTimestamp(comment.createdAt),
        replies: []
      };
      commentMap.set(comment.id, transformedComment);
    });

    // Second pass: organize into hierarchy
    dbComments.forEach(comment => {
      const transformedComment = commentMap.get(comment.id)!;
      if (comment.parentId === null) {
        topLevelComments.push(transformedComment);
      } else {
        const parent = commentMap.get(comment.parentId);
        if (parent) {
          parent.replies.push(transformedComment);
        }
      }
    });

    return topLevelComments;
  };

  const formatTimestamp = (date: Date | string) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - commentDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  const handleSubmitComment = () => {
    if (!newComment.trim() || !authorName.trim()) return;
    
    createCommentMutation.mutate({
      debateId,
      authorName: authorName.trim(),
      content: newComment.trim(),
      parentId: null
    });
  };

  const handleSubmitReply = (parentId: number) => {
    if (!replyText.trim() || !authorName.trim()) return;
    
    createCommentMutation.mutate({
      debateId,
      authorName: authorName.trim(),
      content: replyText.trim(),
      parentId
    });
  };

  const handleLikeComment = (commentId: number) => {
    if (likedComments.has(commentId)) {
      toast({
        title: "Already liked!",
        description: "You've already liked this comment.",
        variant: "default",
      });
      return;
    }

    likeCommentMutation.mutate(commentId, {
      onSuccess: () => {
        setLikedComments(prev => new Set(prev).add(commentId));
        toast({
          title: "Comment liked!",
          description: "Your like has been added to this comment.",
          variant: "default",
        });
      }
    });
  };

  const toggleShowMoreReplies = (commentId: number) => {
    setShowMoreReplies(prev => 
      prev.includes(commentId) 
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    );
  };

  const allComments = transformComments(comments);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center py-8">Loading comments...</div>
      </div>
    );
  }

  // Pagination logic
  const totalPages = Math.ceil(allComments.length / commentsPerPage);
  const startIndex = (currentPage - 1) * commentsPerPage;
  const endIndex = startIndex + commentsPerPage;
  const currentComments = allComments.slice(startIndex, endIndex);

  const renderComment = (comment: CommentWithTimestamp, isReply = false) => (
    <div key={comment.id} className={`${isReply ? 'ml-8 border-l-2 border-gray-200 pl-4' : ''}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-700">
            {comment.authorName.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-900">{comment.authorName}</span>
            <span className="text-gray-500 text-sm">{comment.timestamp}</span>
          </div>
          <p className="mt-1 text-gray-800">{comment.content}</p>
          <div className="flex items-center space-x-4 mt-2">
            <button
              onClick={() => handleLikeComment(comment.id)}
              className={`flex items-center space-x-1 transition-colors ${
                likedComments.has(comment.id) 
                  ? 'text-red-500' 
                  : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart className={`h-4 w-4 ${likedComments.has(comment.id) ? 'fill-current' : ''}`} />
              <span className="text-sm">{comment.likes}</span>
            </button>
            <button
              onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
              className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
            >
              <Reply className="h-4 w-4" />
              <span className="text-sm">Reply</span>
            </button>
          </div>
          
          {replyTo === comment.id && (
            <div className="mt-4 space-y-2">
              <Input
                placeholder="Your name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
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
                  onClick={() => handleSubmitReply(comment.id)}
                  disabled={createCommentMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  {createCommentMutation.isPending ? 'Posting...' : 'Post Reply'}
                </Button>
                <Button
                  onClick={() => setReplyTo(null)}
                  variant="outline"
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.slice(0, showMoreReplies.includes(comment.id) ? undefined : 2).map(reply => 
            renderComment(reply, true)
          )}
          {comment.replies.length > 2 && (
            <button
              onClick={() => toggleShowMoreReplies(comment.id)}
              className="ml-8 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              {showMoreReplies.includes(comment.id) 
                ? `Show fewer replies` 
                : `Show ${comment.replies.length - 2} more replies`}
            </button>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center" style={{ fontSize: '24px' }}>
        <MessageSquare className="mr-2 h-6 w-6 text-gray-600" />
        Discussion
      </h2>
      
      <div className="space-y-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <Input
              placeholder="Enter your name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="max-w-xs"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comment
            </label>
            <Textarea
              placeholder="Share your thoughts on this debate..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          <Button 
            onClick={handleSubmitComment} 
            disabled={createCommentMutation.isPending}
            className="bg-blue-600 hover:bg-blue-700" 
            size="sm"
          >
            {createCommentMutation.isPending ? 'Posting...' : 'Post Comment'}
          </Button>
        </div>
        
        <div className="border-t pt-4">
          <div className="space-y-6">
            {currentComments.length > 0 ? (
              currentComments.map(comment => renderComment(comment))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No comments yet. Be the first to share your thoughts!
              </div>
            )}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-6">
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
    </div>
  );
}