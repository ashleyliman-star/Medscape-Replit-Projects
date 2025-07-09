import { useState } from "react";
import DebateHeader from "@/components/debate-header";
import medscapeLogo from "@assets/Medscape logo_1752074413175.png";
import googlePlayBadge from "@assets/Google_Play_Store_badge_EN.svg_1752080323301.webp";
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
  const [activeMenu, setActiveMenu] = useState('policies');

  const handleCommentClick = () => {
    setIsCommentPanelOpen(true);
  };

  const handleCloseCommentPanel = () => {
    setIsCommentPanelOpen(false);
  };

  const menuItems = {
    policies: [
      { label: 'Privacy Policy', href: 'https://www.medscape.com/public/privacy' },
      { label: 'Editorial Policy', href: 'https://www.medscape.com/public/editorialpolicies' },
      { label: 'Advertising Policy', href: 'https://www.medscape.com/public/adpolicy' },
      { label: 'Terms of Use', href: 'https://www.medscape.com/public/termsofuse' },
      { label: 'Cookies', href: 'https://www.medscape.com/public/cookies' },
      { label: 'Your Privacy Choices', href: '#', hasIcon: true }
    ],
    medscape: [
      { label: 'News & Perspectives', href: 'https://www.medscape.com/today' },
      { label: 'Tools & References', href: 'https://reference.medscape.com/?_gl=1*egdqvp*_gcl_au*MTc0ODM3ODk0NC4xNzQ0ODM1MTMz' },
      { label: 'CME/CE', href: 'https://www.medscape.org/multispecialty?_gl=1*egdqvp*_gcl_au*MTc0ODM3ODk0NC4xNzQ0ODM1MTMz' },
      { label: 'Video', href: 'https://www.medscape.com/video' },
      { label: 'Events', href: 'https://www.medscapelive.com/' },
      { label: 'Specialties', href: 'https://www.medscape.com/specialties' },
      { label: 'Topics', href: 'https://www.medscape.com/today/resource' },
      { label: 'Account Information', href: 'https://www.medscape.com/profile' },
      { label: 'Newsletters & Alerts', href: 'https://www.medscape.com/newsletters' }
    ],
    about: [
      { label: 'About Medscape', href: 'https://www.medscape.com/public/about' },
      { label: 'Medscape Staff', href: 'https://www.medscape.com/public/bios/medscapestaff' },
      { label: 'Market Research', href: 'https://www.medscape.com/marketresearch' },
      { label: 'Help Center', href: 'https://help.medscape.com/hc/en-us' },
      { label: 'Contact Us', href: 'https://help.medscape.com/hc/en-us/requests/new?_gl=1*fe4ty3*_gcl_au*MTc0ODM3ODk0NC4xNzQ0ODM1MTMz' }
    ],
    advertisers: [
      { label: 'Advertise with Us', href: 'https://www.medscape.com/advertise' },
      { label: 'Advertising Policy', href: 'https://www.medscape.com/public/adpolicy' }
    ]
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

          
          {/* Main Navigation */}
          <div className="flex flex-wrap items-center justify-between border-b-2 border-gray-300 mb-4">
            <div className="flex gap-8">
              <button 
                onClick={() => setActiveMenu('policies')}
                onMouseEnter={() => setActiveMenu('policies')}
                className={`text-base font-medium py-3 transition-colors duration-200 ${
                  activeMenu === 'policies' ? 'text-[#16478c] border-b-4 border-[#16478c]' : 'text-black hover:text-[#16478c]'
                }`}
              >
                Policies
              </button>
              <button 
                onClick={() => setActiveMenu('medscape')}
                onMouseEnter={() => setActiveMenu('medscape')}
                className={`text-base font-medium py-3 transition-colors duration-200 ${
                  activeMenu === 'medscape' ? 'text-[#16478c] border-b-4 border-[#16478c]' : 'text-black hover:text-[#16478c]'
                }`}
              >
                Medscape
              </button>
              <button 
                onClick={() => setActiveMenu('about')}
                onMouseEnter={() => setActiveMenu('about')}
                className={`text-base font-medium py-3 transition-colors duration-200 ${
                  activeMenu === 'about' ? 'text-[#16478c] border-b-4 border-[#16478c]' : 'text-black hover:text-[#16478c]'
                }`}
              >
                About
              </button>
              <button 
                onClick={() => setActiveMenu('advertisers')}
                onMouseEnter={() => setActiveMenu('advertisers')}
                className={`text-base font-medium py-3 transition-colors duration-200 ${
                  activeMenu === 'advertisers' ? 'text-[#16478c] border-b-4 border-[#16478c]' : 'text-black hover:text-[#16478c]'
                }`}
              >
                For Advertisers
              </button>
            </div>
            
            {/* Medscape Logo */}
            <div className="pb-2">
              <a href="https://www.medscape.com" target="_blank" rel="noopener noreferrer">
                <img 
                  src={medscapeLogo} 
                  alt="Medscape" 
                  className="h-6"
                  style={{width: 'auto', maxWidth: '140px'}}
                />
              </a>
            </div>
          </div>
          
          {/* Dynamic Sub-menu */}
          <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
            {menuItems[activeMenu as keyof typeof menuItems]?.map((item, index, array) => (
              <div key={index} className="flex items-center">
                <a 
                  href={item.href} 
                  className="text-black hover:text-gray-600"
                  target={item.href.startsWith('http') ? '_blank' : '_self'}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {item.label}
                  {item.hasIcon && (
                    <span className="ml-1 inline-block w-4 h-4 bg-blue-600 rounded-full text-white text-xs font-bold text-center leading-4">CA</span>
                  )}
                </a>
                {index < array.length - 1 && (
                  <div className="h-4 w-px bg-gray-300 mx-4"></div>
                )}
              </div>
            ))}
          </div>
          
          {/* Social Media Icons */}
          <div className="flex justify-end gap-4 mb-6">
            {/* Facebook */}
            <a href="https://www.facebook.com/medscape" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            {/* X (Twitter) */}
            <a href="https://x.com/medscape" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/company/medscape" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            {/* YouTube */}
            <a href="https://www.youtube.com/user/medscape" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/medscape/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
          
          {/* App Downloads */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="text-sm text-gray-600 mr-4">GET THE MEDSCAPE APP</div>
            <a href="https://apps.apple.com/us/app/medscape/id321367289" target="_blank" rel="noopener noreferrer" className="inline-block">
              <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&releaseDate=1469664000" 
                   alt="Download on the App Store" 
                   className="h-8" />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.medscape.android&pli=1" target="_blank" rel="noopener noreferrer" className="inline-block">
              <img src={googlePlayBadge} 
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