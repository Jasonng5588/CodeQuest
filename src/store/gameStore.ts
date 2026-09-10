import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserProfile, UserProgress, TrackProgress } from "@/types";

interface GameState {
  // User
  profile: UserProfile | null;
  progress: Record<string, UserProgress>; // keyed by lesson_id
  trackProgress: Record<string, TrackProgress>; // keyed by track_id
  
  // Session UI state
  currentTrackId: string | null;
  currentLessonId: string | null;
  hintsUsed: number;
  elapsedSeconds: number;
  isLessonActive: boolean;

  // Actions
  setProfile: (profile: UserProfile | null) => void;
  setProgress: (progress: UserProgress[]) => void;
  updateLessonProgress: (progress: UserProgress) => void;
  setCurrentLesson: (trackId: string, lessonId: string) => void;
  incrementHintsUsed: () => void;
  setElapsedSeconds: (s: number) => void;
  startLesson: () => void;
  endLesson: () => void;
  reset: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      profile: null,
      progress: {},
      trackProgress: {},
      currentTrackId: null,
      currentLessonId: null,
      hintsUsed: 0,
      elapsedSeconds: 0,
      isLessonActive: false,

      setProfile: (profile) => set({ profile }),

      setProgress: (progressList) => {
        const progressMap: Record<string, UserProgress> = {};
        const trackXp: Record<string, number> = {};
        const trackCompleted: Record<string, number> = {};
        const trackTotal: Record<string, number> = {};

        for (const p of progressList) {
          progressMap[p.lesson_id] = p;
          trackXp[p.track_id] = (trackXp[p.track_id] || 0) + p.xp_earned;
          trackTotal[p.track_id] = (trackTotal[p.track_id] || 0) + 1;
          if (p.status === "completed") {
            trackCompleted[p.track_id] = (trackCompleted[p.track_id] || 0) + 1;
          }
        }

        const trackProgress: Record<string, TrackProgress> = {};
        for (const trackId of Object.keys(trackTotal)) {
          const completed = trackCompleted[trackId] || 0;
          const total = trackTotal[trackId];
          trackProgress[trackId] = {
            track_id: trackId,
            total_lessons: total,
            completed_lessons: completed,
            total_xp_earned: trackXp[trackId] || 0,
            percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
          };
        }

        set({ progress: progressMap, trackProgress });
      },

      updateLessonProgress: (progress) =>
        set((state) => ({
          progress: { ...state.progress, [progress.lesson_id]: progress },
        })),

      setCurrentLesson: (trackId, lessonId) =>
        set({ currentTrackId: trackId, currentLessonId: lessonId, hintsUsed: 0, elapsedSeconds: 0 }),

      incrementHintsUsed: () =>
        set((state) => ({ hintsUsed: state.hintsUsed + 1 })),

      setElapsedSeconds: (s) => set({ elapsedSeconds: s }),

      startLesson: () => set({ isLessonActive: true, elapsedSeconds: 0, hintsUsed: 0 }),

      endLesson: () => set({ isLessonActive: false }),

      reset: () =>
        set({
          profile: null,
          progress: {},
          trackProgress: {},
          currentTrackId: null,
          currentLessonId: null,
          hintsUsed: 0,
          elapsedSeconds: 0,
          isLessonActive: false,
        }),
    }),
    {
      name: "codequest-game",
      // Only persist session state, not server data
      partialize: (state) => ({
        currentTrackId: state.currentTrackId,
        currentLessonId: state.currentLessonId,
      }),
    }
  )
);
