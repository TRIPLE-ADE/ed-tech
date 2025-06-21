"use client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { Document } from "../types"

export function useDocumentActions() {
  const router = useRouter()

  const viewDocument = (document: Document) => {
    toast.success("Opening document", {
      description: `Opening ${document.title} in viewer...`,
    })
    router.push(`/dashboard/documents/${document.id}`)
  }

  const downloadDocument = (document: Document) => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => resolve(document), 2000)
      }),
      {
        loading: `Downloading ${document.title}...`,
        success: `${document.title} downloaded successfully`,
        error: "Download failed",
      },
    )
  }

  const shareDocument = (document: Document) => {
    const shareUrl = `${window.location.origin}/dashboard/documents/${document.id}`

    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: `Check out this document: ${document.title}`,
        url: shareUrl,
      })
    } else {
      navigator.clipboard.writeText(shareUrl)
      toast.success("Link copied", {
        description: "Document link copied to clipboard",
      })
    }
  }

  const deleteDocument = (document: Document, onDelete: (id: number) => void) => {
    toast.error(`${document.title} deleted`, {
      description: "Document has been moved to trash",
      action: {
        label: "Undo",
        onClick: () => {
          toast.success("Document restored", {
            description: `${document.title} has been restored`,
          })
        },
      },
    })

    // Remove from state after a delay to allow for undo
    setTimeout(() => {
      onDelete(document.id)
    }, 5000)
  }

  return {
    viewDocument,
    downloadDocument,
    shareDocument,
    deleteDocument,
  }
}
