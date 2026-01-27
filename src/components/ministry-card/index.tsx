import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, ChevronRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface MinistryCardProps {
  title: string
  icon: LucideIcon
  volunteers: number
  leader: string
  color: string
}

export function MinistryCard({ title, icon: Icon, volunteers, leader, color }: MinistryCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <Button variant="ghost" size="icon">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
        <CardTitle className="mt-4">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {volunteers} {volunteers === 1 ? "volunteer" : "volunteers"}
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-sm text-muted-foreground">Leader</span>
            <Badge variant="secondary">{leader}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
