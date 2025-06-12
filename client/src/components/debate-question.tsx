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
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {question}
      </h2>
      <div className="max-w-4xl mx-auto">
        <p className="text-lg text-gray-600 leading-relaxed">
          {introduction}
        </p>
      </div>
    </section>
  );
}
