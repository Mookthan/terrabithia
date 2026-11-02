// Organisation structure and (fictional) staff directory.
// Shared by the company org chart, the home-page CAC chart and birthday features.
import { media } from '@/lib/media';
import { ME } from './me';

export const AVATARS=[media('877abec3d4.jpg'), media('532b10edd6.jpg'), media('21d3db8be5.jpg'), media('8dc973b6cc.jpg'), media('5b4664e390.jpg'), media('d333026643.jpg'), media('b09336c005.jpg'), media('eac9ccaee8.jpg'), media('60aab46509.jpg'), media('0736bda59d.jpg')];
export const PERSON_AV={"chairman": 8, "coo": 4, "cto": 2, "cac": 0, "gong": 6, "aut": 4, "mbd": 6, "sqa": 0, "isd": 2, "bss": 8, "ceo": 9, "cso": 1, "ccm": 3, "pmd": 5, "ifs": 7, "ccs": 9};

/** Photo URL for a person id, or null when they have no photo. */
export function avatarOf(id) {
  if (id === ME.id) return ME.photo;
  const i = PERSON_AV[id];
  return i == null ? null : AVATARS[i];
}

export const BR={
 ccm:{color:'#8EBA3E',count:24,depts:[['Operation Dept.',null],['QA',null]]},
 cac:{color:'#27AE97',depts:[['HR',null],['Finance Dept.',3],['Performance Mgmt. Dept.',3],['CAA Dept.',2],['Graphic Design Dept.',3],['Admin Dept.',10]]},
 mbd:{color:'#B5651D',count:3,depts:[['Sales Dept.',null],['Assistant to MBD',null]]},
 pmd:{color:'#C23B6B',count:2,depts:[['PM',null],['BA',null]]},
 sqa:{color:'#E07B39',count:3,depts:[['Std. Auditing',null],['Tester Dept.',5]]},
 ifs:{color:'#D4A017',count:3,depts:[['System Infra.',null],['IT Security',null]]},
 isd:{color:'#6B4FA0',count:5,depts:[['Dev. Dept.',null],['SA Dept.',2]]},
 ccs:{color:'#2C8C8C',count:4,depts:[['System Engineer Dept.',null],['SA Dept.',3]]},
 bss:{color:'#1C3A5C',count:4,depts:[['TBC Dept.',null],['IT Service Delivery Dept.',19],['IT Service Mgmt. Dept.',2]]},
};
export const PARENTOF={ccm:'coo',cac:'coo',mbd:'coo',pmd:'cso',sqa:'cso',ifs:'cso',isd:'cto',ccs:'cto',bss:'cto'};
export const ORGDATA=[
 {id:'chairman',parentId:null,label:'Chairman of the Board',person:true,color:'#1C3A5C'},
 {id:'ceo',parentId:'chairman',label:'CEO',person:true,color:'#1C3A5C'},
 {id:'coo',parentId:'ceo',label:'COO',person:true,color:'#27AE97'},
 {id:'cso',parentId:'ceo',label:'CSO',person:true,color:'#27AE97'},
 {id:'cto',parentId:'ceo',label:'CTO',person:true,color:'#27AE97'},
];
Object.keys(BR).forEach(k=>{
  const b=BR[k];
  ORGDATA.push({id:k,parentId:PARENTOF[k],label:k.toUpperCase(),person:true,chief:true,count:b.count,color:b.color});
  b.depts.forEach((d,i)=>ORGDATA.push({id:k+'-'+i,parentId:k,label:d[0],count:d[1],color:b.color}));
});
export const ORG_PEOPLE={
 chairman:{name:'สมชาย เทอราบิทวงศ์',nick:'ชาย',pos:'Chairman of the Board',resp:'กำหนดวิสัยทัศน์และทิศทางเชิงกลยุทธ์ขององค์กร',interest:'กอล์ฟ, การลงทุน',edu:'ปริญญาโท บริหารธุรกิจ จุฬาลงกรณ์มหาวิทยาลัย'},
 ceo:{name:'วราภรณ์ ก้องเกียรติ',nick:'ก้อง',pos:'Chief Executive Officer',resp:'บริหารจัดการองค์กรโดยรวมและขับเคลื่อนกลยุทธ์ธุรกิจ',interest:'วิ่งมาราธอน, อ่านหนังสือธุรกิจ',edu:'ปริญญาโท MBA, Thammasat University'},
 coo:{name:'ปีรพัฒน์ โลหะอนุกูล',nick:'ทีเล็ก',pos:'Chief Operating Officer',resp:'กำกับดูแลฝ่ายปฏิบัติการ CCM, CAC, MBD',interest:'ถ่ายภาพ, ปั่นจักรยาน',edu:'ปริญญาตรี วิศวกรรมอุตสาหการ'},
 cso:{name:'นภัส สุขเกษม',nick:'นัท',pos:'Chief Strategy Officer',resp:'กำกับดูแลฝ่ายกลยุทธ์ PMD, SQA, IFS',interest:'หมากรุก, เขียนบล็อก',edu:'ปริญญาโท เศรษฐศาสตร์'},
 cto:{name:'กิตติศักดิ์ พัฒนะ',nick:'เอก',pos:'Chief Technology Officer',resp:'กำกับดูแลฝ่ายเทคโนโลยี ISD, CCS, BSS',interest:'เกมคอมพิวเตอร์, หุ่นยนต์',edu:'ปริญญาตรี วิศวกรรมคอมพิวเตอร์'},
 ccm:{name:'อารียา คงมั่น',nick:'อาย',pos:'Chief, CCM',resp:'ดูแลฝ่ายปฏิบัติการและควบคุมคุณภาพ',interest:'โยคะ, ทำอาหาร',edu:'ปริญญาตรี บริหารธุรกิจ'},
 cac:{name:'Teelek',nick:'ทีเล็ก',pos:'Chief of Corporate Affairs & Communications',resp:'ดูแลงานบุคคล การเงิน และสื่อสารองค์กร',interest:'ถ่ายภาพ, ดนตรี',edu:'ปริญญาตรี นิเทศศาสตร์'},
 mook:{name:'ธัญชนก พิศาล',nick:'มุก',pos:'Creative Designer',resp:'ออกแบบกราฟิกและสื่อสิ่งพิมพ์ภายในองค์กร',interest:'เพลง, ศิลปะ, เกม',edu:'ปริญญาตรี นิเทศศาสตร์'},
 gong:{name:'กองพล รุ่งโรจน์',nick:'กอง',pos:'Creative Designer',resp:'ออกแบบสื่อโฆษณาและคอนเทนต์ภาพเคลื่อนไหว',interest:'ถ่ายภาพ, อนิเมะ',edu:'ปริญญาตรี ศิลปกรรมศาสตร์'},
 aut:{name:'เอื้ออังกูร ทองดี',nick:'เอ๋',pos:'VDO Editor',resp:'ตัดต่อวิดีโอและคอนเทนต์มัลติมีเดีย',interest:'ถ่ายวิดีโอ, ดนตรี',edu:'ปริญญาตรี นิเทศศาสตร์'},
 mbd:{name:'ภูวดล แสงทอง',nick:'พู่',pos:'Chief, MBD',resp:'ดูแลฝ่ายขายและพัฒนาธุรกิจ',interest:'กอล์ฟ, ดูบอล',edu:'ปริญญาตรี การตลาด'},
 pmd:{name:'ศิริพร วงศ์ใหญ่',nick:'อ้อม',pos:'Chief, PMD',resp:'บริหารโครงการและวิเคราะห์ธุรกิจ',interest:'อ่านนิยาย, โยคะ',edu:'ปริญญาตรี วิศวกรรมซอฟต์แวร์'},
 sqa:{name:'ธีรภัทร ใจดี',nick:'ภัทร',pos:'Chief, SQA',resp:'ควบคุมคุณภาพซอฟต์แวร์และทดสอบระบบ',interest:'ปีนเขา, ถ่ายภาพ',edu:'ปริญญาตรี วิทยาการคอมพิวเตอร์'},
 ifs:{name:'กมลชนก รุ่งเรือง',nick:'กิ๊ฟ',pos:'Chief, IFS',resp:'ดูแลโครงสร้างพื้นฐานและความปลอดภัยไอที',interest:'เลี้ยงแมว, ปลูกต้นไม้',edu:'ปริญญาตรี วิศวกรรมคอมพิวเตอร์'},
 isd:{name:'นราธิป ชัยวัฒน์',nick:'ท็อป',pos:'Chief, ISD',resp:'บริหารทีมพัฒนาซอฟต์แวร์และระบบวิเคราะห์',interest:'เขียนโค้ดโอเพนซอร์ส, กีตาร์',edu:'ปริญญาโท วิศวกรรมซอฟต์แวร์'},
 ccs:{name:'ปิยะดา เลิศวงศ์',nick:'ดาว',pos:'Chief, CCS',resp:'ดูแลทีมวิศวกรระบบและบริการลูกค้า',interest:'ว่ายน้ำ, ทำขนม',edu:'ปริญญาตรี วิศวกรรมคอมพิวเตอร์'},
 bss:{name:'เอกชัย มั่นคง',nick:'เอก',pos:'Chief, BSS',resp:'ดูแลบริการไอทีและการสนับสนุนธุรกิจ',interest:'ตกปลา, ไวน์',edu:'ปริญญาตรี เทคโนโลยีสารสนเทศ'},
};

/* ===== everyone in the company (fictional placeholder staff) ===== */
const UNIS=['Chulalongkorn University','Thammasat University','Kasetsart University','Mahidol University','Chiang Mai University','Khon Kaen University','Silpakorn University','King Mongkut\'s University of Technology Thonburi','Assumption University','National University of Singapore','Nanyang Technological University','University of Tokyo','Waseda University','Seoul National University','Hong Kong University of Science and Technology','University of Melbourne','Monash University','University of Manchester','University College London','London School of Economics','Technical University of Munich','University of Toronto','University of British Columbia','University of Michigan','Purdue University','Stanford University'];
const UNI_CC={'National University of Singapore':'Singapore','Nanyang Technological University':'Singapore','University of Tokyo':'Japan','Waseda University':'Japan','Seoul National University':'South Korea','Hong Kong University of Science and Technology':'Hong Kong','University of Melbourne':'Australia','Monash University':'Australia','University of Manchester':'UK','University College London':'UK','London School of Economics':'UK','Technical University of Munich':'Germany','University of Toronto':'Canada','University of British Columbia':'Canada','University of Michigan':'USA','Purdue University':'USA','Stanford University':'USA'};
const NAMES_M=['ธนกร','วีรพล','ปรีชา','สุรชัย','อนุชา','ณัฐวุฒิ','พงศกร','กฤษดา','ชาญชัย','รัฐพล','อภิชาติ','สมพงษ์','ธีรวัฒน์','ภาคิน','ศุภกร','นพดล','วรเชษฐ์','ปิยพงษ์','จักรพันธ์','สหรัฐ','อัครพล','ธนาธิป','คมสัน','พีรพัฒน์','ณภัทร','ชนินทร์','กิตติพงษ์','เจษฎา','ธีรเดช','วัชรพล'];
const NAMES_F=['พิมพ์ชนก','กนกวรรณ','ชลธิชา','ปาริชาติ','อรอุมา','ณัฐธิดา','สุพัตรา','วิภาวรรณ','ธนพร','รุ่งนภา','ศศิกานต์','จิราพร','เบญจมาศ','นิศารัตน์','อัจฉรา','สิริกัญญา','ภัทรา','มนัสนันท์','พรรณราย','ลลิตา','กัญญาณัฐ','ปวีณา','ศิริลักษณ์','นภัสสร','วรรณภา','ชนิดาภา','อมรรัตน์','พัชรินทร์','ธัญญ่า','ฐิติมา'];
const SURN=['แก้วกาญจน์','ศรีสุข','วงศ์สวัสดิ์','พงษ์ไพบูลย์','ทองสุข','เจริญผล','บุญเรือง','สายชล','รัตนพันธ์','มณีรัตน์','ชัยมงคล','อินทรวงศ์','สุวรรณ','เกษมสุข','ภู่ระหงษ์','ขจรศักดิ์','ตั้งใจ','เพชรรัตน์','วัฒนกุล','จันทร์เจริญ','สมบูรณ์ศักดิ์','อรุณรุ่ง','พิทักษ์ผล','ศิริวัฒน์','กิจเจริญ'];
const NICK_M=['ต้น','บอส','เก่ง','ภพ','นนท์','เบิร์ด','โอม','เจมส์','กั๊ก','ไนซ์','แมน','ปอนด์','ฟิล์ม','ก้อง','กอล์ฟ','เติร์ด','อาร์ม','ธีร์','ปั้น','โชค','เปี๊ยก','บีม','เมฆ','ภูมิ','โอ๊ต','พี','ตูน','เจ','ท็อป','อั้ม'];
const NICK_F=['แพร','ฝน','มีน','ใบเตย','ปลา','เฟิร์น','ไอซ์','น้ำ','ฟ้า','มิ้นท์','แอม','พลอย','ปอ','ออม','นุ่น','แพท','ฟาง','เนย','ชมพู่','กุ้ง','หวาน','อิ๊ง','แป้ง','เบลล์','ปิ่น','มุ่ย','เจน','ขวัญ','ใหม่','ตาล'];
const INTERESTS=['ดูซีรีส์, ท่องเที่ยว','วิ่ง, ทำอาหาร','เล่นเกม, ดนตรี','อ่านหนังสือ, กาแฟ','ถ่ายภาพ, เดินป่า','โยคะ, ปลูกต้นไม้','ฟุตบอล, ดูหนัง','ว่ายน้ำ, ทำขนม','ปั่นจักรยาน, เทคโนโลยี','วาดรูป, แต่งเพลง','แบดมินตัน, พอดแคสต์','เลี้ยงสัตว์, ท่องเที่ยว','กอล์ฟ, ลงทุน','เทนนิส, อ่านการ์ตูน','ไวน์, ดนตรีแจ๊ซ'];
const DEPT_INFO={
 'HR':['HR Officer','ดูแลงานสรรหา สวัสดิการ และความสัมพันธ์พนักงาน','บริหารธุรกิจ'],
 'Finance Dept.':['Accountant','ดูแลงานบัญชี การเงิน และงบประมาณ','บัญชี'],
 'Performance Mgmt. Dept.':['Performance Analyst','วิเคราะห์และติดตามผลการปฏิบัติงานขององค์กร','สถิติประยุกต์'],
 'CAA Dept.':['Corporate Affairs Officer','ประสานงานภายนอกและสื่อสารองค์กร','นิเทศศาสตร์'],
 'Admin Dept.':['Admin Officer','ดูแลงานธุรการ เอกสาร และสำนักงาน','การจัดการ'],
 'Operation Dept.':['Operation Supervisor','กำกับดูแลงานปฏิบัติการและคุณภาพการให้บริการ','บริหารธุรกิจ'],
 'QA':['QA Specialist','ตรวจสอบและควบคุมคุณภาพงานบริการ','การจัดการคุณภาพ'],
 'Sales Dept.':['Account Executive','ดูแลลูกค้าและงานขาย','การตลาด'],
 'Assistant to MBD':['Executive Assistant','สนับสนุนงานบริหารและประสานงานฝ่าย MBD','บริหารธุรกิจ'],
 'PM':['Project Manager','บริหารโครงการให้เป็นไปตามแผน','วิศวกรรมซอฟต์แวร์'],
 'BA':['Business Analyst','วิเคราะห์ความต้องการทางธุรกิจและระบบ','ระบบสารสนเทศ'],
 'Std. Auditing':['Auditor','ตรวจสอบมาตรฐานและกระบวนการทำงาน','การจัดการคุณภาพ'],
 'Tester Dept.':['QA Tester','ทดสอบซอฟต์แวร์และรายงานข้อบกพร่อง','วิทยาการคอมพิวเตอร์'],
 'System Infra.':['Infrastructure Engineer','ดูแลโครงสร้างพื้นฐานระบบและเครือข่าย','วิศวกรรมคอมพิวเตอร์'],
 'IT Security':['Security Engineer','ดูแลความมั่นคงปลอดภัยสารสนเทศ','ความมั่นคงปลอดภัยไซเบอร์'],
 'Dev. Dept.':['Software Developer','พัฒนาและดูแลซอฟต์แวร์','วิทยาการคอมพิวเตอร์'],
 'SA Dept.':['System Analyst','วิเคราะห์และออกแบบระบบ','ระบบสารสนเทศ'],
 'System Engineer Dept.':['System Engineer','ติดตั้งและดูแลระบบของลูกค้า','วิศวกรรมคอมพิวเตอร์'],
 'TBC Dept.':['TBC Officer','ดูแลงานสนับสนุนบริการด้านเทคนิค','เทคโนโลยีสารสนเทศ'],
 'IT Service Delivery Dept.':['IT Support','ให้บริการและแก้ไขปัญหาด้านไอที','เทคโนโลยีสารสนเทศ'],
 'IT Service Mgmt. Dept.':['IT Service Manager','บริหารจัดการบริการไอทีตามมาตรฐาน','เทคโนโลยีสารสนเทศ']
};
(function buildEveryone(){
  let seed=7; const rnd=()=>{ seed=(seed*1103515245+12345)&0x7fffffff; return seed/0x7fffffff; };
  const pick=a=>a[Math.floor(rnd()*a.length)];
  const MA=[0,2,4,6,8], FA=[1,3,5,7,9]; let mi=0, fi=0, nm=0, nf=0, ui=0;
  const eduOf=(field)=>{
    if(rnd()<0.15) return '-';
    const u=UNIS[(ui++*7+3)%UNIS.length], cc=UNI_CC[u]; const deg=rnd()<0.25?'ปริญญาโท':'ปริญญาตรี';
    return `${deg} ${field} — ${u}${cc?' ('+cc+')':''}`;
  };
  // universities for the people who already existed
  const E={chairman:'ปริญญาโท บริหารธุรกิจ — Chulalongkorn University',ceo:'ปริญญาโท MBA — Thammasat University',coo:'ปริญญาตรี วิศวกรรมอุตสาหการ — Kasetsart University',cso:'ปริญญาโท เศรษฐศาสตร์ — London School of Economics (UK)',cto:'ปริญญาตรี วิศวกรรมคอมพิวเตอร์ — King Mongkut\'s University of Technology Thonburi',ccm:'ปริญญาตรี บริหารธุรกิจ — Assumption University',cac:'ปริญญาตรี นิเทศศาสตร์ — Chulalongkorn University',mook:'ปริญญาตรี นิเทศศาสตร์ — Silpakorn University',gong:'ปริญญาตรี ศิลปกรรมศาสตร์ — Silpakorn University',aut:'-',mbd:'ปริญญาตรี การตลาด — University of Melbourne (Australia)',pmd:'ปริญญาตรี วิศวกรรมซอฟต์แวร์ — Nanyang Technological University (Singapore)',sqa:'ปริญญาตรี วิทยาการคอมพิวเตอร์ — Mahidol University',ifs:'ปริญญาตรี วิศวกรรมคอมพิวเตอร์ — University of Tokyo (Japan)',isd:'ปริญญาโท วิศวกรรมซอฟต์แวร์ — Purdue University (USA)',ccs:'ปริญญาตรี วิศวกรรมคอมพิวเตอร์ — Chiang Mai University',bss:'ปริญญาตรี เทคโนโลยีสารสนเทศ — Khon Kaen University'};
  Object.keys(E).forEach(k=>{ if(ORG_PEOPLE[k]) ORG_PEOPLE[k].edu=E[k]; });
  // Graphic Design Dept. = the three people we already have
  const cacB=BR.cac; ['mook','gong','aut'].forEach(id=>{ ORGDATA.push({id,parentId:'cac-4',label:ORG_PEOPLE[id].nick,person:true,color:cacB.color}); ORG_PEOPLE[id].dept='CAC · Graphic Design Dept.'; });
  PERSON_AV.mook=undefined;
  Object.keys(BR).forEach(k=>{
    const b=BR[k]; const known=b.depts.reduce((a,d)=>a+(d[1]||0),0), nulls=b.depts.filter(d=>d[1]==null).length;
    const fill=nulls?Math.max(2,Math.floor(((b.count||nulls*4)-known)/nulls)):0;
    b.depts.forEach((d,i)=>{
      const did=k+'-'+i, node=ORGDATA.find(n=>n.id===did), n=d[1]??fill; node.count=n;
      if(did==='cac-4') return;
      const info=DEPT_INFO[d[0]]||['Officer','สนับสนุนงานของฝ่าย','การจัดการ'];
      for(let j=0;j<n;j++){
        const female=rnd()<0.5, id=did+'-p'+j;
        const first=female?NAMES_F[nf++%NAMES_F.length]:NAMES_M[nm++%NAMES_M.length];
        const nick=female?NICK_F[(nf+i)%NICK_F.length]:NICK_M[(nm+i)%NICK_M.length];
        const head=j===0;
        ORG_PEOPLE[id]={name:''+first+' '+pick(SURN),nick,pos:head?(d[0]+' — Manager'):info[0],resp:info[1],interest:pick(INTERESTS),edu:eduOf(info[2]),dept:k.toUpperCase()+' · '+d[0]};
        PERSON_AV[id]=female?FA[fi++%5]:MA[mi++%5];
        ORGDATA.push({id,parentId:did,label:nick,person:true,color:b.color});
      }
    });
  });
})();
