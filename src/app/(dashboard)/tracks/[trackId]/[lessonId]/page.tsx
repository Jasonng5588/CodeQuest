import { createClient } from "@/lib/supabase/server";
import { ALL_TRACKS } from "@/lib/data/tracks-seed";
import { findStaticLesson, findNextStaticLesson } from "@/lib/data/lesson-content";
import { notFound } from "next/navigation";
import LessonEditor from "@/components/lesson/LessonEditor";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ trackId: string; lessonId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lessonId, trackId } = await params;
  const track = ALL_TRACKS.find(t => t.id === trackId);
  const staticLesson = findStaticLesson(lessonId, trackId, track?.title ?? "");
  return {
    title: `${staticLesson?.title ?? "Lesson"} — ${track?.title ?? "CodeQuest"} | CodeQuest`,
  };
}

export default async function LessonPage({ params }: Props) {
  const { trackId, lessonId } = await params;
  const trackMeta = ALL_TRACKS.find(t => t.id === trackId);
  if (!trackMeta) notFound();

  // Check static data first — skip DB entirely if found (instant load)
  const staticLesson = findStaticLesson(lessonId, trackId, trackMeta.title);

  if (staticLesson) {
    const next = findNextStaticLesson(lessonId, trackId, trackMeta.title);
    const typedLesson = {
      id: String(staticLesson.id),
      title: String(staticLesson.title),
      type: String(staticLesson.type),
      explanation_md: String(staticLesson.explanation_md ?? ""),
      starter_code: String(staticLesson.starter_code ?? ""),
      reference_solution: String(staticLesson.reference_solution ?? ""),
      hints: (staticLesson.hints as string[]) ?? [],
      test_cases: (staticLesson.test_cases as Array<{ description: string; expected_output: string; input?: string }>) ?? [],
      xp_reward: Number(staticLesson.xp_reward ?? 50),
      unit_id: String(staticLesson.unit_id ?? ""),
    };
    return (
      <LessonEditor
        lesson={typedLesson}
        trackId={trackId}
        trackTitle={trackMeta.title}
        nextLessonId={next?.id}
      />
    );
  }

  // Fall back to DB for lessons not in static data
  const supabase = await createClient();
  const { data: dbLesson } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", lessonId)
    .maybeSingle();

  if (!dbLesson) notFound();

  let nextLessonId: string | undefined;
  const { data: nextLesson } = await supabase
    .from("lessons")
    .select("id")
    .eq("unit_id", dbLesson.unit_id as string)
    .gt("order_index", dbLesson.order_index as number)
    .order("order_index")
    .limit(1)
    .maybeSingle();
  nextLessonId = nextLesson?.id;

  const typedLesson = {
    id: String(dbLesson.id),
    title: String(dbLesson.title),
    type: String(dbLesson.type),
    explanation_md: String(dbLesson.explanation_md ?? ""),
    starter_code: String(dbLesson.starter_code ?? ""),
    reference_solution: String(dbLesson.reference_solution ?? ""),
    hints: (dbLesson.hints as string[]) ?? [],
    test_cases: (dbLesson.test_cases as Array<{ description: string; expected_output: string; input?: string }>) ?? [],
    xp_reward: Number(dbLesson.xp_reward ?? 50),
    unit_id: String(dbLesson.unit_id ?? ""),
  };

  return (
    <LessonEditor
      lesson={typedLesson}
      trackId={trackId}
      trackTitle={trackMeta.title}
      nextLessonId={nextLessonId}
    />
  );
}

