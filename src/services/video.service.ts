import type { VideoGenerationPayload, VideoProject } from '@/types/video'
import { httpClient } from './http-client'

const demoProjects: VideoProject[] = [
  {
    id: 'project-01',
    name: 'Autumn product reveal',
    prompt: 'A cinematic close-up of a premium watch on dark stone.',
    duration: 8,
    aspectRatio: '16:9',
    status: 'completed',
    createdAt: '2026-09-09T09:30:00.000Z',
  },
  {
    id: 'project-02',
    name: 'City after rain',
    prompt: 'Neon reflections across a quiet city street after rainfall.',
    duration: 5,
    aspectRatio: '9:16',
    status: 'draft',
    createdAt: '2026-09-08T13:10:00.000Z',
  },
  {
    id: 'project-03',
    name: 'Coffee ritual',
    prompt: 'Warm morning light, slow pour-over coffee, soft film grain.',
    duration: 10,
    aspectRatio: '1:1',
    status: 'generating',
    createdAt: '2026-09-07T02:40:00.000Z',
  },
]

export const videoService = {
  async listProjects(): Promise<VideoProject[]> {
    // Replace the local fallback with: return (await httpClient.get('/projects')).data
    await new Promise((resolve) => setTimeout(resolve, 350))
    return demoProjects
  },

  async generate(payload: VideoGenerationPayload): Promise<{ jobId: string }> {
    if (import.meta.env.VITE_ENABLE_REAL_API === 'true') {
      return (await httpClient.post('/generations', payload)).data
    }
    await new Promise((resolve) => setTimeout(resolve, 650))
    return { jobId: crypto.randomUUID() }
  },
}
