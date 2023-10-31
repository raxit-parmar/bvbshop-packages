import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { saveProductReview } from '../../Redux/Product';
import { deepClone, formatName } from '../../Utils';

const usePostReviewModalContainer = (props: {
  productId?: string;
  onSaveReview?: (d?: any) => void;
  initialize?: (d?: any) => void;
}) => {
  const { productId, onSaveReview, initialize } = props;
  const { loginUserData, isLogin }: { loginUserData: any; isLogin: boolean } = useSelector((state: any) => ({
    loginUserData: state.loginUser.data,
    isLogin: state.loginUser.isLogin,
  }));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviewScore, setReviewScore] = useState(5);

  const saveReview = async (payload) => {
    try {
      const tempPayload = deepClone({
        ...payload,
        reviewScore,
      });
      setIsLoading(true);
      const res = await saveProductReview({ productId, payload: tempPayload }).catch((e) => console.log(e));
      setIsLoading(false);
      onSaveReview(res);
    } catch (e) {
      setIsLoading(false);
      if (e && e.message) {
        setError(e.message);
      }
    }
  };

  useEffect(() => {
    if (isLogin) {
      initialize({
        reviewAuthor: formatName(loginUserData.user),
        reviewAuthorEmail: loginUserData.user.email,
        anonymous: false,
      });
    }
    return () => {};
  }, []);

  return {
    saveReview,
    reviewScore,
    setReviewScore,
    isLoading,
    setIsLoading,
    error,
  };
};

export default usePostReviewModalContainer;
