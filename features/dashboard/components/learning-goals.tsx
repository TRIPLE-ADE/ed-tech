import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { LearningGoal } from "../types"

interface LearningGoalsProps {
  goals: LearningGoal[]
}

export function LearningGoals({ goals }: LearningGoalsProps) {
  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="text-slate-900 dark:text-slate-100">Learning Goals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-slate-900 dark:text-slate-100">{goal.title}</h3>
              <span className="text-sm text-slate-500 dark:text-slate-400">{goal.progress}%</span>
            </div>
            <Progress value={goal.progress} className="h-2" />
            <p className="text-sm text-slate-500 dark:text-slate-400">Target: {goal.target}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
