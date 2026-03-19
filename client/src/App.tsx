import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import DebatePage from "@/pages/debate";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";
import { initGA } from "./lib/analytics";
import { initializeCookiePreferences } from "./lib/cookie-consent";

function Router() {
  return (
    <Switch>
      <Route path="/" component={DebatePage} />
      <Route path="/debates/does-asymptomatic-aortic-stenosis-warrant-early-intervention" component={DebatePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize Google Analytics and cookie preferences when app loads
  useEffect(() => {
    // Initialize cookie preferences system
    initializeCookiePreferences();
    
    // Verify required environment variable is present
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
