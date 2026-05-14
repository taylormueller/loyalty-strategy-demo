import React, { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COMPANY = {
  name: "Shipley Do-Nuts",
  industry: "Quick-service bakery and coffee franchise",
  annualRevenue: "$190M",
  customerCount: "1.8M active customers",
  avgOrderValue: "$11.80",
  purchaseFrequency: "7.4 per year",
  fiscalYear: "2024",
  headquarters: "Houston, Texas",
  founded: "1936",
};

const DATA = {
  firm: {
    name: "Grant Thornton",
    reportDate: "May 13, 2026",
    approach: [
      {
        stage: "Understand Your Data Environment",
        title: "Source-system readiness",
        detail: "Identify the customer, transaction, channel, store, and financial data available to support your loyalty strategy.",
        items: ["POS", "App ordering", "CRM", "ESP/SMS", "Loyalty platform", "ERP/finance", "Menu margin", "VOC", "Competitive intelligence"],
        modalTitle: "Understand Your Data Environment: Engagement Steps",
        purpose: "Establish what data exists across your stores and digital channels, where it lives, who owns it, and whether it is usable for loyalty strategy analysis.",
        steps: [
          "We interview your marketing, app ordering, store operations, franchise, finance, and IT stakeholders.",
          "We inventory POS, app ordering, CRM, ESP/SMS, loyalty platform, ERP/finance, menu margin, VOC, and competitive intelligence sources.",
          "Issue a structured information request list.",
          "Assess your source-system availability, ownership, format, refresh cadence, historical depth, and store-level consistency.",
          "Identify data readiness gaps, access constraints, and integration dependencies across franchise and corporate teams.",
          "Define the minimum viable data package required to begin your loyalty analysis.",
        ],
        outputs: ["Source-system inventory", "Data readiness scorecard", "Information request tracker", "Data gap and risk log", "Minimum viable data package definition"],
      },
      {
        stage: "Build Your Customer Intelligence Foundation",
        title: "Decision-ready customer data",
        detail: "Convert your source data into reliable customer intelligence across visits, baskets, dayparts, channels, and stores.",
        items: ["Identity resolution", "Data quality", "Customer segmentation", "Revenue concentration", "Lapse risk", "Daypart patterns", "Source lineage"],
        modalTitle: "Build Your Customer Intelligence Foundation: Engagement Steps",
        purpose: "Convert your source data into reliable, decision-ready customer intelligence that leaders can use with confidence.",
        steps: [
          "We ingest and validate transaction, customer, channel, menu item, store, catering, and margin data.",
          "We map your customer identifiers across POS, app ordering, CRM, ESP/SMS, and loyalty systems.",
          "Normalize transaction history, menu item detail, daypart, promotional history, catering orders, and channel engagement data.",
          "Create customer-level analytical tables.",
          "Build RFM segmentation, revenue concentration views, lapse logic, visit-frequency patterns, coffee attach diagnostics, and candidate sizing.",
          "Add source lineage and confidence indicators for observed, modeled, or assumption-based insights.",
          "Layer in outside-in signals such as competitor loyalty benchmarks, VOC themes, local market context, price sensitivity, and customer sentiment.",
        ],
        outputs: ["Integrated customer intelligence foundation", "Customer segmentation model", "Revenue concentration and lifecycle diagnostics", "Data quality and lineage notes", "Outside-in intelligence summary"],
      },
      {
        stage: "Translate Insight Into Loyalty Value",
        title: "Strategy and value realization",
        detail: "Turn customer intelligence into program architecture, loyalty economics, journeys, roadmap, and ongoing optimization.",
        items: ["Opportunity sizing", "Program architecture", "Engagement journeys", "Business case", "Implementation roadmap", "Test-and-learn agenda", "Quarterly optimization"],
        modalTitle: "Translate Insight Into Loyalty Value: Engagement Steps",
        purpose: "Translate your customer intelligence into program decisions, loyalty economics, and an executable roadmap.",
        steps: [
          "We interpret your loyalty opportunity by customer segment, visit behavior, daypart, channel, and economic potential.",
          "Recommend loyalty architecture: visits, points, tiered status, paid coffee club, credits, hybrid, or no-program alternative.",
          "Define earn/burn mechanics, visit thresholds, benefits, coffee attach incentives, dozen-box rewards, and engagement triggers.",
          "Build business case scenarios with enrollment, engagement, basket lift, frequency lift, lapse reduction, redemption liability, operating cost, and technology cost assumptions.",
          "Design lifecycle journeys and campaign briefs for high-priority customer segments.",
          "Create your implementation roadmap, governance model, data requirements, technology recommendation, and store/franchise enablement plan.",
          "Define test-and-learn agenda and quarterly optimization cadence.",
        ],
        outputs: ["Loyalty strategy recommendation", "Program design blueprint", "Financial business case", "Member journey architecture", "Implementation roadmap", "Quarterly optimization plan"],
      },
    ],
    principles: [
      "Loyalty is an economics problem, not a points problem.",
      "Membership growth does not equal behavior change.",
      "Customer behavior is often predictable, but difficult to shift.",
      "Inside-out data must be paired with outside-in market, competitor, and customer sentiment context.",
    ],
  },
  modules: [
    "How We Work",
    "Customer Diagnostic",
    "Program Design",
    "Business Case",
    "Member Journey",
    "Data & Roadmap",
  ],
  maturity: {
    currentScore: 56,
    executiveDemoScore: 78,
    targetScore: 72,
    band: "Strategic decision-support prototype",
    targetBand: "data-grounded AI strategy workspace",
    levers: [
      { name: "Data ingestion layer", score: "Modeled today", lift: "Next", action: "Import POS, app ordering, CRM, ESP/SMS, store master, and menu-margin files into an integrated customer intelligence foundation." },
      { name: "AI strategy copilot", score: "Guided today", lift: "Next", action: "Let your team ask questions, challenge assumptions, rewrite recommendations, and generate executive-ready rationale." },
      { name: "Evidence and confidence", score: "4/10 today", lift: "+7 pts", action: "Show metric lineage, confidence ranges, and which conclusions are modeled versus observed." },
      { name: "Action brief generation", score: "5/10 today", lift: "+6 pts", action: "Generate segment briefs, lifecycle campaign briefs, and test plans that teams can take into existing tools." },
    ],
    trustControls: [
      { label: "Source Lineage", status: "Modeled", detail: "Current demo uses Shipley-modeled QSR data; production would tag every metric to POS, app ordering, CRM, ESP/SMS, store, and finance source tables." },
      { label: "Assumption Audit", status: "Visible", detail: "Sensitivity levers expose enrollment, lapse, basket lift, and redemption assumptions so your CFO can challenge the model live." },
      { label: "Execution Readiness", status: "Next", detail: "The next build should export cohorts and journeys into front-office systems rather than stopping at recommendation." },
    ],
  },
  aiInsights: {
    "opportunity-score": { title: "Loyalty Opportunity Score", prompt: "Ask AI: What does this mean?", interpretation: "An 86/100 score indicates strong program candidacy driven by high-frequency morning routines, family weekend occasions, office dozen-box behavior, and measurable lapse risk.", recommendedAction: "Proceed to a focused loyalty design sprint; validate the visit, basket, and coffee attach drivers with your actual customer-level data first.", clientQuestion: "Which customer identifiers are most reliable across POS, app ordering, email, SMS, and loyalty records?", risk: "If store-level identity capture is inconsistent, the opportunity score may overstate how precisely the program can target high-value guests." },
    "rfm-segmentation": { title: "RFM Segmentation", prompt: "Ask AI: What should we do next?", interpretation: "Your customer base separates into clear behavioral cohorts, with Champions and Loyal guests carrying a disproportionate share of value.", recommendedAction: "Build segment-specific offers before finalizing rewards economics: coffee attach for routine guests, dozen-box benefits for family/office buyers, and save triggers for declining visitors.", clientQuestion: "Can your team activate these segments in CRM, ESP/SMS, app messaging, and in-store prompts?", risk: "Segments may look compelling analytically but fail operationally if they cannot be refreshed by store and channel." },
    "revenue-concentration": { title: "Revenue Concentration", prompt: "Ask AI: What should we do next?", interpretation: "Your top 20% of customers generate 58% of revenue, confirming that loyalty economics are concentrated in a small high-value guest cohort.", recommendedAction: "Prioritize benefits that protect and deepen this cohort before funding broad-based earn-and-burn rewards.", clientQuestion: "Can your team identify these guests consistently across store, app, catering, email, and SMS systems?", risk: "If identity resolution is weak, the program may overspend on already-loyal guests while missing high-potential cross-channel buyers." },
    "lapse-risk": { title: "Lapse Risk Distribution", prompt: "Ask AI: What risk should we watch?", interpretation: "A meaningful share of your active customers is already showing declining visit frequency or lapse behavior.", recommendedAction: "Stand up early-warning triggers before launching richer benefits, especially around 21-day and 90-day inactivity windows.", clientQuestion: "How does your team define lapse today, and does that definition differ for morning coffee, dozen-box, and catering occasions?", risk: "A single lapse threshold can misclassify healthy occasional family buyers as at-risk guests." },
    "candidate-sizing": { title: "Candidate Sizing", prompt: "Ask AI: What would change with real data?", interpretation: "The modeled candidate pool is large enough to support a structured loyalty program and meaningful addressable revenue.", recommendedAction: "Validate contactability, opt-in status, app adoption, and reachable revenue before committing to enrollment targets.", clientQuestion: "What percentage of these customers can your team reach through owned channels?", risk: "The addressable pool can shrink quickly if permissions, duplicate records, app gaps, or franchise-level data gaps are material." },
    "program-recommendation": { title: "Recommended Engagement Architecture", prompt: "Ask AI: What does this mean?", interpretation: "A hybrid visit + points program fits because your guests need simple routine-building mechanics, not only transactional discounts.", recommendedAction: "Design benefits around visit milestones, coffee attach, dozen-box occasions, birthdays, and catering prompts that stores can execute reliably.", clientQuestion: "Which benefits can your store teams explain and fulfill during the morning rush?", risk: "Overcomplicating earn rules will slow adoption and create inconsistent franchise execution." },
    "program-selector": { title: "Program Type Selector", prompt: "Ask AI: What should we do next?", interpretation: "The selector shows viable alternatives, but the strategic decision is about behavior change and loyalty economics, not feature preference.", recommendedAction: "Use the hybrid design as your base case and pressure-test one simpler points-only alternative.", clientQuestion: "Is your leadership team optimizing for visit frequency, coffee attach, catering growth, retention, or app adoption first?", risk: "Choosing a program type without a primary economic objective can create a visible program that does not materially change behavior." },
    "configuration-panel": { title: "Program Configuration Panel", prompt: "Ask AI: What should we do next?", interpretation: "Visit thresholds, coffee attach offers, and dozen-box benefits are the operating levers that translate strategy into guest behavior.", recommendedAction: "Calibrate thresholds against your real visit distribution, basket mix, and margin by menu category.", clientQuestion: "Where do natural breakpoints appear in the last 24 months of customer visits and order size?", risk: "Thresholds set too low create reward liability; thresholds set too high fail to motivate routine guests." },
    "benchmark-panel": { title: "Competitive Benchmark Panel", prompt: "Ask AI: What does this mean?", interpretation: "Peers show common mechanics, but your advantage comes from Shipley's brand affection, local store relationships, and disciplined economics.", recommendedAction: "Borrow proven app and frequency mechanics while making the value exchange feel native to donuts, coffee, family weekends, and office occasions.", clientQuestion: "Which competitor programs do your guests actually mention or compare against?", risk: "Benchmarking can lead to imitation rather than a program architecture built around your customer base." },
    "naming-identity": { title: "Program Naming & Identity", prompt: "Ask AI: What should we do next?", interpretation: "Names should signal the desired behavior and emotional promise of your loyalty program.", recommendedAction: "Test name concepts with guests and store teams after mechanics are stable, not before.", clientQuestion: "Should the program feel more like everyday convenience, local appreciation, family treats, or office hospitality?", risk: "A strong name cannot compensate for an unclear value exchange." },
    "scenario-selector": { title: "Scenario Selector", prompt: "Ask AI: What does this mean?", interpretation: "Scenario movement shows how sensitive your business case is to adoption, engagement, lapse reduction, and lift assumptions.", recommendedAction: "Use Base Case for executive alignment and Conservative Case for investment approval discipline.", clientQuestion: "Which assumption would your finance team be least comfortable underwriting today?", risk: "Optimistic assumptions can make the business case look attractive before operational readiness is proven." },
    "sensitivity-controls": { title: "Sensitivity Controls", prompt: "Ask AI: What should we do next?", interpretation: "The live levers reveal which assumptions move your value case most directly.", recommendedAction: "Turn the highest-sensitivity assumptions into pilot hypotheses with clear control groups.", clientQuestion: "What customer cohorts can support a clean test-and-control design?", risk: "Without holdouts, your team may attribute normal demand, daypart shifts, or promotion response to the loyalty program." },
    "program-pnl": { title: "Program P&L", prompt: "Ask AI: What does this mean?", interpretation: "The P&L reframes loyalty as retention economics: incremental revenue less redemption, operating, and technology costs.", recommendedAction: "Review the model with finance and align on liability treatment before launch.", clientQuestion: "How does your team currently account for credits, points, discounts, store reimbursements, or deferred rewards?", risk: "Reward liability can be underestimated if earn rates and redemption behavior are not monitored." },
    "ltv-impact": { title: "LTV Impact Chart", prompt: "Ask AI: What should we do next?", interpretation: "Member LTV lift is strongest where engagement can change visit frequency, basket composition, or retention.", recommendedAction: "Prioritize the segments where lift is plausible and measurable, not just where current value is highest.", clientQuestion: "Which cohorts have enough visit history to support reliable LTV measurement?", risk: "Modeled LTV uplift can overstate impact if member and non-member populations are not comparable." },
    "break-even": { title: "Break-Even Analysis", prompt: "Ask AI: What risk should we watch?", interpretation: "Break-even timing depends on the pace of enrollment, engagement, reward burn, and retained revenue.", recommendedAction: "Build a launch dashboard that tracks cumulative revenue impact versus liability and operating costs monthly.", clientQuestion: "What payback window is acceptable to your CFO?", risk: "A slow enrollment ramp or higher-than-expected redemption rate can push break-even beyond the investment case." },
    "summary-scorecard": { title: "3-Year Summary Scorecard", prompt: "Ask AI: What does this mean?", interpretation: "The scorecard packages your business case into the metrics executives will remember.", recommendedAction: "Use these KPIs as decision gates for pilot launch, scale-up, and quarterly optimization.", clientQuestion: "Which KPI should determine whether your program scales beyond pilot?", risk: "A single headline ROI number can hide operational constraints and data readiness gaps." },
    "activation-curve": { title: "Enrollment Activation Curve", prompt: "Ask AI: What should we do next?", interpretation: "The funnel shows that enrollment is not the finish line; activation and redemption are where behavior begins to change.", recommendedAction: "Design launch around first redemption, second visit, and app reorder behavior, not just sign-ups.", clientQuestion: "Where will your customers first hear about the program: store counter, app checkout, email, SMS, or receipt?", risk: "Strong awareness with weak onboarding creates a large inactive member base." },
    "lifecycle-map": { title: "Lifecycle Trigger Map", prompt: "Ask AI: What does this mean?", interpretation: "The trigger map translates your loyalty strategy into moments of intervention across morning routines, family boxes, and office occasions.", recommendedAction: "Prioritize enrollment, first app order, coffee attach, inactivity, and dozen-box milestone triggers for launch.", clientQuestion: "Which triggers can your current marketing platform support without manual workarounds?", risk: "Too many launch triggers can overwhelm creative, store operations, franchise teams, and measurement." },
    "liability-projection": { title: "Redemption Liability Projection", prompt: "Ask AI: What risk should we watch?", interpretation: "Outstanding reward value is a real financial obligation that grows as your program scales.", recommendedAction: "Give finance a liability dashboard that tracks outstanding points, redemption velocity, breakage, category margin, and store reimbursement.", clientQuestion: "What redemption liability threshold would require executive review?", risk: "Healthy engagement can become margin pressure if coffee and dozen-box rewards grow faster than incremental contribution." },
    "channel-frontier": { title: "Channel Efficiency Frontier", prompt: "Ask AI: What should we do next?", interpretation: "Channel engagement differs by segment, so orchestration should be selective rather than uniform.", recommendedAction: "Match channel investment to behavior: app/push for morning routines, SMS for save moments, email for office and family occasions, and in-store prompts for identity capture.", clientQuestion: "Which customer segments have reliable opt-in coverage by channel and store?", risk: "Channel gaps can bias the program toward guests who are easiest to reach, not necessarily highest potential." },
    "data-readiness": { title: "Data Readiness Requirements", prompt: "Ask AI: What should we do next?", interpretation: "The minimum viable data package determines how quickly your diagnostic can move from modeled to Shipley-specific.", recommendedAction: "Start with POS history, customer/app identity, channel engagement, store master, menu item detail, and margin data before adding optional enrichment.", clientQuestion: "Who owns each source system, and what export cadence is realistic across corporate and franchise teams?", risk: "Data access delays can become the critical path for the entire engagement." },
    "tech-stack": { title: "Technology Stack Recommendation", prompt: "Ask AI: What does this mean?", interpretation: "The right platform should fit your store model, integration needs, franchise readiness, and program complexity.", recommendedAction: "Shortlist vendors after confirming your POS/app architecture and operating model requirements.", clientQuestion: "Does your team need a new loyalty platform, or can current CRM, app, and ESP/SMS capabilities support the first release?", risk: "Selecting technology before validating requirements can create cost and implementation drag." },
    "data-ai-maturity": { title: "Customer Intelligence Activation Layer", prompt: "Ask AI: What would change with real data?", interpretation: "AI value increases when it can reason over trusted source data, lineage, and observed customer behavior.", recommendedAction: "Build AI features around recommendation explanation, segment briefs, assumption challenge, test design, and store/franchise action briefs.", clientQuestion: "Which decisions should AI support versus which require GT and your leadership team's judgment?", risk: "AI recommendations lose credibility if users cannot see the data basis and confidence level." },
    "implementation-roadmap": { title: "Implementation Roadmap", prompt: "Ask AI: What should we do next?", interpretation: "The roadmap sequences data, design, build, launch, and optimization into a manageable path for your team.", recommendedAction: "Use phase gates tied to source-system readiness, business case approval, journey build, store training, and pilot performance.", clientQuestion: "What decision needs to be made at the end of each phase?", risk: "Skipping governance and measurement design can make optimization difficult after launch." },
    "team-governance": { title: "Team & Governance", prompt: "Ask AI: What risk should we watch?", interpretation: "Loyalty requires durable ownership across marketing, data, technology, finance, operations, and franchise execution.", recommendedAction: "Assign a program owner, store operations lead, and finance controller before launch, even if some execution is partner-supported.", clientQuestion: "Who will own your loyalty economics after the initial engagement ends?", risk: "Without clear ownership, the program can become a campaign calendar rather than an operating capability." },
  },
  diagnostic: {
    opportunityScore: 86,
    verdict:
      "Your customer base shows strong loyalty program candidacy. Morning routines, family weekend occasions, office dozen-box orders, and measurable lapse behavior indicate meaningful upside from structured engagement.",
    rfm: [
      { segment: "Champions", customers: 216000, revenue: 29, aov: 18.4, frequency: 18.6, recency: 94, color: "#7C3AED", action: "Protect with coffee attach rewards, dozen-box perks, and early morning app offers" },
      { segment: "Loyal", customers: 468000, revenue: 33, aov: 13.8, frequency: 10.4, recency: 80, color: "#A78BFA", action: "Nudge toward weekday routines, family weekend boxes, and app ordering" },
      { segment: "At-Risk", customers: 395000, revenue: 18, aov: 10.9, frequency: 5.2, recency: 45, color: "#F59E0B", action: "Trigger win-back offers before the morning routine is lost" },
      { segment: "Lapsed", customers: 325000, revenue: 10, aov: 9.8, frequency: 2.1, recency: 22, color: "#E11D48", action: "Use birthday treats, limited-time flavors, and local store reminders" },
      { segment: "New", customers: 396000, revenue: 10, aov: 8.9, frequency: 3.4, recency: 86, color: "#10B981", action: "Convert first visits into app sign-ups and second-visit coffee offers" },
    ],
    deciles: [
      { decile: "Top 10%", revenue: 36, cumulative: 36 },
      { decile: "10-20%", revenue: 22, cumulative: 58 },
      { decile: "20-30%", revenue: 13, cumulative: 71 },
      { decile: "30-40%", revenue: 9, cumulative: 80 },
      { decile: "40-50%", revenue: 7, cumulative: 87 },
      { decile: "50-60%", revenue: 5, cumulative: 92 },
      { decile: "60-70%", revenue: 3, cumulative: 95 },
      { decile: "70-80%", revenue: 2, cumulative: 97 },
      { decile: "80-90%", revenue: 2, cumulative: 99 },
      { decile: "90-100%", revenue: 1, cumulative: 100 },
    ],
    risk: [
      { name: "Active & engaged", value: 38, fill: "#7C3AED" },
      { name: "Active but declining", value: 21, fill: "#A78BFA" },
      { name: "At-risk of lapsing", value: 17, fill: "#F59E0B" },
      { name: "Lapsed", value: 14, fill: "#E11D48" },
      { name: "Inactive 12+ months", value: 10, fill: "#9F1239" },
    ],
    revenueAtRisk: "$31.4M",
    candidateSizing: { percentage: "62%", customers: "1.1M", revenue: "$117.8M" },
  },
  program: {
    recommendedTypeId: "hybrid",
    recommendation: {
      type: "Hybrid Visit + Points Program",
      confidence: "Recommended with high confidence based on your customer profile",
      rationale: [
        "Champions and Loyal customers generate 62% of revenue, making routine protection more valuable than broad discounting.",
        "A $9.50 basket gap between Champions and New customers creates room for coffee attach, dozen-box, and catering incentives.",
        "Morning daypart concentration gives your stores a natural habit-building moment for app ordering and visit-based progress.",
        "At-risk and lapsed cohorts represent $31.4M in revenue at risk, best addressed with targeted save triggers before habits break.",
      ],
    },
    types: [
      { id: "points", name: "Points-Based", description: "Simple earn-and-burn tied to visits, spend, app orders, and menu attach.", bestFor: "Frequent breakfast and coffee visits.", pros: ["Easy to explain", "Strong app fit"], cons: ["Can become discount-led", "Less distinctive"], fit: "Medium", enrollmentRate: "48%", activeRate: "59%", config: { earnRate: "10 points per $1", redemptionRate: "750 points = $5", expiration: "12 months after last visit", events: ["2x points before 9am", "Bonus points on dozen-box orders"] } },
      { id: "tiered", name: "Tiered Status", description: "Visit levels unlock progressively richer benefits.", bestFor: "Habitual morning guests and office buyers.", pros: ["Clear progress path", "Protects high-frequency guests"], cons: ["Needs simple store scripting", "Requires benefit discipline"], fit: "High", enrollmentRate: "44%", activeRate: "63%", config: { tiers: [{ name: "Glazed", threshold: "0-5 visits", projection: "58%", benefits: ["Birthday treat", "App-only flavor alerts", "Coffee attach offer"] }, { name: "Dozen Club", threshold: "6-18 visits", projection: "33%", benefits: ["Free half-dozen after milestones", "Weekend family box offers", "Priority catering reminders"] }, { name: "Morning Regular", threshold: "19+ visits", projection: "9%", benefits: ["Monthly coffee reward", "Early limited-time flavor access", "Catering bonus credits"] }] } },
      { id: "paid", name: "Paid Membership", description: "Monthly or annual fee unlocks coffee and bakery benefits.", bestFor: "Highly engaged coffee routines.", pros: ["Creates commitment", "Funds richer benefits"], cons: ["Narrows audience", "Must prove value fast"], fit: "Selective", enrollmentRate: "9%", activeRate: "70%", config: { fee: "$6.99 per month", benefits: ["Weekly drip coffee", "Birthday dozen upgrade", "App-only express reorder"] } },
      { id: "cashback", name: "Cashback/Credits", description: "Members earn store credit for future visits.", bestFor: "Price-sensitive reactivation.", pros: ["Clear value", "Good save mechanic"], cons: ["Margin exposure", "Less brand-building"], fit: "Medium", enrollmentRate: "42%", activeRate: "56%", config: { creditRate: "4% back as store credit", redemptionWindow: "60 days", events: ["$2 coffee comeback", "$5 dozen-box return credit"] } },
      { id: "hybrid", name: "Hybrid", description: "Combines visit milestones, points, and targeted app offers.", bestFor: "Balancing broad participation with behavior change.", pros: ["Flexible", "Tuned to daypart behavior"], cons: ["More complex", "Needs disciplined launch messaging"], fit: "High", enrollmentRate: "52%", activeRate: "66%", config: { structure: "Visit milestones plus lightweight points", earnRate: "10 points per $1; bonus points before 9am", benefits: ["Coffee attach nudges", "Dozen-box milestones", "Catering incentives", "Birthday treats"] } },
    ],
    benchmarks: [
      { company: "Dunkin'", type: "Points and app offers", earn: "Points per dollar", differentiator: "High-frequency beverage routines", members: "18M+ est.", delta: "Compete on local bakery affection plus easier dozen-box value" },
      { company: "Krispy Kreme", type: "Points and surprise offers", earn: "Points by item category", differentiator: "Celebration and hot-light urgency", members: "5M+ est.", delta: "Use family weekend and office occasions more explicitly" },
      { company: "Starbucks", type: "App-based stars", earn: "Stars per dollar", differentiator: "Mobile ordering and stored value", members: "34M+ active US", delta: "Borrow app habit mechanics without overbuilding a wallet" },
      { company: "Dutch Bros", type: "App rewards", earn: "Points and challenges", differentiator: "Youthful beverage engagement", members: "6M+ est.", delta: "Lean into morning routine and Texas heritage" },
      { company: "Local bakery/cafe peers", type: "Punch cards", earn: "Visit stamps", differentiator: "Simplicity and neighborhood familiarity", members: "Store-level", delta: "Digitize simplicity while preserving store associate execution" },
    ],
    names: [
      { name: "Shipley Perks", rationale: "Simple, friendly, and easy for store teams to explain during the morning rush." },
      { name: "Dozens Club", rationale: "Connects directly to family weekends, office treats, and high-value box occasions." },
      { name: "Morning Run Rewards", rationale: "Positions loyalty around habit, coffee attach, and weekday routines." },
    ],
  },
  businessCase: {
    baseInputs: { eligibleCustomers: 1116000, activeCustomers: 1800000, aov: 11.8, purchaseFrequency: 7.4, annualRevenueAtRisk: 31400000, rewardRate: 0.055 },
    scenarios: {
      Conservative: { enrollmentRate: 42, engagementRate: 52, aovLift: 3, frequencyLift: 0.7, churnReduction: 6, redemptionRate: 45, operatingCost: 2.8, technologyCost: 480000 },
      "Base Case": { enrollmentRate: 52, engagementRate: 66, aovLift: 5, frequencyLift: 1.2, churnReduction: 11, redemptionRate: 55, operatingCost: 3.6, technologyCost: 620000 },
      Optimistic: { enrollmentRate: 64, engagementRate: 74, aovLift: 8, frequencyLift: 1.8, churnReduction: 16, redemptionRate: 62, operatingCost: 4.4, technologyCost: 780000 },
    },
    ltv: [
      { segment: "High Value", nonMember: 255 },
      { segment: "Mid Value", nonMember: 118 },
      { segment: "At-Risk", nonMember: 42 },
    ],
  },
  journey: {
    funnel: [
      { name: "Eligible", value: 1116000, conversion: "100%" },
      { name: "Awareness", value: 920000, conversion: "82%" },
      { name: "Enrolled", value: 580000, conversion: "63%" },
      { name: "First Redemption", value: 267000, conversion: "46%" },
      { name: "Engaged", value: 383000, conversion: "66%" },
      { name: "Advocates", value: 69000, conversion: "18%" },
    ],
    lifecycle: [
      { moment: "Enrollment", condition: "Joins program in app or store", channels: ["Email", "App"], message: "Welcome + free glazed treat", response: "43%" },
      { moment: "First app order", condition: "First digital order", channels: ["Push", "Email"], message: "Celebrate + reorder education", response: "37%" },
      { moment: "Coffee attach", condition: "Bakery order without coffee", channels: ["App", "In-store"], message: "Add coffee next visit", response: "22%" },
      { moment: "Dozen-box milestone", condition: "Two box purchases in 60 days", channels: ["Email", "SMS"], message: "Family weekend or office reward", response: "31%" },
      { moment: "Catering signal", condition: "Large order or business email", channels: ["Email", "Store"], message: "Office breakfast incentive", response: "19%" },
      { moment: "21 days quiet", condition: "No visit in 21 days", channels: ["SMS", "Push"], message: "Morning routine save offer", response: "17%" },
      { moment: "Birthday", condition: "Member milestone", channels: ["Email", "SMS"], message: "Birthday treat event", response: "34%" },
      { moment: "Lapse", condition: "90+ days quiet", channels: ["Email", "Direct mail"], message: "Local store win-back", response: "11%" },
      { moment: "Advocacy", condition: "High frequency + high NPS", channels: ["App", "Email"], message: "Refer the office", response: "15%" },
    ],
    liability: [
      { month: 0, liability: 0, redemption: 0 },
      { month: 6, liability: 380000, redemption: 140000 },
      { month: 12, liability: 920000, redemption: 470000 },
      { month: 18, liability: 1350000, redemption: 860000 },
      { month: 24, liability: 1580000, redemption: 1240000 },
      { month: 30, liability: 1660000, redemption: 1570000 },
      { month: 36, liability: 1550000, redemption: 1840000 },
    ],
    matrix: [
      { segment: "Champions", Email: 38, Push: 42, SMS: 24, "In-store": 36, App: 45, Mail: 8 },
      { segment: "Loyal", Email: 34, Push: 35, SMS: 21, "In-store": 31, App: 37, Mail: 7 },
      { segment: "At-Risk", Email: 23, Push: 18, SMS: 27, "In-store": 20, App: 18, Mail: 11 },
      { segment: "New", Email: 29, Push: 26, SMS: 16, "In-store": 28, App: 32, Mail: 5 },
    ],
  },
  dataRequirements: {
    title: "Data Requirements to Replicate This Analysis",
    subtitle:
      "To build this loyalty program strategy for Shipley Do-Nuts, here is exactly what we would need from your team - and where it typically lives in your organization.",
    opening:
      "This experience was built on realistic modeled data. To run this analysis on your actual customer base, we would work with your team to extract, map, and structure the data across your stores, digital channels, and finance systems. Most mid-market brands have 80-90% of what is needed already; the question is whether it is accessible, connected, and decision-ready.",
    sections: [
      {
        title: "Section 1 — Customer Diagnostic Data",
        powers: "RFM segmentation, revenue concentration, lapse analysis, program candidate sizing.",
        rows: [
          ["POS transaction history", "Customer- or ticket-level sales records, 24+ months", "POS / franchise reporting", "CSV / SQL export", "🟢 Usually available"],
          ["Customer/app identity", "Unique ID, contact info, opt-in/out status, app customer ID", "CRM / app / loyalty system", "CSV / API", "🟢 Usually available"],
          ["Menu item detail", "Item-level detail, category, modifiers, dozen-box and beverage flags", "POS / menu management", "CSV / SQL", "🟡 Often needs cleaning"],
          ["Daypart and store location", "Time of visit, store, region, franchise group, channel", "POS / store master", "CSV / SQL", "🟡 Often siloed"],
          ["Promotion/coupon history", "Offer codes, campaign IDs, discounts applied to tickets", "POS / marketing platform", "CSV", "🟡 Often siloed"],
        ],
      },
      {
        title: "Section 2 — Program Design Inputs",
        powers: "Program type recommendation, tier thresholds, earn/burn calibration, competitive benchmarking.",
        rows: [
          ["Menu margin data", "Gross margin by category: donuts, kolaches, beverages, dozens, catering", "ERP / finance system", "CSV", "🟡 Often restricted"],
          ["Existing program data", "Current app rewards, punch card, coupon, or local store offer history", "Internal / manual", "CSV / spreadsheet", "🟢 If program exists"],
          ["Competitive intelligence", "Dunkin', Krispy Kreme, Starbucks, Dutch Bros, and local bakery/cafe programs", "Public research / market scan", "Manual / report", "🔴 Rarely structured"],
          ["Customer preferences", "Declared preferences, daypart habits, communication preferences", "CRM / survey tool", "CSV", "🟡 Often incomplete"],
        ],
      },
      {
        title: "Section 3 — Business Case Modeling Inputs",
        powers: "Program P&L, LTV projections, break-even analysis, scenario modeling.",
        rows: [
          ["Revenue by customer cohort", "Annual sales segmented by customer vintage, store, and channel", "ERP / BI tool", "CSV / dashboard export", "🟡 Needs BI support"],
          ["Lapse rates", "Historical return behavior by customer segment and daypart", "CRM / analytics", "CSV / SQL", "🟡 Often needs definition"],
          ["Basket size by segment", "AOV, items per ticket, coffee attach, and dozen-box incidence", "POS / app ordering", "CSV / SQL", "🟢 Usually available"],
          ["Current marketing spend", "Channel-level spend data", "Finance / marketing ops", "Spreadsheet", "🟢 Usually available"],
          ["Customer acquisition cost", "CAC by channel", "Finance / marketing", "Spreadsheet", "🟡 Often estimated"],
        ],
      },
      {
        title: "Section 4 — Journey & Engagement Architecture",
        powers: "Lifecycle trigger map, channel orchestration, enrollment funnel, re-engagement flows.",
        rows: [
          ["Email engagement data", "Open rates, click rates by campaign type", "ESP (Klaviyo, Salesforce, etc.)", "CSV / API", "🟢 Usually available"],
          ["App / digital behavior", "Session data, reorder behavior, push opt-in, app ordering", "Mobile analytics / CDP", "API / CSV", "🟡 Varies by maturity"],
          ["In-store visit frequency", "Visit cadence by customer and store", "POS / loyalty card data", "CSV / SQL", "🟡 Needs ID matching"],
          ["SMS opt-in list", "Customers opted into text communications", "CRM / ESP", "CSV", "🟡 Often incomplete"],
          ["NPS / satisfaction scores", "Survey results tied to customer IDs", "Survey tool / CRM", "CSV", "🔴 Rarely at customer level"],
        ],
      },
      {
        title: "Section 5 — Technology & Implementation Readiness",
        powers: "Platform recommendation, implementation roadmap, team/governance design.",
        rows: [
          ["Current tech stack inventory", "List of active marketing/CRM/POS systems", "IT / marketing ops", "Manual", "🟢 Usually available"],
          ["API documentation", "Whether existing systems have open APIs", "IT", "Technical docs", "🟡 Varies by vendor"],
          ["Data warehouse / CDP status", "Whether a central data layer exists", "IT / data team", "Technical assessment", "🔴 Often absent in mid-market"],
          ["IT resource availability", "Internal bandwidth for integration work", "IT leadership", "Conversation", "N/A"],
          ["Budget envelope (technology)", "Rough budget for platform investment", "Finance / CFO", "Conversation", "N/A"],
        ],
      },
    ],
    summary: [
      ["Data Elements Assessed", "22"],
      ["Typically Available Day 1", "🟢 10 (45%)"],
      ["Require Extraction/Prep", "🟡 9 (41%)"],
      ["Require New Collection", "🔴 3 (14%)"],
    ],
    callout:
      "Most mid-market companies can begin a loyalty diagnostic within 2-4 weeks of engagement start. The primary effort is data extraction and normalization — not new data collection. Our team manages this process end-to-end.",
  },
  roadmap: {
    requirements: [
      { tier: "Tier 1", title: "Required", items: [{ name: "POS transaction history", source: "POS + store reporting", format: "Warehouse table", availability: "Green" }, { name: "Customer/app identity", source: "CRM/app/loyalty", format: "Customer master", availability: "Green" }, { name: "Channel interaction data", source: "ESP/SMS/app/POS", format: "Event export", availability: "Amber" }, { name: "Promotion history", source: "POS/marketing platform", format: "Offer and discount files", availability: "Amber" }] },
      { tier: "Tier 2", title: "Strongly Recommended", items: [{ name: "Store/franchise master", source: "Operations/finance", format: "Location file", availability: "Green" }, { name: "VOC/NPS", source: "Survey tool", format: "Survey export", availability: "Amber" }, { name: "Menu margin by category", source: "ERP/finance", format: "Menu item master", availability: "Amber" }, { name: "Competitive intelligence", source: "Manual research", format: "Benchmark worksheet", availability: "Red" }] },
      { tier: "Tier 3", title: "Optional", items: [{ name: "Catering history", source: "POS / catering platform", format: "Large-order export", availability: "Amber" }, { name: "Social/UGC signals", source: "Social listening", format: "Engagement export", availability: "Red" }, { name: "Local market signals", source: "Store trade areas", format: "Geo files", availability: "Amber" }, { name: "Partner data", source: "Delivery platforms", format: "Partner files", availability: "Red" }] },
    ],
    platforms: [
      { name: "Thanx", bestFor: "QSR loyalty and guest engagement", time: "12-20 weeks", cost: "$120K-$260K/year", fit: "High", recommended: true },
      { name: "Paytronix", bestFor: "Restaurant loyalty and stored value", time: "16-24 weeks", cost: "$180K-$340K/year", fit: "High" },
      { name: "Punchh", bestFor: "Franchise restaurant engagement", time: "16-28 weeks", cost: "$200K-$400K/year", fit: "High" },
      { name: "Olo Engage", bestFor: "Digital ordering and guest messaging", time: "12-22 weeks", cost: "$150K-$300K/year", fit: "Medium" },
      { name: "Toast Loyalty", bestFor: "POS-native simplicity", time: "8-14 weeks", cost: "$40K-$120K/year", fit: "Medium" },
    ],
    phases: [
      { name: "Foundation", months: "Months 1-3", width: "17%", offset: "0%", deliverables: ["Data audit", "Platform selection", "Program design", "Franchise alignment"] },
      { name: "Build", months: "Months 3-6", width: "20%", offset: "13%", deliverables: ["POS/app integration", "Data layer", "Journeys", "Store training"] },
      { name: "Launch", months: "Months 6-9", width: "20%", offset: "33%", deliverables: ["Enrollment campaign", "Comms live", "Store prompts", "Iteration"] },
      { name: "Optimize", months: "Months 9-18", width: "50%", offset: "50%", deliverables: ["A/B testing", "Offer calibration", "Daypart segmentation", "ROI measurement"] },
    ],
    governance: [
      { role: "Program Owner", owner: "Internal", fte: "0.8 FTE" },
      { role: "Data Analyst", owner: "Internal", fte: "0.5 FTE" },
      { role: "CRM/Email Manager", owner: "Internal + agency", fte: "0.7 FTE" },
      { role: "Technology Lead", owner: "Partner build / internal run", fte: "0.4 FTE" },
      { role: "Finance Controller", owner: "Internal", fte: "0.2 FTE" },
    ],
  },
};

function calculateModel(assumptions) {
  const base = DATA.businessCase.baseInputs;
  const enrolledMembers = base.eligibleCustomers * (assumptions.enrollmentRate / 100);
  const activeMembers = enrolledMembers * (assumptions.engagementRate / 100);
  const baselineRevenue = activeMembers * base.aov * base.purchaseFrequency;
  const frequencyRevenue = activeMembers * base.aov * assumptions.frequencyLift;
  const aovRevenue = baselineRevenue * (assumptions.aovLift / 100);
  const churnRevenue = base.annualRevenueAtRisk * (assumptions.churnReduction / 100);
  const totalRevenue = frequencyRevenue + aovRevenue + churnRevenue;
  const redemptionCost = totalRevenue * base.rewardRate * (assumptions.redemptionRate / 100);
  const operatingCost = enrolledMembers * assumptions.operatingCost;
  const technologyCost = assumptions.technologyCost;
  const totalCosts = redemptionCost + operatingCost + technologyCost;
  const netValue = totalRevenue - totalCosts;
  const roi = totalCosts ? (netValue / totalCosts) * 100 : 0;
  const paybackMonths = Math.min(36, Math.ceil(totalCosts / Math.max(1, netValue / 12)));
  return {
    enrolledMembers,
    activeMembers,
    frequencyRevenue,
    aovRevenue,
    churnRevenue,
    totalRevenue,
    redemptionCost,
    operatingCost,
    technologyCost,
    totalCosts,
    netValue,
    roi,
    paybackMonths,
    threeYearNetValue: netValue * 2.72,
    membersYear3: enrolledMembers * 1.22,
  };
}

const currency = (value, digits = 1) =>
  Math.abs(value) >= 1000000 ? `$${(value / 1000000).toFixed(digits)}M` : `$${Math.round(value / 1000)}K`;
const number = (value) => Math.round(value).toLocaleString();
const label = "text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#9A9A9A]";
const card = "rounded-2xl border border-[#E8E6E1] bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.06)] sm:p-6";
const sectionTitle = "text-2xl font-extrabold tracking-[-0.01em] text-[#1A1A1A] sm:text-3xl";

export default function LoyaltyStrategyInABox() {
  const [activeTab, setActiveTab] = useState(DATA.modules[0]);
  const [selectedProgramType, setSelectedProgramType] = useState(DATA.program.recommendedTypeId);
  const [activeScenario, setActiveScenario] = useState("Base Case");
  const [sliderValues, setSliderValues] = useState(DATA.businessCase.scenarios["Base Case"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);

  const model = useMemo(() => calculateModel(sliderValues), [sliderValues]);
  const selectedProgram = DATA.program.types.find((type) => type.id === selectedProgramType);

  const setScenario = (scenario) => {
    setActiveScenario(scenario);
    setSliderValues(DATA.businessCase.scenarios[scenario]);
  };

  const setSlider = (key, value) => setSliderValues((current) => ({ ...current, [key]: Number(value) }));

  return (
    <main className="min-h-screen bg-white px-4 py-4 font-['Inter'] text-[#1A1A1A] sm:px-6 sm:py-6 lg:px-8 lg:py-7">
      <style>{`@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap");`}</style>
      <section className="mx-auto max-w-[1440px]">
        <nav className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] px-4 pt-4 shadow-[0_1px_4px_rgba(0,0,0,0.06)] sm:rounded-3xl sm:px-6 sm:pt-5">
          <div className="flex flex-col gap-4 pb-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
            <div>
              <img alt="Grant Thornton" className="mb-4 h-8 w-auto" src="/grant-thornton.png" />
              <h1 className="mt-1 text-3xl font-black tracking-[-0.02em] sm:text-4xl lg:text-5xl">Loyalty Value Accelerator</h1>
              <p className="mt-2 text-sm font-semibold text-[#4B4B4B]">Configured for {COMPANY.name}</p>
              <p className="mt-2 max-w-3xl text-sm font-medium text-[#4B4B4B]">An AI-enabled strategy experience that helps your team identify loyalty opportunities, design the right program, quantify your business case, and define the path to launch.</p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto lg:gap-3">
              <button className="rounded-2xl px-5 py-3 text-sm font-extrabold text-[#7C3AED] transition hover:bg-[#F3F0FF] sm:w-auto" onClick={() => setIsDataModalOpen(true)} type="button">
                Data Requirements
              </button>
              <button className="rounded-2xl bg-[#7C3AED] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#A78BFA] sm:w-auto" onClick={() => setIsModalOpen(true)} type="button">
                Generate Executive Readout
              </button>
            </div>
          </div>
          <div className="flex gap-5 overflow-x-auto border-t border-[#E8E6E1] sm:gap-8">
            {DATA.modules.map((module) => (
              <button
                className={`relative min-h-14 whitespace-nowrap text-sm font-bold transition ${activeTab === module ? "text-[#7C3AED] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-[#7C3AED]" : "text-[#9A9A9A] hover:text-[#A78BFA]"}`}
                key={module}
                onClick={() => setActiveTab(module)}
                type="button"
              >
                {module}
              </button>
            ))}
          </div>
        </nav>

        <section className="pt-6 sm:pt-8">
          {activeTab === "How We Work" && <EngagementApproach />}
          {activeTab === "Customer Diagnostic" && <CustomerDiagnostic />}
          {activeTab === "Program Design" && <ProgramDesign selectedProgram={selectedProgram} selectedProgramType={selectedProgramType} setSelectedProgramType={setSelectedProgramType} />}
          {activeTab === "Business Case" && <BusinessCase activeScenario={activeScenario} model={model} setScenario={setScenario} setSlider={setSlider} sliderValues={sliderValues} />}
          {activeTab === "Member Journey" && <MemberJourney />}
          {activeTab === "Data & Roadmap" && <DataRoadmap />}
        </section>
      </section>

      {isModalOpen && <BusinessCaseModal model={model} onClose={() => setIsModalOpen(false)} sliderValues={sliderValues} />}
      {isDataModalOpen && <DataRequirementsModal onClose={() => setIsDataModalOpen(false)} />}
    </main>
  );
}

function ModuleHeader({ eyebrow, title, subtitle }) {
  return (
    <header className="mb-7 max-w-4xl">
      <p className={label}>{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-black tracking-[-0.02em] text-[#1A1A1A] sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base text-[#4B4B4B] sm:text-lg">{subtitle}</p>
    </header>
  );
}

function EngagementApproach() {
  const [selectedStage, setSelectedStage] = useState(null);

  return (
    <div className="space-y-6">
      <ModuleHeader eyebrow="Grant Thornton Approach" subtitle="We help your team turn customer, transaction, channel, and store-level data into a practical loyalty strategy your operators, marketers, and finance leaders can act on." title="How We Work" />
      <section className={`${card} bg-gradient-to-r from-[#F3F0FF] to-white`}>
        <h2 className="max-w-4xl text-3xl font-black tracking-[-0.02em] text-[#1A1A1A] sm:text-5xl">From Your Data Environment to Loyalty Value Realization</h2>
        <p className="mt-5 max-w-5xl text-lg leading-8 text-[#4B4B4B]">
          Grant Thornton starts by understanding your current systems, customer data, store model, and loyalty objectives. We then build an integrated customer intelligence foundation, layer in AI-enabled analysis and strategic judgment, and translate the findings into your program design, business case, roadmap, and ongoing optimization capability.
        </p>
      </section>

      <section className={card}>
        <Header labelText="Three-stage model" title="A structured path from source-system complexity to decision-ready loyalty economics" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {DATA.firm.approach.map((stage, index) => (
            <article className="cursor-pointer rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-5 transition hover:border-[#A78BFA] hover:bg-[#F3F0FF]" key={stage.stage} onDoubleClick={() => setSelectedStage(stage)}>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#7C3AED] text-sm font-extrabold text-white">{index + 1}</span>
              <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.12em] text-[#7C3AED]">{stage.stage}</p>
              <h3 className="mt-2 text-2xl font-extrabold">{stage.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#4B4B4B]">{stage.detail}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {stage.items.map((item) => (
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-[#4B4B4B]" key={item}>{item}</span>
                ))}
              </div>
              <p className="mt-5 rounded-full bg-white px-3 py-2 text-center text-xs font-extrabold text-[#7C3AED]">Double-click for engagement steps</p>
            </article>
          ))}
        </div>
      </section>

      <section className={card}>
        <Header labelText="Grant Thornton POV" title="The loyalty principles that shape the analysis" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {DATA.firm.principles.map((principle) => (
            <article className="rounded-2xl bg-[#F7F6F3] p-5" key={principle}>
              <p className="text-lg font-extrabold leading-7 text-[#1A1A1A]">{principle}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={card}>
        <Header labelText="How to read this experience" title="The remaining tabs show the outputs your team receives once the customer intelligence foundation is established" />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
          {[
            ["Customer Diagnostic", "Where your loyalty opportunity exists"],
            ["Program Design", "What loyalty architecture best fits your customer base"],
            ["Business Case", "What your loyalty economics look like"],
            ["Member Journey", "How customer behavior change is orchestrated"],
            ["Data & Roadmap", "What your team needs to operationalize the strategy"],
          ].map(([name, detail]) => (
            <div className="rounded-2xl bg-[#F7F6F3] p-4" key={name}>
              <p className="font-extrabold text-[#7C3AED]">{name}</p>
              <p className="mt-2 text-sm leading-6 text-[#4B4B4B]">{detail}</p>
            </div>
          ))}
        </div>
      </section>
      {selectedStage && <EngagementStageModal onClose={() => setSelectedStage(null)} stage={selectedStage} />}
    </div>
  );
}

function EngagementStageModal({ onClose, stage }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-auto bg-white/80 p-4 backdrop-blur-sm">
      <article className="w-full max-w-4xl rounded-3xl border border-[#E8E6E1] bg-white p-5 shadow-[0_18px_60px_rgba(0,0,0,0.16)] sm:p-8">
        <div className="flex flex-col gap-4 border-b border-[#E8E6E1] pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className={label}>Engagement Steps</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.02em] text-[#1A1A1A] sm:text-4xl">{stage.modalTitle}</h2>
          </div>
          <button className="rounded-2xl px-4 py-2 text-sm font-extrabold text-[#7C3AED] hover:bg-[#F3F0FF]" onClick={onClose} type="button">Close</button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-2xl bg-[#F7F6F3] p-5">
            <p className={label}>Purpose</p>
            <p className="mt-3 text-lg font-bold leading-8 text-[#1A1A1A]">{stage.purpose}</p>
          </section>
          <section className="rounded-2xl bg-[#F7F6F3] p-5">
            <p className={label}>Outputs</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {stage.outputs.map((output) => <span className="rounded-full bg-white px-3 py-2 text-xs font-extrabold text-[#4B4B4B]" key={output}>{output}</span>)}
            </div>
          </section>
        </div>
        <section className="mt-5 rounded-2xl bg-[#F7F6F3] p-5">
          <p className={label}>Engagement Steps</p>
          <ol className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {stage.steps.map((step, index) => (
              <li className="grid grid-cols-[32px_1fr] gap-3 rounded-2xl bg-white p-4 text-sm leading-6 text-[#4B4B4B]" key={step}>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#7C3AED] text-xs font-extrabold text-white">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>
      </article>
    </div>
  );
}

function CopilotInsights({ insights }) {
  const [activeInsight, setActiveInsight] = useState(insights[0]);

  return (
    <section className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.06)] sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className={label}>Copilot Insight</p>
          <h3 className="mt-1 text-2xl font-black tracking-[-0.02em] text-[#1A1A1A]">What this data means</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#4B4B4B]">Use these prompts as a guided readout for the data on this page.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {insights.map((insight) => (
            <button
              className={`rounded-2xl border px-4 py-2 text-sm font-extrabold transition ${activeInsight.prompt === insight.prompt ? "border-[#7C3AED] bg-[#F3F0FF] text-[#5B21B6]" : "border-[#E8E6E1] bg-white text-[#4B4B4B] hover:border-[#A78BFA]"}`}
              key={insight.prompt}
              onClick={() => setActiveInsight(insight)}
              type="button"
            >
              {insight.prompt}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5 rounded-2xl bg-white p-5">
        <p className="text-lg font-extrabold leading-8 text-[#1A1A1A]">{activeInsight.headline}</p>
        <p className="mt-3 text-sm leading-6 text-[#4B4B4B]">{activeInsight.body}</p>
      </div>
    </section>
  );
}

function AiInsightButton({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const insight = DATA.aiInsights[id];
  if (!insight) return null;

  return (
    <>
      <button className="mt-3 rounded-2xl border border-[#7C3AED] bg-white px-4 py-2 text-sm font-extrabold text-[#7C3AED] transition hover:bg-[#F3F0FF]" onClick={() => setIsOpen(true)} type="button">
        {insight.prompt}
      </button>
      {isOpen && <AiInsightModal insight={insight} onClose={() => setIsOpen(false)} />}
    </>
  );
}

function AiInsightModal({ insight, onClose }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-auto bg-white/80 p-4 backdrop-blur-sm">
      <article className="w-full max-w-3xl rounded-3xl border border-[#E8E6E1] bg-white p-5 shadow-[0_18px_60px_rgba(0,0,0,0.16)] sm:p-7">
        <div className="flex flex-col gap-4 border-b border-[#E8E6E1] pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className={label}>AI Strategy Copilot</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.02em] text-[#1A1A1A]">{insight.title}</h2>
          </div>
          <button className="rounded-2xl px-4 py-2 text-sm font-extrabold text-[#7C3AED] hover:bg-[#F3F0FF]" onClick={onClose} type="button">Close</button>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InsightBlock labelText="Interpretation" text={insight.interpretation} />
          <InsightBlock labelText="Recommended Action" text={insight.recommendedAction} />
          <InsightBlock labelText="Question for Your Team" text={insight.clientQuestion} />
          <InsightBlock labelText="Watchout" text={insight.risk} />
        </div>
      </article>
    </div>
  );
}

function InsightBlock({ labelText, text }) {
  return <section className="rounded-2xl bg-[#F7F6F3] p-4"><p className={label}>{labelText}</p><p className="mt-2 text-sm font-semibold leading-6 text-[#4B4B4B]">{text}</p></section>;
}

function CustomerDiagnostic() {
  const top20 = DATA.diagnostic.deciles[1].cumulative;
  return (
    <div className="space-y-6">
      <ModuleHeader eyebrow="Module 1" subtitle="Understanding where loyalty can create incremental visits, bigger baskets, and stronger customer retention." title="Customer Diagnostic" />
      <CopilotInsights insights={customerDiagnosticInsights(top20)} />
      <section className={`${card} grid grid-cols-1 items-center gap-6 bg-gradient-to-r from-[#F3F0FF] to-white lg:grid-cols-[0.6fr_1fr] lg:gap-8`}>
        <div>
          <p className={label}>Loyalty Opportunity Score</p>
          <p className="mt-2 text-6xl font-extrabold sm:text-8xl">{DATA.diagnostic.opportunityScore}<span className="text-xl text-[#9A9A9A] sm:text-2xl">/100</span></p>
          <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-[#EDE9FE]"><div className="h-full rounded-full bg-[#7C3AED]" style={{ width: `${DATA.diagnostic.opportunityScore}%` }} /></div>
          <AiInsightButton id="opportunity-score" />
        </div>
        <p className="text-lg leading-snug text-[#4B4B4B] sm:text-2xl">{DATA.diagnostic.verdict}</p>
      </section>
      <section className={card}>
        <Header labelText="1B. Model-Attributed RFM Segmentation" title="Where loyalty value is concentrated — and where to focus first" />
        <AiInsightButton id="rfm-segmentation" />
        <ChartBox>
          <ResponsiveContainer>
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
              <CartesianGrid stroke="#F0EEF8" />
              <XAxis dataKey="frequency" name="Visit Frequency" stroke="#9A9A9A" type="number" unit="x" />
              <YAxis dataKey="aov" name="Basket Size" stroke="#9A9A9A" type="number" unit="$" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              {DATA.diagnostic.rfm.map((point) => (
                <Scatter data={[point]} fill={point.color} key={point.segment} name={`${point.segment}: ${number(point.customers)}`} shape={(props) => <circle cx={props.cx} cy={props.cy} fill={point.color} opacity="0.82" r={10 + point.recency / 5} />} />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </ChartBox>
        <Table headers={["Segment", "Customers", "% Revenue", "Avg Basket", "Visit Frequency", "Recommended Action"]} rows={DATA.diagnostic.rfm.map((s) => [s.segment, number(s.customers), `${s.revenue}%`, `$${s.aov}`, `${s.frequency}x`, s.action])} />
      </section>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className={card}>
          <Header labelText="1C. Revenue Concentration" title="Top customers create the economic case" />
          <AiInsightButton id="revenue-concentration" />
          <ChartBox>
            <ResponsiveContainer>
              <ComposedChart data={DATA.diagnostic.deciles}>
                <CartesianGrid stroke="#F0EEF8" />
                <XAxis dataKey="decile" stroke="#9A9A9A" />
                <YAxis stroke="#9A9A9A" />
                <Tooltip />
                <Bar dataKey="revenue" fill="#DDD8F5" radius={[8, 8, 0, 0]} />
                <Line dataKey="cumulative" stroke="#7C3AED" strokeWidth={3} />
                <ReferenceLine label={`Top 20% = ${top20}%`} stroke="#7C3AED" strokeDasharray="4 4" x="10-20%" />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartBox>
          <p className="mt-4 rounded-2xl bg-[#F3F0FF] p-4 font-bold text-[#5B21B6]">Retention economics are concentrated: the top 20% generate {top20}% of revenue. The action: protect this cohort before funding broad-based rewards.</p>
        </section>
        <section className={card}>
          <Header labelText="1D. Lapse Risk Distribution" title="Revenue at risk — the avoidable leakage pool" />
          <AiInsightButton id="lapse-risk" />
          <ChartBox>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={DATA.diagnostic.risk} dataKey="value" innerRadius={70} outerRadius={112} label>
                  {DATA.diagnostic.risk.map((entry) => <Cell fill={entry.fill} key={entry.name} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartBox>
          <Kpi labelText="Estimated annual revenue at risk" value={DATA.diagnostic.revenueAtRisk} />
        </section>
      </div>
      <section className={`${card} bg-gradient-to-r from-[#F3F0FF] to-white`}>
        <p className={label}>1E. Loyalty Program Candidate Sizing</p>
        <AiInsightButton id="candidate-sizing" />
        <p className="mt-3 text-xl leading-snug text-[#4B4B4B] sm:text-3xl">Based on this analysis, <strong className="text-[#7C3AED]">{DATA.diagnostic.candidateSizing.percentage}</strong> of your active customer base - approximately <strong className="text-[#7C3AED]">{DATA.diagnostic.candidateSizing.customers}</strong> customers - represent <strong className="text-[#7C3AED]">{DATA.diagnostic.candidateSizing.revenue}</strong> in addressable annual revenue.</p>
      </section>
    </div>
  );
}

function ProgramDesign({ selectedProgram, selectedProgramType, setSelectedProgramType }) {
  return (
    <div className="space-y-6">
      <ModuleHeader eyebrow="Module 2" subtitle="Designing a loyalty architecture that fits your purchase frequency, daypart mix, store model, and guest behavior." title="Program Design" />
      <CopilotInsights insights={programDesignInsights(selectedProgram)} />
      <section className={`${card} grid grid-cols-1 gap-6 bg-gradient-to-r from-[#F3F0FF] to-white lg:grid-cols-[0.8fr_1.2fr] lg:gap-8`}>
        <div><p className={label}>2A. Recommended Engagement Architecture</p><h3 className="mt-2 text-3xl font-extrabold sm:text-4xl">{DATA.program.recommendation.type}</h3><p className="mt-4 inline-flex rounded-full bg-emerald-50 px-3 py-2 text-sm font-extrabold text-emerald-800">{DATA.program.recommendation.confidence}</p><AiInsightButton id="program-recommendation" /></div>
        <ul className="list-disc space-y-2 pl-5 text-[#4B4B4B]">{DATA.program.recommendation.rationale.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      <section className={card}>
        <Header labelText="2B. Efficiency Frontier: Program Type Selector" title="Compare alternatives without losing the recommendation" />
        <AiInsightButton id="program-selector" />
        <div className="grid grid-flow-col auto-cols-[220px] gap-4 overflow-x-auto lg:grid-flow-row lg:grid-cols-5">
          {DATA.program.types.map((type) => (
            <button className={`min-w-[220px] rounded-2xl border p-4 text-left transition ${selectedProgramType === type.id ? "border-[#7C3AED] bg-[#F3F0FF]" : "border-[#E8E6E1] bg-white hover:border-[#A78BFA]"}`} key={type.id} onClick={() => setSelectedProgramType(type.id)} type="button">
              <span className="rounded-full bg-[#EDE9FE] px-2 py-1 text-xs font-extrabold text-[#5B21B6]">{type.fit} fit</span>
              <strong className="mt-4 block text-xl">{type.name}</strong>
              <p className="mt-2 text-sm text-[#4B4B4B]">{type.description}</p>
              <p className="mt-3 text-xs font-bold text-[#1A1A1A]">Best for: {type.bestFor}</p>
              <div className="mt-4 grid gap-2 text-xs text-[#4B4B4B]"><p><b>Pros:</b> {type.pros.join(", ")}</p><p><b>Cons:</b> {type.cons.join(", ")}</p></div>
            </button>
          ))}
        </div>
      </section>
      <section className={card}>
        <Header labelText="2C. Operating Model Configuration" title={`${selectedProgram.name} mechanics — the rules your guests and store teams can actually use`} />
        <AiInsightButton id="configuration-panel" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {selectedProgram.config.tiers ? selectedProgram.config.tiers.map((tier) => <ConfigCard key={tier.name} title={tier.name} value={tier.threshold} lines={[`${tier.projection} projected distribution`, ...tier.benefits]} />) : Object.entries(selectedProgram.config).map(([key, value]) => <ConfigCard key={key} title={key} value={Array.isArray(value) ? value.join(", ") : value} />)}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"><Kpi labelText="Projected enrollment rate" value={selectedProgram.enrollmentRate} /><Kpi labelText="Expected active member rate" value={selectedProgram.activeRate} /></div>
      </section>
      <section className={card}><Header labelText="2D. Competitive Benchmark Panel" title="How peers are playing loyalty — and where not to over-copy them" /><AiInsightButton id="benchmark-panel" /><Table headers={["Company", "Type", "Earn Rate", "Differentiator", "Members", "Delta"]} rows={DATA.program.benchmarks.map((b) => [b.company, b.type, b.earn, b.differentiator, b.members, b.delta])} /></section>
      <section className={card}><Header labelText="2E. Program Naming & Identity Suggestion" title="Brand-right names to explore" /><AiInsightButton id="naming-identity" /><div className="grid grid-cols-1 gap-4 md:grid-cols-3">{DATA.program.names.map((n) => <div className="rounded-2xl bg-[#F7F6F3] p-5" key={n.name}><strong className="text-xl text-[#7C3AED]">{n.name}</strong><p className="mt-2 text-sm text-[#4B4B4B]">{n.rationale}</p></div>)}</div></section>
    </div>
  );
}

function BusinessCase({ activeScenario, model, setScenario, setSlider, sliderValues }) {
  const breakEvenData = useMemo(() => makeBreakEvenData(model), [model]);
  const ltvData = useMemo(() => DATA.businessCase.ltv.map((item) => ({ ...item, member: Math.round(item.nonMember * (1 + sliderValues.aovLift / 100 + sliderValues.frequencyLift / DATA.businessCase.baseInputs.purchaseFrequency)) })), [sliderValues]);
  return (
    <div className="space-y-6">
      <ModuleHeader eyebrow="Module 3" subtitle="Quantifying the financial return from increased visits, higher coffee attach, retained customers, and controlled reward liability." title="Business Case" />
      <CopilotInsights insights={businessCaseInsights(model, sliderValues)} />
      <section className={card}>
        <Header labelText="3A. Scenario Selector" title="Choose the financial posture — conservative, base, or upside case" />
        <AiInsightButton id="scenario-selector" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">{Object.keys(DATA.businessCase.scenarios).map((scenario) => <button className={`rounded-2xl border p-4 text-left ${activeScenario === scenario ? "border-[#7C3AED] bg-[#F3F0FF]" : "border-[#E8E6E1]"}`} key={scenario} onClick={() => setScenario(scenario)} type="button"><strong>{scenario}</strong><p className="mt-1 text-sm text-[#9A9A9A]">{DATA.businessCase.scenarios[scenario].enrollmentRate}% enrollment</p></button>)}</div>
      </section>
      <section className={card}>
        <Header labelText="3B. Sensitivity Controls" title="Model inputs — the levers your CFO will care about" />
        <AiInsightButton id="sensitivity-controls" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{assumptionTiles(sliderValues).map((item) => <Kpi key={item.labelText} {...item} />)}</div>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">{[["enrollmentRate", "Enrollment Rate", 25, 65], ["churnReduction", "Lapse Reduction", 3, 25], ["aovLift", "Basket Lift", 1, 18], ["redemptionRate", "Redemption Rate", 25, 70]].map(([key, name, min, max]) => <Slider key={key} labelText={name} max={max} min={min} onChange={(value) => setSlider(key, value)} value={sliderValues[key]} />)}</div>
      </section>
      <section className={card}>
        <Header labelText="3B. Model Trust Layer" title="Assumption lineage — what the model knows, estimates, and needs to prove" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {DATA.maturity.trustControls.map((control) => (
            <article className="rounded-2xl bg-[#F7F6F3] p-5" key={control.label}>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-[#7C3AED]">{control.status}</span>
              <h4 className="mt-4 text-xl font-extrabold">{control.label}</h4>
              <p className="mt-2 text-sm leading-6 text-[#4B4B4B]">{control.detail}</p>
            </article>
          ))}
        </div>
      </section>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]"><Pnl insightId="program-pnl" model={model} /><Scorecard insightId="summary-scorecard" model={model} /></div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className={card}><Header labelText="3D. Model-Attributed LTV Impact" title="Member economics by segment — the incremental lift case" /><AiInsightButton id="ltv-impact" /><ChartBox><ResponsiveContainer><BarChart data={ltvData}><CartesianGrid stroke="#F0EEF8" /><XAxis dataKey="segment" /><YAxis /><Tooltip /><Legend /><Bar dataKey="nonMember" fill="#DDD8F5" name="Non-member" radius={[8, 8, 0, 0]} /><Bar dataKey="member" fill="#7C3AED" name="Member" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer></ChartBox></section>
        <section className={card}><Header labelText="3E. Break-Even Analysis" title="Cumulative value curve — when the investment clears the hurdle" /><AiInsightButton id="break-even" /><ChartBox><ResponsiveContainer><LineChart data={breakEvenData}><CartesianGrid stroke="#F0EEF8" /><XAxis dataKey="month" /><YAxis tickFormatter={(v) => currency(v, 0)} /><Tooltip formatter={(v) => currency(v)} /><ReferenceArea fill="#F3F0FF" x1={model.paybackMonths} x2={36} /><ReferenceLine label={`Break-even month ${model.paybackMonths}`} stroke="#7C3AED" strokeDasharray="4 4" x={model.paybackMonths} /><Line dataKey="revenue" stroke="#7C3AED" strokeWidth={3} /><Line dataKey="cost" stroke="#A78BFA" strokeWidth={3} /></LineChart></ResponsiveContainer></ChartBox></section>
      </div>
    </div>
  );
}

function MemberJourney() {
  return (
    <div className="space-y-6">
      <ModuleHeader eyebrow="Module 4" subtitle="Orchestrating your loyalty experience across app, email, SMS, in-store prompts, and high-frequency morning routines." title="Member Journey" />
      <CopilotInsights insights={memberJourneyInsights()} />
      <section className={card}>
        <Header labelText="4A. Enrollment Activation Curve" title="From eligible audience to advocates — the activation curve" />
        <AiInsightButton id="activation-curve" />
        <ActivationCurve />
        <p className="mt-4 rounded-2xl bg-[#F3F0FF] p-4 font-bold text-[#5B21B6]">Biggest drop-off risk: awareness to enrollment. The action: make store prompts, app onboarding, and post-purchase flows unavoidable at launch.</p>
      </section>
      <section className={card}><Header labelText="4B. Lifecycle Trigger Map" title="Engagement architecture — the next best action at each moment" /><AiInsightButton id="lifecycle-map" /><div className="flex gap-4 overflow-x-auto">{DATA.journey.lifecycle.map((m, i) => <div className="min-w-[220px] rounded-2xl border border-[#E8E6E1] bg-white p-4" key={m.moment}><span className="grid h-9 w-9 place-items-center rounded-full bg-[#7C3AED] text-sm font-extrabold text-white">{i + 1}</span><h4 className="mt-3 font-extrabold">{m.moment}</h4><p className="mt-2 text-sm text-[#4B4B4B]">{m.condition}</p><p className="mt-3 text-xs font-bold text-[#7C3AED]">{m.channels.join(" / ")}</p><p className="mt-2 text-sm font-bold">{m.message}</p><p className="mt-1 text-sm text-[#9A9A9A]">{m.response} response</p></div>)}</div></section>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className={card}><Header labelText="4C. Redemption Liability Projection" title="Reward balance under control — accounting exposure stays bounded" /><AiInsightButton id="liability-projection" /><ChartBox><ResponsiveContainer><LineChart data={DATA.journey.liability}><CartesianGrid stroke="#F0EEF8" /><XAxis dataKey="month" /><YAxis tickFormatter={(v) => currency(v, 1)} /><Tooltip formatter={(v) => currency(v)} /><Line dataKey="liability" stroke="#7C3AED" strokeWidth={3} /><Line dataKey="redemption" stroke="#A78BFA" strokeWidth={3} /></LineChart></ResponsiveContainer></ChartBox><p className="mt-4 rounded-2xl bg-[#F3F0FF] p-4 font-bold text-[#5B21B6]">Peak redemption liability of $1.66M is expected at month 30. The implication: the rewards balance is material, but not a balance-sheet surprise.</p></section>
        <section className={card}><Header labelText="4D. Channel Efficiency Frontier" title="Where to invest in channels — not every touchpoint deserves equal funding" /><AiInsightButton id="channel-frontier" /><div className="overflow-x-auto"><div className="grid min-w-[680px] grid-cols-7 gap-2 text-sm"><span />{["Email", "Push", "SMS", "In-store", "App", "Mail"].map((c) => <b className="text-xs text-[#9A9A9A]" key={c}>{c}</b>)}{DATA.journey.matrix.map((row) => <React.Fragment key={row.segment}><b>{row.segment}</b>{["Email", "Push", "SMS", "In-store", "App", "Mail"].map((c) => <span className={`rounded-xl p-3 text-center font-extrabold ${row[c] > 30 ? "bg-[#7C3AED] text-white" : row[c] > 20 ? "bg-[#A78BFA] text-white" : "bg-[#F3F0FF] text-[#4B4B4B]"}`} key={c}>{row[c]}%</span>)}</React.Fragment>)}</div></div></section>
      </div>
    </div>
  );
}

function ActivationCurve() {
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">
      <ChartBox>
        <ResponsiveContainer>
          <BarChart data={DATA.journey.funnel} layout="vertical" margin={{ top: 8, right: 34, bottom: 8, left: 34 }}>
            <CartesianGrid horizontal={false} stroke="#F0EEF8" />
            <XAxis tickFormatter={(value) => `${Math.round(value / 1000)}K`} type="number" />
            <YAxis dataKey="name" tick={{ fill: "#4B4B4B", fontSize: 12, fontWeight: 700 }} type="category" width={116} />
            <Tooltip formatter={(value) => number(value)} />
            <Bar dataKey="value" fill="#7C3AED" name="Projected customers" radius={[0, 10, 10, 0]}>
              {DATA.journey.funnel.map((stage, index) => (
                <Cell fill={index < 2 ? "#7C3AED" : index < 4 ? "#A78BFA" : "#C4B5FD"} key={stage.name} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartBox>
      <div className="grid gap-2">
        {DATA.journey.funnel.map((stage, index) => (
          <div className={`rounded-2xl border p-3 ${index === 1 ? "border-[#7C3AED] bg-[#F3F0FF]" : "border-[#E8E6E1] bg-[#F7F6F3]"}`} key={stage.name}>
            <div className="flex items-center justify-between gap-3">
              <b className="text-sm">{stage.name}</b>
              <span className="text-xs font-extrabold text-[#7C3AED]">{stage.conversion}</span>
            </div>
            <p className="mt-1 text-sm text-[#4B4B4B]">{number(stage.value)} projected customers</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DataRoadmap() {
  return (
    <div className="space-y-6">
      <ModuleHeader eyebrow="Module 5" subtitle="Defining the data, technology, governance, and launch path required to make your program real." title="Data & Roadmap" />
      <CopilotInsights insights={dataRoadmapInsights()} />
      <section className={card}><Header labelText="5A. Data Readiness Requirements" title="The minimum viable data spine — what we need before strategy becomes executable" /><AiInsightButton id="data-readiness" /><div className="grid grid-cols-1 gap-4 lg:grid-cols-3">{DATA.roadmap.requirements.map((tier) => <div className="rounded-2xl bg-[#F7F6F3] p-5" key={tier.tier}><p className={label}>{tier.tier}</p><h4 className="mt-2 text-xl font-extrabold">{tier.title}</h4><div className="mt-4 space-y-3">{tier.items.map((item) => <div className="rounded-xl bg-white p-3" key={item.name}><b>{item.name}</b><p className="text-xs text-[#4B4B4B]">{item.source} | {item.format}</p><span className={`mt-2 inline-flex rounded-full px-2 py-1 text-xs font-extrabold ${item.availability === "Green" ? "bg-emerald-50 text-emerald-800" : item.availability === "Amber" ? "bg-amber-50 text-amber-800" : "bg-rose-50 text-rose-800"}`}>{item.availability}</span></div>)}</div></div>)}</div></section>
      <section className={card}><Header labelText="5B. Technology Stack Recommendation" title="Platform fit — the fastest path without overbuying enterprise complexity" /><AiInsightButton id="tech-stack" /><div className="grid grid-flow-col auto-cols-[220px] gap-4 overflow-x-auto lg:grid-flow-row lg:grid-cols-5">{DATA.roadmap.platforms.map((p) => <div className={`rounded-2xl border p-4 ${p.recommended ? "border-[#7C3AED] bg-[#F3F0FF]" : "border-[#E8E6E1] bg-white"}`} key={p.name}><span className="rounded-full bg-[#EDE9FE] px-2 py-1 text-xs font-extrabold text-[#5B21B6]">{p.recommended ? "Best Fit" : `${p.fit} fit`}</span><h4 className="mt-4 text-xl font-extrabold">{p.name}</h4><p className="mt-2 text-sm text-[#4B4B4B]">{p.bestFor}</p><p className="mt-4 text-sm font-bold">{p.time}</p><p className="text-sm text-[#4B4B4B]">{p.cost}</p></div>)}</div></section>
      <section className={card}>
        <Header labelText="5C. Customer Intelligence Activation Layer" title="From modeled strategy to data-grounded recommendations" />
        <AiInsightButton id="data-ai-maturity" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {DATA.maturity.levers.map((lever) => (
            <article className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-5" key={lever.name}>
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-[#7C3AED]">{lever.score}</span>
                <b className="text-sm text-[#065F46]">{lever.lift}</b>
              </div>
              <h4 className="mt-4 text-xl font-extrabold">{lever.name}</h4>
              <p className="mt-2 text-sm leading-6 text-[#4B4B4B]">{lever.action}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={card}><Header labelText="5D. Implementation Roadmap" title="Execution path — from diagnostic to in-market learning loop" /><AiInsightButton id="implementation-roadmap" /><div className="space-y-4">{DATA.roadmap.phases.map((phase) => <div className="grid grid-cols-1 gap-4 rounded-2xl bg-[#F7F6F3] p-4 lg:grid-cols-[160px_1fr_320px] lg:items-center lg:gap-5" key={phase.name}><div><b>{phase.name}</b><p className="text-sm text-[#4B4B4B]">{phase.months}</p></div><div className="relative h-5 rounded-full bg-white"><span className="absolute top-1 h-3 rounded-full bg-[#7C3AED]" style={{ left: phase.offset, width: phase.width }} /></div><ul className="list-disc pl-5 text-sm text-[#4B4B4B]">{phase.deliverables.map((d) => <li key={d}>{d}</li>)}</ul></div>)}</div></section>
      <section className={card}><Header labelText="5E. Team & Governance" title="Operating model — who owns the economics after launch" /><AiInsightButton id="team-governance" /><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">{DATA.roadmap.governance.map((g) => <div className="rounded-2xl bg-[#F7F6F3] p-5" key={g.role}><h4 className="font-extrabold">{g.role}</h4><p className="mt-3 text-sm text-[#4B4B4B]">{g.owner}</p><p className="mt-2 text-xl font-extrabold text-[#7C3AED]">{g.fte}</p></div>)}</div></section>
    </div>
  );
}

function DataRequirementsModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-white">
      <div className="sticky top-0 z-10 flex flex-col gap-4 border-b border-[#E8E6E1] bg-white/95 px-4 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <div>
          <b>{COMPANY.name}</b>
          <p className={label}>Data Readiness Diligence | For Discussion Purposes Only</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto lg:gap-3">
          <button className="rounded-2xl border border-[#7C3AED] px-4 py-2 font-extrabold text-[#7C3AED] hover:bg-[#F3F0FF]" onClick={() => window.print()} type="button">
            Download Data Checklist
          </button>
          <button className="rounded-2xl bg-[#7C3AED] px-4 py-2 font-extrabold text-white hover:bg-[#A78BFA]" onClick={onClose} type="button">
            Close
          </button>
        </div>
      </div>
      <article className="mx-auto max-w-[1180px] space-y-8 px-4 py-8 sm:space-y-10 sm:px-8 sm:py-12">
        <header className="border-b border-[#E8E6E1] pb-10">
          <p className={label}>Replication Requirements</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-none tracking-[-0.02em] sm:text-5xl">{DATA.dataRequirements.title}</h2>
          <p className="mt-5 max-w-4xl text-lg font-semibold leading-7 text-[#4B4B4B]">
            {DATA.dataRequirements.subtitle}
          </p>
          <p className="mt-6 max-w-4xl rounded-2xl bg-[#F7F6F3] p-5 text-base leading-7 text-[#4B4B4B]">{DATA.dataRequirements.opening}</p>
        </header>

        {DATA.dataRequirements.sections.map((section) => (
          <section className="border-b border-[#E8E6E1] pb-10" key={section.title}>
            <p className={label}>What it powers: {section.powers}</p>
            <h3 className="mt-2 text-2xl font-black tracking-[-0.02em] text-[#1A1A1A] sm:text-3xl">{section.title}</h3>
            <DataRequirementsTable rows={section.rows} />
          </section>
        ))}

        <section className="space-y-5 pb-4">
          <div>
            <p className={label}>Readiness Assessment Summary</p>
            <h3 className="mt-2 text-2xl font-black tracking-[-0.02em] text-[#1A1A1A] sm:text-3xl">The work is mostly extraction, not invention</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {DATA.dataRequirements.summary.map(([name, value]) => (
              <Kpi key={name} labelText={name} value={value} />
            ))}
          </div>
          <div className="rounded-2xl bg-[#F3F0FF] p-6 text-lg font-bold leading-8 text-[#5B21B6]">
            <span className="block text-sm uppercase tracking-widest text-[#7C3AED]">Partner readout</span>
            {DATA.dataRequirements.callout}
          </div>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button className="rounded-2xl border border-[#7C3AED] px-5 py-3 font-extrabold text-[#7C3AED] hover:bg-[#F3F0FF]" onClick={() => window.print()} type="button">
              Download Data Checklist
            </button>
            <button className="rounded-2xl bg-[#7C3AED] px-5 py-3 font-extrabold text-white hover:bg-[#A78BFA]" onClick={onClose} type="button">
              Close
            </button>
          </div>
        </section>
      </article>
    </div>
  );
}

function DataRequirementsTable({ rows }) {
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[980px] text-left text-sm">
        <thead>
          <tr>
            {["Data Element", "Description", "Source System", "Typical Format", "Availability"].map((header) => (
              <th className="border-b border-[#E8E6E1] px-3 py-3 text-xs uppercase tracking-widest text-[#9A9A9A]" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")}>
              {row.map((cell, index) => (
                <td className={`border-b border-[#F0EEE9] px-3 py-4 align-top ${index === 0 ? "font-extrabold text-[#1A1A1A]" : "text-[#4B4B4B]"}`} key={`${cell}-${index}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BusinessCaseModal({ model, onClose }) {
  const tierOne = DATA.roadmap.requirements[0].items;
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-white">
      <div className="sticky top-0 z-10 flex flex-col gap-4 border-b border-[#E8E6E1] bg-white/95 px-4 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div><b>{COMPANY.name}</b><p className={label}>For Discussion Purposes Only</p></div>
        <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto lg:gap-3"><button className="rounded-2xl border border-[#7C3AED] px-4 py-2 font-extrabold text-[#7C3AED]" onClick={() => window.print()} type="button">Download Readout</button><button className="rounded-2xl px-4 py-2 font-extrabold text-[#7C3AED] hover:bg-[#F3F0FF]" onClick={onClose} type="button">Close</button></div>
      </div>
      <article className="mx-auto max-w-[1120px] space-y-8 px-4 py-8 sm:space-y-10 sm:px-8 sm:py-12">
        <header className="border-b border-[#E8E6E1] pb-10"><p className={label}>Executive Readout</p><h2 className="mt-3 max-w-3xl text-4xl font-black leading-none tracking-[-0.02em] sm:text-6xl">Loyalty Value Executive Readout</h2><p className="mt-5 font-bold text-[#4B4B4B]">{COMPANY.name} | Prepared by {DATA.firm.name} | {DATA.firm.reportDate}</p><p className="mt-4 max-w-3xl text-sm leading-6 text-[#4B4B4B]">A packaged leadership summary generated from the current Business Case model assumptions, scenario outputs, and recommendation state.</p></header>
        <ReportSection title="Executive Summary"><p>{COMPANY.name} shows strong program candidacy: revenue is concentrated, lapse risk is measurable, and your customer data contains enough behavioral signal to support a structured engagement architecture. Your team does not need a generic rewards layer; you need a targeted system for protecting high-frequency guests, increasing coffee attach, growing dozen-box occasions, and improving app engagement. We recommend a hybrid visit + points program. The current model attributes {currency(model.netValue)} in annual net value, {Math.round(model.roi)}% ROI, and payback by month {model.paybackMonths}.</p></ReportSection>
        <ReportSection title="The Opportunity"><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"><Kpi labelText="Revenue Concentration" value="58%" /><Kpi labelText="Lapse Risk" value={DATA.diagnostic.revenueAtRisk} /><Kpi labelText="Candidates" value={DATA.diagnostic.candidateSizing.customers} /><Kpi labelText="Addressable Revenue" value={DATA.diagnostic.candidateSizing.revenue} /></div></ReportSection>
        <ReportSection title="Our Recommendation"><p className="text-2xl font-extrabold text-[#7C3AED]">{DATA.program.recommendation.type}</p><p className="mt-2 font-bold text-[#4B4B4B]">The strategic logic: use simple visit mechanics, coffee attach, and dozen-box rewards to shift behavior without buying transactions that would have happened anyway.</p><ul className="mt-4 list-disc space-y-2 pl-5">{DATA.program.recommendation.rationale.slice(0, 3).map((r) => <li key={r}>{r}</li>)}</ul></ReportSection>
        <ReportSection title="Financial Model - Base Case"><Pnl model={model} compact /><Scorecard model={model} /></ReportSection>
        <ReportSection title="What We Need From You"><div className="space-y-3">{tierOne.map((item) => <label className="flex gap-3 rounded-2xl bg-[#F7F6F3] p-4" key={item.name}><input checked readOnly type="checkbox" /><span><b>{item.name}</b><br /><span className="text-sm text-[#4B4B4B]">{item.source} | {item.format}</span></span></label>)}</div></ReportSection>
        <ReportSection title="Recommended Next Steps"><ol className="grid grid-cols-1 gap-4 md:grid-cols-3"><NextStep numberText="1" text="Data readiness assessment" time="2 weeks" /><NextStep numberText="2" text="Platform RFP and vendor selection" time="4-6 weeks" /><NextStep numberText="3" text="Pilot program design and launch" time="3 months" /></ol></ReportSection>
      </article>
    </div>
  );
}

function Header({ labelText, title }) {
  return <div className="mb-5"><p className={label}>{labelText}</p><h3 className={`${sectionTitle} mt-1`}>{title}</h3></div>;
}

function ChartBox({ children }) {
  return <div className="h-[280px] rounded-2xl bg-[#F7F6F3] p-3 sm:h-[330px] sm:p-4">{children}</div>;
}

function Table({ headers, rows }) {
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead><tr>{headers.map((h) => <th className="border-b border-[#E8E6E1] px-3 py-3 text-xs uppercase tracking-widest text-[#9A9A9A]" key={h}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((row) => <tr key={row.join("|")}>{row.map((cell, i) => <td className={`border-b border-[#F0EEE9] px-3 py-4 ${i === 0 ? "font-extrabold text-[#1A1A1A]" : "text-[#4B4B4B]"}`} key={`${cell}-${i}`}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function Kpi({ labelText, value }) {
  return <div className="rounded-2xl border border-[#E8E6E1] bg-[#F7F6F3] p-4 sm:p-5"><p className={label}>{labelText}</p><strong className="mt-2 block text-3xl font-extrabold text-[#7C3AED] sm:text-4xl">{value}</strong></div>;
}

function ConfigCard({ title, value, lines = [] }) {
  return <article className="rounded-2xl bg-[#F7F6F3] p-5"><p className={label}>{title}</p><h4 className="mt-2 text-2xl font-extrabold">{value}</h4>{lines.length > 0 && <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[#4B4B4B]">{lines.map((line) => <li key={line}>{line}</li>)}</ul>}</article>;
}

function Slider({ labelText, value, min, max, onChange }) {
  return <label className="rounded-2xl bg-[#F7F6F3] p-4 sm:p-5"><span className="flex justify-between gap-3 text-xs font-extrabold uppercase tracking-widest text-[#9A9A9A]">{labelText}<b className="text-[#7C3AED]">{value}%</b></span><input className="mt-4 w-full accent-[#7C3AED]" max={max} min={min} onChange={(e) => onChange(e.target.value)} type="range" value={value} /></label>;
}

function customerDiagnosticInsights(top20) {
  return [
    {
      prompt: "Where is the opportunity?",
      headline: "Your loyalty case is concentrated in repeat guests, not the full file.",
      body: `The top 20% of customers generate ${top20}% of revenue, which matches Grant Thornton's view that loyalty should increase return on acquisition by protecting and growing the best customers first. In practical terms: do not spend evenly across all guests; fund the cohorts where visit frequency, coffee attach, and dozen-box behavior can move the economics.`,
    },
    {
      prompt: "What is the risk?",
      headline: "The avoidable leakage pool is large enough to matter to the P&L.",
      body: `${DATA.diagnostic.revenueAtRisk} in annual revenue is sitting in at-risk and lapsed behavior. The strategic move is not a generic win-back blast; it is earlier intervention before the morning routine, family weekend occasion, or office box habit shifts elsewhere.`,
    },
    {
      prompt: "What should we prove next?",
      headline: "Validate whether the candidate pool is reachable, not just valuable.",
      body: `${DATA.diagnostic.candidateSizing.customers} customers look behaviorally ready for a structured program. The next proof point is whether your team can change observed behavior: contactability, email/SMS opt-in, app adoption, store associate capture, and response to visit-progress messaging.`,
    },
  ];
}

function programDesignInsights(selectedProgram) {
  return [
    {
      prompt: "Why this design?",
      headline: `${selectedProgram.name} is the strongest fit because your guests need simple motivation, not more coupons.`,
      body: "The diagnostic shows a meaningful gap between high-value routine guests and lower-frequency customers. GT's loyalty lens is to shift visits, basket composition, and share of morning routine without over-relying on incentives. A hybrid design gives Shipley simple progress, coffee attach nudges, and dozen-box rewards without training guests to wait for discounts.",
    },
    {
      prompt: "What could go wrong?",
      headline: "The main design risk is complexity at launch.",
      body: "A loyalty architecture only works if customers and store teams can explain it in one breath. The first version should keep visit thresholds, benefits, and earning rules simple enough to support in-store, app, email, SMS, and post-purchase onboarding. Membership growth alone is not the goal; behavior change is.",
    },
    {
      prompt: "What would AI improve?",
      headline: "AI should help tune thresholds and benefits by segment.",
      body: "Once your real data is ingested, the copilot can pressure-test which benefits move which cohorts, identify customers near a visit milestone, and suggest campaign briefs for guests most likely to change behavior.",
    },
  ];
}

function businessCaseInsights(model, sliderValues) {
  return [
    {
      prompt: "What drives ROI?",
      headline: "The model is most sensitive to quality of engagement, not enrollment volume alone.",
      body: `${sliderValues.enrollmentRate}% enrollment is valuable only if members stay active and change behavior. The current case attributes ${currency(model.netValue)} in annual net value, but the executive conversation should focus on incrementality: lapse reduction, basket lift, visit lift, coffee attach, and active member rate.`,
    },
    {
      prompt: "What should CFO challenge?",
      headline: "Pressure-test the lift assumptions before debating program polish.",
      body: `Basket lift at +${sliderValues.aovLift}% and lapse reduction at -${sliderValues.churnReduction}% are the economic spine of the case. The right next step is a holdout design that separates modeled incremental lift from visits and revenue that would have happened anyway.`,
    },
    {
      prompt: "Is liability controlled?",
      headline: "Redemption liability is manageable if earn and burn stay tied to margin discipline.",
      body: `A ${sliderValues.redemptionRate}% redemption rate signals healthy engagement, but it also needs finance ownership. GT's POV is that rewards economics need as much attention as campaign performance: outstanding points, breakage, store reimbursement, and margin by menu category should be visible from day one.`,
    },
  ];
}

function memberJourneyInsights() {
  return [
    {
      prompt: "Where does the journey break?",
      headline: "The biggest risk is the handoff from awareness to enrollment.",
      body: "Customers may like the idea of rewards but fail to join unless the ask appears in the store conversation, app flow, receipt, and post-purchase email. The launch plan should over-invest in the first 30 days of onboarding.",
    },
    {
      prompt: "Which triggers matter most?",
      headline: "Visit progress and inactivity triggers are the highest-value moments.",
      body: "Progress moments create motivation when customers are already engaged. Inactivity moments protect revenue before a guest becomes expensive to win back. Those two trigger families should be built before nice-to-have celebration messages.",
    },
    {
      prompt: "How should channels be used?",
      headline: "Channel choice should follow intent, not internal preference.",
      body: "Email is strong for education and office/family occasions, push is better for morning routine nudges, SMS should be reserved for high-urgency save moments, and in-store prompts matter most when identity capture is incomplete. This is where inside-out behavior data should meet outside-in customer preference signals.",
    },
  ];
}

function dataRoadmapInsights() {
  return [
    {
      prompt: "What data matters first?",
      headline: "POS history and customer identity are the spine of the analysis.",
      body: "Before adding richer signals, your team needs customer-level POS/app transactions, menu item detail, store location, daypart, and a reliable customer ID. This is the source-system readiness foundation: without it, segmentation, lapse analysis, and program economics become attractive but fragile.",
    },
    {
      prompt: "Where does AI help?",
      headline: "AI is most useful after the data is mapped, not before.",
      body: "The copilot should interpret patterns, explain tradeoffs, draft recommendations, and generate segment or store action briefs. It should not obscure data readiness gaps. Clean ingestion gives the customer intelligence foundation something trustworthy to reason over.",
    },
    {
      prompt: "What is the first build?",
      headline: "Start with file-based ingestion and evidence labels.",
      body: "The practical next version should let your team upload POS, app ordering, CRM, ESP/SMS, store master, menu item, and margin exports, map fields into an integrated data layer, and label every insight as observed, modeled, or partner judgment.",
    },
  ];
}

function assumptionTiles(a) {
  return [
    { labelText: "Program Enrollment Rate", value: `${a.enrollmentRate}%` },
    { labelText: "Active Engagement Rate", value: `${a.engagementRate}%` },
    { labelText: "Basket Lift", value: `+${a.aovLift}%` },
    { labelText: "Frequency Lift", value: `+${a.frequencyLift}` },
    { labelText: "Lapse Reduction", value: `-${a.churnReduction}%` },
    { labelText: "Redemption Rate", value: `${a.redemptionRate}%` },
    { labelText: "Operating Cost", value: `$${a.operatingCost}` },
    { labelText: "Technology Cost", value: currency(a.technologyCost, 2) },
  ];
}

function Pnl({ insightId, model, compact = false }) {
  const rows = [["REVENUE IMPACT", ""], ["+ Incremental lift from visit frequency", currency(model.frequencyRevenue)], ["+ Incremental lift from basket size", currency(model.aovRevenue)], ["+ Retention economics from lapse reduction", currency(model.churnRevenue)], ["= Total Revenue Impact", currency(model.totalRevenue)], ["PROGRAM COSTS", ""], ["- Redemption liability", currency(model.redemptionCost)], ["- Operating costs", currency(model.operatingCost)], ["- Technology costs", currency(model.technologyCost, 2)], ["= Total Program Costs", currency(model.totalCosts)]];
  return <section className={compact ? "" : card}><Header labelText="3C. Program P&L" title="Annual value creation — the CFO view, without the spreadsheet fog" />{insightId && <AiInsightButton id={insightId} />}<div className="divide-y divide-[#E8E6E1] border-y border-[#E8E6E1]">{rows.map(([name, val]) => <div className={`grid grid-cols-[1fr_auto] gap-3 py-3 ${val ? "text-[#4B4B4B]" : "text-xs font-extrabold uppercase tracking-widest text-[#9A9A9A]"}`} key={name}><span>{name}</span>{val && <b className="text-right text-[#1A1A1A]">{val}</b>}</div>)}</div><div className="mt-5 rounded-2xl bg-[#F3F0FF] p-5"><p className={label}>Net Program Value</p><strong className="mt-2 block text-4xl font-extrabold text-[#7C3AED] sm:text-6xl">{currency(model.netValue)}</strong></div><div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"><Kpi labelText="Program ROI" value={`${Math.round(model.roi)}%`} /><Kpi labelText="Payback Period" value={`${model.paybackMonths} mo`} /></div></section>;
}

function Scorecard({ insightId, model }) {
  return <section className={card}><Header labelText="3F. 3-Year Summary Scorecard" title="Board-ready outcome — the headline case in four numbers" />{insightId && <AiInsightButton id={insightId} />}<div className="grid grid-cols-1 gap-4 sm:grid-cols-2"><Kpi labelText="Total 3-Year Net Value" value={currency(model.threeYearNetValue)} /><Kpi labelText="ROI" value={`${Math.round(model.roi)}%`} /><Kpi labelText="Break-even" value={`Month ${model.paybackMonths}`} /><Kpi labelText="Members at Year 3" value={number(model.membersYear3)} /></div></section>;
}

function makeBreakEvenData(model) {
  const monthlyRevenue = model.totalRevenue / 12;
  const monthlyRunCost = (model.redemptionCost + model.operatingCost) / 12;
  return Array.from({ length: 37 }, (_, month) => ({ month, revenue: monthlyRevenue * month, cost: model.technologyCost + monthlyRunCost * month }));
}

function ReportSection({ title, children }) {
  return <section className="border-b border-[#E8E6E1] pb-8 sm:pb-10"><h3 className="text-2xl font-black tracking-[-0.02em] sm:text-3xl">{title}</h3><div className="mt-5 text-base leading-7 text-[#4B4B4B]">{children}</div></section>;
}

function NextStep({ numberText, text, time }) {
  return <li className="list-none rounded-2xl border border-[#E8E6E1] p-5"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#7C3AED] font-extrabold text-white">{numberText}</span><b className="mt-4 block">{text}</b><span className="mt-2 block text-sm font-extrabold text-[#7C3AED]">{time}</span></li>;
}
