import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, MoreHorizontal, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Animal {
  id: string;
  tagNumber: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  status: 'healthy' | 'treatment' | 'withdrawal' | 'cleared';
  lastTreatment?: string;
  withdrawalDate?: string;
}

interface AnimalRegistryTableProps {
  animals?: Animal[];
  onAddAnimal?: () => void;
  onViewAnimal?: (animal: Animal) => void;
}

const statusConfig = {
  healthy: { label: "Healthy", variant: "default" as const },
  treatment: { label: "Under Treatment", variant: "secondary" as const },
  withdrawal: { label: "Withdrawal Period", variant: "destructive" as const },
  cleared: { label: "Cleared", variant: "default" as const },
};

export function AnimalRegistryTable({ animals = [], onAddAnimal, onViewAnimal }: AnimalRegistryTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAnimals = animals.filter(animal =>
    animal.tagNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    console.log('Searching animals:', value); //todo: remove mock functionality
  };

  const handleAddAnimal = () => {
    console.log('Add new animal clicked'); //todo: remove mock functionality
    onAddAnimal?.();
  };

  const handleViewAnimal = (animal: Animal) => {
    console.log('View animal:', animal.id); //todo: remove mock functionality
    onViewAnimal?.(animal);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>Animal Registry</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search animals..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
                data-testid="input-search-animals"
              />
            </div>
            <Button onClick={handleAddAnimal} data-testid="button-add-animal">
              <Plus className="w-4 h-4 mr-2" />
              Add Animal
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tag Number</TableHead>
                <TableHead>Species</TableHead>
                <TableHead>Breed</TableHead>
                <TableHead>Age (months)</TableHead>
                <TableHead>Weight (kg)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Treatment</TableHead>
                <TableHead>Withdrawal Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnimals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    {searchTerm ? 'No animals found matching your search.' : 'No animals registered yet.'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredAnimals.map((animal) => {
                  const statusInfo = statusConfig[animal.status];
                  return (
                    <TableRow key={animal.id} data-testid={`row-animal-${animal.id}`}>
                      <TableCell className="font-medium" data-testid={`tag-${animal.id}`}>
                        {animal.tagNumber}
                      </TableCell>
                      <TableCell data-testid={`species-${animal.id}`}>{animal.species}</TableCell>
                      <TableCell data-testid={`breed-${animal.id}`}>{animal.breed}</TableCell>
                      <TableCell data-testid={`age-${animal.id}`}>{animal.age}</TableCell>
                      <TableCell data-testid={`weight-${animal.id}`}>{animal.weight}</TableCell>
                      <TableCell>
                        <Badge variant={statusInfo.variant} data-testid={`status-${animal.id}`}>
                          {statusInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell data-testid={`last-treatment-${animal.id}`}>
                        {animal.lastTreatment || '-'}
                      </TableCell>
                      <TableCell data-testid={`withdrawal-date-${animal.id}`}>
                        {animal.withdrawalDate || '-'}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" data-testid={`menu-${animal.id}`}>
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleViewAnimal(animal)} data-testid={`view-${animal.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem data-testid={`edit-${animal.id}`}>Edit Animal</DropdownMenuItem>
                            <DropdownMenuItem data-testid={`treatments-${animal.id}`}>View Treatments</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}