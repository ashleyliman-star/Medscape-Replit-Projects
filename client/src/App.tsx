import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import DebatePage from "@/pages/debate";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={DebatePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Handle mobile scroll issues with chat buttons and form interactions
    const handleMobileInteraction = () => {
      if (window.innerWidth <= 768) {
        // Always scroll to top when mobile users interact with chat/form elements
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Listen for button clicks that might trigger chat functionality
    const handleButtonClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target) {
        const buttonText = target.textContent?.toLowerCase() || '';
        // Check for common chat button text patterns
        if (buttonText.includes('get started') || 
            buttonText.includes('chat') || 
            buttonText.includes('help') ||
            target.closest('[data-chat]') ||
            target.closest('.chat-widget')) {
          handleMobileInteraction();
        }
      }
    };

    // Prevent viewport changes that cause unwanted scrolling
    const preventViewportScroll = () => {
      if (window.innerWidth <= 768) {
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
      }
    };

    document.addEventListener('click', handleButtonClick);
    preventViewportScroll();

    return () => {
      document.removeEventListener('click', handleButtonClick);
    };
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
