import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, MessageSquare, User, Calendar } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Comment } from "@shared/schema";

interface CommentWithTimestamp extends Omit<Comment, 'createdAt'> {
  timestamp: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Check if already authenticated on mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (username === "medscape" && password === "ICDTeam909") {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setAuthError("");
      toast({
        title: "Login successful",
        description: "Welcome to the admin panel",
        variant: "default",
      });
    } else {
      setAuthError("Invalid username or password");
      toast({
        title: "Login failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setUsername("");
    setPassword("");
  };

  // Fetch all comments for admin view
  const { data: comments = [], isLoading } = useQuery<Comment[]>({
    queryKey: ['/api/admin/comments'],
    enabled: isAuthenticated
  });

  // Delete comment mutation
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => 
      apiRequest('DELETE', `/api/admin/comments/${commentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/comments'] });
      queryClient.invalidateQueries({ queryKey: ['/api/comments/breast-cancer-surveillance'] });
      toast({
        title: "Comment deleted",
        description: "The comment has been successfully removed",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "Delete failed",
        description: "Failed to delete the comment",
        variant: "destructive",
      });
    }
  });

  const formatTimestamp = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const transformComments = (dbComments: Comment[]): CommentWithTimestamp[] => {
    return dbComments.map(comment => ({
      ...comment,
      timestamp: formatTimestamp(comment.createdAt)
    }));
  };

  const handleDeleteComment = (commentId: number, authorName: string) => {
    if (window.confirm(`Are you sure you want to delete the comment by ${authorName}?`)) {
      deleteCommentMutation.mutate(commentId);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <MessageSquare className="h-6 w-6" />
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            {authError && (
              <div className="text-red-600 text-sm text-center">{authError}</div>
            )}
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const allComments = transformComments(comments);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <MessageSquare className="h-6 w-6" />
              Comment Administration
            </h1>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            All Comments ({allComments.length})
          </h2>
          <p className="text-gray-600">
            Manage comments from the medical debate platform
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading comments...</div>
        ) : (
          <div className="space-y-4">
            {allComments.length > 0 ? (
              allComments.map(comment => (
                <Card key={comment.id} className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="font-medium text-gray-900">
                            {comment.authorName}
                          </span>
                          <Calendar className="h-4 w-4 text-gray-500 ml-4" />
                          <span className="text-gray-500 text-sm">
                            {comment.timestamp}
                          </span>
                        </div>
                        <p className="text-gray-800 mb-2">{comment.content}</p>
                        <div className="text-sm text-gray-500">
                          Debate: {comment.debateId} | Likes: {comment.likes}
                          {comment.parentId && ` | Reply to comment #${comment.parentId}`}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleDeleteComment(comment.id, comment.authorName)}
                        variant="destructive"
                        size="sm"
                        disabled={deleteCommentMutation.isPending}
                        className="ml-4"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No comments found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}