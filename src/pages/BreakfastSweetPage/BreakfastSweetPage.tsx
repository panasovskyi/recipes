import { useContext } from 'react'
import { RecipeContext } from '../../store/RecipeContext'
import { RecipeList } from '../../components/RecipeList/RecipeList';

export const BreakfastSweetPage = () => {
  const { recipes } = useContext(RecipeContext);
  const sweetBreakfasts = recipes.filter(recipe => recipe.subcategory === 'Солодкі сніданки');

  return (
    <div className='breakfastSweetPage'>
      <div className="container">
        <h2>Солодкі сніданки</h2>
        <RecipeList recipes={sweetBreakfasts} endpoint="/breakfasts/sweet" />
      </div>
    </div>
  )
}