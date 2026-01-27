"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Music, Video, Baby } from "lucide-react"

interface TeamMember {
  role: string
  name: string
  status: "Confirmed" | "Pending" | "Unavailable"
}

interface Schedule {
  date: string
  service: string
  members: TeamMember[]
}

const worshipSchedules: Schedule[] = [
  {
    date: "October 10, 2025",
    service: "Sunday Morning Service",
    members: [
      { role: "Worship Leader", name: "Sarah Johnson", status: "Confirmed" },
      { role: "Vocals", name: "Emily Rodriguez", status: "Confirmed" },
      { role: "Keyboard", name: "Michael Chen", status: "Confirmed" },
      { role: "Guitar", name: "David Kim", status: "Pending" },
      { role: "Drums", name: "James Anderson", status: "Confirmed" },
    ],
  },
  {
    date: "October 17, 2025",
    service: "Sunday Morning Service",
    members: [
      { role: "Worship Leader", name: "David Kim", status: "Confirmed" },
      { role: "Vocals", name: "Amanda White", status: "Confirmed" },
      { role: "Keyboard", name: "Jennifer Martinez", status: "Confirmed" },
      { role: "Guitar", name: "Michael Chen", status: "Confirmed" },
      { role: "Drums", name: "Robert Taylor", status: "Unavailable" },
    ],
  },
]

const multimediaSchedules: Schedule[] = [
  {
    date: "October 10, 2025",
    service: "Sunday Morning Service",
    members: [
      { role: "Tech Director", name: "Michael Chen", status: "Confirmed" },
      { role: "Camera 1", name: "James Anderson", status: "Confirmed" },
      { role: "Camera 2", name: "Lisa Park", status: "Confirmed" },
      { role: "Audio", name: "David Wilson", status: "Confirmed" },
      { role: "Slides", name: "Mary Johnson", status: "Pending" },
    ],
  },
]

const kidsSchedules: Schedule[] = [
  {
    date: "October 10, 2025",
    service: "Sunday Morning Service",
    members: [
      { role: "Lead Teacher", name: "Amanda White", status: "Confirmed" },
      { role: "Assistant", name: "Emily Rodriguez", status: "Confirmed" },
      { role: "Check-in", name: "Jennifer Martinez", status: "Confirmed" },
      { role: "Snacks", name: "Lisa Anderson", status: "Pending" },
    ],
  },
]

function ScheduleCard({ schedule }: { schedule: Schedule }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{schedule.service}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <Calendar className="w-3 h-3" />
              {schedule.date}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {schedule.members.map((member, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{member.name}</span>
                <span className="text-xs text-muted-foreground">{member.role}</span>
              </div>
              <Badge
                variant={
                  member.status === "Confirmed" ? "default" : member.status === "Pending" ? "secondary" : "destructive"
                }
              >
                {member.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function ScheduleTabs() {
  return (
    <Tabs defaultValue="worship" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3 lg:w-auto">
        <TabsTrigger value="worship" className="gap-2">
          <Music className="w-4 h-4" />
          <span className="hidden sm:inline">Worship Team</span>
          <span className="sm:hidden">Worship</span>
        </TabsTrigger>
        <TabsTrigger value="multimedia" className="gap-2">
          <Video className="w-4 h-4" />
          <span className="hidden sm:inline">Multimedia</span>
          <span className="sm:hidden">Media</span>
        </TabsTrigger>
        <TabsTrigger value="kids" className="gap-2">
          <Baby className="w-4 h-4" />
          <span className="hidden sm:inline">Kids Ministry</span>
          <span className="sm:hidden">Kids</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="worship" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {worshipSchedules.map((schedule, idx) => (
            <ScheduleCard key={idx} schedule={schedule} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="multimedia" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {multimediaSchedules.map((schedule, idx) => (
            <ScheduleCard key={idx} schedule={schedule} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="kids" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {kidsSchedules.map((schedule, idx) => (
            <ScheduleCard key={idx} schedule={schedule} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
