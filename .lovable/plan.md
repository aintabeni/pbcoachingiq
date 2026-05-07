## Plan

### 1. Create a helper edge function to provision custom fields in GHL

Create a one-time-use edge function `create-ghl-fields` that calls `POST /locations/{locationId}/customFields` to create:
- **Application Budget** (text) — named distinctly to avoid conflict with the existing "budget" field
- **Position** (text) — will now store detailed positions like "Right Back", "Striker", "Central Midfielder", etc.
- **Age** (text)
- **Goals** (text)

### 2. Run the helper and capture custom field IDs

Call the function, collect the returned field IDs for each custom field.

### 3. Update the form and edge function for detailed positions

Currently the form sends broad categories ("Attacker", "Midfielder", etc.). Update so the **specific pitch position** is sent as a readable label:

| Dot | Sent value |
|-----|-----------|
| ST | Striker |
| CAM | Central Attacking Midfielder |
| LW | Left Winger |
| RW | Right Winger |
| CM | Central Midfielder |
| DM | Defensive Midfielder |
| LB | Left Back |
| CB | Centre Back |
| RB | Right Back |
| GK | Goalkeeper |

- The broad category (Attacker/Midfielder/Defender/Goalkeeper) stays for the `position` field used in tags and routing
- A new `detailedPosition` field is added to the payload and sent to the GHL custom field

### 4. Update `apply-discovery` edge function

- Use actual custom field IDs (from step 2) in the `customFields` array
- Remove `budget` from tags
- Add `detailedPosition` to the schema and payload
- Keep broad `position` for tags

### 5. Test push

Send a test payload and verify all custom fields appear correctly on the GHL contact.

### Technical details

- `ApplicationForm.tsx`: Add `detailedPosition` to form data, map each pitch dot to a readable label, send both `position` (category) and `detailedPosition` (specific)
- `apply-discovery/index.ts`: Add `detailedPosition` to schema, use field IDs for customFields, remove budget from tags
- Helper function created then deleted after use
