import { useState } from "react";
import { AnimalRegistryTable } from "@/components/AnimalRegistryTable";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockAnimals = [
  {
    id: "1",
    tagNumber: "BOV-001",
    species: "Cattle",
    breed: "Holstein",
    age: 24,
    weight: 650,
    status: "healthy" as const,
    lastTreatment: "2024-01-15",
    withdrawalDate: "-"
  },
  {
    id: "2",
    tagNumber: "PIG-027",
    species: "Swine",
    breed: "Yorkshire",
    age: 8,
    weight: 85,
    status: "treatment" as const,
    lastTreatment: "2024-01-20",
    withdrawalDate: "2024-01-25"
  },
  {
    id: "3",
    tagNumber: "BOV-045",
    species: "Cattle",
    breed: "Angus",
    age: 18,
    weight: 520,
    status: "withdrawal" as const,
    lastTreatment: "2024-01-18",
    withdrawalDate: "2024-01-28"
  },
  {
    id: "4",
    tagNumber: "SHP-012",
    species: "Sheep",
    breed: "Merino",
    age: 12,
    weight: 70,
    status: "cleared" as const,
    lastTreatment: "2024-01-10",
    withdrawalDate: "-"
  },
  {
    id: "5",
    tagNumber: "BOV-078",
    species: "Cattle",
    breed: "Charolais",
    age: 30,
    weight: 720,
    status: "healthy" as const,
    lastTreatment: "2024-01-05",
    withdrawalDate: "-"
  },
  {
    id: "6",
    tagNumber: "PIG-089",
    species: "Swine",
    breed: "Duroc",
    age: 6,
    weight: 65,
    status: "treatment" as const,
    lastTreatment: "2024-01-21",
    withdrawalDate: "2024-01-28"
  },
];

export default function Animals() {
  const { toast } = useToast();
  const [animals] = useState(mockAnimals);

  const handleAddAnimal = () => {
    console.log('Add new animal triggered'); //todo: remove mock functionality
    toast({
      title: "Add Animal",
      description: "Animal registration form will be implemented in the full application.",
    });
  };

  const handleViewAnimal = (animal: any) => {
    console.log('View animal details:', animal); //todo: remove mock functionality
    toast({
      title: "View Animal Details",
      description: `Detailed view for ${animal.tagNumber} will be implemented in the full application.`,
    });
  };

  const handleExport = () => {
    console.log('Export animal data'); //todo: remove mock functionality
    toast({
      title: "Export Data",
      description: "Animal registry export functionality will be implemented in the full application.",
    });
  };

  return (
    <div className="space-y-6" data-testid="page-animals">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="title-animals">
            Animal Registry
          </h1>
          <p className="text-muted-foreground">
            Manage your livestock inventory and track individual animal health status
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExport} data-testid="button-export">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddAnimal} data-testid="button-add-animal">
            <Plus className="w-4 h-4 mr-2" />
            Add Animal
          </Button>
        </div>
      </div>

      {/* Animal Registry Table */}
      <AnimalRegistryTable 
        animals={animals}
        onAddAnimal={handleAddAnimal}
        onViewAnimal={handleViewAnimal}
      />
    </div>
  );
}