"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

export default function AuthFailurePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  useEffect(() => {
    // Log the error for debugging
    if (error) {
      console.error('OAuth Error:', error, errorDescription);
    }
  }, [error, errorDescription]);

  const getErrorMessage = () => {
    switch (error) {
      case 'access_denied':
        return "You cancelled the Google sign-in process.";
      case 'invalid_request':
        return "Invalid request. Please try again.";
      case 'unauthorized_client':
        return "This application is not authorized for Google sign-in.";
      case 'server_error':
        return "Google encountered a server error. Please try again.";
      case 'temporarily_unavailable':
        return "Google sign-in is temporarily unavailable. Please try again later.";
      default:
        return errorDescription || "Something went wrong during Google sign-in. Please try again.";
    }
  };

  const handleRetry = () => {
    router.replace("/signin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-slate-200 dark:border-slate-700 shadow-xl">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <XCircle className="w-7 h-7 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Sign-in Failed
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {getErrorMessage()}
            </p>
            
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
                <p className="text-sm text-red-700 dark:text-red-400">
                  <strong>Error:</strong> {error}
                </p>
                {errorDescription && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    {errorDescription}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleRetry}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>

            <Link href="/" className="block">
              <Button
                variant="outline"
                className="w-full border-slate-300 dark:border-slate-600"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Having trouble? Try signing in with email and password instead.
            </p>
            <Link
              href="/auth/signin"
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Sign in with email
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}