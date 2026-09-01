import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { WorkflowStepper } from '../components/common/WorkflowStepper';
import { Button } from '../components/common/Button';
import { StatCards } from '../components/dashboard/StatCards';
import { DocumentOverviewChart } from '../components/dashboard/DocumentOverviewChart';
import { LossTrendChart } from '../components/dashboard/LossTrendChart';
import { RecentAnalysisTable } from '../components/dashboard/RecentAnalysisTable';
import { DomainShowcase } from '../components/dashboard/DomainShowcase';
import { Upload, Sparkles } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

export function DashboardPage() {
  const { navigateTo, startPipelineAnalysis, activeDocument } = useAnalysis();

  return (
    <div>
      <PageHeader
        title="Intelligent Information-Loss Detection Framework"
        subtitle="AI-powered document validation, transformation analysis, and information loss detection across heterogeneous enterprise documents."
        showProjectBadge={true}
      >
        <Button
          variant="secondary"
          size="sm"
          icon={Sparkles}
          onClick={() => startPipelineAnalysis(activeDocument)}
        >
          Run Pipeline Demo
        </Button>
        <Button
          variant="primary"
          size="sm"
          icon={Upload}
          onClick={() => navigateTo('upload')}
        >
          + Upload New Document
        </Button>
      </PageHeader>

      {/* Visual Core System Workflow */}
      <WorkflowStepper currentStage="dashboard" />

      {/* 4 Analytics KPI Cards */}
      <StatCards />

      {/* Charts Row (Donut & Trend) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <div className="lg:col-span-1">
          <DocumentOverviewChart />
        </div>
        <div className="lg:col-span-2">
          <LossTrendChart />
        </div>
      </div>

      {/* Recent Analysis Table */}
      <RecentAnalysisTable />

      {/* Domain Showcases & AI Capabilities */}
      <DomainShowcase />
    </div>
  );
}
