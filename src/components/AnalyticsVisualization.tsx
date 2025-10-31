import { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-ab90b3c1`;

interface AnalyticsData {
  totalPageViews: number;
  totalSessions: number;
  totalEvents: number;
  avgSessionDuration: number;
  avgScrollDepth: number;
  totalInteractions: number;
  recentPageViews: any[];
  recentEvents: any[];
  sessions: any[];
}

export const AnalyticsVisualization = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/analytics/stats`, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        });
        
        if (response.ok) {
          const analyticsData = await response.json();
          setData(analyticsData);
        }
      } catch (error) {
        console.error('Failed to load analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalytics();
    const interval = setInterval(loadAnalytics, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-emerald-400">Loading analytics...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-red-400">Failed to load analytics data</div>
      </div>
    );
  }

  // Prepare chart data
  const sessionDurationData = data.sessions.map((session: any, index: number) => ({
    name: `Session ${index + 1}`,
    duration: Math.round((session.duration || 0) / 1000),
  }));

  const scrollDepthData = data.sessions.map((session: any, index: number) => ({
    name: `Session ${index + 1}`,
    depth: session.maxScrollDepth || 0,
  }));

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-emerald-400 mb-8">Portfolio Analytics</h1>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gray-900 border-emerald-500/20 p-6">
            <div className="text-gray-400 text-sm mb-2">Total Page Views</div>
            <div className="text-4xl text-emerald-400">{data.totalPageViews}</div>
          </Card>

          <Card className="bg-gray-900 border-blue-500/20 p-6">
            <div className="text-gray-400 text-sm mb-2">Total Sessions</div>
            <div className="text-4xl text-blue-400">{data.totalSessions}</div>
          </Card>

          <Card className="bg-gray-900 border-purple-500/20 p-6">
            <div className="text-gray-400 text-sm mb-2">Total Interactions</div>
            <div className="text-4xl text-purple-400">{data.totalInteractions}</div>
          </Card>
        </div>

        <Tabs defaultValue="sessions" className="w-full">
          <TabsList className="bg-gray-900 border-emerald-500/20">
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="events">Recent Events</TabsTrigger>
          </TabsList>

          <TabsContent value="sessions" className="mt-6">
            <Card className="bg-gray-900 border-emerald-500/20 p-6">
              <h3 className="text-emerald-400 mb-4">Session Duration (seconds)</h3>
              {sessionDurationData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sessionDurationData}>
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#111827', border: '1px solid #10b981' }}
                    />
                    <Bar dataKey="duration" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-gray-400 text-center py-8">No session data available</div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="mt-6">
            <Card className="bg-gray-900 border-blue-500/20 p-6">
              <h3 className="text-blue-400 mb-4">Scroll Depth (%)</h3>
              {scrollDepthData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={scrollDepthData}>
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#111827', border: '1px solid #3b82f6' }}
                    />
                    <Line type="monotone" dataKey="depth" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-gray-400 text-center py-8">No engagement data available</div>
              )}

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-black/50 rounded-lg p-4 border border-emerald-500/10">
                  <div className="text-gray-400 text-sm mb-2">Avg Session Duration</div>
                  <div className="text-2xl text-emerald-400">{data.avgSessionDuration}s</div>
                </div>
                <div className="bg-black/50 rounded-lg p-4 border border-blue-500/10">
                  <div className="text-gray-400 text-sm mb-2">Avg Scroll Depth</div>
                  <div className="text-2xl text-blue-400">{data.avgScrollDepth}%</div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <Card className="bg-gray-900 border-purple-500/20 p-6">
              <h3 className="text-purple-400 mb-4">Recent Events</h3>
              {data.recentEvents && data.recentEvents.length > 0 ? (
                <div className="space-y-3">
                  {data.recentEvents.slice(0, 10).map((event: any, index: number) => (
                    <div
                      key={index}
                      className="bg-black/50 rounded-lg p-3 border border-purple-500/10"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-purple-400">{event.event}</div>
                          {event.data?.text && (
                            <div className="text-gray-400 text-sm mt-1">{event.data.text}</div>
                          )}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 text-center py-8">No events recorded yet</div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
