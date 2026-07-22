import './globals.css';
import type { ReactNode } from 'react';
import { site } from './config';

export const metadata = { title: site.name };

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
