"use client"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "uploading":
      return <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
    case "processing":
      return <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />
    case "completed":
      return <CheckCircle className="w-4 h-4 text-green-500" />
    case "error":
      return <AlertCircle className="w-4 h-4 text-red-500" />
    default:
      return null
  }
}

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "uploading":
      return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Uploading</Badge>
    case "processing":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Processing</Badge>
      )
    case "completed":
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Completed</Badge>
    case "error":
      return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Error</Badge>
    default:
      return null
  }
}
