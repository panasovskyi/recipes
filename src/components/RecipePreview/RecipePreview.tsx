import { Link } from "react-router-dom";
import { Recipe } from "../../types/recipe";
import './RecipePreview.scss';

type Props = {
  recipe: Recipe;
  endpoint: string;
};

export const RecipePreview: React.FC<Props> = ({ recipe, endpoint }) => {
  const ingredients = recipe.ingredients.map((ing) => ing.name.toLowerCase());

  return (
    <div className="recipePreview">
      <h3 className="recipePreview__title">{recipe.name}</h3>
      <ul className="recipePreview__list">
        <li className="recipePreview__item">Калорії: {recipe.calories}</li>
        <li className="recipePreview__item">Білки: {recipe.proteins}</li>
        <li className="recipePreview__item">Жири: {recipe.fats}</li>
        <li className="recipePreview__item">Вуглеводи: {recipe.carbs}</li>
      </ul>
      <p className="recipePreview__text">
        Основні інгредієнти: {ingredients.join(", ")}
      </p>
      <Link to={`${endpoint}/${recipe.id}`} className="recipePreview__link">
        Відкрити рецепт
      </Link>
    </div>
  );
};
