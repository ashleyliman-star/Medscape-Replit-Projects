import { useState, useEffect, useRef } from 'react';

interface DebateQuestionProps {
  question: string;
  introduction: string;
}

export default function DebateQuestion({ question, introduction }: DebateQuestionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldTruncate, setShouldTruncate] = useState(false);
  const [truncatedText, setTruncatedText] = useState('');
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Calculate if text needs truncation on mobile
    const calculateTruncation = () => {
      if (window.innerWidth >= 768) return; // Only for mobile
      
      // Create a temporary element to measure text height
      const temp = document.createElement('div');
      temp.style.visibility = 'hidden';
      temp.style.position = 'absolute';
      temp.style.width = textRef.current?.offsetWidth + 'px' || '300px';
      temp.style.fontSize = '16px';
      temp.style.lineHeight = '1.5';
      temp.style.textAlign = 'center';
      temp.innerHTML = introduction;
      document.body.appendChild(temp);
      
      const lineHeight = 24; // approximate line height for 16px font
      const maxHeight = lineHeight * 3; // 3 lines
      
      if (temp.offsetHeight > maxHeight) {
        setShouldTruncate(true);
        // Truncate text to fit with "... read more" on the same line
        const words = introduction.split(' ');
        let truncated = '';
        const readMoreText = '... read more';
        
        for (let i = 0; i < words.length; i++) {
          const testText = truncated + (truncated ? ' ' : '') + words[i] + ' ' + readMoreText;
          temp.innerHTML = testText;
          if (temp.offsetHeight > maxHeight) {
            break;
          }
          truncated += (truncated ? ' ' : '') + words[i];
        }
        setTruncatedText(truncated);
      }
      
      document.body.removeChild(temp);
    };

    calculateTruncation();
    window.addEventListener('resize', calculateTruncation);
    return () => window.removeEventListener('resize', calculateTruncation);
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
          <p className="hidden md:block text-base md:text-lg text-gray-600 leading-relaxed text-center">
            {introduction}
          </p>
          
          {/* Mobile - truncated with read more */}
          <div className="md:hidden text-base text-gray-600 leading-relaxed text-center">
            <p ref={textRef}>
              {!isExpanded && shouldTruncate ? (
                <>
                  {truncatedText}{' '}
                  <span 
                    className="text-blue-600 cursor-pointer font-medium"
                    onClick={() => setIsExpanded(true)}
                  >
                    ... read more
                  </span>
                </>
              ) : (
                introduction
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
