import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsReset, getProducts } from '../../Redux/Products';

const useSearchContainer = (props: {
  config: any;
  location?: any;
  searchChangePage: (d?: any) => void;
  searchChangeSort: (d?: any) => void;
}) => {
  const { config, location, searchChangePage, searchChangeSort } = props;

  const DEFAULT_COOKIE_SECURE = process.env.DEFAULT_COOKIE_SECURE ? JSON.parse(process.env.DEFAULT_COOKIE_SECURE) : false;

  let mounted = true;
  const selector: {
    searchState: any;
    products: any;
    isLogin: boolean;
  } = useSelector((state: any) => ({
    products: state.products,
    searchState: state.search,
    isLogin: state.loginUser.isLogin,
  }));
  const { searchState, isLogin } = selector;
  const dispatch = useDispatch();
  const [{ productView }, setCookie]: any = useCookies(['productView']);
  const [products, setProducts]: [any, (data: any) => void] = useState(selector.products);

  useEffect(() => {
    setProducts(selector.products);
  }, [selector.products]);

  useEffect(() => {
    return () => {
      mounted = false;
      dispatch(fetchProductsReset());
      // Moved to AppShellComponent
      // dispatch(searchReset());
    };
  }, []);

  const onPageChange = async (p) => {
    const page = p.selected + 1;
    if (config.PAGINATION_TYPE === 'pagination') {
      // pagination
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
            search: searchState.q,
            sort: searchState.sort || '',
            limit: config.DEFAULT_PRODUCT_LIMIT,
            slug: location && location.pathname,
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
    searchState,
    products,
    isLogin,
    onPageChange,
    onSortChange,
    onChangeProductView,
  };
};

export default useSearchContainer;
