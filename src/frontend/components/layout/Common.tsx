import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Header } from '@frontend/components/ui';
import { useUser } from '@frontend/hooks/use-user';

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push('/enter');
  }, [user, router]);

  if (user == null) return null;

  return (
    <>
      <Header />
      <main className="relative mx-auto h-full w-full max-w-sm">{children}</main>
    </>
  );
}
