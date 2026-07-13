# 📚 Hotel Booking & Management System

A production-grade, full-stack enterprise solution built to tackle the complex real-world challenges of hotel hospitality management. This project focuses deeply on resolving complex domain logic such as multi-conditioned booking algorithms, dynamic date-range allocations, strict timezone handling, and automated instant alerts to administration.

---

## 🎯 Architecture & Core Philosophy
As an aspiring engineer, my goal for this project was to move beyond basic CRUD applications and dive into architectural challenges:

* **Container / Representational Design Pattern:** Decoupled business logic and GraphQL state orchestration from the visual UI components, ensuring high code reusability and isolated unit testing.
* **Robust Enterprise Tech Stack:** Utilized TypeScript end-to-end to ensure type safety across database queries, business logic, and API states.

---

## ⚙️ Technical Challenges Addressed (Complex Problem Solving)

Unlike simple applications, a Hotel Booking System comes with heavy data-consistency constraints. Here is how I tackled them:

### 1. The Timezone & Date Range Collision Problem
* **The Challenge:** Handling dates across different user locations can lead to duplicate bookings, off-by-one-day errors, and incorrect pricing checkout.
* **The Solution:** Standardized all storage layers in UTC and integrated `date-fns` on the frontend to gracefully handle localization, calculate night intervals, and prevent overlapping checkout allocations booked by other clients simultaneously.

### 2. State Synchronization via GraphQL & Apollo Client
* **The Challenge:** Keeping real-time room availability updated without causing massive performance overhead or dynamic re-render lagging on layout views.
* **The Solution:** Utilized Apollo Client to cache complex queries and manage frontend states efficiently, resulting in lightning-fast UI updates upon successful room reservations.

### 3. Multiple File Preview & Client-Side Invoicing
* **The Challenge:** Providing instant client-side photo previews (Max 6 limit safeguards) during room creation without premature server requests, and generating reliable dynamic PDF invoices without relying on heavy server-side compute.
* **The Solution:** Leveraged the native HTML `FileReader` API for asynchronous Base64 data serialization and mapped it with `jsPDF` and `html2canvas-pro` to capture raw DOM nodes into downloadable receipts.

### 4. Asynchronous Live Telemetry & Instant WebSockets Alerting
* **The Challenge:** Syncing operational hotel event logs (like active checkout transactions) across decoupled admin screens requires immediate state push pipelines rather than relying on heavy REST polling lifecycles.
* **The Solution:** Layered structured native WebSocket networks (`graphql-ws`) on top of subscription routines to deliver sub-second global dashboard updates seamlessly.

---

## 🛠️ Complete Technical Stack & System Ecosystem

### Frontend Architecture
* **Language:** TypeScript (Strict Mode)
* **Framework:** React.js
* **State Management & Data Fetching:** Apollo Client (GraphQL)
* **UI & Components:** Tailwind CSS & Shadcn UI (Accessible design tokens)
* **Form & Validation Architecture:** React Hook Form integrated with strict Zod schemas
* **Date Utilities:** Date-fns (Complex interval and timezone parsing)
* **Client-Side PDF Compilation:** jsPDF & html2canvas-pro

### Backend Architecture (Server-Side)
* **Runtime & Package Orchestration:** Node.js managed natively via **pnpm workspaces** for highly atomic and cached package optimization.
* **API Runtime Layer:** Apollo Server v5 running on top of an Express v5 pipeline for an agile hybrid GraphQL/REST environment.
* **Security & Authorization Guardrails:** `graphql-shield` injected inside the runtime resolver lifecycle to govern robust Role-Based Access Controls (RBAC).
* **Data Persistence Engine:** MongoDB integrated via Mongoose v9 schemas for structured BSON indexing.
* **Third-Party Integrations:**
    * **Stripe SDK:** Facilitates end-to-end PCI-compliant financial transactions.
    * **Cloudinary SDK:** Handles high-speed multi-image optimization and background cloud CDN media transformations.
    * **Nodemailer:** Drives immediate template-bound notification receipts and credential recovery workflows.

---

## 🛡️ Unified Route Guarding via Custom Higher-Order Component (HOC)

* **The Challenge:** Protecting multiple frontend pages from unauthorized access and implementing Role-Based Access Control (RBAC) across distinct layouts without duplicating authorization check-logic inside every page lifecycle.
* **The Solution:** Engineered a flexible Higher-Order Component (`IsAuthenticated`) that wraps routing views to enforce dual-layered client-side security synchronized with Apollo Client Reactive Variables.

```typescript
import { useReactiveVar } from "@apollo/client/react";
import { isAuthenticatedVar, loadingVar, userInfoVar } from "@/apolllo/apolloVar.ts";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function IsAuthenticated(Component: React.ComponentType<any>, role?: string) {
    return function WrappedComponent(props: any) {
        const navigate = useNavigate();
        const isauthenticated = useReactiveVar(isAuthenticatedVar);
        const isGlobalLoading = useReactiveVar(loadingVar);
        const userInfo = useReactiveVar(userInfoVar);

        useEffect(() => {
            if (isGlobalLoading) return;
            
            // 1. Authentication Guard
            if (!isauthenticated) {
                navigate("/auth/login");
            }
            
            // 2. Role-Based Authorization Guard (RBAC)
            const hasRole = userInfo?.role?.some((rol => rol == role));
            if (role && !hasRole) {
                console.log("role is ", role);
                navigate("/");
            }
        }, [isauthenticated, isGlobalLoading, navigate]);

        // 3. UX State Management & Anti-Layout Flashing
        if (isGlobalLoading) {
            return <div className="h-screen w-screen flex items-center justify-center">Loading Application...</div>;
        }
        if (isGlobalLoading || !isauthenticated) {
            return null;
        }

        return <Component {...props}/>;
    };
}