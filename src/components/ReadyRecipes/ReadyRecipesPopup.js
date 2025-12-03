import React from "react";
import "./ReadyRecipes.css";
import "../../App.css";

const RecipePopup = ({ isVisible, onClose, recipe }) => {
  return (
    <div className={`ready-recipes-popup ${isVisible ? "" : "hidden"}`}>
      <button
        className="ready-recipes-popup-exit"
        onClick={onClose}
      ></button>

      {/* Tytuł */}
      <h1 className="recipes-popup-title">
        {recipe ? recipe.title : "Ryż z kurczakiem"}
      </h1>

      {/* Obrazek */}
      <div
        className={`recipes-popup-image ${
          recipe ? recipe.imageClass : "rice-chicken"
        }`}
      ></div>

      {/* Krótki opis */}
      <p className="popup-recipe">
        {recipe
          ? recipe.shortDescription
          : "Klasyczny ryż z kurczakiem – szybki, prosty i tak niezawodny, że mógłby być Twoim osobistym asystentem. Tylko, że ten nie pyta o podwyżkę."}
      </p>

      {/* Stały nagłówek */}
      <h3 className="popup-ingredients-title">Składniki:</h3>

      {/* Składniki – z JSON, fallback do wersji statycznej */}
      <ul className="popup-ingredients-list">
        {recipe && Array.isArray(recipe.ingredients) ? (
          recipe.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))
        ) : (
          <>
            <li>
              200 g ryżu (biały, brązowy albo „ten, który akurat znalazłeś w
              szafce”)
            </li>
            <li>250 g piersi z kurczaka</li>
            <li>1 łyżka oliwy</li>
            <li>1 ząbek czosnku (lub dwa, jeśli lubisz odstraszać wampiry)</li>
            <li>Przyprawy: sól, pieprz, papryka słodka, curry</li>
            <li>100 ml śmietanki 30% lub jogurtu naturalnego (wersja fit)</li>
            <li>
              Natka pietruszki (opcjonalnie, dla +10 do prezentacji)
            </li>
          </>
        )}
      </ul>

      {/* Stały nagłówek */}
      <h1 className="recipes-popup-todo">Instrukcja krok po kroku</h1>

      {/* Kroki – z JSON, fallback do wersji statycznej */}
      <ol type="1" className="recipe-popup-steps">
        {recipe && Array.isArray(recipe.steps) ? (
          recipe.steps.map((step, index) => (
            <li key={index}>
              <p className="recipe-popup-step-title">{step.title}</p>
              <p className="recipe-popup-step">{step.text}</p>
            </li>
          ))
        ) : (
          <>
            <li>
              <p className="recipe-popup-step-title">Ugotuj ryż</p>
              <p className="recipe-popup-step">
                Wrzuć ryż do garnka, zalej wodą i gotuj zgodnie z instrukcją.
                Jeśli zacznie kipieć — to jego sposób na wyrażenie emocji.
              </p>
            </li>

            <li>
              <p className="recipe-popup-step-title">Pokrój kurczaka</p>
              <p className="recipe-popup-step">
                Kostka, paski, a może w kształt serca? Byle szybko, bo kurczak
                sam się nie pokroi.
              </p>
            </li>

            <li>
              <p className="recipe-popup-step-title">
                Smażenie, czyli magia kuchni
              </p>
              <p className="recipe-popup-step">
                Rozgrzej oliwę, dodaj kurczaka i smaż, aż będzie złoty. Złoty —
                nie spalony.
              </p>
            </li>

            <li>
              <p className="recipe-popup-step-title">
                Dodaj czosnek i przyprawy
              </p>
              <p className="recipe-popup-step">
                Czosnek + sól + pieprz + papryka + curry = sąsiedzi pukają do
                drzwi.
              </p>
            </li>

            <li>
              <p className="recipe-popup-step-title">
                Dodaj śmietankę / jogurt
              </p>
              <p className="recipe-popup-step">
                Mieszaj aż sos zgęstnieje i oblepi kurczaka jak kołdra zimą.
              </p>
            </li>

            <li>
              <p className="recipe-popup-step-title">Połącz z ryżem</p>
              <p className="recipe-popup-step">
                Ryż na talerz, kurczak na wierzch, pietruszka na klimat —
                gotowe.
              </p>
            </li>
          </>
        )}
      </ol>

      {/* Stały nagłówek */}
      <h1 className="recipes-popup-ready">Gotowe!</h1>

      {/* Tekst na dole */}
      <p>
        {recipe
          ? recipe.bottomText
          : "Proste, sycące danie, które ratuje dzień, gdy lodówka świeci pustkami."}
      </p>
    </div>
  );
};

export default RecipePopup;
