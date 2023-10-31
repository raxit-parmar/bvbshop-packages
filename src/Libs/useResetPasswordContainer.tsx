import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doResetPassword, resetPasswordReset } from '../Redux/Auth/actions';

const useResetPasswordContainer = ({ params }) => {
  const {
    resetPasswordState,
  }: {
    resetPasswordState: {
      data: any;
      isLoading: boolean;
      error: string;
    };
  } = useSelector((state: any) => ({
    resetPasswordState: state.resetPassword,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetPasswordReset());
    };
  }, []);

  const onSubmit = (values: { password: string; cPassword: string }) => {
    dispatch(
      doResetPassword({
        ...values,
        ...params,
      }),
    );
  };

  return {
    onSubmit,
    resetPasswordState,
  };
};

export default useResetPasswordContainer;
