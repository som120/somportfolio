import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-ab90b3c1/health", (c) => {
  return c.json({ status: "ok" });
});

// Analytics endpoints
app.post("/make-server-ab90b3c1/analytics/pageview", async (c) => {
  try {
    const data = await c.req.json();
    const timestamp = Date.now();
    const key = `pageview:${timestamp}:${data.sessionId}`;
    
    await kv.set(key, {
      ...data,
      timestamp,
    });
    
    console.log(`📊 Page view tracked: ${data.path}`);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error tracking page view:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-ab90b3c1/analytics/event", async (c) => {
  try {
    const data = await c.req.json();
    const timestamp = Date.now();
    const key = `event:${timestamp}:${data.sessionId}:${Math.random().toString(36).substr(2, 9)}`;
    
    await kv.set(key, {
      ...data,
      timestamp,
    });
    
    console.log(`📊 Event tracked: ${data.event}`);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error tracking event:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-ab90b3c1/analytics/session", async (c) => {
  try {
    const data = await c.req.json();
    const key = `session:${data.sessionId}`;
    
    await kv.set(key, data);
    
    console.log(`📊 Session tracked: ${data.sessionId}`);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error tracking session:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.get("/make-server-ab90b3c1/analytics/stats", async (c) => {
  try {
    // Get all analytics data
    const pageviews = await kv.getByPrefix('pageview:');
    const events = await kv.getByPrefix('event:');
    const sessions = await kv.getByPrefix('session:');
    
    // Calculate stats
    const stats = {
      totalPageViews: pageviews.length,
      totalSessions: sessions.length,
      totalEvents: events.length,
      avgSessionDuration: sessions.length > 0
        ? Math.round(sessions.reduce((acc: number, s: any) => acc + (s.duration || 0), 0) / sessions.length / 1000)
        : 0,
      avgScrollDepth: sessions.length > 0
        ? Math.round(sessions.reduce((acc: number, s: any) => acc + (s.maxScrollDepth || 0), 0) / sessions.length)
        : 0,
      totalInteractions: sessions.reduce((acc: number, s: any) => acc + (s.interactions || 0), 0),
      recentPageViews: pageviews.slice(-10).reverse(),
      recentEvents: events.slice(-10).reverse(),
      sessions: sessions.slice(-5).reverse(),
    };
    
    return c.json(stats);
  } catch (error) {
    console.error('Error fetching analytics stats:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);