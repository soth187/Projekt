// BARCODE.js
import React, { useState } from "react";
import "./BARCODE-scanner.css";
import "../../App.css";

const BARCODE = ({ onAddToHistory }) => {
  const [barcode, setBarcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const trimmed = barcode.trim();

    if (!trimmed) {
      setError("Podaj kod kreskowy (EAN).");
      setProduct(null);
      return;
    }

    setLoading(true);
    setError("");
    setProduct(null);

    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(
          trimmed
        )}`
      );
      const data = await response.json();

      if (!data || data.status !== 1 || !data.product) {
        setError("Nie znaleziono produktu dla podanego kodu.");
        return;
      }

      const fetchedProduct = data.product;

      setProduct(fetchedProduct);

      // Zapis do historii (tylko nazwa, kod, marka – jak w ProductHistory)
      if (typeof onAddToHistory === "function") {
        onAddToHistory({
          name: fetchedProduct.product_name || "Brak nazwy produktu",
          code: fetchedProduct.code,
          brand: fetchedProduct.brands || "brak danych",
        });
      }
    } catch (e) {
      console.error(e);
      setError("Wystąpił błąd podczas pobierania danych.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const nutriments = (product && product.nutriments) || {};

  const energyKcal =
    nutriments["energy-kcal_100g"] ?? nutriments["energy-kcal"] ?? null;

  const fat =
    nutriments.fat_100g != null && !Number.isNaN(nutriments.fat_100g)
      ? nutriments.fat_100g
      : 0;

  const protein =
    nutriments.proteins_100g != null &&
    !Number.isNaN(nutriments.proteins_100g)
      ? nutriments.proteins_100g
      : 0;

  const sugars =
    nutriments.sugars_100g != null && !Number.isNaN(nutriments.sugars_100g)
      ? nutriments.sugars_100g
      : 0;

  const carbs =
    nutriments.carbohydrates_100g != null &&
    !Number.isNaN(nutriments.carbohydrates_100g)
      ? nutriments.carbohydrates_100g
      : 0;

  const kcal =
    energyKcal != null && !Number.isNaN(energyKcal) ? energyKcal : 0;

  const hasProductImage =
    product && typeof product.image_front_small_url === "string";

  const productImgClassName = hasProductImage
    ? "product-img"
    : "product-img product-img-stock";

  const productImgStyle = hasProductImage
    ? {
        backgroundImage: `url(${product.image_front_small_url})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

  return (
    <div className="BARCODE-scanner">
      <h2 className="scanner-title">Skaner BARCODE</h2>

      <div className="scanner-top-row">
        <input
          className="scanner-input"
          placeholder="np. 5901234123457"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="scanner-btn"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Szukam..." : "Oblicz"}
        </button>
      </div>

      {error && <p className="scanner-error">{error}</p>}

      <div className="scanner-bottom">
        <div className="scanner-left">
          <p className="product-name">
            {product
              ? product.product_name || "Brak nazwy produktu"
              : "Nazwa produktu"}
          </p>
          <p>Kod: {product ? product.code : "BARCODE"}</p>
          <p>
            Marka:{" "}
            {product ? product.brands || "brak danych" : "MARKA PRODUKTU"}
          </p>

          <div
            className={productImgClassName}
            style={productImgStyle}
          ></div>
        </div>

        <div className="scanner-right">
          <div className="nutrient">
            <div className="icons fat"></div>
            <p className="nutrient-label">
              Tłuszcz
              <br />
              {fat} g / 100 g
            </p>
          </div>

          <div className="nutrient">
            <div className="icons protein"></div>
            <p className="nutrient-label">
              Białko
              <br />
              {protein} g / 100 g
            </p>
          </div>

          <div className="nutrient">
            <div className="icons sugar"></div>
            <p className="nutrient-label">
              Cukry
              <br />
              {sugars} g / 100 g
            </p>
          </div>

          <div className="nutrient">
            <div className="icons carb"></div>
            <p className="nutrient-label">
              Węglowodany
              <br />
              {carbs} g / 100 g
            </p>
          </div>

          <div className="nutrient">
            <div className="icons kcal"></div>
            <p className="nutrient-label">
              Kalorie
              <br />
              {kcal} kcal / 100 g
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BARCODE;
