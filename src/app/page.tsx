import Link from "next/link";

export default function Home() {
  return (
    <main style={{ height: "100vh", display: "grid", placeItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Hello Sora! 👋</h1>
        <p><Link href="/remove">ไปหน้า “ลบลายน้ำ”</Link></p>
      </div>
    </main>
  );
}

