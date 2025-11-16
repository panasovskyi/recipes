import { Recipe } from '../../types/recipe';
import { RecipePreview } from '../RecipePreview/RecipePreview';
import './RecipeList.scss';

type Props = {
  recipes: Recipe[];
  endpoint: string;
} 

export const RecipeList: React.FC<Props> = ({ recipes, endpoint }) => {
  return (
    <section className='recipeList'>
      {recipes.map(r => <RecipePreview key={r.id} recipe={r} endpoint={endpoint} />)}
    </section>
  );
};
