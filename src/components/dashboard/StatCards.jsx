import React from 'react';
import { FileText, AlertTriangle, Target, CheckCircle2, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { DASHBOARD_STATS } from '../../data/mockAnalytics';
import { formatNumber } from '../../utils/formatters';

export function StatCards() {
  const cards = [
    {
      id: 'analyzed',
      title: 'Documents Analyzed',
      value: formatNumber(DASHBOARD_STATS.documentsAnalyzed.value),
      change: DASHBOARD_STATS.documentsAnalyzed.change,
      period: DASHBOARD_STATS.documentsAnalyzed.period,
      icon: FileText,
      color: 'blue',
      iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
      isPositive: true,
    },
    {
      id: 'loss',
      title: 'Information Loss Detected',
      value: `${DASHBOARD_STATS.informationLossDetected.value} ${DASHBOARD_STATS.informationLossDetected.unit}`,
      change: DASHBOARD_STATS.informationLossDetected.change,
      period: DASHBOARD_STATS.informationLossDetected.period,
      icon: AlertTriangle,
      color: 'amber',
      iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
      isPositive: true, // Decreasing issues is good
    },
    {
      id: 'confidence',
      title: 'Average Confidence Score',
      value: `${DASHBOARD_STATS.avgConfidenceScore.value}%`,
      change: DASHBOARD_STATS.avgConfidenceScore.change,
      period: DASHBOARD_STATS.avgConfidenceScore.period,
      icon: Target,
      color: 'purple',
      iconBg: 'bg-purple-50 text-purple-600 border-purple-200',
      progress: 94.7,
      isPositive: true,
    },
    {
      id: 'accuracy',
      title: 'Data Accuracy',
      value: `${DASHBOARD_STATS.dataAccuracy.value}%`,
      change: DASHBOARD_STATS.dataAccuracy.change,
      period: DASHBOARD_STATS.dataAccuracy.period,
      icon: CheckCircle2,
      color: 'emerald',
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      isPositive: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-soft-sm hover:shadow-soft-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${card.iconBg} transition-transform group-hover:scale-110 duration-200`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {card.value}
              </div>

              {card.progress ? (
                <div className="mt-3">
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-purple-600 h-1.5 rounded-full"
                      style={{ width: `${card.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span>Threshold: 90%</span>
                    <span className="font-semibold text-purple-700">{card.change}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs mt-2.5">
                  <span className="inline-flex items-center text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[11px]">
                    <ArrowUpRight className="w-3 h-3 mr-0.5" />
                    {card.change}
                  </span>
                  <span className="text-slate-400 text-[11px] truncate">{card.period}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
