import Bowser from 'bowser';

export const isIos: () => boolean = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};

export const isAndroid: () => boolean = () => {
  const userAgent = window.navigator.userAgent.toLocaleLowerCase();
  return /android/i.test(userAgent);
};

export const isSafari: () => boolean = () => {
  return Boolean(
    navigator.vendor &&
      navigator.vendor.indexOf('Apple') > -1 &&
      navigator.userAgent &&
      navigator.userAgent.indexOf('CriOS') === -1 &&
      navigator.userAgent.indexOf('FxiOS') === -1,
  );
};

export const isSamsungBrowser = () => {
  return Boolean(navigator.userAgent.toLocaleLowerCase().match('samsungbrowser'));
};

export const isMobile: () => boolean = () => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  return browser.getPlatform().type === 'mobile';
};

export const isTablet: () => boolean = () => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  return browser.getPlatform().type === 'tablet';
};

export const isDesktop: () => boolean = () => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  return browser.getPlatform().type === 'desktop';
};

export const isMacOS: () => boolean | null = () => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  return browser.getOS().name?.toLowerCase().includes('mac') ?? null;
};

export const isInApp: () => boolean = () => {
  const browserInfo = Bowser.getParser(window.navigator.userAgent).getUA().toLowerCase();

  return (
    browserInfo.includes('kakao') ||
    browserInfo.includes('instagram') ||
    browserInfo.includes('line') ||
    browserInfo.includes('fban')
  );
};
