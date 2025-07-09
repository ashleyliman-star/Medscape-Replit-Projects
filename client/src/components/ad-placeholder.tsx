import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { useEffect, useState } from "react";

interface AdPlaceholderProps {
  size: '300x250' | '728x90' | 'responsive-desktop-banner';
  className?: string;
  position?: number;
}

export default function AdPlaceholder({ size, className, position }: AdPlaceholderProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const dimensions = {
    '300x250': 'w-80 h-64',
    '728x90': 'h-24',
    'responsive-desktop-banner': 'w-80 h-64 md:h-24'
  };

  const getStyles = () => {
    if (size === '728x90') {
      return { width: '728px', height: '90px' };
    }
    if (size === 'responsive-desktop-banner') {
      if (isDesktop) {
        return { width: '728px', height: '90px' };
      } else {
        return { width: '300px', height: '250px' };
      }
    }
    return {};
  };

  const handleAdClick = () => {
    const deviceType = isDesktop ? 'desktop' : 'mobile';
    trackEvent(
      'medscape_ad_click',
      'advertisement',
      `Position ${position || 'Unknown'} ${deviceType}`,
      1
    );
    
    // Navigate to specific URLs for Medscape alcohol ads
    if (size === '728x90' && position === 1) {
      window.open('https://www.medscape.com/viewarticle/cancer-risk-hiding-your-patients-glass-rethinking-alcohol-2025a1000c9d?ecd=house-1_mscpmrk_masters_alc', '_blank');
    } else if (size === 'responsive-desktop-banner' && position === 2) {
      window.open('https://www.medscape.com/viewarticle/memory-loss-motivation-use-brain-health-start-alcohol-2025a1000cby?ecd=house-2_mscpmrk_masters_alc', '_blank');
    } else if (size === 'responsive-desktop-banner' && position === 3) {
      window.open('https://www.medscape.com/viewarticle/if-youre-only-watching-cancer-youre-missing-real-harm-2025a1000cma?ecd=house-4_mscpmrk_masters_alc', '_blank');
    } else if (size === 'responsive-desktop-banner' && position === 5) {
      window.open('https://www.medscape.com/viewarticle/two-diagnoses-one-patient-how-treat-alcohol-use-and-mental-2025a1000czn?ecd=house-3_mscpmrk_masters_alc', '_blank');
    } else if (size === '300x250' && position === 7) {
      window.open('https://www.medscape.com/viewarticle/danger-zone-no-one-screens-uncovering-unhealthy-drinking-2025a1000cm6?ecd=house-5_mscpmrk_masters_alc', '_blank');
    } else if (size === '300x250' && position === 1 && !isDesktop) {
      window.open('https://www.medscape.com/viewarticle/cancer-risk-hiding-your-patients-glass-rethinking-alcohol-2025a1000c9d?ecd=house-1_mscpmrk_masters_alc', '_blank');
    } else if (size === '300x250' && position === 2 && !isDesktop) {
      window.open('https://www.medscape.com/viewarticle/memory-loss-motivation-use-brain-health-start-alcohol-2025a1000cby?ecd=house-2_mscpmrk_masters_alc', '_blank');
    } else if (size === '300x250' && position === 3 && !isDesktop) {
      window.open('https://www.medscape.com/viewarticle/if-youre-only-watching-cancer-youre-missing-real-harm-2025a1000cma?ecd=house-4_mscpmrk_masters_alc', '_blank');
    } else if (size === '300x250' && position === 4 && !isDesktop) {
      window.open('https://www.medscape.com/viewarticle/two-diagnoses-one-patient-how-treat-alcohol-use-and-mental-2025a1000czn?ecd=house-3_mscpmrk_masters_alc', '_blank');
    } else if (size === '300x250' && position === 5 && !isDesktop) {
      window.open('https://www.medscape.com/viewarticle/danger-zone-no-one-screens-uncovering-unhealthy-drinking-2025a1000cm6?ecd=house-5_mscpmrk_masters_alc', '_blank');
    } else if (size === 'responsive-desktop-banner' && position === 5 && !isDesktop) {
      window.open('https://www.medscape.com/viewarticle/cancer-risk-hiding-your-patients-glass-rethinking-alcohol-2025a1000c9d?ecd=house-1_mscpmrk_masters_alc', '_blank');
    } else if (size === '300x250' && position === 7 && !isDesktop) {
      window.open('https://www.medscape.com/viewarticle/memory-loss-motivation-use-brain-health-start-alcohol-2025a1000cby?ecd=house-2_mscpmrk_masters_alc', '_blank');
    }
  };

  // Show Medscape alcohol ads for specific positions on desktop and mobile
  const showFirstMedscapeAd = size === '728x90' && position === 1; // Show on both desktop and mobile (desktop only, mobile hidden)
  const showSecondMedscapeAd = size === 'responsive-desktop-banner' && position === 2 && isDesktop;
  const showThirdMedscapeAd = size === 'responsive-desktop-banner' && position === 3 && isDesktop;
  const showFourthMedscapeAd = size === 'responsive-desktop-banner' && position === 5 && isDesktop; // Updated position
  const showFifthMedscapeAd = size === '300x250' && position === 7 && isDesktop; // Updated position
  const showFirstMobile300x250Ad = size === '300x250' && position === 1 && !isDesktop; // Updated position
  const showSecondMobile300x250Ad = size === '300x250' && position === 2 && !isDesktop;
  const showThirdMobile300x250Ad = size === '300x250' && position === 3 && !isDesktop;
  const showFourthMobile300x250Ad = size === '300x250' && position === 4 && !isDesktop;
  const showFifthMobile300x250Ad = size === '300x250' && position === 5 && !isDesktop;
  const showSixthMobile300x250Ad = size === 'responsive-desktop-banner' && position === 5 && !isDesktop;
  const showSeventhMobile300x250Ad = size === '300x250' && position === 7 && !isDesktop;
  
  const firstAlcoholAdImage = "/attached_assets/MM_Alcohol_Post-Event_v3_728x90_1752081869926.jpg";
  const secondAlcoholAdImage = "/attached_assets/MM_Alcohol_Post-Event_v4_728x90_1752082530452.jpg";
  const thirdAlcoholAdImage = "/attached_assets/MM_Alcohol_Post-Event_v6_728x90 (1)_1752083072070.jpg";
  const fourthAlcoholAdImage = "/attached_assets/MM_Alcohol_Post-Event_v5_728x90_1752083208434.jpg";
  const fifthAlcoholAdImage = "/attached_assets/MM_Alcohol_Post-Event_v7_300x250_1752083329006.jpg";
  const firstMobile300x250AdImage = "/attached_assets/MM_Alcohol_Post-Event_v3_300x250_1752090608590.jpg";
  const secondMobile300x250AdImage = "/attached_assets/MM_Alcohol_Post-Event_v4_300x250_1752091332968.jpg";
  const thirdMobile300x250AdImage = "/attached_assets/MM_Alcohol_Post-Event_v6_300x250_1752091467559.jpg";
  const fourthMobile300x250AdImage = "/attached_assets/MM_Alcohol_Post-Event_v5_300x250_1752091581010.jpg";
  const fifthMobile300x250AdImage = "/attached_assets/MM_Alcohol_Post-Event_v7_300x250 (1)_1752091625733.jpg";
  const sixthMobile300x250AdImage = "/attached_assets/MM_Alcohol_Post-Event_v3_300x250 (1)_1752091862554.jpg";
  const seventhMobile300x250AdImage = "/attached_assets/MM_Alcohol_Post-Event_v4_300x250 (1)_1752091987538.jpg";

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div>
        {showFirstMedscapeAd ? (
        <a
          href="https://www.medscape.com/viewarticle/cancer-risk-hiding-your-patients-glass-rethinking-alcohol-2025a1000c9d?ecd=house-1_mscpmrk_masters_alc"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleAdClick}
          className="block cursor-pointer hover:opacity-90 transition-opacity"
          style={getStyles()}
        >
          <img
            src={firstAlcoholAdImage}
            alt="The Cancer Risk Hiding in Your Patient's Glass - Read Now"
            className="w-full h-full object-cover rounded-lg"
            style={isDesktop ? { width: '728px', height: '90px' } : { width: '100%', height: '90px', maxWidth: '728px' }}
          />
        </a>
      ) : showSecondMedscapeAd ? (
        <a
          href="https://www.medscape.com/viewarticle/memory-loss-motivation-use-brain-health-start-alcohol-2025a1000cby?ecd=house-2_mscpmrk_masters_alc"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleAdClick}
          className="block cursor-pointer hover:opacity-90 transition-opacity"
          style={getStyles()}
        >
          <img
            src={secondAlcoholAdImage}
            alt="Use Brain Health to Start the Alcohol Conversation - Read Now"
            className="w-full h-full object-cover rounded-lg"
            style={{ width: '728px', height: '90px' }}
          />
        </a>
      ) : showThirdMedscapeAd ? (
        <a
          href="https://www.medscape.com/viewarticle/if-youre-only-watching-cancer-youre-missing-real-harm-2025a1000cma?ecd=house-4_mscpmrk_masters_alc"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleAdClick}
          className="block cursor-pointer hover:opacity-90 transition-opacity"
          style={getStyles()}
        >
          <img
            src={thirdAlcoholAdImage}
            alt="Beyond Cancer: The Overlooked Harms of Alcohol - Read Now"
            className="w-full h-full object-cover rounded-lg"
            style={{ width: '728px', height: '90px' }}
          />
        </a>
      ) : showFourthMedscapeAd ? (
        <a
          href="https://www.medscape.com/viewarticle/two-diagnoses-one-patient-how-treat-alcohol-use-and-mental-2025a1000czn?ecd=house-3_mscpmrk_masters_alc"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleAdClick}
          className="block cursor-pointer hover:opacity-90 transition-opacity"
          style={getStyles()}
        >
          <img
            src={fourthAlcoholAdImage}
            alt="How to Treat Alcohol Use and Mental Health Together - Read Now"
            className="w-full h-full object-cover rounded-lg"
            style={{ width: '728px', height: '90px' }}
          />
        </a>
      ) : showFifthMedscapeAd ? (
        <a
          href="https://www.medscape.com/viewarticle/danger-zone-no-one-screens-uncovering-unhealthy-drinking-2025a1000cm6?ecd=house-5_mscpmrk_masters_alc"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleAdClick}
          className="block cursor-pointer hover:opacity-90 transition-opacity"
          style={getStyles()}
        >
          <img
            src={fifthAlcoholAdImage}
            alt="Uncovering Unhealthy Drinking in 'Normal' Patients - Read Now"
            className="w-full h-full object-cover rounded-lg"
            style={{ width: '300px', height: '250px' }}
          />
        </a>
      ) : showFirstMobile300x250Ad ? (
        <a
          href="https://www.medscape.com/viewarticle/cancer-risk-hiding-your-patients-glass-rethinking-alcohol-2025a1000c9d?ecd=house-1_mscpmrk_masters_alc"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleAdClick}
          className="block cursor-pointer hover:opacity-90 transition-opacity"
          style={getStyles()}
        >
          <img
            src={firstMobile300x250AdImage}
            alt="The Cancer Risk Hiding in Your Patient's Glass - Read Now"
            className="w-full h-full object-cover rounded-lg"
            style={{ width: '300px', height: '250px' }}
          />
        </a>
      ) : showSecondMobile300x250Ad ? (
        <a
          href="https://www.medscape.com/viewarticle/memory-loss-motivation-use-brain-health-start-alcohol-2025a1000cby?ecd=house-2_mscpmrk_masters_alc"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleAdClick}
          className="block cursor-pointer hover:opacity-90 transition-opacity"
          style={getStyles()}
        >
          <img
            src={secondMobile300x250AdImage}
            alt="Use Brain Health to Start the Alcohol Conversation - Read Now"
            className="w-full h-full object-cover rounded-lg"
            style={{ width: '300px', height: '250px' }}
          />
        </a>
      ) : showThirdMobile300x250Ad ? (
        <a
          href="https://www.medscape.com/viewarticle/if-youre-only-watching-cancer-youre-missing-real-harm-2025a1000cma?ecd=house-4_mscpmrk_masters_alc"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleAdClick}
          className="block cursor-pointer hover:opacity-90 transition-opacity"
          style={getStyles()}
        >
          <img
            src={thirdMobile300x250AdImage}
            alt="Beyond Cancer: The Overlooked Harms of Alcohol - Read Now"
            className="w-full h-full object-cover rounded-lg"
            style={{ width: '300px', height: '250px' }}
          />
        </a>
      ) : showFourthMobile300x250Ad ? (
        <a
          href="https://www.medscape.com/viewarticle/two-diagnoses-one-patient-how-treat-alcohol-use-and-mental-2025a1000czn?ecd=house-3_mscpmrk_masters_alc"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleAdClick}
          className="block cursor-pointer hover:opacity-90 transition-opacity"
          style={getStyles()}
        >
          <img
            src={fourthMobile300x250AdImage}
            alt="How to Treat Alcohol Use and Mental Health Together - Read Now"
            className="w-full h-full object-cover rounded-lg"
            style={{ width: '300px', height: '250px' }}
          />
        </a>
      ) : showFifthMobile300x250Ad ? (
        <a
          href="https://www.medscape.com/viewarticle/danger-zone-no-one-screens-uncovering-unhealthy-drinking-2025a1000cm6?ecd=house-5_mscpmrk_masters_alc"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleAdClick}
          className="block cursor-pointer hover:opacity-90 transition-opacity"
          style={getStyles()}
        >
          <img
            src={fifthMobile300x250AdImage}
            alt="Uncovering Unhealthy Drinking in 'Normal' Patients - Read Now"
            className="w-full h-full object-cover rounded-lg"
            style={{ width: '300px', height: '250px' }}
          />
        </a>
      ) : showSixthMobile300x250Ad ? (
        <a
          href="https://www.medscape.com/viewarticle/cancer-risk-hiding-your-patients-glass-rethinking-alcohol-2025a1000c9d?ecd=house-1_mscpmrk_masters_alc"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleAdClick}
          className="block cursor-pointer hover:opacity-90 transition-opacity"
          style={getStyles()}
        >
          <img
            src={sixthMobile300x250AdImage}
            alt="The Cancer Risk Hiding in Your Patient's Glass - Read Now"
            className="w-full h-full object-cover rounded-lg"
            style={{ width: '300px', height: '250px' }}
          />
        </a>
      ) : showSeventhMobile300x250Ad ? (
        <a
          href="https://www.medscape.com/viewarticle/memory-loss-motivation-use-brain-health-start-alcohol-2025a1000cby?ecd=house-2_mscpmrk_masters_alc"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleAdClick}
          className="block cursor-pointer hover:opacity-90 transition-opacity"
          style={getStyles()}
        >
          <img
            src={seventhMobile300x250AdImage}
            alt="Use Brain Health to Start the Alcohol Conversation - Read Now"
            className="w-full h-full object-cover rounded-lg"
            style={{ width: '300px', height: '250px' }}
          />
        </a>
      ) : (
        <div 
          className={cn(
            'rounded-lg border-2 border-dashed border-gray-400 bg-gray-100 flex items-center justify-center text-gray-600 font-medium cursor-pointer hover:bg-gray-200 transition-colors',
            dimensions[size]
          )}
          style={getStyles()}
          onClick={handleAdClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleAdClick();
            }
          }}
        >
          <span>
            {size === 'responsive-desktop-banner' ? (
              `Advertisement (${isDesktop ? '728x90' : '300x250'})`
            ) : (
              `Advertisement (${size})`
            )}
          </span>
        </div>
      )}
      </div>
      
      {/* Advertisement label */}
      <div className="text-center">
        <span className="text-xs text-gray-500">Advertisement</span>
      </div>
    </div>
  );
}
