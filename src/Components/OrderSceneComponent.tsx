import React, { useEffect } from 'react';
import { Redirect } from 'react-router';

export interface OrderSceneComponentProps {
  orderDetail: any;
  orderContentComponent: any;
  onSuccessRedirect?: boolean;
  successRedirectURL?: string;
  pre__paymentMethod_redirect?: () => void;
}

const OrderSceneComponent = (props: OrderSceneComponentProps) => {
  const {
    orderDetail,
    orderContentComponent: OrderContentComponent = () => {},
    onSuccessRedirect = true,
    successRedirectURL = 'we-could-not-do-it-without-you',
    pre__paymentMethod_redirect,
  } = props;

  if (!orderDetail) {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    if (orderDetail.autoRedirect === true) {
      if (typeof pre__paymentMethod_redirect === 'function') {
        pre__paymentMethod_redirect();
      }
      window.location = orderDetail.paymentUrl;
    }
  }, []);

  if (orderDetail.error) {
    return <div>{orderDetail.error}</div>;
  } else if (orderDetail.autoRedirect === false && orderDetail.paymentLink) {
    return <div dangerouslySetInnerHTML={{ __html: orderDetail.paymentLink }} />;
  } else if (orderDetail.rawContent && orderDetail.orderHash && onSuccessRedirect) {
    return <Redirect to={`/${successRedirectURL}?hash=${orderDetail.orderHash}`} />;
  } else if (orderDetail.rawContent && !onSuccessRedirect) {
    return <OrderContentComponent orderData={orderDetail} />;
  } else if (orderDetail.content && typeof orderDetail.content === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: orderDetail.content }} />;
  } else if (orderDetail.autoRedirect === true) {
    return null;
  }
  return <Redirect to="/" />;
};

export default OrderSceneComponent;
