# **EnTCPrep: AI Technical Guardrails & Build Context**

**AI INSTRUCTION: Read this document carefully before generating any code. This defines the technical boundaries, stack, and architectural principles for the EnTCPrep application. You are free to determine the best optimal folder and component structure, provided you adhere to the Next.js App Router conventions.**

## **1\. Tech Stack Overview**

* **Framework:** Next.js (App Router) with React 18+.  
* **Language:** TypeScript (Strict mode enabled).  
* **Styling:** Tailwind CSS \+ standard utility classes.  
* **UI Components:** shadcn/ui (use standard Radix primitives where applicable) \+ Lucide React for icons.  
* **Backend / Database:** Supabase (Auth, PostgreSQL Database, Storage).  
* **Deployment:** Vercel.

## **2\. Core Architectural Guardrails**

* **Structure Delegation:** You (the AI) will decide the exact component splitting and folder hierarchy (e.g., whether to use a features/ directory or keep it flat in components/). Prioritize modularity and maintainability.  
* **Client vs. Server Components:** Heavily utilize Next.js Server Components for data fetching (Supabase server client) and SEO. Only use "use client" for interactive UI (quiz engines, dashboards, form inputs).  
* **TypeScript:** All database responses must be strictly typed. Generate Supabase types and use them across components. No any types.

## **3\. Database & Security (Supabase)**

* **Simple Queries Only:** Do not generate overly complex nested SQL queries or heavy frontend-side filtering if it can be avoided.  
* **Row Level Security (RLS):** All generated SQL for tables MUST include RLS policies.  
  * *Public Data:* Anyone can read questions and daily circuits.  
  * *Private Data:* Users can ONLY read and update their own users profile, progress, and streaks.  
* **Authentication:** Use Supabase Auth (Email/Password \+ Google OAuth). Wrap the app in a lightweight Auth Provider to manage session state globally.

## **4\. UI/UX Principles**

* **Mobile-First:** 80% of users will be on phones. Use responsive Tailwind prefixes (md:, lg:). The bottom navigation is preferred for mobile, sidebar for desktop.  
* **Loading States:** EVERY async action (fetching questions, submitting answers) MUST have a skeleton loader or spinner. Do not leave the UI hanging.  
* **Error Handling:** Never let an API failure break the page. Use React Error Boundaries or simple try/catch blocks that render a user-friendly fallback (e.g., "Failed to load question, please refresh").  
* **Ad Placements:** Create a dedicated, reusable \<AdPlaceholder slot="identifier" /\> component. Use it in the layout as specified by the PRD. For now, it should render an empty div with a specific height/width and a subtle gray background.

## **5\. Development Workflow Rules**

* Build one phase completely before moving to the next.  
* Do not hallucinate external API dependencies; rely strictly on our Supabase instance.  
* For placeholder images (circuit diagrams), use generic SVGs or placeholder image services until Supabase Storage is wired up.