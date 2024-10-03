import Link from 'next/link';

import './globals.css';
import styles from './layout.module.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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

          <div id="modal-root"></div>
        </div>
      </body>
    </html>
  );
}
