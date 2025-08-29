import { useState, useEffect, useRef } from 'react';
import { MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { trackEvent } from "@/lib/analytics";
import type { Comment } from "@shared/schema";

interface DebateQuestionProps {
  question: string;
  introduction: string;
  onCommentClick?: () => void;
}

export default function DebateQuestion({ question, introduction, onCommentClick }: DebateQuestionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [truncatedText, setTruncatedText] = useState('');
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  // Fetch comments to get count
  const { data: comments = [] } = useQuery<Comment[]>({
    queryKey: [`/api/comments/breast-cancer-surveillance`]
  });

  useEffect(() => {
    const calculateTruncation = () => {
      if (window.innerWidth >= 768 || !textRef.current) return;
      
      const container = textRef.current;
      const containerWidth = container.offsetWidth;
      
      // Create a hidden test element
      const tester = document.createElement('div');
      tester.style.cssText = `
        position: absolute;
        visibility: hidden;
        width: ${containerWidth}px;
        font-size: 16px;
        line-height: 1.5;
        text-align: center;
        font-family: inherit;
      `;
      document.body.appendChild(tester);
      
      // Test if full text exceeds 3 lines
      tester.textContent = introduction;
      const fullHeight = tester.offsetHeight;
      const lineHeight = 24; // 16px * 1.5
      const maxHeight = lineHeight * 3;
      
      if (fullHeight > maxHeight) {
        setNeedsTruncation(true);
        
        // Check if text contains "Eugene Braunwald, MD, reversed" and truncate there
        const targetPhrase = "Eugene Braunwald, MD, reversed";
        const targetIndex = introduction.indexOf(targetPhrase);
        
        if (targetIndex !== -1) {
          const truncateAt = targetIndex + targetPhrase.length;
          setTruncatedText(introduction.substring(0, truncateAt));
        } else {
          // Fallback to original logic if target phrase not found
          const words = introduction.split(' ');
          let result = '';
          
          for (let i = 0; i < words.length; i++) {
            const testText = words.slice(0, i + 1).join(' ') + '... read more';
            tester.textContent = testText;
            
            if (tester.offsetHeight > maxHeight) {
              result = words.slice(0, i).join(' ');
              break;
            }
          }
          
          setTruncatedText(result);
        }
      } else {
        setNeedsTruncation(false);
      }
      
      document.body.removeChild(tester);
    };

    // Run calculation after component mounts and on resize
    const timer = setTimeout(calculateTruncation, 100);
    window.addEventListener('resize', calculateTruncation);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateTruncation);
    };
  }, [introduction]);
  return (
    <section className="text-center mb-8 md:mt-8">
      <div className="max-w-4xl mx-auto mb-6">
        <div className="text-left">
          <h2 className="font-bold text-gray-900 mb-4 text-center" style={{ fontSize: '28px', fontFamily: 'EB Garamond, serif' }}>
            <span className="md:hidden">
              Does Asymptomatic Aortic Stenosis<br />
              Warrant Early Intervention?
            </span>
            <span className="hidden md:inline" style={{ fontSize: '40px', fontFamily: 'EB Garamond, serif' }}>{question}</span>
          </h2>
          
          {/* Byline and publication date - desktop */}
          <div className="hidden md:block mb-6 text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center">
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
            <p className="text-sm text-gray-500 flex items-center justify-center">
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
          
          {/* Desktop - always show full text */}
          <p className="hidden md:block text-base md:text-lg text-gray-600 leading-relaxed text-left">
            {introduction}
          </p>
          
          {/* Mobile - truncated with read more */}
          <div ref={textRef} className="md:hidden text-base text-gray-600 leading-relaxed text-left">
            {!isExpanded && needsTruncation ? (
              <p>
                {truncatedText}
                <span 
                  className="text-blue-600 cursor-pointer font-medium ml-1"
                  onClick={() => {
                    setIsExpanded(true);
                    trackEvent(
                      'read_more_click',
                      'user_interaction',
                      'Mobile Introduction Expand',
                      1
                    );
                  }}
                >
                  ... read more
                </span>
              </p>
            ) : (
              <p>
                {introduction}
                {needsTruncation && isExpanded && (
                  <span 
                    className="text-blue-600 cursor-pointer font-medium ml-2"
                    onClick={() => {
                      setIsExpanded(false);
                      trackEvent(
                        'read_less_click',
                        'user_interaction',
                        'Mobile Introduction Collapse',
                        1
                      );
                    }}
                  >
                    read less
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
