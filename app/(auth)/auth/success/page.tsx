"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { useAuth } from "@/features/auth/contexts/auth-context";

export default function AuthSuccessPage() {
  const [isProcessing, setIsProcessing] = useState(true);
  const { checkAuthState } = useAuth();
  const router = useRouter();

 useEffect(() => {
    (async () => {
      try {
        // rehydrate session
        await checkAuthState();
        toast.success("Successfully signed in with Google!");
        router.replace("/dashboard");
      } catch (err) {
        console.error("OAuth callback error:", err);
        toast.error("Authentication failed. Redirecting to sign in...");
        router.replace("/signin");
      }
    })();
  }, [checkAuthState, router]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4'>
      <Card className='w-full max-w-md border-slate-200 dark:border-slate-700 shadow-xl'>
        <CardHeader className='text-center pb-6'>
          <div className='flex items-center justify-center mb-4'>
            {isProcessing ? (
              <div className='w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center'>
                <Loader2 className='w-7 h-7 text-white animate-spin' />
              </div>
            ) : (
              <div className='w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center'>
                <CheckCircle className='w-7 h-7 text-white' />
              </div>
            )}
          </div>
          <CardTitle className='text-2xl font-bold text-slate-900 dark:text-slate-100'>
            {isProcessing ? "Completing sign in..." : "Welcome!"}
          </CardTitle>
        </CardHeader>

        <CardContent className='text-center'>
          <p className='text-slate-600 dark:text-slate-400 mb-6'>
            {isProcessing
              ? "We're setting up your account. This will only take a moment."
              : "You've successfully signed in with Google. Redirecting to your dashboard..."}
          </p>

          {isProcessing && (
            <div className='flex items-center justify-center space-x-2'>
              <div className='w-2 h-2 bg-blue-600 rounded-full animate-bounce'></div>
              <div
                className='w-2 h-2 bg-blue-600 rounded-full animate-bounce'
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className='w-2 h-2 bg-blue-600 rounded-full animate-bounce'
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
