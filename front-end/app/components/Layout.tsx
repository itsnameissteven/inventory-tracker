import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="flex items-center justify-center pt-16 pb-4 dark">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <div className="max-w-[3000px] w-full space-y-6 px-4">{children}</div>
      </div>
    </main>
  );
};
