Move the intake disclaimer to the first step only

## Current state

The Chubby No More `/intake` wizard is now a single scrollable multi-step form. The `ComplianceFooter` component is rendered once at the bottom of the wizard container, so it appears on every step as the user scrolls through the form.

## Goal

Show the compounded-medication/trademark disclaimer only on the first (intro) step of the intake wizard, not on every step.

## Plan

1. Update `src/components/intake/IntakeWizard.tsx`:
   - Remove the global `<ComplianceFooter />` from the bottom of the main wizard container.
   - Add the disclaimer inside the intro step content only.
   - Keep the existing disclaimer text and styling unchanged.
2. Verify that `src/components/intake/ui.tsx` remains the source of truth for the disclaimer component and that no other imports are affected.

## Result

The full legal disclaimer will appear once, at the bottom of the first step, and will not repeat on the goal weight, safety, medical history, address, or consent steps.
