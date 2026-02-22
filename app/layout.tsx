import './globals.css'

export const metadata = {
  title: 'crowemi.com',
  description: 'Believer, Builder, Writer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
