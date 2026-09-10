import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/layout/Navbar";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const headersList = await headers();
    const pathname = headersList.get("x-pathname") || "/";
    redirect(`/login?redirectTo=${encodeURIComponent(pathname)}`);
  }

  return (
    <div style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
      <Navbar />
      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "32px 24px" }}>
        {children}
      </main>
    </div>
  );
}

