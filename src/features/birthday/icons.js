import {
  Balloon, Bird, Cake, CakeSlice, Clover, Coffee, CupSoda, Flower2, Gift, Heart, Leaf, PartyPopper, Rainbow, Ribbon, Sparkles, Star,
} from 'lucide-react';
import { stickerKey } from './data';

const ICONS = {
  balloon: Balloon, bird: Bird, cake: Cake, 'cake-slice': CakeSlice, clover: Clover, coffee: Coffee, 'cup-soda': CupSoda,
  'flower-2': Flower2, gift: Gift, heart: Heart, leaf: Leaf, 'party-popper': PartyPopper, rainbow: Rainbow, ribbon: Ribbon,
  sparkles: Sparkles, star: Star,
};

/** Lucide component for a sticker / theme key (old emoji codes accepted). */
export const iconFor = (k) => ICONS[stickerKey(k)] || Star;
