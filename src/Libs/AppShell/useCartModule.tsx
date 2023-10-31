import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart, updateCart } from '../../Redux/Cart';
import { removeEmpty } from '../../Utils';

export interface CartModuleProps {
  cart?: any;
  post_item?: (data: any) => any;
}

const useCartModule = (props: CartModuleProps) => {
  const { cart, post_item } = props;

  const [isOpenAddToCartModal, setIsOpenAddToCartModal] = useState(false);
  const [addToCartModalData, setAddToCartModalData] = useState(null);
  const [isOpenProductNotificationModal, setIsOpenProductNotificationModal] = useState(false);

  const dispatch = useDispatch();

  const addToCart = (product) => {
    if (!!product.inStock) {
      const payload: any = {
        cartId: cart.id || 0,
        payload: removeEmpty({
          itemId: product.cartItemId || product.id,
          qty: product.qty || 1,
          subItemId: product.subItemId || null,
          categoryId: product.categoryId || null,
          customData: product.customData || {},
          attributes: product.productAttributes || {},
          bundleProducts:
            product.bundleProducts && product.bundleProducts.length > 0
              ? product.bundleProducts.map((p) => ({ itemId: p.id }))
              : null,
        }),
      };

      if (typeof post_item === 'function') {
        payload.post_item = post_item;
        payload.addedProduct = product;
      }

      if (cart.id && product.cartItemId) {
        // Update item to cart
        dispatch(updateCart(payload));
      } else {
        // Add item to cart
        dispatch(addItemToCart(payload));
      }
    }
  };

  const openAddToCartModal = (product) => {
    if (!!product.inStock) {
      addToCart(product);
      setIsOpenAddToCartModal(true);
      setAddToCartModalData({ product });
    } else {
      // Open Product Notification Modal
      setIsOpenProductNotificationModal(true);
      setAddToCartModalData({ product });
    }
  };

  const closeAddToCartModal = () => {
    setIsOpenAddToCartModal(false);
    setAddToCartModalData({});
  };

  const closeProductNotificationModal = () => {
    setIsOpenProductNotificationModal(false);
    closeAddToCartModal();
  };

  return {
    isOpenAddToCartModal,
    setIsOpenAddToCartModal,
    addToCartModalData,
    setAddToCartModalData,
    isOpenProductNotificationModal,
    setIsOpenProductNotificationModal,
    addToCart,
    openAddToCartModal,
    closeAddToCartModal,
    closeProductNotificationModal,
  };
};

export default useCartModule;
