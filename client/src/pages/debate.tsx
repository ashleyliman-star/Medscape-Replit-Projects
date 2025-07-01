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
import SummaryTableUnboxed from "@/components/summary-table-unboxed";
import MiddleGroundUnboxed from "@/components/middle-ground-unboxed";
import ConclusionsUnboxed from "@/components/conclusions-unboxed";

const debateData = {
  question: "Do Patients Benefit From Routine Checks for Cancer Metastases?",
  introduction: "After undergoing a full course of curative-intent cancer treatment, patients are typically monitored for early signs of recurrence. For certain cancer types, guidelines recommend patients receive imaging scans and blood tests as often as every 6 months over 5 years. But some experts have longstanding concerns about the value of surveillance after curative-intent treatment in patients who remain asymptomatic. Do frequent scans and blood tests actually improve survival or quality of life?",
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
    position: "Selective Surveillance is More Appropriate",
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
  const [version, setVersion] = useState<'A' | 'B' | 'D' | 'E'>('A');

  return (
    <div className="min-h-screen bg-white">
      <DebateHeader version={version} onVersionChange={setVersion} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DebateQuestion 
          question={debateData.question}
          introduction={debateData.introduction}
        />

        <AdPlaceholder size="728x90" className="flex justify-center mb-8" />

        {/* C1 Version: Unboxed arguments with YES/NO capsules */}
        <div className="mb-16">
          <UnboxedArguments 
            yesArguments={debateData.sideA.arguments}
            noArguments={debateData.sideB.arguments}
            yesPhysician={debateData.sideA.physician}
            noPhysician={debateData.sideB.physician}
          />
        </div>

        <div className="mb-16">
          <SummaryTableUnboxed 
            yesArguments={debateData.sideA.arguments}
            noArguments={debateData.sideB.arguments}
          />
        </div>

        {/* 300x250 ad unit below summary of key points */}
        <AdPlaceholder size="300x250" className="flex justify-center mb-12" />

        <MiddleGroundUnboxed />

        <div className="mt-16 mb-12">
          <ConclusionsUnboxed />
        </div>

        {/* Ad placement after conclusions in C1 */}
        <AdPlaceholder size="300x250" className="flex justify-center mb-12" />

        <PollSection debateId="breast-cancer-surveillance" />

        {/* ARCHIVED: What to Read Next section for version D
        {version === 'D' && (
          <div className="my-12">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What to Read Next</h3>
              <div className="space-y-3">
                <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
                  • Latest Guidelines on Breast Cancer Screening from the American Cancer Society
                </a>
                <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
                  • Understanding Dense Breast Tissue and Its Impact on Screening
                </a>
                <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
                  • Personalized Risk Assessment Tools for Breast Cancer
                </a>
              </div>
            </div>
          </div>
        )}
        */}

        <div className="my-12">
          <CommentSection />
        </div>

        {/* What to Read Next on Medscape section - after discussion for C1 */}
        <div className="mt-16 mb-8">
          <div className="border-t-4 border-gray-800 mb-4"></div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">What to Read Next on Medscape</h3>
          <div className="border-t border-gray-800 mb-6"></div>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-3">
              <a 
                href="https://www.medscape.com/viewarticle/routine-checks-cancer-metastases-help-or-harm-2025a1000h03"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer block"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'medscape_link_click', {
                      event_category: 'external_links',
                      event_label: 'Routine Checks for Cancer Metastases Help or Harm',
                      link_url: 'https://www.medscape.com/viewarticle/routine-checks-cancer-metastases-help-or-harm-2025a1000h03'
                    });
                    console.log('GA4 Event fired: medscape_link_click');
                  }
                }}
              >
                Routine Checks for Cancer Metastases: A Help or Harm?
              </a>
            </div>
            <div className="border-b border-gray-200 pb-3">
              <a 
                href="https://www.medscape.com/viewarticle/beyond-survival-why-many-women-opt-double-mastectomy-2024a1000gv5?form=fpf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer block"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'medscape_link_click', {
                      event_category: 'external_links',
                      event_label: 'Beyond Survival Double Mastectomy',
                      link_url: 'https://www.medscape.com/viewarticle/beyond-survival-why-many-women-opt-double-mastectomy-2024a1000gv5'
                    });
                    console.log('GA4 Event fired: medscape_link_click');
                  }
                }}
              >
                Beyond Survival: Why Many Women Opt for a Double Mastectomy
              </a>
            </div>
            <div className="border-b border-gray-200 pb-3">
              <a 
                href="https://www.medscape.com/viewarticle/surveillance-instead-surgery-low-risk-dcis-2024a1000nak?form=fpf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer block"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'medscape_link_click', {
                      event_category: 'external_links',
                      event_label: 'Surveillance Instead Surgery DCIS',
                      link_url: 'https://www.medscape.com/viewarticle/surveillance-instead-surgery-low-risk-dcis-2024a1000nak'
                    });
                    console.log('GA4 Event fired: medscape_link_click');
                  }
                }}
              >
                Surveillance Instead of Surgery for Low-Risk DCIS?
              </a>
            </div>
          </div>
        </div>
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