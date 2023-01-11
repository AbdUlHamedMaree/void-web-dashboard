import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '$ui/cache/create-emotion-cache';
import { theme } from '$ui/theme';
import type { NextSeoProps } from 'next-seo';
import { DefaultSeo } from 'next-seo';
import type { AppProps as BaseAppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import { isServer } from '$libs/checks';
import { scrollToWindowHash } from '$logic/utils/scroll-to-window-hash';
import 'nprogress/nprogress.css';
import { AuthGuard } from '$ui/components/guards/auth';
import type { NextPage } from 'next';

const url = process.env.NEXT_PUBLIC_SITE_URL!;

export const DefaultSeoProps: NextSeoProps = {
  canonical: url,
  titleTemplate: '%s Dubai, UAE - Pizza',
  defaultTitle: 'Pizza: The Best Pizza Agency in Dubai, UAE',
  description:
    'Pizza is a pizza agency in Dubai, UAE. We build websites, mobile apps, brands, and marketing campaigns full of creativity and innovation.',
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: url,
    site_name: 'Pizza',
    images: [
      {
        url: `${url}/assets/logo/logo-portrait.png`,
        alt: 'Pizza Agency Logo',
        width: 500,
        height: 324,
        type: 'image/png',
      },
    ],
  },
  languageAlternates: [{ hrefLang: 'en-ae', href: url }],
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

const TopProgressBar = dynamic(
  () => {
    return import('../ui/components/shared/next-progress');
  },
  { ssr: false }
);

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type AppProps = {
  emotionCache?: EmotionCache;
} & BaseAppProps & {
    Component: NextPage;
  };

const App: React.FC<AppProps> = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) => {
  const { asPath } = useRouter();

  const Layout: React.ComponentType<{ children?: React.ReactNode }> = useMemo(
    () =>
      Component.layout ??
      (({ children }: { children?: React.ReactNode }) => <>{children}</>),
    [Component]
  );

  useEffect(() => {
    if (isServer()) return;
    // To scroll to section by url hashing (ex: /home#blog)
    scrollToWindowHash();
  }, [asPath]);

  const page = useMemo(() => {
    if (Component?.auth)
      return (
        <AuthGuard {...Component.auth}>
          <Component {...pageProps} />
        </AuthGuard>
      );
    return <Component {...pageProps} />;
  }, [Component, pageProps]);

  return (
    <>
      <DefaultSeo {...DefaultSeoProps} />
      <CacheProvider value={emotionCache}>
        <TopProgressBar />
        <Head>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>{page}</Layout>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default App;
