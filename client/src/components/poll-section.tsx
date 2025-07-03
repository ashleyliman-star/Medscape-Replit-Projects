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
  { value: 'no', label: 'No - Selective surveillance is more appropriate' }
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
    
    // Track poll submission with Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'submit_vote', {
        event_category: 'engagement',
        event_label: selectedOption
      });
    }
    
    submitVoteMutation.mutate(selectedOption);
  };

  return (
    <section className="rounded-xl shadow-lg p-8" style={{ background: 'linear-gradient(90deg, rgba(6, 74, 167, 0.1) 0%, rgba(6, 74, 167, 0.15) 50%, rgba(6, 74, 167, 0.1) 100%)' }}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
        <BarChart3 className="mr-3 h-6 w-6 text-gray-600" />
        What's Your Opinion?
      </h2>
      
      <div className="max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
          Is routine surveillance for cancer metastases a good idea in asymptomatic patients?
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
                className="text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                style={{ background: 'linear-gradient(90deg, #064AA7 0%, #0862C7 100%)' }}
              >
                {submitVoteMutation.isPending ? "Submitting..." : "Submit Vote"}
              </Button>
            </div>
          </>
        ) : (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">Results</h3>
            
            {pollStats && (
              <div className="relative">
                {/* Argument titles */}
                <div className="flex justify-between mb-4">
                  <div className="text-left">
                    <h4 className="font-bold text-base" style={{ color: '#1A9FDA' }}>
                      YES: Routine Surveillance is Worth It
                    </h4>
                  </div>
                  <div className="text-right">
                    <h4 className="font-bold text-base" style={{ color: '#D43F5C' }}>
                      NO: Selective Surveillance is More Appropriate
                    </h4>
                  </div>
                </div>

                {/* Vote counts on sides */}
                <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
                  <span>{pollStats.counts.yes || 0} votes</span>
                  <span>{pollStats.counts.no || 0} votes</span>
                </div>

                {/* Progress bar container */}
                <div className="relative flex items-center">
                  {/* YES percentage and bar */}
                  <div className="flex-1 flex items-center">
                    <span className="text-2xl font-bold mr-2" style={{ color: '#1A9FDA' }}>
                      {pollStats.total > 0 ? Math.round(((pollStats.counts.yes || 0) / pollStats.total) * 100) : 0}%
                    </span>
                    <div className="flex-1 h-8 bg-white overflow-hidden border border-gray-300" style={{ borderTopLeftRadius: '9999px', borderBottomLeftRadius: '9999px' }}>
                      <div 
                        className="h-full transition-all duration-500"
                        style={{ 
                          backgroundColor: '#1A9FDA',
                          width: `${pollStats.total > 0 ? ((pollStats.counts.yes || 0) / pollStats.total) * 100 : 0}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Center circle with total votes - overlapping bars */}
                  <div className="relative -mx-4">
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex flex-col items-center justify-center text-white text-xs font-semibold z-10 relative">
                      <span className="text-lg font-bold">{pollStats.total || 0}</span>
                      <span>votes</span>
                    </div>
                  </div>

                  {/* NO bar and percentage */}
                  <div className="flex-1 flex items-center">
                    <div className="flex-1 h-8 bg-white overflow-hidden border border-gray-300" style={{ borderTopRightRadius: '9999px', borderBottomRightRadius: '9999px' }}>
                      <div 
                        className="h-full transition-all duration-500 ml-auto"
                        style={{ 
                          backgroundColor: '#D43F5C',
                          width: `${pollStats.total > 0 ? ((pollStats.counts.no || 0) / pollStats.total) * 100 : 0}%`
                        }}
                      />
                    </div>
                    <span className="text-2xl font-bold ml-2" style={{ color: '#D43F5C' }}>
                      {pollStats.total > 0 ? Math.round(((pollStats.counts.no || 0) / pollStats.total) * 100) : 0}%
                    </span>
                  </div>
                </div>

                {/* Total votes centered below */}
                <div className="text-center text-sm text-gray-500 mt-4">
                  Based on {pollStats.total} responses • Results update in real-time
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
