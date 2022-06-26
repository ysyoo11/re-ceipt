import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useCallback, useState } from 'react';

import { Button, Input } from '@frontend/components/ui';
import { useNoti } from '@frontend/hooks/use-noti';
import { useUser } from '@frontend/hooks/use-user';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function EditNameModal({ open, onClose }: Props) {
  const [newName, setNewName] = useState('');

  const { editName, mutate } = useUser();

  const { showNoti, showAlert } = useNoti();

  const handleNameEdit = useCallback(() => {
    editName(newName)
      .then(() => {
        showNoti({
          title: `Your name has been updated to ${newName}!`,
        });
        mutate();
        onClose();
      })
      .catch((err) => showAlert(err));
  }, [editName, showNoti, showAlert, newName, onClose, mutate]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-30 overflow-y-auto" onClose={onClose}>
        <div className="flex min-h-screen items-center justify-center px-4 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-full max-w-sm transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
              <h6 className="text-xl font-medium">Edit name</h6>
              <Input onChange={(e) => setNewName(e.target.value)} placeholder="변경할 이름" />
              <div className="mt-4 flex space-x-2">
                <Button onClick={onClose} color="white" full aria-label="Cancel">
                  취소
                </Button>
                <Button onClick={handleNameEdit} full aria-label="Confirm">
                  확인
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
