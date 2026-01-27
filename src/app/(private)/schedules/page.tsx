import { PageHeader } from "@/components/page-header";
import { ScheduleTabs } from "@/components/schedule-tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function SchedulesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Service Schedules"
        description="Manage volunteer schedules for worship, multimedia, and kids ministry teams."
      >
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Schedule
        </Button>
      </PageHeader>

      <ScheduleTabs />
    </div>
  );
}
