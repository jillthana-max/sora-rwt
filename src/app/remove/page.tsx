"use client";

import React, { useMemo, useState } from "react";

/**
 * หน้า /remove (Demo UI – ยังไม่ต่อ Backend)
 * - ถ้าคุณยังไม่ได้ติดตั้ง Tailwind: โค้ดทำงานได้ แต่จะไม่ขึ้นสไตล์ (คลาสต่าง ๆ จะถูกละเลย)
 * - พร้อมต่อจริง: แทน mock* ด้วยการเรียก API ของคุณ (Cloud Run ฯลฯ)
 */

export default function Page() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [credits, setCredits] = useState<number>(10);
  const [pricePerJob, setPricePerJob] = useState<number>(5);

  const [sourceUrl, setSourceUrl] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<"IDLE" | "QUEUED" | "PROCESSING" | "FAILED" | "COMPLETED">("IDLE");
  const [message, setMessage] = useState<string>("");

  const canRun = useMemo(() => !!sourceUrl && !isProcessing && loggedIn, [sourceUrl, isProcessing, loggedIn]);

  // ============ MOCK ZONE ============
  function mockGoogleLogin() {
    setLoggedIn(true);
    setUser({ name: "คุณลูกค้า", email: "user@example.com" });
  }

  function mockLogout() {
    setLoggedIn(false);
    setUser(null);
    setResultUrl(null);
    setStatus("IDLE");
  }

  async function mockSubmitJob() {
    setMessage("");

    if (!loggedIn) {
      setMessage("โปรดเข้าสู่ระบบก่อน");
      return;
    }
    if (!sourceUrl) {
      setMessage("โปรดวางลิงก์วิดีโอ");
      return;
    }
    if (credits < pricePerJob) {
      setMessage(`เครดิตไม่พอ (ต้องการอย่างน้อย ${pricePerJob})\nกรุณาเติมเครดิตก่อน`);
      return;
    }

    const id = `job_${Math.random().toString(36).slice(2, 8)}`;
    setJobId(id);
    setStatus("QUEUED");
    setIsProcessing(true);

    await new Promise((r) => setTimeout(r, 700)); // QUEUED
    setStatus("PROCESSING");

    try {
      await new Promise((r) => setTimeout(r, 1600));
      const demoVideo = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
      setResultUrl(demoVideo);
      setStatus("COMPLETED");
      setCredits((c) => c - pricePerJob);
      setMessage("งานเสร็จแล้ว! ระบบหักเครดิตเรียบร้อย");
    } catch (err) {
      console.error(err);
      setStatus("FAILED");
      setMessage("เกิดข้อผิดพลาด ลองใหม่อีกครั้ง");
    } finally {
      setIsProcessing(false);
    }
  }

  function mockTopUp(amountCredits: number) {
    setCredits((c) => c + amountCredits);
    setMessage(`เติมเครดิต +${amountCredits} สำเร็จ (จำลอง)`);
  }

  function resetJob() {
    setJobId(null);
    setResultUrl(null);
    setStatus("IDLE");
    setMessage("");
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 text-slate-800">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white text-lg font-semibold">S2</span>
            <div>
              <h1 className="text-lg font-bold leading-tight">Sora2 – ลบลายน้ำวิดีโอ</h1>
              <p className="text-xs text-slate-500">วางลิงก์ → ลบลายน้ำ → ดาวน์โหลด</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {loggedIn && (
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm border border-slate-200">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                เครดิต: <b>{credits}</b>
              </span>
            )}

            {!loggedIn ? (
              <button
                onClick={mockGoogleLogin}
                className="rounded-xl bg-slate-900 text-white px-4 py-2 text-sm hover:bg-slate-800 shadow"
              >
                เข้าสู่ระบบด้วย Google (จำลอง)
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-sm">{user?.name}</span>
                <button
                  onClick={mockLogout}
                  className="rounded-xl bg-white px-3 py-2 text-sm border border-slate-200 hover:bg-slate-50"
                >
                  ออกจากระบบ
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Action Card */}
        <section className="md:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold">เริ่มงานลบลายน้ำ</h2>
              <span className="text-xs text-slate-500">ราคา/งาน: <b>{pricePerJob}</b> เครดิต</span>
            </div>

            <div className="mt-4 space-y-3">
              <label className="block text-sm text-slate-600">วางลิงก์วิดีโอ (เช่น Youtube/Cloud Storage)</label>
              <input
                type="url"
                placeholder="https://..."
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-4 focus:ring-slate-200"
              />

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  disabled={!canRun}
                  onClick={mockSubmitJob}
                  className={`rounded-xl px-4 py-2 text-sm text-white shadow transition ${
                    canRun ? "bg-slate-900 hover:bg-slate-800" : "bg-slate-300 cursor-not-allowed"
                  }`}
                >
                  {isProcessing ? "กำลังประมวลผล..." : "ลบลายน้ำ"}
                </button>

                <button
                  onClick={() => mockTopUp(10)}
                  className="rounded-xl bg-white px-4 py-2 text-sm border border-slate-200 hover:bg-slate-50"
                >
                  เติมเครดิต +10 (จำลอง)
                </button>

                <button
                  onClick={resetJob}
                  className="rounded-xl bg-white px-4 py-2 text-sm border border-slate-200 hover:bg-slate-50"
                >
                  รีเซ็ตหน้าจอ
                </button>
              </div>

              {message && (
                <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 whitespace-pre-line">
                  {message}
                </div>
              )}
            </div>
          </div>

          {/* Job Panel */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">สถานะงาน</h3>
              <span className="text-xs rounded-full bg-slate-100 px-2.5 py-1 border border-slate-200">{status}</span>
            </div>

            <div className="mt-3 text-sm text-slate-600 space-y-1">
              <p>รหัสงาน: <b>{jobId ?? "—"}</b></p>
              <p>ลิงก์ต้นทาง: <span className="break-all text-slate-700">{sourceUrl || "—"}</span></p>
            </div>

            {resultUrl ? (
              <div className="mt-4">
                <div className="aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-black">
                  <video src={resultUrl} controls className="h-full w-full" />
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <a
                    href={resultUrl}
                    download
                    className="rounded-xl bg-emerald-600 text-white px-4 py-2 text-sm shadow hover:bg-emerald-700"
                  >
                    ดาวน์โหลดวิดีโอ
                  </a>
                  <span className="text-xs text-slate-500">(เดโม: ใช้วิดีโอตัวอย่างจาก MDN)</span>
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
                {status === "IDLE" && "ยังไม่มีงาน เริ่มจากวางลิงก์แล้วกด ‘ลบลายน้ำ’"}
                {status === "QUEUED" && "เข้าคิวรอประมวลผล..."}
                {status === "PROCESSING" && "กำลังประมวลผล โปรดรอสักครู่"}
                {status === "FAILED" && "งานล้มเหลว ลองใหม่อีกครั้ง"}
                {status === "COMPLETED" && "เสร็จแล้ว แต่ไม่พบลิงก์ผลลัพธ์"}
              </div>
            )}
          </div>
        </section>

        {/* Side Panel */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold">คู่มือการใช้งาน (ย่อ)</h3>
            <ol className="mt-3 list-decimal pl-5 text-sm text-slate-700 space-y-2">
              <li>เข้าสู่ระบบด้วย Google</li>
              <li>ตรวจสอบเครดิตคงเหลือ</li>
              <li>วางลิงก์วิดีโอในช่องด้านซ้าย</li>
              <li>กดปุ่ม <b>ลบลายน้ำ</b></li>
              <li>รอผล → กด <b>ดาวน์โหลด</b></li>
            </ol>
            <p className="mt-3 text-xs text-slate-500">*ในเดโมนี้ ทุกอย่างเป็นการจำลองเพื่อให้เห็นหน้าตาและการไหลของระบบ</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold">เติมเครดิต (เดโม)</h3>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[10, 20, 50].map((amt) => (
                <button
                  key={amt}
                  onClick={() => mockTopUp(amt)}
                  className="rounded-xl border border-slate-200 bg-white py-2 text-sm hover:bg-slate-50"
                >
                  +{amt}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-500">
              เวอร์ชันจริง: ทำหน้าอัปโหลดสลิปโอนเงิน แล้วให้แอดมินอนุมัติ → เครดิตจะเพิ่มอัตโนมัติ
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold">ตั้งค่าทั่วไป</h3>
            <div className="mt-3 flex items-center justify-between">
              <label className="text-sm text-slate-700">ราคา/งาน (เครดิต)</label>
              <input
                type="number"
                min={1}
                value={pricePerJob}
                onChange={(e) => setPricePerJob(parseInt(e.target.value || "1", 10))}
                className="w-24 rounded-xl border border-slate-300 px-3 py-1 text-sm text-right focus:ring-4 focus:ring-slate-200"
              />
            </div>
            <p className="mt-2 text-xs text-slate-500">*เมื่อของจริง: ควรตั้งราคาในหน้า Admin และอ่านค่าจาก API</p>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="mt-8 border-t border-slate-200 bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Sora2 Demo UI • เวอร์ชันสาธิตเพื่อประกอบการพัฒนา</p>
          <p>เมื่อพร้อมต่อจริง เราจะเชื่อม Google Login, ฐานข้อมูลเครดิต..., Sora API, และระบบดาวน์โหลดผ่าน Signed URL</p>
        </div>
      </footer>
    </div>
  );
}
