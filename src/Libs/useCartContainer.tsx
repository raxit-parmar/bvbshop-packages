import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import {
  applyCouponCode,
  fetchCartRelatedProducts,
  fetchCartRelatedProductsReset,
  removeItemFromCart,
  updateCart,
} from '../Redux/Cart';
import { removeEmpty } from '../Utils';

interface CartContainerHooksProps {
  modules?: {
    relatedProducts?: boolean;
  };
}

const defaultModules = {
  relatedProducts: true,
};

const useCartContainer = (props: CartContainerHooksProps) => {
  const { modules: { relatedProducts = true } = defaultModules } = props;
  const {
    cart,
    cartRelatedProducts,
    error,
  }: {
    cart: any;
    cartRelatedProducts: {
      data: any[];
      isLoading: boolean;
      error: string;
    };
    error: string;
  } = useSelector((state: any) => ({
    cart: state.cart && state.cart.data,
    cartRelatedProducts: state.cartRelatedProducts,
    error: state.cart && state.cart.error,
  }));
  const [{ cartId, checkoutAsGuest }]: any = useCookies(['cartId', 'checkoutAsGuest']);

  const dispatch = useDispatch();
  const [cartItems, setCartItems]: any = useState([]);
  const [couponCode, setCouponCode] = useState((cart && cart.coupon && cart.coupon.code) || '');
  const [showCouponCode, setShowCouponCode] = useState(!!couponCode);
  const [couponCodeError, setCouponCodeError] = useState('');

  useEffect(() => {
    if (relatedProducts) {
      if (cart && cart.cartItems) {
        if (cartItems.length !== cart.cartItems.length) {
          dispatch(fetchCartRelatedProducts({ cartId: cart.id }));
        }
        setCartItems(cart.cartItems);
      } else {
        setCartItems([]);
      }
    }

    return () => {};
  }, [cart.cartItems]);

  useEffect(() => {
    setCouponCodeError(error);
    return () => {};
  }, [error]);

  useEffect(() => {
    return () => {
      if (relatedProducts) {
        dispatch(fetchCartRelatedProductsReset());
      }
    };
  }, []);

  const applyCoupon = () => {
    setCouponCodeError('');
    dispatch(applyCouponCode({ cartId, payload: { couponCode } }));
  };

  const onRemoveItem = (payload) => dispatch(removeItemFromCart(payload));

  const onUpdateItem = ({ itemId, qty, ...rest }) => {
    dispatch(
      updateCart({
        cartId,
        payload: removeEmpty({
          itemId,
          qty: Number(qty) || 1,
          ...rest,
        }),
      }),
    );
  };

  return {
    cart,
    cartId,
    checkoutAsGuest,
    couponCode,
    setCouponCode,
    applyCoupon,
    onRemoveItem,
    onUpdateItem,
    showCouponCode,
    setShowCouponCode,
    couponCodeError,
    setCouponCodeError,
    cartRelatedProducts,
  };
};

export default useCartContainer;
