import { generateQueryString, getClosest } from '../../Utils/helper';

const useHandleCMSContent = (props: { history?: any; onScroll?: (url?: string) => void; routePageReload?: string }) => {
  const { history, onScroll, routePageReload } = props;
  return (e) => {
    try {
      if (e && e.target) {
        const elm = getClosest(e.target, 'a');
        if (elm && !e.ctrlKey && elm.href) {
          e.preventDefault();
          let url = elm.href.replace(window.location.origin, '');
          if (elm.host !== window.location.host || elm.target === '_blank') {
            window.open(url, '_blank');
          } else {
            if (url.indexOf('#') > 0) {
              url = url[0] === '/' ? url.replace('/', '') : url;
              if (typeof onScroll === 'function') {
                onScroll(url);
              }
              // scroller.scrollTo(url.replace('#', ''), {
              //   spy: true,
              //   hashSpy: false,
              //   smooth: true,
              //   duration: 500,
              //   isDynamic: true,
              //   offset: isMobile ? -60 : -150,
              // });
            } else {
              if (url.indexOf('type=') === -1 && url.indexOf('id=') === -1) {
                if (elm.dataset && Object.keys(elm.dataset).length > 0) {
                  url += `?${generateQueryString(elm.dataset)}`;
                }
              }
              if (url.indexOf(routePageReload) > -1) {
                window.location.href = url;
              } else {
                history.push(url);
              }
            }
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export default useHandleCMSContent;
