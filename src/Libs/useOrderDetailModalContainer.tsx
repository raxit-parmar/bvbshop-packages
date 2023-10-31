import { useState } from 'react';
import { downloadInvoice } from '../Redux/User/api';
import { downloadBlobToFile } from '../Utils';

export interface OrderDetailModalContainerProps {
  orderDetail: any;
  fileName?: string;
}

const useOrderDetailModalContainer = (props: OrderDetailModalContainerProps) => {
  const { orderDetail } = props;
  const { fileName = `${orderDetail.id}.pdf` } = props;
  const [isDownloading, setIsDownloading] = useState(false);

  const invoiceDownload = async () => {
    if (orderDetail.invoiceHash && !isDownloading) {
      try {
        setIsDownloading(true);
        const blob = await downloadInvoice({
          invoiceHash: orderDetail.invoiceHash,
        });
        setIsDownloading(false);
        downloadBlobToFile(blob, fileName);
      } catch (e) {
        setIsDownloading(false);
        console.log(e);
      }
    }
  };

  return {
    isDownloading,
    setIsDownloading,
    invoiceDownload,
  };
};

export default useOrderDetailModalContainer;
