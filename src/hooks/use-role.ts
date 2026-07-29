/**
 * use-role.ts
 * Lightweight role context for Innovation DNA.
 * The selected role is written on login and read by every page/component.
 * Uses sessionStorage so it survives SPA navigation but clears on tab close.
 */
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { createElement } from "react";
import { roles, roleProfiles, type Role } from "@/data/mock-data";

const STORAGE_KEY = "innovation_dna_role";

function readStoredRole(): Role {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored && (roles as readonly string[]).includes(stored)) return stored as Role;
  } catch {
    // sessionStorage unavailable (SSR / private mode edge case)
  }
  return "Student";
}

type RoleContextValue = {
  role: Role;
  setRole: (role: Role) => void;
  profile: (typeof roleProfiles)[Role];
};

const RoleContext = createContext<RoleContextValue | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>(readStoredRole);

  const setRole = (next: Role) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
    setRoleState(next);
  };

  // Keep in sync if another tab changes storage
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue && (roles as readonly string[]).includes(e.newValue)) {
        setRoleState(e.newValue as Role);
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return createElement(RoleContext.Provider, { value: { role, setRole, profile: roleProfiles[role] } }, children);
}

export function useRole(): RoleContextValue {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used inside <RoleProvider>");
  return ctx;
}
