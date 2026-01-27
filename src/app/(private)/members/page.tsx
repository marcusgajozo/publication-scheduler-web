import { PageHeader } from "@/components/page-header";
import { MembersTable } from "@/components/members-table/members-table";

export default function MembersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Members Management"
        description="Manage your church members, leaders, and their ministry assignments."
      />
      <MembersTable />
    </div>
  );
}
