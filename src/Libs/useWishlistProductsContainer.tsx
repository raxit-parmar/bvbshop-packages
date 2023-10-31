import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlistProducts, removeWishlistProductAPI } from '../Redux/Product';

const useWishlistProductsContainer = ({ defaultLimit = 10 } = {}) => {
  const { wishlistProducts } = useSelector((state: any) => ({
    wishlistProducts: state.wishlistProducts,
  }));
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const onWishlistClick = async (p) => {
    if (p.wishlist) {
      await removeWishlistProductAPI({ productId: p.id });
      let sendPage = page;
      // If this is the last product from the page to be remove then page = page-1 only and only if page > 1
      if (wishlistProducts.data.count === 1 && page > 1) {
        sendPage = page - 1;
        setPage(sendPage);
      }
      dispatch(
        fetchWishlistProducts({
          queryParams: { limit: defaultLimit, page: sendPage },
        }),
      );
    }
  };

  const onPageChange = (p) => {
    setPage(p.selected + 1);
    // Default settings override with pagination
    // if (config.PAGINATION_TYPE === 'pagination') {
    dispatch(
      fetchWishlistProducts({
        queryParams: { limit: defaultLimit, page: p.selected + 1 },
      }),
    );
    window.scrollTo(0, 0);
    // } else if (config.PAGINATION_TYPE === 'infiniteScroll') {
    //   // TODO:
    // }
  };

  return {
    wishlistProducts,
    page,
    setPage,
    onWishlistClick,
    onPageChange,
  };
};

export default useWishlistProductsContainer;
