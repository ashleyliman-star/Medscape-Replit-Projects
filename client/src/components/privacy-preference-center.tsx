import { useState, useEffect } from "react";
import { X } from "lucide-react";
import medscapeLogo from "@assets/Medscape logo_1752074413175.png";
import { 
  getCookiePreferences, 
  saveCookiePreferences, 
  acceptEssentialOnly,
  type CookiePreferences 
} from "@/lib/cookie-consent";

interface PrivacyPreferenceCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPreferenceCenter({ isOpen, onClose }: PrivacyPreferenceCenterProps) {
  const [activeTab, setActiveTab] = useState("your-privacy");
  const [preferences, setPreferences] = useState<CookiePreferences>({
    performance: true,
    targeting: true,
    functional: true,
    strictlyNecessary: true,
  });

  // Load current preferences when component mounts
  useEffect(() => {
    if (isOpen) {
      const currentPreferences = getCookiePreferences();
      setPreferences(currentPreferences);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirmChoices = () => {
    // Save the current preferences
    saveCookiePreferences(preferences);
    onClose();
  };

  const handleAcceptEssential = () => {
    // Accept only essential cookies
    acceptEssentialOnly();
    onClose();
  };

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleAllNonEssential = (enabled: boolean) => {
    setPreferences(prev => ({
      ...prev,
      performance: enabled,
      targeting: enabled,
      functional: enabled
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <img 
              src={medscapeLogo} 
              alt="Medscape" 
              className="h-8"
              style={{width: 'auto', maxWidth: '120px'}}
            />
            <h2 className="text-xl font-medium text-gray-800">Privacy Preference Center</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-[500px]">
          {/* Left Sidebar */}
          <div className="w-64 bg-gray-100 border-r border-gray-200">
            <nav className="p-4 space-y-2">
              <button
                onClick={() => setActiveTab("your-privacy")}
                className={`w-full text-left px-4 py-3 rounded text-sm font-medium transition-colors ${
                  activeTab === "your-privacy" 
                    ? "bg-white text-gray-900 shadow-sm border border-gray-200" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Your Privacy
              </button>
              <button
                onClick={() => setActiveTab("strictly-necessary")}
                className={`w-full text-left px-4 py-3 rounded text-sm font-medium transition-colors ${
                  activeTab === "strictly-necessary" 
                    ? "bg-white text-gray-900 shadow-sm border border-gray-200" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Strictly Necessary Cookies
              </button>
              <button
                onClick={() => setActiveTab("preference-center")}
                className={`w-full text-left px-4 py-3 rounded text-sm font-medium transition-colors ${
                  activeTab === "preference-center" 
                    ? "bg-white text-gray-900 shadow-sm border border-gray-200" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Privacy Preference Center
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === "your-privacy" && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Your Privacy</h3>
                <div className="text-gray-700 space-y-4">
                  <p>
                    When you visit our website, we store cookies on your browser to collect information. The information collected might relate to you, your preferences or your device, and is mostly used to make the site work as you expect it to and to provide a more personalized experience. However, you can choose not to allow certain types of cookies, which may impact your experience of the site and the services we are able to offer. Click on the different category headings to find out more and change our default settings according to your preference. You cannot opt-out of our First Party Strictly Necessary Cookies as they are deployed in order to ensure the proper functioning of our website (such as prompting the cookie banner and remembering your settings, to log into your account, to redirect you when you log out, etc.). For more information about the First and Third Party Cookies used please follow this link.
                  </p>
                  <a 
                    href="https://mynt-test-privacy.my.onetrust.com/webform/ebe19500-bc8d-487f-9d89-98fde8b270e2/79f83daf-7de8-4c35-977e-ee8089e07888" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Opt Out Form
                  </a>
                </div>
              </div>
            )}

            {activeTab === "strictly-necessary" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Strictly Necessary Cookies</h3>
                  <span className="text-blue-600 text-sm font-medium">Always Active</span>
                </div>
                <div className="text-gray-700">
                  <p>
                    These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work. These cookies do not store any personally identifiable information.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "preference-center" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Privacy Preference Center</h3>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-3">All</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.performance && preferences.targeting && preferences.functional}
                        onChange={(e) => toggleAllNonEssential(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Performance Cookies */}
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">Performance Cookies</h4>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.performance}
                          onChange={(e) => updatePreference('performance', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    <p className="text-gray-700 text-sm">
                      These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies we will not know when you have visited our site, and will not be able to monitor its performance.
                    </p>
                  </div>

                  {/* Targeting Cookies */}
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">Targeting Cookies</h4>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.targeting}
                          onChange={(e) => updatePreference('targeting', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    <p className="text-gray-700 text-sm">
                      These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information, but are based on uniquely identifying your browser and internet device. If you do not allow these cookies, you will experience less targeted advertising.
                    </p>
                  </div>

                  {/* Functional Cookies */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">Functional Cookies</h4>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.functional}
                          onChange={(e) => updatePreference('functional', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    <p className="text-gray-700 text-sm">
                      These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages. If you do not allow these cookies then some or all of these services may not function properly.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleConfirmChoices}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
            >
              Confirm My Choices
            </button>
            <button
              onClick={handleAcceptEssential}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
            >
              Accept Essential
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}