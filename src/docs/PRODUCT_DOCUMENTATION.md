# Letwash Platform - Product Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Hierarchical Data Model](#hierarchical-data-model)
3. [User Roles & Permissions](#user-roles--permissions)
4. [Features by Role](#features-by-role)
5. [Customer Management](#customer-management)
6. [Service Management](#service-management)
7. [Branch Management](#branch-management)
8. [Campaign Management](#campaign-management)
9. [Booking & Calendar System](#booking--calendar-system)
10. [Analytics & Reporting](#analytics--reporting)
11. [Mobile App Integration](#mobile-app-integration)
12. [Data Scoping & Security](#data-scoping--security)

---

## System Overview

### Platform Description
Letwash is a comprehensive carwash management platform that enables multi-tenant operations with role-based access control. The platform supports a three-tier hierarchical structure: **ROOT OWNER** (platform level), **CARWASH OWNER** (company level), and **CARWASH ADMIN** (branch level).

### Key Features
- **Multi-tenant Architecture**: Complete data isolation between carwash companies
- **Hierarchical Data Model**: Clear parent-child relationships across all entities
- **Role-based Access Control**: Three distinct user roles with specific permissions
- **Dual Customer Management**: B2B (carwash companies) and B2C (car owners)
- **AI-Powered Campaigns**: Machine learning-based campaign suggestions
- **Mobile App Integration**: Customer-facing mobile application
- **Real-time Analytics**: Comprehensive reporting and insights
- **Capacity Planning**: Time-slot based booking with AI optimization

### Technology Stack
- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS v4.0
- **UI Components**: Custom component library with ShadCN
- **Charts**: Recharts library
- **State Management**: React hooks
- **Authentication**: Role-based with social login support

---

## Hierarchical Data Model

### Hierarchy Structure
```
ROOT OWNER (Platform Level)
└── root_owner_id: "root1"
    │
    ├── CARWASH OWNER 1 (Company Level)
    │   └── carwash_owner_id: "owner1"
    │       └── centerId: "1"
    │           │
    │           ├── BRANCH 1
    │           │   └── branchId: "b1"
    │           │       ├── Carwash Admin
    │           │       ├── Services
    │           │       ├── Packages
    │           │       ├── Customers (B2C)
    │           │       ├── Bookings
    │           │       └── Reviews
    │           │
    │           ├── BRANCH 2
    │           │   └── branchId: "b2"
    │           │
    │           └── BRANCH 3
    │               └── branchId: "b3"
    │
    ├── CARWASH OWNER 2 (Company Level)
    │   └── carwash_owner_id: "owner2"
    │       └── centerId: "2"
    │
    └── CARWASH OWNER 3 (Company Level)
        └── carwash_owner_id: "owner3"
            └── centerId: "3"
```

### Relationship Fields

#### 1. `root_owner_id`
- **Purpose**: Links all entities to the platform owner
- **Scope**: Platform-wide
- **Value**: Always "root1" in current system
- **Used By**: All entities (carwash centers, branches, customers, services, etc.)

#### 2. `carwash_owner_id`
- **Purpose**: Links branches and related data to parent company
- **Scope**: Company-wide
- **Value**: Unique identifier for each carwash company
- **Used By**: Branches, customers, bookings, campaigns, reviews

#### 3. `centerId`
- **Purpose**: Identifies the carwash center/company
- **Scope**: Company-wide
- **Value**: Same as the carwash company's `id`
- **Used By**: Branches, customers, services, packages

#### 4. `branchId`
- **Purpose**: Identifies specific branch/location
- **Scope**: Branch-level
- **Value**: Unique identifier for each branch
- **Used By**: Customers, bookings, reviews, carwash admins

### Data Isolation Rules

#### ROOT OWNER
- **Filter**: `root_owner_id = user.root_owner_id`
- **Access**: All carwash centers, all branches, all customers

#### CARWASH OWNER
- **Filter**: `carwash_owner_id = user.carwash_owner_id AND centerId = user.centerId`
- **Access**: Only their center and ALL branches under it

#### CARWASH ADMIN
- **Filter**: `carwash_owner_id = user.carwash_owner_id AND centerId = user.centerId AND branchId IN user.assignedBranches`
- **Access**: Only assigned branches (can have multiple)

---

## User Roles & Permissions

### 1. ROOT OWNER (Platform Administrator)

#### Access Level: Platform-wide

#### Capabilities
- ✅ View all carwash centers across the platform
- ✅ Manage standard services catalog (approve/reject/create)
- ✅ Manage standard packages catalog
- ✅ Approve/reject service requests from carwash owners
- ✅ View platform-wide analytics and revenue
- ✅ Manage all customers (B2B companies + B2C car owners)
- ✅ Create and manage global campaigns
- ✅ Monitor all bookings across the platform
- ✅ Access Customer Hub (unified B2B + B2C view)
- ✅ View all reviews and feedback

#### Dashboard Features
- Total active carwash centers
- Pending service requests
- Platform-wide customer count
- Total standard services
- Monthly platform revenue
- Active bookings across all centers

#### Navigation Menu
- Dashboard
- Customer Hub
- Service Management (Standard Services & Packages)
- Campaign Management (Global, AI Suggestions, Segmentation, QR & Affiliate)
- Platform Analytics

### 2. CARWASH OWNER (Company Administrator)

#### Access Level: Company-wide (all branches)

#### Capabilities
- ✅ Manage all branches under their company
- ✅ Create, edit, and delete branches
- ✅ Manage branch administrators
- ✅ Select and customize standard services
- ✅ Create custom packages
- ✅ Request new services (requires ROOT OWNER approval)
- ✅ Create and manage campaigns
- ✅ View company-wide analytics (all branches)
- ✅ Filter data by "All Branches" or specific branch
- ✅ Manage customers from all their branches
- ✅ View and respond to reviews from all branches
- ✅ Publish/unpublish branch information to mobile app

#### Dashboard Features
- Active services count
- Total packages
- Total branches
- Active campaigns
- Monthly bookings
- Revenue (company-wide)
- App-acquired customers
- App-generated revenue
- Peak time analytics with AI suggestions

#### Branch Filter
- **All Branches**: View aggregated data from all branches
- **Specific Branch**: View data for a single selected branch

#### Navigation Menu
- Dashboard
- Booking Calendar
- Analytics
- Revenue Management
- Employees Management
- Reviews & Feedback
- Campaign Management
- Services & Packages
- Branches
- People Management (Branch Admins)

### 3. CARWASH ADMIN (Branch Manager)

#### Access Level: Branch-level (assigned branches only)

#### Capabilities
- ✅ View assigned branches (can have multiple)
- ✅ Primary branch: Full edit permissions
- ✅ Sibling branches: View-only access
- ✅ Manage bookings for assigned branches
- ✅ View services and packages (no edit)
- ✅ View and respond to reviews for assigned branches
- ✅ Manage customers from assigned branches
- ✅ View branch-specific analytics
- ✅ Cannot create or edit branches
- ✅ Cannot manage other admins

#### Dashboard Features
- Branch name and center name
- Today's bookings
- Pending approval requests
- Active services (branch-specific)
- Total packages (branch-specific)
- Monthly revenue (branch-specific)
- Staff count
- Branch status (active/inactive)
- Peak time analytics (branch-specific)

#### View-Only Mode
When viewing sibling branches:
- 🔒 Cannot create bookings
- 🔒 Cannot edit bookings
- 🔒 Cannot change booking status
- ✅ Can view calendar and booking details
- ✅ Can view customer information

#### Navigation Menu
- Dashboard
- Booking Calendar
- Analytics
- Revenue Management
- Employees Management
- Reviews & Feedback
- Campaign Management

---

## Features by Role

### Dashboard

#### ROOT OWNER Dashboard
**Purpose**: Platform-wide oversight

**Metrics**:
- Total Centers: Count of active carwash companies
- Pending Requests: Service requests awaiting approval
- Total Customers: Platform-wide B2B + B2C customers
- Total Services: Standard services catalog size
- Monthly Revenue: Platform-wide revenue
- Active Bookings: Total bookings across platform

**Widgets**:
- Pending Service Requests table
- Platform statistics
- Revenue trends
- Center distribution map

#### CARWASH OWNER Dashboard
**Purpose**: Company performance monitoring

**Metrics**:
- Active Services: Enabled services count
- Total Packages: Custom packages created
- Total Branches: Number of locations
- Active Campaigns: Running marketing campaigns
- Monthly Bookings: Total reservations
- Revenue: Company-wide or branch-specific
- App Customers: Mobile app acquisitions
- App Revenue: Revenue from mobile bookings

**Widgets**:
- Peak Time Analytics
  - Current peak hours (3 time slots)
  - Current lowest hours (3 time slots)
  - Peak campaign performance
  - Lowest hour insights
  - AI campaign suggestions (3 recommendations)
- Recent bookings
- Upcoming appointments
- Branch performance comparison (when "All Branches" selected)

**Branch Filter Behavior**:
- **All Branches**: Shows aggregated company-wide data
- **Specific Branch**: Shows single branch data (similar to admin view)

#### CARWASH ADMIN Dashboard
**Purpose**: Branch operations management

**Metrics**:
- Branch Name & Center Name
- Today's Bookings
- Pending Requests
- Active Services (branch-specific)
- Total Packages (branch-specific)
- Monthly Revenue (branch-specific)
- Staff Count
- Branch Status

**Widgets**:
- Peak Time Analytics (branch-level)
- Today's appointments
- Pending approvals
- Recent completions

**Branch Selector**:
- Primary branch (with "Your Branch" badge) - Full edit access
- Sibling branches (with "View Only" label) - Read-only access

---

## Customer Management

### Customer Types

#### B2B Customers (Carwash Companies)
**Managed By**: ROOT OWNER only

**Attributes**:
- Company name
- Contact person
- Email & phone
- Address, city, district
- Branch count
- Account type (standard/premium)
- Company size (small/medium/large)
- Car types supported
- Service types offered
- Status (active/pending/disabled)
- Registration date

**Features**:
- Company profile management
- Branch overview
- Service catalog
- Status management (active/pending/disabled)
- Registration approval workflow

#### B2C Customers (Car Owners)
**Managed By**: All roles (with hierarchy filters)

**Attributes**:
- `root_owner_id`: Platform owner
- `carwash_owner_id`: Carwash company
- `centerId`: Carwash center
- `branchId`: Specific branch location
- Name, email, phone
- Car plate number
- Vehicle type
- Total bookings
- Total spent
- Last visit date
- Registration date
- Status (active/inactive)
- Branch name
- Center name

**Hierarchy Enforcement**:
```
ROOT OWNER:
  Filter: root_owner_id = user.root_owner_id
  Sees: All car owners across entire platform

CARWASH OWNER:
  Filter: carwash_owner_id = user.carwash_owner_id AND centerId = user.centerId
  Sees: Car owners from ALL branches under their company

CARWASH ADMIN:
  Filter: carwash_owner_id = user.carwash_owner_id AND centerId = user.centerId AND branchId IN assignedBranches
  Sees: Car owners from ONLY assigned branches
```

### Customer Hub (ROOT OWNER Only)

**Purpose**: Unified view of B2B and B2C customers

**Features**:
- Tabbed interface (B2B Clients / B2C Clients)
- Advanced filtering and search
- Customer segmentation
- Lifecycle management
- Export capabilities
- Analytics dashboard

---

## Service Management

### Standard Services (Global Catalog)

**Managed By**: ROOT OWNER

**Purpose**: Platform-wide service catalog that carwash owners can select from

**Attributes**:
- Service name
- Description
- Vehicle type pricing (array)
  - Vehicle type
  - Price
  - Duration
- Vehicle types supported
- Category
- Active status
- Created date
- Company name (if requested by company)

**Current Categories**:
- Wash (Basic, Premium, Express, Deluxe, Steam, Undercarriage)
- Detailing (Full, Engine Bay, Headlight Restoration, Paint Correction, Wheel, Clay Bar, Scratch Repair)
- Interior (Cleaning, Leather Treatment, Odor Removal, Pet Hair Removal)
- Protection (Ceramic Coating, Wax & Polish, Fabric Protection, PPF, Window Tinting, Windshield Treatment)
- Specialty (Convertible Top Care)

**Workflow**:
1. Carwash Owner requests new service
2. Service enters "pending" status
3. ROOT OWNER reviews and approves/rejects
4. If approved, added to standard catalog
5. All carwash owners can then select it

### Center Services (Company-Customized)

**Managed By**: CARWASH OWNER

**Purpose**: Company-specific service offerings selected from standard catalog

**Attributes**:
- Global service ID (reference to standard service)
- Custom price (can override standard price)
- Custom duration (can override standard duration)
- Active status
- Available branches (array of branch IDs)
- Category
- Vehicle types

**Workflow**:
1. Owner selects service from standard catalog
2. Customizes price and duration if needed
3. Selects which branches offer this service
4. Publishes to mobile app

### Standard Packages (Global Catalog)

**Managed By**: ROOT OWNER

**Purpose**: Pre-built service bundles recommended platform-wide

**Attributes**:
- Package name
- Description
- Included services (array)
- Vehicle type pricing (array)
  - Vehicle type
  - Price
  - Discounted price
  - Total duration
- Vehicle types supported
- Active status
- Created date

**Examples**:
- Complete Care Package: Full-service treatment
- Express Package: Quick wash with tire shine

### Center Packages (Company-Customized)

**Managed By**: CARWASH OWNER

**Purpose**: Custom service bundles created by companies

**Attributes**:
- Package name
- Description
- Included services (from center services)
- Vehicle type pricing
- Active status
- Available branches
- Vehicle types
- Rating (from customer reviews)
- Booking count

**Features**:
- Bundle multiple services
- Custom pricing (with discounts)
- Branch-specific availability
- Performance tracking

---

## Branch Management

### Branch Creation & Management

**Managed By**: CARWASH OWNER

**Branch Attributes**:
- `root_owner_id`: Platform owner
- `carwash_owner_id`: Parent company
- `centerId`: Company ID
- `branchId`: Unique branch identifier
- Name
- Address, city, district
- Phone, email
- Description
- Active status
- Operating hours (per day of week)
- Special days (holidays, events)
- Total staff
- Services count
- Packages count
- Created date

### Operating Hours Management

**Structure**:
```javascript
operatingHours: {
  monday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
  tuesday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
  wednesday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
  thursday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
  friday: { isOpen: true, openTime: "08:00", closeTime: "21:00" },
  saturday: { isOpen: true, openTime: "09:00", closeTime: "19:00" },
  sunday: { isOpen: true, openTime: "10:00", closeTime: "18:00" }
}
```

**Special Days**:
- Date
- Name (e.g., "Independence Day", "New Year")
- isOpen (boolean)
- Custom hours (if open)

### Branch Administrator Management

**Managed By**: CARWASH OWNER

**Admin Attributes**:
- Name, email, phone
- Primary branch ID
- Assigned branches (array) - can manage multiple
- Active status
- Address, city, district
- Emergency contact
- Experience/notes
- Created date

**Assignment Rules**:
- Each admin has ONE primary branch (full edit access)
- Can be assigned additional sibling branches (view-only access)
- Primary branch shows "Your Branch" badge
- Sibling branches show "View Only" label

### Branch Publishing

**Feature**: Publish/Unpublish branch profile to mobile app

**Controls**:
- Publish Changes: Make branch visible in mobile app
- Unpublish: Hide branch from mobile app (useful for maintenance)

**Status Indicator**: Shows whether branch is currently published

---

## Campaign Management

### Campaign Types by Role

#### ROOT OWNER - Global Campaigns

**Six Campaign Categories**:

##### 1. Global Campaigns
- Platform-wide campaigns
- Available to all carwash centers
- Metrics: Centers using, total revenue, conversions
- Scope: All Branches

**Example Campaigns**:
- Platform Launch Special (25% off for new centers)
- Spring Clean Premium (Seasonal campaigns)

##### 2. Car Owners Campaigns
- Customer targeting campaigns
- Customer distribution pie chart
- Campaign impact metrics

**Example Campaigns**:
- First Visit Special (30% off for new customers)
- Loyalty Rewards (20% for returning customers)
- Premium Plus (VIP exclusive offers)

##### 3. AI Campaign Suggestions
- Machine learning-based recommendations
- Targets low-traffic time slots
- Confidence score (79%-92%)
- Predicted impact metrics

**AI Analysis Includes**:
- Target time slot
- Discount recommendation
- Predicted booking increase
- Revenue potential
- Target customer segment
- Recommended duration
- AI reasoning explanation

**Example Suggestions**:
- Early Bird Express (6-8 AM, 30% off, 92% confidence)
- Midweek Boost (Tue-Thu 2-4 PM, $15 off, 87% confidence)

##### 4. Segmentation Campaigns
- Target specific customer groups

**Customer Segments**:
- VIP Customers (10+ visits, $156 avg spend, 68% conversion)
- New Customers (first timers, $45 avg spend, 42% conversion)
- Premium Buyers ($220 avg spend, 75% conversion)

##### 5. QR Code & Affiliate Marketing
**QR Campaigns**:
- Location-based QR codes
- Promotional QR codes
- Track scans, conversions, revenue
- Download and copy link functionality

**Affiliate Programs**:
- Partner referral tracking
- Commission management
- Track partners, referrals, conversions, revenue
- Examples: Auto Dealership Partners, Corporate Fleet Program

##### 6. Carwash Campaigns
- Monitor campaigns created by individual centers
- Platform-wide visibility
- Track center name, campaign, bookings, revenue

#### CARWASH OWNER & ADMIN - Standard Campaigns

**Campaign Features**:
- Campaign name
- Description
- Type (Percentage or Fixed Discount)
- Discount value
- Start date / End date
- Scope (All Branches or Specific Branches)
- Active status

**Dashboard Metrics**:
- Active campaigns count
- Total usage
- Campaign revenue
- Conversion rate

**Campaign Card Display**:
- Status name as title
- Large count number
- Performance metrics (usage, revenue, conversion)
- Available branches
- Edit and delete controls

---

## Booking & Calendar System

### Booking Statuses

**Complete Status Lifecycle**:

1. **Pending Approval** - Customer request awaiting confirmation
2. **Reserved** - Approved and confirmed booking
3. **AI Campaign** - Booking via AI-generated campaign
4. **Approved** - Admin-confirmed reservation
5. **In Progress** - Service currently being performed
6. **Completed** - Service finished successfully
7. **No Show** - Customer did not appear
8. **Canceled** - Booking canceled by customer or admin
9. **Rescheduled** - Booking moved to different time

### Status Cards (Calendar View)

**Enhanced Display**:
- Status name as title (top of card)
- Large count number (prominent display)
- "bookings" label (context)
- Colored status indicator dot
- Hover effect for interactivity

**Location**: Right sidebar (desktop only, xl screens+)

### Calendar Views

#### Daily View
- 30-minute time slots (8:00 AM - 8:00 PM)
- Multiple stations (up to 6)
- AI campaign suggestions overlays
- Special day indicators
- Working hours visualization

#### Weekly View
- 7-day grid
- Per-day working hours
- Special days highlighted
- Booking distribution
- Capacity utilization

#### Monthly View
- Full month calendar
- Daily booking counts
- Special days marked
- Quick booking overview

### Booking Management

**Actions by Status**:

**Pending Approval**:
- Accept → Reserved
- Decline → Canceled
- Customer Did Not Appear → No Show

**Reserved/Approved**:
- Start Service → In Progress
- Cancel → Canceled
- Customer Did Not Appear → No Show

**In Progress**:
- Mark Completed → Completed

**Rescheduled**:
- Start → In Progress
- Cancel → Canceled
- Customer Did Not Appear → No Show

### AI Campaign Integration

**Peak Time Analytics**:
- Current Peak Hours (3 time slots)
  - Booking count
  - Revenue generated
  - Utilization rate
- Current Lowest Hours (3 time slots)
  - Opportunity revenue
  - Potential growth percentage
  - Average capacity used

**AI Suggestions Displayed**:
- Campaign name
- Target time slot
- Discount value
- Predicted booking increase
- Confidence score
- Target customer segment
- AI reasoning
- One-click deployment

**Special Day Campaigns**:
- Automatic detection of holidays
- Special event campaigns
- Increased discount recommendations
- Limited-time offers

### Capacity Planning

**Station Management**:
- 6 stations maximum
- Station names customizable
- Per-station booking visualization
- Conflict detection

**Time Slot System**:
- 30-minute granularity
- Service duration consideration
- Automatic blocking of conflicting slots
- Real-time availability updates

### Branch-Level Permissions

**CARWASH OWNER**:
- ✅ Full booking management across all branches
- ✅ Create, edit, delete bookings
- ✅ Change booking status
- ✅ View all branches when "All Branches" selected
- ✅ View specific branch when filtered

**CARWASH ADMIN**:
- ✅ Full management for primary branch
- ✅ Create, edit, delete bookings (primary branch only)
- ✅ Change status (primary branch only)
- 🔒 View-only for sibling branches
- 🔒 Cannot modify sibling branch bookings
- ⚠️ Warning banner shown in view-only mode

---

## Analytics & Reporting

### Analytics Management

**Available To**: All roles (with hierarchy filtering)

**Dashboard Sections**:

#### Revenue Analytics
- Total revenue trends
- Revenue by service type
- Revenue by vehicle type
- Top performing services
- Monthly comparisons
- Growth rates

#### Booking Analytics
- Total bookings over time
- Booking status distribution
- Peak booking times
- Service popularity
- Customer retention metrics
- Conversion funnels

#### Customer Analytics
- New vs. returning customers
- Customer lifetime value
- Customer segmentation
- Acquisition channels
- Customer satisfaction scores
- Review ratings distribution

#### Service Performance
- Service utilization rates
- Average service duration
- Service revenue contribution
- Package vs. individual service comparison
- Seasonal trends

### Revenue Management

**Available To**: All roles (with hierarchy filtering)

**Features**:
- Daily revenue tracking
- Revenue by branch (if owner)
- Revenue by service category
- Payment method distribution
- Discount impact analysis
- Revenue forecasting
- Refund tracking

**Metrics**:
- Gross revenue
- Net revenue
- Average transaction value
- Revenue per booking
- Revenue per customer
- Discount redemption rate

### Employees Management

**Available To**: All roles (with hierarchy filtering)

**Features**:
- Employee roster
- Performance tracking
- Service assignments
- Working hours management
- Attendance tracking
- Commission calculations
- Performance metrics

**Employee Metrics**:
- Bookings handled
- Revenue generated
- Customer satisfaction
- Average service time
- Efficiency rating

---

## Mobile App Integration

### Mobile Preview

**Access**: All roles (button on dashboard or navigation)

**Features**:
- Real-time preview of customer-facing mobile app
- Shows published branch information
- Displays active services and packages
- Shows current campaigns
- Review display
- Booking interface preview

**Preview Data**:
- Center name and branding
- Rating and review count
- Address and operating hours
- Open/closed status
- Service catalog with pricing
- Package offerings
- Customer reviews
- Booking availability

### Publishing Workflow

**Branch Publishing**:
1. Edit branch information
2. Configure services and packages
3. Set operating hours
4. Click "Publish Changes"
5. Branch appears in mobile app
6. Click "Unpublish" to hide from app

**Service Publishing**:
1. Select services from standard catalog
2. Customize pricing
3. Choose available branches
4. Services automatically appear in mobile app for selected branches

**Package Publishing**:
1. Create package with services
2. Set pricing for vehicle types
3. Choose available branches
4. Packages automatically appear in mobile app

---

## Data Scoping & Security

### No Cross-Tenant Data Leakage

**Principle**: Each carwash owner can ONLY see their own company data

**Enforcement**:
- All queries filter by `carwash_owner_id`
- Branch admins additionally filter by `branchId`
- ROOT OWNER sees all via `root_owner_id`

### Visual Hierarchy Order

**All UI Components Display**:
```
ROOT OWNER → CARWASH OWNER (Company) → BRANCH
```

**Examples**:
- Dropdowns show hierarchy
- Filters maintain order
- Tables sort by hierarchy
- Breadcrumbs follow structure

### Data Filtering Examples

#### Branches
```javascript
// ROOT OWNER
branches.filter(b => b.root_owner_id === user.root_owner_id)

// CARWASH OWNER
branches.filter(b => 
  b.carwash_owner_id === user.carwash_owner_id && 
  b.centerId === user.centerId
)

// CARWASH ADMIN
branches.filter(b => 
  b.carwash_owner_id === user.carwash_owner_id &&
  b.centerId === user.centerId &&
  user.assignedBranches.includes(b.id)
)
```

#### Customers
```javascript
// ROOT OWNER - All customers (B2B + B2C)
customers.filter(c => c.root_owner_id === user.root_owner_id)

// CARWASH OWNER - Only B2C from all branches
customers.filter(c => 
  c.carwash_owner_id === user.carwash_owner_id &&
  c.centerId === user.centerId
)

// CARWASH ADMIN - Only B2C from assigned branches
customers.filter(c => 
  c.carwash_owner_id === user.carwash_owner_id &&
  c.centerId === user.centerId &&
  user.assignedBranches.includes(c.branchId)
)
```

#### Bookings
```javascript
// All roles use same pattern as customers
// Additional filter by date, status, etc.
```

### Security Best Practices

**Authentication**:
- Role-based login pages
- Email/password authentication
- Social login support (Google, Apple)
- Session management

**Authorization**:
- Every API call checks user role
- Filters applied at data layer
- UI elements hidden based on permissions
- Actions disabled for unauthorized users

**Data Validation**:
- All IDs validated before queries
- Parent-child relationships enforced
- Cascading deletes handled properly
- Orphaned records prevented

---

## Review & Feedback Management

### Review Features

**Available To**: All roles (with hierarchy filtering)

**Review Attributes**:
- Customer ID and name
- Rating (1-5 stars)
- Review text
- Photos (up to 10)
- Service name
- Branch ID and name
- Date
- Status (published/pending/hidden)
- Response (optional)
- Helpful/Not helpful counts
- Verified purchase badge

### Review Management

**Actions**:
- Respond to reviews
- Toggle visibility (publish/hide)
- Filter by branch
- Filter by rating
- Filter by status
- Export reviews

**Response Features**:
- Response text
- Responded by (user/team name)
- Response date
- Edit response
- Delete response

### Review Analytics

**Metrics**:
- Average rating
- Total reviews
- Rating distribution (5★, 4★, 3★, 2★, 1★)
- Response rate
- Average response time
- Helpful vote ratio

---

## Product Website & Marketing

### Product Entrance Page

**Access**: Available from login type selector

**Features**:
- Comprehensive platform overview
- Interactive one-page website (Confluence-style)
- Role descriptions with capabilities
- Feature highlights
- System architecture visualization
- Pricing plans
- Call-to-action buttons

**Content Sections**:

#### Hero Section
- Platform tagline and value proposition
- Quick statistics (500+ branches, 98% satisfaction, etc.)
- Primary CTA buttons

#### Overview Section
- Multi-tenant architecture
- Role-based access control
- Mobile app integration
- Key benefits and features

#### Roles Section
- Detailed breakdown of ROOT OWNER capabilities
- CARWASH OWNER responsibilities
- CARWASH ADMIN permissions
- Access level comparisons

#### Features Section
- Smart Booking System
- AI Campaign Engine
- Real-Time Analytics
- Service Management
- Review Management
- Branch Management

#### Hierarchy Section
- Visual representation of data model
- Parent-child relationships
- Data scoping rules
- Security guarantees

#### Pricing Section
- Starter Plan ($99/month)
- Professional Plan ($299/month)
- Enterprise Plan (Custom)
- Feature comparison

**Navigation**:
- Sticky header with smooth scroll
- Back to Login button
- Direct navigation to role-specific login
- Footer with additional links

---

## Registration & Onboarding

### Carwash Owner Registration

**Flow**:
1. Select "Carwash Owner" from login type selector
2. Fill registration form:
   - Center name
   - Contact person
   - Email, phone
   - Address details
   - Car types supported
   - Service types offered
3. Submit for approval
4. Status: "Pending"
5. ROOT OWNER reviews
6. Status: "Active" or "Rejected"

**Social Registration**:
- Google/Apple sign-in
- Auto-fill basic info
- Complete additional business details
- Submit for approval

### Branch Admin Creation

**Flow** (by CARWASH OWNER):
1. Navigate to People Management
2. Click "Add Branch Admin"
3. Fill admin details:
   - Name, email, phone
   - Select primary branch
   - Optionally assign additional branches
   - Add experience/notes
4. Admin receives login credentials
5. Admin can access assigned branches

---

## System Configuration

### Design System

**Colors**:
- Primary: `#030213` (dark)
- Secondary: `#ececf0` (light gray)
- Muted: `#717182` (medium gray)
- Success: `#00a63e` (green)
- Destructive: `#d4183d` (red)
- Accent Blue: `#155DFC`
- Accent Purple: `#9810FA`

**Typography**:
- Base size: 14px
- Headings: Medium weight (500)
- Body: Normal weight (400)
- Line height: 1.5

**Status Colors**:
- Pending Approval: Blue (`#2563eb`)
- Reserved: Green (`#00a63e`)
- AI Campaign: Purple (`#9810FA`)
- Approved: Cyan (`#06b6d4`)
- In Progress: Orange (`#ea580c`)
- Completed: Emerald (`#059669`)
- No Show: Gray (`#64748b`)
- Canceled: Red (`#dc2626`)
- Rescheduled: Amber (`#d97706`)

### Responsive Design

**Breakpoints**:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: 1024px - 1280px
- Large Desktop: ≥ 1280px (xl)

**Mobile-Specific**:
- Bottom navigation (5 items)
- Collapsible sidebar
- Touch-optimized buttons
- Drawer for insights (calendar)
- Responsive tables
- Stacked layouts

---

## Future Enhancements

### Planned Features
- [ ] Multi-language support
- [ ] Payment gateway integration
- [ ] SMS notifications
- [ ] Email marketing automation
- [ ] Advanced AI recommendations
- [ ] Customer loyalty programs
- [ ] Inventory management
- [ ] Staff scheduling system
- [ ] Vehicle maintenance tracking
- [ ] Integration with car dealerships

### API Integrations
- [ ] Payment processors (Stripe, PayPal)
- [ ] SMS services (Twilio)
- [ ] Email services (SendGrid)
- [ ] Maps (Google Maps)
- [ ] Analytics (Google Analytics)

---

## Appendix

### Mock Data Structure

**User Roles**:
- Root Owner: `root@letwash.com` / `root123`
- Carwash Owner: `owner@autowash.com` / `owner123`
- Carwash Admin: `admin@autowash.com` / `admin123`

**Sample Companies**:
1. AutoWash Pro (3 branches)
2. Clean & Shine (1 branch)
3. SpeedWash Express (5 branches)
4. EcoClean Wash (2 branches)

**Sample Branches**:
- b1: Downtown Branch (AutoWash Pro)
- b2: Uptown Branch (AutoWash Pro)
- b3: Brooklyn Branch (AutoWash Pro)
- b4: Main Branch (Clean & Shine)
- b5-b9: SpeedWash Express branches
- b10-b11: EcoClean Wash branches

### Glossary

**Terms**:
- **B2B Customer**: Carwash company/center (business customer)
- **B2C Customer**: Car owner (end-user customer)
- **Center**: Carwash company (same as carwash_owner)
- **Branch**: Physical location of carwash
- **Standard Service**: Global service in platform catalog
- **Center Service**: Customized service selected by company
- **Campaign**: Marketing promotion with discounts
- **Peak Time**: High-traffic time slots
- **AI Suggestion**: Machine learning campaign recommendation
- **Hierarchy**: ROOT OWNER → CARWASH OWNER → BRANCH structure

---

**Document Version**: 1.0  
**Last Updated**: January 2024  
**Platform**: Letwash Carwash Management System
