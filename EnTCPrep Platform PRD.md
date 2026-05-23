# **Product Requirements Document (PRD): EnTCPrep Platform**

## **1\. Executive Summary**

**Project Name:** EnTCPrep (Working Title)

**Objective:** A web-based practice platform for Electronics and Telecommunication (EnTC) students to master fundamentals, prepare for competitive exams (GATE, ESE), and ace technical interviews.

**Core Loop:** Users log in daily to solve a "Daily Circuit" (numeric input) to maintain a streak, solve topic-wise MCQ sets, track their progress on a dashboard, and contribute to the platform via question suggestions and error reporting.

**Monetization:** Ad-supported (Display ads interspersed in UI).

## **2\. Target Audience**

* Undergraduate EnTC / ECE students.  
* GATE / ESE / PSU aspirants in Electronics.  
* Recent graduates preparing for core hardware/electronics engineering interviews.

## **3\. Core Features & Functional Requirements**

### **3.1. Daily Circuit Challenge (The "Daily Puzzle")**

* **Concept:** Similar to Chess.com's daily puzzle. A specific circuit diagram or numerical problem is featured every 24 hours.  
* **Interaction:** Users analyze the circuit (rendered via image/SVG) and enter a calculated value (numeric input with unit tolerance, e.g., "5.0V" or "5").  
* **Mechanics:** \* Correct answer extends the user's "Daily Streak".  
  * Explanation/Solution unlocks *after* a correct submission or after 3 failed attempts.  
  * Past daily challenges are archived and accessible.

### **3.2. Topic-Wise MCQ Problem Sets**

* **Concept:** Bite-sized mock tests (e.g., 5-10 questions per set) or continuous practice modes.  
* **Filtering:** Users can filter by:  
  * Topic (Analog Electronics, Digital Logic, Signals & Systems, Control Systems, Network Theory, Electromagnetics).  
  * Difficulty (Easy, Medium, Hard, GATE-Level).  
  * Type (Interview Question, Numerical, Conceptual).  
* **Mechanics:** Instant feedback after each question or a summary screen at the end of a set. Explanations provided for every question.

### **3.3. User Dashboard & Gamification**

* **Stats Displayed:**  
  * Current Daily Streak (🔥 icon).  
  * Total questions solved.  
  * Overall Accuracy (%).  
  * Topic-wise mastery (e.g., Radar charts or progress bars for Analog vs. Digital).  
* **Recent Activity:** History of recently taken problem sets and their scores.

### **3.4. Community & Crowdsourcing (LeetCode-style)**

* **Suggest a Question:** Form for users to submit a proposed MCQ or Circuit question. Goes into a "pending approval" admin queue.  
* **Report Error:** A flag icon on every question allowing users to report issues (Wrong answer, unclear wording, missing image).

### **3.5. Monetization (Ad Placements)**

* *Requirement for LLM:* UI must include designated div containers reserved for Google AdSense / display network scripts.  
* *Placements:*  
  * Banner ad below the top navigation bar.  
  * Sidebar ad on desktop views (Dashboard & Problem set selection).  
  * Inline ad between every 5 questions in a continuous practice mode.

## **4\. Information Architecture & UI Layout (For LLM Context)**

* **/ (Home/Landing):** Hero section, call to action (Start Practicing), preview of today's Daily Circuit, login/signup.  
* **/dashboard:** User stats, active streak, recommended topics to practice.  
* **/daily:** The isolated daily circuit challenge UI.  
* **/practice:** Grid/List of topics with filters.  
* **/practice/\[topic\_id\]:** The actual MCQ player interface (Question, Options, Next Button, Report Flag).  
* **/contribute:** Form for suggesting new questions.

## **5\. Recommended Data Schema (NoSQL / Firebase)**

*LLM Instruction: Use the following schema mental model when generating frontend state or backend interactions.*

**Collection: users**

* uid (string)  
* displayName (string)  
* email (string)  
* streakCount (number)  
* lastSolvedDate (timestamp/string YYYY-MM-DD)  
* stats (object: { totalSolved: number, correctAnswers: number, topicScores: { analog: number, digital: number } })

**Collection: questions**

* id (string)  
* type (string: "mcq" | "daily\_numeric")  
* topic (string)  
* difficulty (string: "easy"| "medium" | "hard")  
* questionText (string/markdown)  
* imageUrl (string \- optional)  
* options (array of strings \- for MCQs)  
* correctAnswer (string or number)  
* explanation (string/markdown)  
* isApproved (boolean \- false if crowdsourced and pending)

**Collection: reports**

* id (string)  
* questionId (string)  
* userId (string)  
* issueType (string: "wrong\_answer", "typo", "unclear")  
* description (string)

## **6\. Technical & Non-Functional Requirements**

* **Architecture:** Single Page Application (SPA).  
* **Responsiveness:** Mobile-first design is critical. Students will likely practice on their phones during commutes. Large circuit images must be pan-able or strictly fit to width.  
* **State Management:** Needs robust state to handle the quiz flow (current question, selected option, isSubmitted) without losing data on accidental refresh.  
* **Authentication:** Email/Password and Google OAuth (essential for reducing friction).  
* **Storage:** Needs a reliable CDN or cloud storage solution for circuit diagrams and waveforms.

## **7\. Execution Guide for "Vibe-Coding" (Prompting Strategy)**

*LLM Instruction: When instructed to build this, proceed in the following phases to ensure stability.*

1. **Phase 1 (Foundation):** Scaffold the UI shell (Navbar, Sidebar/Bottom Nav), Dashboard layout, and routing. Mock the data. Include ad-placeholder divs.  
2. **Phase 2 (The Daily Puzzle):** Build the /daily route. Implement the logic for streak calculation based on system date vs. lastSolvedDate. Add numeric input validation.  
3. **Phase 3 (MCQ Engine):** Build the quiz interface. Implement filtering logic, pagination (or Next/Prev buttons), and immediate feedback UI (Green for correct, Red for wrong \+ render explanation).  
4. **Phase 4 (User Input):** Build the 'Suggest a Question' form and the 'Report Error' modal.  
5. **Phase 5 (Backend Integration):** Replace mock data with actual Firebase/Supabase queries based on the schema provided in Section 5\.