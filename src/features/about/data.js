// Static content for the About-us pages (ported from the prototype).
import { media } from '@/lib/media';

/* ---------- Company profile: milestones ---------- */
export const MILESTONE_IMG=media('89f9b5e24e.jpg');
export const MILESTONES=[{"y": "2010", "t": "Partnered with Aspect", "d": "ร่วมเป็นพันธมิตรกับ Aspect และเปิดตัว MAXAR", "tags": ["Aspect", "MAXAR"]}, {"y": "2013", "t": "Launched Cloud-based Solutions", "d": "เปิดตัวโซลูชันบนคลาวด์", "tags": ["Cloud"]}, {"y": "2015", "t": "Established HQ at Orakarn Building", "d": "ตั้งสำนักงานใหญ่ที่อาคารอรกานต์ และเปิดตัว Maxar", "tags": ["HQ", "Maxar"]}, {"y": "2016", "t": "Expanded into Overseas Market", "d": "ขยายธุรกิจสู่ตลาดต่างประเทศ", "tags": ["Overseas"]}, {"y": "2017", "t": "First ASPECT partner in ASEAN to introduce a chatbot", "d": "เป็นพาร์ทเนอร์ ASPECT รายแรกในอาเซียนที่นำเสนอแชทบอทบน LINE และ Messenger", "tags": ["LINE", "Messenger"]}, {"y": "2018", "t": "Certified", "d": "ได้รับการรับรองมาตรฐานสากล (BSI)", "tags": ["BSI"]}, {"y": "2019", "t": "Partnered with Genesys", "d": "ร่วมเป็นพันธมิตรกับ Genesys และเปิดตัว Ruamitr", "tags": ["Genesys", "Ruamitr"]}, {"y": "2020", "t": "Partnered with NECTEC", "d": "ร่วมเป็นพันธมิตรกับ NECTEC", "tags": ["NECTEC"]}, {"y": "2022", "t": "Migrated to Huawei Cloud", "d": "ย้ายระบบสู่ Huawei Cloud และเปิดตัว Pokpa", "tags": ["Huawei Cloud", "Pokpa"]}, {"y": "2024", "t": "Certified", "d": "ได้รับการรับรองมาตรฐานสากล และเปิดตัว Huagati", "tags": ["BSI", "Huagati"]}, {"y": "2025", "t": "Partnered with 8x8", "d": "ร่วมเป็นพันธมิตรกับ 8x8 และได้รับการรับรองมาตรฐานสากล", "tags": ["8x8", "BSI"]}, {"y": "2026", "t": "Launched an AI features", "d": "เปิดตัวฟีเจอร์ AI", "tags": ["AI"]}];

/* ---------- Vision ---------- */
export const VISION_IMGS=[{src:media('1ebdd74f8e.jpg'),alt:'Terrabit team meeting'},{src:null,alt:'ใส่รูปที่ 2'},{src:null,alt:'ใส่รูปที่ 3'}];

/* ---------- Mission ---------- */
export const MISSION=[{"n": "1.", "t": "แจกแจงและสรุป", "e": "Gathering and Summary", "i": [{"t": "1.1 ความต้องการทั้งหมดของลูกค้า", "e": "Customer Requirement Summary"}, {"t": "1.2 ข้อจำกัด หรือ สิ่งที่อาจกลายเป็นอุปสรรค", "e": "Threat"}, {"t": "1.3 ทรัพยากร เช่น กำลังคน, อุปกรณ์ เครื่องมือ, เวลา", "e": "Resource"}]}, {"n": "2.", "t": "หาจุดที่อยู่นอกเหนือข้อตกลง", "e": "Over-scope Requirement Summary", "i": [{"t": "2.1 จุดที่เกินขอบเขต", "e": "Beyond-scope Point"}, {"t": "2.2 จุดที่ขาดหาย ควรเพิ่มเติม", "e": "Missing Point"}, {"t": "2.3 จุดที่บกพร่อง ควรทำให้ดีขึ้น", "e": "Weak Point"}]}, {"n": "3.", "t": "สร้างความคาดหวังให้ตรงกัน", "e": "Mutual Expectation", "i": [{"t": "3.1 สรุปรายการที่เกินขอบเขต เกินข้อตกลง"}, {"t": "3.2 บอกกล่าวทุกฝ่ายให้รับทราบและเข้าใจ ก่อนเริ่มงาน", "e": "Initial Acknowledgement"}, {"t": "3.3 ย้ำทวนและอ้างถึงรายการที่เกินขอบเขต ตามวาระการประชุมอย่างสม่ำเสมอ เพื่อป้องกันความคาดหวังที่คลาดเคลื่อน เกินเลย", "e": "Insist Agreement to Prevent Misunderstanding"}, {"t": "3.4 ใช้วาทศิลป์ในการบอกกล่าว ไม่อ้อมค้อม ไม่ขวานผ่าซาก", "e": "Artful Communication"}]}];
/** Lead sentence under the Mission heading; `b` is the bold opening phrase. */
export const MISSION_LEAD = { b: 'การส่งมอบบริการที่เหนือความคาดหมาย', t: ' เป็นพันธกิจที่นำไปสู่ความสำเร็จ ซึ่งหมายถึงการเป็นคู่ค้าพันธมิตรที่ได้รับความไว้วางใจ เป็นพันธกิจของชาวเทอราเบี้ยนทุกคน สามารถทำให้เป็นจริงได้ ด้วยหลักการ 3 ข้อนี้' };
/** Card colour (the original mission colours, mook 2026-10-28) and icon (lucide name) per step, in MISSION order. */
export const MISSION_STYLE = [
  { c: '#CCFAFC', icon: 'ClipboardList' },
  { c: '#C8EAEA', icon: 'Target' },
  { c: '#BFE9D4', icon: 'Handshake' },
];

/* ---------- Clients ---------- */
export const CLIENTS={"existing":[{"g":"Retail","items":[{"n":"The 1","i":media('1dd8e40d44.webp')},{"n":"Siam Piwat","i":media('cab0f8a272.webp')},{"n":"One Bangkok","i":media('c1bb87ea4d.webp')}]},{"g":"Insurance","items":[{"n":"Chubb","i":media('65d01f6464.webp')},{"n":"Allianz Ayudhya","i":media('f9ad795792.webp')},{"n":"AEON","i":media('e3b5d55707.webp')},{"n":"Thai Life Insurance","i":media('205f9035e8.webp')},{"n":"Muang Thai Insurance","i":media('6ee004f407.webp')},{"n":"Muang Thai Life","i":media('7b26eb3b8b.webp')},{"n":"Tokio Marine","i":media('5b2f783ca9.webp')},{"n":"AIG","i":media('bdfbd1d8b3.webp')},{"n":"FWD","i":media('f21d814e3a.webp')},{"n":"TPB Thaipaiboon","i":media('f2ee6a2fbf.webp')},{"n":"Capital Service Holding","i":media('1757a6774c.webp')},{"n":"KPI","i":media('1945cf93ff.webp')},{"n":"Me Insurance","i":media('7136b46761.webp')}]},{"g":"Finance / Banking","items":[{"n":"Krungsri","i":media('db1be2acce.webp')},{"n":"Ayudhya Capital Auto Lease","i":media('cdcfa40f3f.webp')},{"n":"","i":media('2a66eaaa8a.webp')},{"n":"Next Capital","i":media('cc32cc1ac8.webp')},{"n":"AIRA & AIFUL","i":media('3e4fc2b64d.webp')},{"n":"ABACUS digital","i":media('d3f82c45ae.webp')},{"n":"TCIB","i":media('ad4f48a1df.webp')},{"n":"Ascend Money","ph":1},{"n":"Ascend Travel","ph":1},{"n":"","i":media('0331923ea0.webp')}]},{"g":"Others","items":[{"n":"THAI","i":media('92ef32fe2a.webp')},{"n":"Ananda","i":media('cf321e94d3.webp')},{"n":"Yip In Tsoi","i":media('47e21512bc.webp')},{"n":"","i":media('b98206cf77.webp')},{"n":"BPK Hospital Group","i":media('6b499e2626.webp')},{"n":"","i":media('5bc54c7170.webp')},{"n":"Carrier","i":media('b410a91572.webp')}]}],"experienced":[{"g":"Retail","items":[{"n":"Tesco Lotus","i":media('f61bb6d907.webp')},{"n":"Big C","i":media('25e65f0075.webp')},{"n":"Lazada","i":media('139a1e0444.webp')},{"n":"HomePro","i":media('7efe852485.webp')},{"n":"Cenfinity","i":media('b7162c846a.webp')}]},{"g":"Insurance","items":[{"n":"Cigna","i":media('c9c51793b4.webp')},{"n":"Falcon Insurance","i":media('40472e3db3.webp')},{"n":"Direct Asia","i":media('5b4e79519b.webp')},{"n":"Thai Insurance","i":media('c45de20234.webp')},{"n":"ttb broker","i":media('5c9cce1ab9.webp')},{"n":"Akane","i":media('7ef644649b.webp')},{"n":"LMG","i":media('f83241657b.webp')},{"n":"","i":media('986b48e08d.webp')}]},{"g":"Finance / Banking","items":[{"n":"TMB","i":media('079c7346f7.webp')},{"n":"HSBC","i":media('ba296a5a16.webp')},{"n":"KTB","i":media('71aec1181c.webp')},{"n":"Thanachart","i":media('afd6a04e8b.webp')},{"n":"ICBC","i":media('d680eaf24c.webp')},{"n":"Kleasing","i":media('9c9ef9f7db.webp')},{"n":"GH Bank","i":media('3e0aa65142.webp')},{"n":"ascend nano","i":media('3765a53757.webp')}]},{"g":"Inter. Market","items":[{"n":"MediCard","i":media('c76204fc69.webp')},{"n":"UnionBank","i":media('f6fb533ea8.webp')},{"n":"Allianz","i":media('3d7b6f6fde.webp')},{"n":"beIN Sports","i":media('6a57f58829.webp')},{"n":"SMDC","i":media('a0ec49f64f.webp')}]},{"g":"Telecom","items":[{"n":"TOT","i":media('bd7dcac9b6.webp')},{"n":"dtac","i":media('8291a45399.webp')},{"n":"True Digital","ph":1}]},{"g":"Others","items":[{"n":"Royal Orchid Plus","i":media('a950be843a.webp')},{"n":"Minor Hotels","i":media('11438e6a29.webp')},{"n":"Anantara","i":media('0feb50b559.webp')},{"n":"KHS","i":media('96370c4a79.webp')},{"n":"MQDC","i":media('36fc7b7f2a.webp')},{"n":"Helix","i":media('3b929bc186.webp')},{"n":"omise","i":media('20987a32c7.webp')},{"n":"Carsome","i":media('ae5bf01cfb.webp')},{"n":"MFEC","ph":1}]}]};
export const CLIENT_TABS = [['existing', 'Existing Customers'], ['experienced', 'Experience Customers']];

/* ---------- Products ---------- */
export const RUAMITR_T=media('8970ef5a68.webp');
export const MAXAR_VIDEO=media('f145baf861.mp4');
export const MAXAR_POSTER=media('469fe69454.jpg');
export const PROD_ASSETS={"ruamitr":media('04d9c5f3f6.webp'),"aspect":media('299a62f45d.webp'),"genesys":media('ed3ac55a8a.webp'),"x8":media('f55bf0614c.webp'),"posters":[media('687b152d84.webp'),media('d6d30792dc.webp'),media('f4be081342.webp'),media('de9251c1d8.webp')],"video":media('65768518c4.mp4')};
export const RV_COVERS=[media('23d1206f67.jpg'), media('6e16216096.jpg'), media('8726c8d68f.jpg'), media('245eda2bcf.jpg'), media('9be1456990.jpg'), media('13755c5b92.jpg'), media('598ad67a2a.jpg'), media('1e8f3e3bbe.jpg')];
export const RUAMITR_VIDEOS=['การแนะนำหน้า Home.mp4','Follow-up Schedule.mp4','Shift Brief.mp4','Auto Outbound.mp4','Case Detail.mp4','Campaign Management.mp4','Campaign-Pending.mp4','Uncontactable.mp4'];
/** Glass product cards; `wm` picks the logo rendered by GlassCard. */
export const GLASS_PRODUCTS = [
  { wm: 'pokpa', hue: 0, desc: 'แม็กซ่า พกพา อีกหนึ่งนวัตกรรมที่ต่อ⁠ยอดจาก Maxar Ruamitr เพื่อตอบโจทย์ธุรกิจที่ต้องการให้ผู้ใช้งานเข้าถึงระบบ CRM ผ่านสมาร์ทโฟนหรือแท็บเล็ตได้', poster: 0 },
  { wm: 'jongq', hue: 150, desc: 'แม็กซ่า จองคิว ผลิตภัณฑ์กลุ่ม Maxar สำหรับการจองคิวในหลากหลายธุรกิจ อาทิ จองคิวช่าง จองคิวพนักงาน จองห้องประชุม ใช้งานร่วมกับ Maxar Ruamitr แบบ Seamless Integration หรือใช้งานเป็นระบบ Stand Alone แยกอิสระก็ได้', poster: 1 },
  { wm: 'doodads', hue: -35, desc: 'แม็กซ่า ดูแดดส์ ซอฟต์แวร์เสริมประสิทธิภาพการทำงานของระบบคอนแท็กต์เซนเตอร์ (Software Optimizer) รวมฟังก์ชันที่พัฒนาขึ้นเพื่ออุดช่องโหว่ของระบบคอนแท็กต์เซนเตอร์ (Aspect / Genesys) และเติมเต็มการทำงานให้กับ Maxar Ruamitr', poster: 2 },
];
/** Partner products; a card opens the partner's own website in a new tab (`url`, mook 2026-10-30). */
export const PARTNERS=[
 {k:'aspect',url:'https://www.aspect.com',name:'aspect',desc:'โซลูชัน Contact Center สำหรับองค์กรขนาดใหญ่ ครบครันด้วยฟีเจอร์ที่พัฒนาขึ้น เพื่อรองรับการใช้งานที่หลากหลายตั้งแต่การบริหารและดูแลทีมงานอย่างมีประสิทธิภาพไปจนถึงการมอบประสบการณ์ที่เหนือกว่าให้กับลูกค้ามาพร้อมการใช้งานที่ง่าย สะดวก คำนึงถึงผู้ใช้เป็นหลัก'},
 {k:'genesys',url:'https://www.genesys.com',name:'Genesys',desc:'แพลตฟอร์ม Contact Center และ Customer Experience ระดับโลก โดดเด่นด้วยระบบ Omnichannel ที่ทำให้การสื่อสารราบรื่นและรวดเร็ว รวมถึง AI ที่ช่วยเปลี่ยนทุกการติดต่อให้ เป็นโอกาสในการสร้างความพึงพอใจ และเพิ่มยอดขายในเวลาเดียวกัน'},
 {k:'x8',url:'https://www.8x8.com',name:'8x8',desc:'บริการ SMS จากผู้ให้บริการ CPaaS ระดับโลกครอบคลุมทั้งบริการแบบ One-time, Two-way และ OTP พร้อมแผนขยายสู่บริการสื่อสารอื่นๆ ไม่ว่าจะเป็น Voice, Videoและ Chat เพื่อรองรับความต้องการของตลาดในอนาคต'},
];
/** Real videos: put a URL in `src` of an item; until then every video uses the built-in sample clip. */
export const prodVideoSrc = (item) => (item && item.src) || PROD_ASSETS.video;

/* ---------- Services ---------- */
/** `icon` names a lucide icon resolved in ServiceCard. */
export const SERVICES=[
 {en:'Turnkey Solution',th:'จำหน่ายระบบและพัฒนาโซลูชัน',icon:'handshake',g:'#1C3A5C,#27AE97',items:[
   ['Contact Center System','ออกแบบและติดตั้งระบบ Contact Center แบบครบวงจร ในรูปแบบการซื้อขาด'],
   ['Front-End Applications','จัดหาระบบ CRM และแอปพลิเคชันสำหรับเจ้าหน้าที่ เพื่อสนับสนุนการให้บริการลูกค้า'],
   ['Solution Optimizer','พัฒนาแอปพลิเคชันหรือปรับแก้ระบบให้ตอบโจทย์การใช้งานของธุรกิจ']]},
 {en:'Rental Solution',th:'ให้เช่าระบบ สถานที่ และจัดสรรบุคลากร',icon:'building',g:'#2c7a7b,#8EBA3E',items:[
   ['Contact Center System Rental','ให้เช่าระบบ Contact Center ทั้งแบบติดตั้ง ณ สถานที่ของลูกค้าและแบบใช้งานบนคลาวด์'],
   ['Contact Center Site & Facilities Rental','ให้เช่าศูนย์ Contact Center พร้อมระบบ อุปกรณ์ และสิ่งอำนวยความสะดวก ทั้งศูนย์พร้อมใช้งานและศูนย์ที่จัดสร้างตามความต้องการลูกค้า'],
   ['On-Site Service Desk','จัดส่งบุคลากรด้านเทคนิคไปประจำ ณ สถานที่ของลูกค้า เพื่อดูแลและสนับสนุนระบบ'],
   ['Man-Day Buffet','จัดสรรผู้เชี่ยวชาญด้านเทคนิคเพื่อดูแลและปรับแต่งระบบ โดยคิดค่าบริการแบบเหมาจ่ายตามเวลาปฏิบัติงาน']]},
 {en:'Business Support Services',th:'บริหารงานและสนับสนุนธุรกิจ',icon:'laptop',g:'#1a1a2e,#2b6cb0',items:[
   ['Outsourced Contact Center','รับบริหารงาน Contact Center ทั้งรับสาย โทรออก ตอบแชต อีเมล และสื่อสังคมออนไลน์ พร้อมจัดทำรายงานผล'],
   ['Operation Buddy','ส่งผู้เชี่ยวชาญไปฝึกอบรมและให้คำแนะนำแก่ทีม Contact Center ของลูกค้า ตามระยะเวลาที่กำหนด เพื่อพัฒนาการทำงานให้เป็นระบบ'],
   ['On-Call Engineer Support','บริการให้คำปรึกษาเชิงเทคนิคทางโทรศัพท์ พร้อมดูแลระบบตามสัญญาแบบรายปี'],
   ['Site Decoration','ออกแบบและตกแต่งพื้นที่ของลูกค้าให้เป็นศูนย์ Contact Center ที่เหมาะกับการใช้งาน']]},
];
