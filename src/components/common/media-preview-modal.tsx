import { CopyIcon, DownloadIcon, FileAudio, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { copyTextToClipboard } from '@/utils';

interface MediaPreviewModalProps {
  wrapperClassName?: string;
  className?: string;
  url: string | undefined;
  kind: 'image' | 'video' | 'audio' | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MediaPreviewModal({ url, kind, open, onOpenChange }: MediaPreviewModalProps) {
  if (!url) return null;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center z-200 bg-black/50 backdrop-blur-sm px-4"
          onClick={() => {
            onOpenChange(false);
          }}
        >
          <div className="absolute top-4 right-4 flex items-center gap-1">
            <Button
              type="button"
              className="rounded-full"
              variant="secondary"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                copyTextToClipboard(url);
              }}
            >
              <CopyIcon className="size-4" />
            </Button>
            <Button
              type="button"
              className="rounded-full"
              variant="secondary"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
            >
              <DownloadIcon className="size-4" />
            </Button>
            <Button
              type="button"
              className="rounded-full"
              variant="secondary"
              size="icon"
              onClick={() => {
                onOpenChange(false);
              }}
            >
              <XIcon className="size-4" />
            </Button>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {kind === 'image' && (
              <img
                src={url}
                alt={'Image'}
                className="max-h-[70vh] max-w-full rounded-lg object-contain"
              />
            )}
            {kind === 'video' && (
              <video
                controls
                playsInline
                preload="metadata"
                autoPlay
                className="max-h-[70vh] max-w-full rounded-lg"
              >
                <source src={url} type="video/mp4" />
                Your browser does not support video playback.
              </video>
            )}
            {kind === 'audio' && (
              <div className="flex flex-col justify-center items-center gap-4 w-100 bg-accent p-6 rounded-2xl">
                <span className="grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
                  <FileAudio className="size-8" />
                </span>
                <audio src={url} autoPlay controls preload="metadata" className="w-full">
                  Your browser does not support audio playback.
                </audio>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
