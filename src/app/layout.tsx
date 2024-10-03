import Link from 'next/link';

import './globals.css';
import styles from './layout.module.css';
import { ReactNode } from 'react';

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className={styles.container}>
          <header className={styles.header}>
            <Link href={'/'}>🎥 ONEBITE CINEMA</Link>
          </header>
          <main className={styles.main}>{children}</main>
          <footer className={styles.footer}></footer>
          {modal}
          <div id="modal-root"></div>
        </div>
      </body>
    </html>
  );
}
