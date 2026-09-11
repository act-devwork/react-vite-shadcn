import { create } from 'zustand'
import type { GenerationJob } from '@/types/video'

interface GenerationState {
  jobs: GenerationJob[]
  addJob: (job: GenerationJob) => void
  updateProgress: (id: string, progress: number) => void
  removeJob: (id: string) => void
}

export const useGenerationStore = create<GenerationState>((set) => ({
  jobs: [],
  addJob: (job) => set((state) => ({ jobs: [job, ...state.jobs] })),
  updateProgress: (id, progress) =>
    set((state) => ({
      jobs: state.jobs.map((job) => (job.id === id ? { ...job, progress } : job)),
    })),
  removeJob: (id) => set((state) => ({ jobs: state.jobs.filter((job) => job.id !== id) })),
}))
