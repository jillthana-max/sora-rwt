// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',         // แทนที่ next export เดิม
  images: { unoptimized: true }, // จำเป็นสำหรับ static export
  // trailingSlash: true,    // (ไม่บังคับ) ถ้าอยากให้ URL ลงท้ายด้วย / เสมอ
};
module.exports = nextConfig;