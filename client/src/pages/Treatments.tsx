import { useState } from "react";
import { DrugAdministrationForm } from "@/components/DrugAdministrationForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Treatments() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (data: any) => {
    console.log('Treatment data submitted:', data); //todo: remove mock functionality
    toast({
      title: "Treatment Recorded",
      description: `Drug administration for ${data.animal?.tagNumber} has been successfully recorded.`,
    });
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  if (showForm) {
    return (
      <div className="space-y-6" data-testid="page-treatments-form">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Treatments
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Record Drug Administration</h1>
            <p className="text-muted-foreground">
              Enter treatment details and calculate withdrawal periods
            </p>
          </div>
        </div>
        
        <DrugAdministrationForm 
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="page-treatments">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="title-treatments">
            Drug Administration
          </h1>
          <p className="text-muted-foreground">
            Record and track antimicrobial usage with automatic MRL compliance monitoring
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} data-testid="button-record-treatment">
          <Plus className="w-4 h-4 mr-2" />
          Record Treatment
        </Button>
      </div>

      {/* Treatment Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Treatments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Animals currently under treatment</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Treatments This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">New administrations recorded</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Drugs in Use</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Different antimicrobials active</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Treatments Table Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Drug Administrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg mb-2">Treatment history will be displayed here</p>
            <p className="text-sm">Record your first treatment to see data in this table</p>
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={() => setShowForm(true)}
              data-testid="button-record-first-treatment"
            >
              <Plus className="w-4 h-4 mr-2" />
              Record First Treatment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}