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
import CommentPanel from "@/components/comment-panel";
import GroupedArguments from "@/components/grouped-arguments";
import SplitLayout from "@/components/split-layout";
import UnboxedArguments from "@/components/unboxed-arguments";
import SummaryTableUnboxed from "@/components/summary-table-unboxed";
import MiddleGroundUnboxed from "@/components/middle-ground-unboxed";
import ConclusionsUnboxed from "@/components/conclusions-unboxed";

const debateData = {
  question: "Do Patients Benefit From Routine Checks for Cancer Metastases?",
  introduction: "Is it time to rethink routine surveillance? After undergoing a full course of curative-intent cancer treatment, patients are typically monitored for early signs of recurrence. For certain cancer types, guidelines recommend patients receive imaging scans and blood tests as often as every 6 months over 5 years. But some experts have longstanding concerns about the value of surveillance after curative-intent treatment in patients who remain asymptomatic. Do frequent scans and blood tests actually improve survival or quality of life?",
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
  const [isCommentPanelOpen, setIsCommentPanelOpen] = useState(false);

  const handleCommentClick = () => {
    setIsCommentPanelOpen(true);
  };

  const handleCloseCommentPanel = () => {
    setIsCommentPanelOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <DebateHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DebateQuestion 
          question={debateData.question}
          introduction={debateData.introduction}
          onCommentClick={handleCommentClick}
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

        {/* 728x90 ad unit on desktop, 300x250 on mobile - below summary of key points */}
        <AdPlaceholder size="responsive-desktop-banner" className="flex justify-center mb-12" position={7} />

        <MiddleGroundUnboxed />

        <div className="mt-16 mb-12">
          <ConclusionsUnboxed />
        </div>

        {/* 300x250 ad unit above poll - stays the same on all devices */}
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
            <div className="border-b border-gray-200 pb-3">
              <a 
                href="https://www.medscape.com/viewarticle/do-tattoos-pose-cancer-risk-2025a1000fkh?ecd=socpd_fb_250102_mscpmrk_xx_position4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer block"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'medscape_link_click', {
                      event_category: 'external_links',
                      event_label: 'Do Tattoos Pose Cancer Risk',
                      link_url: 'https://www.medscape.com/viewarticle/do-tattoos-pose-cancer-risk-2025a1000fkh?ecd=socpd_fb_250102_mscpmrk_xx_position4'
                    });
                    console.log('GA4 Event fired: medscape_link_click');
                  }
                }}
              >
                Do Tattoos Pose a Cancer Risk?
              </a>
            </div>
            <div className="border-b border-gray-200 pb-3">
              <a 
                href="https://www.medscape.com/viewarticle/napping-patterns-older-adults-tied-all-cause-mortality-2025a1000fn3?ecd=socpd_fb_250102_mscpmrk_xx_position5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer block"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'medscape_link_click', {
                      event_category: 'external_links',
                      event_label: 'Napping Patterns Older Adults Mortality',
                      link_url: 'https://www.medscape.com/viewarticle/napping-patterns-older-adults-tied-all-cause-mortality-2025a1000fn3?ecd=socpd_fb_250102_mscpmrk_xx_position5'
                    });
                    console.log('GA4 Event fired: medscape_link_click');
                  }
                }}
              >
                Napping Patterns in Older Adults Tied to All-Cause Mortality
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white py-8 mt-12" style={{borderTop: '2px solid #16478c'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Navigation with integrated divider */}
          <div className="flex flex-wrap justify-between items-end border-b-2 border-gray-300 mb-6">
            <div className="flex flex-wrap gap-8 relative">
              <a href="#" className="text-[#16478c] hover:text-[#16478c] font-medium text-base relative group pb-2">
                Policies
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#16478c]"></span>
              </a>
              <a href="#" className="text-black hover:text-[#16478c] font-medium text-base relative group pb-2">
                Medscape
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#16478c] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-black hover:text-[#16478c] font-medium text-base relative group pb-2">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#16478c] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-black hover:text-[#16478c] font-medium text-base relative group pb-2">
                For Advertisers
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#16478c] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            
            {/* Medscape Logo */}
            <div className="pb-2">
              <img src="/attached_assets/Medscape_Logo.svg%20(1)_1750723648901.png" alt="Medscape" className="h-6" onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling.style.display = 'block';
              }} />
              <div className="text-[#16478c] text-lg font-bold" style={{display: 'none'}}>Medscape</div>
            </div>
          </div>
          
          {/* Sub-menu sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
            {/* Policies */}
            <div>
              <h4 className="text-[#16478c] font-medium text-base mb-3">Policies</h4>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">Privacy Policy</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">Editorial Policy</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">Advertising Policy</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">Terms of Use</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">Cookies</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">Your Privacy Choices 🔘</a>
              </div>
            </div>
            
            {/* Medscape */}
            <div>
              <h4 className="text-[#16478c] font-medium text-base mb-3">Medscape</h4>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">News & Perspectives</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">Tools & References</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">CME/CE</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">Video</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">Events</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">Specialties</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">Topics</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">Account Information</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">Newsletters & Alerts</a>
              </div>
            </div>
            
            {/* About */}
            <div>
              <h4 className="text-[#16478c] font-medium text-base mb-3">About</h4>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">About Medscape</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">Medscape Staff</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">Market Research</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">Help Center</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">Contact Us</a>
              </div>
            </div>
            
            {/* For Advertisers */}
            <div>
              <h4 className="text-[#16478c] font-medium text-base mb-3">For Advertisers</h4>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">Advertise with Us</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-800">Advertising Policy</a>
              </div>
            </div>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex justify-end gap-4 mb-6">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.840-.282 1.065-1.039 2.39-1.548 3.22C9.69 23.53 10.892 24.029 12.017 24.029c6.624 0 11.99-5.367 11.99-11.986C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
            </a>
          </div>
          
          {/* App Downloads */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="text-sm text-gray-600 mr-4">GET THE MEDSCAPE APP</div>
            <a href="#" className="inline-block">
              <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&releaseDate=1469664000" 
                   alt="Download on the App Store" 
                   className="h-8" />
            </a>
            <a href="#" className="inline-block">
              <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                   alt="Get it on Google Play" 
                   className="h-8" />
            </a>
          </div>
          
          {/* Copyright */}
          <div className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            All material on this website is protected by copyright, Copyright © 1994-2025 by WebMD LLC. This website also contains material copyrighted by 3rd parties.
          </div>
        </div>
      </footer>

      {/* Comment Panel */}
      <CommentPanel 
        isOpen={isCommentPanelOpen}
        onClose={handleCloseCommentPanel}
        debateId="breast-cancer-surveillance"
      />
    </div>
  );
}