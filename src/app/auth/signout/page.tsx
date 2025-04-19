"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/app/components/ui/Button";

export default function SignOutPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: "/" });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Sign Out</h2>
          <p className="mt-2 text-sm text-gray-600">
            Are you sure you want to sign out?
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="flex flex-col gap-3">
            <Button
              type="button"
              onClick={handleSignOut}
              loading={isLoading}
              className="w-full"
            >
              Sign out
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              className="w-full"
              variant="outline"
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-purple-600 hover:text-purple-500"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
} 