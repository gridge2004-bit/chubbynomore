/** Client-safe admin role/permission definitions (no data access here). */

export const ADMIN_ROLES = [
  "owner",
  "admin",
  "support",
  "clinical_reviewer",
  "read_only",
] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];

export type AdminCapabilities = {
  /** Screening / clinical information (BMI, conditions, answers). */
  clinical: boolean;
  /** Full contact detail + reveal action. */
  contact: boolean;
  /** Attribution (UTM / referrer). */
  attribution: boolean;
  /** Consent records. */
  consent: boolean;
  /** Admin account management. */
  manageAdmins: boolean;
  /** Audit log access. */
  auditLogs: boolean;
};

const MATRIX: Record<AdminRole, AdminCapabilities> = {
  owner: {
    clinical: true,
    contact: true,
    attribution: true,
    consent: true,
    manageAdmins: true,
    auditLogs: true,
  },
  admin: {
    clinical: false,
    contact: true,
    attribution: true,
    consent: true,
    manageAdmins: false,
    auditLogs: false,
  },
  support: {
    clinical: false,
    contact: true,
    attribution: false,
    consent: true,
    manageAdmins: false,
    auditLogs: false,
  },
  clinical_reviewer: {
    clinical: true,
    contact: true,
    attribution: false,
    consent: true,
    manageAdmins: false,
    auditLogs: false,
  },
  read_only: {
    clinical: false,
    contact: false,
    attribution: false,
    consent: true,
    manageAdmins: false,
    auditLogs: false,
  },
};

export function capabilitiesFor(role: AdminRole): AdminCapabilities {
  return MATRIX[role];
}

export const ROLE_LABEL: Record<AdminRole, string> = {
  owner: "Owner",
  admin: "Admin",
  support: "Support",
  clinical_reviewer: "Clinical reviewer",
  read_only: "Read only",
};

/** Idle timeout for admin sessions (ms). */
export const ADMIN_IDLE_TIMEOUT_MS = 15 * 60 * 1000;
