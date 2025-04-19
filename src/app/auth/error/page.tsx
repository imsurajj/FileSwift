"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Button from "@/app/components/ui/Button";
import { Suspense } from "react";

// Error messages mapping
const errorMessages: Record<string, string> = {
  Configuration: "There is a problem with the server configuration. Please contact support.",
  AccessDenied: "You do not have permission to sign in.",
  Verification: "The verification link has expired or has already been used.",
  Default: "An unexpected error occurred. Please try again.",
  OAuthSignin: "Error starting OAuth provider sign in flow.",
  OAuthCallback: "Error in OAuth provider callback.",
  OAuthCreateAccount: "Error creating OAuth provider account.",
  EmailCreateAccount: "Error creating email provider account.",
  Callback: "Error in OAuth callback.",
  OAuthAccountNotLinked: "Email already associated with another account. Please sign in using the original provider.",
  EmailSignin: "Error sending email sign in link.",
  CredentialsSignin: "The email or password you entered is incorrect.",
  SessionRequired: "Please sign in to access this page.",
};

// Component that uses the search params
function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams?.get("error") || "Default";
  
  // Get the error message or use default
  const errorMessage = errorMessages[error] || errorMessages.Default;

  return (
    <div>
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Authentication Under Maintenance</h2>
        <p className="mt-2 text-sm text-gray-600">We are currently working on authentication. Please check back later.</p>
      </div>
      
      <div className="mt-8 space-y-6">
        <div className="flex flex-col gap-3">
          <Link href="/">
            <Button variant="outline" className="w-full">
              Return to home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Loading fallback component
function ErrorLoadingFallback() {
  return (
    <div className="text-center">
      <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Authentication Error</h2>
      <p className="mt-2 text-sm text-gray-600">Loading error details...</p>
    </div>
  );
}

// Main page component wrapped with Suspense
export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Suspense fallback={<ErrorLoadingFallback />}>
          <ErrorContent />
        </Suspense>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Need assistance?{" "}
            <Link
              href="/help"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 