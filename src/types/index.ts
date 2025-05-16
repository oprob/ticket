import { DivideIcon as LucideIcon } from 'lucide-react';

export interface Sport {
  id: string;
  name: string;
  icon: LucideIcon;
  iconColor: string;
  bgClass: string;
  headerBgClass: string;
  patternClass: string;
  description: string;
}

export interface Match {
  id: string;
  teams: string;
  team1: string;
  team2: string;
  team1Logo: string;
  team2Logo: string;
  date: string;
  dateFormatted: string;
  time: string;
  stadium: string;
  location: string;
  sport: string;
  sportColor: string;
  sportBgClass: string;
  sportBgButton: string;
  sportBadgeClass: string;
  trending: boolean;
  soldOut: boolean;
  duration: string;
  ticketInfo: string;
}