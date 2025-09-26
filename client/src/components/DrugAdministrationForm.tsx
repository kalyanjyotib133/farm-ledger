import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DrugAdministrationFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

interface Drug {
  id: string;
  name: string;
  withdrawalPeriod: number;
  mrlLimit: number;
  category: string;
}

const mockDrugs: Drug[] = [
  { id: "1", name: "Oxytetracycline", withdrawalPeriod: 21, mrlLimit: 100, category: "Antibiotic" },
  { id: "2", name: "Penicillin G", withdrawalPeriod: 14, mrlLimit: 50, category: "Antibiotic" },
  { id: "3", name: "Ivermectin", withdrawalPeriod: 28, mrlLimit: 10, category: "Antiparasitic" },
  { id: "4", name: "Flunixin", withdrawalPeriod: 7, mrlLimit: 40, category: "Anti-inflammatory" },
];

const mockAnimals = [
  { id: "1", tagNumber: "BOV-001", species: "Cattle" },
  { id: "2", tagNumber: "PIG-027", species: "Swine" },
  { id: "3", tagNumber: "BOV-045", species: "Cattle" },
  { id: "4", tagNumber: "SHP-012", species: "Sheep" },
];

export function DrugAdministrationForm({ onSubmit, onCancel }: DrugAdministrationFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    animalId: "",
    drugId: "",
    dosage: "",
    dosageUnit: "mg",
    administrationRoute: "",
    administrationDate: new Date().toISOString().split('T')[0],
    veterinarianId: "",
    notes: ""
  });
  
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateWithdrawalDate = () => {
    if (!selectedDrug || !formData.administrationDate) return null;
    const adminDate = new Date(formData.administrationDate);
    const withdrawalDate = new Date(adminDate);
    withdrawalDate.setDate(adminDate.getDate() + selectedDrug.withdrawalPeriod);
    return withdrawalDate.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Submitting drug administration:', formData); //todo: remove mock functionality
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Treatment Recorded",
        description: `Drug administration for ${selectedAnimal?.tagNumber} has been successfully recorded.`,
      });
      
      onSubmit?.({
        ...formData,
        drug: selectedDrug,
        animal: selectedAnimal,
        withdrawalDate: calculateWithdrawalDate()
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record drug administration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDrugChange = (drugId: string) => {
    const drug = mockDrugs.find(d => d.id === drugId);
    setSelectedDrug(drug || null);
    setFormData(prev => ({ ...prev, drugId }));
  };

  const handleAnimalChange = (animalId: string) => {
    const animal = mockAnimals.find(a => a.id === animalId);
    setSelectedAnimal(animal || null);
    setFormData(prev => ({ ...prev, animalId }));
  };

  const withdrawalDate = calculateWithdrawalDate();

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Record Drug Administration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="animal" data-testid="label-animal">Animal *</Label>
              <Select onValueChange={handleAnimalChange} data-testid="select-animal">
                <SelectTrigger>
                  <SelectValue placeholder="Select animal" />
                </SelectTrigger>
                <SelectContent>
                  {mockAnimals.map((animal) => (
                    <SelectItem key={animal.id} value={animal.id}>
                      {animal.tagNumber} - {animal.species}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="drug" data-testid="label-drug">Drug *</Label>
              <Select onValueChange={handleDrugChange} data-testid="select-drug">
                <SelectTrigger>
                  <SelectValue placeholder="Select drug" />
                </SelectTrigger>
                <SelectContent>
                  {mockDrugs.map((drug) => (
                    <SelectItem key={drug.id} value={drug.id}>
                      {drug.name} - {drug.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedDrug && (
            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{selectedDrug.category}</Badge>
                <Badge variant="outline">MRL: {selectedDrug.mrlLimit} μg/kg</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Withdrawal Period: {selectedDrug.withdrawalPeriod} days
              </p>
              {withdrawalDate && (
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium">Withdrawal Date: {withdrawalDate}</span>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dosage" data-testid="label-dosage">Dosage *</Label>
              <Input
                id="dosage"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.dosage}
                onChange={(e) => setFormData(prev => ({ ...prev, dosage: e.target.value }))}
                required
                data-testid="input-dosage"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dosageUnit" data-testid="label-dosage-unit">Unit</Label>
              <Select 
                value={formData.dosageUnit} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, dosageUnit: value }))}
                data-testid="select-dosage-unit"
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mg">mg</SelectItem>
                  <SelectItem value="ml">ml</SelectItem>
                  <SelectItem value="IU">IU</SelectItem>
                  <SelectItem value="mcg">mcg</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="route" data-testid="label-route">Administration Route *</Label>
              <Select 
                onValueChange={(value) => setFormData(prev => ({ ...prev, administrationRoute: value }))}
                data-testid="select-route"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select route" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="intramuscular">Intramuscular</SelectItem>
                  <SelectItem value="intravenous">Intravenous</SelectItem>
                  <SelectItem value="subcutaneous">Subcutaneous</SelectItem>
                  <SelectItem value="oral">Oral</SelectItem>
                  <SelectItem value="topical">Topical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="administrationDate" data-testid="label-admin-date">Administration Date *</Label>
              <Input
                id="administrationDate"
                type="date"
                value={formData.administrationDate}
                onChange={(e) => setFormData(prev => ({ ...prev, administrationDate: e.target.value }))}
                required
                data-testid="input-admin-date"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="veterinarian" data-testid="label-veterinarian">Veterinarian ID</Label>
              <Input
                id="veterinarian"
                placeholder="VET001"
                value={formData.veterinarianId}
                onChange={(e) => setFormData(prev => ({ ...prev, veterinarianId: e.target.value }))}
                data-testid="input-veterinarian"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" data-testid="label-notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes about the treatment..."
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              data-testid="textarea-notes"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !formData.animalId || !formData.drugId || !formData.dosage || !formData.administrationRoute}
              data-testid="button-submit"
            >
              {isSubmitting ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Recording...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Record Treatment
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}