import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { deepClone } from '../Utils';

export interface PaymentMethodContainerProps {
  orderDetail: any;
  paymentMethod: any;
  savePaymentInfo: (data: any) => void;
  initialize?: (data?: any) => void;
  change?: (fieldKey?: string, value?: any) => void;
}

const usePaymentMethodModalContainer = (props: PaymentMethodContainerProps) => {
  const { orderDetail, paymentMethod, savePaymentInfo, initialize, change } = props;

  const formValues = useSelector((state: any) => state.form.payOrder && state.form.payOrder.values);

  useEffect(() => {
    const selectedPaymentMethod = paymentMethod || orderDetail.paymentMethods[0];

    if (selectedPaymentMethod && selectedPaymentMethod.banks && selectedPaymentMethod.banks.length > 0) {
      selectedPaymentMethod.banks.forEach((b) => {
        if (b.selected) {
          selectedPaymentMethod.selectedBank = b.id;
        }
      });
    }
    const initSelectedPaymentMethod = deepClone(selectedPaymentMethod);
    if (initSelectedPaymentMethod?.birthDate) {
      initSelectedPaymentMethod.birthDate = DateTime.fromISO(initSelectedPaymentMethod.birthDate)
        .setZone('utc')
        .toJSDate();
    }
    initialize({
      selectedPaymentMethod: initSelectedPaymentMethod,
      selectedPaymentMethodId: selectedPaymentMethod && selectedPaymentMethod.id,
    });
  }, []);

  const onChangePaymentMethod = (e) => {
    if (e.target.value !== formValues.selectedPaymentMethodId) {
      const index = orderDetail.paymentMethods.map((p) => p.id).indexOf(e.target.value);
      const selectedPaymentMethod = orderDetail.paymentMethods[index];
      const updatedSelectedPaymentMethod = deepClone(selectedPaymentMethod);
      if (updatedSelectedPaymentMethod?.birthDate) {
        updatedSelectedPaymentMethod.birthDate = DateTime.fromISO(updatedSelectedPaymentMethod?.birthDate)
          .setZone('utc')
          .toJSDate();
      }
      change('selectedPaymentMethod', updatedSelectedPaymentMethod);
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

  const onSubmit = (values) => savePaymentInfo(values);

  return {
    formValues,
    onChangePaymentMethod,
    onSubmit,
  };
};

export default usePaymentMethodModalContainer;
