import { ComplianceStatusCard } from '../ComplianceStatusCard';

export default function ComplianceStatusCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      <ComplianceStatusCard
        title="Animals in Compliance"
        status="compliant"
        count={247}
        description="All withdrawal periods met"
        lastUpdated="2 mins ago"
      />
      <ComplianceStatusCard
        title="Withdrawal Warnings"
        status="warning"
        count={8}
        description="Approaching withdrawal deadline"
        lastUpdated="5 mins ago"
      />
      <ComplianceStatusCard
        title="MRL Violations"
        status="violation"
        count={2}
        description="Immediate attention required"
        lastUpdated="1 hour ago"
      />
      <ComplianceStatusCard
        title="Pending Tests"
        status="pending"
        count={15}
        description="Awaiting lab results"
        lastUpdated="3 hours ago"
      />
    </div>
  );
}