"use client";

import * as React from "react";
import { Search, MoreVertical, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Song {
  id: string;
  title: string;
  artist: string;
  key: string;
  bpm: number;
  tempo: string;
  lastUsed: string;
}

const mockSongs: Song[] = [
  {
    id: "1",
    title: "Great Are You Lord",
    artist: "All Sons & Daughters",
    key: "G",
    bpm: 72,
    tempo: "Moderate",
    lastUsed: "Oct 3, 2025",
  },
  {
    id: "2",
    title: "What A Beautiful Name",
    artist: "Hillsong Worship",
    key: "D",
    bpm: 68,
    tempo: "Slow",
    lastUsed: "Sep 26, 2025",
  },
  {
    id: "3",
    title: "Way Maker",
    artist: "Sinach",
    key: "C",
    bpm: 138,
    tempo: "Moderate",
    lastUsed: "Oct 10, 2025",
  },
  {
    id: "4",
    title: "Goodness of God",
    artist: "Bethel Music",
    key: "C",
    bpm: 119,
    tempo: "Moderate",
    lastUsed: "Sep 19, 2025",
  },
  {
    id: "5",
    title: "Reckless Love",
    artist: "Cory Asbury",
    key: "E",
    bpm: 133,
    tempo: "Moderate",
    lastUsed: "Sep 12, 2025",
  },
  {
    id: "6",
    title: "Build My Life",
    artist: "Passion",
    key: "C",
    bpm: 72,
    tempo: "Moderate",
    lastUsed: "Oct 10, 2025",
  },
  {
    id: "7",
    title: "Graves Into Gardens",
    artist: "Elevation Worship",
    key: "D",
    bpm: 146,
    tempo: "Upbeat",
    lastUsed: "Oct 3, 2025",
  },
  {
    id: "8",
    title: "Holy Forever",
    artist: "Chris Tomlin",
    key: "Bb",
    bpm: 76,
    tempo: "Moderate",
    lastUsed: "Sep 26, 2025",
  },
];

export function SongsList() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredSongs = React.useMemo(() => {
    return mockSongs.filter(
      (song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search songs by title or artist..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          className="pl-9"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:hidden">
        {filteredSongs.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No songs found
          </div>
        ) : (
          filteredSongs.map((song) => (
            <Card key={song.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Music2 className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <h3 className="font-semibold text-sm leading-tight">
                        {song.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {song.artist}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 shrink-0"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Song</DropdownMenuItem>
                      <DropdownMenuItem>Add to Set List</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    Key: {song.key}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {song.bpm} BPM
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {song.tempo}
                  </Badge>
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    Last used: {song.lastUsed}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="hidden md:block border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Song</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Key</TableHead>
              <TableHead>BPM</TableHead>
              <TableHead>Tempo</TableHead>
              <TableHead>Last Used</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSongs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No songs found
                </TableCell>
              </TableRow>
            ) : (
              filteredSongs.map((song) => (
                <TableRow key={song.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Music2 className="w-4 h-4 text-primary" />
                      </div>
                      <div className="font-medium">{song.title}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {song.artist}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{song.key}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {song.bpm}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{song.tempo}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {song.lastUsed}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Song</DropdownMenuItem>
                        <DropdownMenuItem>Add to Set List</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredSongs.length} of {mockSongs.length} songs
      </div>
    </div>
  );
}
