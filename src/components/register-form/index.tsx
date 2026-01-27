"use client";

import * as React from "react";
import Link from "next/link";
import { Church } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function RegisterForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError("");

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Church className="w-6 h-6 text-primary" />
        </div>
        <div>
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
          <CardDescription className="mt-2">
            Start managing your church community today
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              required
              disabled={isLoading}
              autoComplete="name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="church-name">Church Name</Label>
            <Input
              id="church-name"
              type="text"
              placeholder="Grace Community Church"
              required
              disabled={isLoading}
              autoComplete="organization"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-email">Email</Label>
            <Input
              id="register-email"
              type="email"
              placeholder="pastor@church.com"
              required
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-password">Password</Label>
            <Input
              id="register-password"
              type="password"
              placeholder="••••••••"
              required
              disabled={isLoading}
              autoComplete="new-password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              required
              disabled={isLoading}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
            />
            {passwordError && (
              <p className="text-sm text-destructive">{passwordError}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
