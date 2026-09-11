import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export const TZ_ASIA_HO_CHI_MINH = 'Asia/Ho_Chi_Minh';
export const TZ_AMERICA_LOS_ANGELES = 'America/Los_Angeles';

export const DATE_FMT_ISO = 'yyyy-MM-dd';
export const TIME_FMT_24H = 'HH:mm';
export const DATETIME_FMT_ISO = 'yyyy-MM-dd, HH:mm';

export const DATETIME_FMT_MEDIUM = 'MMM d, HH:mm';
export const DATETIME_FMT_FULL = 'MMM d, yyyy HH:mm';

export const DATE_FMT_LONG = 'MMMM d, yyyy';
export const DATE_FMT_LONG_NO_YEAR = 'MMMM d';

export const getCurrentTimezone = (): string => {
  try {
    const stored = localStorage.getItem('timezone');
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed?.state?.timezone || TZ_ASIA_HO_CHI_MINH;
    }
  } catch (error) {
    console.error('Error reading timezone from localStorage:', error);
  }
  return TZ_ASIA_HO_CHI_MINH;
};

export const formatDateTime = (
  date: string,
  dateFormat: string = DATETIME_FMT_ISO,
  timezone?: string,
): string => {
  if (!date || Number.isNaN(Date.parse(date))) return date || '';
  const tz = timezone || getCurrentTimezone();
  const messageDate = toZonedTime(new Date(date), tz);
  return format(messageDate, dateFormat);
};

export const formatTime = (
  date: string,
  timeFormat: string = TIME_FMT_24H,
  timezone?: string,
): string => {
   if (!date || Number.isNaN(Date.parse(date))) return date || '';
  const tz = timezone || getCurrentTimezone();
  const zonedDate = toZonedTime(new Date(date), tz);
  return format(zonedDate, timeFormat);
};
