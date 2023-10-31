import { useEffect, useState } from 'react';
import { updateOrder } from '../Redux/User/api';
import { deepClone, removeEmpty } from '../Utils';

export interface PayOrderContainerProps {
  orderDetail?: any;
  history?: any;
  orderRoutePrefix?: string;
  orderRoutePostfix?: string;
}

const usePayOrderContainer = (props: PayOrderContainerProps) => {
  const { orderDetail, history, orderRoutePrefix = 'order', orderRoutePostfix = '' } = props;
  
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [shippingMethod, setShippingMethod] = useState(null);
  const [paymentMethodOpen, setPaymentMethodOpen] = useState(false);
  const [shippingMethodOpen, setShippingMethodOpen] = useState(false);

  useEffect(() => {
    const selectedPaymentMethod =
      orderDetail && orderDetail.paymentMethods && orderDetail.paymentMethods.filter((pm) => pm.selected)[0];
    if (selectedPaymentMethod) {
      setPaymentMethod(selectedPaymentMethod);
    }
    const selectedShippingMethod =
      orderDetail && orderDetail.shippingMethods && orderDetail.shippingMethods.filter((pm) => pm.selected)[0];
    if (selectedShippingMethod) {
      setShippingMethod(selectedShippingMethod);
    }
  }, []);

  const savePaymentInfo = async (values) => {
    setPaymentMethod(values.selectedPaymentMethod);
    setPaymentMethodOpen(false);
    await updateOrder({
      orderId: orderDetail.orderHash,
      payload: removeEmpty({
        paymentMethod: {
          ...values.selectedPaymentMethod,
          selected: true,
        },
      }),
    });
    history.push(`/${orderRoutePrefix}/${orderDetail.orderHash}/pay`);
  };

  const saveShippingInfo = async (values) => {
    setShippingMethod(values.selectedShippingMethod);
    setShippingMethodOpen(false);
    await updateOrder({
      orderId: orderDetail.orderHash,
      payload: removeEmpty({
        shippingMethod: {
          ...values.selectedShippingMethod,
          selected: true,
        },
      }),
    });
    history.push(`/${orderRoutePrefix}/${orderDetail.orderHash}/pay`);
  };

  const onPlaceOrder = async (e) => {
    e.preventDefault();

    if (!(paymentMethod && paymentMethod.code)) {
      setPaymentMethodOpen(true);
    } else if (!(shippingMethod && shippingMethod.code)) {
      setShippingMethodOpen(true);
    } else {
      const checkoutPayload = deepClone({
        shippingMethod: {
          ...shippingMethod,
          selected: true,
        },
        paymentMethod: {
          ...paymentMethod,
          selected: true,
        },
      });
      try {
        const orderRes = await updateOrder({
          orderId: orderDetail.orderHash,
          payload: removeEmpty(checkoutPayload),
        });
        history.push(`/${orderRoutePrefix}/${orderDetail.orderHash}${orderRoutePostfix}`);
        // history.push(
        //   `/${orderRoutePrefix}/${orderDetail.orderHash}?paymentMethod=${paymentMethod.code}${
        //     paymentMethod.selectedBank ? `&selectedBank=${paymentMethod.selectedBank}` : ''
        //   }`,
        // );
      } catch (e) {
        console.log(e);
      }
    }
  };

  return {
    paymentMethod,
    setPaymentMethod,
    shippingMethod,
    setShippingMethod,
    paymentMethodOpen,
    setPaymentMethodOpen,
    shippingMethodOpen,
    setShippingMethodOpen,
    savePaymentInfo,
    saveShippingInfo,
    onPlaceOrder,
  };
};

export default usePayOrderContainer;
