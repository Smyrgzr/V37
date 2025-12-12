# 🧪 PHASE 2 INTEGRATION - TESTING GUIDE

## Quick Start Testing

### 1. Login & Access
```
1. Start application
2. Login as Carwash Owner:
   - Email: john@autowashpro.com
   - Password: (any)
3. You should see the modern dashboard
```

---

## 🎯 TEST SCENARIOS

### Scenario A: Create New Reservation from Calendar

**Steps:**
1. Click **"Operations"** → **"Calendar & Bookings"** in sidebar
2. Find a Manual Detailing station (colored purple/pink)
3. Click on an empty time slot (e.g., "10:00 AM")
4. Verify:
   - ✅ Dialog opens with "New Reservation Request" title
   - ✅ Station name is pre-filled
   - ✅ Date and time are pre-selected
   - ✅ Service dropdown shows options

**Fill Form:**
```
Customer Name: John Smith
Phone: +1-555-0123
Email: john@example.com
Vehicle Brand: Toyota
Vehicle Model: Camry
License Plate: ABC123
Color: Silver
Service: Premium Detail ($299.99)
Notes: First time customer
```

5. Click **"Submit Request"**
6. Verify:
   - ✅ Toast: "Reservation request submitted successfully!"
   - ✅ Dialog closes
   - ✅ Calendar shows new reservation (orange/yellow badge)

---

### Scenario B: Approve Reservation Request

**Steps:**
1. Click **"Operations"** → **"Reservations"** in sidebar
2. Verify:
   - ✅ Page title: "Reservation Management"
   - ✅ Tabs: All, Requested, Approved, Cancelled
3. Click **"Requested"** tab
4. Find the reservation created in Scenario A
5. Verify card shows:
   - ✅ Customer name: John Smith
   - ✅ Service: Premium Detail
   - ✅ Status badge: "Requested" (orange)
   - ✅ Three action buttons: Approve, Reject, Suggest Alternative
6. Click **"Approve"** button
7. Verify:
   - ✅ Toast: "Reservation approved!"
   - ✅ Card moves to "Approved" tab
   - ✅ Status badge changes to "Reserved" (green)

---

### Scenario C: Suggest Alternative Times

**Steps:**
1. In **Reservations** page, find a "Requested" reservation
2. Click **"Suggest Alternative"** button
3. Verify:
   - ✅ Dialog opens: "Suggest Alternative Options"
   - ✅ Shows original reservation details
   - ✅ Form has 3 alternative time slots
   - ✅ Service alternatives available
   - ✅ Reason field available

**Fill Alternative Suggestions:**
```
Alternative 1: Tomorrow, 2:00 PM
Alternative 2: Day after, 10:00 AM
Alternative 3: Same day, 4:00 PM
Alternative Service: Express Detail ($199.99)
Reason: Peak hour, alternatives offer better value
```

4. Click **"Send Suggestions"**
5. Verify:
   - ✅ Toast: "Alternative suggestions sent to customer!"
   - ✅ Dialog closes

---

### Scenario D: Reject Reservation

**Steps:**
1. In **Reservations** page, find a "Requested" reservation
2. Click **"Reject"** button
3. Verify:
   - ✅ Toast: "Reservation rejected"
   - ✅ Card moves to "Cancelled" tab
   - ✅ Status badge: "Cancelled" (red)

---

### Scenario E: Check-In Customer

**Pre-requisite:** Need an approved reservation (status = "reserved")

**Steps:**
1. Click **"Operations"** → **"Reservations"**
2. Ensure you have at least one "Reserved" reservation
3. Now click **"Operations"** → Navigate to check "check-in" if it appears
   - Or manually navigate by changing URL or adding "check-in" page to sidebar

**Alternative:** Create a quick check-in test:
1. In Reservations page, approve a request (Scenario B)
2. Go to browser console
3. Manually update reservation status:
   ```javascript
   // This is for testing - in App.tsx, reservations should show
   ```

**Check-In Flow:**
1. Navigate to **Check-In Center** (when implemented)
2. Verify:
   - ✅ Shows only "reserved" and "confirmed" reservations
   - ✅ Grid layout with check-in cards
3. Click **"Scan QR Code"** button
4. Verify:
   - ✅ QR scanner interface appears
   - ✅ Scanner uses device camera
5. Click **"Use License Plate OCR"** button
6. Verify:
   - ✅ OCR interface appears
   - ✅ Camera preview shows
7. Click **"Manual Check-In"** button
8. Verify:
   - ✅ Confirmation code input appears
9. Enter code or simulate check-in
10. Verify:
    - ✅ Toast: "Customer checked in successfully via [METHOD]!"
    - ✅ Reservation status updates to "checked-in"

---

## 🔍 VISUAL VERIFICATION

### Calendar View
**What to check:**
- [ ] Walk-in stations (In-Bay, Tunnel, Self-Service) - Blue/Green colors
- [ ] Reservation stations (Manual Detailing) - Purple/Pink colors
- [ ] Time slots are clickable on Manual Detailing stations only
- [ ] Existing reservations show as colored blocks
- [ ] "+" icon appears on hover for available slots

### Reservations Page
**What to check:**
- [ ] Tabs work correctly (All, Requested, Approved, Cancelled)
- [ ] Status badges have correct colors:
  - Orange: Requested
  - Green: Reserved/Confirmed
  - Blue: Checked-in
  - Purple: In-progress
  - Gray: Cancelled
- [ ] Action buttons are contextual to status
- [ ] Empty state shows when no reservations

### Check-In Interface
**What to check:**
- [ ] Only shows reservations ready for check-in
- [ ] Three check-in methods available
- [ ] Reservation details clearly displayed
- [ ] Customer info, vehicle info, service info all visible
- [ ] Confirmation code displayed prominently

---

## 🐛 COMMON ISSUES & FIXES

### Issue 1: Dialog Not Opening
**Symptom:** Click calendar slot, nothing happens

**Check:**
```typescript
// In App.tsx, verify:
const [showReservationForm, setShowReservationForm] = useState(false);

// In ModuleAwareCalendarView:
onNewReservation={handleNewReservationRequest}
```

**Fix:** Ensure calendar's onNewReservation prop is connected

---

### Issue 2: Reservation Not Appearing
**Symptom:** Submit form, no reservation created

**Check:**
```typescript
// In App.tsx handleReservationSubmit:
setMockReservations(prev => [...prev, newReservation]);
```

**Fix:** Verify state update and reservation object structure

---

### Issue 3: Status Not Updating
**Symptom:** Click approve, status doesn't change

**Check:**
```typescript
// In handleApproveReservation:
setMockReservations(prev =>
  prev.map(r =>
    r.id === reservationId
      ? { ...r, status: "reserved" }
      : r
  )
);
```

**Fix:** Ensure immutable state update pattern

---

## 📊 DATA VERIFICATION

### Mock Data to Verify:
```typescript
// In App.tsx:
const [mockReservations, setMockReservations] = useState<Reservation[]>(
  generateTodayReservations(8)
);

// Check initial reservations:
console.log('Initial reservations:', mockReservations);
```

### After Each Action:
```typescript
// Add temporary logging:
console.log('Reservation created:', newReservation);
console.log('Updated reservations:', mockReservations);
```

---

## ✅ INTEGRATION HEALTH CHECK

### Quick Verification (5 minutes):
```
[ ] App loads without errors
[ ] Sidebar shows "Reservations" menu item
[ ] Calendar page loads
[ ] Click time slot → Dialog opens
[ ] Submit form → Reservation created
[ ] Reservations page shows data
[ ] Approve action → Status changes
[ ] Toast notifications appear
[ ] No console errors
```

---

## 🎯 COMPLETE WORKFLOW TEST (15 minutes)

**End-to-End Reservation Flow:**

1. **Create** (Calendar → Dialog → Submit)
   - Time: 2 min
   - Expected: New reservation in "Requested" status

2. **Review** (Navigate to Reservations page)
   - Time: 1 min
   - Expected: See reservation in Requested tab

3. **Approve** (Click Approve button)
   - Time: 30 sec
   - Expected: Status → "Reserved", toast notification

4. **Alternative** (Create another, suggest alternatives)
   - Time: 3 min
   - Expected: Dialog opens, submit works, toast appears

5. **Reject** (Create another, reject it)
   - Time: 1 min
   - Expected: Status → "Cancelled", moves to Cancelled tab

6. **Check-In** (Use approved reservation)
   - Time: 2 min
   - Expected: Status → "Checked-in", toast notification

7. **Verify State** (Check calendar reflects changes)
   - Time: 1 min
   - Expected: Calendar shows updated reservations

**Total Time:** ~15 minutes
**Success Criteria:** All steps complete without errors

---

## 🚀 READY FOR PHASE 2.1

Once all tests pass, you're ready to implement:
- [ ] ConfirmationCountdown component
- [ ] ServiceProgressTracker component
- [ ] Completion workflow
- [ ] Post-service features

**Next Command:** "Let's start Phase 2.1: Service Progress Tracking"

---

## 📞 SUPPORT

If you encounter issues:
1. Check browser console for errors
2. Verify all imports are correct
3. Check state management connections
4. Review INTEGRATION_STATUS.md for component locations
5. Test individual components in isolation

**Happy Testing! 🎉**
