"use client"
import { useState } from "react"
import {
  FileText,
  Video,
  Search,
  Filter,
  MoreHorizontal,
  Play,
  Download,
  Trash2,
  Eye,
  Calendar,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  const documents = [
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      lastAccessed: "2 hours ago",
      status: "processed",
      questions: 12,
      accuracy: 92,
      studyTime: "3.5h",
      thumbnail: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      title: "Data Structures & Algorithms",
      type: "PDF",
      size: "1.8 MB",
      uploadDate: "2024-01-14",
      lastAccessed: "1 day ago",
      status: "processed",
      questions: 8,
      accuracy: 85,
      studyTime: "2.1h",
      thumbnail: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      title: "React Advanced Patterns",
      type: "YouTube",
      size: "45 min",
      uploadDate: "2024-01-13",
      lastAccessed: "Just now",
      status: "processing",
      questions: 0,
      accuracy: 0,
      studyTime: "0h",
      thumbnail: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 4,
      title: "Database Design Principles",
      type: "PDF",
      size: "3.2 MB",
      uploadDate: "2024-01-12",
      lastAccessed: "3 days ago",
      status: "processed",
      questions: 15,
      accuracy: 78,
      studyTime: "4.2h",
      thumbnail: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 5,
      title: "System Design Interview",
      type: "YouTube",
      size: "1.2h",
      uploadDate: "2024-01-11",
      lastAccessed: "5 days ago",
      status: "processed",
      questions: 6,
      accuracy: 95,
      studyTime: "1.8h",
      thumbnail: "/placeholder.svg?height=60&width=60",
    },
  ]

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === "all" || doc.type.toLowerCase() === filterType
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Processed</Badge>
      case "processing":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Processing</Badge>
        )
      case "failed":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Failed</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-500" />
      case "youtube":
        return <Video className="w-5 h-5 text-red-600" />
      default:
        return <FileText className="w-5 h-5 text-slate-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Documents</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage and analyze your learning materials</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Upload Document</Button>
      </div>

      {/* Filters */}
      <Card className="border-slate-200 dark:border-slate-700">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    {getTypeIcon(doc.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">{doc.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusBadge(doc.status)}
                      <span className="text-sm text-slate-500 dark:text-slate-400">{doc.size}</span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Play className="w-4 h-4 mr-2" />
                      Study
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600 dark:text-red-400">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {doc.status === "processed" && (
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">{doc.questions}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">{doc.accuracy}%</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">{doc.studyTime}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Study Time</div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(doc.uploadDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {doc.lastAccessed}
                </div>
              </div>

              {doc.status === "processed" && (
                <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <Play className="w-4 h-4 mr-2" />
                  Start Studying
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card className="border-slate-200 dark:border-slate-700">
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">No documents found</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {searchQuery || filterType !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Upload your first document to get started with AI-powered learning."}
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Upload Document</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
