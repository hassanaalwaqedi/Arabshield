import './globals.css';

/**
 * Root layout - minimal wrapper that redirects to locale-specific layouts.
 * The actual layout logic is in app/[locale]/layout.tsx
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
