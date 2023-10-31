import useFirstEffect from '../Libs/useFirstEffect';
import { fetchCheckoutReset } from '../Redux/Checkout/actions';
import { validateAddressAPI } from '../Redux/Checkout/api';
import { doUpdateProfile, fetchLoginUser } from '../Redux/User/actions';
import { deepClone, removeEmpty } from '../Utils';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

let addressDetail, addressDeliveryDetail;
export const personalInfoFields = ['zipCode', 'houseNumber', 'houseExt', 'country'];
export const personalInfoDeliveryFields = [
  'delivery.zipCode',
  'delivery.houseNumber',
  'delivery.houseExt',
  'delivery.country',
];
export const validateProfileAddress = async (formValues, dispatch, props, field) => {
  if (personalInfoFields.indexOf(field) !== -1) {
    if (formValues.country === 'netherlands') {
      const { zipCode, houseNumber, houseExt } = formValues;
      if (
        zipCode &&
        houseNumber &&
        ((addressDetail &&
          (zipCode !== addressDetail.zipCode ||
            houseNumber !== addressDetail.houseNumber ||
            houseExt !== addressDetail.houseExt)) ||
          !addressDetail)
      ) {
        try {
          const result = await validateAddressAPI(
            removeEmpty({
              zipCode,
              houseNumber,
              houseExt,
            }),
          );
          addressDetail = result;
        } catch (e) {
          addressDetail = {};
          if (field === 'zipCode') {
            throw {
              zipCode: e.message,
            };
          } else {
            throw {
              houseNumber: e.message,
            };
          }
        }
      } else {
        addressDetail = {};
      }
    } else {
      addressDetail = {};
    }
  } else if (personalInfoDeliveryFields.indexOf(field) !== -1) {
    if (formValues.delivery.country === 'netherlands') {
      const { zipCode, houseNumber, houseExt } = formValues.delivery;
      if (
        zipCode &&
        houseNumber &&
        ((addressDeliveryDetail &&
          (zipCode !== addressDeliveryDetail.zipCode ||
            houseNumber !== addressDeliveryDetail.houseNumber ||
            houseExt !== addressDeliveryDetail.houseExt)) ||
          !addressDeliveryDetail)
      ) {
        try {
          const result = await validateAddressAPI(
            removeEmpty({
              zipCode,
              houseNumber,
              houseExt,
            }),
          );
          addressDeliveryDetail = result;
        } catch (e) {
          addressDeliveryDetail = {};
          if (field === 'delivery.zipCode') {
            throw {
              delivery: {
                zipCode: e.message,
              },
            };
          } else {
            throw {
              delivery: {
                houseNumber: e.message,
              },
            };
          }
        }
      } else {
        addressDeliveryDetail = {};
      }
    } else {
      addressDeliveryDetail = {};
    }
  }
};

export interface UpdateProfileContainerProps {
  [key: string]: any;
  initialize: (data?: any) => void;
  change: (fieldKey?: string, value?: any) => void;
  history?: any;
  successRedirectUrl?: string;
}

const useUpdateProfileContainer = (props?: UpdateProfileContainerProps) => {
  const { change, initialize, history, successRedirectUrl = '/account/dashboard' } = ({} = props);
  const {
    formValues,
    updateProfile,
  }: {
    formValues: any;
    updateProfile: {
      data: any;
      isLoading: boolean;
      error: string;
    };
  } = useSelector((state: any) => ({
    formValues: state.form.updateProfile && state.form.updateProfile.values,
    updateProfile: state.updateProfile,
  }));
  const fieldToBeUpdate = ['city', 'streetName'];
  const dispatch = useDispatch();

  const loginUserData: any = useSelector((state: any) => state.loginUser.data);

  useEffect(() => {
    if (loginUserData && loginUserData.user && loginUserData.user.delivery) {
      initialize({
        billingCountries: loginUserData.user.billingCountries,
        deliveryCountries: loginUserData.user.deliveryCountries,
        businessType: loginUserData.user.businessType,
        company: loginUserData.user.company,
        vatId: loginUserData.user.vatId,
        cocId: loginUserData.user.cocId,
        gender: loginUserData.user.gender,
        firstName: loginUserData.user.firstName,
        middleName: loginUserData.user.middleName,
        lastName: loginUserData.user.lastName,
        zipCode: loginUserData.user.zipCode,
        houseNumber: loginUserData.user.houseNumber,
        houseExt: loginUserData.user.houseExt,
        streetName: loginUserData.user.streetName,
        city: loginUserData.user.city,
        country: loginUserData.user.country,
        phone: loginUserData.user.phone,
        mobile: loginUserData.user.mobile,
        isDeliverySame: loginUserData.user.isDeliverySame ? 'y' : 'n',
        newsletter: loginUserData.user.tx_multishop_newsletter && loginUserData.user.tx_multishop_newsletter === '1' ? true : false,
        delivery: {
          businessType: loginUserData.user.delivery.businessType,
          company: loginUserData.user.delivery.company,
          gender: loginUserData.user.delivery.gender,
          firstName: loginUserData.user.delivery.firstName,
          middleName: loginUserData.user.delivery.middleName,
          lastName: loginUserData.user.delivery.lastName,
          zipCode: loginUserData.user.delivery.zipCode,
          houseNumber: loginUserData.user.delivery.houseNumber,
          houseExt: loginUserData.user.delivery.houseExt,
          streetName: loginUserData.user.delivery.streetName,
          city: loginUserData.user.delivery.city,
          country: loginUserData.user.delivery.country,
          phone: loginUserData.user.delivery.phone,
          mobile: loginUserData.user.delivery.mobile,
        },
      });
    }
  }, [loginUserData]);

  useEffect(() => {
    if (addressDetail && addressDetail.zipCode) {
      fieldToBeUpdate.forEach((field) => {
        change(field, addressDetail[field]);
      });
    }
    return () => {};
  }, [addressDetail]);

  useEffect(() => {
    if (addressDeliveryDetail && addressDeliveryDetail.zipCode) {
      fieldToBeUpdate.forEach((field) => {
        change(`delivery.${field}`, addressDeliveryDetail[field]);
      });
    }
    return () => {};
  }, [addressDeliveryDetail]);

  useFirstEffect(() => {
    if (updateProfile.isLoading === false) {
      dispatch(fetchLoginUser({ authorization: loginUserData.accessToken }));
      history.push(successRedirectUrl);
    }
    return () => {};
  }, [updateProfile.isLoading]);

  const onSubmit = (values: any) => {
    const payload = deepClone(values);
    payload.isDeliverySame = payload.isDeliverySame === 'y';
    // payload.company = payload.businessType === 'b2b' ? payload.company : '';
    // delete payload.businessType;
    delete payload.billingCountries;
    delete payload.deliveryCountries;
    if (payload.isDeliverySame) {
      Object.keys(payload.delivery).forEach((key) => {
        payload.delivery[key] = payload[key] || payload.delivery[key];
      });
    }
    // payload.delivery.company = payload.delivery.businessType === 'b2b' ? payload.delivery.company : '';
    // delete payload.delivery.businessType;
    dispatch(doUpdateProfile({ payload }));
    dispatch(fetchCheckoutReset());
  };

  return {
    formValues,
    updateProfile,
    fieldToBeUpdate,
    loginUserData,
    onSubmit,
  };
};

export default useUpdateProfileContainer;
