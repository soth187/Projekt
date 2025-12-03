import React, { useRef, useState, useEffect } from "react";
import "./ReadyRecipes.css";
import "../../App.css";
import RecipePopup from "./ReadyRecipesPopup";
import recipesData from "./recipesData.json";

const ReadyRecipes = () => {
  const scrollRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // aktywny przepis z JSON
  const [activeRecipe, setActiveRecipe] = useState(null);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < maxScroll);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateArrows();
    el.addEventListener("scroll", updateArrows);

    return () => el.removeEventListener("scroll", updateArrows);
  }, []);

  const scrollLeft = () => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;

    el.scrollTo({
      left: maxScroll,
      behavior: "smooth",
    });
  };

  // otwarcie popupu (ustawienie aktywnego przepisu)
  const openPopup = (recipeId) => {
    const recipe = recipesData.find((r) => r.id === recipeId);
    setActiveRecipe(recipe || null);
  };

  // zamknięcie popupu
  const closePopup = () => {
    setActiveRecipe(null);
  };

  return (
    <div className="ready-recipes">
      <h1 className="recipes-title">Gotowe Przepisy</h1>

      <button
        className={`go-left ${canScrollLeft ? "visible" : "hidden-arrow"}`}
        onClick={scrollLeft}
      ></button>

      <button
        className={`go-right ${canScrollRight ? "visible" : "hidden-arrow"}`}
        onClick={scrollRight}
      ></button>

      <section className="ready-recipes-content" ref={scrollRef}>
        {/* Każdy element generowany z JSON */}
        {recipesData.map((recipe) => (
          <div
            key={recipe.id}
            className="recipe"
            onClick={() => openPopup(recipe.id)}
          >
            <h3 className="recipe-title">{recipe.title}</h3>
            <div className={`meal-image ${recipe.imageClass}`}></div>
          </div>
        ))}
      </section>

      {/* Popup zawsze w DOM, dane z aktywnego przepisu */}
      <RecipePopup
        isVisible={!!activeRecipe}
        onClose={closePopup}
        recipe={activeRecipe}
      />
    </div>
  );
};

export default ReadyRecipes;
