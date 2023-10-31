/* eslint-disable @typescript-eslint/camelcase*/
import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { DateTime } from 'luxon';
import useForceUpdate from '../Libs/useForceUpdate';
import { cartReset } from '../Redux/Cart';
import { fetchCheckoutReset } from '../Redux/Checkout/actions';
import { processOrderAPI, saveCheckoutDetailAPI, validateAddressAPI } from '../Redux/Checkout/api';
import { deepClone, removeEmpty, UcFirst } from '../Utils';

export let addressDetail, addressInvoiceDetail;
export const personalInfoFields = [
  'personalInfo.zipCode',
  'personalInfo.houseNumber',
  'personalInfo.houseExt',
  'personalInfo.country',
];
export const personalInfoInvoiceFields = [
  'personalInfo.invoice.zipCode',
  'personalInfo.invoice.houseNumber',
  'personalInfo.invoice.houseExt',
  'personalInfo.invoice.country',
];
export const validateProfileAddress = async (formValues, dispatch, props, field) => {
  if (personalInfoFields.indexOf(field) !== -1) {
    if (formValues.personalInfo.country === 'netherlands') {
      const { zipCode, houseNumber, houseExt } = formValues.personalInfo;
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
          if (e.message.indexOf('huisnummer') > -1) {
            throw {
              personalInfo: {
                houseNumber: e.message,
              },
            };
          } else {
            throw {
              personalInfo: {
                zipCode: e.message,
              },
            };
          }
          // if (field === 'zipCode') {
          //   throw {
          //     personalInfo: {
          //       zipCode: e.message,
          //     },
          //   };
          // } else {
          //   throw {
          //     personalInfo: {
          //       houseNumber: e.message,
          //     },
          //   };
          // }
        }
      } else {
        addressDetail = {};
      }
    } else {
      addressDetail = {};
    }
  } else if (personalInfoInvoiceFields.indexOf(field) !== -1) {
    if (formValues.personalInfo.invoice.country === 'netherlands') {
      const { zipCode, houseNumber, houseExt } = formValues.personalInfo.invoice;
      if (
        zipCode &&
        houseNumber &&
        ((addressInvoiceDetail &&
          (zipCode !== addressInvoiceDetail.zipCode ||
            houseNumber !== addressInvoiceDetail.houseNumber ||
            houseExt !== addressInvoiceDetail.houseExt)) ||
          !addressInvoiceDetail)
      ) {
        try {
          const result = await validateAddressAPI(
            removeEmpty({
              zipCode,
              houseNumber,
              houseExt,
            }),
          );
          addressInvoiceDetail = result;
        } catch (e) {
          addressInvoiceDetail = {};
          if (e.message.indexOf('huisnummer') > -1) {
            throw {
              personalInfo: {
                invoice: {
                  houseNumber: e.message,
                },
              },
            };
          } else {
            throw {
              personalInfo: {
                invoice: {
                  zipCode: e.message,
                },
              },
            };
          }
          // if (field === 'invoice.zipCode') {
          //   throw {
          //     personalInfo: {
          //       invoice: {
          //         zipCode: e.message,
          //       },
          //     },
          //   };
          // } else {
          //   throw {
          //     personalInfo: {
          //       invoice: {
          //         houseNumber: e.message,
          //       },
          //     },
          //   };
          // }
        }
      } else {
        addressInvoiceDetail = {};
      }
    } else {
      addressInvoiceDetail = {};
    }
  }
};

export interface MultiStepCheckoutContainerProps {
  loadedData?: {
    step: 'information' | 'payment' | 'shipping' | 'overview' | string;
    allowedSteps: string[];
    completedSteps: string[];
    stepMapping: any;
    revStepMapping: any;
    queryParam?: any;
  };
  initialize: (data?: any) => void;
  change: (fieldKey?: string, value?: any) => void;
  handleSubmit: (data: any) => () => void;
  pristine: boolean;
  submitting: boolean;
  error: string;

  checkoutRoutePrefix?: string;
  orderRoutePrefix?: string;
  isDeliveryAddressOnFirstPosition?: boolean;
  isRefreshAllowedSteps?: boolean;
  baseCountry?: string;
  history?: any;
  translate?: any;
  pre__formatPersonalInfo?: (d?: any) => void;
  post__formatPersonalInfo?: (d?: any) => void;
  pre__paymentMethodSave?: (d?: any) => void;
  post__paymentMethodSave?: (d?: any) => void;
  pre__shippingMethodSave?: (d?: any) => void;
  post__shippingMethodSave?: (d?: any) => void;
}

const useMultiStepCheckoutContainer = (props: MultiStepCheckoutContainerProps) => {
  const {
    loadedData: {
      revStepMapping,
      stepMapping,
      // completedSteps,
      // queryParam,
    },
    loadedData,
    change,
    // error,
    // handleSubmit,
    initialize,
    // pristine,
    // submitting,
    history,
    translate,

    post__formatPersonalInfo = (d) => d,
    pre__formatPersonalInfo = (d) => d,

    pre__paymentMethodSave = (d) => d,
    post__paymentMethodSave = (d) => d,

    pre__shippingMethodSave = (d) => d,
    post__shippingMethodSave = (d) => d,

    checkoutRoutePrefix = 'checkout',
    orderRoutePrefix = 'order',
    isDeliveryAddressOnFirstPosition = false,
    isRefreshAllowedSteps = true,
    baseCountry = 'delivery',
  } = props;

  const DEFAULT_COOKIE_SECURE = process.env.DEFAULT_COOKIE_SECURE ? JSON.parse(process.env.DEFAULT_COOKIE_SECURE) : false;

  const [step, setStep] = useState(revStepMapping[loadedData.step]);
  const [allowedSteps, setAllowedSteps] = useState(loadedData.allowedSteps);
  // const [directStepRoute, setDirectStepRoute] = useState(null);

  const {
    formValues,
    isLoading /** , error*/,
  }: { formValues: /**Checkout.Object*/ any; isLoading: boolean /**error: string;  */ } = useSelector((state: any) => ({
    formValues: state.form.checkout && state.form.checkout.values,
    isLoading: state.checkout.isLoading,
    /**error: state.checkout.error */
  }));
  const [{ cartId, isCheckOutFromCartProposal }, setCookie, removeCookie]: any = useCookies(['cartId', 'isCheckOutFromCartProposal']);
  const [orderId, setOrderId] = useState(null);
  const cart: /**Cart.Object*/ any = useSelector((state: any) => state.cart && state.cart.data);
  const checkoutData: /**Checkout.Object*/ any = useSelector((state: any) => state.checkout.data);
  const dispatch = useDispatch();
  const fieldToBeUpdate = ['city', 'streetName'];
  const [hideStreetCity, setHideStreetCity]: [boolean, (d: any) => void] = useState(false);
  const [hideInvoiceStreetCity, setHideInvoiceStreetCity]: [boolean, (d: any) => void] = useState(false);
  const [isOpenDeliveryModal, setIsOpenDeliveryModal] = useState(false);
  const [selectedDeliveryDate, setSelectedDeliveryDate]: [
    /**Checkout.DeliveryDate*/ any,
    (d: /**Checkout.DeliveryDate*/ any) => void,
  ] = useState(null);
  const [selectedDeliveryLocation, setSelectedDeliveryLocation]: [
    /**Checkout.DeliveryLocation*/ any,
    (d: /**Checkout.DeliveryLocation*/ any) => void,
  ] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const forceUpdate = useForceUpdate();
  const formRef = useRef(null);

  useEffect(() => {
    // Reset value as it's global
    addressDetail = null;
    addressInvoiceDetail = null;
    return () => {
      dispatch(fetchCheckoutReset());
    };
  }, []);

  useEffect(() => {
    if (orderId) {
      setCookie('orderId', orderId, { path: '/', secure: DEFAULT_COOKIE_SECURE });
      // Below sequence should not change. 1. cart reset 2. remove cookie
      dispatch(cartReset());
      removeCookie('cartId', { path: '/', secure: DEFAULT_COOKIE_SECURE });
      dispatch(fetchCheckoutReset());
      history.replace(`/${orderRoutePrefix}/${orderId}`);
    }
    return () => {};
  }, [orderId]);

  useEffect(() => {
    if (addressDetail && addressDetail.zipCode) {
      setHideStreetCity(true);
      fieldToBeUpdate.forEach((field) => {
        change(`personalInfo.${field}`, addressDetail[field]);
      });
    }
    return () => {};
  }, [addressDetail]);

  useEffect(() => {
    if (addressInvoiceDetail && addressInvoiceDetail.zipCode) {
      setHideInvoiceStreetCity(true);
      fieldToBeUpdate.forEach((field) => {
        change(`personalInfo.invoice.${field}`, addressInvoiceDetail[field]);
      });
    }
    return () => {};
  }, [addressInvoiceDetail]);

  const addStepsToAllowed = (s) => {
    setAllowedSteps((old) => {
      if (old.indexOf(s) === -1) {
        old.push(s);
      }
      return old;
    });
  };

  const refreshAllowedSteps = () => {
    const { personalInfo = {}, paymentMethod = [], shippingMethod = [] } = checkoutData;
    if (!isCheckOutFromCartProposal && personalInfo && personalInfo.zipCode) {
      addStepsToAllowed(stepMapping[1]);
      if (checkoutData[`${stepMapping[1]}Method`].filter((p) => p.selected).length > 0) {
        addStepsToAllowed(stepMapping[2]);
        if (checkoutData[`${stepMapping[2]}Method`].filter((s) => s.selected).length > 0) {
          // addStepsToAllowed('overview');
          addStepsToAllowed(stepMapping[3]);
        }
      }
    }
  };

  useEffect(() => {
    if (isRefreshAllowedSteps) {
      refreshAllowedSteps();
    }
    if (checkoutData && checkoutData.personalInfo) {
      const personalInfo = checkoutData.personalInfo;
      if (typeof personalInfo.isInvoiceSame === 'undefined') {
        personalInfo.isInvoiceSame = true;
      }
      personalInfo.isInvoiceSame = !!Number(personalInfo.isInvoiceSame);
      // personalInfo.businessType = personalInfo.company ? 'b2b' : 'private';
      if (!personalInfo.invoice) {
        personalInfo.invoice = {};
      }
      // personalInfo.invoice.businessType = personalInfo.invoice.company ? 'b2b' : 'private';

      // if (personalInfo.country && personalInfo.country.value) {
      //   personalInfo.country = personalInfo.country.value;
      // }
      // if (personalInfo.invoice && personalInfo.invoice.country && personalInfo.invoice.country.value) {
      //   personalInfo.invoice.country = personalInfo.invoice.country.value;
      // }

      const dynamicMethods = { payment: [], shipping: [] };
      const selectedDynamicMethods = { payment: null, shipping: null };

      const deliveryAddress = personalInfo;

      // Filter payment method based on country
      let basedOnCountry = null;
      if (baseCountry === 'invoice') {
        basedOnCountry = deliveryAddress?.invoice?.country;
      } else if (baseCountry === 'delivery') {
        basedOnCountry = deliveryAddress?.country;
      }
      if (basedOnCountry) {
        dynamicMethods[stepMapping[1]] = checkoutData[`${stepMapping[1]}Method`].filter(
          (m) => m.countries.indexOf(basedOnCountry) !== -1 && m.enable !== false,
        );
      }

      selectedDynamicMethods[stepMapping[1]] =
        dynamicMethods[stepMapping[1]].filter((m) => m.selected)[0] || dynamicMethods[stepMapping[1]][0];

      // Filter shipping method based on country & selected payment method.
      if (
        basedOnCountry &&
        selectedDynamicMethods[stepMapping[1]] &&
        selectedDynamicMethods[stepMapping[1]].id
      ) {
        dynamicMethods[stepMapping[2]] = checkoutData[`${stepMapping[2]}Method`].filter(
          (m) =>
            m.countries.indexOf(basedOnCountry) !== -1 &&
            m.enable !== false &&
            m[`${stepMapping[1]}Methods`] &&
            m[`${stepMapping[1]}Methods`].indexOf(selectedDynamicMethods[stepMapping[1]].id) !== -1,
        );
      }

      selectedDynamicMethods[stepMapping[2]] =
        dynamicMethods[stepMapping[2]].filter((m) => m.selected)[0] || dynamicMethods[stepMapping[2]][0];

      // Set selectedBank
      if (
        selectedDynamicMethods['payment'] &&
        selectedDynamicMethods['payment'].banks &&
        selectedDynamicMethods['payment'].banks.length > 0
      ) {
        selectedDynamicMethods['payment'].banks.forEach((b) => {
          if (b.selected) {
            selectedDynamicMethods['payment'].selectedBank = b.id;
          }
        });
      }

      const defaultBillingCountry = checkoutData.billingCountries.filter((c) => c.selected)[0];
      const defaultDeliveryCountry = checkoutData.deliveryCountries.filter((c) => c.selected)[0];
      const defaultBirthDate = checkoutData?.paymentMethod && checkoutData?.paymentMethod?.length > 0 && checkoutData?.paymentMethod?.filter((e) => e?.birthDate);

      initialize({
        personalInfo,
        paymentMethod: dynamicMethods['payment'],
        shippingMethod: dynamicMethods['shipping'],
        otherDetail: checkoutData.otherDetail,
        selectedPaymentMethodId:
          selectedDynamicMethods['payment'] &&
          selectedDynamicMethods['payment'].id /* || checkoutData.paymentMethod[0].id*/,
        selectedShippingMethodId:
          selectedDynamicMethods['shipping'] &&
          selectedDynamicMethods['shipping'].id /* || checkoutData.shippingMethod[0].id*/,
        selectedPaymentMethod: selectedDynamicMethods['payment'] /* || checkoutData.paymentMethod[0]*/,
        selectedShippingMethod: selectedDynamicMethods['shipping'] /* || checkoutData.shippingMethod[0]*/,
        billingCountries: checkoutData.billingCountries,
        deliveryCountries: checkoutData.deliveryCountries,
      });
      if (checkoutData.otherDetail.selectedDeliveryDate) {
        setSelectedDeliveryDate({ dateTime: checkoutData.otherDetail.selectedDeliveryDate });
      }
      if (checkoutData.otherDetail.selectedDeliveryLocation && checkoutData.otherDetail.selectedDeliveryLocation.city) {
        setSelectedDeliveryLocation({
          name: checkoutData.otherDetail.selectedDeliveryLocation.place,
          address: checkoutData.otherDetail.selectedDeliveryLocation,
        });
      }
      if (!(personalInfo && personalInfo.country)) {
        change('personalInfo.country', defaultBillingCountry && defaultBillingCountry.value);
      }
      if (!(personalInfo && personalInfo.invoice && personalInfo.invoice.country)) {
        change('personalInfo.invoice.country', defaultDeliveryCountry && defaultDeliveryCountry.value);
      }
      // change(
      //   'personalInfo.isInvoiceSame',
      //   personalInfo && personalInfo.isInvoiceSame !== undefined ? Number(personalInfo.isInvoiceSame) : false,
      // );
      if (!personalInfo.gender) {
        change('personalInfo.gender', 'm');
      }
      if (!(personalInfo.invoice && personalInfo.invoice.gender)) {
        change('personalInfo.invoice.gender', 'm');
      }
      if (defaultBirthDate && defaultBirthDate?.length > 0 && defaultBirthDate[0]?.birthDate) {
        change('selectedPaymentMethod.birthDate', DateTime.fromISO(defaultBirthDate[0]?.birthDate).setZone('utc').toJSDate());
      }
      const validateAddress = async () => {
        // Check and trigger blur event if checkout data is available: start
        // if (!!Number(personalInfo.isInvoiceSame) === true) {
        if (!addressDetail && personalInfo.zipCode && personalInfo.houseNumber) {
          try {
            await validateProfileAddress(checkoutData, null, null, 'personalInfo.zipCode');
            forceUpdate();
          } catch (e) {
            console.log(e);
          }
        }
        // } else if (!!Number(personalInfo.isInvoiceSame) === false) {
        if (
          !addressInvoiceDetail &&
          personalInfo.invoice &&
          personalInfo.invoice.zipCode &&
          personalInfo.invoice.houseNumber
        ) {
          try {
            await validateProfileAddress(checkoutData, null, null, 'personalInfo.invoice.zipCode');
            forceUpdate();
          } catch (e) {
            console.log(e);
          }
        }
        // }
        // Check and trigger blur event if checkout data is available: end
      };
      validateAddress();
    }
    return () => {};
  }, [checkoutData]);

  useEffect(() => setStep(revStepMapping[loadedData.step]), [loadedData && loadedData.step]);

  // NOTE: No need to get allowed steps on window navigation.
  // useEffect(() => setAllowedSteps(loadedData.allowedSteps), [loadedData && loadedData.allowedSteps]);

  const onChangePaymentMethod = (e) => {
    if (e.target.value !== formValues.selectedPaymentMethodId) {
      const index = formValues.paymentMethod.map((p) => p.id).indexOf(e.target.value);
      // const selectedPaymentMethod = formValues.paymentMethod[index];
      change('selectedPaymentMethod', formValues.paymentMethod[index]);
      /** Commented By Mayank as after on change when user save and go to next it refresh the whole state.
      // formValues.shippingMethod.forEach((sm) => {
      //   if (
      //     sm.id === formValues.selectedShippingMethodId &&
      //     selectedPaymentMethod.shippingMethods.indexOf(sm.id) === -1
      //   ) {
      //     change('selectedShippingMethodId', selectedPaymentMethod.shippingMethods[0]);
      //     // onChangeShippingMethod code
      //     const index = formValues.shippingMethod.map((p) => p.id).indexOf(selectedPaymentMethod.shippingMethods[0]);
      //     change('selectedShippingMethod', formValues.shippingMethod[index]);
      //   }
      // });
       */
    }
  };

  // const onChangeBank = e => {
  //   if (e.target.value) {
  //     change('selectedPaymentMethod', {
  //       ...formValues.selectedPaymentMethod,
  //       selectedBank: e.target.value,
  //     });
  //   }
  // };

  const onChangeShippingMethod = (e) => {
    if (e.target.value !== formValues.shippingMethodId) {
      const index = formValues.shippingMethod.map((p) => p.id).indexOf(e.target.value);
      change('selectedShippingMethod', formValues.shippingMethod[index]);
    }
  };

  // const resetDeliveryButtonState = () => {
  //   setSelectedDeliveryDate(null);
  //   setSelectedDeliveryLocation(null);
  // };

  const onClickDeliveryButton = async () => {
    setIsOpenDeliveryModal(true);
  };

  const onCloseDeliveryModal = (data) => {
    setIsOpenDeliveryModal(false);
    if (data) {
      setSelectedDeliveryDate(data.deliveryDate);
      /**
       * Pickup will be consider as different object/aspect then delivery address
      // RULE: If select pickup location isDeliveryDifferent will be false;
      if (formValues.personalInfo.isDeliveryDifferent && data.deliveryLocation) {
        change('personalInfo.isDeliveryDifferent', false);
      }
       */
      setSelectedDeliveryLocation(data.deliveryLocation);
    }
  };

  const goToStep = (stepRoute) => {
    if (allowedSteps.indexOf(stepRoute) !== -1) {
      setStep(revStepMapping[stepRoute]);
      history.push(`/${checkoutRoutePrefix}/${stepRoute}`);
    }
    // if (step !== 3) {
    //   if (allowedSteps.indexOf(stepRoute) !== -1) {
    //     // setStep(revStepMapping[stepRoute]);
    //     if (stepRoute !== directStepRoute) {
    //       setDirectStepRoute(stepRoute);
    //     } else {
    //       formRef.current.dispatchEvent(new Event('submit'));
    //     }
    //     // history.push(`/${checkoutRoutePrefix}/${stepRoute}`);
    //   } else {
    //     setDirectStepRoute(null);
    //   }
    // } else {
    //   // Overview step
    //   //  We are not submitting form as if so it redirecting to payment page
    //   setStep(revStepMapping[stepRoute]);
    //   history.push(`/${checkoutRoutePrefix}/${stepRoute}`);
    // }
  };

  /**
  useEffect(() => {
    if (directStepRoute) {
      formRef.current.dispatchEvent(new Event('submit'));
    }
    return () => { };
  }, [directStepRoute]);
 */

  const __copyInvoiceAddress = (source) => {
    const ob = deepClone(source);
    delete ob.invoice;
    delete ob.isInvoiceSame;
    // delete ob.vatId;
    // delete ob.cocId;
    return ob;
  };

  const __copyBillingAddress = (source) => {
    let ob = deepClone(source);
    ob = {
      ...ob,
      ...ob.invoice,
    };
    return ob;
  }

  const __formatPersonalInfo = (d) => {
    let checkoutPayload = d;
    checkoutPayload = pre__formatPersonalInfo(checkoutPayload);
    checkoutPayload.personalInfo.isInvoiceSame = !!Number(checkoutPayload.personalInfo.isInvoiceSame);
    // checkoutPayload.personalInfo.company =
      // checkoutPayload.personalInfo.businessType === 'b2b' ? checkoutPayload.personalInfo.company : '';
    // delete checkoutPayload.personalInfo.businessType;
    if (checkoutPayload.personalInfo.isInvoiceSame) {
      if (isDeliveryAddressOnFirstPosition) {
        checkoutPayload.personalInfo = __copyBillingAddress(checkoutPayload.personalInfo);
      } else {
        checkoutPayload.personalInfo.invoice = __copyInvoiceAddress(checkoutPayload.personalInfo);
      }
    }
    // TODO: Ask widy to remove from Server.
    if (checkoutPayload && checkoutPayload.personalInfo && checkoutPayload.personalInfo.invoice) {
      // checkoutPayload.personalInfo.invoice.company =
      //   checkoutPayload.personalInfo.invoice.businessType === 'b2b' ? checkoutPayload.personalInfo.invoice.company : '';
      // delete checkoutPayload.personalInfo.invoice.tx_multishop_coc_id;
      // delete checkoutPayload.personalInfo.invoice.tx_multishop_vat_id;
      delete checkoutPayload.personalInfo.invoice.is_invoice_same;
      // delete checkoutPayload.personalInfo.invoice.businessType;
    }
    checkoutPayload = post__formatPersonalInfo(checkoutPayload);
    return checkoutPayload;
  };

  const saveInformation = async (values) => {
    setShowLoader(true);
    const checkoutPayload = deepClone(
      __formatPersonalInfo({
        personalInfo: deepClone(values.personalInfo),
      }),
    );

    if (checkoutPayload?.redirectTo) {
      delete checkoutPayload?.redirectTo;
    }

    try {
      await saveCheckoutDetailAPI({
        cartId,
        payload: removeEmpty(checkoutPayload),
      });

      // if (directStepRoute) {
      //   history.push(`/${checkoutRoutePrefix}/${directStepRoute}`);
      // } else {
      // @NOTE: Remove skip feature and enable it by default requested by @Bas & @Bart
      // if (queryParam && queryParam.skip) {
      // check country => payment Method => Shipping Method
      // Step1 : Check payment method is selected? if yes go to 2nd step.
      // Step3 : Check selected payment method is available in selected country? If yes go to 3rd step.
      // Step2 : Check selected shipping method is available in selected country & payment method? if yes then go to last overview

      const personalInfo = values.personalInfo;

      const dynamicMethods = { payment: [], shipping: [] };
      const selectedDynamicMethods = { payment: null, shipping: null };
      const deliveryAddress = personalInfo;
      // Filter payment method based on country
      let basedOnCountry = null;
      if (baseCountry === 'invoice') {
        basedOnCountry = deliveryAddress?.invoice?.country;
      } else if (baseCountry === 'delivery') {
        basedOnCountry = deliveryAddress?.country;
      }
      if (basedOnCountry) {
        dynamicMethods[stepMapping[1]] = checkoutData[`${stepMapping[1]}Method`].filter(
          (m) => m.countries.indexOf(basedOnCountry) !== -1,
        );
      }

      selectedDynamicMethods[stepMapping[1]] = dynamicMethods[stepMapping[1]].filter((m) => m.selected)[0];

      // Filter shipping method based on country & selected payment method.
      if (
        basedOnCountry &&
        selectedDynamicMethods[stepMapping[1]] &&
        selectedDynamicMethods[stepMapping[1]].id
      ) {
        dynamicMethods[stepMapping[2]] = checkoutData[`${stepMapping[2]}Method`].filter(
          (m) =>
            m.countries.indexOf(basedOnCountry) !== -1 &&
            m[`${stepMapping[1]}Methods`] &&
            m[`${stepMapping[1]}Methods`].indexOf(selectedDynamicMethods[stepMapping[1]].id) !== -1,
        );
      }

      selectedDynamicMethods[stepMapping[2]] = dynamicMethods[stepMapping[2]].filter((m) => m.selected)[0];
      if (values?.redirectTo) {
        history.push(values?.redirectTo);
      } else if (selectedDynamicMethods[stepMapping[2]] && selectedDynamicMethods[stepMapping[2]].id) {
        // history.push('/${checkoutRoutePrefix}/overzicht');
        history.push(`/${checkoutRoutePrefix}/${stepMapping[3]}`);
      } else if (selectedDynamicMethods[stepMapping[1]] && selectedDynamicMethods[stepMapping[1]].id) {
        history.push(`/${checkoutRoutePrefix}/${stepMapping[2]}`);
      } else {
        history.push(`/${checkoutRoutePrefix}/${stepMapping[1]}`);
      }
      // } else {
      //   history.push('/${checkoutRoutePrefix}/betaalmethode');
      // }
      // }
      // history.push('/${checkoutRoutePrefix}/betaalmethode');
      // history.push(`/${checkoutRoutePrefix}/${allowedSteps[allowedSteps.length - 1]}`);
    } catch (e) {
      setShowLoader(false);
      throw new SubmissionError({
        _error: e.message,
      });
    }
  };

  const __onPaymentShippingSave = (values) => {
    const personalInfo = values.personalInfo;
    const dynamicMethods = { payment: [], shipping: [] };
    const selectedDynamicMethods = { payment: null, shipping: null };
    const deliveryAddress = personalInfo;

    selectedDynamicMethods[stepMapping[1]] = values[`selected${UcFirst(stepMapping[1])}Method`];

    let basedOnCountry = null;
    if (baseCountry === 'invoice') {
      basedOnCountry = deliveryAddress?.invoice?.country;
    } else if (baseCountry === 'delivery') {
      basedOnCountry = deliveryAddress?.country;
    }

    // Filter second method based on country & selected first method.
    if (
      basedOnCountry &&
      selectedDynamicMethods[stepMapping[1]] &&
      selectedDynamicMethods[stepMapping[1]].id
    ) {
      dynamicMethods[stepMapping[2]] = checkoutData[`${stepMapping[2]}Method`].filter(
        (m) =>
          m.countries.indexOf(basedOnCountry) !== -1 &&
          m[`${stepMapping[1]}Methods`] &&
          m[`${stepMapping[1]}Methods`].indexOf(selectedDynamicMethods[stepMapping[1]].id) !== -1,
      );
    }
    selectedDynamicMethods[stepMapping[2]] = dynamicMethods[stepMapping[2]].filter((m) => m.selected)[0];

    if (values?.redirectTo) {
      history.push(values?.redirectTo);
    } else if (selectedDynamicMethods[stepMapping[2]] && selectedDynamicMethods[stepMapping[2]].id) {
      // history.push('/${checkoutRoutePrefix}/overzicht');
      history.push(`/${checkoutRoutePrefix}/${stepMapping[3]}`);
    } else {
      history.push(`/${checkoutRoutePrefix}/${stepMapping[2]}`);
    }
  };

  const savePaymentInfo = async (values) => {
    if (values && values.selectedPaymentMethod && values.selectedPaymentMethod.id) {
      setShowLoader(true);
      const checkoutPayload = deepClone({
        paymentMethod: {
          ...values.selectedPaymentMethod,
          selected: true,
        },
      });

      if (checkoutPayload?.redirectTo) {
        delete checkoutPayload?.redirectTo;
      }

      try {
        await saveCheckoutDetailAPI({
          cartId,
          payload: removeEmpty(checkoutPayload),
        });
        post__paymentMethodSave(checkoutPayload);
        // if (directStepRoute) {
        //   history.push(`/${checkoutRoutePrefix}/${directStepRoute}`);
        // } else {
        // @NOTE: Remove skip feature and enable it by default requested by @Bas & @Bart
        // if (queryParam && queryParam.skip) {
        if (stepMapping[1] === 'payment') {
          __onPaymentShippingSave(values);
        } else if (values?.redirectTo) {
          history.push(values?.redirectTo);
        } else {
          // history.push('/${checkoutRoutePrefix}/overzicht');
          history.push(`/${checkoutRoutePrefix}/${stepMapping[3]}`);
        }
        // } else {
        //   history.push('/${checkoutRoutePrefix}/bezorgmethode');
        // }
        // }
        // history.push(`/${checkoutRoutePrefix}/${allowedSteps[allowedSteps.length - 1]}`);
      } catch (e) {
        setShowLoader(false);
        throw new SubmissionError({
          _error: e.message,
        });
      }
    } else {
      throw new SubmissionError({
        _error: translate('checkout.paymentMethodError'),
      });
    }
  };

  const saveShippingInfo = async (values) => {
    if (values && values.selectedShippingMethod && values.selectedShippingMethod.id) {
      setShowLoader(true);
      const checkoutPayload = deepClone({
        shippingMethod: {
          ...values.selectedShippingMethod,
          selected: true,
        },
        /**
          personalInfo: values.personalInfo,
           */
      });

      if (checkoutPayload?.redirectTo) {
        delete checkoutPayload?.redirectTo;
      }

      if (checkoutPayload.shippingMethod.deliveryDateButton) {
        // Condition only apply if selected shipping method has this flag
        if (selectedDeliveryLocation && selectedDeliveryLocation.name) {
          /**
          // Widy's suggestion: 1 START
          checkoutPayload.personalInfo.invoice.company = selectedDeliveryLocation.name;
          checkoutPayload.personalInfo.invoice.phone = selectedDeliveryLocation.phone
            ? selectedDeliveryLocation.phone
            : checkoutPayload.personalInfo.invoice.phone;
          Object.keys(checkoutPayload.personalInfo.invoice).forEach(key => {
            if (selectedDeliveryLocation.address[key]) {
              checkoutPayload.personalInfo.invoice[key] = selectedDeliveryLocation.address[key];
            }
          });
          // Widy's suggestion: 1 END
          */

          // AS PER API START
          checkoutPayload.shippingMethod.selectedDeliveryLocation = {
            place: selectedDeliveryLocation.name,
            phone: selectedDeliveryLocation.phone,
            streetName: selectedDeliveryLocation.address.streetName,
            houseExt: selectedDeliveryLocation.address.houseNumber,
            HouseNrExt: selectedDeliveryLocation.address.HouseNrExt,
            zipCode: selectedDeliveryLocation.address.zipCode,
            city: selectedDeliveryLocation.address.city,
          };
          // AS PER API END
        }

        if (selectedDeliveryDate && selectedDeliveryDate.dateTime) {
          checkoutPayload.shippingMethod.selectedDeliveryDate = selectedDeliveryDate.dateTime;
        }
      } else {
        // delete checkoutPayload.personalInfo;
      }

      try {
        await saveCheckoutDetailAPI({
          cartId,
          payload: removeEmpty(checkoutPayload),
        });
        post__shippingMethodSave(checkoutPayload);
        // if (directStepRoute) {
        //   history.push(`/${checkoutRoutePrefix}/${directStepRoute}`);
        // } else {
        if (stepMapping[1] === 'shipping') {
          __onPaymentShippingSave(values);
        } else if (values?.redirectTo) {
          history.push(values?.redirectTo);
          // history.push('/${checkoutRoutePrefix}/overview');
        } else {
          history.push(`/${checkoutRoutePrefix}/${stepMapping[3]}`);
        }
        // }
        // history.push(`/${checkoutRoutePrefix}/${allowedSteps[allowedSteps.length - 1]}`);
      } catch (e) {
        setShowLoader(false);
        throw new SubmissionError({
          _error: e.message,
        });
      }
    } else {
      throw new SubmissionError({
        _error: translate('checkout.shippingMethodError'),
      });
    }
  };

  const placeOrder = async () => {
    try {
      setShowLoader(true);
      const orderRes = await processOrderAPI({
        cartId,
      });
      if (orderRes && orderRes.orderId) {
        setOrderId(orderRes.orderId);
      }
      setShowLoader(false);
    } catch(e) {
      setShowLoader(false);
      throw new SubmissionError({
        _error: e.message,
      });
    }
  };

  return {
    step,
    setStep,
    allowedSteps,
    setAllowedSteps,
    formValues,
    isLoading,
    cartId,
    setCookie,
    removeCookie,
    orderId,
    setOrderId,
    cart,
    checkoutData,
    fieldToBeUpdate,
    hideStreetCity,
    setHideStreetCity,
    hideInvoiceStreetCity,
    setHideInvoiceStreetCity,
    isOpenDeliveryModal,
    setIsOpenDeliveryModal,
    selectedDeliveryDate,
    setSelectedDeliveryDate,
    selectedDeliveryLocation,
    setSelectedDeliveryLocation,
    showLoader,
    setShowLoader,
    forceUpdate,
    formRef,
    addStepsToAllowed,
    refreshAllowedSteps,
    onChangePaymentMethod,
    onChangeShippingMethod,
    onClickDeliveryButton,
    onCloseDeliveryModal,
    goToStep,
    __copyInvoiceAddress,
    saveInformation,
    savePaymentInfo,
    saveShippingInfo,
    placeOrder,
  };
};

export default useMultiStepCheckoutContainer;
