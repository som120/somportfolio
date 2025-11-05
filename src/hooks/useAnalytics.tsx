import { useEffect, useRef } from "react";
const projectId = import.meta.env.VITE_PRODUCT_ID;
const publicAnonKey = import.meta.env.VITE_PUBLIC_ANON_KEY;

interface AnalyticsEvent {
  event: string;
  timestamp: number;
  data?: Record<string, any>;
}

interface PageViewData {
  path: string;
  referrer: string;
  timestamp: number;
  sessionId: string;
  viewport: {
    width: number;
    height: number;
  };
  userAgent: string;
}

interface SessionData {
  sessionId: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  pageViews: number;
  maxScrollDepth: number;
  interactions: number;
}

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-ab90b3c1`;

export const useAnalytics = () => {
  const sessionIdRef = useRef<string>("");
  const sessionStartRef = useRef<number>(0);
  const maxScrollDepthRef = useRef<number>(0);
  const interactionCountRef = useRef<number>(0);

  // Generate or retrieve session ID
  const getSessionId = () => {
    if (sessionIdRef.current) return sessionIdRef.current;

    const stored = sessionStorage.getItem("analytics_session_id");
    if (stored) {
      sessionIdRef.current = stored;
      return stored;
    }

    const newId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    sessionStorage.setItem("analytics_session_id", newId);
    sessionIdRef.current = newId;
    return newId;
  };

  // Track page view
  const trackPageView = async () => {
    const pageViewData: PageViewData = {
      path: window.location.pathname,
      referrer: document.referrer,
      timestamp: Date.now(),
      sessionId: getSessionId(),
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      userAgent: navigator.userAgent,
    };

    console.log("📊 Page View:", pageViewData);

    // Send to Supabase backend
    try {
      await fetch(`${API_URL}/analytics/pageview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(pageViewData),
      });
    } catch (error) {
      console.error("Failed to track page view:", error);
    }

    // Also store locally as backup
    const views = JSON.parse(
      localStorage.getItem("analytics_pageviews") || "[]"
    );
    views.push(pageViewData);
    localStorage.setItem(
      "analytics_pageviews",
      JSON.stringify(views.slice(-50))
    );
  };

  // Track scroll depth
  const trackScrollDepth = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const scrollPercentage = Math.round(
      ((scrollTop + windowHeight) / documentHeight) * 100
    );

    if (scrollPercentage > maxScrollDepthRef.current) {
      maxScrollDepthRef.current = scrollPercentage;

      // Track milestone scroll depths
      if ([25, 50, 75, 90, 100].includes(scrollPercentage)) {
        console.log(`📊 Scroll Depth: ${scrollPercentage}%`);
        trackInteraction("scroll_depth", { depth: scrollPercentage });
      }
    }
  };

  // Track user interactions
  const trackInteraction = async (
    action: string,
    data?: Record<string, any>
  ) => {
    interactionCountRef.current += 1;

    const event: AnalyticsEvent = {
      event: action,
      timestamp: Date.now(),
      data: {
        ...data,
        sessionId: getSessionId(),
      },
    };

    console.log("📊 Interaction:", event);

    // Send to Supabase backend
    try {
      await fetch(`${API_URL}/analytics/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.error("Failed to track interaction:", error);
    }
  };

  // Track session end
  const trackSessionEnd = async () => {
    const sessionData: SessionData = {
      sessionId: getSessionId(),
      startTime: sessionStartRef.current,
      endTime: Date.now(),
      duration: Date.now() - sessionStartRef.current,
      pageViews: 1,
      maxScrollDepth: maxScrollDepthRef.current,
      interactions: interactionCountRef.current,
    };

    console.log("📊 Session End:", sessionData);

    // Send to Supabase backend
    try {
      await fetch(`${API_URL}/analytics/session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(sessionData),
      });
    } catch (error) {
      console.error("Failed to track session:", error);
    }

    // Also store locally as backup
    const sessions = JSON.parse(
      localStorage.getItem("analytics_sessions") || "[]"
    );
    sessions.push(sessionData);
    localStorage.setItem(
      "analytics_sessions",
      JSON.stringify(sessions.slice(-20))
    );
  };

  useEffect(() => {
    // Initialize session
    sessionStartRef.current = Date.now();
    getSessionId();

    // Track page view
    trackPageView();

    // Track scroll depth
    const handleScroll = () => trackScrollDepth();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Track clicks
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tagName = target.tagName.toLowerCase();

      if (["a", "button"].includes(tagName) || target.closest("a, button")) {
        const element = target.closest("a, button");
        trackInteraction("click", {
          element: element?.tagName.toLowerCase(),
          text: element?.textContent?.trim().substring(0, 50),
          href: (element as HTMLAnchorElement)?.href,
        });
      }
    };
    document.addEventListener("click", handleClick);

    // Track session end on page unload
    const handleUnload = () => trackSessionEnd();
    window.addEventListener("beforeunload", handleUnload);

    // Track visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log("📊 Page Hidden");
      } else {
        console.log("📊 Page Visible");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
      window.removeEventListener("beforeunload", handleUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return {
    trackEvent: trackInteraction,
    trackPageView,
  };
};
