/** 90 -> "1 ชั่วโมง 30 นาที", 120 -> "2 ชั่วโมง", 45 -> "45 นาที". */
export function courseLength(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return [h && `${h} ชั่วโมง`, m && `${m} นาที`].filter(Boolean).join(' ');
}
