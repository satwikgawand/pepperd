import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "pepperd — papers, but you'll actually finish them",
  description: "hand-crafted academic paper breakdowns. brainrot TLDRs, key findings, and interactive visual explainers.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen" style={{ backgroundColor: "#f5f2eb", color: "#1a1a1a" }}>
        {children}
      </body>
    </html>
  )
}
