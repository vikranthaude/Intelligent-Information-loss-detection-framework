import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { LOSS_TRENDS_7_DAYS, LOSS_TRENDS_30_DAYS } from '../../data/mockAnalytics';

export function LossTrendChart() {
  const [timeframe, setTimeframe] = useState('7days');
  const data = timeframe === '7days' ? LOSS_TRENDS_7_DAYS : LOSS_TRENDS_30_DAYS;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-soft-sm flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-2">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Information Loss Trends</h3>
          <p className="text-xs text-slate-500">Anomaly frequency by failure category</p>
        </div>

        {/* Timeframe toggle buttons */}
        <div className="inline-flex bg-slate-100 p-0.5 rounded-lg text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setTimeframe('7days')}
            className={`px-3 py-1 rounded-md transition-all ${
              timeframe === '7days'
                ? 'bg-white text-blue-700 shadow-soft-sm font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setTimeframe('30days')}
            className={`px-3 py-1 rounded-md transition-all ${
              timeframe === '30days'
                ? 'bg-white text-blue-700 shadow-soft-sm font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Last 30 Days
          </button>
        </div>
      </div>

      <div className="h-64 w-full my-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMissing" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTransform" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorMapping" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorDuplicate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                borderRadius: '0.5rem',
                boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.08)',
                fontSize: '11px',
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
              iconType="circle"
            />
            <Area
              type="monotone"
              dataKey="transformation"
              name="Transformation Errors"
              stroke="#f59e0b"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorTransform)"
            />
            <Area
              type="monotone"
              dataKey="missing"
              name="Missing Information"
              stroke="#ef4444"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorMissing)"
            />
            <Area
              type="monotone"
              dataKey="incorrectMapping"
              name="Incorrect Mapping"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorMapping)"
            />
            <Area
              type="monotone"
              dataKey="duplicate"
              name="Duplicate Info"
              stroke="#8b5cf6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorDuplicate)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
        <span>Anomaly trend declining by 18.4%</span>
        <span className="text-emerald-600 font-semibold">High Detection Accuracy</span>
      </div>
    </div>
  );
}
