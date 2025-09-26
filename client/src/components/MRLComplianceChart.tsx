import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface MRLComplianceChartProps {
  data?: any[];
  type?: 'bar' | 'pie';
  title?: string;
}

const mockBarData = [
  { month: 'Jan', compliant: 45, violations: 2, warnings: 3 },
  { month: 'Feb', compliant: 52, violations: 1, warnings: 2 },
  { month: 'Mar', compliant: 48, violations: 3, warnings: 4 },
  { month: 'Apr', compliant: 58, violations: 1, warnings: 1 },
  { month: 'May', compliant: 62, violations: 0, warnings: 2 },
  { month: 'Jun', compliant: 55, violations: 2, warnings: 3 },
];

const mockPieData = [
  { name: 'Compliant', value: 85, color: 'hsl(142, 76%, 36%)' },
  { name: 'Warnings', value: 12, color: 'hsl(38, 92%, 50%)' },
  { name: 'Violations', value: 3, color: 'hsl(0, 84%, 60%)' },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-sm font-medium">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function MRLComplianceChart({ data, type = 'bar', title = 'MRL Compliance Overview' }: MRLComplianceChartProps) {
  const barData = data || mockBarData;
  const pieData = data || mockPieData;
  
  const currentMonth = barData[barData.length - 1];
  const previousMonth = barData[barData.length - 2];
  const complianceChange = currentMonth && previousMonth 
    ? ((currentMonth.compliant - previousMonth.compliant) / previousMonth.compliant) * 100
    : 0;

  if (type === 'pie') {
    return (
      <Card data-testid="chart-compliance-pie">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {title}
            <Badge variant="outline" className="text-xs">
              Current Period
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-muted-foreground">{entry.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-testid="chart-compliance-bar">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <div className="flex items-center gap-2">
            {complianceChange > 0 ? (
              <>
                <TrendingUp className="w-4 h-4 text-green-600" />
                <Badge variant="default" className="text-xs" data-testid="trend-positive">
                  +{complianceChange.toFixed(1)}%
                </Badge>
              </>
            ) : complianceChange < 0 ? (
              <>
                <TrendingDown className="w-4 h-4 text-red-600" />
                <Badge variant="destructive" className="text-xs" data-testid="trend-negative">
                  {complianceChange.toFixed(1)}%
                </Badge>
              </>
            ) : (
              <Badge variant="secondary" className="text-xs" data-testid="trend-neutral">
                No Change
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="compliant" stackId="a" fill="hsl(142, 76%, 36%)" name="Compliant" radius={[0, 0, 4, 4]} />
              <Bar dataKey="warnings" stackId="a" fill="hsl(38, 92%, 50%)" name="Warnings" />
              <Bar dataKey="violations" stackId="a" fill="hsl(0, 84%, 60%)" name="Violations" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[hsl(142,76%,36%)]" />
            <span className="text-muted-foreground">Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[hsl(38,92%,50%)]" />
            <span className="text-muted-foreground">Warnings</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[hsl(0,84%,60%)]" />
            <span className="text-muted-foreground">Violations</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}