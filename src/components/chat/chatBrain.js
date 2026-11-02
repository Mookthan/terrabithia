// Rule-based replies for Terby, the intranet assistant.
// Each reply is { text, links: [{ label, to }] } where `to` is a router path.
import { PATHS } from '@/routes/paths';
import { HR_GROUPS } from '@/data/hrGroups';
import { USER_LEAVE } from '@/data/leave';
import { ORG_PEOPLE } from '@/data/org';
import { findHelpers } from '@/features/showcase/skills';
import { hrAnswer } from './hrAnswer';
import { searchSite } from './siteSearch';

export const LOGIN_LINK = { label: 'เข้าสู่ระบบ', to: PATHS.login };

export function greeting(loggedIn, reset) {
  if (loggedIn) {
    return reset
      ? 'สวัสดีค่ะ เริ่มคุยกันใหม่ได้เลยนะคะ ถามเรื่องวันลา ข้อมูลในระบบ หรือให้หนูพาไปหน้าที่ต้องการได้เลยค่ะ'
      : 'สวัสดีค่ะ มุก หนูเทอร์บี้ ผู้ช่วย AI ของเทอราบิทเทียค่ะ ถามเรื่องวันลา ข้อมูลในระบบ หรือให้หนูพาไปหน้าที่ต้องการได้เลยค่ะ';
  }
  return reset
    ? 'สวัสดีค่ะ เริ่มคุยกันใหม่ได้เลยนะคะ ถามเรื่อง HR สวัสดิการ วันลา ข่าว อัลบั้ม คอร์ส ไฟล์ หรือให้หนูพาไปหน้าไหนก็ได้บนเว็บเลยค่ะ'
    : 'สวัสดีค่ะ หนูเทอร์บี้ ผู้ช่วย AI และมาสคอตของเทอราบิทเทียค่ะ ถามเรื่อง HR สวัสดิการ วันลา ข่าว อัลบั้ม คอร์ส ไฟล์ หรือให้หนูพาไปหน้าไหนก็ได้บนเว็บเลยค่ะ';
}

/** Quick-question chips: [question sent, chip label]. */
export const quickChips = (loggedIn) => (loggedIn
  ? [['วันลาพักร้อนเหลือกี่วัน', 'วันลาพักร้อนเหลือกี่วัน'], ['วันลาป่วยเหลือกี่วัน', 'วันลาป่วยเหลือ'], ['วันหยุดประจำปีอยู่หน้าไหน', 'วันหยุดประจำปีอยู่หน้าไหน'], ['ลาคลอดได้กี่วัน', 'ลาคลอดได้กี่วัน'], ['ใครถนัด Power BI', 'ใครถนัด Power BI']]
  : [['ข่าวสารอยู่หน้าไหน', 'ข่าวสารล่าสุด'], ['วิสัยทัศน์อยู่หน้าไหน', 'วิสัยทัศน์บริษัท'], ['ผลิตภัณฑ์อยู่หน้าไหน', 'ผลิตภัณฑ์ของเรา'], ['เข้าสู่ระบบ', 'เข้าสู่ระบบ']]);

/* ---- page index: every page the assistant can send people to ---- */
let destinations = null;
function buildDestinations() {
  if (destinations) return destinations;
  destinations = [];
  const add = (path, keys, to, priv) => destinations.push({ path, keys: keys.map((k) => k.toLowerCase()), to, priv: !!priv });
  add('News', ['news', 'ข่าว', 'ข่าวสาร'], PATHS.news);
  add('About us › Company Profile', ['company profile', 'ผังองค์กร', 'โปรไฟล์บริษัท', 'org chart', 'milestone', 'โครงสร้างองค์กร'], PATHS.aboutProfile);
  add('About us › Vision', ['vision', 'วิสัยทัศน์'], PATHS.aboutVision);
  add('About us › Mission', ['mission', 'พันธกิจ'], PATHS.aboutMission);
  add('About us › Clients', ['clients', 'ลูกค้า'], PATHS.aboutClients);
  add('About us › Products', ['products', 'ผลิตภัณฑ์'], PATHS.aboutProducts);
  add('About us › Services', ['services', 'บริการ'], PATHS.aboutServices);
  add('Culture › Core Value', ['core value', 'ค่านิยม'], PATHS.cultureCoreValue);
  add('Culture › Core Competency', ['core competency', 'สมรรถนะ'], PATHS.cultureCoreCompetency);
  add('Culture › Our Activity', ['our activity', 'กิจกรรม', 'อัลบั้ม'], PATHS.cultureActivity);
  add('Profile (ข้อมูลส่วนตัว)', ['profile', 'ข้อมูลส่วนตัว', 'โปรไฟล์', 'วันลาคงเหลือ', 'สิทธิ์สำหรับวันลา'], PATHS.profile, true);
  add('HR', ['hr', 'ฝ่ายบุคคล', 'ทรัพยากรบุคคล'], PATHS.hr, true);
  const groupKeys = { benefit: ['สวัสดิการ', 'สิทธิประโยชน์'], leave: [], regulations: [] };
  HR_GROUPS.forEach((g) => {
    add(`HR › ${g.l}`, [g.l].concat(groupKeys[g.k] || []), PATHS.hrItem(g.k, 0), true);
    g.items.forEach((it, i) => {
      const keys = [it];
      if (it.startsWith('วันลา')) keys.push(it.replace('วันลา', 'ลา'));
      if (it === 'วันลาพักร้อน') keys.push('พักร้อน');
      if (g.k === 'leave' && i === 0) keys.push('วันหยุดบริษัท', 'ปฏิทินวันหยุด', 'วันหยุดปี');
      add(`HR › ${g.l} › ${it}`, keys, PATHS.hrItem(g.k, i), true);
    });
  });
  add('Rules', ['rules', 'กฎระเบียบ', 'ระเบียบบริษัท', 'นโยบาย'], PATHS.rules, true);
  // Every other page, so Terby can take people anywhere on the site (mook 2026-10-31).
  add('Home › ปฏิทิน', ['ปฏิทินกิจกรรม', 'ปฏิทิน', 'calendar', 'หน้าแรก', 'กิจกรรมเดือนนี้'], PATHS.home);
  add('Home › ประกาศ', ['ประกาศ', 'announcement', 'โหวต'], PATHS.home);
  add('Rewards (เหรียญและของรางวัล)', ['rewards', 'เหรียญ', 'ของรางวัล', 'แลกของ', 'แลกรางวัล', 'เช็กอิน', 'เช็คอินรับเหรียญ'], PATHS.rewards, true);
  add('การ์ดของฉัน', ['การ์ดของฉัน', 'การ์ดวันเกิด', 'การ์ดที่ส่ง', 'my cards'], PATHS.myCards, true);
  add('Settings (ตั้งค่า)', ['settings', 'ตั้งค่า', 'เปลี่ยนรหัสผ่าน', 'รหัสผ่าน', 'ภาษา'], PATHS.settings, true);
  add('Settings › การแจ้งเตือน', ['การแจ้งเตือน', 'แจ้งเตือน', 'notification'], PATHS.settingsNotify, true);
  add('Courses', ['courses', 'คอร์ส', 'หลักสูตร'], PATHS.courses, true);
  add('Knowledge', ['knowledge', 'ความรู้'], PATHS.knowledge, true);
  add('Download', ['download', 'ดาวน์โหลด', 'เอกสาร'], PATHS.download, true);
  return destinations;
}

function matchDestinations(ql) {
  let best = 0;
  const hits = [];
  buildDestinations().forEach((d) => {
    let sc = 0;
    d.keys.forEach((k) => { if (k.length >= 2 && ql.includes(k)) sc = Math.max(sc, k.length); });
    if (sc) { hits.push({ d, sc }); if (sc > best) best = sc; }
  });
  return hits.filter((h) => h.sc === best).slice(0, 3).map((h) => h.d);
}

const destByPath = (path) => buildDestinations().find((d) => d.path === path);

function findLeave(q) {
  return USER_LEAVE.find((l) => q.includes(l.l)
    || (q.includes('พักร้อน') && l.l === 'วันลาพักร้อน')
    || (q.includes('ลาป่วย') && l.l === 'วันลาป่วย')
    || (q.includes('ลากิจ') && l.l === 'วันลากิจ'));
}

function navReply(dest, loggedIn) {
  if (dest.some((d) => d.priv) && !loggedIn) {
    return { text: 'หน้านี้ต้องเข้าสู่ระบบก่อนนะคะ เข้าสู่ระบบแล้วถามหนูอีกครั้ง หนูจะพาไปหน้านั้นให้ค่ะ', links: [LOGIN_LINK] };
  }
  const links = dest.map((d) => ({ label: `ไปที่ ${d.path}`, to: d.to }));
  return dest.length === 1
    ? { text: `อยู่ที่ ${dest[0].path} ค่ะ กดปุ่มด้านล่างเพื่อไปหน้านั้นได้เลย`, links }
    : { text: 'เจอหลายหน้าที่เกี่ยวข้องค่ะ เลือกหน้าที่ต้องการได้เลย', links };
}

/** Anything else on the site (news, albums, courses, knowledge, downloads) that matches the question. */
function siteReply(q, loggedIn, dest = []) {
  const hits = searchSite(q, loggedIn);
  if (!hits.length) return null;
  const pages = dest.filter((d) => loggedIn || !d.priv).slice(0, 1).map((d) => ({ label: `ไปที่ ${d.path}`, to: d.to }));
  return {
    text: hits.length === 1 ? `เจอ${hits[0].kind} "${hits[0].t}" ค่ะ กดปุ่มด้านล่างเพื่อเปิดได้เลย` : 'เจอเรื่องที่เกี่ยวข้องบนเว็บค่ะ เลือกเปิดได้เลย',
    links: [...hits.map((h) => ({ label: `${h.kind}: ${h.t.length > 42 ? `${h.t.slice(0, 40)}…` : h.t}`, to: h.to })), ...pages],
  };
}

/** The question without the page names it matched ("มีคอร์สทฤษฎีสีไหม" → "มี ทฤษฎีสีไหม"), to search for the item itself. */
const stripKeys = (q, dest) => dest.flatMap((d) => d.keys).reduce((s, k) => s.split(k).join(' '), q.toLowerCase());

export function reply(q, loggedIn) {
  const ql = q.toLowerCase();
  const dest = matchDestinations(ql);
  const wantsNav = /หน้าไหน|อยู่ที่ไหน|อยู่ตรงไหน|ที่ไหน|พาไป|ไปที่|ไปหน้า|เปิดหน้า|เข้าหน้า|ลิงก์|ขอดู|อยากดู|อยากไป|where/.test(ql);
  if (wantsNav && dest.length) return navReply(dest, loggedIn);

  if (!loggedIn) {
    if (dest.length && dest.every((d) => !d.priv)) return navReply(dest, loggedIn);
    const pub = siteReply(q, false);
    if (pub) return pub;
    if (/เข้าสู่ระบบ|ล็อกอิน|login|sign in/.test(ql)) return { text: 'กดปุ่มด้านล่างเพื่อเข้าสู่ระบบได้เลยค่ะ', links: [LOGIN_LINK] };
    if (!/วันลา|ลา|โปรไฟล์|ของฉัน|ของผม|เช็คอิน|เช็คเอาท์|ชื่อ|ตำแหน่ง|เงินเดือน/.test(ql)) {
      return { text: 'หนูช่วยพาไปดูข่าวสาร วิสัยทัศน์ พันธกิจ ผลิตภัณฑ์ และข้อมูลบริษัทได้ค่ะ ลองพิมพ์ชื่อหน้าที่อยากดูได้เลยนะคะ', links: [] };
    }
    return { text: 'เรื่องนี้เป็นข้อมูลส่วนตัว กรุณาเข้าสู่ระบบก่อนนะคะ เพื่อให้หนูดึงข้อมูลมาตอบได้ค่ะ', links: [LOGIN_LINK] };
  }

  // "Who can help with X": people by endorsed skills and JD duties (mook 2026-10-31). Before the "ใคร" name answer below.
  const ASK_HELP = /ใครถนัด|ใครเก่ง|ใครรู้เรื่อง|ใครทำ|ใครช่วย|ไปหาใคร|ต้องหาใคร|ถามใคร|ปรึกษาใคร|หาคนช่วย|หาคนที่/;
  if (ASK_HELP.test(q)) {
    const topic = q.replace(ASK_HELP, ' ').replace(/งานนี้|เรื่อง|ได้บ้าง|ครับ|ค่ะ|ไหม|มั้ย|\?/g, ' ').trim();
    const hits = findHelpers(topic, 3);
    if (!hits.length) {
      return { text: 'หนูยังหาคนที่ตรงเรื่องนี้ไม่เจอค่ะ ลองพิมพ์ชื่อทักษะหรืองาน เช่น "ใครถนัด Excel" หรือค้นในผังองค์กรได้เลยค่ะ', links: [{ label: 'ไปที่ผังองค์กร', to: PATHS.aboutProfile }] };
    }
    const lines = hits.map(({ id, why }) => `${ORG_PEOPLE[id].name} (${ORG_PEOPLE[id].nick}) ${ORG_PEOPLE[id].pos}: ${why.join(', ')}`);
    return {
      text: `คนที่น่าจะช่วยเรื่องนี้ได้ค่ะ\n${lines.join('\n')}\nทักไปคุยกับเจ้าตัวก่อนนะคะ ว่าสะดวกช่วยไหม`,
      links: hits.map(({ id }) => ({ label: `ดูการ์ด ${ORG_PEOPLE[id].nick}`, to: `${PATHS.aboutProfile}?person=${id}` })),
    };
  }

  // HR questions come from the HR documents, except "how many days are left", which reads my own balance below.
  if (!/เหลือ|คงเหลือ|ใช้ไป/.test(q)) {
    const hr = hrAnswer(q);
    if (hr) return hr;
  }

  const profLink = destByPath('Profile (ข้อมูลส่วนตัว)') ? [{ label: 'ดูวันลาทั้งหมดที่ Profile', to: PATHS.profileLeave }] : [];
  const leave = findLeave(q);
  if (leave) {
    return { text: `ตอนนี้มุกเหลือ${leave.l} ${leave.r} ${leave.u} จากสิทธิ์ทั้งหมด ${leave.t} ${leave.u} ค่ะ (ใช้ไปแล้ว ${leave.t - leave.r} ${leave.u})`, links: profLink };
  }
  if (/วันลา|^ลา|ลาเหลือ|เหลือ.*ลา|leave/i.test(q)) {
    return { text: `สรุปวันลาคงเหลือของมุกค่ะ: ${USER_LEAVE.slice(0, 4).map((l) => `${l.l} ${l.r} ${l.u}`).join(', ')} ... ดูทั้งหมดได้ที่หน้าโปรไฟล์นะคะ`, links: profLink };
  }
  if (q.includes('ชื่อ') || q.includes('ใคร')) {
    return { text: 'มุกชื่อเต็มว่า ธัญชนก พิศาล ตำแหน่ง Creative Designer สังกัด CAC: Graphic Design Dept. ค่ะ', links: profLink };
  }
  if (ql.includes('hr') || q.includes('ติดต่อ')) {
    const h = destByPath('HR');
    return { text: 'ติดต่อฝ่าย HR ได้ที่เมนู HR ด้านบน หรืออีเมล hr@terrabit.co.th ค่ะ', links: h ? [{ label: 'ไปที่ HR', to: h.to }] : [] };
  }
  if (q.includes('เช็คอิน') || q.includes('เช็คเอาท์')) {
    return { text: 'ดูสถานะเช็คอิน-เช็คเอาท์วันนี้ได้ที่การ์ด "วันนี้" ในหน้าแรกหลังล็อกอินค่ะ', links: [] };
  }
  // A specific item (a course, a news story, a file) beats only naming its page.
  const found = siteReply(stripKeys(q, dest), loggedIn, dest);
  if (found) return found;
  if (dest.length) return navReply(dest, loggedIn);
  return { text: 'หนูยังหาเรื่องนี้ไม่เจอค่ะ ลองถามด้วยคำอื่นดูนะคะ หนูตอบเรื่อง HR ได้ทุกหัวข้อ (วันลา สวัสดิการ ระเบียบ ลาออก ประกันสังคม) และค้นข่าว อัลบั้ม คอร์ส คลังความรู้ ไฟล์ดาวน์โหลด หรือพาไปหน้าไหนก็ได้ เช่น "ลาคลอดได้กี่วัน" หรือ "ขอดูรูปงานปีใหม่" ถ้ายังไม่เจอ ติดต่อ HR ได้ที่ hr@terrabit.co.th ค่ะ', links: [] };
}
