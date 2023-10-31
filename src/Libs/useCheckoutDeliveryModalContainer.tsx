import { useEffect, useState } from 'react';
import { getDeliveryLocationsAPI, getDeliveryTimeAPI } from '../Redux/Checkout/api';
import { deepClone, removeEmpty } from '../Utils';

export interface CheckoutDeliveryModalContainerProps {
  selectedDeliveryDate?: any;
  selectedDeliveryLocation?: any;
  addressDetail?: any;
  // deliveryAddress?: Checkout.PersonalInfo;
  selectedShippingMethod?: any;
  shippingIdForDeliveryTime?: string;
  shippingIdForDeliveryLocation?: string;
  cartId?: any;
}

const useCheckoutDeliveryModalContainer = (props: CheckoutDeliveryModalContainerProps) => {
  const { addressDetail, shippingIdForDeliveryTime = null, shippingIdForDeliveryLocation = null, selectedShippingMethod, cartId, selectedDeliveryDate, selectedDeliveryLocation } = props;

  const [deliveryDates, setDeliveryDates]: [any[], (d: any[]) => void] = useState([]);
  const [deliveryLocations, setDeliveryLocations]: [any[], (d: any[]) => void] = useState([]);
  const [deliveryDate, setDeliveryDate]: [any, (d: any) => void] = useState(selectedDeliveryDate);
  const [deliveryLocation, setDeliveryLocation]: [any, (d: any) => void] = useState(selectedDeliveryLocation);

  useEffect(() => {
    const initModal = async () => {
      const response = await getDeliveryTimeAPI(removeEmpty({
        cartId,
        zipCode: addressDetail.zipCode,
        houseNumber: addressDetail?.houseNumber ? addressDetail?.houseNumber.toString() : null,
        city: addressDetail.city,
        country: 'netherlands',
        shippingId: shippingIdForDeliveryTime || selectedShippingMethod && selectedShippingMethod.code && selectedShippingMethod.code.toLowerCase(),
      }));
      setDeliveryDates(response);
    };
    initModal();
    return () => {};
  }, []);

  useEffect(() => {
    const fn = () => {
      if (selectedDeliveryDate && selectedDeliveryDate.dateTime) {
        onChangeDeliveryDate({ target: { value: selectedDeliveryDate.dateTime } });
        if (selectedDeliveryLocation && selectedDeliveryLocation.name) {
          onChangeDeliveryLocation({ target: { value: selectedDeliveryLocation.id } });
        }
      }
    };
    if (deliveryDates && deliveryDates.length > 0) {
      fn();
    }
    return () => { };
  }, [deliveryDates]);

  useEffect(() => {
    const fn = () => {
      if (selectedDeliveryLocation && selectedDeliveryLocation.name) {
        onChangeDeliveryLocation({ target: { value: selectedDeliveryLocation.id } });
      }
    };
    if (deliveryLocations && deliveryLocations.length > 0) {
      fn();
    }
    return () => { };
  }, [deliveryLocations]);

  const onChangeDeliveryDate = async (e) => {
    const date = e.target.value;
    setDeliveryLocations([]);
    setDeliveryLocation(null);
    if (date) {
      const deliveryDateObj = deliveryDates.filter((dd) => dd.dateTime === date);
      if (deliveryDateObj.length > 0) {
        setDeliveryDate(deliveryDateObj[0]);
      }
      const response = await getDeliveryLocationsAPI(removeEmpty({
        date,
        zipCode: addressDetail.zipCode,
        houseNumber: addressDetail.houseNumber.toString(),
        city: addressDetail.city,
        country: 'netherlands',
        shippingId: shippingIdForDeliveryLocation || selectedShippingMethod && selectedShippingMethod.code && selectedShippingMethod.code.toLowerCase(),
      }));
      setDeliveryLocations(response.map((r, id) => ({ id, ...r })));
    } else {
      setDeliveryDate(null);
    }
  };

  const onChangeDeliveryLocation = async (e) => {
    const location = e.target.value;
    if (location !== undefined) {
      const deliveryLocationObj = deliveryLocations[location];
      setDeliveryLocation(deliveryLocationObj);
    } else {
      setDeliveryLocation(null);
    }
  };

  const toggleOpeningHours = (key) => {
    const dls = deepClone(deliveryLocations);
    dls[key].expand = !dls[key].expand;
    setDeliveryLocations(dls);
  };

  return {
    deliveryDates,
    setDeliveryDates,
    deliveryLocations,
    setDeliveryLocations,
    deliveryDate,
    setDeliveryDate,
    deliveryLocation,
    setDeliveryLocation,
    onChangeDeliveryDate,
    onChangeDeliveryLocation,
    toggleOpeningHours,
  };
};

export default useCheckoutDeliveryModalContainer;
