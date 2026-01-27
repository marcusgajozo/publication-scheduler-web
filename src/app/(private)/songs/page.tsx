import { PageHeader } from "@/components/page-header";
import { SongsList } from "@/components/songs-list";
import { AddSongDialog } from "@/components/add-song-dialog";

export default function SongsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Songs & Repertoire"
        description="Manage your worship song library with keys, tempo, and usage tracking."
      >
        <AddSongDialog />
      </PageHeader>

      <SongsList />
    </div>
  );
}
