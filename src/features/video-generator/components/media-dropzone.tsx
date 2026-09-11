import { ImagePlus, UploadCloud, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

interface PreviewFile {
  file: File
  url: string
}

export function MediaDropzone() {
  const [files, setFiles] = useState<PreviewFile[]>([])
  const filesRef = useRef<PreviewFile[]>([])

  useEffect(() => {
    filesRef.current = files
  }, [files])

  useEffect(() => () => filesRef.current.forEach((item) => URL.revokeObjectURL(item.url)), [])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((current) => [
      ...current,
      ...acceptedFiles.slice(0, 4 - current.length).map((file) => ({ file, url: URL.createObjectURL(file) })),
    ])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    maxFiles: 4,
    maxSize: 10 * 1024 * 1024,
    onDrop,
  })

  const removeFile = (file: PreviewFile) => {
    URL.revokeObjectURL(file.url)
    setFiles((current) => current.filter((item) => item.url !== file.url))
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          'grid min-h-44 cursor-pointer place-items-center rounded-2xl border border-dashed border-[#d7d3e0] bg-[#fbfafc] p-6 text-center transition',
          isDragActive && 'border-[#786afa] bg-[#f5f3ff]',
        )}
      >
        <input {...getInputProps()} />
        <div>
          <span className="mx-auto mb-3 grid size-10 place-items-center rounded-xl bg-[#eeecff] text-[#6d5dfc]">
            <UploadCloud className="size-5" />
          </span>
          <p className="text-sm font-semibold text-[#393640]">Drop reference images here</p>
          <p className="mt-1 text-xs text-[#908c98]">PNG, JPG or WEBP · max 10 MB each</p>
          <Button variant="outline" size="sm" className="mt-4 pointer-events-none">
            <ImagePlus className="size-3.5" /> Browse files
          </Button>
        </div>
      </div>
      {files.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {files.map((item) => (
            <div key={item.url} className="group relative aspect-square overflow-hidden rounded-xl border border-[#e4e1e9] bg-[#f5f4f7]">
              <img className="size-full object-cover" src={item.url} alt={item.file.name} />
              <button
                type="button"
                aria-label={`Remove ${item.file.name}`}
                onClick={() => removeFile(item)}
                className="absolute right-1.5 top-1.5 grid size-6 place-items-center rounded-full bg-black/65 text-white opacity-0 transition group-hover:opacity-100"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
