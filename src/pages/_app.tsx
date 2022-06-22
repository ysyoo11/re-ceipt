import '@assets/main.css';

import { DefaultSeo } from 'next-seo';
import NextNProgress from 'nextjs-progressbar';

import { CommonLayout } from '@frontend/components/layout';
import { Modal, Notification } from '@frontend/components/ui';
import { useModal } from '@frontend/hooks/use-modal';
import { useNoti } from '@frontend/hooks/use-noti';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const LandingLayout = (Component as any).Layout || CommonLayout;

  const { modal, closeModal } = useModal();
  const { noti, closeNoti } = useNoti();

  return (
    <>
      <DefaultSeo
        title="Re:ceipt"
        description="Re:ceipt makes it easier to rename image file for Coxwave members when applying for workflow on Flex."
        openGraph={{
          type: 'website',
          title: 'Re:ceipt',
          description:
            'Re:ceipt makes it easier to rename image file for Coxwave members when applying for workflow on Flex.',
          images: [
            {
              url: '/assets/opengraph.jpg',
              width: 1200,
              height: 630,
              alt: 'Re:ceipt',
            },
          ],
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/assets/favicon/favicon.ico',
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/assets/favicon/favicon-16x16.png',
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/assets/favicon/favicon-32x32.png',
          },
          {
            rel: 'apple-touch-icon',
            href: '/assets/favicon/apple-touch-icon.png',
            sizes: '180x180',
          },
          {
            rel: 'manifest',
            href: '/assets/favicon/site.webmanifest',
          },
        ]}
      />
      <NextNProgress
        color="#29D"
        showOnShallow={false}
        height={2}
        startPosition={0.3}
        options={{ easing: 'ease', speed: 500, showSpinner: false }}
      />
      <LandingLayout>
        <Component {...pageProps} />
      </LandingLayout>

      <Modal {...modal} close={closeModal} />
      <Notification {...noti} close={closeNoti} />
    </>
  );
}
