export const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  
  // Length check - minimum 8 characters
  if (password.length >= 8) {
    strength += 1;
  }
  
  // Contains lowercase letters
  if (/[a-z]/.test(password)) {
    strength += 1;
  }
  
  // Contains uppercase letters
  if (/[A-Z]/.test(password)) {
    strength += 1;
  }
  
  // Contains numbers
  if (/\d/.test(password)) {
    strength += 1;
  }
  
  // Contains special characters
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    strength += 1;
  }
  
  return strength;
};

export const getPasswordStrengthLabel = (strength: number): string => {
  switch (strength) {
    case 0:
    case 1:
      return "Very Weak";
    case 2:
      return "Weak";
    case 3:
      return "Medium";
    case 4:
      return "Strong";
    case 5:
      return "Very Strong";
    default:
      return "Very Weak";
  }
};

export const getPasswordStrengthColor = (strength: number): string => {
  switch (strength) {
    case 0:
    case 1:
      return "bg-red-500";
    case 2:
      return "bg-orange-500";
    case 3:
      return "bg-yellow-500";
    case 4:
      return "bg-lime-500";
    case 5:
      return "bg-green-500";
    default:
      return "bg-red-500";
  }
}; 