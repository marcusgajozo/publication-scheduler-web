import { PageHeader } from "@/components/page-header";
import { MinistryCard } from "@/components/ministry-card";
import {
  Music,
  Video,
  Baby,
  UserCheck,
  Users,
  Coffee,
  Car,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ministries = [
  {
    id: "1",
    title: "Worship Team",
    icon: Music,
    volunteers: 18,
    leader: "Sarah Johnson",
    color: "bg-primary",
  },
  {
    id: "2",
    title: "Multimedia",
    icon: Video,
    volunteers: 12,
    leader: "Michael Chen",
    color: "bg-accent",
  },
  {
    id: "3",
    title: "Kids Ministry",
    icon: Baby,
    volunteers: 25,
    leader: "Amanda White",
    color: "bg-chart-4",
  },
  {
    id: "4",
    title: "Ushers",
    icon: UserCheck,
    volunteers: 15,
    leader: "David Kim",
    color: "bg-chart-5",
  },
  {
    id: "5",
    title: "Welcome Team",
    icon: Users,
    volunteers: 10,
    leader: "Lisa Anderson",
    color: "bg-chart-2",
  },
  {
    id: "6",
    title: "Hospitality",
    icon: Coffee,
    volunteers: 8,
    leader: "John Davis",
    color: "bg-chart-3",
  },
  {
    id: "7",
    title: "Parking",
    icon: Car,
    volunteers: 6,
    leader: "Robert Taylor",
    color: "bg-primary",
  },
  {
    id: "8",
    title: "Prayer Team",
    icon: BookOpen,
    volunteers: 14,
    leader: "Mary Wilson",
    color: "bg-accent",
  },
];

export default function MinistriesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Ministries & Teams"
        description="Overview of all church ministries, their volunteers, and leaders."
      >
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Ministry
        </Button>
      </PageHeader>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ministries.map((ministry) => (
          <MinistryCard
            key={ministry.id}
            title={ministry.title}
            icon={ministry.icon}
            volunteers={ministry.volunteers}
            leader={ministry.leader}
            color={ministry.color}
          />
        ))}
      </div>
    </div>
  );
}
