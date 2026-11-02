// Knowledge-sharing posts and filters (prototype data).
import { ME } from '@/data/me';

export const MY_NAME = ME.englishName; // 'Thanchanok Pisarn (Mook)'
export const MY_ID = ME.id;

export const INITIAL_POSTS = [
  { id: 1, by: 'cac', author: 'Peerapat Lohaanukul (Teelek)', time: '30/07 12:26 PM', html: 'การเว้นที่ว่างรอบๆโลโก้ หลักการคือ อย่าเอาอะไรมาชิดโลโก้ยิ่งห่างได้ยิ่งดี', link: 'https://www.youtube.com/watch?v=jkuSF0r73AQ', type: 'video', depts: ['cac-graphic'], status: 'approved',
    preview: { g: 'linear-gradient(135deg,#FFF1CC,#FBE3A6)', title: 'What Is Clearspace For Logos?', by: 'Will Paterson', meta: '131.6K views · 3 years ago' } },
  { id: 2, by: 'cac', author: 'Peerapat Lohaanukul (Teelek)', time: '30/07 12:26 PM', html: 'แชร์ Guideline การใช้สีและฟอนต์สำหรับสื่อภายในองค์กร อ่านก่อนส่งงานทุกครั้ง (โพสต์ตัวอย่าง)', link: 'https://example.com/brand-guideline', type: 'link', depts: ['cac-graphic'], status: 'approved' },
  { id: 3, by: 'gong', author: 'Gong', time: '29/07 04:10 PM', html: 'Checklist ส่งมอบงานดีไซน์ให้ทีม Dev ก่อน handoff: spacing, states, assets (โพสต์ตัวอย่าง)', type: '', depts: ['isd-dev'], status: 'approved' },
];

/** Seed reactions (emoji -> names) and thread replies per post id. */
export const INITIAL_SOCIAL = {
  1: {
    reactions: { '👍': ['Ann'], '❤️': ['Gong'] },
    replies: [{ id: 1, by: 'gong', author: 'Gong', time: '30/07 01:05 PM', text: 'มีประโยชน์มากครับ ขอบคุณที่แชร์' }],
  },
};

export const TABS = [['all', 'โพสต์ทั้งหมด'], ['mine', 'โพสต์ของฉัน'], ['pending', 'รออนุมัติ']];

/** Quick filter chips: [kind, key, label]. */
