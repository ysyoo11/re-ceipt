import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useUser } from '@frontend/hooks/use-user';

export default function EnterLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user != null) router.push('/');
  }, [user, router]);

  if (user != null) return null;

  return <>{children}</>;
}
