import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrderDetailReset, fetchUserOrders } from '../Redux/User/actions';

const useOrderHistoryContainer = ({ perPage = 10 } = {}) => {
  const {
    data: ordersData,
    isLoading,
  }: {
    data: {
      list: any[];
      count: number;
      total: number;
      currentPage: number;
      totalPage: number;
    };
    isLoading: boolean;
    error: string;
  } = useSelector((state: any) => state.userOrders);
  const dispatch = useDispatch();
  // const [page, setPage] = useState(1);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [orderDetail, setOrderDetail]: [any, (data: any) => void] = useState(null);

  const onPageChange = (p) => {
    // setPage(p.selected + 1);
    // Default settings override with pagination
    // if (config.PAGINATION_TYPE === 'pagination') {
    dispatch(
      fetchUserOrders({
        queryParams: { limit: perPage, page: p.selected + 1 },
      }),
    );
    window.scrollTo(0, 0);
    // } else if (config.PAGINATION_TYPE === 'infiniteScroll') {
    //   // TODO:
    // }
  };

  useEffect(() => {
    return () => {
      dispatch(fetchUserOrderDetailReset());
    };
  }, []);

  return {
    ordersData,
    isLoading,
    isDetailModalOpen,
    setIsDetailModalOpen,
    orderDetail,
    setOrderDetail,
    onPageChange,
  };
};

export default useOrderHistoryContainer;
