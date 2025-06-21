import { FileText, Brain, Clock, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatsGridProps {
  documentsCount: number
  questionsCount: number
  studyHours: number
  accuracyRate: number
}

export function StatsGrid({ documentsCount, questionsCount, studyHours, accuracyRate }: StatsGridProps) {
  const stats = [
    {
      title: "Documents Processed",
      value: documentsCount.toString(),
      change: "+12%",
      icon: FileText,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Questions Generated",
      value: questionsCount.toString(),
      change: "+23%",
      icon: Brain,
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Study Hours",
      value: studyHours.toString(),
      change: "+8%",
      icon: Clock,
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: "Accuracy Rate",
      value: `${accuracyRate}%`,
      change: "+5%",
      icon: Target,
      color: "text-orange-600 dark:text-orange-400",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-slate-200 dark:border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">{stat.change} from last week</p>
              </div>
              <div className={`p-3 rounded-lg bg-slate-100 dark:bg-slate-800 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
