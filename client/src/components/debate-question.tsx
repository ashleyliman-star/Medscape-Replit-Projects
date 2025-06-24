import { useState } from 'react';

interface DebateQuestionProps {
  question: string;
  introduction: string;
}

export default function DebateQuestion({ question, introduction }: DebateQuestionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
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
            {!isExpanded ? (
              <div className="mobile-text-container">
                <p className="mobile-truncated-text">
                  {introduction}
                </p>
                <span 
                  className="read-more-link"
                  onClick={() => setIsExpanded(true)}
                >
                  ... read more
                </span>
              </div>
            ) : (
              <p>{introduction}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
