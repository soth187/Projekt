import React, { useState } from "react";

function ProductSearch() {
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

      setProduct(data.product);
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

  return (
    <div className="card">
      <div className="field-row">
        <input
          type="text"
          placeholder="np. 5901234123457"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Szukam..." : "Szukaj"}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {product && (
        <div className="product">
          <div className="product-header">
            {product.image_front_small_url && (
              <img
                src={product.image_front_small_url}
                alt={product.product_name || "Zdjęcie produktu"}
              />
            )}
            <div>
              <h2>{product.product_name || "Brak nazwy produktu"}</h2>
              <p className="muted">
                {product.brands && <>Marka: {product.brands}</>}
                <br />
                Kod: {product.code}
              </p>
            </div>
          </div>

          <ul className="nutri-list">
            <li>
              Kalorie:{" "}
              {energyKcal != null
                ? `${energyKcal} kcal / 100 g`
                : "brak danych"}
            </li>
            <li>
              Białko:{" "}
              {nutriments.proteins_100g != null
                ? `${nutriments.proteins_100g} g / 100 g`
                : "brak danych"}
            </li>
            <li>
              Tłuszcz:{" "}
              {nutriments.fat_100g != null
                ? `${nutriments.fat_100g} g / 100 g`
                : "brak danych"}
            </li>
            <li>
              Węglowodany:{" "}
              {nutriments.carbohydrates_100g != null
                ? `${nutriments.carbohydrates_100g} g / 100 g`
                : "brak danych"}
            </li>
            <li>
              Cukry:{" "}
              {nutriments.sugars_100g != null
                ? `${nutriments.sugars_100g} g / 100 g`
                : "brak danych"}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProductSearch;
