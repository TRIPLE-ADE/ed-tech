import { Award, Zap, Target, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Achievement } from "../types"

interface AchievementsSectionProps {
  achievements: Achievement[]
}

const achievementIcons = {
  speed: Zap,
  accuracy: Target,
  consistency: TrendingUp,
  milestone: Award,
}

const achievementColors = {
  speed:
    "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800",
  accuracy:
    "from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800",
  consistency:
    "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800",
  milestone:
    "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800",
}

const achievementBgColors = {
  speed: "bg-yellow-500",
  accuracy: "bg-blue-500",
  consistency: "bg-green-500",
  milestone: "bg-purple-500",
}

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <Award className="w-5 h-5 text-yellow-500" />
          Recent Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((achievement) => {
            const IconComponent = achievementIcons[achievement.type]
            const colorClass = achievementColors[achievement.type]
            const bgColorClass = achievementBgColors[achievement.type]

            return (
              <div
                key={achievement.id}
                className={`flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r border ${colorClass}`}
              >
                <div className={`w-10 h-10 rounded-full ${bgColorClass} flex items-center justify-center`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-slate-100">{achievement.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{achievement.description}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{achievement.date}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
