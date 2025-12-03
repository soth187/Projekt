import React from "react";
import "./ProductHistory.css";

const ProductHistory = ({ historyData }) => {
  const hasHistory = historyData && historyData.length > 0;

  return (
    <div className="history-wrapper">
      <h2 className="history-title">Historie Produktów</h2>

      <div className="history-list">
        {hasHistory ? (
          historyData.map((item, index) => (
            <div className="history-item" key={index}>
              <div className="history-text">
                <p className="history-name">{item.name}</p>
                <p>Kod: {item.code}</p>
                <p>Marka: {item.brand}</p>
              </div>
            </div>
          ))
        ) : (
          <h1 className="history-whenclear">
            Brak historii produktów
          </h1>
        )}
      </div>
    </div>
  );
};

export default ProductHistory;
