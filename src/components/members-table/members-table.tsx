"use client";

import * as React from "react";
import {
  Search,
  MoreVertical,
  UserPlus,
  Filter,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Member {
  id: string;
  name: string;
  role: "Member" | "Leader";
  status: "Active" | "Inactive";
  phone: string;
  email: string;
  ministry: string;
}

const mockMembers: Member[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Leader",
    status: "Active",
    phone: "(555) 123-4567",
    email: "sarah.j@email.com",
    ministry: "Worship Team",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Leader",
    status: "Active",
    phone: "(555) 234-5678",
    email: "michael.c@email.com",
    ministry: "Multimedia",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Member",
    status: "Active",
    phone: "(555) 345-6789",
    email: "emily.r@email.com",
    ministry: "Kids Ministry",
  },
  {
    id: "4",
    name: "David Kim",
    role: "Leader",
    status: "Active",
    phone: "(555) 456-7890",
    email: "david.k@email.com",
    ministry: "Ushers",
  },
  {
    id: "5",
    name: "Jennifer Martinez",
    role: "Member",
    status: "Active",
    phone: "(555) 567-8901",
    email: "jennifer.m@email.com",
    ministry: "Worship Team",
  },
  {
    id: "6",
    name: "Robert Taylor",
    role: "Member",
    status: "Inactive",
    phone: "(555) 678-9012",
    email: "robert.t@email.com",
    ministry: "Parking",
  },
  {
    id: "7",
    name: "Amanda White",
    role: "Leader",
    status: "Active",
    phone: "(555) 789-0123",
    email: "amanda.w@email.com",
    ministry: "Kids Ministry",
  },
  {
    id: "8",
    name: "James Anderson",
    role: "Member",
    status: "Active",
    phone: "(555) 890-1234",
    email: "james.a@email.com",
    ministry: "Multimedia",
  },
];

export function MembersTable() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [ministryFilter, setMinistryFilter] = React.useState<string>("all");

  const filteredMembers = React.useMemo(() => {
    return mockMembers.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.phone.includes(searchQuery);

      const matchesMinistry =
        ministryFilter === "all" || member.ministry === ministryFilter;

      return matchesSearch && matchesMinistry;
    });
  }, [searchQuery, ministryFilter]);

  const ministries = Array.from(new Set(mockMembers.map((m) => m.ministry)));

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            className="pl-9"
          />
        </div>

        <div className="flex gap-2">
          <Select value={ministryFilter} onValueChange={setMinistryFilter}>
            <SelectTrigger className="w-45">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by ministry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ministries</SelectItem>
              {ministries.map((ministry) => (
                <SelectItem key={ministry} value={ministry}>
                  {ministry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Add Member</span>
          </Button>
        </div>
      </div>

      <div className="md:hidden space-y-3">
        {filteredMembers.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No members found
          </div>
        ) : (
          filteredMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {member.ministry}
                    </p>
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
                      <DropdownMenuItem>Edit Member</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <Badge
                    variant={member.role === "Leader" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {member.role}
                  </Badge>
                  <Badge
                    variant={member.status === "Active" ? "default" : "outline"}
                    className="text-xs"
                  >
                    {member.status}
                  </Badge>
                </div>

                <div className="space-y-2 pt-3 border-t border-border">
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {member.phone}
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    {member.email}
                  </a>
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
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Ministry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Phone</TableHead>
              <TableHead className="hidden lg:table-cell">Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No members found
                </TableCell>
              </TableRow>
            ) : (
              filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        member.role === "Leader" ? "default" : "secondary"
                      }
                    >
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {member.ministry}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        member.status === "Active" ? "default" : "outline"
                      }
                    >
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">
                    {member.phone}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">
                    {member.email}
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
                        <DropdownMenuItem>Edit Member</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Remove
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
        Showing {filteredMembers.length} of {mockMembers.length} members
      </div>
    </div>
  );
}
