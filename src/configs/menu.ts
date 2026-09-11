import {
  LayoutDashboardIcon,
  SettingsIcon,
  type LucideIcon,
} from 'lucide-react';
import { ACCESS_POLICIES, type AccessPolicy } from './access-policy';

export interface MenuItem extends AccessPolicy {
  label?: string;
  icon?: LucideIcon;
  url: string;
  image?: string;
  children?: MenuItem[];
}

export const MENU_NAVIGATION_ITEMS: MenuItem[] = [
  {
    label: 'Home',
    icon: LayoutDashboardIcon,
    url: '/',
    ...ACCESS_POLICIES.all,
  },
  {
    label: 'Settings',
    icon: SettingsIcon,
    url: '/settings',
    ...ACCESS_POLICIES.all,
  },
];
