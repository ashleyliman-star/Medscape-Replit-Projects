import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Progress } from "@/components/ui/progress";
import { BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";

interface PollSectionProps {
  debateId: string;
}

const pollOptions = [
  { value: 'yes', label: 'Yes - Routine surveillance is worth it' },
  { value: 'no', label: 'No - Routine surveillance is not worth it' }
];

export default function PollSection({ debateId }: PollSectionProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [hasVoted, setHasVoted] = useState(false);
  const { toast } = useToast();

  const { data: pollStats, refetch } = useQuery({
    queryKey: [`/api/poll/${debateId}/stats`],
    enabled: hasVoted,
  });

  const submitVoteMutation = useMutation({
    mutationFn: async (response: string) => {
      return apiRequest("POST", "/api/poll", {
        debateId,
        response,
      });
    },
    onSuccess: () => {
      setHasVoted(true);
      refetch();
      toast({
        title: "Vote submitted!",
        description: "Thank you for participating in this debate.",
      });
    },
    onError: () => {
      toast({
        title: "Error submitting vote",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (!selectedOption) {
      toast({
        title: "Please select an option",
        description: "Choose your position before submitting your vote.",
        variant: "destructive",
      });
      return;
    }
    
    // Track poll submission
    trackEvent('poll_vote', 'engagement', selectedOption);
    
    submitVoteMutation.mutate(selectedOption);
  };

  return (
    <section className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
        <BarChart3 className="mr-3 h-6 w-6 text-gray-600" />
        What's Your Opinion?
      </h2>
      
      <div className="max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
          Is routine surveillance for breast cancer really worth it?
        </h3>
        
        {!hasVoted ? (
          <>
            <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="space-y-4 mb-6">
              {pollOptions.map((option) => (
                <Label 
                  key={option.value}
                  htmlFor={option.value}
                  className="poll-option flex items-center space-x-3 bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-all"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <span className="text-gray-800">{option.label}</span>
                </Label>
              ))}
            </RadioGroup>
            
            <div className="text-center">
              <Button 
                onClick={handleSubmit}
                disabled={submitVoteMutation.isPending}
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                {submitVoteMutation.isPending ? "Submitting..." : "Submit Vote"}
              </Button>
            </div>
          </>
        ) : (
          <div className="poll-results">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Poll Results</h4>
            {pollStats && (
              <>
                <div className="space-y-3 mb-4">
                  {pollOptions.map((option) => {
                    const percentage = pollStats.percentages[option.value] || 0;
                    const count = pollStats.counts[option.value] || 0;
                    
                    return (
                      <div key={option.value} className="flex flex-col space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-700">{option.label}</span>
                          <span className="text-sm font-medium text-gray-600">{percentage}%</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                        <span className="text-xs text-gray-500">{count} votes</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-center text-sm text-gray-600">
                  Based on {pollStats.total} responses • Results update in real-time
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
