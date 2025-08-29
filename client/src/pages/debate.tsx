// Import useEffect and useRef hooks for scroll tracking
import { useState, useEffect, useRef } from "react";
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
import PrivacyPreferenceCenter from "@/components/privacy-preference-center";

// Declare gtag function for TypeScript
// Start - Declare this block for enable scroll tracking
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const track = (moduleName) => {
  window?.globalMetrics?.sendEvent?.({ type: "pagelink", moduleName });
};
// End - Declare this block for enable scroll tracking

const debateData = {
  question: "Does Asymptomatic Aortic Stenosis Warrant Early Intervention?",
  introduction:
    "It's not everyday that a cardiology legend publicly changes course. Yet after 35 years, Eugene Braunwald, MD, reversed his stance against intervening early in patients with severe asymptomatic aortic stenosis (AS). His reconsideration was based on cumulative data from randomized controlled trials (RCTs) on early surgical or transcatheter aortic valve replacement (SAVR/TAVR). The FDA followed with an expanded indication for TAVR to include asymptomatic patients. But not everyone favors early intervention over clinical surveillance. Are the data strong enough to support a paradigm shift in management?",
  sideA: {
    position: "YES: Early Intervention Is Best",
    color: "blue" as const,
    physician: {
      name: "Dr. Jennifer Martinez",
      credentials: "MD, Radiologist & Breast Imaging Specialist",
      institution: "Johns Hopkins Breast Center",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    },
    statement:
      "Routine breast cancer surveillance saves lives through early detection. The benefits of identifying cancer in its earliest stages far outweigh the risks and challenges of screening programs.",
    arguments: [
      {
        title: "Data from RCTs support early intervention",
        points: [
          "A meta-analysis of the 4 RCTs comparing SAVR or TAVR with clinical surveillance found that early intervention was associated with a significantly lower risk of stroke, hospitalization for heart failure, and unplanned cardiovascular hospitalizations.",
        ],
      },
      {
        title: "Aortic stenosis is a progressive disease",
        points: [
          "Even when asymptomatic, severe AS is a progressive condition that ultimately leads to left ventricular dysfunction and heart failure.",
        ],
      },
      {
        title: "There is little harm from intervening early",
        points: [
          "Historically, mortality rates from surgery favored watchful waiting, but contemporary SAVR (and increasingly TAVR) has a rate of perioperative mortality of 1%-2% in low-risk patients.",
        ],
      },
      {
        title: "The line between symptomatic and asymptomatic is blurry",
        points: [
          "Patients may appear asymptomatic because they limit activity or have comorbidities that confound symptoms from valvular disease.",
        ],
      },
      {
        title: "Severe AS is undertreated",
        points: [
          "Severe AS is often undertreated, and delays in treatment are associated with premature mortality and poor quality of life. An early intervention approach could avoid this.",
        ],
      },
    ],
    guidelines:
      "Follow established screening guidelines recommending annual or biennial mammograms for women aged 50-74, with individualized decisions for women 40-49 based on personal risk factors and preferences.",
  },
  sideB: {
    position: "NO: Clinical Surveillance is More Appropriate",
    color: "purple" as const,
    physician: {
      name: "Dr. Robert Chen",
      credentials: "MD, MPH, Preventive Medicine Specialist",
      institution: "University of California San Francisco",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    },
    statement:
      "While breast cancer screening has benefits, routine surveillance carries significant risks of overdiagnosis, false positives, and psychological harm that may outweigh benefits for many women.",
    arguments: [
      {
        title:
          "The current data are not sufficient to support early intervention",
        points: [
          "SAVR was not superior to surveillance for the composite endpoint of death or unplanned AS-related hospitalization in the EVOLVED trial. The benefits seen for TAVR in the EARLY TAVR trial were driven by unplanned hospitalizations; there was no statistically significant difference in stroke or mortality.",
        ],
      },
      {
        title:
          "Valve durability issues mean patients will need repeat intervention",
        points: [
          "Earlier intervention means a high likelihood of bioprosthesis degeneration and the need for reoperation and/or valve-in-valve TAVR decades later.",
        ],
      },
      {
        title: "There is potential harm from intervening early",
        points: [
          "Even low-risk SAVR/TAVR carries a risk of stroke, bleeding, conduction abnormalities or need for pacemaker, and vascular complications.",
        ],
      },
      {
        title: "Guidelines with clear definitions are needed first",
        points: [
          'Clear definitions of what constitutes "severe" and "asymptomatic" are needed before widespread adoption of early intervention.',
        ],
      },
      {
        title: "We should wait for more data",
        points: [
          "Current data are from trials that were relatively small, with short to medium-term follow-up, and focus on low-risk surgical cohorts. We should wait for the completion of ongoing RCTs (EASY-AS and DANAVR) and longer follow-up of EARLY TAVR before recommending an early intervention strategy.",
        ],
      },
    ],
    guidelines:
      "Emphasize shared decision-making with individualized risk assessment. Consider family history, genetic factors, and patient preferences. Focus screening on higher-risk populations where benefits clearly outweigh harms.",
  },
};

// Find principal export function to export the scroll tracking
export default function DebatePage() {
  const [isCommentPanelOpen, setIsCommentPanelOpen] = useState(false);
  const [isPrivacyCenterOpen, setIsPrivacyCenterOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("policies");

  const handleCommentClick = () => {
    setIsCommentPanelOpen(true);
  };

  const handleCloseCommentPanel = () => {
    setIsCommentPanelOpen(false);
  };

  const menuItems = {
    policies: [
      {
        label: "Privacy Policy",
        href: "https://www.medscape.com/public/privacy",
      },
      {
        label: "Editorial Policy",
        href: "https://www.medscape.com/public/editorialpolicies",
      },
      {
        label: "Advertising Policy",
        href: "https://www.medscape.com/public/adpolicy",
      },
      {
        label: "Terms of Use",
        href: "https://www.medscape.com/public/termsofuse",
      },
      { label: "Cookies", href: "https://www.medscape.com/public/cookies" },
      { label: "Your Privacy Choices", href: "#", hasIcon: true },
    ],
    medscape: [
      { label: "News & Perspectives", href: "https://www.medscape.com/today" },
      {
        label: "Tools & References",
        href: "https://reference.medscape.com/?_gl=1*egdqvp*_gcl_au*MTc0ODM3ODk0NC4xNzQ0ODM1MTMz",
      },
      {
        label: "CME/CE",
        href: "https://www.medscape.org/multispecialty?_gl=1*egdqvp*_gcl_au*MTc0ODM3ODk0NC4xNzQ0ODM1MTMz",
      },
      { label: "Video", href: "https://www.medscape.com/video" },
      { label: "Events", href: "https://www.medscapelive.com/" },
      { label: "Specialties", href: "https://www.medscape.com/specialties" },
      { label: "Topics", href: "https://www.medscape.com/today/resource" },
      {
        label: "Account Information",
        href: "https://www.medscape.com/profile",
      },
      {
        label: "Newsletters & Alerts",
        href: "https://www.medscape.com/newsletters",
      },
    ],
    about: [
      {
        label: "About Medscape",
        href: "https://www.medscape.com/public/about",
      },
      {
        label: "Medscape Staff",
        href: "https://www.medscape.com/public/bios/medscapestaff",
      },
      {
        label: "Market Research",
        href: "https://www.medscape.com/marketresearch",
      },
      { label: "Help Center", href: "https://help.medscape.com/hc/en-us" },
      {
        label: "Contact Us",
        href: "https://help.medscape.com/hc/en-us/requests/new?_gl=1*fe4ty3*_gcl_au*MTc0ODM3ODk0NC4xNzQ0ODM1MTMz",
      },
    ],
    advertisers: [
      {
        label: "Advertise with Us",
        href: "https://www.medscape.com/advertise",
      },
      {
        label: "Advertising Policy",
        href: "https://www.medscape.com/public/adpolicy",
      },
    ],
  };

  // Start - Declare this block for enable scroll tracking
  const pageScrollDepthTrackedRef = useRef(new Set());
  const isPageScrollingRef = useRef(false);

  useEffect(() => {
    const handlePageScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
      );

      const scrollableHeight = documentHeight - windowHeight;

      if (scrollableHeight === 0) return; // Prevent division by zero

      // Reset tracking when user scrolls back to the top
      if (scrollTop === 0 && isPageScrollingRef.current) {
        pageScrollDepthTrackedRef.current = new Set();
        isPageScrollingRef.current = false;
      } else if (!isPageScrollingRef.current && scrollTop > 0) {
        isPageScrollingRef.current = true;
      }

      const scrollPercentage = (scrollTop / scrollableHeight) * 100;

      // Define scroll depth milestones - use 98% for 100% to account for floating point precision
      const milestones = [25, 50, 75, 98];
      const milestoneLabels = [25, 50, 75, 100]; // Display labels

      milestones.forEach((milestone, index) => {
        const displayLabel = milestoneLabels[index];
        if (
          scrollPercentage >= milestone &&
          !pageScrollDepthTrackedRef.current.has(milestone)
        ) {
          // Track this milestone
          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "page scroll", {
              event_label: `${displayLabel}%`,
              custom_parameter_1: `page_scroll_${displayLabel}_percent`,
            });
            console.log(`GA Event: page scroll, ${displayLabel}%`); // Debug log
            track(`scrlstry_${displayLabel}pct`);
          }

          // Mark this milestone as tracked
          pageScrollDepthTrackedRef.current.add(milestone);
        }
      });
    };

    // Add scroll event listener
    window.addEventListener("scroll", handlePageScroll, { passive: true });

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("scroll", handlePageScroll);
    };
  }, []);
  // End - Declare this block for enable scroll tracking

  return (
    <div className="min-h-screen bg-white">
      <DebateHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-8 md:py-8">
        <DebateQuestion
          question={debateData.question}
          introduction={debateData.introduction}
          onCommentClick={handleCommentClick}
        />

        <AdPlaceholder
          size="728x90"
          className="hidden md:flex justify-center mb-8"
          position={1}
        />

        {/* C1 Version: Unboxed arguments with YES/NO capsules */}
        <div className="mb-16">
          <UnboxedArguments
            yesArguments={debateData.sideA.arguments}
            noArguments={debateData.sideB.arguments}
            yesPhysician={debateData.sideA.physician}
            noPhysician={debateData.sideB.physician}
            startingAdPosition={1}
          />
        </div>

        <div className="mb-16">
          <SummaryTableUnboxed
            yesArguments={debateData.sideA.arguments}
            noArguments={debateData.sideB.arguments}
          />
        </div>

        {/* 728x90 ad unit on desktop, 300x250 on mobile - below summary of key points */}
        <AdPlaceholder
          size="responsive-desktop-banner"
          className="flex justify-center mb-12"
          position={5}
        />

        <MiddleGroundUnboxed />

        <div className="mt-16 mb-12">
          <ConclusionsUnboxed />
        </div>

        {/* 300x250 ad unit above poll - stays the same on all devices */}
        <AdPlaceholder
          size="300x250"
          className="flex justify-center mb-12"
          position={7}
        />

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
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            What to Read Next on Medscape
          </h3>
          <div className="border-t border-gray-800 mb-6"></div>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-3">
              <a
                href="https://www.medscape.com/viewarticle/fda-approves-tavr-asymptomatic-severe-stenosis-2025a1000b6d?ecd=dir_mscp_020925_icd_cardiodebate_position1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer block"
                onClick={() => {
                  console.log("Link clicked - checking GA availability");
                  console.log("window.gtag available:", typeof window.gtag);
                  if (typeof window !== "undefined" && window.gtag) {
                    console.log("Firing GA4 event: medscape_link_click");
                    window.gtag("event", "medscape_link_click", {
                      event_category: "external_links",
                      event_label:
                        "FDA Approves TAVR in Asymptomatic Severe Stenosis",
                      link_url:
                        "https://www.medscape.com/viewarticle/fda-approves-tavr-asymptomatic-severe-stenosis-2025a1000b6d?ecd=dir_mscp_020925_icd_cardiodebate_position1",
                    });
                    console.log("GA4 Event fired: medscape_link_click");
                  } else {
                    console.log("GA not available - gtag function not found");
                  }
                }}
              >
                FDA Approves TAVR in Asymptomatic Severe Stenosis
              </a>
            </div>
            <div className="border-b border-gray-200 pb-3">
              <a
                href="https://www.medscape.com/viewarticle/asymptomatic-aortic-stenosis-time-act-or-not-so-fast-2025a10005o9?ecd=dir_mscp_020925_icd_cardiodebate_position2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer block"
                onClick={() => {
                  if (typeof window !== "undefined" && window.gtag) {
                    window.gtag("event", "medscape_link_click", {
                      event_category: "external_links",
                      event_label:
                        "Asymptomatic Aortic Stenosis: 'Time to Act' or Not So Fast?",
                      link_url:
                        "https://www.medscape.com/viewarticle/asymptomatic-aortic-stenosis-time-act-or-not-so-fast-2025a10005o9?ecd=dir_mscp_020925_icd_cardiodebate_position2",
                    });
                    console.log("GA4 Event fired: medscape_link_click");
                  }
                }}
              >
                Asymptomatic Aortic Stenosis: 'Time to Act' or Not So Fast?
              </a>
            </div>
            <div className="border-b border-gray-200 pb-3">
              <a
                href="https://www.medscape.com/viewarticle/tavr-beats-surveillance-asymptomatic-aortic-stenosis-2024a1000kji?ecd=dir_mscp_020925_icd_cardiodebate_position3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer block"
                onClick={() => {
                  if (typeof window !== "undefined" && window.gtag) {
                    window.gtag("event", "medscape_link_click", {
                      event_category: "external_links",
                      event_label:
                        "TAVR Beats Surveillance for Asymptomatic Aortic Stenosis",
                      link_url:
                        "https://www.medscape.com/viewarticle/tavr-beats-surveillance-asymptomatic-aortic-stenosis-2024a1000kji?ecd=dir_mscp_020925_icd_cardiodebate_position3",
                    });
                    console.log("GA4 Event fired: medscape_link_click");
                  }
                }}
              >
                TAVR Beats Surveillance for Asymptomatic Aortic Stenosis
              </a>
            </div>
            <div className="border-b border-gray-200 pb-3">
              <a
                href="https://www.medscape.com/viewarticle/early-tavr-positive-trial-fails-inform-clinical-decisions-2024a1000kec?ecd=dir_mscp_020925_icd_cardiodebate_position4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer block"
                onClick={() => {
                  if (typeof window !== "undefined" && window.gtag) {
                    window.gtag("event", "medscape_link_click", {
                      event_category: "external_links",
                      event_label:
                        "EARLY TAVR: A Positive Trial That Fails to Inform Clinical Decisions",
                      link_url:
                        "https://www.medscape.com/viewarticle/early-tavr-positive-trial-fails-inform-clinical-decisions-2024a1000kec?ecd=dir_mscp_020925_icd_cardiodebate_position4",
                    });
                    console.log("GA4 Event fired: medscape_link_click");
                  }
                }}
              >
                EARLY TAVR: A Positive Trial That Fails to Inform Clinical
                Decisions
              </a>
            </div>
            <div className="border-b border-gray-200 pb-3">
              <a
                href="https://www.medscape.com/s/viewarticle/1002532?ecd=dir_mscp_020925_icd_cardiodebate_position5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer block"
                onClick={() => {
                  if (typeof window !== "undefined" && window.gtag) {
                    window.gtag("event", "medscape_link_click", {
                      event_category: "external_links",
                      event_label:
                        "Transcatheter Aortic Valve Replacement Beyond Severe Aortic Stenosis",
                      link_url:
                        "https://www.medscape.com/s/viewarticle/1002532?ecd=dir_mscp_020925_icd_cardiodebate_position5",
                    });
                    console.log("GA4 Event fired: medscape_link_click");
                  }
                }}
              >
                Transcatheter Aortic Valve Replacement Beyond Severe Aortic
                Stenosis
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer
        className="bg-white py-8 mt-12"
        style={{ borderTop: "2px solid #16478c" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Layout */}
          <div className="hidden md:block">
            {/* Main Navigation */}
            <div className="flex flex-wrap items-center justify-between border-b-2 border-gray-300 mb-4">
              <div className="flex gap-8">
                <button
                  onClick={() => setActiveMenu("policies")}
                  onMouseEnter={() => setActiveMenu("policies")}
                  className={`text-base font-medium py-3 transition-colors duration-200 ${
                    activeMenu === "policies"
                      ? "text-[#16478c] border-b-4 border-[#16478c]"
                      : "text-black hover:text-[#16478c]"
                  }`}
                >
                  Policies
                </button>
                <button
                  onClick={() => setActiveMenu("medscape")}
                  onMouseEnter={() => setActiveMenu("medscape")}
                  className={`text-base font-medium py-3 transition-colors duration-200 ${
                    activeMenu === "medscape"
                      ? "text-[#16478c] border-b-4 border-[#16478c]"
                      : "text-black hover:text-[#16478c]"
                  }`}
                >
                  Medscape
                </button>
                <button
                  onClick={() => setActiveMenu("about")}
                  onMouseEnter={() => setActiveMenu("about")}
                  className={`text-base font-medium py-3 transition-colors duration-200 ${
                    activeMenu === "about"
                      ? "text-[#16478c] border-b-4 border-[#16478c]"
                      : "text-black hover:text-[#16478c]"
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => setActiveMenu("advertisers")}
                  onMouseEnter={() => setActiveMenu("advertisers")}
                  className={`text-base font-medium py-3 transition-colors duration-200 ${
                    activeMenu === "advertisers"
                      ? "text-[#16478c] border-b-4 border-[#16478c]"
                      : "text-black hover:text-[#16478c]"
                  }`}
                >
                  For Advertisers
                </button>
              </div>

              {/* Medscape Logo */}
              <div className="pb-2">
                <a
                  href="https://www.medscape.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={medscapeLogo}
                    alt="Medscape"
                    className="h-6"
                    style={{ width: "auto", maxWidth: "140px" }}
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Centered Medscape Logo */}
            <div className="text-center mb-6">
              <a
                href="https://www.medscape.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={medscapeLogo}
                  alt="Medscape"
                  className="h-8 mx-auto"
                  style={{ width: "auto", maxWidth: "160px" }}
                />
              </a>
            </div>

            {/* Horizontally Scrollable Main Menu */}
            <div className="overflow-x-auto mb-4">
              <div
                className="flex gap-4 border-b border-gray-300 pb-0"
                style={{ minWidth: "max-content" }}
              >
                <button
                  onClick={() => setActiveMenu("policies")}
                  className={`text-sm font-medium whitespace-nowrap px-1 py-3 transition-colors duration-200 ${
                    activeMenu === "policies"
                      ? "text-[#16478c] border-b-2 border-[#16478c]"
                      : "text-black hover:text-[#16478c]"
                  }`}
                >
                  Policies
                </button>
                <button
                  onClick={() => setActiveMenu("medscape")}
                  className={`text-sm font-medium whitespace-nowrap px-1 py-3 transition-colors duration-200 ${
                    activeMenu === "medscape"
                      ? "text-[#16478c] border-b-2 border-[#16478c]"
                      : "text-black hover:text-[#16478c]"
                  }`}
                >
                  Medscape
                </button>
                <button
                  onClick={() => setActiveMenu("about")}
                  className={`text-sm font-medium whitespace-nowrap px-1 py-3 transition-colors duration-200 ${
                    activeMenu === "about"
                      ? "text-[#16478c] border-b-2 border-[#16478c]"
                      : "text-black hover:text-[#16478c]"
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => setActiveMenu("advertisers")}
                  className={`text-sm font-medium whitespace-nowrap px-1 py-3 transition-colors duration-200 ${
                    activeMenu === "advertisers"
                      ? "text-[#16478c] border-b-2 border-[#16478c]"
                      : "text-black hover:text-[#16478c]"
                  }`}
                >
                  For Advertisers
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Sub-menu - Desktop */}
          <div className="hidden md:flex flex-wrap items-center gap-4 text-sm mb-6">
            {menuItems[activeMenu as keyof typeof menuItems]?.map(
              (item, index, array) => (
                <div key={index} className="flex items-center">
                  {item.label === "Your Privacy Choices" ? (
                    <button
                      onClick={() => setIsPrivacyCenterOpen(true)}
                      className="text-black hover:text-gray-600 text-left"
                    >
                      {item.label}
                      {item.hasIcon && (
                        <span className="ml-1 inline-block w-4 h-4 bg-blue-600 rounded-full text-white text-xs text-center leading-4">
                          ✓
                        </span>
                      )}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className="text-black hover:text-gray-600"
                      target={item.href.startsWith("http") ? "_blank" : "_self"}
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {item.label}
                      {item.hasIcon && (
                        <span className="ml-1 inline-block w-4 h-4 bg-blue-600 rounded-full text-white text-xs text-center leading-4">
                          ✓
                        </span>
                      )}
                    </a>
                  )}
                  {index < array.length - 1 && (
                    <div className="h-4 w-px bg-gray-300 mx-4"></div>
                  )}
                </div>
              ),
            )}
          </div>

          {/* Dynamic Sub-menu - Mobile */}
          <div className="md:hidden mb-6">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {menuItems[activeMenu as keyof typeof menuItems]?.map(
                (item, index, array) => (
                  <div key={index} className="flex items-center">
                    {item.label === "Your Privacy Choices" ? (
                      <button
                        onClick={() => setIsPrivacyCenterOpen(true)}
                        className="text-xs text-black hover:text-gray-600 text-left"
                      >
                        {item.label}
                        {item.hasIcon && (
                          <span className="ml-1 inline-block w-3 h-3 bg-blue-600 rounded-full text-white text-xs text-center leading-3">
                            ✓
                          </span>
                        )}
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        className="text-xs text-black hover:text-gray-600"
                        target={
                          item.href.startsWith("http") ? "_blank" : "_self"
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {item.label}
                        {item.hasIcon && (
                          <span className="ml-1 inline-block w-3 h-3 bg-blue-600 rounded-full text-white text-xs text-center leading-3">
                            ✓
                          </span>
                        )}
                      </a>
                    )}
                    {index < array.length - 1 && (
                      <div className="h-3 w-px bg-gray-300 mx-2"></div>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* App Downloads */}
          <div className="text-center mb-6">
            <div className="text-sm text-gray-600 mb-3 font-medium">
              GET THE MEDSCAPE APP
            </div>
            <div className="flex justify-center gap-4">
              <a
                href="https://apps.apple.com/us/app/medscape/id321367289"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&releaseDate=1469664000"
                  alt="Download on the App Store"
                  className="h-10"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.medscape.android&pli=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src={googlePlayBadge}
                  alt="Get it on Google Play"
                  className="h-10"
                />
              </a>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-6 mb-6">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/medscape"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            {/* X (Twitter) */}
            <a
              href="https://x.com/medscape"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/medscape"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="https://www.youtube.com/user/medscape"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/medscape/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.80 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-500 text-center border-t border-gray-200 pt-4">
            All material on this website is protected by copyright, Copyright ©
            1994-2025 by WebMD LLC. This website also contains material
            copyrighted by 3rd parties.
          </div>
        </div>
      </footer>

      {/* Comment Panel */}
      <CommentPanel
        isOpen={isCommentPanelOpen}
        onClose={handleCloseCommentPanel}
        debateId="breast-cancer-surveillance"
      />

      {/* Privacy Preference Center */}
      <PrivacyPreferenceCenter
        isOpen={isPrivacyCenterOpen}
        onClose={() => setIsPrivacyCenterOpen(false)}
      />
    </div>
  );
}
