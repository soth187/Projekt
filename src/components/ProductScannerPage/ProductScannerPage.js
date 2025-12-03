import React, { useState } from "react";
import BARCODE from "../BARCODE-scanner/BARCODE-scanner";
import ProductHistory from "../ProductHistory/ProductHistory";

const ProductScannerPage = () => {
  const [historyData, setHistoryData] = useState([]);

  const handleAddToHistory = (item) => {
    setHistoryData((prev) => [item, ...prev]);
  };

  return (
    <div className="scanner-page">
      <BARCODE onAddToHistory={handleAddToHistory} />
      <ProductHistory historyData={historyData} />
    </div>
  );
};

export default ProductScannerPage;
