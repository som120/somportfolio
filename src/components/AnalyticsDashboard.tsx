import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Eye, Clock, Mouse, TrendingUp, RefreshCw } from 'lucide-react';
const projectId = import.meta.env.VITE_PRODUCT_ID;
const publicAnonKey = import.meta.env.VITE_PUBLIC_ANON_KEY;
const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-ab90b3c1`;

interface AnalyticsStats {
  totalPageViews: number;
  totalSessions: number;
  totalEvents: number;
  avgSessionDuration: number;
  avgScrollDepth: number;
  totalInteractions: number;
}

export const AnalyticsDashboard = () => {
  const [stats, setStats] = useState<AnalyticsStats>({
    totalPageViews: 0,
    totalSessions: 0,
    totalEvents: 0,
    avgSessionDuration: 0,
    avgScrollDepth: 0,
    totalInteractions: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadAnalytics = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/analytics/stats`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Failed to load analytics:', error);
      // Fallback to local storage
      const storedSessions = JSON.parse(localStorage.getItem('analytics_sessions') || '[]');
      const storedPageViews = JSON.parse(localStorage.getItem('analytics_pageviews') || '[]');
      setStats({
        totalPageViews: storedPageViews.length,
        totalSessions: storedSessions.length,
        totalEvents: 0,
        avgSessionDuration: storedSessions.length > 0
          ? Math.round(storedSessions.reduce((acc: number, s: any) => acc + (s.duration || 0), 0) / storedSessions.length / 1000)
          : 0,
        avgScrollDepth: storedSessions.length > 0
          ? Math.round(storedSessions.reduce((acc: number, s: any) => acc + s.maxScrollDepth, 0) / storedSessions.length)
          : 0,
        totalInteractions: storedSessions.reduce((acc: number, s: any) => acc + s.interactions, 0),
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      loadAnalytics();
      // Reload every 10 seconds when visible
      const interval = setInterval(loadAnalytics, 10000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);



  // Toggle visibility with keyboard shortcut (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-2 rounded-lg text-sm hover:bg-emerald-500/20 transition-colors"
        title="Show Analytics (Ctrl+Shift+A)"
      >
        📊 Analytics
      </button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 z-50 w-96 max-h-96 overflow-auto"
    >
      <Card className="bg-gray-900/95 border-emerald-500/20 backdrop-blur-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-emerald-400">Analytics Dashboard</h3>
            <button
              onClick={loadAnalytics}
              disabled={isLoading}
              className="text-gray-400 hover:text-emerald-400 transition-colors disabled:opacity-50"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-black/50 rounded-lg p-3 border border-emerald-500/10">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Eye className="w-4 h-4" />
              <span className="text-xs">Page Views</span>
            </div>
            <div className="text-2xl">{stats.totalPageViews}</div>
          </div>

          <div className="bg-black/50 rounded-lg p-3 border border-blue-500/10">
            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs">Sessions</span>
            </div>
            <div className="text-2xl">{stats.totalSessions}</div>
          </div>

          <div className="bg-black/50 rounded-lg p-3 border border-purple-500/10">
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs">Avg Duration</span>
            </div>
            <div className="text-2xl">{stats.avgSessionDuration}s</div>
          </div>

          <div className="bg-black/50 rounded-lg p-3 border border-orange-500/10">
            <div className="flex items-center gap-2 text-orange-400 mb-1">
              <Mouse className="w-4 h-4" />
              <span className="text-xs">Interactions</span>
            </div>
            <div className="text-2xl">{stats.totalInteractions}</div>
          </div>
        </div>

        {stats.avgScrollDepth > 0 && (
          <div className="bg-black/50 rounded-lg p-3 border border-emerald-500/10">
            <div className="text-xs text-gray-400 mb-2">Avg Scroll Depth</div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.avgScrollDepth}%` }}
              />
            </div>
            <div className="text-right text-xs text-emerald-400 mt-1">
              {stats.avgScrollDepth}%
            </div>
          </div>
        )}

        <div className="mt-3 text-xs text-gray-500 text-center">
          Press Ctrl+Shift+A to toggle • Data stored in Supabase
          {lastUpdated && (
            <div className="mt-1">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
