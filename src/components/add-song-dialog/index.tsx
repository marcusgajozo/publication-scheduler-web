"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

export function AddSongDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Song
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Add New Song</DialogTitle>
          <DialogDescription>
            Add a new song to your worship repertoire.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Song Title</Label>
            <Input id="title" placeholder="Great Are You Lord" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="artist">Artist</Label>
            <Input id="artist" placeholder="All Sons & Daughters" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="key">Key</Label>
              <Input id="key" placeholder="G" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bpm">BPM</Label>
              <Input id="bpm" type="number" placeholder="72" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tempo">Tempo</Label>
            <Input id="tempo" placeholder="Moderate" />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Song</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
