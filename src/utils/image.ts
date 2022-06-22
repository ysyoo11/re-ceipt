export function downloadImage(src: string, filename: string): void {
  if (typeof window === 'undefined') {
    return console.error('Ensure you are trying to download within a browser.');
  }

  const downloadButton = document.createElement('a');
  downloadButton.href = src;
  downloadButton.download = filename;

  // this is necessary as downloadButton.click() does not work on the latest firefox
  downloadButton.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    }),
  );

  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    // window.URL.revokeObjectURL(base64)
    downloadButton.remove();
  }, 100);

  downloadButton.remove();
}

export async function getImageUrl(file: File) {
  const heic2any = require('heic2any');
  const blobUrl = URL.createObjectURL(
    file.type === 'image/heic'
      ? ((await heic2any({ blob: file, toType: 'jpeg', quality: 0.9 })) as Blob)
      : file,
  );

  return blobUrl;
}
