// Cookie consent management utilities

export interface CookiePreferences {
  performance: boolean;
  targeting: boolean;
  functional: boolean;
  strictlyNecessary: boolean; // Always true, cannot be disabled
}

const COOKIE_PREFERENCES_KEY = 'medscape_cookie_preferences';
const COOKIE_CONSENT_KEY = 'medscape_cookie_consent';

// Default preferences (all enabled initially)
export const DEFAULT_PREFERENCES: CookiePreferences = {
  performance: true,
  targeting: true,
  functional: true,
  strictlyNecessary: true,
};

// Get current cookie preferences from localStorage
export function getCookiePreferences(): CookiePreferences {
  try {
    const stored = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...DEFAULT_PREFERENCES, ...parsed };
    }
  } catch (error) {
    console.warn('Failed to parse cookie preferences:', error);
  }
  return DEFAULT_PREFERENCES;
}

// Save cookie preferences to localStorage
export function saveCookiePreferences(preferences: CookiePreferences): void {
  try {
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences));
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    
    // Apply the preferences immediately
    applyCookiePreferences(preferences);
  } catch (error) {
    console.error('Failed to save cookie preferences:', error);
  }
}

// Apply cookie preferences by managing basic cookie storage
export function applyCookiePreferences(preferences: CookiePreferences): void {
  // Handle targeting cookies (advertising) - basic cleanup only
  if (!preferences.targeting) {
    cleanupTargetingCookies();
  }

  // Handle functional cookies - basic cleanup only
  if (!preferences.functional) {
    cleanupFunctionalCookies();
  }

  // Dispatch custom event for other parts of the app to listen to
  window.dispatchEvent(new CustomEvent('cookiePreferencesChanged', {
    detail: preferences
  }));
}

// Clean up targeting/advertising cookies (basic cleanup only)
function cleanupTargetingCookies(): void {
  // Remove common advertising-related cookies
  const advertisingCookies = [
    '_gads', '_gid', '__gads', '__gpi', '_gcl_au', '_fbp', '_fbc'
  ];
  
  advertisingCookies.forEach(cookieName => {
    deleteCookie(cookieName);
  });
}

// Clean up functional cookies (basic cleanup only)
function cleanupFunctionalCookies(): void {
  // Remove non-essential functional cookies
  const functionalCookies = [
    'preferences', 'language', 'theme'
  ];
  
  functionalCookies.forEach(cookieName => {
    deleteCookie(cookieName);
  });
}

// Utility function to delete a cookie
function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.medscape.com;`;
}

// Check if user has given consent
export function hasUserGivenConsent(): boolean {
  return localStorage.getItem(COOKIE_CONSENT_KEY) === 'true';
}

// Accept only essential cookies
export function acceptEssentialOnly(): void {
  const essentialOnlyPreferences: CookiePreferences = {
    performance: false,
    targeting: false,
    functional: false,
    strictlyNecessary: true,
  };
  
  saveCookiePreferences(essentialOnlyPreferences);
}

// Initialize cookie preferences on app start
export function initializeCookiePreferences(): void {
  if (hasUserGivenConsent()) {
    const preferences = getCookiePreferences();
    applyCookiePreferences(preferences);
  }
}