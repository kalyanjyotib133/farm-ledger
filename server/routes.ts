import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAnimalSchema, insertDrugSchema, insertDrugAdministrationSchema, insertMrlViolationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Animals API
  app.get("/api/animals", async (req, res) => {
    try {
      const animals = await storage.getAnimals();
      res.json(animals);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch animals" });
    }
  });

  app.post("/api/animals", async (req, res) => {
    try {
      const validatedData = insertAnimalSchema.parse(req.body);
      const animal = await storage.insertAnimal(validatedData);
      res.status(201).json(animal);
    } catch (error) {
      res.status(400).json({ error: "Invalid animal data" });
    }
  });

  app.get("/api/animals/:id", async (req, res) => {
    try {
      const animal = await storage.getAnimalById(req.params.id);
      if (!animal) {
        return res.status(404).json({ error: "Animal not found" });
      }
      res.json(animal);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch animal" });
    }
  });

  app.put("/api/animals/:id", async (req, res) => {
    try {
      const validatedData = insertAnimalSchema.parse(req.body);
      const animal = await storage.updateAnimal(req.params.id, validatedData);
      res.json(animal);
    } catch (error) {
      res.status(400).json({ error: "Invalid animal data" });
    }
  });

  app.delete("/api/animals/:id", async (req, res) => {
    try {
      await storage.deleteAnimal(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete animal" });
    }
  });

  // Drugs API
  app.get("/api/drugs", async (req, res) => {
    try {
      const drugs = await storage.getDrugs();
      res.json(drugs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch drugs" });
    }
  });

  app.post("/api/drugs", async (req, res) => {
    try {
      const validatedData = insertDrugSchema.parse(req.body);
      const drug = await storage.insertDrug(validatedData);
      res.status(201).json(drug);
    } catch (error) {
      res.status(400).json({ error: "Invalid drug data" });
    }
  });

  app.get("/api/drugs/:id", async (req, res) => {
    try {
      const drug = await storage.getDrugById(req.params.id);
      if (!drug) {
        return res.status(404).json({ error: "Drug not found" });
      }
      res.json(drug);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch drug" });
    }
  });

  // Drug Administrations API
  app.get("/api/administrations", async (req, res) => {
    try {
      const administrations = await storage.getDrugAdministrations();
      res.json(administrations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch administrations" });
    }
  });

  app.post("/api/administrations", async (req, res) => {
    try {
      const validatedData = insertDrugAdministrationSchema.parse(req.body);
      const administration = await storage.insertDrugAdministration(validatedData);
      res.status(201).json(administration);
    } catch (error) {
      res.status(400).json({ error: "Invalid administration data" });
    }
  });

  app.get("/api/administrations/:id", async (req, res) => {
    try {
      const administration = await storage.getDrugAdministrationById(req.params.id);
      if (!administration) {
        return res.status(404).json({ error: "Administration not found" });
      }
      res.json(administration);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch administration" });
    }
  });

  // MRL Violations API
  app.get("/api/violations", async (req, res) => {
    try {
      const violations = await storage.getMrlViolations();
      res.json(violations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch violations" });
    }
  });

  app.post("/api/violations", async (req, res) => {
    try {
      const validatedData = insertMrlViolationSchema.parse(req.body);
      const violation = await storage.insertMrlViolation(validatedData);
      res.status(201).json(violation);
    } catch (error) {
      res.status(400).json({ error: "Invalid violation data" });
    }
  });

  app.get("/api/violations/:id", async (req, res) => {
    try {
      const violation = await storage.getMrlViolationById(req.params.id);
      if (!violation) {
        return res.status(404).json({ error: "Violation not found" });
      }
      res.json(violation);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch violation" });
    }
  });

  app.put("/api/violations/:id", async (req, res) => {
    try {
      const violation = await storage.updateMrlViolation(req.params.id, req.body);
      res.json(violation);
    } catch (error) {
      res.status(400).json({ error: "Invalid violation data" });
    }
  });

  // Dashboard statistics API
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  // Recent activity API
  app.get("/api/dashboard/recent-activity", async (req, res) => {
    try {
      const activity = await storage.getRecentActivity();
      res.json(activity);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recent activity" });
    }
  });

  // Withdrawal period tracking API
  app.get("/api/withdrawals/active", async (req, res) => {
    try {
      const activeWithdrawals = await storage.getActiveWithdrawals();
      res.json(activeWithdrawals);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch active withdrawals" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
