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
        title: "Routine surveillance is often backed by guidelines",
        points: [
          "Major cancer organizations, such as NCCN and ASCO, typically recommend routine surveillance in asymptomatic patients following curative intent cancer treatment (notable exception is breast cancer)."
        ]
      },
      {
        title: "Routine surveillance finds more recurrences",
        points: [
          "Studies generally indicate that regular scans and blood tests uncover more cancer recurrences."
        ]
      },
      {
        title: "Earlier detection could improve outcomes",
        points: [
          "5-year survival rates tend to be higher in patients with asymptomatic vs symptomatic recurrences."
        ]
      },
      {
        title: "Catching recurrences earlier likely means less disease",
        points: [
          "Theoretically, tumor burden will be lower before symptoms develop."
        ]
      },
      {
        title: "The disease may be easier to treat",
        points: [
          "Treating patients at an earlier stage should be more effective or mean less aggressive treatment is needed."
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
        title: "Regular surveillance can lead to overdiagnosis",
        points: [
          "Routine blood tests and imaging may uncover incidental findings that would not be harmful to patients."
        ]
      },
      {
        title: "Overdiagnosis can lead to unnecessary care",
        points: [
          "Incidental findings may prompt follow-up testing and expose patients to additional radiation from imaging or to unnecessary treatment."
        ]
      },
      {
        title: "No clear evidence survival improves",
        points: [
          "Studies consistently show that identifying recurrent disease earlier does not improve survival in asymptomatic patients. Survival may only appear to be better in patients with asymptomatic vs symptomatic recurrences because the \"survival clock\" starts earlier."
        ]
      },
      {
        title: "Quality of life doesn't improve",
        points: [
          "Research also indicates that routine surveillance in this population does not improve patients' quality of life. This testing can, for instance, fuel greater anxiety among patients, and regular travel to appointments may be challenging and take time away from work and family."
        ]
      },
      {
        title: "Patients often bear the cost",
        points: [
          "These tests aren't cheap and patients increasingly have to pay the costs out of pocket."
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

        <AdPlaceholder size="728x90" className="flex justify-center mb-8" position={1} />

        {/* C1 Version: Unboxed arguments with YES/NO capsules */}
        <div className="mb-16">
          <UnboxedArguments 
            yesArguments={debateData.sideA.arguments}
            noArguments={debateData.sideB.arguments}
            yesPhysician={debateData.sideA.physician}
            noPhysician={debateData.sideB.physician}
            startingAdPosition={2}
          />
        </div>

        <div className="mb-16">
          <SummaryTableUnboxed 
            yesArguments={debateData.sideA.arguments}
            noArguments={debateData.sideB.arguments}
          />
        </div>

        {/* 300x250 ad unit below summary of key points */}
        <AdPlaceholder size="300x250" className="flex justify-center mb-12" position={7} />

        <MiddleGroundUnboxed />

        <div className="mt-16 mb-12">
          <ConclusionsUnboxed />
        </div>

        {/* Ad placement after conclusions in C1 */}
        <AdPlaceholder size="300x250" className="flex justify-center mb-12" position={8} />

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
                href="https://www.medscape.com/viewarticle/routine-checks-cancer-metastases-help-or-harm-2025a1000h03?ecd=socpd_fb_250102_mscpmrk_xx_position1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer block"
                onClick={() => {
                  console.log('Link clicked - checking GA availability');
                  console.log('window.gtag available:', typeof window.gtag);
                  if (typeof window !== 'undefined' && window.gtag) {
                    console.log('Firing GA4 event: medscape_link_click');
                    window.gtag('event', 'medscape_link_click', {
                      event_category: 'external_links',
                      event_label: 'Routine Checks for Cancer Metastases Help or Harm',
                      link_url: 'https://www.medscape.com/viewarticle/routine-checks-cancer-metastases-help-or-harm-2025a1000h03?ecd=socpd_fb_250102_mscpmrk_xx_position1'
                    });
                    console.log('GA4 Event fired: medscape_link_click');
                  } else {
                    console.log('GA not available - gtag function not found');
                  }
                }}
              >
                Routine Checks for Cancer Metastases: A Help or Harm?
              </a>
            </div>
            <div className="border-b border-gray-200 pb-3">
              <a 
                href="https://www.medscape.com/viewarticle/beyond-survival-why-many-women-opt-double-mastectomy-2024a1000gv5?ecd=socpd_fb_250102_mscpmrk_xx_position2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer block"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'medscape_link_click', {
                      event_category: 'external_links',
                      event_label: 'Beyond Survival Double Mastectomy',
                      link_url: 'https://www.medscape.com/viewarticle/beyond-survival-why-many-women-opt-double-mastectomy-2024a1000gv5?ecd=socpd_fb_250102_mscpmrk_xx_position2'
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
                href="https://www.medscape.com/viewarticle/surveillance-instead-surgery-low-risk-dcis-2024a1000nak?ecd=socpd_fb_250102_mscpmrk_xx_position3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer block"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'medscape_link_click', {
                      event_category: 'external_links',
                      event_label: 'Surveillance Instead Surgery DCIS',
                      link_url: 'https://www.medscape.com/viewarticle/surveillance-instead-surgery-low-risk-dcis-2024a1000nak?ecd=socpd_fb_250102_mscpmrk_xx_position3'
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