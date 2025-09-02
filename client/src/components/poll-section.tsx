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

interface PollStats {
  counts: {
    yes_tavr_savr: number;
    yes_savr_favored: number;
    no_surveillance: number;
  };
  percentages: {
    yes_tavr_savr: number;
    yes_savr_favored: number;
    no_surveillance: number;
  };
  total: number;
}

const pollOptions = [
  { value: 'yes_tavr_savr', label: 'Yes, with TAVR or SAVR' },
  { value: 'yes_savr_favored', label: 'Yes, with SAVR favored over TAVR' },
  { value: 'no_surveillance', label: 'No, clinical surveillance is more appropriate' }
];

interface PieChartProps {
  pollStats: PollStats;
}

function PieChart({ pollStats }: PieChartProps) {
  const total = pollStats.total || 0;
  if (total === 0) {
    return (
      <div className="w-48 h-48 rounded-full border-4 border-gray-300 flex items-center justify-center">
        <span className="text-gray-500 text-sm">No votes yet</span>
      </div>
    );
  }

  const counts = [
    pollStats.counts.yes_tavr_savr || 0,
    pollStats.counts.yes_savr_favored || 0,
    pollStats.counts.no_surveillance || 0
  ];

  const colors = ['#1A9FDA', '#7C3AED', '#D43F5C'];
  
  // Calculate angles for each slice
  const angles = counts.map(count => (count / total) * 360);
  
  // Generate SVG path data for each slice
  const createSlicePath = (startAngle: number, endAngle: number, radius: number = 90) => {
    const start = startAngle * Math.PI / 180;
    const end = endAngle * Math.PI / 180;
    
    // Handle full circle case (360 degrees)
    if (endAngle - startAngle >= 360) {
      return `M 96 ${96 - radius} A ${radius} ${radius} 0 1 1 ${96 - 0.1} ${96 - radius} Z`;
    }
    
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    
    const x1 = 96 + radius * Math.cos(start);
    const y1 = 96 + radius * Math.sin(start);
    const x2 = 96 + radius * Math.cos(end);
    const y2 = 96 + radius * Math.sin(end);
    
    return `M 96 96 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  let currentAngle = -90; // Start from top
  const slices = angles.map((angle, index) => {
    if (counts[index] === 0) return null; // Skip empty slices
    
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;
    
    return {
      path: createSlicePath(startAngle, endAngle),
      color: colors[index],
      percentage: Math.round((counts[index] / total) * 100)
    };
  }).filter((slice): slice is NonNullable<typeof slice> => slice !== null);

  return (
    <div className="relative">
      <svg width="192" height="192" viewBox="0 0 192 192" className="transform -rotate-90">
        {slices.map((slice, index) => (
          <path
            key={index}
            d={slice.path}
            fill={slice.color}
            stroke="white"
            strokeWidth="2"
            className="transition-all duration-500"
          />
        ))}
      </svg>
      
      {/* Center circle with total */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-md">
          <span className="text-xl font-bold text-gray-800">{total}</span>
          <span className="text-xs text-gray-500">votes</span>
        </div>
      </div>
    </div>
  );
}

export default function PollSection({ debateId }: PollSectionProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [hasVoted, setHasVoted] = useState(false);
  const { toast } = useToast();

  const { data: pollStats, refetch } = useQuery<PollStats>({
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
    <section className="rounded-xl shadow-lg p-8" style={{ backgroundColor: '#D6E3F5' }}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
        <BarChart3 className="mr-3 h-6 w-6 text-gray-600" />
        What's Your Opinion?
      </h2>
      
      <div className="max-w-2xl mx-auto">
        <h3 className="font-semibold text-gray-800 mb-6 text-center" style={{ fontSize: '22px' }}>
          Should we intervene early in asymptomatic aortic stenosis?
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
                  <span className="text-gray-800 text-base md:text-xl">{option.label}</span>
                </Label>
              ))}
            </RadioGroup>
            
            <div className="text-center">
              <Button 
                onClick={handleSubmit}
                disabled={submitVoteMutation.isPending}
                className="text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all text-base md:text-xl"
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
              <div className="flex flex-col items-center">
                {/* Pie Chart */}
                <div className="mb-6">
                  <PieChart pollStats={pollStats} />
                </div>

                {/* Legend */}
                <div className="space-y-3 w-full max-w-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: '#1A9FDA' }}></div>
                      <span className="text-sm font-medium text-gray-700">Yes, with TAVR or SAVR</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold" style={{ color: '#1A9FDA' }}>
                        {pollStats.total > 0 ? Math.round(((pollStats.counts.yes_tavr_savr || 0) / pollStats.total) * 100) : 0}%
                      </span>
                      <div className="text-xs text-gray-500">{pollStats.counts.yes_tavr_savr || 0} votes</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: '#7C3AED' }}></div>
                      <span className="text-sm font-medium text-gray-700">Yes, with SAVR favored over TAVR</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold" style={{ color: '#7C3AED' }}>
                        {pollStats.total > 0 ? Math.round(((pollStats.counts.yes_savr_favored || 0) / pollStats.total) * 100) : 0}%
                      </span>
                      <div className="text-xs text-gray-500">{pollStats.counts.yes_savr_favored || 0} votes</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: '#D43F5C' }}></div>
                      <span className="text-sm font-medium text-gray-700">No, clinical surveillance is more appropriate</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold" style={{ color: '#D43F5C' }}>
                        {pollStats.total > 0 ? Math.round(((pollStats.counts.no_surveillance || 0) / pollStats.total) * 100) : 0}%
                      </span>
                      <div className="text-xs text-gray-500">{pollStats.counts.no_surveillance || 0} votes</div>
                    </div>
                  </div>
                </div>

                {/* Total votes centered below */}
                <div className="text-center text-sm text-gray-500 mt-6">
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
