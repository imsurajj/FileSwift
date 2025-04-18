"use client";

import { calculatePasswordStrength, getPasswordStrengthLabel, getPasswordStrengthColor } from "@/utils/passwordStrength";

interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = calculatePasswordStrength(password);
  const strengthLabel = getPasswordStrengthLabel(strength);
  const strengthColor = getPasswordStrengthColor(strength);
  
  // Compute width based on strength (20% per level of strength)
  const strengthWidth = `${(strength / 5) * 100}%`;
  
  return (
    <div className="w-full mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-500">Password Strength</span>
        <span className="text-xs font-medium">{strengthLabel}</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${strengthColor} transition-all duration-300 ease-out`}
          style={{ width: strengthWidth }}
        ></div>
      </div>
      <ul className="mt-2 text-xs text-gray-500 space-y-1">
        <li className={password.length >= 8 ? "text-green-500" : ""}>
          • At least 8 characters
        </li>
        <li className={/[a-z]/.test(password) ? "text-green-500" : ""}>
          • Lowercase letters (a-z)
        </li>
        <li className={/[A-Z]/.test(password) ? "text-green-500" : ""}>
          • Uppercase letters (A-Z)
        </li>
        <li className={/\d/.test(password) ? "text-green-500" : ""}>
          • Numbers (0-9)
        </li>
        <li className={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? "text-green-500" : ""}>
          • Special characters (!@#$%...)
        </li>
      </ul>
    </div>
  );
} 