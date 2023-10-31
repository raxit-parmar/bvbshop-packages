import { useEffect } from 'react';

declare const window: any;

export const useRestoreScrollPosition = (page) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = JSON.parse(sessionStorage.getItem('scrollPosition') || '{}');
      const scrollPage = JSON.stringify({
        ...scrollPosition,
        [page]: window.pageYOffset,
      });
      sessionStorage.setItem('scrollPosition', scrollPage);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      const scrollPosition = JSON.parse(sessionStorage.getItem('scrollPosition') || '{}');
      const scrollPage = JSON.stringify({
        ...scrollPosition,
        [page]: window.pageYOffset,
      });
      sessionStorage.setItem('scrollPosition', scrollPage);
    };

    // tslint:disable-next-line:align
  }, [page]);

  useEffect(() => {
    const scrollPosition = JSON.parse(sessionStorage.getItem('scrollPosition') || '{}');

    if (scrollPosition !== null) {
      // tslint:disable-next-line:radix
      window.scrollTo(0, parseInt(scrollPosition[page]));
    }
    // tslint:disable-next-line:align
  }, [page]);
};
