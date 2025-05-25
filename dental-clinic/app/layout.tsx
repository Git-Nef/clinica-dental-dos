import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Odontología Integral Especializada",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 2C8.5 2 6 4.5 6 8c0 2 0.5 4 1 6 0.5 2 1.5 4 3 5 0.5 0.5 1 1 2 1s1.5-0.5 2-1c1.5-1 2.5-3 3-5 0.5-2 1-4 1-6 0-3.5-2.5-6-6-6z'/%3E%3C/svg%3E",
        sizes: "32x32",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 2C8.5 2 6 4.5 6 8c0 2 0.5 4 1 6 0.5 2 1.5 4 3 5 0.5 0.5 1 1 2 1s1.5-0.5 2-1c1.5-1 2.5-3 3-5 0.5-2 1-4 1-6 0-3.5-2.5-6-6-6z'/%3E%3C/svg%3E",
        sizes: "180x180",
        type: "image/svg+xml",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
