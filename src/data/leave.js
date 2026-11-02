// Leave entitlements for the signed-in user (prototype data).
export const USER_LEAVE = [
 {l:'วันลาพักร้อน',r:5,t:6,u:'วัน',c:'#D9E8A5'},
 {l:'วันลาพักร้อนยกยอด',r:0,t:2,u:'วัน',c:'#F0EDE4'},
 {l:'วันลาป่วย',r:24.5,t:30,u:'วัน',c:'#C9EBE6'},
 {l:'วันลากิจ',r:4,t:6,u:'วัน',c:'#C9EBE6'},
 {l:'วันลา Work from Home',r:24,t:30,u:'วัน',c:'#D9E8A5'},
 {l:'วันลาคลอด',r:98,t:98,u:'วัน',c:'#D9E8A5'},
 {l:'วันลาอุปสมบท',r:9,t:12,u:'วัน',c:'#F0EDE4'},
 {l:'วันลาเพื่อรับราชการ',r:60,t:60,u:'วัน',c:'#F0EDE4'},
 {l:'วันลาไม่รับค่าจ้าง',r:20,t:30,u:'วัน',c:'#C9EBE6'},
 {l:'วันลาศึกษาหาความรู้',r:7,t:15,u:'วัน',c:'#D9E8A5'},
];

/** Card colours (green, cream, mint). The profile grid picks one per position so neighbours never match. */
export const LEAVE_TONES = ['#D9E8A5', '#F0EDE4', '#C9EBE6'];

/**
 * Tone index for card i: diagonal on the 3-column grid, plain rotation on 2 or 1 columns
 * (both keep side-by-side and stacked cards different).
 */
export const leaveTone = (i, cols) => (cols === 3 ? (((i % 3) - Math.floor(i / 3)) % 3 + 3) % 3 : i % 3);

/** Leave types the home card cycles through (mook, 2026-10-27). */
export const HOME_LEAVE = ['วันลาพักร้อน', 'วันลาพักร้อนยกยอด', 'วันลากิจ', 'วันลาป่วย', 'วันลา Work from Home']
  .map((name) => USER_LEAVE.find((l) => l.l === name));

/** 24.5 → "24.5", 6 → "6". */
export const fmtDays = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1));
