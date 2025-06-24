interface DebateQuestionProps {
  question: string;
  introduction: string;
}

export default function DebateQuestion({ question, introduction }: DebateQuestionProps) {
  return (
    <section className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#064AA7' }}>
        Medscape Debates
      </h1>
      
      <div className="max-w-4xl mx-auto mb-6">
        <div className="text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center" style={{ fontSize: '40px' }}>
            {question}
          </h2>
          
          <p className="text-base md:text-lg text-gray-600 leading-relaxed text-center">
            {introduction}
          </p>
        </div>
      </div>
    </section>
  );
}
