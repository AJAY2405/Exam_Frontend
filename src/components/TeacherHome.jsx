import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  PlusCircle,
  BarChart3,
  Megaphone,
  UploadCloud,
  Users,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TEACHER_RESULTS_STUDENT } from "../utils/constants";

const actions = [
  {
    to: "/teacher/create-test",
    icon: PlusCircle,
    title: "Create Test",
    desc: "Build a new test with questions, options, and images.",
  },
  {
    to: "/teacher/results",
    icon: BarChart3,
    title: "See Results",
    desc: "Review student scores and test submissions.",
  },
  {
    to: "/create-notice",
    icon: Megaphone,
    title: "Upload Notice",
    desc: "Post a new announcement for students.",
  },
  {
    to: "/notes/upload",
    icon: UploadCloud,
    title: "Upload Notes",
    desc: "Share study material as a downloadable PDF.",
  },
];

function ActionCard({ to, icon: Icon, title, desc }) {
  return (
    <Link
      to={to}
      className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 text-center flex flex-col items-center hover:border-orange-300 hover:shadow-xl transition"
    >
      <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mb-4">
        <Icon size={26} className="text-orange-500" />
      </div>
      <h3 className="text-lg font-bold text-black mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </Link>
  );
}

export default function TeacherHome() {
  const [dailyAttempts, setDailyAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;

    axios
      .get(`${TEACHER_RESULTS_STUDENT}/daily-attempts`, {
        withCredentials: true,
      })
      .then((res) => {
        if (cancelled) return;
        const raw = res.data.data || res.data.attempts || res.data || [];
        const formatted = (Array.isArray(raw) ? raw : []).map((d) => ({
          date: new Date(d.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          }),
          count: d.count ?? d.students ?? 0,
        }));
        setDailyAttempts(formatted);
      })
      .catch((e) => {
        if (!cancelled) setErr(e?.response?.data?.message || e.message);
      })
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="bg-white border border-orange-100 rounded-lg shadow-lg px-3 py-2 text-sm">
        <p className="font-medium text-gray-800">{label}</p>
        <p className="text-orange-600">{payload[0].value} student(s)</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white px-6 py-15 space-y-16">
      {/* Hero */}
      <section className="text-center">
        <img src="/Images/logo.png" alt="Logo" className="w-36 mx-auto" />
        <h1 className="text-3xl font-bold text-black mt-4">
          Welcome back, Teacher 
        </h1>
        <p className="max-w-2xl mx-auto mt-2 text-gray-600">
          Manage tests, notices, and notes — all from one place.
        </p>
      </section>

      {/* Quick action cards */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10 text-black">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {actions.map((a) => (
            <ActionCard key={a.to} {...a} />
          ))}
        </div>
      </section>

      {/* Bar chart: daily test attempts */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10 text-black">
          Daily Students Who Took a Test
        </h2>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-orange-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <Users size={20} className="text-orange-500" />
            </div>
            <p className="text-gray-600 font-medium">
              Attempts recorded per day
            </p>
          </div>

          {loading ? (
            <div className="h-72 flex items-center justify-center text-gray-400 animate-pulse">
              Loading chart…
            </div>
          ) : err ? (
            <div className="h-72 flex items-center justify-center text-red-500 text-sm">
              {err}
            </div>
          ) : dailyAttempts.length === 0 ? (
            <div className="h-72 flex items-center justify-center text-gray-400 text-sm">
              No test attempts recorded yet.
            </div>
          ) : (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dailyAttempts}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#fde8d5"
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={false}
                    width={30}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "#fff7ed" }}
                  />
                  <Bar dataKey="count" fill="#f97316" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}