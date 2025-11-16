import { useContext } from "react";
import { RecipeContext } from "../../store/RecipeContext";
import { useParams } from "react-router-dom";
import { IngredientsTable } from "./components/IngredientsTable/IngredientsTable";
import { HowToCook } from "./components/HowToCook/HowToCook";
import './RecipePage.scss';

export const RecipePage = () => {
  const { recipes } = useContext(RecipeContext);
  const { recipeId } = useParams();
  const id = recipeId ? +recipeId : 0;

  const recipe = recipes.find((r) => r.id === id);
  const steps = recipe?.steps.split(". ");
  console.log(steps)

  return (
    <div className="recipePage">
      <div className="container">
        <button className="recipePage__buttonBack">{"< "}Назад</button>
        {recipe && steps && (
          <>
            <h3 className="recipePage__title">{recipe?.name}</h3>
            <IngredientsTable ingredients={recipe?.ingredients} />
            <h4 className='recipePage__steps'>Як готувати:</h4>
            <HowToCook steps={steps} />
          </>
        )}
      </div>
    </div>
  );
};
