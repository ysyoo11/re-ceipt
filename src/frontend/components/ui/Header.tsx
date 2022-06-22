import { PencilIcon } from '@heroicons/react/outline';
import { useState } from 'react';

import { EditNameModal } from '@frontend/components/custom';
import { useUser } from '@frontend/hooks/use-user';

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  const { user } = useUser();

  return (
    <>
      <header className="sticky top-0 z-[1] bg-white px-4 py-2 shadow-md">
        <div className="mx-auto flex w-full max-w-sm items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">Image Renamer</h1>
          <div className="flex items-center space-x-1.5 text-gray-700">
            <span>{user}</span>
            <button onClick={() => setShowModal(true)}>
              <PencilIcon className="h-4 w-4 text-system-link" />
            </button>
          </div>
        </div>
      </header>
      <EditNameModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
