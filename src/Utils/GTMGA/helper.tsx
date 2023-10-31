"use strict";
import { getCLS, getFID, getLCP } from 'web-vitals';

declare const window: any;

const sendToGA4 = ({ name, delta, id }) => {
  // Assumes the global `dataLayer` array exists, see:
  // https://developers.google.com/tag-manager/devguide
  trackPushDataLayer({
    event: 'web-vitals',
    event_category: 'Web Vitals',
    event_action: name,
    // Google Analytics metrics must be integers, so the value is rounded.
    // For CLS the value is first multiplied by 1000 for greater precision
    // (note: increase the multiplier for greater precision if needed).
    event_value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    // The `id` value will be unique to the current page load. When sending
    // multiple values from the same page (e.g. for CLS), Google Analytics can
    // compute a total by grouping on this ID (note: requires `eventLabel` to
    // be a dimension in your report).
    event_label: id,
  });
};

const trackLoginUserID = (userId) => {
  if (userId) {
    trackPushDataLayer({ userId });
  }
};

const trackOriginalLocation = () => {
  if (window && window?.document) {
    const datalayer = {
      originalLocation: `${window?.document?.location?.protocol}//${window?.document?.location?.hostname}${window?.document?.location?.pathname}${window?.document?.location?.search}`,
    };
    trackPushDataLayer(datalayer);
  }
};

const trackGA4WebVitals = () => {
  getCLS(sendToGA4);
  getFID(sendToGA4);
  getLCP(sendToGA4);
};

const trackGA4AddToCart = ({ event = 'add_to_cart', product, options = null, tax = 'incl' }) => {
  trackPushDataLayer({ ecommerce: null });
  const items = [];
  if (product && product?.id) {
    items.push({
      // eslint-disable-next-line @typescript-eslint/camelcase
      item_id: product?.id,
      // eslint-disable-next-line @typescript-eslint/camelcase
      item_name: product?.title || product?.name,
      price: tax === 'excl' ? product?.priceExclTax : product?.price,
      // eslint-disable-next-line @typescript-eslint/camelcase
      item_brand: product?.manufacturerName,
      // eslint-disable-next-line @typescript-eslint/camelcase
      item_category: product?.categoryName,
      quantity: product?.qty || 1,
    });
  }
  const datalayer = {
    event,
    ecommerce: {
      items: options || items,
    },
  };
  trackPushDataLayer(datalayer);
};

const trackGAAddToCart = ({ event = 'addToCart', product, currency, options = null, tax = 'incl' }) => {
  trackPushDataLayer({ ecommerce: null });
  const products = [];
  if (product && product?.id) {
    products.push({
      name: product?.title || product?.name,
      id: product?.id,
      price: tax === 'excl' ? product?.priceExclTax : product?.price,
      brand: product?.manufacturerName,
      category: product?.categoryName,
      quantity: product?.qty || 1,
    });
  }
  const datalayer = {
    event,
    ecommerce: {
      currencyCode: currency,
      add: {
        products: options || products,
      },
    },
  };
  trackPushDataLayer(datalayer);
};

const trackGA4RemoveFromCart = ({ event = 'remove_from_cart', item, options = null, tax = 'incl' }) => {
  trackPushDataLayer({ ecommerce: null });
  const items = [];
  if (item && item?.itemId) {
    items.push({
      // eslint-disable-next-line @typescript-eslint/camelcase
      item_id: item?.products_id || item?.itemId,
      // eslint-disable-next-line @typescript-eslint/camelcase
      item_name: item?.itemName,
      price: tax === 'excl' ? item?.priceExclTax : item?.price,
      // eslint-disable-next-line @typescript-eslint/camelcase
      item_brand: item?.manufacturerName,
      // eslint-disable-next-line @typescript-eslint/camelcase
      item_category: item?.categoryName,
      quantity: item?.cartItemQty,
    });
  }
  const datalayer = {
    event,
    ecommerce: {
      items: options || items,
    },
  };
  trackPushDataLayer(datalayer);
};

const trackGARemoveFromCart = ({ event = 'removeFromCart', item, options = null, tax = 'incl' }) => {
  trackPushDataLayer({ ecommerce: null });
  const products = [];
  if (item && item?.itemId) {
    products.push({
      name: item?.itemName,
      id: item?.products_id || item?.itemId,
      price: tax === 'excl' ? item?.priceExclTax : item?.price,
      brand: item?.manufacturerName,
      category: item?.categoryName,
      quantity: item?.cartItemQty,
    });
  }
  const datalayer = {
    event,
    ecommerce: {
      remove: {
        products: options || products,
      },
    },
  };
  trackPushDataLayer(datalayer);
};

const trackGA4ProductClick = ({ event = 'productClick', product, options = null, tax = 'incl' }) => {
  trackPushDataLayer({ ecommerce: null });
  const products = [];
  let actionField: any = { list: '' };

  if (product && product?.id) {
    products.push({
      name: product?.name,
      id: product?.id,
      price: tax === 'excl' ? product?.priceExclTax : product?.price,
      brand: product?.manufacturerName,
      category: product?.categoryName,
    });
    if (product?.GALabel) {
      actionField = { list: product?.GALabel };
    } else if (product?.categoryName) {
      actionField = { list: product?.categoryName };
    }
  }

  const datalayer = {
    event,
    ecommerce: {
      click: {
        actionField, // Optional list property.
        products: options || products,
      },
    },
  };
  trackPushDataLayer(datalayer);
};

const trackGASelectItem = ({ event = 'select_item', product, options = null, tax = 'incl' }) => {
  trackPushDataLayer({ ecommerce: null });
  const products = [];
  if (product && product?.id) {
    products.push({
      // eslint-disable-next-line @typescript-eslint/camelcase
      item_id: product?.id,
      // eslint-disable-next-line @typescript-eslint/camelcase
      item_name: product?.name,
      price: tax === 'excl' ? product?.priceExclTax : product?.price,
      // eslint-disable-next-line @typescript-eslint/camelcase
      item_brand: product?.manufacturerName,
      // eslint-disable-next-line @typescript-eslint/camelcase
      item_category: product?.categoryName,
      quantity: 1,
    });
  }
  const datalayer = {
    event,
    ecommerce: {
      items: options || products,
    },
  };
  trackPushDataLayer(datalayer);
};

const trackGA4BeginCheckout = ({ event = 'begin_checkout', cart, options = null, tax = 'incl' }) => {
  trackPushDataLayer({ ecommerce: null });
  let items = [];
  if (cart && cart?.cartItems && cart?.cartItems.length > 0) {
    items = cart?.cartItems.map((ci, index) => ({
      index,
      // eslint-disable-next-line @typescript-eslint/camelcase
      item_name: ci?.itemName, // Name or ID is required.
      // eslint-disable-next-line @typescript-eslint/camelcase
      item_id: ci?.products_id || ci?.itemId,
      price: tax === 'excl' ? ci?.priceExclTax : ci?.price,
      // eslint-disable-next-line @typescript-eslint/camelcase
      item_category: ci?.categoryName,
      quantity: ci?.cartItemQty,
    }));
  }
  const datalayer = {
    event,
    ecommerce: {
      items: options || items,
    },
  };
  trackPushDataLayer(datalayer);
};

const trackGA4ViewPromotion = ({ event = 'view_promotion', label = null, options = null }) => {
  trackPushDataLayer({ ecommerce: null });
  const items = [];
  if (label) {
    items.push({
      item_name: label, // Name or ID is required.
    });
  }
  const datalayer = {
    event,
    ecommerce: {
      items: options || items,
    },
  };
  trackPushDataLayer(datalayer);
};

const trackGAViewPromotion = ({ event = 'promoView', label = null, options = null }) => {
  trackPushDataLayer({ ecommerce: null });
  const promotions = [];
  if (label) {
    promotions.push({
      id: label, // ID or Name is required.
    });
  }
  const datalayer: any = {
    event,
    ecommerce: {
      promoView: {
        promotions: options || promotions,
      },
    },
  };
  trackPushDataLayer(datalayer);
};

const trackGA4SelectPromotion = ({ event = 'select_promotion', label = null, options = null }) => {
  trackPushDataLayer({ ecommerce: null });
  const items = [];
  if (label) {
    items.push({
      item_name: label, // Name or ID is required.
    });
  }
  const datalayer = {
    event,
    ecommerce: {
      items: options || items,
    },
  };
  trackPushDataLayer(datalayer);
};

const trackGASelectPromotion = ({ event = 'promotionClick', label = null, options = null }) => {
  trackPushDataLayer({ ecommerce: null });
  const promotions = [];
  if (label) {
    promotions.push({
      id: label, // ID or Name is required.
    });
  }
  const datalayer: any = {
    event,
    ecommerce: {
      promoClick: {
        promotions: options || promotions,
      },
    },
  };
  trackPushDataLayer(datalayer);
};

const trackGA4Checkout = ({ event = 'checkout', checkout, options = null }) => {
  trackPushDataLayer({ ecommerce: null });
  const datalayer = {
    event,
    ecommerce: {
      checkout: options || checkout,
    },
  };
  trackPushDataLayer(datalayer);
};

const trackGA4CheckoutOption = ({ event = 'checkoutOption', checkoutOption, options = null }) => {
  trackPushDataLayer({ ecommerce: null });
  const datalayer = {
    event,
    ecommerce: {
      checkout_option: options || checkoutOption,
    },
  };
  trackPushDataLayer(datalayer);
};

const trackGAPageView = ({ event = 'Pageview', pagePath = null, pageTitle = null }) => {
  const datalayer = {
    event,
    pagePath: pagePath || window.location.pathname,
    pageTitle: pageTitle || window.document.title,
  };
  trackPushDataLayer(datalayer);
};

const trackGA4Purchase = ({ event = 'purchase', orderData, options = null, tax = 'incl' }) => {
  trackPushDataLayer({ ecommerce: null });
  const purchase: any = {};
  if (orderData && orderData?.id) {
    purchase.actionField = {
      id: orderData?.id, // Transaction ID. Required for purchases and refunds.
      affiliation: 'Online Store',
      revenue: orderData?.total, // Total transaction value (incl. tax and shipping)
      tax: orderData?.tax,
      shipping: orderData?.shippingCost,
      coupon: orderData?.coupon,
    };
    if (orderData?.orderItems && orderData?.orderItems.length > 0) {
      purchase.products = orderData?.orderItems.map((o) => ({
        name: o?.name,
        id: o?.id,
        price: o?.item_unit_price ? (tax === 'excl' ? o?.item_unit_price_excl_vat : o?.item_unit_price) : o?.price,
        category: o?.categoryName,
        quantity: o?.qty,
      }));
    }
  }
  const datalayer = {
    event,
    ecommerce: {
      purchase: options || purchase,
    },
  };
  trackPushDataLayer(datalayer);
};

const trackGAPurchase = ({ event = 'ga4_purchase', orderData, currency, options = null, tax = 'incl' }) => {
  trackPushDataLayer({ ecommerce: null });
  let purchase: any = {};
  if (orderData && orderData?.id) {
    purchase = {
      currency,
      // eslint-disable-next-line @typescript-eslint/camelcase
      transaction_id: orderData?.id,
      affiliation: 'Online Store',
      value: orderData?.total,
      tax: orderData?.tax,
      shipping: orderData?.shippingCost,
    };
    if (orderData?.orderItems && orderData?.orderItems.length > 0) {
      purchase.items = orderData?.orderItems.map((o) => ({
        // eslint-disable-next-line @typescript-eslint/camelcase
        item_name: o?.name,
        // eslint-disable-next-line @typescript-eslint/camelcase
        item_id: o?.id,
        // eslint-disable-next-line @typescript-eslint/camelcase
        price: o?.item_unit_price ? (tax === 'excl' ? o?.item_unit_price_excl_vat : o?.item_unit_price) : o?.price,
        // eslint-disable-next-line @typescript-eslint/camelcase
        item_category: o?.categoryName,
        quantity: o?.qty,
      }));
    }
  }
  const datalayer = {
    event,
    ecommerce: {
      purchase: options || purchase,
    },
  };
  trackPushDataLayer(datalayer);
};

const trackGA4ViewItem = ({ event = 'view_item', product, options = null, tax = 'incl' }) => {
  trackPushDataLayer({ ecommerce: null });
  const items: any = [];
  if (product && product?.id) {
    items.push({
      // eslint-disable-next-line @typescript-eslint/camelcase
      item_id: product?.id,
      // eslint-disable-next-line @typescript-eslint/camelcase
      item_name: product?.title || product?.name,
      price: tax === 'excl' ? product?.priceExclTax : product?.price,
      // eslint-disable-next-line @typescript-eslint/camelcase
      item_brand: product?.manufacturerName,
      // eslint-disable-next-line @typescript-eslint/camelcase
      item_category: product?.categoryName,
      quantity: 1,
    });
  }
  const datalayer = {
    event,
    ecommerce: {
      items: options || items,
    },
  };
  trackPushDataLayer(datalayer);
};

const trackGAViewItem = ({ event = 'details', product, options = null, tax = 'incl' }) => {
  trackPushDataLayer({ ecommerce: null });
  const detail: any = {
    products: [],
    actionField: {
      list: '',
    },
  };
  if (product && product?.id) {
    detail.products.push({
      name: product?.title || product?.name,
      id: product?.id,
      price: tax === 'excl' ? product?.priceExclTax : product?.price,
      brand: product?.manufacturerName,
      category: product?.categoryName,
    });
  }
  if (product?.GALabel) {
    detail.actionField = {
      list: product?.GALabel,
    };
  } else if (product?.categoryName) {
    detail.actionField = {
      list: product?.categoryName,
    };
  }
  const datalayer: any = {
    event,
    ecommerce: {
      detail: options || detail,
    },
  };
  trackPushDataLayer(datalayer);
};

const trackGA4ViewItemList = ({ event = 'view_item_list', products, options = null, tax = 'incl' }) => {
  trackPushDataLayer({ ecommerce: null });
  let items = [];
  if (products && products?.list && products?.list?.length > 0) {
    items = products.list.map((p, index) => ({
      index,
      // eslint-disable-next-line @typescript-eslint/camelcase
      item_id: p?.id,
      // eslint-disable-next-line @typescript-eslint/camelcase
      item_name: p?.name,
      price: tax === 'excl' ? p?.priceExclTax : p?.price,
      // eslint-disable-next-line @typescript-eslint/camelcase
      item_brand: p?.manufacturerName,
      // eslint-disable-next-line @typescript-eslint/camelcase
      item_category: p?.categoryName,
      quantity: 1,
    }));
  }
  const datalayer = {
    event,
    ecommerce: {
      items: options || items,
    },
  };
  trackPushDataLayer(datalayer);
};

const trackGAViewItemList = ({ event = 'listing', impressions, currency }) => {
  trackPushDataLayer({ ecommerce: null });
  const datalayer: any = {
    event,
    ecommerce: {
      impressions,
      currencyCode: currency,
    },
  };
  trackPushDataLayer(datalayer);
};

const trackPushDataLayer = (datalayer) => {
  if (window && window?.dataLayer) {
    window.dataLayer.push(datalayer);
  }
};

export {
  trackLoginUserID,
  trackOriginalLocation,
  trackGA4WebVitals,
  trackGA4AddToCart,
  trackGAAddToCart,
  trackGA4RemoveFromCart,
  trackGARemoveFromCart,
  trackGA4ProductClick,
  trackGASelectItem,
  trackGA4BeginCheckout,
  trackGA4ViewPromotion,
  trackGAViewPromotion,
  trackGA4SelectPromotion,
  trackGASelectPromotion,
  trackGA4Checkout,
  trackGAPageView,
  trackGA4Purchase,
  trackGAPurchase,
  trackGA4ViewItem,
  trackGAViewItem,
  trackGA4ViewItemList,
  trackGAViewItemList,
  trackGA4CheckoutOption,
  trackPushDataLayer,
};
