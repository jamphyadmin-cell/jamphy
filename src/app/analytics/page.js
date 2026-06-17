"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import ActivityRing from "@/components/ActivityRing";
import Navbar from "@/components/Navbar";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900 border border-zinc-700 p-3 rounded-xl shadow-xl">
        <p className="text-zinc-400 text-sm mb-1">{label}</p>
        <p className="text-cyan-400 font-bold">{`${payload[0].value}% Accuracy`}</p>
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    status === "authenticated" ? "/api/analytics" : null,
    fetcher,
    { revalidateOnFocus: true }
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (isLoading || status === "loading" || !data) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col pb-24">
        <Navbar session={session} title="Analytics" />
        <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-8">
          <div className="h-12 w-64 bg-zinc-900 rounded-2xl animate-pulse"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-64 bg-zinc-900 rounded-3xl animate-pulse"></div>
            <div className="h-64 bg-zinc-900 rounded-3xl animate-pulse md:col-span-2"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-zinc-900 rounded-3xl animate-pulse"></div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-80 bg-zinc-900 rounded-3xl animate-pulse"></div>
            <div className="h-80 bg-zinc-900 rounded-3xl animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  const overallAccuracy = data.totalAttempts > 0 
    ? Math.round((data.totalCorrect / data.totalAttempts) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col pb-24">
      <Navbar session={session} title="Analytics" />
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-8">

        {/* Top Row: Overall Accuracy & Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-[32px] p-8 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <h2 className="text-zinc-400 font-medium mb-6 w-full text-left">Overall Accuracy</h2>
            <ActivityRing percentage={overallAccuracy} size={180} strokeWidth={14} color="#22d3ee" />
            <p className="mt-6 text-zinc-500 text-sm">Based on {data.totalAttempts} total attempts</p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-[32px] p-8 lg:col-span-2">
            <h2 className="text-zinc-400 font-medium mb-6">Accuracy Trend (Last 30 Days)</h2>
            <div className="w-full min-w-0 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.dailyAccuracy} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#a1a1aa" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    minTickGap={30}
                  />
                  <YAxis 
                    stroke="#a1a1aa" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="#22d3ee" 
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6, fill: "#22d3ee", stroke: "#000", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Total Attempted</h3>
            <p className="text-3xl font-bold">{data.totalAttempts}</p>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Total Correct</h3>
            <p className="text-3xl font-bold text-emerald-400">{data.totalCorrect}</p>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Avg Time / Question</h3>
            <p className="text-3xl font-bold text-amber-400">{data.avgTimeTaken}s</p>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-7xl opacity-5">🔥</div>
            <h3 className="text-zinc-400 text-sm font-medium mb-2">Current Streak</h3>
            <p className="text-3xl font-bold text-orange-400">{data.streak} Days</p>
          </div>
        </div>

        {/* Bottom Row: Subject Accuracy & Weak Topics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-[32px] p-8">
            <h2 className="text-zinc-400 font-medium mb-6">Accuracy by Subject</h2>
            <div className="w-full min-w-0 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.subjectAccuracy} margin={{ top: 5, right: 0, bottom: 5, left: -20 }} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis dataKey="subject" type="category" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} width={100} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff0a' }} />
                  <Bar dataKey="accuracy" radius={[0, 4, 4, 0]} barSize={24}>
                    {data.subjectAccuracy.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.accuracy >= 50 ? '#34d399' : '#f87171'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-[32px] p-8">
            <h2 className="text-zinc-400 font-medium mb-6">Topics to Review</h2>
            {data.weakTopics.length > 0 ? (
              <div className="space-y-4">
                {data.weakTopics.map((topic, idx) => (
                  <Link 
                    key={idx} 
                    href={`/questions`} // In a real app we might pass a query param like ?subject=${topic}
                    className="flex items-center justify-between p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-colors group"
                  >
                    <span className="font-medium text-lg">{topic}</span>
                    <span className="text-zinc-500 group-hover:text-white transition-colors">→</span >
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-zinc-500">
                <p>Not enough data yet.</p>
                <p className="text-sm mt-1">Keep practicing to identify weak topics!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
