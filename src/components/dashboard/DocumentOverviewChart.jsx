import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { DOCUMENT_OVERVIEW_DATA } from '../../data/mockAnalytics';
import { CheckCircle2, AlertTriangle, AlertCircle, RefreshCw } from 'lucide-react';

export function DocumentOverviewChart() {
  const total = DOCUMENT_OVERVIEW_DATA.reduce((acc, curr) => acc + curr.value, 0);

  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-soft-lg text-xs">
          <div className="font-bold text-slate-800">{data.name}</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.color }} />
            <span className="text-slate-600 font-semibold">{data.value} documents</span>
            <span className="text-slate-400">({data.percentage}%)</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-soft-sm flex flex-col justify-between">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Document Analysis Overview</h3>
          <p className="text-xs text-slate-500">Breakdown of 1,248 processed files</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
          Total: {total}
        </span>
      </div>

      <div className="relative h-56 w-full flex items-center justify-center my-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={renderCustomTooltip} />
            <Pie
              data={DOCUMENT_OVERVIEW_DATA}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {DOCUMENT_OVERVIEW_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-extrabold text-slate-900">78.5%</span>
          <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Verified</span>
        </div>
      </div>

      {/* Legend with exact numbers */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
        {DOCUMENT_OVERVIEW_DATA.map((item) => (
          <div key={item.name} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-slate-600 truncate text-[11px]">{item.name}</span>
            </div>
            <span className="font-bold text-slate-800 text-[11px]">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
