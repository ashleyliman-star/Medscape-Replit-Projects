import { useState, useEffect } from "react";
import { BarChart3 } from "lucide-react";

interface PollChoice {
  choiceText: string;
  choiceId: number;
  displayOrder: number;
  totalResponses: string;
  totalAbsoluteResponseCount: number;
}

interface PollQuestion {
  questionId: number;
  questionText: string;
  displayOrder: number;
  choices: PollChoice[];
  totalResponses: number;
}

interface FormData {
  formId: number;
  formTitle: string;
  questions: PollQuestion[];
  questionnaireId?: string;
}

interface ResultChoice {
  choiceId: number;
  userResponded: boolean;
  totalCount: number;
  questionSum: number;
}

interface ResultQuestion {
  questionId: number;
  pollSummaryChoiceResponses: ResultChoice[];
}

interface PollSectionProps {
  questionnaireId: string;
  formId: number;
  siteId?: string;
}

const MEDSCAPE_QNA_BASE = "https://api.medscape.com/servicegateway/v2/auth/qnaservice";

function isOnMedscapeDomain(): boolean {
  const host = window.location.hostname;
  return host === "medscape.com" || host.endsWith(".medscape.com") ||
         host === "webmd.com" || host.endsWith(".webmd.com");
}

async function directOrProxy(
  directUrl: string,
  proxyUrl: string,
  options: RequestInit = {}
): Promise<Response> {
  if (isOnMedscapeDomain()) {
    try {
      const directResponse = await fetch(directUrl, {
        ...options,
        credentials: "include",
      });
      if (directResponse.ok) return directResponse;
      const contentType = directResponse.headers.get("content-type") || "";
      if (contentType.includes("application/json")) return directResponse;
    } catch (_) {
      // Direct call failed, fall through to proxy
    }
  }
  return fetch(proxyUrl, options);
}

export default function PollSection({ questionnaireId, formId, siteId = "2001" }: PollSectionProps) {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedChoices, setSelectedChoices] = useState<Record<number, number>>({});
  const [results, setResults] = useState<ResultQuestion[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [viewingOnly, setViewingOnly] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFormData();
  }, [questionnaireId, formId]);

  const fetchFormData = async (retryCount = 0) => {
    try {
      setIsLoading(true);
      setError(null);
      const directUrl = `${MEDSCAPE_QNA_BASE}/questionnaire/${questionnaireId}/form/${formId}?aggregated=true&siteId=${siteId}`;
      const proxyUrl = `/api/poll/form/${questionnaireId}/${formId}?siteId=${siteId}`;
      const response = await directOrProxy(directUrl, proxyUrl);
      if (!response.ok) {
        if ((response.status === 429 || response.status === 403) && retryCount < 3) {
          const delay = (retryCount + 1) * 2000;
          console.log(`Poll API returned ${response.status}, retrying in ${delay}ms (attempt ${retryCount + 1}/3)`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchFormData(retryCount + 1);
        }
        throw new Error("Failed to load poll");
      }
      const data = await response.json();
      setFormData(data);
    } catch (err) {
      setError("Unable to load poll. Please try again later.");
      console.error("Poll fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChoiceSelect = (questionId: number, choiceId: number) => {
    if (hasVoted) return;
    setSelectedChoices(prev => ({ ...prev, [questionId]: choiceId }));
  };

  const handleSubmit = async () => {
    if (!formData) return;

    const allAnswered = formData.questions.every(q => selectedChoices[q.questionId]);
    if (!allAnswered) return;

    try {
      setIsSubmitting(true);
      const questionResponses = formData.questions.map(q => ({
        choiceId: selectedChoices[q.questionId],
        questionId: q.questionId,
      }));

      const submitBody = JSON.stringify({
        formId,
        questionResponses,
        questionnaireId,
        siteId,
      });

      const directUrl = `${MEDSCAPE_QNA_BASE}/save/userresponse?aggregated=true`;
      const proxyUrl = "/api/poll/submit";
      const response = await directOrProxy(directUrl, proxyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: submitBody,
      });

      if (!response.ok) throw new Error("Failed to submit");
      const data = await response.json();

      const summaryResponses = data.data?.pollingSummary?.pollSummaryQuestionResponses;
      if (summaryResponses && summaryResponses.length > 0) {
        setError(null);
        setResults(summaryResponses);
        setHasVoted(true);
      } else {
        setError("Your response was recorded but results could not be loaded. Try viewing results.");
      }
    } catch (err) {
      setError("Unable to submit your response. Please try again.");
      console.error("Poll submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewResults = async () => {
    try {
      setIsSubmitting(true);
      const filterBody = JSON.stringify({ questionnaireId, formId });
      const directUrl = `${MEDSCAPE_QNA_BASE}/questionnaire/filter`;
      const proxyUrl = "/api/poll/results";
      const response = await directOrProxy(directUrl, proxyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: filterBody,
      });

      if (!response.ok) throw new Error("Failed to fetch results");
      const data = await response.json();

      if (data.questionResponseSummaries) {
        setResults(data.questionResponseSummaries);
        setViewingOnly(true);
      }
    } catch (err) {
      setError("Unable to load results. Please try again.");
      console.error("Poll results error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPercentage = (count: number, sum: number) => {
    if (sum === 0) return 0;
    return Math.round((count / sum) * 100);
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
        <div className="space-y-2">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error && !formData) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchFormData}
          className="mt-3 text-sm text-red-700 underline hover:no-underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!formData) return null;

  const allAnswered = formData.questions.every(q => selectedChoices[q.questionId]);

  return (
    <div className="border-t-4 border-[#16478c] bg-gray-50 rounded-b-lg overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-[#16478c]" />
          <h3 className="text-xl font-bold text-gray-900">Reader Poll</h3>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-8">
          {formData.questions.map((question, qIndex) => (
            <div key={question.questionId}>
              <p className="text-base font-semibold text-gray-800 mb-4">
                {qIndex + 1}. {question.questionText}
              </p>

              {!results ? (
                <div className="space-y-2">
                  {question.choices.map(choice => {
                    const isSelected = selectedChoices[question.questionId] === choice.choiceId;
                    return (
                      <button
                        key={choice.choiceId}
                        onClick={() => handleChoiceSelect(question.questionId, choice.choiceId)}
                        className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                          isSelected
                            ? "border-[#16478c] bg-blue-50 text-[#16478c] font-medium"
                            : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                            isSelected ? "border-[#16478c]" : "border-gray-400"
                          }`}>
                            {isSelected && (
                              <div className="w-2 h-2 rounded-full bg-[#16478c]"></div>
                            )}
                          </div>
                          <span className="text-sm">{choice.choiceText}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3">
                  {question.choices.map(choice => {
                    const resultQuestion = results.find(r => r.questionId === question.questionId);
                    const resultChoice = resultQuestion?.pollSummaryChoiceResponses.find(
                      r => r.choiceId === choice.choiceId
                    );
                    const totalCount = resultChoice?.totalCount || 0;
                    const questionSum = resultChoice?.questionSum || question.totalResponses || 1;
                    const percentage = getPercentage(totalCount, questionSum);
                    const isUserChoice = selectedChoices[question.questionId] === choice.choiceId;
                    const isApiUserChoice = resultChoice?.userResponded === true;
                    const highlight = isUserChoice || isApiUserChoice;

                    return (
                      <div key={choice.choiceId} className="relative">
                        <div className={`rounded-lg overflow-hidden border ${
                          highlight ? "border-[#16478c]" : "border-gray-200"
                        }`}>
                          <div className="relative px-4 py-3">
                            <div
                              className={`absolute inset-0 ${highlight ? "bg-blue-100" : "bg-gray-100"}`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                            <div className="relative flex items-center justify-between">
                              <span className={`text-sm ${highlight ? "font-semibold text-[#16478c]" : "text-gray-700"}`}>
                                {choice.choiceText}
                                {highlight && " ✓"}
                              </span>
                              <span className={`text-sm font-bold ml-3 ${highlight ? "text-[#16478c]" : "text-gray-600"}`}>
                                {percentage}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <p className="text-xs text-gray-500 mt-2">
                    {(() => {
                      const resultQuestion = results.find(r => r.questionId === question.questionId);
                      const sum = resultQuestion?.pollSummaryChoiceResponses[0]?.questionSum || question.totalResponses;
                      return `${sum} total responses`;
                    })()}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {!hasVoted && !results && (
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSubmit}
              disabled={!allAnswered || isSubmitting}
              className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                allAnswered && !isSubmitting
                  ? "bg-[#16478c] text-white hover:bg-[#0f3569] shadow-sm"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <button
              onClick={handleViewResults}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg font-medium text-sm text-[#16478c] border border-[#16478c] hover:bg-blue-50 transition-all duration-200"
            >
              View Results
            </button>
          </div>
        )}

        {viewingOnly && results && (
          <div className="mt-6">
            <button
              onClick={() => {
                setResults(null);
                setViewingOnly(false);
              }}
              className="px-6 py-2.5 rounded-lg font-medium text-sm text-[#16478c] border border-[#16478c] hover:bg-blue-50 transition-all duration-200"
            >
              Back to Vote
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
