import React, { useEffect, useRef } from "react";
import { CandlestickSeries, CrosshairMode, createChart } from "lightweight-charts";

export default function TradingChart({ isDark }) {
  const chartContainerRef = useRef();

  useEffect(() => {
    if (!chartContainerRef.current) return undefined;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        background: {
          color: isDark ? "#0c1f17" : "#ffffff",
        },
        textColor: isDark ? "#9ecbb2" : "#1f2937",
      },
      grid: {
        vertLines: {
          color: isDark ? "#1a3a2d" : "#e5e7eb",
        },
        horzLines: {
          color: isDark ? "#1a3a2d" : "#e5e7eb",
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: isDark ? "#2a4a3d" : "#d1d5db",
      },
      timeScale: {
        borderColor: isDark ? "#2a4a3d" : "#d1d5db",
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#f8d233",
      downColor: "#356f54",
      borderVisible: false,
      wickUpColor: "#f8d233",
      wickDownColor: "#356f54",
    });

    // Dummy initial data
    let data = [
      { time: "2024-01-01", open: 100, high: 110, low: 90, close: 105 },
      { time: "2024-01-02", open: 105, high: 115, low: 95, close: 110 },
      { time: "2024-01-03", open: 110, high: 120, low: 100, close: 108 },
      { time: "2024-01-04", open: 108, high: 118, low: 102, close: 115 },
    ];

    candleSeries.setData(data);

    // 🔴 Simulate LIVE DATA
    let lastClose = 115;

    const interval = setInterval(() => {
      const newCandle = {
        time: new Date().toISOString().slice(0, 10),
        open: lastClose,
        high: lastClose + Math.random() * 10,
        low: lastClose - Math.random() * 10,
        close: lastClose + (Math.random() - 0.5) * 10,
      };

      lastClose = newCandle.close;

      candleSeries.update(newCandle);
    }, 2000);

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [isDark]);

  return <div ref={chartContainerRef} className="w-full h-[300px]" />;
}