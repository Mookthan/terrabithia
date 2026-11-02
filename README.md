# Terrabithia — อินทราเน็ตพนักงาน

React 18 + Vite 5 + Tailwind CSS 3 (แปลงมาจากต้นแบบ HTML ไฟล์เดียว)

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # ไฟล์พร้อม deploy อยู่ใน dist/ (ใช้ base './' วางไว้ path ไหนก็ได้)
```

## โครงสร้าง
```
src/
  App.jsx                 เส้นทางทุกหน้า (HashRouter, โหลดแต่ละหน้าแบบ lazy)
  routes/                 PATHS (URL ทั้งหมด), เมนู, RequireAuth
  context/                Auth, Lang (ไทย/อังกฤษ), UI (toast, video modal)
  components/layout/      Header, MainNav, NotificationBell, ProfileMenu, LangSwitch, Layout
  components/chat/        Terby แชทบอท (ChatWidget + chatBrain)
  components/ui/          SectionBar, Toast, VideoModal
  data/                   ข้อมูลที่ใช้ร่วมกัน (ผู้ใช้, ผังองค์กร, วันลา, แผนก, HR groups)
  lib/                    media(), i18n engine, sanitizeHTML
  hooks/                  useReveal, useClickOutside, useEscape
  features/<feature>/     หน้าละโฟลเดอร์: XxxPage.jsx, components/, hooks/, data.js, <feature>.css
public/media/             รูปและวิดีโอทั้งหมด (ดึงออกมาจาก base64 เดิม)
```
features: home, news, about, culture, rules, download, hr, courses, knowledge, profile, auth (login), birthday

## แนวทางเขียนโค้ด
- Tailwind เป็นหลัก; CSS ไฟล์ของ feature ใช้เฉพาะสิ่งที่ Tailwind ทำไม่สะดวก (keyframes, 3D flip, ::before) และตั้งชื่อ class ขึ้นต้นด้วยชื่อ feature
- ห้ามประกอบชื่อ class Tailwind แบบไดนามิก ค่าที่มาจากข้อมูลให้ใช้ inline style
- นำทางด้วย `PATHS` จาก `@/routes/paths` เท่านั้น
- ข้อความเขียนเป็นภาษาไทยตามเดิม ระบบ i18n แปลเป็นอังกฤษจาก DOM อัตโนมัติ (ใส่ `data-nt` กับส่วนที่ห้ามแปล) และให้ประโยคเป็นสตริงเดียว ไม่แตกด้วย JSX expression
- ใส่ `data-reveal` ให้การ์ดที่ต้องการ animation ตอนเลื่อนเข้าจอ
- ไอคอนใช้ `lucide-react` + class `lc`; รูปใช้ `media('ชื่อไฟล์')`
- ข้อความที่ผู้ใช้พิมพ์แบบ rich text ต้องผ่าน `sanitizeHTML` ก่อนแสดง
