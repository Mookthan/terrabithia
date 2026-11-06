/* eslint-disable no-useless-escape -- regexes ported verbatim from the prototype */
// DOM-level translation engine (ported from the prototype).
// Thai is the source language; English is produced by dictionary + pattern rules.
// Wrap any subtree that must not be translated with the `data-nt` attribute.
import { I18N_EN, I18N_TH } from './dictionaries';
import { I18N_RULES } from './rules';

const I18N_UNITS={'วัน':['day','days'],'ชั่วโมง':['hour','hours'],'นาที':['min','min'],'วินาที':['sec','sec'],'ปี':['year','years'],'เดือน':['month','months'],'คน':['person','people'],'ครั้ง':['time','times'],'คอร์ส':['course','courses'],'บาท':['baht','baht'],'ไฟล์':['file','files'],'ข่าว':['news','news'],'เหรียญ':['coin','coins'],'ชิ้น':['pc','pcs'],'รูป':['photo','photos']};
const I18N_MON_TH=['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
const I18N_MON_EN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const I18N_MON_FULL_EN=['January','February','March','April','May','June','July','August','September','October','November','December'];
const I18N_MON_FULL_TH=['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
const I18N_DOW_EN=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'], I18N_DOW_TH=['อา.','จ.','อ.','พ.','พฤ.','ศ.','ส.'];
const i18nEsc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const I18N_TH_CH='\\u0e00-\\u0e7f';
const I18N_EN_LONG=Object.keys(I18N_EN).filter(k=>k.length>=7).sort((a,b)=>b.length-a.length);
const I18N_EN_SHORT=Object.keys(I18N_EN).filter(k=>k.length>=3&&k.length<7&&/[\u0e00-\u0e7f]/.test(k)).sort((a,b)=>b.length-a.length);
const I18N_EN_RE=new RegExp([I18N_EN_LONG.map(i18nEsc).join('|'),I18N_EN_SHORT.length?'(?<!['+I18N_TH_CH+'])(?:'+I18N_EN_SHORT.map(i18nEsc).join('|')+')(?!['+I18N_TH_CH+'])':''].filter(Boolean).join('|'),'g');

const I18N_INIT_EN={'ก':'K','ข':'K','ฃ':'K','ค':'K','ฅ':'K','ฆ':'K','ง':'N','จ':'J','ฉ':'C','ช':'C','ซ':'S','ฌ':'C','ญ':'Y','ฎ':'D','ฏ':'T','ฐ':'T','ฑ':'T','ฒ':'T','ณ':'N','ด':'D','ต':'T','ถ':'T','ท':'T','ธ':'T','น':'N','บ':'B','ป':'P','ผ':'P','ฝ':'F','พ':'P','ฟ':'F','ภ':'P','ม':'M','ย':'Y','ร':'R','ล':'L','ว':'W','ศ':'S','ษ':'S','ส':'S','ห':'H','ฬ':'L','อ':'A','ฮ':'H','เ':'E','แ':'A','โ':'O','ใ':'M','ไ':'N'};
function i18nExact(c){
  if(I18N_EN[c]!==undefined) return I18N_EN[c];
  const b=c.replace(/(\.{3}|…)$/,'');
  if(b!==c&&I18N_EN[b]!==undefined) return I18N_EN[b];
  if(I18N_EN[c+'...']!==undefined) return I18N_EN[c+'...'].replace(/\.{3}$/,c!==b?'...':'');
  return undefined;
}
const I18N_MON_RE=new RegExp('(\\d{1,2})\\s*('+I18N_MON_TH.map(i18nEsc).map(m=>m.replace(/\\\.$/,'\\.?')).join('|')+')\\s*(\\d{2,4})?','g');
const I18N_UNIT_RE=new RegExp('(\\d[\\d,]*(?:\\.\\d+)?)\\s*('+Object.keys(I18N_UNITS).sort((a,b)=>b.length-a.length).join('|')+')(?![\\u0e00-\\u0e7f])','g');
function i18nYear(y){ y=+y; if(y<100) y+=2500; return y>2400?y-543:y; }
function i18nTrEN(src){
  const m=src.match(/^(\s*)([\s\S]*?)(\s*)$/), a=m[1], core=m[2], z=m[3];
  if(!core) return src;
  const ex=i18nExact(core); if(ex!==undefined) return a+ex+z;
  if(core.length===1&&I18N_INIT_EN[core]) return a+I18N_INIT_EN[core]+z;
  const mi=I18N_MON_TH.findIndex(k=>k===core||k.replace(/\.$/,'')===core); if(mi>=0) return a+I18N_MON_EN[mi]+z;
  const my=core.match(/^(\S+\.)\s*(\d{4})$/); if(my){ const i=I18N_MON_TH.indexOf(my[1]); if(i>=0) return a+I18N_MON_EN[i]+' '+i18nYear(my[2])+z; }
  const di=I18N_DOW_TH.indexOf(core); if(di>=0) return a+I18N_DOW_EN[di]+z;
  for(const [re,fn] of I18N_RULES){ const mm=core.match(re); if(mm) return a+fn(mm,(x)=>i18nTrEN(x).trim())+z; }
  // "A · B · C": translate each part on its own; keep it only when nothing Thai is left (no half-translated lines).
  if(/\s·\s/.test(core)){ const j=core.split(/(\s·\s)/).map(p=>/^\s·\s$/.test(p)?p:i18nTrEN(p)).join(''); if(!/[\u0e00-\u0e7f]/.test(j)) return a+j+z; }
  if(core[0]==='#'&&/[\u0e00-\u0e7f]/.test(core)) return a+'#'+core.slice(1).split('·').map(p=>i18nTrEN(p.trim())).join('').replace(/\s+/g,'')+z;
  if(/\s[·|•]\s/.test(core)&&core.split(/\s[·|•]\s/).every(p=>i18nExact(p.trim())!==undefined||!/[\u0e00-\u0e7f]/.test(p))){ const sep=core.match(/\s[·|•]\s/)[0]; return a+core.split(sep).map(p=>{const e=i18nExact(p.trim());return e!==undefined?e:p;}).join(sep)+z; }
  let t=core;
  t=t.replace(/(\d+)\s*%\s*อ่านจบ/g,'$1% read').replace(/อ่านประมาณ\s*(\d+)\s*นาที/g,'$1 min read');
  t=t.replace(/ทีม\s*([A-Za-z][A-Za-z]*)/g,'$1 Team');
  t=t.replace(/(\d{1,2}[:.]\d{2}(?:\s*-\s*\d{1,2}[:.]\d{2})?)\s*น\./g,'$1');
  t=t.replace(I18N_MON_RE,(x,d,mo,y)=>{ const i=I18N_MON_TH.findIndex(k=>k.replace(/\.$/,'')===mo.replace(/\.$/,'')); return d+' '+I18N_MON_EN[i]+(y?' '+i18nYear(y):''); });
  t=t.replace(I18N_UNIT_RE,(x,n,u)=>{ const p=I18N_UNITS[u]; return n+' '+(parseFloat(n.replace(/,/g,''))===1?p[0]:p[1]); });
  if(I18N_EN_RE&&/[\u0e00-\u0e7f]/.test(t)){
    let out='',last=0;
    for(const mt of t.matchAll(I18N_EN_RE)){
      const gap=t.slice(last,mt.index); let rep=I18N_EN[mt[0]];
      out+=gap;
      if(/[A-Za-z0-9\)]$/.test(out)&&/^[A-Za-z0-9\(]/.test(rep)) out+=' ';
      out+=rep; last=mt.index+mt[0].length;
      if(/^[A-Za-z0-9\(]/.test(t.slice(last))&&/[A-Za-z0-9\)]$/.test(rep)) out+=' ';
    }
    out+=t.slice(last);
    // mook 2026-11-06: never show a half-translated line. If Thai is still left, keep the Thai source as it is.
    if(/[\u0e00-\u0e7f]/.test(out)) return src;
    t=out;
  }
  return a+t+z;
}
function i18nTrTH(src){
  const m=src.match(/^(\s*)([\s\S]*?)(\s*)$/), a=m[1], core=m[2], z=m[3];
  if(!core) return src;
  if(I18N_TH[core]!==undefined) return a+I18N_TH[core]+z;
  let mm;
  if((mm=core.match(/^(🏠 |Section: )(.+)$/)) && I18N_TH[mm[2]]!==undefined) return a+(mm[1]==='Section: '?'หมวด: ':'🏠 ')+I18N_TH[mm[2]]+z;
  if((mm=core.match(/^(Sun|Mon|Tue|Wed|Thu|Fri|Sat) (\d{1,2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/))) return a+I18N_DOW_TH[I18N_DOW_EN.indexOf(mm[1])]+' '+mm[2]+' '+I18N_MON_TH[I18N_MON_EN.indexOf(mm[3])]+z;
  if((mm=core.match(/^(January|February|March|April|May|June|July|August|September|October|November|December) (\d{4})$/))) return a+I18N_MON_FULL_TH[I18N_MON_FULL_EN.indexOf(mm[1])]+' '+(+mm[2]+543)+z;
  return src;
}
const I18N_SKIP = 'script,style,textarea,[data-nt],[data-nt] *';
const I18N_ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];

function collectTextNodes(root, list) {
  if (root.nodeType === 3) { list.push(root); return; }
  if (root.nodeType !== 1 && root.nodeType !== 11) return;
  if (root.nodeType === 1 && root.matches && root.matches(I18N_SKIP)) return;
  const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
    acceptNode(n) {
      if (n.nodeType === 1) return n.matches(I18N_SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_SKIP;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  let n;
  while ((n = tw.nextNode())) list.push(n);
}

/** Translate a plain string into the given language. */
export function translate(text, lang) {
  return lang === 'en' ? i18nTrEN(text) : i18nTrTH(text);
}

/** Translate every text node and translatable attribute under `root`. */
export function applyTranslations(root, lang) {
  if (!root) return;
  const list = [];
  collectTextNodes(root, list);
  for (const n of list) {
    if (n.parentNode && n.parentNode.closest && n.parentNode.closest('[data-nt]')) continue;
    let o = n.__o;
    if (o === undefined || n.nodeValue !== n.__t) o = n.nodeValue;
    const t = translate(o, lang);
    n.__o = o; n.__t = t;
    if (n.nodeValue !== t) n.nodeValue = t;
  }
  const els = root.nodeType === 1
    ? [root, ...root.querySelectorAll('[placeholder],[aria-label],[title],[alt]')]
    : root.querySelectorAll ? root.querySelectorAll('[placeholder],[aria-label],[title],[alt]') : [];
  for (const e of els) {
    if (!e.getAttribute || e.closest('[data-nt]')) continue;
    const st = e.__oa || (e.__oa = {});
    for (const at of I18N_ATTRS) {
      if (!e.hasAttribute(at)) continue;
      const cur = e.getAttribute(at);
      let o = st[at];
      if (o === undefined || cur !== o.t) o = { o: cur, t: cur };
      const t = translate(o.o, lang);
      o.t = t; st[at] = o;
      if (cur !== t) e.setAttribute(at, t);
    }
  }
}

/**
 * Keep `root` translated while React (or anything else) mutates it.
 * Returns a disposer.
 */
export function observeTranslations(root, getLang) {
  let busy = false;
  const mo = new MutationObserver((muts) => {
    if (busy) return;
    busy = true;
    try {
      const lang = getLang();
      for (const m of muts) {
        if (m.type === 'childList') m.addedNodes.forEach((n) => applyTranslations(n, lang));
        else if (m.type === 'characterData') { if (m.target.nodeValue !== m.target.__t) applyTranslations(m.target, lang); }
        else if (m.type === 'attributes') applyTranslations(m.target, lang);
      }
    } finally {
      busy = false;
      mo.takeRecords();
    }
  });
  mo.observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: I18N_ATTRS });
  return {
    disconnect: () => mo.disconnect(),
    applyAll: (lang) => { busy = true; try { applyTranslations(root, lang); } finally { busy = false; mo.takeRecords(); } },
  };
}
