import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { deepClone } from '../Utils';

export interface ShippingMethodContainerProps {
  orderDetail: any;
  shippingMethod: any;
  saveShippingInfo: (data: any) => void;

  initialize?: (data?: any) => void;
  change?: (fieldKey?: string, value?: any) => void;
}

const useShippingMethodModalContainer = (props: ShippingMethodContainerProps) => {
  const { orderDetail, shippingMethod, saveShippingInfo, initialize, change } = props;

  const formValues = useSelector((state: any) => state.form.payOrder && state.form.payOrder.values);
  const [selectedDeliveryDate, setSelectedDeliveryDate]: [any, (d: any) => void] = useState(null);
  const [selectedDeliveryLocation, setSelectedDeliveryLocation]: [any, (d: any) => void] = useState(null);
  const [isOpenDeliveryModal, setIsOpenDeliveryModal] = useState(false);

  useEffect(() => {
    const selectedShippingMethod = shippingMethod || orderDetail.shippingMethods[0];

    if (orderDetail.otherDetail.selectedDeliveryDate) {
      setSelectedDeliveryDate({ dateTime: orderDetail.otherDetail.selectedDeliveryDate });
    }
    if (orderDetail.otherDetail.selectedDeliveryLocation && orderDetail.otherDetail.selectedDeliveryLocation.city) {
      setSelectedDeliveryLocation({
        name: orderDetail.otherDetail.selectedDeliveryLocation.place,
        address: orderDetail.otherDetail.selectedDeliveryLocation,
      });
    }
    initialize({
      selectedShippingMethod,
      selectedShippingMethodId: selectedShippingMethod && selectedShippingMethod.id,
    });
  }, []);

  const onChangeShippingMethod = (e) => {
    if (e.target.value !== formValues.selectedShippingMethodId) {
      const index = orderDetail.shippingMethods.map((p) => p.id).indexOf(e.target.value);
      const selectedShippingMethod = orderDetail.shippingMethods[index];
      change('selectedShippingMethod', selectedShippingMethod);
    }
  };

  const onClickDeliveryButton = async () => {
    setIsOpenDeliveryModal(true);
  };

  const onCloseDeliveryModal = (data = null) => {
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

  const onSubmit = (values) => {
    const shippingDetails = deepClone(values);
    if (shippingDetails.selectedShippingMethod.deliveryDateButton) {
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
        shippingDetails.selectedShippingMethod.selectedDeliveryLocation = {
          place: selectedDeliveryLocation.name,
          phone: selectedDeliveryLocation.phone,
          streetName: selectedDeliveryLocation.address.streetName,
          houseNumber: selectedDeliveryLocation.address.houseNumber,
          houseExt: selectedDeliveryLocation.address.HouseNrExt,
          zipCode: selectedDeliveryLocation.address.zipCode,
          city: selectedDeliveryLocation.address.city,
        };
        // AS PER API END
      }

      if (selectedDeliveryDate && selectedDeliveryDate.dateTime) {
        shippingDetails.selectedShippingMethod.selectedDeliveryDate = selectedDeliveryDate.dateTime;
      }
    } else {
      // delete checkoutPayload.personalInfo;
    }
    saveShippingInfo(shippingDetails);
  };
  return {
    formValues,
    selectedDeliveryDate,
    setSelectedDeliveryDate,
    selectedDeliveryLocation,
    setSelectedDeliveryLocation,
    isOpenDeliveryModal,
    setIsOpenDeliveryModal,
    onChangeShippingMethod,
    onClickDeliveryButton,
    onCloseDeliveryModal,
    onSubmit,
  };
};

export default useShippingMethodModalContainer;
