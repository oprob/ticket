import { FolderRoot as Football, Ticket as Cricket } from 'lucide-react';
import { Sport } from '../types';

export const sports: Sport[] = [
  {
    id: 'football',
    name: 'Football',
    icon: Football,
    iconColor: 'text-green-400',
    bgClass: 'bg-gradient-to-r from-green-900 to-green-700',
    headerBgClass: 'bg-gradient-to-r from-green-900 to-green-700',
    patternClass: 'bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:20px_20px]',
    description: 'Experience the thrill of the world\'s most popular sport with tickets to top football matches.'
  },
  {
    id: 'cricket',
    name: 'Cricket',
    icon: Cricket,
    iconColor: 'text-blue-400',
    bgClass: 'bg-gradient-to-r from-blue-900 to-blue-700',
    headerBgClass: 'bg-gradient-to-r from-blue-900 to-blue-700',
    patternClass: 'bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:20px_20px]',
    description: 'Get tickets to watch thrilling cricket matches from T20 to Test Cricket.'
  }
];

export const getSportById = (id: string): Sport | null => {
  return sports.find(sport => sport.id === id) || null;
};