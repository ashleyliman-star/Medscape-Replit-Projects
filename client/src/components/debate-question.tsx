import { useState, useEffect, useRef } from 'react';

interface DebateQuestionProps {
  question: string;
  introduction: string;
}

export default function DebateQuestion({ question, introduction }: DebateQuestionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [truncatedText, setTruncatedText] = useState('');
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

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
        
        // Find the maximum text that fits in 3 lines with "... read more"
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
    <section className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#064AA7' }}>
        Medscape Debates
      </h1>
      
      <div className="max-w-4xl mx-auto mb-6">
        <div className="text-left">
          <h2 className="font-bold text-gray-900 mb-4 text-center" style={{ fontSize: '28px' }}>
            <span className="md:hidden">{question}</span>
            <span className="hidden md:inline" style={{ fontSize: '40px' }}>{question}</span>
          </h2>
          
          {/* Desktop - always show full text */}
          <p className="hidden md:block text-base md:text-lg text-gray-600 leading-relaxed text-left">
            {introduction}
          </p>
          
          {/* Byline and publication date - desktop */}
          <div className="hidden md:block mt-4 text-left">
            <p className="text-sm text-gray-500">
              <span className="font-medium">Victoria Stern</span><br />
              July 07, 2025
            </p>
          </div>
          
          {/* Mobile - truncated with read more */}
          <div ref={textRef} className="md:hidden text-base text-gray-600 leading-relaxed text-left">
            {!isExpanded && needsTruncation ? (
              <p>
                {truncatedText}
                <span 
                  className="text-blue-600 cursor-pointer font-medium ml-1"
                  onClick={() => setIsExpanded(true)}
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
                    onClick={() => setIsExpanded(false)}
                  >
                    read less
                  </span>
                )}
              </p>
            )}
          </div>
          
          {/* Byline and publication date - mobile */}
          <div className="md:hidden mt-4 text-left">
            <p className="text-sm text-gray-500">
              <span className="font-medium">Victoria Stern</span><br />
              July 07, 2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
