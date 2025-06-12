import { useState } from "react";
import DebateHeader from "@/components/debate-header";
import DebateQuestion from "@/components/debate-question";
import DebateSide from "@/components/debate-side";
import AdPlaceholder from "@/components/ad-placeholder";
import PollSection from "@/components/poll-section";
import Conclusions from "@/components/conclusions";

const debateData = {
  question: "Should Statins Be Prescribed for Primary Prevention in Low-Risk Patients?",
  introduction: "This debate examines whether statin therapy should be recommended for patients without existing cardiovascular disease but with mild risk factors. Two leading cardiologists present contrasting evidence-based perspectives on this critical clinical question affecting millions of patients worldwide.",
  sideA: {
    position: "PRO: Yes, Statins Should Be Prescribed",
    color: "blue",
    physician: {
      name: "Dr. Michael Harrison",
      credentials: "MD, FACC, Interventional Cardiologist",
      institution: "Harvard Medical School, Mass General Brigham",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    },
    statement: "The overwhelming evidence supports statin therapy for primary prevention. The benefits far outweigh the risks, and we have a responsibility to prevent cardiovascular events before they occur.",
    arguments: [
      {
        title: "Proven cardiovascular risk reduction",
        points: [
          "Meta-analyses show 20-25% reduction in major cardiovascular events across diverse patient populations",
          "Number needed to treat is 67 patients over 5 years to prevent one major cardiovascular event"
        ]
      },
      {
        title: "Cost-effectiveness in healthcare",
        points: [
          "Prevention costs significantly less than treating acute cardiovascular events and their complications",
          "Generic statins cost less than $1 per day while hospital stays for MI average $15,000-$30,000"
        ]
      },
      {
        title: "Excellent safety profile",
        points: [
          "Serious adverse events occur in less than 1% of patients with proper monitoring",
          "Muscle symptoms are often reversible and can be managed with different statin formulations"
        ]
      },
      {
        title: "Early intervention importance",
        points: [
          "Atherosclerosis begins early and waiting for events means missing critical prevention windows",
          "Risk calculators may underestimate lifetime risk, especially in younger patients"
        ]
      },
      {
        title: "Multiple cardiovascular benefits",
        points: [
          "Statins provide pleiotropic effects including anti-inflammatory and plaque stabilization properties",
          "Benefits extend beyond LDL reduction including stroke prevention and potential mortality benefit"
        ]
      }
    ],
    guidelines: "Follow ACC/AHA guidelines recommending statin therapy for adults aged 40-75 with LDL ≥70 mg/dL and estimated 10-year ASCVD risk ≥7.5%. Consider patient-clinician discussion for risk-enhancing factors."
  },
  sideB: {
    position: "CON: Selective Use is More Appropriate",
    color: "green",
    physician: {
      name: "Dr. Sarah Chen",
      credentials: "MD, PhD, Preventive Cardiologist",
      institution: "Stanford University School of Medicine",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    },
    statement: "While statins are valuable medications, their widespread use in low-risk patients may cause more harm than benefit. We should focus on lifestyle interventions and reserve medications for appropriate candidates.",
    arguments: [
      {
        title: "Limited benefit in low-risk populations",
        points: [
          "Absolute risk reduction in low-risk patients is minimal, requiring treatment of hundreds to prevent one event",
          "Many studies showing benefit were conducted in higher-risk populations that may not generalize"
        ]
      },
      {
        title: "Significant adverse effects burden",
        points: [
          "Muscle symptoms affect 10-15% of patients and can significantly impact quality of life",
          "Increased risk of new-onset diabetes, particularly in patients with pre-existing risk factors"
        ]
      },
      {
        title: "Lifestyle interventions underutilized",
        points: [
          "Comprehensive lifestyle changes can achieve similar risk reduction without medication side effects",
          "Prescribing statins may reduce patient motivation to make necessary lifestyle modifications"
        ]
      },
      {
        title: "Individual patient variability",
        points: [
          "Risk calculators don't account for individual genetic, social, and lifestyle factors",
          "Shared decision-making should prioritize patient values and preferences over population statistics"
        ]
      },
      {
        title: "Overmedication concerns",
        points: [
          "Widespread statin use contributes to polypharmacy and medication burden in aging populations",
          "Healthcare resources might be better allocated to addressing social determinants of health"
        ]
      }
    ],
    guidelines: "Emphasize comprehensive risk assessment including family history, coronary calcium scoring, and patient preferences. Prioritize intensive lifestyle counseling and reserve statins for patients with multiple risk factors or clear clinical indication."
  }
};

export default function DebatePage() {
  const [version, setVersion] = useState<'A' | 'B'>('A');

  return (
    <div className="min-h-screen bg-gray-50">
      <DebateHeader version={version} onVersionChange={setVersion} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DebateQuestion 
          question={debateData.question}
          introduction={debateData.introduction}
        />
        
        <AdPlaceholder size="728x90" className="flex justify-center mb-8" />
        
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <DebateSide 
            {...debateData.sideA}
            showPhysician={version === 'A'}
          />
          <DebateSide 
            {...debateData.sideB}
            showPhysician={version === 'A'}
          />
        </div>
        
        <AdPlaceholder size="300x250" className="flex justify-center mb-8" />
        
        <Conclusions />
        
        <AdPlaceholder size="728x90" className="flex justify-center mb-8" />
        
        <PollSection debateId="statin-primary-prevention" />
        
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
