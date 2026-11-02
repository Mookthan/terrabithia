// Mock album pictures made from each person's interests (mook, 2026-10-27): a gradient tile with an icon per interest,
// like the Activity album placeholders. Real albums hold uploaded photos.
import {
  Bike, BookOpen, Bot, Brush, CakeSlice, Camera, Cat, ChefHat, Code, Coffee, Crown, Cpu, Dog, Feather, Film, Fish, Flag,
  Flower2, Footprints, Gamepad2, Guitar, Heart, Mic, Mountain, Music, Palette, PenLine, Plane, Sprout, Trees, TrendingUp,
  Trophy, Tv, Video, Volleyball, Waves, Wine,
} from 'lucide-react';

/** First keyword found in an interest decides its icon (order matters: specific words first). */
const KEYWORDS = [
  ['กอล์ฟ', Flag], ['ลงทุน', TrendingUp], ['วิ่ง', Footprints], ['การ์ตูน', BookOpen], ['นิยาย', BookOpen], ['อ่าน', BookOpen],
  ['ถ่ายวิดีโอ', Video], ['ถ่ายภาพ', Camera], ['จักรยาน', Bike], ['หมากรุก', Crown], ['บล็อก', PenLine], ['เกม', Gamepad2],
  ['หุ่นยนต์', Bot], ['โยคะ', Flower2], ['ทำอาหาร', ChefHat], ['ทำขนม', CakeSlice], ['แต่งเพลง', Music], ['ดนตรี', Music],
  ['เพลง', Music], ['ศิลปะ', Palette], ['วาดรูป', Brush], ['อนิเมะ', Tv], ['ซีรีส์', Tv], ['ดูหนัง', Film], ['บอล', Trophy],
  ['ปีนเขา', Mountain], ['เดินป่า', Trees], ['แมว', Cat], ['สัตว์', Dog], ['ต้นไม้', Sprout], ['โค้ด', Code], ['กีตาร์', Guitar],
  ['ว่ายน้ำ', Waves], ['ตกปลา', Fish], ['ไวน์', Wine], ['ท่องเที่ยว', Plane], ['กาแฟ', Coffee], ['เทคโนโลยี', Cpu],
  ['แบดมินตัน', Feather], ['เทนนิส', Volleyball], ['พอดแคสต์', Mic],
];
const GRADIENTS = [
  ['#27AE97', '#8EBA3E'], ['#1C3A5C', '#27AE97'], ['#C7DC86', '#27AE97'], ['#1C3A5C', '#7AAEFC'],
  ['#E07B39', '#F5C26B'], ['#C23B6B', '#F29BB6'], ['#6B4FA0', '#B79CE6'], ['#12986F', '#C7DC86'],
];

const iconFor = (text) => (KEYWORDS.find(([k]) => text.includes(k)) || [null, Heart])[1];
const sizeOf = (text) => 900_000 + (text.length % 9) * 180_000; // plausible mock size

/** "ถ่ายภาพ, ปั่นจักรยาน" → one tile per interest, `seed` varies the colours between people. */
export function interestTiles(interest, seed = 0) {
  return interest.split(',').map((s) => s.trim()).filter(Boolean).map((t, i) => ({
    id: `i-${seed}-${i}`, cap: t, Icon: iconFor(t), g: GRADIENTS[(seed + i * 3) % GRADIENTS.length], size: sizeOf(t),
  }));
}
