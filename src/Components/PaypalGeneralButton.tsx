import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { cartReset } from '../Redux/Cart';
import { fetchCheckoutReset } from '../Redux/Checkout/actions';
import { calculateShippingCharges, processOrderAPI, saveCheckoutDetailAPI } from '../Redux/Checkout/api';
import { removeEmpty } from '../Utils';
import PaypalButton, { PaypalButtonProps } from './PaypalButton';

export interface PaypalGeneralButtonProps {
  id?: string;
  config?: PaypalButtonProps;
  history?: any;
  paypalCode?: string;
  cart?: any;
  loaderComponent?: any;
  onOrderPlace?: (orderId?: string) => void;
  shippingCharges?: boolean;
  orderRoutePrefix?: string;
}

const PaypalGeneralButton = (props: PaypalGeneralButtonProps) => {
  const {
    id,
    config,
    history,
    paypalCode,
    cart,
    config: { currency },
    loaderComponent: LoaderComponent = () => {},
    shippingCharges = true,
    orderRoutePrefix = 'order'
  } = props;

  const DEFAULT_COOKIE_SECURE = process.env.DEFAULT_COOKIE_SECURE ? JSON.parse(process.env.DEFAULT_COOKIE_SECURE) : false;

  if (!(cart && cart.id && history && paypalCode)) {
    return null;
  }

  const [isLoading, setIsLoading] = useState(false);

  const checkoutData: any = useSelector((state: any) => state.checkout.data);

  const paypalPaymentMethod =
    checkoutData &&
    checkoutData.paymentMethod &&
    checkoutData.paymentMethod.length > 0 &&
    checkoutData.paymentMethod.filter((p) => p.code === paypalCode)[0];
  const [{ cartId }, setCookie, removeCookie]: any = useCookies(['cartId']);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();

  const {
    onOrderPlace = (oId) => {
      if (oId) {
        setOrderId(oId);
        setCookie('orderId', oId, { path: '/', secure: DEFAULT_COOKIE_SECURE });
        // Below sequence should not change. 1. cart reset 2. remove cookie
        dispatch(cartReset());
        removeCookie('cartId', { path: '/', secure: DEFAULT_COOKIE_SECURE });
        dispatch(fetchCheckoutReset());
        setIsLoading(false);
        history.replace(`/${orderRoutePrefix}/${oId}`);
      }
    },
  } = props;

  const onApprove = () => {
    // Show Loader
    setIsLoading(true);
  };

  const onSuccess = async (data) => {
    if (paypalPaymentMethod && paypalPaymentMethod.id && data && data.id) {
      await saveCheckoutDetailAPI({
        cartId,
        payload: removeEmpty({
          paymentMethod: {
            ...paypalPaymentMethod,
            referenceId: data.id,
            selected: true,
          },
        }),
      });
      const orderRes = await processOrderAPI({
        cartId,
      });
      if (orderRes && orderRes.orderId) {
        onOrderPlace(orderRes.orderId);
      }
      if (orderRes.error) {
        // setError(orderRes.message);
      }
    } else {
      // TODO: Handle error
    }
  };

  const onShippingChange = async (data, actions) => {
    if (shippingCharges) {
      // Not passing referenceID as we don't get here.
      await saveCheckoutDetailAPI({
        cartId,
        payload: removeEmpty({
          paymentMethod: {
            ...paypalPaymentMethod,
            selected: true,
          },
        }),
      });
      const charges: any = await calculateShippingCharges({
        cartId: cart.id,
        payload: {
          zipCode: data.shipping_address.postal_code,
          city: data.shipping_address.city,
          state: data.shipping_address.state,
          countryCode: data.shipping_address.country_code,
        },
      }).catch((e) => {
        console.log(e);
        actions.reject();
      });
      if (charges && charges.total) {
        /* eslint-disable @typescript-eslint/camelcase */
        return actions.order.patch([
          {
            op: 'replace',
            path: "/purchase_units/@reference_id=='default'/amount",
            value: {
              currency_code: currency,
              value: parseFloat(charges.total.toString()).toFixed(2),
              breakdown: {
                item_total: {
                  value: parseFloat(charges.subTotal.toString()).toFixed(2),
                  currency_code: currency,
                },
                shipping: {
                  value: parseFloat((Number(charges.shippingCost) + Number(charges.paymentCost)).toString()).toFixed(2),
                  currency_code: currency,
                },
              },
            },
          },
        ]);
      }
    }
  };

  return (
    <>
      {isLoading && <LoaderComponent />}
      <PaypalButton
        {...{
          ...config,
          id,
          onApprove,
          onSuccess,
          onShippingChange,
        }}
      />
    </>
  );
};

export default PaypalGeneralButton;
