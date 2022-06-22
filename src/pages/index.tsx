import NextImage from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';

import Loading from '@frontend/components/core/Loading';
import { Button, Listbox } from '@frontend/components/ui';
import { useNoti } from '@frontend/hooks/use-noti';
import { useUser } from '@frontend/hooks/use-user';
import { getTodayDate } from '@utils/get-today-date';
import { downloadImage, getImageUrl } from '@utils/image';

import type { Category } from '@types';

const today = getTodayDate();

export default function IndexPage() {
  const { user } = useUser();

  const [date, setDate] = useState(today);
  const parsedDate = useMemo(() => date.replace(/-/g, '').substring(2), [date]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [category, setCategory] = useState<Category>('점심식대');
  const [fileName, setFileName] = useState(`${user}_${parsedDate}_${category}.jpg`);
  const [loading, setLoading] = useState(false);

  const { showAlert } = useNoti();

  const showPreview = useCallback(async () => {
    if (!selectedFile) {
      setPreview('');
      return;
    }
    setLoading(true);

    await getImageUrl(selectedFile)
      .then((url) => setPreview(url))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedFile]);

  const handleDownloadClick = useCallback(() => {
    if (selectedFile == null) return;

    const renamedFile = new File([selectedFile], fileName);
    const shareData = { files: [renamedFile] };
    const userAgent = navigator.userAgent || navigator.vendor;
    const isMobile = /android|iPad|iPhone|iPod/i.test(userAgent);

    downloadImage(preview, fileName);

    // if (isMobile) {
    //   navigator.share(shareData);
    // } else {
    //   downloadImage(preview, fileName);
    // }
  }, [selectedFile, fileName, preview]);

  useEffect(() => {
    showPreview();
  }, [showPreview]);

  useEffect(() => {
    setFileName(`${user}_${parsedDate}_${category}.jpg`);
  }, [user, parsedDate, category]);

  return (
    <section className="mt-6 h-full w-full space-y-4 pb-40">
      <label htmlFor="image" className="h-full w-full font-medium">
        Image:
        {selectedFile && preview && !loading ? (
          <div className="relative h-full w-full" style={{ maxHeight: '50%' }}>
            <NextImage
              src={preview}
              layout="fill"
              objectFit="contain"
              alt="Uploaded image preview"
            />
          </div>
        ) : loading ? (
          <div className="relative h-full w-full" style={{ maxHeight: '50%' }}>
            <Loading />
          </div>
        ) : null}
        <span className="mt-2 block w-full cursor-pointer rounded-xl bg-cox-light-blue-500 py-2 text-center text-white">
          이미지 파일 선택
        </span>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/jpeg, image/png, image/webp, image/heic"
          onChange={(e) => {
            setSelectedFile(null);
            setPreview('');
            if (e.target.files != null) {
              setSelectedFile(e.target.files[0]);
            }
          }}
          className="hidden"
        />
      </label>
      <div className="space-y-2">
        <label htmlFor="date" className="font-medium">
          Date:
        </label>
        <input
          id="date"
          name="date"
          type="date"
          max={today}
          onChange={(e) => setDate(e.target.value)}
          value={date}
          className="datepicker-input h-10 w-full rounded-xl border border-gray-400 focus:outline-none focus-visible:border-cox-light-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-cox-light-blue-500 sm:text-sm"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="category" className="font-medium">
          Category:
        </label>
        <Listbox selected={category} setSelected={setCategory} />
      </div>
      <div className="space-y-2">
        <label htmlFor="category" className="font-medium">
          File Name:
        </label>
        <span className="block text-center">{fileName}</span>
      </div>

      <Button
        onClick={handleDownloadClick}
        color="deep-blue"
        disabled={selectedFile && preview && date ? false : true}
        full
      >
        다운로드
      </Button>
    </section>
  );
}
