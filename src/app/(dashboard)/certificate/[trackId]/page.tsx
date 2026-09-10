
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ALL_TRACKS } from "@/lib/data/tracks-seed";
import { notFound } from "next/navigation";
import CertificateView from "@/components/certificate/CertificateView";
import type { Metadata } from "next";

interface Props { params: Promise<{ trackId: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { trackId } = await params;
  const track = ALL_TRACKS.find(t => t.id === trackId);
  return { title: `${track?.title ?? "Track"} Certificate — CodeQuest` };
}

export default async function CertificatePage({ params }: Props) {
  const { trackId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const track = ALL_TRACKS.find(t => t.id === trackId);
  if (!track) notFound();

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("display_name, username")
    .eq("id", user.id)
    .single();

  const displayName = profile?.display_name || profile?.username || user.email?.split("@")[0] || "Student";
  const certId = `CQ-${trackId.toUpperCase()}-${user.id.slice(0, 8).toUpperCase()}`;
  const issuedDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <CertificateView
      trackId={trackId}
      trackTitle={track.title}
      trackIcon={track.icon}
      trackColor={track.color}
      userName={displayName}
      certId={certId}
      issuedDate={issuedDate}
    />
  );
}
