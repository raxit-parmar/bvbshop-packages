import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset, SubmissionError } from 'redux-form';
import { loginAPI } from '..//Redux/Auth/api';
import { fetchLoginUser, fetchLoginUserSuccess } from '..//Redux/User/actions';
import { updateProfileAPI } from '..//Redux/User/api';

export interface UpdateLoginInformationContainerProps {
  onEmailSuccess?: (d?: any) => void;
  onPasswordSuccess?: (d?: any) => void;
}

const useUpdateLoginInformationContainer = (props: UpdateLoginInformationContainerProps) => {
  const { onEmailSuccess = () => {}, onPasswordSuccess = () => {} } = props;
  const loginUserData: any = useSelector((state: any) => state.loginUser.data);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const dispatch = useDispatch();

  const onEmailSubmit = async (values) => {
    setIsEmailLoading(true);
    if (values.email.toLowerCase() !== loginUserData.user.email.toLowerCase()) {
      try {
        const loginCheck = await loginAPI({
          username: loginUserData.user.username || loginUserData.user.email,
          password: values.password,
        });
        if (loginCheck && loginCheck.accessToken) {
          await updateProfileAPI({
            payload: { email: values.email, username: values.email },
          });
          dispatch(fetchLoginUser({ authorization: loginCheck.accessToken }));
          dispatch(reset('updateEmail'));
          onEmailSuccess();
        }
      } catch (e) {
        setIsEmailLoading(false);
        throw new SubmissionError({
          _error: e.message,
        });
      }
    } else {
      setIsEmailLoading(false);
      throw new SubmissionError({
        email: 'same email',
      });
    }
    setIsEmailLoading(false);
  };

  const onPasswordSubmit = async (values) => {
    setIsPasswordLoading(true);
    try {
      let loginCheck;
      if (loginUserData.user.hasPassword) {
        loginCheck = await loginAPI({
          username: loginUserData.user.username || loginUserData.user.email,
          password: values.currentPassword,
        });
      }
      if ((loginCheck && loginCheck.accessToken) || !loginUserData.user.hasPassword) {
        await updateProfileAPI({
          payload: { password: values.password, cPassword: values.confirmPassword },
        });
        if (!loginUserData.user.hasPassword) {
          dispatch(
            fetchLoginUserSuccess({
              accessToken: loginUserData.accessToken,
              user: {
                ...loginUserData.user,
                hasPassword: true,
              },
            }),
          );
        }
        dispatch(reset('updatePassword'));
        onPasswordSuccess();
      }
    } catch (e) {
      setIsPasswordLoading(false);
      throw new SubmissionError({
        _error: e.message,
      });
    }
    setIsPasswordLoading(false);
  };

  return {
    onPasswordSubmit,
    onEmailSubmit,
    isPasswordLoading,
    isEmailLoading,
    loginUserData,
  };
};

export default useUpdateLoginInformationContainer;
