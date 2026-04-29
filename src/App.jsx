import React, { useEffect, useMemo, useRef, useState } from "react";
import logo from "./assets/logo.png";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import TradingChart from "./components/TradingChart";
import {
  Sun,
  Moon,
  ArrowRight,
  ShieldCheck,
  Zap,
  Headphones,
  CandlestickChart,
  Mail,
  MapPin,
  Phone,
  Globe,
  Sparkles,
  Workflow,
  Radar,
  CircleCheck,
} from "lucide-react";

const PALETTE = {
  gold1: "#f2b83f",
  gold2: "#d39028",
  gold3: "#f8d233",
  green1: "#356f54",
  bronze: "#a25e10",
  cream: "#f4e387",
  mint: "#9ecbb2",
  brown: "#613e0c",
  forest: "#123927",
};

const features = [
  {
    icon: <CandlestickChart className="h-6 w-6" />,
    title: "Institutional Liquidity",
    desc: "Deep multi-asset liquidity with stable order handling during active market windows.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Client Fund Security",
    desc: "Segregated account model and risk-oriented controls built for long-term trust.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Precision Execution",
    desc: "Low-latency infrastructure that supports faster entries, exits, and position management.",
  },
  {
    icon: <Headphones className="h-6 w-6" />,
    title: "24/5 Expert Support",
    desc: "Dedicated multilingual assistance for onboarding, account services, and trading operations.",
  },
];

const accounts = [
  {
    name: "Core",
    label: "Retail Standard",
    points: [
      "Spreads from 1.0 pips",
      "Zero commission",
      "Standard execution",
    ],
    cta: "Get Started",
  },
  {
    name: "Prime",
    label: "Most Professional",
    featured: true,
    points: [
      "Spreads from 0.2 pips",
      "$3.50 per side commission",
      "Priority LP routing",
      "Personal account manager",
    ],
    cta: "Open Prime",
  },
  {
    name: "Elite",
    label: "Institutional",
    points: [
      "Raw spreads (0.0 pips)",
      "Custom commission structure",
      "FIX API access",
      "Co-located servers (NY4)",
    ],
    cta: "Request Elite",
  },
];

const ticker = [
  { symbol: "EUR/USD", price: "1.0824", change: "+0.24%" },
  { symbol: "XAU/USD", price: "2350.10", change: "+0.91%" },
  { symbol: "NASDAQ", price: "16,240", change: "+0.38%" },
  { symbol: "BTC/USD", price: "62,420", change: "+1.82%" },
  { symbol: "GBP/JPY", price: "191.68", change: "+0.42%" },
  { symbol: "US30", price: "39,840", change: "+0.17%" },
];

const marketRows = [
  {
    title: "Forex",
    short: "Major, minor and cross pairs with deep-session liquidity.",
    long: "Trade major, minor and cross pairs with tight pricing, consistent fills and transparent execution conditions across active market sessions.",
    bullets: ["From 0.0 spreads", "Low-latency routing"],
  },
  {
    title: "Commodities",
    short: "Gold and commodity exposure with cleaner risk control.",
    long: "Access gold and key commodity products with strong chart readability, disciplined risk structure and portfolio diversification opportunities.",
    bullets: ["Gold-focused flow", "Risk-ready setup"],
  },
  {
    title: "Indices",
    short: "Global index opportunities with structured execution flow.",
    long: "Capture momentum in major global indices through a focused interface designed for quicker decision-making and professional position control.",
    bullets: ["Macro event coverage", "Flexible leverage"],
  },
  {
    title: "Stocks",
    short: "CFD-ready stock products for tactical market participation.",
    long: "Expand into leading stock CFDs with clear market segmentation, streamlined execution paths and account-tier aligned trading conditions.",
    bullets: ["Multi-sector selection", "Professional conditions"],
  },
];

function usePersistentTheme() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("tcm-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    localStorage.setItem("tcm-theme", theme);
  }, [theme]);

  return [theme, setTheme];
}

function SectionTitle({ isDark, label, title, description }) {
  return (
    <div className="max-w-3xl">
      <p
        className="text-xs tracking-[0.26em] uppercase font-semibold"
        style={{ color: PALETTE.gold3 }}
      >
        {label}
      </p>
      <h2
        className={`mt-4 text-3xl md:text-5xl font-semibold leading-tight ${isDark ? "text-white" : "text-slate-900"
          }`}
      >
        {title}
      </h2>
      <p className={`mt-4 leading-8 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
        {description}
      </p>
    </div>
  );
}

function CountUp({ to, suffix = "", prefix = "", duration = 1200 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const stepTime = 16;
    const steps = Math.max(1, Math.floor(duration / stepTime));
    const increment = to / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= to) {
        setValue(to);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

export default function TradeCapitalLanding() {
  const [theme, setTheme] = usePersistentTheme();
  const [scrolled, setScrolled] = useState(false);
  const isDark = theme === "dark";
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -24]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0.92]);
  const heroContainer = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.08 },
    },
  };
  const heroItem = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  const navItems = useMemo(
    () => ["home", "about", "markets", "accounts", "contact"],
    []
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${
        isDark ? "text-white" : "text-slate-900"
      }`}
      style={{
        background: isDark
          ? `radial-gradient(circle at 20% 0%, ${PALETTE.green1}44 0%, transparent 33%), radial-gradient(circle at 80% 0%, ${PALETTE.gold1}33 0%, transparent 32%), linear-gradient(180deg, ${PALETTE.forest} 0%, #0a1d14 45%, #08130e 100%)`
          : `radial-gradient(circle at 20% 0%, ${PALETTE.gold1}35 0%, transparent 33%), radial-gradient(circle at 80% 0%, ${PALETTE.green1}2A 0%, transparent 35%), linear-gradient(180deg, #fffceb 0%, #f7f6e8 50%, #eef5ef 100%)`,
      }}
    >
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? isDark
              ? "backdrop-blur-xl border-b border-white/10 bg-[#0b1f18]/95 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
              : "backdrop-blur-xl border-b border-[#9ecbb2]/70 bg-white/90 shadow-[0_12px_34px_rgba(17,58,39,0.12)]"
            : isDark
              ? "bg-[#0b1f18]/60 backdrop-blur-md"
              : "bg-white/55 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-[72px] flex items-center justify-between">
          <a
            href="#home"
            className="flex items-center gap-3 rounded-xl px-2.5 py-1.5  transition-all"
            
          >
            <img
              src={logo}
              alt="Trade Capital Markets logo"
              className="h-10 md:h-20 w-auto object-contain"
              style={{
                filter: isDark
                  ? "drop-shadow(0 0 16px rgba(255,255,255,0.98)) drop-shadow(0 0 32px rgba(255,255,255,0.7))"
                  : "drop-shadow(0 0 20px rgba(248,210,52,0.45))",
              }}
            />
          </a>
  
          <nav
            className={`hidden md:flex items-center gap-6 text-sm ${
              isDark ? "text-slate-200" : "text-slate-700"
            }`}
          >
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item}`}
                whileHover={{ y: -1 }}
                className="capitalize hover:text-[#f2b83f] transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </nav>
  
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border ${
                isDark ? "border-white/20 bg-white/5" : "border-slate-300 bg-white"
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
  
            <a
              href="#"
              className="hidden sm:inline-flex rounded-full px-5 py-2.5 text-sm font-medium border"
              style={{
                borderColor: isDark ? `${PALETTE.mint}66` : `${PALETTE.green1}77`,
              }}
            >
              Login
            </a>
  
            <a
              href="#"
              className="inline-flex rounded-full px-5 py-2.5 text-sm font-semibold text-[#1e1606]"
              style={{
                background: `linear-gradient(90deg, ${PALETTE.gold1} 0%, ${PALETTE.gold3} 48%, ${PALETTE.gold2} 100%)`,
                boxShadow: `0 10px 30px ${PALETTE.gold2}55`,
              }}
            >
              Open Account
            </a>
          </div>
        </div>
      </header>
  
      <main className="relative pt-20 md:pt-[92px]">
        <motion.section
          id="home"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 md:py-10"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="grid xl:grid-cols-[0.96fr_1.04fr] gap-5 md:gap-6 items-stretch">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
              className="relative overflow-hidden rounded-[28px] p-6 md:p-7 border shadow-[0_18px_55px_rgba(0,0,0,0.14)] backdrop-blur-xl"
              style={{
                borderColor: isDark ? `${PALETTE.mint}30` : `${PALETTE.green1}20`,
                background: isDark
                  ? "linear-gradient(145deg, rgba(9,24,18,0.98), rgba(16,42,32,0.88))"
                  : "linear-gradient(145deg, rgba(255,255,255,0.98), rgba(245,249,246,0.95))",
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.22, 0.35, 0.22] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-14 -right-10 h-44 w-44 rounded-full blur-3xl opacity-30"
                style={{
                  background: `radial-gradient(circle, ${PALETTE.gold3} 0%, transparent 70%)`,
                }}
              />
              <motion.div
                animate={{ scale: [1, 1.06, 1], opacity: [0.16, 0.28, 0.16] }}
                transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="absolute -bottom-16 -left-8 h-48 w-48 rounded-full blur-3xl opacity-20"
                style={{
                  background: `radial-gradient(circle, ${PALETTE.mint} 0%, transparent 75%)`,
                }}
              />

              <motion.div
                className="relative z-10"
                variants={heroContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
              >
                <motion.p variants={heroItem}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em]"
                  style={{
                    color: isDark ? PALETTE.cream : PALETTE.brown,
                    border: `1px solid ${PALETTE.gold1}48`,
                    background: isDark
                      ? "rgba(58, 41, 10, 0.52)"
                      : "rgba(212, 175, 55, 0.14)",
                  }}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Institutional Multi-Asset Broker
                </motion.p>

                <motion.h1 variants={heroItem}
                  className={`mt-3 text-4xl md:text-5xl xl:text-6xl font-semibold leading-[0.94] tracking-[-0.03em] ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Trade Capital
                  <span
                    className="block mt-1.5 text-3xl md:text-4xl xl:text-5xl"
                    style={{ color: PALETTE.gold1 }}
                  >
                    Markets
                  </span>
                </motion.h1>

                <motion.p variants={heroItem}
                  className={`mt-3 max-w-2xl text-sm md:text-[15px] leading-7 ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  Professional trading conditions across forex, commodities,
                  indices, and stocks. Built for serious traders who demand speed,
                  transparent pricing, and reliable execution quality.
                </motion.p>

                <motion.div variants={heroItem} className="mt-6 flex flex-wrap gap-3">
                  <motion.button
                    className="rounded-xl px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_10px_26px_rgba(212,175,55,0.26)]"
                    style={{
                      background: `linear-gradient(90deg, ${PALETTE.gold1}, ${PALETTE.gold3})`,
                    }}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Open Live Account
                  </motion.button>

                  <motion.button
                    className={`rounded-xl border px-5 py-3 text-sm font-medium ${
                      isDark ? "text-white" : "text-slate-800"
                    }`}
                    style={{
                      borderColor: isDark ? `${PALETTE.mint}58` : `${PALETTE.green1}44`,
                      background: isDark
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(255,255,255,0.75)",
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Account Types
                  </motion.button>
                </motion.div>

                <motion.div variants={heroItem} className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    ["0.0", "Raw Spread"],
                    ["<30ms", "Execution"],
                    ["24/5", "Expert Support"],
                    ["100+", "Tradeable Assets"],
                  ].map(([value, label]) => (
                    <motion.div
                      key={label}
                      className="rounded-xl px-3 py-3.5 border text-center"
                      style={{
                        borderColor: isDark
                          ? `${PALETTE.mint}18`
                          : `${PALETTE.green1}18`,
                        background: isDark
                          ? "rgba(255,255,255,0.02)"
                          : "rgba(255,255,255,0.76)",
                      }}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.35 }}
                      whileHover={{ y: -2 }}
                    >
                      <div
                        className={`text-base md:text-lg font-semibold ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {label === "Tradeable Assets" ? (
                          <CountUp to={100} suffix="+" />
                        ) : label === "Execution" ? (
                          <CountUp to={30} prefix="<" suffix="ms" />
                        ) : label === "Expert Support" ? (
                          <CountUp to={24} suffix="/5" />
                        ) : (
                          value
                        )}
                      </div>
                      <div
                        className={`mt-1 text-[11px] uppercase tracking-[0.16em] ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        {label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

            <div
              className="relative overflow-hidden rounded-[28px] border p-3 md:p-3.5 shadow-[0_20px_62px_rgba(0,0,0,0.16)]"
              style={{
                borderColor: isDark ? `${PALETTE.gold1}50` : `${PALETTE.green1}30`,
                background: isDark
                  ? "linear-gradient(160deg, rgba(6,16,13,0.99), rgba(11,29,22,0.96))"
                  : "linear-gradient(160deg, rgba(255,255,255,1), rgba(244,248,245,0.97))",
              }}
            >
              <div className="mb-3 px-1">
                <div className="flex items-center justify-between gap-2">
                  <div
                    className="rounded-xl border px-3 py-1.5 text-xs"
                    style={{
                      borderColor: `${PALETTE.mint}45`,
                      background: isDark ? "rgba(9,35,28,0.9)" : "rgba(238,252,245,0.94)",
                      color: isDark ? PALETTE.mint : PALETTE.green1,
                    }}
                  >
                    EUR/USD ↑ 1.0824
                  </div>
                  <div
                    className="rounded-xl border px-3 py-1.5 text-xs"
                    style={{
                      borderColor: `${PALETTE.gold1}45`,
                      background: isDark ? "rgba(42,29,8,0.9)" : "rgba(255,248,228,0.95)",
                      color: PALETTE.gold3,
                    }}
                  >
                    BTC/USD +1.8%
                  </div>
                </div>
                <p className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  Real-time chart view with execution-focused metrics for active
                  decision making.
                </p>
              </div>

              <div className="relative z-10">
                <TradingChart isDark={isDark} />
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2 text-xs">
                {[
                  ["Spread", "0.0"],
                  ["Latency", "<30ms"],
                  ["Liquidity", "Deep"],
                  ["Status", "Live"],
                ].map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-xl px-3 py-2 text-center border"
                    style={{
                      borderColor: isDark
                        ? `${PALETTE.mint}18`
                        : `${PALETTE.green1}18`,
                      background: isDark
                        ? "rgba(255,255,255,0.02)"
                        : "rgba(255,255,255,0.8)",
                    }}
                  >
                    <div
                      className={`text-[10px] uppercase tracking-[0.14em] ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {key}
                    </div>
                    <div
                      className={`mt-1 font-semibold ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  ["Session", "London + NY"],
                  ["Signal", "Bullish Bias"],
                  ["Volatility", "Medium"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border px-3 py-2"
                    style={{
                      borderColor: isDark ? `${PALETTE.mint}22` : `${PALETTE.green1}20`,
                      background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.78)",
                    }}
                  >
                    <p className={`text-[10px] uppercase tracking-[0.14em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      {label}
                    </p>
                    <p className={`mt-1 text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <section
          className={`border-y overflow-hidden ${
            isDark
              ? "border-white/10 bg-white/[0.03] backdrop-blur-sm"
              : "border-slate-200 bg-white/70"
          }`}
        >
          <div className="max-w-7xl mx-auto py-4">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
              className="flex w-max gap-4"
            >
              {[...ticker, ...ticker].map((item, idx) => (
                <div
                  key={`${item.symbol}-${idx}`}
                  className={`flex items-center gap-3 rounded-full px-4 py-2.5 mx-1.5 ${
                    isDark
                      ? "border border-white/10 bg-slate-950/50"
                      : "border border-slate-200 bg-white shadow-sm"
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      isDark ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    {item.symbol}
                  </span>
                  <span
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {item.price}
                  </span>
                  <span className="text-emerald-500 text-sm">{item.change}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

       
  
        <section
          id="about"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12"
        >
          <div
            className="rounded-[24px] border p-6 md:p-7"
            style={{
              borderColor: isDark ? `${PALETTE.gold1}55` : `${PALETTE.gold2}45`,
              background: isDark
                ? "linear-gradient(150deg, rgba(16,42,32,0.8), rgba(9,25,18,0.78))"
                : "linear-gradient(150deg, rgba(255,253,244,0.95), rgba(255,255,255,0.98))",
              boxShadow: isDark
                ? "0 14px 36px rgba(0,0,0,0.24)"
                : "0 14px 36px rgba(162,94,16,0.10)",
            }}
          >
            <div
              className="inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold mb-3"
              style={{
                color: isDark ? PALETTE.cream : PALETTE.brown,
                borderColor: `${PALETTE.gold1}55`,
                background: isDark ? "rgba(97,62,12,0.35)" : "rgba(242,184,63,0.12)",
              }}
            >
              Brand Story
            </div>
            <SectionTitle
              isDark={isDark}
              label=""
              title="A professional brokerage website built for trust and conversion."
              description="Trade Capital Markets is presented with a clean institutional tone, clear product hierarchy, and better readability from homepage to account opening."
            />
          </div>
  
          <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="rounded-[22px] p-6 border"
                style={{
                  borderColor: isDark ? `${PALETTE.mint}44` : `${PALETTE.green1}33`,
                  background: isDark ? "#0d251cbf" : "#ffffffcf",
                }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <div
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: `${PALETTE.gold1}28`, color: PALETTE.gold1 }}
                >
                  {feature.icon}
                </div>
                <h3
                  className={`mt-4 text-xl font-semibold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`mt-2 leading-7 text-sm ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
  
        <section
          id="markets"
          className="py-10 md:py-12 border-y"
          style={{ borderColor: isDark ? `${PALETTE.mint}22` : `${PALETTE.green1}22` }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-6 md:gap-7 items-start">
              <div
                className="rounded-[22px] border p-5 md:p-6"
                style={{
                  borderColor: isDark ? `${PALETTE.mint}30` : `${PALETTE.green1}20`,
                  background: isDark ? "rgba(11,31,23,0.72)" : "rgba(255,255,255,0.75)",
                }}
              >
                <div
                  className="inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold mb-3"
                  style={{
                    color: isDark ? PALETTE.cream : PALETTE.brown,
                    borderColor: `${PALETTE.gold1}55`,
                    background: isDark ? "rgba(97,62,12,0.35)" : "rgba(242,184,63,0.12)",
                  }}
                >
                  Markets Grid
                </div>
                <SectionTitle
                  isDark={isDark}
                  label=""
                  title="Market categories designed for serious traders"
                  description="Each market block highlights pricing quality, execution stability, and account-level advantages for different trading styles."
                />
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    ["Forex Pairs", "55+"],
                    ["Commodities", "12+"],
                    ["Global Indices", "15+"],
                    ["Stock CFDs", "80+"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="rounded-xl border px-3 py-3"
                      style={{
                        borderColor: isDark ? `${PALETTE.mint}26` : `${PALETTE.green1}22`,
                        background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.82)",
                      }}
                    >
                      <p className={`text-[11px] uppercase tracking-[0.14em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>{k}</p>
                      <p className={`mt-1 text-xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>
  
              <div className="grid sm:grid-cols-2 gap-4">
                {marketRows.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: i * 0.06 }}
                    className="rounded-[22px] p-6 border"
                    style={{
                      borderColor: isDark ? `${PALETTE.gold1}44` : `${PALETTE.green1}44`,
                      background: isDark
                        ? i % 2 === 0
                          ? "#0f291f"
                          : "#132e24"
                        : i % 2 === 0
                        ? "#fffef6"
                        : "#f6fbf8",
                    }}
                  >
                    <p
                      className="text-xs uppercase tracking-[0.18em]"
                      style={{ color: PALETTE.gold2 }}
                    >
                      0{i + 1}
                    </p>
  
                    <h3
                      className={`mt-3 text-2xl font-semibold ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {item.title}
                    </h3>
  
                    <p
                      className={`mt-3 leading-7 ${
                        isDark ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {item.long}
                    </p>
  
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.bullets.map((bullet) => (
                        <span
                          key={bullet}
                          className="rounded-full px-3 py-1 text-xs font-medium border"
                          style={{
                            borderColor: isDark ? `${PALETTE.mint}55` : `${PALETTE.green1}44`,
                            color: isDark ? PALETTE.mint : PALETTE.green1,
                          }}
                        >
                          {bullet}
                        </span>
                      ))}
                    </div>
  
                    <button
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold"
                      style={{ color: PALETTE.gold1 }}
                    >
                      Explore {item.title} <ArrowRight className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
  
        <section
          id="accounts"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12"
        >
          <div className="max-w-3xl mx-auto text-center">
            <p
              className="inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold mb-3"
              style={{
                color: isDark ? PALETTE.cream : PALETTE.brown,
                borderColor: `${PALETTE.gold1}55`,
                background: isDark ? "rgba(97,62,12,0.35)" : "rgba(242,184,63,0.12)",
              }}
            >
              Account Types
            </p>
  
            <h2
              className={`mt-3 text-4xl md:text-5xl font-semibold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Select Your Tier
            </h2>
  
            <p
              className={`mt-4 leading-7 ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Tailored trading conditions for every stage of your market journey.
            </p>
          </div>
  
          <div className="mt-10 grid lg:grid-cols-3 gap-6">
            {accounts.map((account, i) => (
              <motion.div
                key={account.name}
                className="rounded-[24px] p-px"
                style={{
                  background: account.featured
                    ? `linear-gradient(180deg, ${PALETTE.gold3}, ${PALETTE.gold2})`
                    : `linear-gradient(180deg, ${PALETTE.mint}, ${PALETTE.green1})`,
                }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <div
                  className="h-full rounded-[24px] p-7"
                  style={{
                    background: isDark ? "#10241b" : "#ffffff",
                    boxShadow: isDark
                      ? "none"
                      : "0 10px 30px rgba(18,57,39,0.08)",
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p
                      className="text-xs uppercase tracking-[0.14em] font-semibold"
                      style={{ color: account.featured ? PALETTE.gold2 : PALETTE.green1 }}
                    >
                      {account.label}
                    </p>
  
                    {account.featured ? (
                      <span
                        className="text-[10px] uppercase tracking-[0.16em] px-2 py-1 rounded"
                        style={{ background: PALETTE.bronze, color: "#fff8ea" }}
                      >
                        Top Pick
                      </span>
                    ) : null}
                  </div>
  
                  <h3
                    className={`mt-2 text-4xl font-semibold ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {account.name}
                  </h3>
  
                  <ul className="mt-7 space-y-4">
                    {account.points.map((point) => (
                      <li
                        key={point}
                        className={`flex items-center gap-3 ${
                          isDark ? "text-slate-200" : "text-slate-700"
                        }`}
                      >
                        <CircleCheck
                          className="h-4 w-4 shrink-0"
                          style={{
                            color: account.featured ? PALETTE.gold2 : PALETTE.green1,
                          }}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
  
                  <motion.a
                    href="#"
                    className={`mt-8 inline-flex w-full justify-center border px-5 py-3.5 font-semibold uppercase tracking-[0.14em] text-sm ${
                      account.featured
                        ? "text-[#2d2107]"
                        : isDark
                        ? "text-slate-200"
                        : "text-slate-800"
                    }`}
                    style={{
                      borderColor: account.featured
                        ? `${PALETTE.gold2}66`
                        : `${PALETTE.green1}66`,
                      background: account.featured
                        ? `linear-gradient(90deg, ${PALETTE.gold1}, ${PALETTE.cream})`
                        : "transparent",
                    }}
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {account.cta}
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
  
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 md:pb-18">
          <div
            className="rounded-[28px] p-8 md:p-10 border"
            style={{
              borderColor: isDark ? `${PALETTE.gold1}66` : `${PALETTE.green1}55`,
              background: isDark ? "#10281fdd" : "#fffef8dd",
            }}
          >
            <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-8">
              <div>
                <p
                  className="inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold mb-3"
                  style={{
                    color: isDark ? PALETTE.cream : PALETTE.brown,
                    borderColor: `${PALETTE.gold1}55`,
                    background: isDark ? "rgba(97,62,12,0.35)" : "rgba(242,184,63,0.12)",
                  }}
                >
                  Conversion Zone
                </p>
  
                <h2
                  className={`mt-4 text-3xl md:text-5xl font-semibold leading-tight ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Designed to convert with confidence
                </h2>
  
                <p
                  className={`mt-4 leading-8 ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  A final trust-focused section with clear metrics and direct action
                  routes that complete the premium experience.
                </p>
              </div>
  
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  ["Execution Speed", "<30ms"],
                  ["Available Markets", "100+"],
                  ["Support Window", "24/5"],
                  ["Trader Confidence", "High"],
                ].map(([k, v], i) => (
                  <motion.div
                    key={k}
                    className="rounded-2xl p-4 border"
                    style={{
                      borderColor: isDark ? `${PALETTE.mint}44` : `${PALETTE.green1}33`,
                      background: isDark ? "#122e23aa" : "#ffffffcc",
                    }}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    whileHover={{ y: -3 }}
                  >
                    <p
                      className="text-sm"
                      style={{ color: isDark ? PALETTE.mint : PALETTE.green1 }}
                    >
                      {k}
                    </p>
                    <p
                      className={`mt-1 text-2xl font-semibold ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {v}
                    </p>
                  </motion.div>
                ))}
  
                <motion.a
                  href="#"
                  className="sm:col-span-2 inline-flex justify-center items-center gap-2 rounded-2xl px-6 py-4 font-semibold text-[#241704]"
                  style={{
                    background: `linear-gradient(90deg, ${PALETTE.gold1}, ${PALETTE.gold3})`,
                  }}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Now <ArrowRight className="h-4 w-4" />
                </motion.a>
              </div>
            </div>
          </div>
        </section>
      </main>
  
      <footer
        id="contact"
        className="border-t"
        style={{ borderColor: isDark ? `${PALETTE.mint}22` : `${PALETTE.green1}22` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
            <div>
              <img
                src={logo}
                alt="Trade Capital Markets logo"
                className="h-20 w-auto object-contain"
                style={{
                  filter: isDark
                    ? "drop-shadow(0 0 16px rgba(255,255,255,0.98)) drop-shadow(0 0 32px rgba(255,255,255,0.7))"
                    : "drop-shadow(0 0 20px rgba(248,210,52,0.45))",
                }}
              />
  
              <p
                className={`mt-4 max-w-2xl leading-7 ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                Trade Capital Markets with a clean, premium interface designed for
                trust, clarity, and stronger conversion.
              </p>
  
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {[
                  [<Mail className="h-4 w-4" />, "support@tradecapitalmarkets.com"],
                  [<Phone className="h-4 w-4" />, "24/5 Assistance"],
                  [<Globe className="h-4 w-4" />, "Forex • Stocks • Commodities • Indices"],
                  [<MapPin className="h-4 w-4" />, "Global trading support desk"],
                ].map(([icon, value]) => (
                  <div
                    key={value}
                    className="rounded-xl px-4 py-3 flex items-center gap-2 border"
                    style={{
                      borderColor: isDark ? `${PALETTE.mint}33` : `${PALETTE.green1}33`,
                      background: isDark ? "#0c1f17aa" : "#ffffffcc",
                    }}
                  >
                    <span style={{ color: PALETTE.gold1 }}>{icon}</span>
                    <span
                      className={isDark ? "text-slate-200 text-sm" : "text-slate-700 text-sm"}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
  
            <div
              className="rounded-[22px] p-6 border"
              style={{
                borderColor: isDark ? `${PALETTE.gold1}33` : `${PALETTE.green1}33`,
                background: isDark ? "#10281fbb" : "#fffef8cc",
              }}
            >
              <p
                className="text-xs uppercase tracking-[0.2em] font-semibold"
                style={{ color: PALETTE.gold2 }}
              >
                Quick Access
              </p>
  
              <ul className={`mt-5 space-y-3 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                {["Home", "About", "Markets", "Accounts", "Contact", "Open Account", "Client Login"].map(
                  (item) => (
                    <li key={item} className="flex items-center justify-between">
                      <span>{item}</span>
                      <Radar className="h-4 w-4" style={{ color: PALETTE.mint }} />
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
  
          <p
            className={`mt-8 pt-5 border-t text-sm ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
            style={{ borderColor: isDark ? `${PALETTE.mint}22` : `${PALETTE.green1}22` }}
          >
            © 2026 Trade Capital Markets. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
