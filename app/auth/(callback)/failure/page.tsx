import React, { Suspense } from "react";
import { XCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { AuthFailureContent } from "@/features/auth/components/google-auth-failure";


// Loading fallback component
function AuthFailureLoading() {
  return (
    <Card className='w-full max-w-md border-slate-200 dark:border-slate-700 shadow-xl'>
      <CardHeader className='text-center pb-6'>
        <div className='flex items-center justify-center mb-4'>
          <div className='w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center'>
            <XCircle className='w-7 h-7 text-white' />
          </div>
        </div>
        <CardTitle className='text-2xl font-bold text-slate-900 dark:text-slate-100'>
          Sign-in Failed
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='text-center'>
          <div className='animate-pulse'>
            <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mx-auto mb-4'></div>
            <div className='h-10 bg-slate-200 dark:bg-slate-700 rounded mb-3'></div>
            <div className='h-10 bg-slate-200 dark:bg-slate-700 rounded'></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Main component with Suspense boundary
export default function AuthFailurePage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4'>
      <Suspense fallback={<AuthFailureLoading />}>
        <AuthFailureContent />
      </Suspense>
    </div>
  );
}