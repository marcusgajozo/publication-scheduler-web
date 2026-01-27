import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, Award, Heart } from "lucide-react";

const stats = [
  {
    title: "Total Members",
    value: "342",
    icon: Users,
    change: "+12 this month",
    trend: "up",
  },
  {
    title: "Visitors",
    value: "28",
    icon: UserPlus,
    change: "Last 30 days",
    trend: "neutral",
  },
  {
    title: "Active Leaders",
    value: "45",
    icon: Award,
    change: "8 ministries",
    trend: "neutral",
  },
  {
    title: "Ministries",
    value: "12",
    icon: Heart,
    change: "All active",
    trend: "neutral",
  },
];

const recentActivity = [
  {
    id: 1,
    action: "New member joined",
    name: "Sarah Johnson",
    time: "2 hours ago",
  },
  {
    id: 2,
    action: "Schedule updated",
    name: "Sunday Worship Team",
    time: "4 hours ago",
  },
  {
    id: 3,
    action: "New song added",
    name: "Great Are You Lord",
    time: "Yesterday",
  },
  {
    id: 4,
    action: "Member promoted",
    name: "Michael Chen - Worship Leader",
    time: "2 days ago",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your church."
      />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {activity.action}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {activity.name}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
