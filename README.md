```markdown
## 🎯 Goals & Roadmap (for Codex)
โปรเจกต์นี้ใช้ Next.js + Firebase Hosting + Cloud Run + Firebase Auth + Firestore

- แผนรวม: ดู `docs/PLAN.md`
- วิธีคุยกับ Codex: ดู `docs/CODEX_GUIDE.md`
- งานที่กำลังทำ: **Task05 — UI Remove Watermark**  
  รายละเอียด: `docs/tasks/task05-ui-remove-watermark.md`

> หมายเหตุ: เราทำงาน “ทีละ Task” ผ่าน Pull Request เท่านั้น


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Mock Remove Watermark Flow

- Visit [`/remove`](http://localhost:3000/remove) to try the Task05 mock UI.
- Paste any video URL starting with `http://` or `https://` and click **Remove watermark**.
- Watch the status panel step through idle, loading, success, or error (e.g., try submitting an invalid URL).
- A mock download link appears on success, and you can reset the flow with **Start over**.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
