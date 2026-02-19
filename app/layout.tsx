import './globals.css'

export const metadata = {
  title: 'Crowemi',
  description: 'Writer, developer, and creator.',
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
