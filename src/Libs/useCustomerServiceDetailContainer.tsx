import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFAQDetailReset } from '../Redux/FAQ/actions';

const useCustomerServiceDetailContainer = (props?: any) => {
  const faq: any[] = useSelector((state: any) => state.faq.data);
  const faqDetail: any = useSelector((state: any) => state.faq.detail);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(fetchFAQDetailReset());
    };
  }, []);

  return {
    faq,
    faqDetail,
  };
};

export default useCustomerServiceDetailContainer;
