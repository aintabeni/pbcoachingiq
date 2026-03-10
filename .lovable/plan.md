

## Replace Form with Booking Widget

**What changes:** Replace the current LeadConnector form iframe in `src/components/TallyEmbed.tsx` with the new booking calendar widget.

**File: `src/components/TallyEmbed.tsx`**
- Replace the current form iframe (`NLMAcB93KCiyb5gArZRZ`) with the new booking iframe (`LPjvAbKiuIWkr1tCSHPo`)
- Update the script source (same `msgsndr.com` script, already handled)
- Adjust height/styling since booking widgets have different dimensions than forms

**File: `src/pages/Apply.tsx`**
- Update copy to reflect booking a call rather than filling in a form (e.g., "Pick a time below" instead of "Fill in the form below")

