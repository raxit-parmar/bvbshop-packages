import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductInStockNotification, fetchProductInStockNotificationReset } from '../../Redux/Product';

export interface ProductNotificationContainerProps {
  productId?: string;
  change?: (f?: any, v?: any) => void;
}

const useProductNotificationContainer = (props: ProductNotificationContainerProps) => {
  const { productId, change } = props;
  const loginUserData: any = useSelector((state: any) => state.loginUser.data);
  const { data, isLoading, error }: any = useSelector((state: any) => state.productInStockNotification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginUserData && loginUserData.user && loginUserData.user.email) {
      change('email', loginUserData.user.email);
    }
    return () => {
      dispatch(fetchProductInStockNotificationReset());
    };
  }, []);

  const onSubmit = ({ email }) => {
    dispatch(fetchProductInStockNotification({ productId, payload: { email } }));
  };

  return {
    onSubmit,
    data,
    isLoading,
    error,
  };
};

export default useProductNotificationContainer;
