import { useCallback, useEffect, useState } from 'react';

import Logo from '@frontend/components/core/Logo';
import { EnterLayout } from '@frontend/components/layout';
import { Button, Input } from '@frontend/components/ui';
import { useUser } from '@frontend/hooks/use-user';

export default function EnterPage() {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  const { mutate } = useUser();

  const handleConfirm = useCallback(() => {
    window.localStorage.setItem('@username', name);
    mutate();
  }, [name, mutate]);

  useEffect(() => {
    if (name.length > 4) {
      setError(true);
    } else {
      setError(false);
    }
  }, [name]);

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col justify-center px-4">
      <div className="absolute top-32 left-1/2 -translate-x-1/2 space-y-2 text-center">
        <Logo className="w-48" />
        <h1 className="text-4xl font-bold">Re:ceipt</h1>
      </div>
      <div className="mx-auto w-full max-w-sm">
        <p className="text-center text-xl font-medium">성함을 입력해주세요.</p>
        <div className="space-y-2">
          <div>
            <Input onChange={(e) => setName(e.target.value)} placeholder="홍길동" error={error} />
            {error && <p className="text-system-error">Your name should be less than 5 letters.</p>}
          </div>
          <Button
            onClick={handleConfirm}
            full
            aria-label="Confirm"
            disabled={name.length == 0 || error}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}

EnterPage.Layout = EnterLayout;
