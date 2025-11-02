# How We Work With Codex

## Core Idea
- เขียน “เป้าหมาย” และ “ข้อกำหนด” ไว้ใน `docs/tasks/<task>.md`
- ให้ Codex วางแผนก่อน (`plan`), แล้วค่อยให้ “ลงมือ” (`implement`) เป็น PR

## Prompts ที่ใช้บ่อย
- วางแผน:  
  **“Plan how to implement Task05 based on docs/tasks/task05-ui-remove-watermark.md.”**
- ปรับแผน:  
  **“Revise the plan to use TypeScript and keep components reusable.”**
- ลงมือทำ:  
  **“Implement the approved plan as a new PR for Task05.”**
- สรุปผลกระทบ:  
  **“Explain what this PR changes, files touched, and potential side effects.”**

## Guardrails
- ทำทีละ Task เท่านั้น
- อ้างอิงข้อกำหนด/DoD จากไฟล์ task ทุกครั้ง
- ถ้าต้องเพิ่ม dependency ให้ระบุเหตุผลใน PR description

