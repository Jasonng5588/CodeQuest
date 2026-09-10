import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { STATIC_TRACKS } from "@/lib/data/lesson-content";

// Use service role key to bypass RLS
function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key);
}

export async function GET() {
  try {
    const supabase = getAdminClient();
    const results: string[] = [];

    for (const track of STATIC_TRACKS) {
      // 1. Upsert track
      const { error: trackError } = await supabase
        .from("tracks")
        .upsert({
          id: track.id,
          title: track.title,
          description: track.description,
          icon: "code",
          color: track.color,
          difficulty_curve: track.difficulty_curve,
          execution_engine: track.execution_engine,
          category: track.category,
          order_index: track.order_index,
          is_published: true,
          estimated_hours: track.estimated_hours,
          learner_count: track.learner_count,
        }, { onConflict: "id" });

      if (trackError) {
        results.push(`Track ${track.id} ERROR: ${trackError.message}`);
        continue;
      }
      results.push(`Track ${track.id}: OK`);

      for (const unit of track.units) {
        // 2. Upsert unit
        const { error: unitError } = await supabase
          .from("units")
          .upsert({
            id: unit.id,
            track_id: unit.track_id,
            title: unit.title,
            description: unit.description,
            icon: unit.icon,
            order_index: unit.order_index,
            unlock_requirements: [],
          }, { onConflict: "id" });

        if (unitError) {
          results.push(`  Unit ${unit.id} ERROR: ${unitError.message}`);
          continue;
        }
        results.push(`  Unit ${unit.id}: OK`);

        for (const lesson of unit.lessons) {
          // 3. Upsert lesson
          const { error: lessonError } = await supabase
            .from("lessons")
            .upsert({
              id: lesson.id,
              unit_id: lesson.unit_id,
              track_id: lesson.track_id,
              type: lesson.type,
              title: lesson.title,
              explanation_md: lesson.explanation_md,
              starter_code: lesson.starter_code,
              reference_solution: lesson.reference_solution,
              hints: lesson.hints,
              test_cases: lesson.test_cases,
              xp_reward: lesson.xp_reward,
              order_index: lesson.order_index,
              execution_engine: lesson.execution_engine,
            }, { onConflict: "id" });

          if (lessonError) {
            results.push(`    Lesson ${lesson.id} ERROR: ${lessonError.message}`);
          } else {
            results.push(`    Lesson ${lesson.id}: OK`);
          }
        }
      }
    }

    return NextResponse.json({ success: true, results }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
