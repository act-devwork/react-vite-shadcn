export type VideoStatus = 'draft' | 'queued' | 'generating' | 'completed' | 'failed'

export interface VideoProject {
  id: string
  name: string
  prompt: string
  thumbnailUrl?: string
  duration: number
  aspectRatio: '16:9' | '9:16' | '1:1'
  status: VideoStatus
  createdAt: string
}

export interface GenerationJob {
  id: string
  projectName: string
  progress: number
  status: VideoStatus
}

export interface VideoGenerationPayload {
  projectName: string
  prompt: string
  model: string
  style: string
  aspectRatio: '16:9' | '9:16' | '1:1'
  duration: 5 | 8 | 10
  resolution: '720p' | '1080p'
}
