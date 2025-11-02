# Sora RWT – Project Plan (for Codex & Humans)

## Vision
สร้างเว็บ “Sora – ลบลายน้ำจากวิดีโอ” บน GCP ที่ใช้งานง่าย ปลอดภัย และขยายต่อได้:
- Frontend: Next.js (TS) + Export → Firebase Hosting
- Backend: Cloud Run (Node/TS, Express)
- Auth: Firebase Auth (Google Sign-in)
- Data: Firestore (เครดิต/ประวัติการใช้)
- CI/CD: GitHub Actions (Preview on PR, Deploy on main)

## Milestones
1) **M1 – UI พื้นฐาน**: หน้าอินพุตลิงก์, ปุ่ม “ลบลายน้ำ”, สถานะโหลด/สำเร็จ/ผิดพลาด (mock)
2) **M2 – Auth**: Google Sign-in/out (mock ก่อน → จริงภายหลัง)
3) **M3 – Credits**: แถบเครดิต, โครงหักเครดิตแบบธุรกรรม (mock → Firestore จริง)
4) **M4 – Backend API**: Cloud Run `/api/remove-watermark` (mock → เชื่อมของจริง)
5) **M5 – Hardening**: rate limit, logs, audit, idempotency, error taxonomy
6) **M6 – Staging/Prod**: แยก env, deploy flow ชัดเจน

## Working Agreements
- ทำงาน “ทีละ Task” ผ่าน Pull Request เสมอ
- ทุก PR ต้องอ้างอิงเอกสารใน `docs/tasks/<task>.md`
- ชื่อ PR: `TaskXX: <summary>`
- ชื่อ commit: สั้น ชัด เช่น `feat(ui): add watermark input`
- DoD (Definition of Done):
  - เช็กลิสต์ในไฟล์ task ถูกติ๊กครบ
  - Build/Preview ผ่าน (Actions เขียว)
  - อัปเดต README/Docs/Changelog ถ้ามีผลกระทบ

## Task Backlog (ย่อ)
- Task05 — UI “ลบลายน้ำ” (M1) 🟡 (เริ่มตรงนี้)
- Task06 — Google Sign-in (M2) ⏳
- Task07 — Credit Bar + Mock Deduct (M3) ⏳
- Task08 — Cloud Run API (Mock) (M4) ⏳
- Task09 — เชื่อม API จริง + หักเครดิตธุรกรรม (M4/M5) ⏳
- Task10 — Hardening + Staging (M5/M6) ⏳

> Current Focus: **Task05** (ดูรายละเอียดที่ `docs/tasks/task05-ui-remove-watermark.md`)

