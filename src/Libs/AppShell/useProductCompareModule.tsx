import { useLocalStorage } from '../../Libs/localstorageHook';
import { deepClone } from '../../Utils/helper';

const useProductCompareModule = ({
  onSuccess,
  onError,
  maxCompareLimit = 3,
  isMultiLang = false,
}: {
  onSuccess?: (p?: any) => void;
  onError?: (p?: any) => void;
  maxCompareLimit?: number;
  isMultiLang?: boolean;
}) => {
  const [compareProducts, setCompareProducts]: [any[], (d: any[]) => void] = useLocalStorage('productCompare', []);
  const addProductToCompare = (product: any) => {
    if (compareProducts && compareProducts.length < maxCompareLimit) {
      const productCheck = compareProducts.filter((p) => p?.id === product.id);
      if (productCheck.length === 0) {
        const newCompareProducts = deepClone(compareProducts);
        newCompareProducts.push(isMultiLang ? { id: product?.id } : product);
        setCompareProducts(newCompareProducts);

        if (typeof onSuccess === 'function') {
          onSuccess(product);
        }
      }
    } else if (compareProducts && compareProducts.length > maxCompareLimit) {
      if (typeof onError === 'function') {
        onError(product);
      }
    }
  };

  const removeProductFromCompare = (product: any) => {
    setCompareProducts(compareProducts.filter((pc) => pc.id !== product.id));
  };

  return {
    compareProducts,
    setCompareProducts,
    addProductToCompare,
    removeProductFromCompare,
  };
};

export default useProductCompareModule;
