import { 
  type User, 
  type InsertUser,
  type Animal,
  type InsertAnimal,
  type Drug,
  type InsertDrug,
  type DrugAdministration,
  type InsertDrugAdministration,
  type MrlViolation,
  type InsertMrlViolation
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Animal methods
  getAnimals(): Promise<Animal[]>;
  getAnimalById(id: string): Promise<Animal | undefined>;
  insertAnimal(animal: InsertAnimal): Promise<Animal>;
  updateAnimal(id: string, animal: InsertAnimal): Promise<Animal>;
  deleteAnimal(id: string): Promise<void>;

  // Drug methods
  getDrugs(): Promise<Drug[]>;
  getDrugById(id: string): Promise<Drug | undefined>;
  insertDrug(drug: InsertDrug): Promise<Drug>;

  // Drug Administration methods
  getDrugAdministrations(): Promise<DrugAdministration[]>;
  getDrugAdministrationById(id: string): Promise<DrugAdministration | undefined>;
  insertDrugAdministration(administration: InsertDrugAdministration): Promise<DrugAdministration>;

  // MRL Violation methods
  getMrlViolations(): Promise<MrlViolation[]>;
  getMrlViolationById(id: string): Promise<MrlViolation | undefined>;
  insertMrlViolation(violation: InsertMrlViolation): Promise<MrlViolation>;
  updateMrlViolation(id: string, violation: Partial<InsertMrlViolation>): Promise<MrlViolation>;

  // Dashboard methods
  getDashboardStats(): Promise<any>;
  getRecentActivity(): Promise<any>;
  getActiveWithdrawals(): Promise<any>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private animals: Map<string, Animal>;
  private drugs: Map<string, Drug>;
  private drugAdministrations: Map<string, DrugAdministration>;
  private mrlViolations: Map<string, MrlViolation>;

  constructor() {
    this.users = new Map();
    this.animals = new Map();
    this.drugs = new Map();
    this.drugAdministrations = new Map();
    this.mrlViolations = new Map();
    
    this.seedInitialData();
  }

  private seedInitialData() {
    // Add sample animals
    const animal1: Animal = {
      id: randomUUID(),
      tagId: "COW-001",
      species: "Cattle",
      breed: "Holstein",
      birthDate: new Date("2022-03-15"),
      weight: "580.50",
      location: "Barn A-1",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const animal2: Animal = {
      id: randomUUID(),
      tagId: "COW-002", 
      species: "Cattle",
      breed: "Angus",
      birthDate: new Date("2021-11-22"),
      weight: "642.75",
      location: "Pasture B",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.animals.set(animal1.id, animal1);
    this.animals.set(animal2.id, animal2);

    // Add sample drugs
    const drug1: Drug = {
      id: randomUUID(),
      name: "Penicillin G",
      activeIngredient: "Penicillin",
      category: "Antibiotic",
      withdrawalPeriodMilk: 96,
      withdrawalPeriodMeat: 10,
      mrlLimitMilk: "4.0000",
      mrlLimitMeat: "50.0000",
      dosageForm: "Injectable",
      manufacturer: "VetPharm Ltd",
      isActive: true,
      createdAt: new Date(),
    };

    const drug2: Drug = {
      id: randomUUID(),
      name: "Oxytetracycline",
      activeIngredient: "Oxytetracycline",
      category: "Antibiotic",
      withdrawalPeriodMilk: 72,
      withdrawalPeriodMeat: 21,
      mrlLimitMilk: "100.0000",
      mrlLimitMeat: "300.0000",
      dosageForm: "Injectable",
      manufacturer: "AgriVet Corp",
      isActive: true,
      createdAt: new Date(),
    };

    this.drugs.set(drug1.id, drug1);
    this.drugs.set(drug2.id, drug2);
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Animal methods
  async getAnimals(): Promise<Animal[]> {
    return Array.from(this.animals.values());
  }

  async getAnimalById(id: string): Promise<Animal | undefined> {
    return this.animals.get(id);
  }

  async insertAnimal(animal: InsertAnimal): Promise<Animal> {
    const id = randomUUID();
    const newAnimal: Animal = {
      ...animal,
      id,
      status: animal.status || "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.animals.set(id, newAnimal);
    return newAnimal;
  }

  async updateAnimal(id: string, animal: InsertAnimal): Promise<Animal> {
    const existing = this.animals.get(id);
    if (!existing) {
      throw new Error("Animal not found");
    }
    const updated: Animal = {
      ...existing,
      ...animal,
      updatedAt: new Date(),
    };
    this.animals.set(id, updated);
    return updated;
  }

  async deleteAnimal(id: string): Promise<void> {
    this.animals.delete(id);
  }

  // Drug methods
  async getDrugs(): Promise<Drug[]> {
    return Array.from(this.drugs.values());
  }

  async getDrugById(id: string): Promise<Drug | undefined> {
    return this.drugs.get(id);
  }

  async insertDrug(drug: InsertDrug): Promise<Drug> {
    const id = randomUUID();
    const newDrug: Drug = {
      ...drug,
      id,
      isActive: drug.isActive ?? true,
      createdAt: new Date(),
    };
    this.drugs.set(id, newDrug);
    return newDrug;
  }

  // Drug Administration methods
  async getDrugAdministrations(): Promise<DrugAdministration[]> {
    return Array.from(this.drugAdministrations.values());
  }

  async getDrugAdministrationById(id: string): Promise<DrugAdministration | undefined> {
    return this.drugAdministrations.get(id);
  }

  async insertDrugAdministration(administration: InsertDrugAdministration): Promise<DrugAdministration> {
    const id = randomUUID();
    const newAdministration: DrugAdministration = {
      ...administration,
      id,
      reason: administration.reason || null,
      notes: administration.notes || null,
      createdAt: new Date(),
    };
    this.drugAdministrations.set(id, newAdministration);
    return newAdministration;
  }

  // MRL Violation methods
  async getMrlViolations(): Promise<MrlViolation[]> {
    return Array.from(this.mrlViolations.values());
  }

  async getMrlViolationById(id: string): Promise<MrlViolation | undefined> {
    return this.mrlViolations.get(id);
  }

  async insertMrlViolation(violation: InsertMrlViolation): Promise<MrlViolation> {
    const id = randomUUID();
    const newViolation: MrlViolation = {
      ...violation,
      id,
      status: violation.status || "open",
      createdAt: new Date(),
    };
    this.mrlViolations.set(id, newViolation);
    return newViolation;
  }

  async updateMrlViolation(id: string, violation: Partial<InsertMrlViolation>): Promise<MrlViolation> {
    const existing = this.mrlViolations.get(id);
    if (!existing) {
      throw new Error("Violation not found");
    }
    const updated: MrlViolation = {
      ...existing,
      ...violation,
    };
    this.mrlViolations.set(id, updated);
    return updated;
  }

  // Dashboard methods
  async getDashboardStats(): Promise<any> {
    const totalAnimals = this.animals.size;
    const activeAdministrations = Array.from(this.drugAdministrations.values()).length;
    const openViolations = Array.from(this.mrlViolations.values()).filter(v => v.status === "open").length;
    const availableDrugs = this.drugs.size;

    return {
      totalAnimals,
      activeAdministrations,
      openViolations,
      availableDrugs,
      complianceRate: openViolations === 0 ? 100 : Math.max(0, 100 - (openViolations / totalAnimals) * 100),
    };
  }

  async getRecentActivity(): Promise<any> {
    const recentAdministrations = Array.from(this.drugAdministrations.values())
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
      .slice(0, 5);

    return recentAdministrations.map(admin => ({
      id: admin.id,
      type: "administration",
      description: `Drug administered to animal`,
      timestamp: admin.createdAt,
      animalId: admin.animalId,
      drugId: admin.drugId,
    }));
  }

  async getActiveWithdrawals(): Promise<any> {
    const now = new Date();
    const activeWithdrawals = Array.from(this.drugAdministrations.values())
      .filter(admin => {
        const milkDeadline = admin.withdrawalDeadlineMilk ? new Date(admin.withdrawalDeadlineMilk) : null;
        const meatDeadline = admin.withdrawalDeadlineMeat ? new Date(admin.withdrawalDeadlineMeat) : null;
        
        return (milkDeadline && milkDeadline > now) || (meatDeadline && meatDeadline > now);
      })
      .map(admin => ({
        id: admin.id,
        animalId: admin.animalId,
        drugId: admin.drugId,
        administrationDate: admin.administrationDate,
        withdrawalDeadlineMilk: admin.withdrawalDeadlineMilk,
        withdrawalDeadlineMeat: admin.withdrawalDeadlineMeat,
      }));

    return activeWithdrawals;
  }
}

export const storage = new MemStorage();
