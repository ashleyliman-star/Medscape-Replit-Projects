import { useState } from "react";
import DebateHeader from "@/components/debate-header";
import DebateQuestion from "@/components/debate-question";
import DebateSide from "@/components/debate-side";
import AdPlaceholder from "@/components/ad-placeholder";
import PollSection from "@/components/poll-section";
import MiddleGround from "@/components/middle-ground";
import Conclusions from "@/components/conclusions";
import SideBySideArguments from "@/components/side-by-side-arguments";
import SummaryTable from "@/components/summary-table";
import CommentSection from "@/components/comment-section";
import GroupedArguments from "@/components/grouped-arguments";
import SplitLayout from "@/components/split-layout";
import UnboxedArguments from "@/components/unboxed-arguments";

const debateData = {
  question: "Is routine surveillance for breast cancer really worth it?",
  introduction: "This debate examines the benefits and risks of routine breast cancer screening programs. Two expert perspectives present evidence-based arguments on whether mammography screening should be universally recommended or more selectively applied.",
  sideA: {
    position: "YES: Routine Surveillance is Worth It",
    color: "blue" as const,
    physician: {
      name: "Dr. Jennifer Martinez",
      credentials: "MD, Radiologist & Breast Imaging Specialist",
      institution: "Johns Hopkins Breast Center",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    },
    statement: "Routine breast cancer surveillance saves lives through early detection. The benefits of identifying cancer in its earliest stages far outweigh the risks and challenges of screening programs.",
    arguments: [
      {
        title: "Early detection improves survival",
        points: [
          "Studies consistently show improved 5-year survival rates when breast cancer is detected early through screening",
          "Early-stage cancers have significantly better treatment outcomes and long-term prognosis"
        ]
      },
      {
        title: "Reduces breast cancer mortality",
        points: [
          "Large-scale population studies demonstrate 20-40% reduction in breast cancer deaths with regular screening",
          "Screening programs have contributed to declining breast cancer mortality rates over the past decades"
        ]
      },
      {
        title: "Allows less aggressive treatment",
        points: [
          "Early detection often means smaller tumors that require less extensive surgery and chemotherapy",
          "Breast-conserving surgery is more often possible when cancers are found through screening"
        ]
      },
      {
        title: "Supported by major health guidelines",
        points: [
          "American Cancer Society and other major organizations recommend routine screening for average-risk women",
          "Evidence-based guidelines are developed through rigorous review of scientific literature"
        ]
      },
      {
        title: "Most beneficial for women aged 50–69",
        points: [
          "This age group shows the greatest benefit from screening with optimal risk-to-benefit ratio",
          "Cost-effectiveness studies support routine screening in this population"
        ]
      }
    ],
    guidelines: "Follow established screening guidelines recommending annual or biennial mammograms for women aged 50-74, with individualized decisions for women 40-49 based on personal risk factors and preferences."
  },
  sideB: {
    position: "NO: Selective Surveillance is More Appropriate",
    color: "purple" as const,
    physician: {
      name: "Dr. Robert Chen",
      credentials: "MD, MPH, Preventive Medicine Specialist",
      institution: "University of California San Francisco",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    },
    statement: "While breast cancer screening has benefits, routine surveillance carries significant risks of overdiagnosis, false positives, and psychological harm that may outweigh benefits for many women.",
    arguments: [
      {
        title: "False positives cause anxiety and harm",
        points: [
          "Up to 10% of mammograms result in false positives, leading to unnecessary biopsies and procedures",
          "False positive results cause significant psychological distress and anxiety that can persist for years"
        ]
      },
      {
        title: "False negatives can miss cancers",
        points: [
          "Mammography misses 10-15% of breast cancers, particularly in women with dense breast tissue",
          "False sense of security from negative results may delay appropriate medical attention for symptoms"
        ]
      },
      {
        title: "Overdiagnosis leads to unnecessary treatment",
        points: [
          "Studies suggest 15-25% of screen-detected cancers represent overdiagnosis of slow-growing tumors",
          "Women receive treatment for cancers that may never have caused symptoms or death"
        ]
      },
      {
        title: "Limited impact on overall survival",
        points: [
          "While breast cancer mortality decreases, overall mortality benefits are modest",
          "Improved treatments may account for much of the mortality reduction attributed to screening"
        ]
      },
      {
        title: "Radiation exposure, though low, is not zero",
        points: [
          "Cumulative radiation exposure from annual mammograms over decades carries small but measurable cancer risk",
          "Risk-benefit calculation varies significantly based on individual patient factors"
        ]
      }
    ],
    guidelines: "Emphasize shared decision-making with individualized risk assessment. Consider family history, genetic factors, and patient preferences. Focus screening on higher-risk populations where benefits clearly outweigh harms."
  }
};

export default function DebatePage() {
  const [version, setVersion] = useState<'A' | 'B' | 'C' | 'D' | 'E'>('A');

  return (
    <div className="min-h-screen bg-white">
      <DebateHeader version={version} onVersionChange={setVersion} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DebateQuestion 
          question={debateData.question}
          introduction={debateData.introduction}
        />
        
        <AdPlaceholder size="728x90" className="flex justify-center mb-8" />
        
        {version === 'C' ? (
          // Version C: Side-by-side arguments with ads between pairs
          <>
            <div className="mb-12">
              <SideBySideArguments 
                yesArguments={debateData.sideA.arguments}
                noArguments={debateData.sideB.arguments}
                yesPhysician={debateData.sideA.physician}
                noPhysician={debateData.sideB.physician}
              />
            </div>
            
            <SummaryTable 
              yesArguments={debateData.sideA.arguments}
              noArguments={debateData.sideB.arguments}
            />
          </>
        ) : version === 'D' ? (
          // Version D: Grouped arguments with summary table
          <>
            <div className="mb-12">
              <GroupedArguments 
                yesArguments={debateData.sideA.arguments}
                noArguments={debateData.sideB.arguments}
                yesPhysician={debateData.sideA.physician}
                noPhysician={debateData.sideB.physician}
              />
            </div>
            
            <SummaryTable 
              yesArguments={debateData.sideA.arguments}
              noArguments={debateData.sideB.arguments}
            />
          </>
        ) : version === 'E' ? (
          // Version E: Unboxed arguments with green check and red X icons
          <>
            <div className="mb-12">
              <UnboxedArguments 
                yesArguments={debateData.sideA.arguments}
                noArguments={debateData.sideB.arguments}
                yesPhysician={debateData.sideA.physician}
                noPhysician={debateData.sideB.physician}
              />
            </div>
            
            <SummaryTable 
              yesArguments={debateData.sideA.arguments}
              noArguments={debateData.sideB.arguments}
            />
          </>
        ) : (
          // Version A & B: Traditional side-by-side layout
          <>
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <DebateSide 
                position={debateData.sideA.position}
                color={debateData.sideA.color}
                physician={debateData.sideA.physician}
                statement={debateData.sideA.statement}
                argumentsList={debateData.sideA.arguments}
                guidelines={debateData.sideA.guidelines}
                showPhysician={version === 'A'}
              />
              <DebateSide 
                position={debateData.sideB.position}
                color={debateData.sideB.color}
                physician={debateData.sideB.physician}
                statement={debateData.sideB.statement}
                argumentsList={debateData.sideB.arguments}
                guidelines={debateData.sideB.guidelines}
                showPhysician={version === 'A'}
              />
            </div>
            
            <AdPlaceholder size="300x250" className="flex justify-center mb-8" />
          </>
        )}
        
        <MiddleGround />
        
        <Conclusions />
        
        <AdPlaceholder size="728x90" className="flex justify-center mb-8" />
        
        <PollSection debateId="breast-cancer-surveillance" />
        
        <div className="my-12">
          <CommentSection />
        </div>
        
        <AdPlaceholder size="300x250" className="flex justify-center mt-8" />
      </main>
      
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 Medical Debates. Educational content for healthcare professionals.
            This debate is for educational purposes and should not replace clinical judgment.
          </p>
        </div>
      </footer>
    </div>
  );
}
