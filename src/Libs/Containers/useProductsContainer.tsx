import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import useFirstEffect from '../../Libs/useFirstEffect';
import { fetchProductsReset, getProducts } from '../../Redux/Products';
import { searchChangePage, searchChangeSort, SearchObject } from '../../Redux/Search';
import { deepClone, generateSearchUrl, removeEmpty } from '../../Utils';

export interface UseProductsContainerProps {
  category: any;
  manufacturer: any;
  config: any;
  setSkeletonType: (d?: any) => void;
  history: any;
  slug?: string;
  platform?: string;
}

const useProductsContainer = (props: UseProductsContainerProps) => {
  const { category, manufacturer, platform, slug, config, history, setSkeletonType } = props;

  const DEFAULT_COOKIE_SECURE = process.env.DEFAULT_COOKIE_SECURE ? JSON.parse(process.env.DEFAULT_COOKIE_SECURE) : false;

  const selector: {
    products: any;
    isLogin: boolean;
    searchState: SearchObject;
  } = useSelector((state: any) => ({
    products: state.products,
    isLogin: state.loginUser.isLogin,
    searchState: state.search,
  }));
  const { isLogin, searchState } = selector;
  const dispatch = useDispatch();
  const [{ productView }, setCookie]: any = useCookies(['productView']);
  const [products, setProducts]: [any, (data: any) => void] = useState(selector.products);

  useEffect(() => {
    setProducts(selector.products);
  }, [selector.products]);

  useFirstEffect(() => {
    // it will only push the url if new is different than existing.
    // if (JSON.stringify(removeEmpty(searchState)) !== JSON.stringify(removeEmpty(redux.search))) {
    setSkeletonType('products');
    const searchObj = deepClone(removeEmpty(searchState));
    delete searchObj.categoryId;
    delete searchObj.manufacturerId;
    delete searchObj.q;
    let redirectURL;
    if (category) {
      redirectURL = generateSearchUrl(`/${category.slug}`, searchObj);
    } else if (manufacturer) {
      redirectURL = generateSearchUrl(`/${manufacturer.slug}`, searchObj);
    }
    const fullPathname = location.href.replace(location.origin, '');
    // Adding this condition so in case if current URL & redirect URL is same then we can avoid unnecessary redirects.
    if (redirectURL && fullPathname !== redirectURL) {
      history.push(redirectURL);
    }
    /*
      * TODO:
      * Below way is optimal way but on back button state is not refreshing.
      window.scrollTo(0, 0);
      window.history.pushState({}, window.document.title, `${window.location.pathname}?page=${page}`);
      dispatch(fetchProducts(payload));
      */
    // }
  }, [searchState]);

  useEffect(() => {
    return () => {
      dispatch(fetchProductsReset());
    };
  }, []);

  const onPageChange = async (p) => {
    const page = p.selected + 1;
    if (config.PAGINATION_TYPE === 'pagination') {
      if (page !== products.data.currentPage) {
        // setSkeletonType('products');
        dispatch(searchChangePage(page));
      }
    } else if (config.PAGINATION_TYPE === 'infiniteScroll') {
      // infiniteScroll
      if (page !== products.data.currentPage && page <= products.data.totalPage) {
        const payload = {
          payload: {
            page,
            categoryId: category && category.id,
            manufacturerId: manufacturer && manufacturer.id,
            sort: searchState.sort || '',
            limit: config.DEFAULT_PRODUCT_LIMIT,
            attributes: searchState.attributes || {},
          },
          cache: !isLogin,
        };
        const productList = await getProducts(payload);
        productList.list = [...products.data.list, ...productList.list];
        productList.count = products.count + productList.count;
        setProducts({
          data: productList,
          isLoading: false,
          error: null,
        });
      }
    }
  };

  const onSortChange = (sort) => {
    // setSkeletonType('products');
    dispatch(searchChangeSort(sort));
  };

  const onChangeProductView = (view) => {
    setCookie('productView', view || 'grid', { path: '/', secure: DEFAULT_COOKIE_SECURE });
  };

  return {
    productView,
    products,
    isLogin,
    searchState,
    setProducts,
    onPageChange,
    onSortChange,
    onChangeProductView,
  };
};

export default useProductsContainer;
