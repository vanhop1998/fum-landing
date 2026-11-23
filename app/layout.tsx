import type { Metadata, Viewport } from "next";
import "@vepando/liquid-glass-react/style.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fumfpt.vercel.app"),
  title: "FUM – CLB Truyền thông Đại học FPT Đà Nẵng",
  description:
    "FUM – Câu lạc bộ Truyền thông Đại học FPT Đà Nẵng, thành lập 13/9/2017. Content, Visual, Design.",
  openGraph: {
    type: "website",
    url: "https://fumfpt.vercel.app/",
    title: "FUM – CLB Truyền thông Đại học FPT Đà Nẵng",
    description:
      "Dám làm, dám khác biệt. Tham gia FUM mỗi học kỳ, không yêu cầu kinh nghiệm.",
    images: [{ url: "/assets/chuyengiao_4.jpg" }]
  },
  icons: {
    icon: "/assets/favicon.png",
    apple: "/assets/favicon.png"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#9A0000"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
