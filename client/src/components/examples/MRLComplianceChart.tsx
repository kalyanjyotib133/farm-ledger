import { MRLComplianceChart } from '../MRLComplianceChart';

export default function MRLComplianceChartExample() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MRLComplianceChart 
          type="bar" 
          title="Monthly Compliance Trends"
        />
        <MRLComplianceChart 
          type="pie" 
          title="Current Compliance Status"
        />
      </div>
    </div>
  );
}