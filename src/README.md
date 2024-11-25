# Project Overview

This project uses **TypeScript** and follows a **3-tier architecture** while adhering
to **SOLID principles**. It emphasizes concepts such as **single responsibility**,
**dependency injection**, and **inversion of control** to ensure scalability and
maintainability.

---

## Key Principles

- **Single Responsibility**: Each class has a well-defined responsibility.
- **Dependency Injection**: Dependencies are injected rather than hardcoded,
  improving testability.
- **Inversion of Control (IoC)**: Dependencies are managed externally, promoting
  loose coupling between components.

---

## Project Structure

### 1. **Handlers**

- **Purpose**: Expose API endpoints.
- **Location**: `src/handlers`
- **Details**:
  - Each class within this folder handles specific routes or endpoints.
  - The `handlers.ts` file instantiates all handler classes and exports
    them for use in the main application.

### 2. **Services**

- **Purpose**: Contain business logic and core application functionality.
- **Location**: `src/services`
- **Details**:
  - Classes here encapsulate the core business rules.
  - The `services.ts` file instantiates and manages service class dependencies.

### 3. **Stores**

- **Purpose**: Communicate with the database and manage data operations.
- **Location**: `src/stores`
- **Details**:
  - These classes abstract database access and operations.
  - The `stores.ts` file creates instances of all store classes, ensuring centralized management.

---

## Technologies

- **Language**: TypeScript
- **Architecture**: 3-Tier
- **Design Principles**: SOLID (Single Responsibility, Open/Closed, Liskov Substitution,
  Interface Segregation, Dependency Inversion)

---
