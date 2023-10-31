import _ from 'lodash';
import { useSelector } from 'react-redux';
import useFirstEffect from '../../Libs/useFirstEffect';
import { deepClone, generateSearchUrl, removeEmpty } from '../../Utils';

export interface SearchRedirectProps {
  setSkeletonType?: (type?: string) => void;
  SearchRoutes?: {
    [key: string]: any;
    path?: string;
    title?: string;
    queryParam?: any;
  }[];
  history?: any;
  redirectPrefixRoute?: string;
}

export const convertQueryParam = (queryParam) => {
  const attributes = {};
  if (queryParam['op']) {
    queryParam['op'].split('|').forEach((a) => {
      if (a) {
        const b = a.split(':');
        if (b) {
          attributes[b[0]] = b[1].split(';');
        }
      }
    });
  }
  return attributes;
};

const useSearchRedirect = (props: SearchRedirectProps) => {
  const { setSkeletonType, SearchRoutes, history, redirectPrefixRoute = '/search' } = props;
  const searchState: any = useSelector((state: any) => state.search);

  useFirstEffect(() => {
    if (!searchState.categoryId && !searchState.manufacturerId) {
      if (process.env.NODE_ENV !== 'development') {
        let redirectUrl = redirectPrefixRoute;
        let attributes = deepClone(removeEmpty(searchState));
        // PF Use case
        if (SearchRoutes && SearchRoutes.length > 0) {
          const searchRoutes = SearchRoutes.filter((sr) => `/${sr.path}` !== redirectPrefixRoute);
          const searchUrls = searchRoutes.map((sr) => `/${sr.path}`);
          const searchIndex = searchUrls.indexOf(location.pathname);
          if (searchIndex !== -1 && !searchState.q) {
            redirectUrl = location.pathname;
            const oldAttribute = removeEmpty({
              page: '1',
              attributes: convertQueryParam(searchRoutes[searchIndex].queryParam),
              price: { from: '', to: '' },
            });
            if (_.isEqual(oldAttribute, removeEmpty(searchState))) {
              attributes = {};
            }
          }
        }
        const finalRedirectUrl = generateSearchUrl(redirectUrl, attributes);
        const currentURL = `${window.location.pathname}${window.location.search ? window.location.search : ''}`;
        if (currentURL !== finalRedirectUrl) {
          setSkeletonType('products');
          history.push(finalRedirectUrl);
        }
      }
    }
  }, [searchState]);

  return {
    searchState,
  };
};

export default useSearchRedirect;
