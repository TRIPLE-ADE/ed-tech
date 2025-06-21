import type React from "react"
import { Suspense } from "react"
import { LayoutProvider, DashboardLayout } from "@/components/layout"

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutProvider>
      <DashboardLayout>
        <Suspense fallback={<DashboardLoadingFallback />}>{children}</Suspense>
      </DashboardLayout>
    </LayoutProvider>
  )
}

function DashboardLoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="text-sm text-slate-600 dark:text-slate-400">Loading...</p>
      </div>
    </div>
  )
}
