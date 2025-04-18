"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import PasswordStrength from "@/app/components/ui/PasswordStrength";

// Authentication providers configuration
const AUTH_CONFIG = {
  credentials: {
    enabled: true, // Email/password authentication
  },
  providers: {
    github: {
      enabled: true,
      name: "GitHub",
      icon: (
        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    google: {
      enabled: true,
      name: "Google",
      icon: (
        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4"/>
          <path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853"/>
          <path d="M5.50253 14.3003C4.99987 12.8099 4.99987 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z" fill="#FBBC04"/>
          <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z" fill="#EA4335"/>
        </svg>
      ),
    },
  },
};

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    usePhone: false,
    phone: "",
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Name validation
    if (!formValues.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    // Email/Phone validation
    if (formValues.usePhone) {
      if (!formValues.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\+?[1-9]\d{9,14}$/.test(formValues.phone.trim())) {
        newErrors.phone = "Please enter a valid phone number";
      }
    } else {
      if (!formValues.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }
    
    // Password validation
    if (!formValues.password) {
      newErrors.password = "Password is required";
    } else if (formValues.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    // Confirm password validation
    if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormValues({ ...formValues, [name]: newValue });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const toggleAuthMethod = () => {
    setFormValues({
      ...formValues,
      usePhone: !formValues.usePhone,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would be a call to your API to create the user
      // For now, we'll simulate a successful registration and then sign in
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Auto sign-in after registration
      const result = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
      });
      
      if (result?.error) {
        setErrors({ form: "Error signing in after registration" });
        setIsLoading(false);
        return;
      }
      
      // Redirect to dashboard on successful registration and login
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ form: "An unexpected error occurred. Please try again." });
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="w-full max-w-sm border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
        <div className="text-center mb-5">
          <Link href="/" className="text-purple-600 text-2xl font-bold inline-flex items-center">
            File<span className="text-purple-600">Swift</span>
          </Link>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/signin" className="font-medium text-purple-600 hover:text-purple-500">
              Sign in
            </Link>
          </p>
        </div>
        
        {/* Social Sign Up Options */}
        <div className="mb-5">
          <div className="flex justify-center space-x-3 mb-4">
            {Object.entries(AUTH_CONFIG.providers).map(([key, provider]) => (
              <button
                key={key}
                type="button"
                disabled={!provider.enabled}
                className={`inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 w-1/2 ${!provider.enabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => provider.enabled && signIn(key, { callbackUrl: "/dashboard" })}
              >
                {provider.icon}
                {provider.name}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300/30"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>
        </div>
        
        {/* Form */}
        {AUTH_CONFIG.credentials.enabled ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            {errors.form && (
              <div className="rounded-md bg-red-50 p-3 text-sm">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-4 w-4 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-2">
                    <h3 className="text-xs font-medium text-red-800">{errors.form}</h3>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <Input
                label="Full Name"
                name="name"
                type="text"
                autoComplete="name"
                value={formValues.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Enter your full name"
                required
              />
              
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-gray-700">
                  {formValues.usePhone ? "Phone Number" : "Email Address"}
                </span>
                <button
                  type="button"
                  className="text-xs text-purple-600 hover:text-purple-500 underline"
                  onClick={toggleAuthMethod}
                >
                  Use {formValues.usePhone ? "email" : "phone"} instead
                </button>
              </div>
              
              {formValues.usePhone ? (
                <Input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formValues.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="Enter your phone number"
                  required
                />
              ) : (
                <Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formValues.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="Enter your email"
                  required
                />
              )}
              
              <Input
                label="Password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formValues.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="Create a password"
                showPasswordToggle
                required
              />
              
              {formValues.password && <PasswordStrength password={formValues.password} />}
              
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formValues.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="Confirm your password"
                showPasswordToggle
                required
              />
            </div>

            <div className="flex items-center mt-4">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-3 w-3 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-xs text-gray-900">
                I agree to the{" "}
                <Link href="/terms" className="text-purple-600 hover:text-purple-500">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-purple-600 hover:text-purple-500">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button 
              type="submit" 
              fullWidth 
              isLoading={isLoading}
              className="bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 mt-4 py-2"
            >
              Create Account
            </Button>
          </form>
        ) : (
          <div className="opacity-50 space-y-4 pointer-events-none">
            <div className="rounded-md bg-gray-100 p-4 text-center">
              <p className="text-sm text-gray-500">Email/password registration is currently disabled.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 