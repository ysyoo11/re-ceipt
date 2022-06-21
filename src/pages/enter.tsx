import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { EnterLayout } from '@frontend/components/layout';
import { Button, Input } from '@frontend/components/ui';

export default function EnterPage() {
  const [name, setName] = useState('');

  const router = useRouter();

  const handleConfirm = useCallback(() => {
    window.localStorage.setItem('@username', name);
    router.push('/');
  }, [name, router]);

  return (
    <div className="flex h-full min-h-screen w-full flex-col justify-center bg-cox-deep-blue-900 px-4">
      <div className="mx-auto w-full max-w-sm">
        <p className="text-center text-xl font-medium text-white">성함을 입력해주세요.</p>
        <div className="space-y-2">
          <Input onChange={(e) => setName(e.target.value)} placeholder="홍길동" />
          <Button onClick={handleConfirm} full>
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}

EnterPage.Layout = EnterLayout;
