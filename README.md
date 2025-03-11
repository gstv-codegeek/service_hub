# 📖 ServiceHub - Service Listing & Booking API

## 📝 Project Description

**ServiceHub** is a comprehensive **Service Listing and Booking API** built using **Spring Boot**. The platform enables administrators to onboard and manage **providerService providers** and their services. Customers can browse listed services, book appointments, track bookings, and leave reviews. The application also supports **notifications**, **payment tracking**, and **audit logging** for administrative transparency.

This project serves as a foundation for building **marketplace-style platforms** for local services, enabling seamless interaction between providerService providers and customers.

---

## ✨ Key Features

### 👥 User Roles
- **Admin** - Manages providerService providers, services, and monitors platform activity.
- **Service Provider** - Lists services and manages bookings received from customers.
- **Customer** - Browses services, books appointments, and leaves reviews.

### 📚 Core Functionalities
- **Service Listing** - Service providers can list services with details such as description, price, and category.
- **Service Booking** - Customers can book available services, and providerService providers get notified.
- **Reviews & Ratings** - Customers can rate and review services they’ve booked.
- **Notifications** - Users receive notifications for booking confirmations, cancellations, and providerService updates.
- **Payments (optional)** - Tracks payments made for services.
- **Audit Logs** - Admin can view logs of key actions performed on the platform.

---

## 🛠️ Technology Stack

| Technology | Description |
|---|---|
| **Java 21** | Core programming language |
| **Spring Boot 3.*** | Application framework |
| **Spring Data JPA** | ORM and database access |
| **Spring Security** | Authentication & authorization |
| **MySQL** | Primary relational database |
| **Hibernate** | ORM provider |
| **Maven** | Dependency management |

---

## ⚙️ System Architecture

The application follows a **layered architecture**:

- **Controller Layer** - Handles incoming API requests.
- **Service Layer** - Contains business logic.
- **Repository Layer** - Communicates with the database.
- **Entity Layer** - Defines entity structures and relationships.
- **DTO Layer** - Used to expose data structures via APIs.

---

## 🧩 Database Models

| Entity | Description |
|---|---|
| **User** | Base class for Admin, ServiceProvider, Customer |
| **Service** | Service provided by a providerService provider |
| **ServiceCategory** | Categories like cleaning, plumbing, etc. |
| **Booking** | Service booking made by a customer |
| **Review** | Reviews and ratings from customers |
| **Notification** | Notifications to users |
| **Payment** | Tracks payments for bookings |
| **AuditLog** | Logs administrative actions |

---

## 🔐 Authentication & Authorization

- **User Authentication** - Handled via **Spring Security**.
- **UserDetailsService** - Loads users from the database using **email** as the username.
- **Role-based Authorization** - Users have roles (`ROLE_ADMIN`, `ROLE_CUSTOMER`, `ROLE_SERVICE_PROVIDER`), which determine access rights to endpoints.

---

## 📥 API Endpoints

| Method | Endpoint | Description | Roles |
|---|---|---|---|
| `POST` | `/api/services` | Create a new providerService | `SERVICE_PROVIDER` |
| `GET` | `/api/services` | Get all services | `ANY` |
| `POST` | `/api/bookings` | Book a providerService | `CUSTOMER` |
| `POST` | `/api/reviews` | Leave a review for a providerService | `CUSTOMER` |
| `GET` | `/api/audit-logs` | View audit logs | `ADMIN` |

---

## 🔄 Role & Inheritance Structure

The system uses **Single Table Inheritance** for user management.

| User Type | Description |
|---|---|
| **Admin** | Platform administrator with full management access |
| **Service Provider** | User who lists services and manages bookings |
| **Customer** | User who browses services and makes bookings |

All these types share a common **User** table, with `user_type` column differentiating them.

---

## 🔔 Notifications

- **Booking Confirmations**
- **Booking Cancellations**
- **Service Updates**
- **Reminders**

---

## 💳 Payment Tracking

- Payments can be logged and tracked for completed bookings.
- Example fields: `amount`, `status` (`PENDING`, `COMPLETED`, `FAILED`), `paymentMethod`.

---
