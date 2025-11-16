import { Link, Route, Routes } from 'react-router-dom';
import { AddRecipe } from './components/AddRecipe/AddRecipe';
import { BreakfastPage } from './pages/BreakfastPage/BreakfastPage';
import { Header } from './components/Header/Header';
import { BreakfastSweetPage } from './pages/BreakfastSweetPage/BreakfastSweetPage';
import { BreakfastSavoryPage } from './pages/BreakfastSavoryPage/BreakfastSavoryPage';
import { RecipePage } from './pages/RecipePage/RecipePage';
import "./App.scss";

export const App = () => {
  /* <Link to="/form">To form</Link>
  <Link to="/recipes">To recipes</Link> */
  return (
    <div className="App">
      <Header />

      

      <Routes>
        <Route path='/breakfasts' element={<BreakfastPage />} />
        <Route path='/breakfasts/sweet' element={<BreakfastSweetPage />} />
        <Route path='/breakfasts/savory' element={<BreakfastSavoryPage />} />

        <Route path='/:category/:subcategory/:recipeId' element={<RecipePage />} />


        <Route path='/form' element={<AddRecipe />} />
      </Routes>
    </div>
  );
};
