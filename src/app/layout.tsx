import type { Metadata } from 'next'

// These styles apply to every route in the application
import './globals.css'


export const metadata: Metadata = {
    title: 'crowemi',
    description: 'A personal website for crowemi -- showcasing the latest updates, thoughts, and experiences',
}

export default function RootLayout({ children }) {

    return (
        <html lang="en">
        <body className="bg-black">{children}</body>
        </html>
    );
}