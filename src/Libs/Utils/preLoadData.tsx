import { beforeLoadData } from '../../Libs/customClient';
import { updateLayout } from '../../Redux/Layout/action';
import { updateRoute } from '../../Redux/Route/action';

const preLoadData = ({
  params,
  ROUTE_SEO,
  route,
  routeName: overrideRouteName,
  routeData = {} /*, layoutData = {}*/,
  languageKey = 'language',
}: {
  params: any;
  ROUTE_SEO: any;
  route: string;
  routeName?: string;
  routeData?: any; // to extend route Object
  languageKey?: string;
  // layoutData?: any; // to extend layout Object
}) => {
  if (!(params && ROUTE_SEO && route && ROUTE_SEO[route])) {
    return null;
  }
  
  const parsedParam = beforeLoadData(params);
  const { match, cookies, updateSeo, queryParam, store } = parsedParam;
  const { layout, routeName, ...rest } = ROUTE_SEO[route]({
    language: cookies.get(languageKey),
    routeName: overrideRouteName || route,
  });
  
  let SEOObj = {};
  if (process.env.ENDPOINT && match && match.isExact) {
    SEOObj = {
      url: `${process.env.ENDPOINT}${match.url}`,
    };
  }
  updateSeo({
    ...rest,
    ...SEOObj,
  });

  if (layout && typeof layout === 'object') {
    store.dispatch(updateLayout(layout));
  }

  if (routeName) {
    store.dispatch(
      updateRoute({
        queryParam,
        ...match,
        name: routeName,
        ...routeData,
      }),
    );
  }

  return parsedParam;
};

export default preLoadData;
