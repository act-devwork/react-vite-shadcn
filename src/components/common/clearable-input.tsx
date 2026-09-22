import { Input } from '@/components/ui/input';
import { SearchIcon, XIcon } from 'lucide-react';

interface ClearableInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  floatingPlaceholder?: boolean;
  onEnter?: () => void;
}

export default function ClearableInput({
  value,
  onChange,
  placeholder,
  floatingPlaceholder = false,
  onEnter,
}: ClearableInputProps) {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') onEnter?.();
        }}
        placeholder={placeholder}
        floatingPlaceholder={floatingPlaceholder}
        containerClassName="w-full"
        className="w-full pr-8 pl-8"
        placeholderClassName="peer-placeholder-shown:left-8"
      />
      {value && (
        <button
          type="button"
          aria-label={`Clear ${placeholder.toLowerCase()}`}
          onClick={() => onChange('')}
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
        >
          <XIcon className="size-4" />
        </button>
      )}
    </div>
  );
}
