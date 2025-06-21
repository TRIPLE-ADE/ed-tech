"use client"

import { FileText, MoreHorizontal, Eye, Play, Brain, Download, Share2, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Document } from "../types"

interface RecentDocumentsProps {
  documents: Document[]
  onViewDocument: (document: Document) => void
  onStartStudy: (document: Document) => void
  onGenerateQuiz: (document: Document) => void
  onDownload: (document: Document) => void
  onShare: (document: Document) => void
  onDelete: (document: Document) => void
  onViewAll: () => void
}

export function RecentDocuments({
  documents,
  onViewDocument,
  onStartStudy,
  onGenerateQuiz,
  onDownload,
  onShare,
  onDelete,
  onViewAll,
}: RecentDocumentsProps) {
  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-slate-900 dark:text-slate-100">Recent Documents</CardTitle>
        <Button variant="ghost" size="sm" onClick={onViewAll}>
          View all
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {documents.slice(0, 3).map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-slate-100">{doc.title}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-1">
                  <span>
                    {doc.type} • {doc.size}
                  </span>
                  <span>{doc.lastAccessed}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {doc.status === "processed" ? (
                <div className="text-right">
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {doc.questions} questions
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{doc.accuracy}% accuracy</div>
                </div>
              ) : (
                <Badge variant="secondary">Processing...</Badge>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onViewDocument(doc)}>
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </DropdownMenuItem>
                  {doc.status === "processed" && (
                    <>
                      <DropdownMenuItem onClick={() => onStartStudy(doc)}>
                        <Play className="w-4 h-4 mr-2" />
                        Study
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onGenerateQuiz(doc)}>
                        <Brain className="w-4 h-4 mr-2" />
                        Generate Quiz
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem onClick={() => onDownload(doc)}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onShare(doc)}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(doc)} className="text-red-600 dark:text-red-400">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
