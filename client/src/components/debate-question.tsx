interface DebateQuestionProps {
  question: string;
  introduction: string;
}

export default function DebateQuestion({ question, introduction }: DebateQuestionProps) {
  return (
    <section className="text-center mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6">
        Medscape Debate
      </h1>
      
      <div className="max-w-4xl mx-auto mb-6">
        <div className="text-left">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 text-center">
            {question}
          </h2>
          
          <p className="text-gray-600 leading-relaxed text-center">
            {introduction}
          </p>
        </div>
      </div>
    </section>
  );
}
