import { MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Comment } from "@shared/schema";
import medscapeLogo from "@assets/Group 2_1756837824991.png";

interface DebateQuestionProps {
  question: string;
  introduction: string;
  onCommentClick?: () => void;
}

export default function DebateQuestion({ question, introduction, onCommentClick }: DebateQuestionProps) {
  // Fetch comments to get count
  const { data: comments = [] } = useQuery<Comment[]>({
    queryKey: [`/api/comments/breast-cancer-surveillance`]
  });

  return (
    <section className="text-center mb-8 md:mt-8">
      <div className="max-w-4xl mx-auto mb-6">
        <div className="text-left">
          <h2 className="font-bold text-gray-900 mb-4 text-center" style={{ fontFamily: 'EB Garamond, serif' }}>
            <span className="md:hidden" style={{ fontSize: '28px', lineHeight: '1.1' }}>
              Debate: Does Asymptomatic<br />
              Aortic Stenosis Warrant<br />
              Early Intervention?
            </span>
            <span className="hidden md:inline" style={{ fontSize: '40px', fontFamily: 'EB Garamond, serif' }}>{question}</span>
          </h2>
          
          {/* Byline and publication date - desktop */}
          <div className="hidden md:block mb-6 text-center">
            <p className="text-gray-500 flex items-center justify-center" style={{ fontSize: '16px' }}>
              <span className="font-medium">Tricia Ward</span>
              <span className="mx-2">•</span>
              <span>September 2, 2025</span>
              {onCommentClick && (
                <>
                  <span className="mx-2">•</span>
                  <button 
                    onClick={onCommentClick}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{comments.length}</span>
                  </button>
                </>
              )}
            </p>
          </div>
          
          {/* Byline and publication date - mobile */}
          <div className="md:hidden mb-4 text-center">
            <p className="text-gray-500 flex items-center justify-center" style={{ fontSize: '16px' }}>
              <span className="font-medium">Tricia Ward</span>
              <span className="mx-2">•</span>
              <span>September 2, 2025</span>
              {onCommentClick && (
                <>
                  <span className="mx-2">•</span>
                  <button 
                    onClick={onCommentClick}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{comments.length}</span>
                  </button>
                </>
              )}
            </p>
          </div>
          
          {/* Introduction text for both desktop and mobile */}
          <p className="text-gray-600 leading-relaxed text-left md:text-xl text-base">
            {introduction}
          </p>
        </div>
      </div>
    </section>
  );
}