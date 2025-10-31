# Personal Portfolio Website

A modern, dark-themed portfolio website built with React, TypeScript, Tailwind CSS, and Supabase. Features smooth animations, material design elements, and real-time visitor analytics.

![Portfolio Preview](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop)

## ✨ Features

- **Modern Dark Theme**: Sleek black/dark design with emerald accent colors
- **Smooth Animations**: Motion-based animations and micro-interactions
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Real-time Analytics**: Track visitor behavior with Supabase integration
  - Page views and session tracking
  - Scroll depth monitoring
  - User interaction tracking
  - Live analytics dashboard
- **Project Showcase**: Display your best work with detailed descriptions
- **Skills Section**: Highlight your technical expertise
- **Contact Form**: Easy way for visitors to get in touch

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4.0
- **Animations**: Motion (Framer Motion)
- **UI Components**: Shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Backend**: Supabase Edge Functions (Deno + Hono)
- **Database**: Supabase (PostgreSQL + KV Store)

## 📋 Prerequisites

- Node.js 18+ or Bun
- A Supabase account (free tier works)
- Git

## 🚀 Setup Instructions

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
# or
bun install
\`\`\`

### 3. Set up Supabase credentials

1. Create a [Supabase account](https://supabase.com) if you don't have one
2. Create a new project in Supabase
3. Copy `utils/supabase/info.example.tsx` to `utils/supabase/info.tsx`
4. Fill in your Supabase credentials:

\`\`\`typescript
export const projectId = "your-project-id"
export const publicAnonKey = "your-public-anon-key"
\`\`\`

You can find these in your Supabase project settings under **API**.

### 4. Deploy Supabase Edge Functions

The analytics backend runs on Supabase Edge Functions. Deploy it using:

\`\`\`bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-id

# Deploy the functions
supabase functions deploy make-server-ab90b3c1
\`\`\`

### 5. Run the development server

\`\`\`bash
npm run dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

## 📊 Analytics Dashboard

Press **Ctrl+Shift+A** (or **Cmd+Shift+A** on Mac) to toggle the analytics dashboard. It displays:

- Total page views
- Session count
- Average session duration
- Scroll depth metrics
- User interaction count

All analytics data is stored in Supabase and persists across sessions.

## 🎨 Customization

### Update Personal Information

Edit the following components to customize your portfolio:

- **Hero Section**: `/components/HeroSection.tsx` - Your name, title, and introduction
- **About Section**: `/components/AboutSection.tsx` - Your background and story
- **Skills Section**: `/components/SkillsSection.tsx` - Your technical skills
- **Projects Section**: `/components/ProjectsSection.tsx` - Your project portfolio
- **Contact Section**: `/components/ContactSection.tsx` - Your contact information and social links

### Customize Colors

The color scheme is defined in `/styles/globals.css`. Primary accent color is emerald (`#10b981`).

## 📁 Project Structure

\`\`\`
├── App.tsx                  # Main application component
├── components/              # React components
│   ├── AboutSection.tsx
│   ├── AnalyticsDashboard.tsx
│   ├── AnalyticsVisualization.tsx
│   ├── ContactSection.tsx
│   ├── HeroSection.tsx
│   ├── Navigation.tsx
│   ├── ProjectsSection.tsx
│   ├── SkillsSection.tsx
│   └── ui/                 # Shadcn UI components
├── hooks/
│   └── useAnalytics.tsx    # Analytics tracking hook
├── styles/
│   └── globals.css         # Global styles and Tailwind config
├── supabase/
│   └── functions/
│       └── server/         # Supabase Edge Functions
└── utils/
    └── supabase/           # Supabase configuration
\`\`\`

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables (if needed)
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Import your repository in [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy!

## 📝 License

MIT License - feel free to use this portfolio template for your own projects!

## 🙏 Credits

- UI Components: [Shadcn/ui](https://ui.shadcn.com/)
- Icons: [Lucide](https://lucide.dev/)
- Images: [Unsplash](https://unsplash.com/)
- Backend: [Supabase](https://supabase.com/)

---

Made with ❤️ using React and Supabase
