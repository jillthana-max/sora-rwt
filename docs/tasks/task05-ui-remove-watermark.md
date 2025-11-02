# Task05 — UI: Remove Watermark (M1)

## Goal
สร้างหน้า UI ให้ผู้ใช้ใส่ลิงก์วิดีโอ → กดปุ่ม “ลบลายน้ำ” → เห็นสถานะผลลัพธ์ (ยังเป็น mock)

## Scope
- หน้าใหม่: `/remove` (Next.js `src/app/remove/page.tsx`)
- Components:
  - `components/WatermarkForm.tsx` (รับ URL + ปุ่ม)
  - `components/StatusPanel.tsx` (แสดง loading/success/error)
  - `components/CreditBar.tsx` (mock ค่าเครดิต เช่น 120/200)
- สถานะ:
  - Loading: หมุนรอ/ข้อความกำลังประมวลผล
  - Success: โชว์ข้อความสำเร็จ + ลิงก์ดาวน์โหลด (mock)
  - Error: โชว์ข้อความผิดพลาดจาก validation/mock
- Styling: ใช้ inline/พื้นฐานก่อน (Tailwind optional ภายหลัง)
- ไม่มีการเรียก API จริงในงานนี้ (ใช้ mock function)

## Non-Goals (ห้ามทำใน Task นี้)
- Auth จริง (Google sign-in)
- Firestore จริง
- Cloud Run จริง

## Acceptance Criteria (DoD)
- [ ] ไปที่ `/remove` แล้วเห็นฟอร์ม URL + ปุ่ม “ลบลายน้ำ”
- [ ] ป้อน URL ไม่ถูกต้อง → แสดง error
- [ ] ป้อน URL ถูกต้อง + กดปุ่ม → เห็น loading → success (mock)
- [ ] มี `CreditBar` แสดงค่า mock เสมอ
- [ ] โค้ดเป็น TypeScript, component แยกไฟล์ชัดเจน
- [ ] Build/Preview ผ่าน (Actions เขียว)
- [ ] อัปเดต README (เพิ่มลิงก์หน้า `/remove`)

## Notes for Codex
- สร้าง mock function ใน `lib/mockRemove.ts`:
  ```ts
  export async function mockRemove(url: string) {
    await new Promise(r => setTimeout(r, 1200));
    if (!/^https?:\/\//.test(url)) throw new Error("Invalid URL");
    return { downloadUrl: "#mock-file.mp4" };
  }

