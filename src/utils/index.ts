import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'react-toastify';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
  let inThrottle: boolean;
  let lastArgs: any;

  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          func.apply(this, lastArgs);
          lastArgs = null;
        }
      }, limit);
    } else {
      lastArgs = args;
    }
  } as T;
}

export const filteredObject = (object: any): any => {
  if (Array.isArray(object)) {
    return object.map((item) => filteredObject(item)).filter(Boolean);
  } else if (typeof object === 'object' && object !== null) {
    return Object.fromEntries(
      Object.entries(object)
        .filter(([_, value]) => value !== undefined && value !== null && value !== '')
        .map(([key, value]) => [key, filteredObject(value)]),
    );
  }
  return object;
};

export const copyTextToClipboard = async (
  text: string,
  messageText: string = 'Copied to clipboard',
) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(messageText);
  } catch (err) {
    console.error('Async: Could not copy text: ', err);
  }
};

export const FORMATTER_USD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});


export const formatterDollars = (value: number) => {
  return value ? FORMATTER_USD.format(value) : '$0';
};


export const getAvatarColor = (seed?: string | null): string => {
  const colors = ['#46BA43', '#D45246', '#5CAFFA', '#6C61DF', '#F68136'];

  if (!seed) {
    // Fallback to random if no seed provided (shouldn't happen in normal usage)
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Use djb2 hash algorithm for better distribution
  let hash = 5381;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) + hash + seed.charCodeAt(i);
  }

  // Use absolute value and modulo to get index
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

export function formatSnakeCaseToLabel(text: string): string {
  if (!text) {
    return '';
  }
  return text
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function isEnumValue<T extends string>(values: T[], value: string | null): value is T {
  return value !== null && values.includes(value as T);
}

export const getPositiveIntegerParam = (value: string | null, defaultValue: number) => {
  const parsedValue = Number(value);
  return Number.isSafeInteger(parsedValue) && parsedValue > 0 ? parsedValue : defaultValue;
};

export const DEFAULT_ALL_VALUE = 'all';
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;

export const isValidUrl = (value: string): boolean => {
  try {
    const url = new URL(value);

    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

export function normalizeTiptapHtml(htmlBody: string): string {
  return htmlBody.replace(/(<p\b[^>]*>)\s*<\/p>/gi, '$1<br></p>');
}
