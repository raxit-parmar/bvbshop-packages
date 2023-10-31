import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doForgotPassword, forgotPasswordReset } from '../Redux/Auth/actions';

const useForgotPasswordContainer = () => {
  const {
    forgotPasswordState,
  }: {
    forgotPasswordState: {
      data: any;
      isLoading: boolean;
      error: string;
    };
  } = useSelector((state: any) => ({
    forgotPasswordState: state.forgotPassword,
  }));
  const dispatch = useDispatch();
  const [forgotEmail, setForgotEmail] = useState(null);

  const onSubmit = (values: { email: string }) => {
    setForgotEmail(values.email);
    dispatch(doForgotPassword(values));
  };

  useEffect(() => {
    return () => {
      dispatch(forgotPasswordReset());
    };
  }, []);

  return {
    onSubmit,
    forgotEmail,
    forgotPasswordState,
  };
};

export default useForgotPasswordContainer;
