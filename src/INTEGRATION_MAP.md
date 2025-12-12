# 🗺️ PHASE 2 INTEGRATION MAP

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         APP.TSX (Main)                          │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    STATE MANAGEMENT                       │  │
│  │                                                           │  │
│  │  • mockReservations: Reservation[]                       │  │
│  │  • showReservationForm: boolean                          │  │
│  │  • reservationFormData: FormData                         │  │
│  │  • showAlternativeSuggestionDialog: boolean              │  │
│  │  • selectedReservationForSuggestion: Reservation         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    EVENT HANDLERS                         │  │
│  │                                                           │  │
│  │  handleNewReservationRequest(stationId, timeSlot)  ────┐ │  │
│  │  handleReservationSubmit(data)                     ────┤ │  │
│  │  handleApproveReservation(id)                      ────┤ │  │
│  │  handleRejectReservation(id, reason)               ────┤ │  │
│  │  handleSuggestAlternative(id)                      ────┤ │  │
│  │  handleSubmitAlternativeSuggestion(data)           ────┤ │  │
│  │  handleCheckIn(id, method)                         ────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Provides state & handlers to:
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌────────────────┐    ┌──────────────┐
│   CALENDAR    │    │  RESERVATIONS  │    │  CHECK-IN    │
│     PAGE      │    │      PAGE      │    │     PAGE     │
└───────────────┘    └────────────────┘    └──────────────┘
        │                     │                     │
        └─────────────────────┴─────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
          ┌──────────────────┐  ┌─────────────────┐
          │  GLOBAL DIALOGS  │  │   UI COMPONENTS │
          └──────────────────┘  └─────────────────┘
```

---

## Component Hierarchy

```
App.tsx
│
├── AdminLayout
│   ├── ModernAdminSidebar
│   │   └── Navigation Menu
│   │       ├── Operations
│   │       │   ├── Calendar & Bookings
│   │       │   ├── Live Operations
│   │       │   ├── Reservations ✨ NEW
│   │       │   └── Capacity Planning
│   │       └── ...
│   │
│   └── Page Content
│       │
│       ├── Calendar Page
│       │   └── ModuleAwareCalendarView
│       │       ├── onNewReservation → handleNewReservationRequest()
│       │       └── Shows mockReservations
│       │
│       ├── Reservations Page ✨ NEW
│       │   └── ApprovalDashboard
│       │       ├── reservations={mockReservations}
│       │       ├── onApprove → handleApproveReservation()
│       │       ├── onReject → handleRejectReservation()
│       │       └── onSuggestAlternative → handleSuggestAlternative()
│       │
│       └── Check-In Page ✨ NEW
│           └── CheckInInterface
│               ├── reservation={filtered reservations}
│               └── onCheckIn → handleCheckIn()
│
└── Global Dialogs (Outside AdminLayout)
    │
    ├── Reservation Form Dialog ✨ NEW
    │   └── ReservationRequestForm
    │       ├── Pre-filled data from reservationFormData
    │       ├── onSubmit → handleReservationSubmit()
    │       └── onCancel → Close dialog
    │
    └── Alternative Suggestion Dialog ✨ NEW
        └── AlternativeSuggestionDialog
            ├── reservation={selectedReservationForSuggestion}
            └── onSuggest → handleSubmitAlternativeSuggestion()
```

---

## Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                     RESERVATION LIFECYCLE                        │
└──────────────────────────────────────────────────────────────────┘

1. CREATE REQUEST
   ┌──────────────┐
   │   Calendar   │ Click time slot
   └──────┬───────┘
          │
          ├─→ handleNewReservationRequest(stationId, timeSlot)
          │
          ▼
   ┌──────────────────────────┐
   │ setReservationFormData() │ Store pre-fill data
   │ setShowReservationForm() │ Open dialog
   └──────┬───────────────────┘
          │
          ▼
   ┌──────────────────────────┐
   │ ReservationRequestForm   │ User fills form
   └──────┬───────────────────┘
          │
          ├─→ handleReservationSubmit(formData)
          │
          ▼
   ┌──────────────────────────┐
   │ setMockReservations()    │ Add new reservation
   │ status: "requested"      │
   └──────────────────────────┘


2. APPROVE/REJECT
   ┌──────────────────┐
   │ Reservations Pg  │ Manager reviews
   └──────┬───────────┘
          │
          ├─→ Option A: Approve
          │   │
          │   ├─→ handleApproveReservation(id)
          │   │
          │   ▼
          │   ┌──────────────────────────┐
          │   │ setMockReservations()    │
          │   │ status: "reserved"       │
          │   └──────────────────────────┘
          │
          ├─→ Option B: Reject
          │   │
          │   ├─→ handleRejectReservation(id, reason)
          │   │
          │   ▼
          │   ┌──────────────────────────┐
          │   │ setMockReservations()    │
          │   │ status: "cancelled"      │
          │   └──────────────────────────┘
          │
          └─→ Option C: Suggest Alternative
              │
              ├─→ handleSuggestAlternative(id)
              │
              ▼
              ┌─────────────────────────────────┐
              │ setSelectedReservationFor...()  │
              │ setShowAlternative...Dialog()   │
              └──────┬──────────────────────────┘
                     │
                     ▼
              ┌─────────────────────────────────┐
              │ AlternativeSuggestionDialog     │
              └──────┬──────────────────────────┘
                     │
                     ├─→ handleSubmitAlternativeSuggestion(data)
                     │
                     ▼
                     Toast: Sent to customer


3. CHECK-IN
   ┌──────────────┐
   │ Check-In Pg  │ Filter: status="reserved" | "confirmed"
   └──────┬───────┘
          │
          ▼
   ┌──────────────────────────┐
   │ CheckInInterface (Grid)  │ Shows today's reservations
   └──────┬───────────────────┘
          │
          ├─→ Method: QR Code
          ├─→ Method: OCR Plate
          └─→ Method: Manual
              │
              ├─→ handleCheckIn(id, method)
              │
              ▼
          ┌──────────────────────────┐
          │ setMockReservations()    │
          │ status: "checked-in"     │
          └──────────────────────────┘


4. PROGRESS (Phase 2.1) 🔜
   ┌──────────────────┐
   │ Operations Pg    │ Track service progress
   └──────┬───────────┘
          │
          ├─→ ServiceProgressTracker
          │
          ▼
   ┌──────────────────────────┐
   │ status: "in-progress"    │
   │        ↓                 │
   │ status: "completed"      │
   └──────────────────────────┘


5. COMPLETION (Phase 2.1) 🔜
   ┌──────────────────────────┐
   │ status: "ready-for-pickup"│
   │        ↓                 │
   │ status: "picked-up"      │
   └──────────────────────────┘
```

---

## State Update Pattern

```typescript
// ✅ CORRECT - Immutable Update
setMockReservations(prev =>
  prev.map(r =>
    r.id === reservationId
      ? { ...r, status: newStatus }  // Create new object
      : r                             // Keep existing
  )
);

// ❌ WRONG - Direct Mutation
mockReservations.find(r => r.id === id).status = "reserved";
```

---

## Integration Points Map

```
┌─────────────────────────────────────────────────────────┐
│                     FILE STRUCTURE                      │
└─────────────────────────────────────────────────────────┘

/
├── App.tsx ⭐ MAIN INTEGRATION HUB
│   ├── Imports (lines 90-97)
│   ├── State (lines 127-138)
│   ├── Handlers (lines 1209-1308)
│   ├── Page Routes (lines 3445-3488)
│   └── Global Dialogs (lines 4088-4136)
│
├── components/
│   ├── layout/
│   │   └── ModernAdminSidebar.tsx ⭐ MENU UPDATE
│   │       └── Operations → Reservations (lines 171-191)
│   │
│   ├── calendar/
│   │   └── ModuleAwareCalendarView.tsx ⭐ CONNECTED
│   │       └── onNewReservation={handleNewReservationRequest}
│   │
│   └── reservation/ ⭐ NEW COMPONENTS
│       ├── ReservationRequestForm.tsx
│       ├── ApprovalDashboard.tsx
│       ├── AlternativeSuggestionDialog.tsx
│       ├── CheckInInterface.tsx
│       ├── ConfirmationCountdown.tsx (Phase 2.1) 🔜
│       └── ServiceProgressTracker.tsx (Phase 2.1) 🔜
│
├── types/
│   └── reservation.ts ⭐ TYPE DEFINITIONS
│
└── data/
    └── mockReservations.ts ⭐ MOCK DATA
```

---

## Navigation Flow

```
User Journey Map:

┌─────────────┐
│   Sidebar   │
└──────┬──────┘
       │
       ├─→ "Calendar & Bookings"
       │   │
       │   └─→ Click time slot
       │       └─→ Reservation Form Dialog
       │           └─→ Submit → Reservation created
       │
       ├─→ "Reservations" ✨ NEW
       │   │
       │   ├─→ View all reservations
       │   ├─→ Approve/Reject actions
       │   └─→ Suggest alternatives
       │
       └─→ "Check-In Center" ✨ NEW (via operations or direct)
           │
           └─→ Process customer arrivals
               └─→ QR / OCR / Manual check-in
```

---

## Component Communication

```
┌──────────────────────────────────────────────────────────┐
│              PROPS & CALLBACKS FLOW                      │
└──────────────────────────────────────────────────────────┘

ModuleAwareCalendarView
    ├─ Props IN:
    │   ├─ stations (from App state)
    │   ├─ reservations (from App state)
    │   └─ onStationStatusChange (from App handler)
    │
    └─ Callbacks OUT:
        ├─ onNewReservation(stationId, timeSlot)
        │   └─→ App: handleNewReservationRequest()
        │
        ├─ onReservationClick(reservation)
        │   └─→ App: Log or navigate
        │
        └─ onNewTransaction()
            └─→ App: Create walk-in transaction


ApprovalDashboard
    ├─ Props IN:
    │   └─ reservations (from App state)
    │
    └─ Callbacks OUT:
        ├─ onApprove(id)
        │   └─→ App: handleApproveReservation()
        │
        ├─ onReject(id, reason)
        │   └─→ App: handleRejectReservation()
        │
        ├─ onSuggestAlternative(id)
        │   └─→ App: handleSuggestAlternative()
        │
        └─ onViewDetails(reservation)
            └─→ App: Toast or navigate


CheckInInterface
    ├─ Props IN:
    │   └─ reservation (filtered from App state)
    │
    └─ Callbacks OUT:
        └─ onCheckIn(method: "qr" | "ocr" | "manual")
            └─→ App: handleCheckIn()


ReservationRequestForm
    ├─ Props IN:
    │   ├─ stationId (pre-filled)
    │   ├─ stationName (pre-filled)
    │   ├─ preselectedDate (pre-filled)
    │   ├─ preselectedTime (pre-filled)
    │   └─ services (available services list)
    │
    └─ Callbacks OUT:
        ├─ onSubmit(formData)
        │   └─→ App: handleReservationSubmit()
        │
        └─ onCancel()
            └─→ App: Close dialog


AlternativeSuggestionDialog
    ├─ Props IN:
    │   ├─ open (dialog state)
    │   └─ reservation (selected reservation)
    │
    └─ Callbacks OUT:
        ├─ onOpenChange(open)
        │   └─→ App: setShowAlternativeSuggestionDialog()
        │
        └─ onSuggest(suggestionData)
            └─→ App: handleSubmitAlternativeSuggestion()
```

---

## Toast Notification Map

```
Action                          → Toast Message
─────────────────────────────────────────────────────────
Create Reservation              → "Reservation request submitted successfully!"
Approve Reservation             → "Reservation approved!"
Reject Reservation              → "Reservation rejected"
Suggest Alternative             → "Alternative suggestions sent to customer!"
Check-In (QR)                   → "Customer checked in successfully via QR!"
Check-In (OCR)                  → "Customer checked in successfully via OCR!"
Check-In (Manual)               → "Customer checked in successfully via MANUAL!"
```

---

## Status Badge Color Map

```
Status          │ Color Class           │ Text
────────────────┼──────────────────────┼──────────────
requested       │ bg-orange-100         │ Orange
reserved        │ bg-green-100          │ Green
confirmed       │ bg-blue-100           │ Blue
checked-in      │ bg-indigo-100         │ Indigo
in-progress     │ bg-purple-100         │ Purple
completed       │ bg-emerald-100        │ Emerald
cancelled       │ bg-gray-100           │ Gray
no-show         │ bg-red-100            │ Red
```

---

## Quick Reference: Where to Find Things

```
Need to...                          → Go to...
───────────────────────────────────────────────────────────────
Add new handler                     → App.tsx (after line 1202)
Modify reservation state            → App.tsx (lines 127-138)
Update sidebar menu                 → ModernAdminSidebar.tsx (lines 171-191)
Add new page                        → App.tsx renderCurrentPage() switch
Connect calendar action             → App.tsx calendar case (line 3491)
Modify reservation form             → ReservationRequestForm.tsx
Change approval logic               → ApprovalDashboard.tsx
Update check-in methods             → CheckInInterface.tsx
Add alternative suggestion logic    → AlternativeSuggestionDialog.tsx
Modify reservation type             → types/reservation.ts
Update mock data                    → data/mockReservations.ts
```

---

## 🎯 Integration Checklist

- [x] Import all reservation components in App.tsx
- [x] Add reservation state variables
- [x] Create event handlers for all actions
- [x] Connect calendar to reservation form
- [x] Create Reservations page with ApprovalDashboard
- [x] Create Check-In page with CheckInInterface
- [x] Add global dialogs (form + alternative)
- [x] Update sidebar with new menu items
- [x] Add toast notifications
- [x] Add page title mappings
- [x] Test all workflows end-to-end

**Status: ✅ ALL INTEGRATION COMPLETE!**

---

## Next Phase Preview

```
Phase 2.1: SERVICE PROGRESS & COMPLETION
├── ServiceProgressTracker component
│   ├── Step-by-step workflow
│   ├── Real-time updates
│   └── Integration with Operations Center
│
├── Completion Features
│   ├── Quality check
│   ├── Photo upload
│   ├── Customer signature
│   └── Final payment
│
└── Post-Service
    ├── Feedback collection
    ├── Rating system
    └── Review request
```

**Ready to proceed! 🚀**
