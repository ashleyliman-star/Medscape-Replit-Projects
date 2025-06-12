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
        <div className="bg-white rounded-lg border-l-4 border-purple-500 shadow-sm p-6 text-left">
          <div className="flex items-center justify-center mb-4">
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-purple-600">Debate Question</h3>
          </div>
          
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 text-center">
            {question}
          </h2>
          
          <p className="text-gray-600 leading-relaxed">
            {introduction}
          </p>
        </div>
      </div>
    </section>
  );
}
