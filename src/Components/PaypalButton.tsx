/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState } from 'react';
import Script from 'react-load-script';

// Ref Doc
// https://developer.paypal.com/docs/checkout/reference/customize-sdk/

declare const paypal;

export interface PaypalButtonProps {
  value: string | number;
  style?: {
    layout?: 'vertical' | 'horizontal';
    color?: 'blue' | 'gold' | 'silver' | 'white' | 'black';
    shape?: 'rect' | 'pill';
    label?: 'paypal' | 'checkout' | 'buynow' | 'pay' | 'installment';
    tagline?: boolean;
    height?: number;
  };
  fundingSource?: string;
  onSuccess?: (payment: any) => void;
  onApprove?: (data: any, actions) => void;
  onShippingChange?: (data: any, actions) => void;
  onError?: (err: any) => void;
  onCancel?: (data: any) => void;
  locale?: string;
  clientId?: string;
  intent?: string;
  currency?: string;
  disableFunding?: string;
  id?: string;
}

export const defaultPaypalStyle: any = {
  layout: 'horizontal',
  color: 'gold',
  shape: 'rect',
  label: 'checkout',
  tagline: true,
};

const PaypalButton = (props: PaypalButtonProps) => {
  // SET DEFAULT CURRENCY
  const {
    value,
    clientId,
    currency,
    locale = 'nl_NL',
    fundingSource = typeof paypal !== 'undefined' && paypal.FUNDING.PAYPAL,
    disableFunding = 'credit,card',
    intent = 'capture',
    style = defaultPaypalStyle,
    onSuccess = (payment) => {
      console.log('The payment was succeeded!', payment);
    },
    onApprove = (data, actions) => {
      console.log('The payment was approved!', data, actions);
    },
    onShippingChange = (data, actions) => {
      console.log('onShippingChange', data, actions);
    },
    onError = (err) => {
      console.log('Error loading Paypal script!', err);
    },
    onCancel = (data) => {
      console.log('The payment was cancelled!', data);
    },
    id = 'paypal-button-container',
  } = props;

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (isScriptLoaded) {
      paypal
        .Buttons({
          onCancel,
          onError,
          style,
          // fundingSource,
          onShippingChange,
          currency_code: currency,
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: parseFloat(value.toString()).toFixed(2),
                  },
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            onApprove(data, actions);
            return actions.order.capture().then((details) => {
              onSuccess(details);
            });
            // // Authorize the transaction
            // actions.order.authorize().then((authorization) => {
            //   console.log(authorization);
            //   // Get the authorization id
            //   var authorizationID = authorization.purchase_units[0].payments.authorizations[0].id;
            //   // Call your server to validate and capture the transaction
            //   // return fetch('/paypal-transaction-complete', {
            //   //   method: 'post',
            //   //   headers: {
            //   //     'content-type': 'application/json',
            //   //   },
            //   //   body: JSON.stringify({
            //   //     orderID: data.orderID,
            //   //     authorizationID: authorizationID,
            //   //   }),
            //   // });
            // });
          },
        })
        .render(`#${id}`);
    }
    return () => {};
  }, [isScriptLoaded]);

  return (
    <>
      <Script
        url={`https://www.paypal.com/sdk/js?client-id=${clientId}&intent=${intent}&currency=${currency}&locale=${locale}`}
        onCreate={() => setIsScriptLoaded(false)}
        onError={() => onError('Cannot load Paypal script!')}
        onLoad={() => setIsScriptLoaded(true)}
      />
      <div id={id} />
    </>
  );
};

export default PaypalButton;
