/**
 * Clinical intake structure — TECHNICAL SCAFFOLD ONLY.
 *
 * No clinical questions, contraindication rules, eligibility logic, or
 * branching logic have been authored here. Sections marked
 * `awaitingClinicalApproval: true` render a provider-review placeholder and
 * collect NO data until a licensed provider supplies approved content.
 *
 * Administrative sections (identity, contact, measurements, shipping,
 * acknowledgments, signature) collect operational information only.
 */

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "date"
  | "number"
  | "select"
  | "textarea"
  | "checkbox";

export interface IntakeField {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  help?: string;
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "tel" | "email" | "decimal";
  min?: number;
  max?: number;
  /** Legal/consent text still pending review. */
  pendingLegalReview?: boolean;
}

export interface IntakeSection {
  id: string;
  title: string;
  /** Short description shown under the step title. */
  intro?: string;
  fields: IntakeField[];
  /**
   * When true, this section's clinical content has NOT been approved by a
   * licensed provider. The UI renders a placeholder and collects no answers.
   */
  awaitingClinicalApproval?: boolean;
  /** What a licensed provider must supply before this section can be built. */
  requiredFromProvider?: string[];
  /** Review-and-submit step. */
  isReview?: boolean;
}

export const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM",
  "NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA",
  "WV","WI","WY",
] as const;

const stateOptions = US_STATES.map((s) => ({ value: s, label: s }));

export const INTAKE_SECTIONS: IntakeSection[] = [
  {
    id: "identity",
    title: "Identity and demographics",
    intro: "This information is required to create your patient record.",
    fields: [
      { id: "legal_first_name", label: "Legal first name", type: "text", required: true, autoComplete: "given-name" },
      { id: "legal_last_name", label: "Legal last name", type: "text", required: true, autoComplete: "family-name" },
      { id: "date_of_birth", label: "Date of birth", type: "date", required: true, autoComplete: "bday", help: "You must be 18 or older." },
      {
        id: "sex_at_birth",
        label: "Sex assigned at birth",
        type: "select",
        required: true,
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "intersex", label: "Intersex" },
          { value: "prefer_not_to_say", label: "Prefer not to say" },
        ],
        help: "Collected because it can affect clinical review.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact confirmation",
    intro: "Confirm how your licensed provider can reach you.",
    fields: [
      { id: "email", label: "Email address", type: "email", required: true, autoComplete: "email", inputMode: "email" },
      { id: "phone", label: "Mobile phone", type: "tel", required: true, autoComplete: "tel", inputMode: "tel" },
      { id: "residence_state", label: "State of residence", type: "select", required: true, options: stateOptions, help: "Care availability depends on provider licensure in your state." },
    ],
  },
  {
    id: "measurements",
    title: "Height and weight",
    intro: "Used to calculate BMI for provider review.",
    fields: [
      { id: "height_feet", label: "Height (feet)", type: "number", required: true, inputMode: "numeric", min: 3, max: 8 },
      { id: "height_inches", label: "Height (inches)", type: "number", required: true, inputMode: "numeric", min: 0, max: 11 },
      { id: "current_weight_lbs", label: "Current weight (lbs)", type: "number", required: true, inputMode: "numeric", min: 50, max: 1200 },
    ],
  },
  {
    id: "weight_history",
    title: "Weight history",
    awaitingClinicalApproval: true,
    requiredFromProvider: [
      "Exact weight-history questions (e.g. highest/lowest adult weight, duration at current weight)",
      "Which weight-history fields are required vs optional",
      "Any branching based on weight history",
    ],
    fields: [],
  },
  {
    id: "goals",
    title: "Treatment goals",
    awaitingClinicalApproval: true,
    requiredFromProvider: [
      "Approved wording for goal questions",
      "Whether goal weight may be collected, and any clinical guardrails on it",
      "Whether goals influence routing in any way",
    ],
    fields: [],
  },
  {
    id: "conditions",
    title: "Current health conditions",
    awaitingClinicalApproval: true,
    requiredFromProvider: [
      "Complete approved condition list and exact labels",
      "Required vs optional selections and any 'none' handling",
      "Any follow-up questions triggered by a selected condition",
    ],
    fields: [],
  },
  {
    id: "medications",
    title: "Current medications",
    awaitingClinicalApproval: true,
    requiredFromProvider: [
      "Whether free-text medication entry, structured entry, or both is required",
      "Required detail per medication (name, dose, frequency, start date)",
      "Any interaction screening the provider wants surfaced during intake",
    ],
    fields: [],
  },
  {
    id: "allergies",
    title: "Allergies and adverse reactions",
    awaitingClinicalApproval: true,
    requiredFromProvider: [
      "Approved allergy question wording and required detail",
      "Whether prior adverse drug reactions are captured separately",
    ],
    fields: [],
  },
  {
    id: "prior_glp1",
    title: "Previous GLP-1 treatment",
    awaitingClinicalApproval: true,
    requiredFromProvider: [
      "Approved questions for prior GLP-1 exposure (medication, dose, dates, tolerability)",
      "Branching rules for continuing vs restarting therapy",
    ],
    fields: [],
  },
  {
    id: "history",
    title: "Relevant medical and family history",
    awaitingClinicalApproval: true,
    requiredFromProvider: [
      "Approved personal and family history questions",
      "Which histories are required for review",
    ],
    fields: [],
  },
  {
    id: "contraindications",
    title: "Contraindication screening",
    awaitingClinicalApproval: true,
    requiredFromProvider: [
      "The complete provider-approved contraindication screening set",
      "Exact wording, order, and required responses",
      "Any hard-stop or additional-review routing rules and their downstream messaging",
    ],
    fields: [],
  },
  {
    id: "pharmacy",
    title: "Pharmacy and shipping",
    intro: "Where treatment would be sent if a licensed provider determines it is appropriate.",
    fields: [
      { id: "ship_address1", label: "Street address", type: "text", required: true, autoComplete: "address-line1" },
      { id: "ship_address2", label: "Apartment, suite, etc. (optional)", type: "text", autoComplete: "address-line2" },
      { id: "ship_city", label: "City", type: "text", required: true, autoComplete: "address-level2" },
      { id: "ship_state", label: "State", type: "select", required: true, options: stateOptions, autoComplete: "address-level1" },
      { id: "ship_zip", label: "ZIP code", type: "text", required: true, autoComplete: "postal-code", inputMode: "numeric" },
      { id: "pharmacy_notes", label: "Delivery notes (optional)", type: "textarea", placeholder: "Gate code, preferred delivery window, etc." },
    ],
  },
  {
    id: "consents",
    title: "Acknowledgments and consents",
    intro: "Final consent language is pending legal and provider review.",
    fields: [
      {
        id: "consent_telehealth",
        label: "I consent to receive care through telehealth. [Placeholder — final telehealth consent language pending review]",
        type: "checkbox",
        required: true,
        pendingLegalReview: true,
      },
      {
        id: "consent_accuracy",
        label: "I confirm the information I have provided is accurate and complete to the best of my knowledge.",
        type: "checkbox",
        required: true,
      },
      {
        id: "consent_privacy",
        label: "I have reviewed the privacy practices describing how my health information is used. [Placeholder — final privacy notice pending review]",
        type: "checkbox",
        required: true,
        pendingLegalReview: true,
      },
    ],
  },
  {
    id: "signature",
    title: "Electronic signature",
    intro: "Type your full legal name to sign this submission electronically.",
    fields: [
      { id: "signature_name", label: "Full legal name", type: "text", required: true, autoComplete: "name", help: "Must match the legal name entered earlier." },
      { id: "signature_date", label: "Date", type: "date", required: true },
    ],
  },
  {
    id: "review",
    title: "Review and submit",
    intro: "Review your answers before submitting for licensed provider review.",
    isReview: true,
    fields: [],
  },
];

/** Backend work still required before clinical answers may be collected or sent. */
export const BACKEND_REQUIREMENTS = [
  "A secure, access-controlled clinical data store separate from marketing/lead data",
  "Encrypted transport and at-rest storage with audit logging for clinical records",
  "A signed BAA with every downstream processor that touches clinical data",
  "A licensed-provider review queue that returns the actual review decision",
  "Server-side retention, amendment, and deletion handling for health records",
  "Authenticated save-and-return sessions (no clinical data in browser storage)",
];
