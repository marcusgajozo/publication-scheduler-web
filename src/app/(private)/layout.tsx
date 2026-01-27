import { AppSidebar } from "@/components/app-sidebar";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppSidebar />
      <main className="lg:pl-64 min-h-screen">
        <div className="p-6 lg:p-8 pt-20 lg:pt-8">{children}</div>
      </main>
    </>
  );
}
