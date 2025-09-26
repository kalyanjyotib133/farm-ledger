import { AnimalRegistryTable } from '../AnimalRegistryTable';

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
  }
];

export default function AnimalRegistryTableExample() {
  return (
    <div className="p-6">
      <AnimalRegistryTable 
        animals={mockAnimals}
        onAddAnimal={() => console.log('Add animal triggered')}
        onViewAnimal={(animal) => console.log('View animal:', animal.tagNumber)}
      />
    </div>
  );
}