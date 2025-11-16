import { useState } from "react";
import { recipeService } from "../../api/request";
import { Ingredient } from "../../types/ingredient";

const CATEGORIES_SUB = {
  Сніданки: ["Солодкі сніданки", "Солоні сніданки"],
  Перекуси: ["Солодкі перекуси", "Солоні перекуси", "Напої"],
  Обіди: ["М'ясо", "Риба", "Фастфуд", "Салати", "Пісні страви", "Супи"],
};

const CATEGORIES = Object.entries(CATEGORIES_SUB);

export const AddRecipe = () => {
  const generateId = () => crypto.randomUUID();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [calories, setCalories] = useState("");
  const [proteins, setProteins] = useState("");
  const [fats, setFats] = useState("");
  const [carbs, setCarbs] = useState("");
  const [steps, setSteps] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      id: generateId(),
      name: "",
      quantity: "",
      alternative: "",
    },
  ]);

  const addIngredient = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    setIngredients((prev) => [
      ...prev,
      {
        id: generateId(),
        name: "",
        quantity: "",
        alternative: "",
      },
    ]);
  };

  const updateIngredients = (
    index: number,
    type: keyof Ingredient,
    value: string
  ) => {
    const newIngredients = [...ingredients];
    newIngredients[index][type] = value;

    setIngredients(newIngredients);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [category, subcategory] = e.target.value.split(', ');

    setCategory(category);
    setSubcategory(subcategory);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newRecipe = {
      id: 0,
      name,
      category,
      subcategory,
      calories,
      proteins,
      fats,
      carbs,
      steps,
      ingredients,
    };

    await recipeService.create(newRecipe);
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <fieldset>
        {ingredients.map((row, i) => (
          <div key={row.id} className="ingredients">
            <input
              type="text"
              value={row.name}
              placeholder="ingredient"
              onChange={(e) => updateIngredients(i, "name", e.target.value)}
            />
            <input
              type="text"
              value={row.quantity}
              placeholder="quantity"
              onChange={(e) => updateIngredients(i, "quantity", e.target.value)}
            />
            <input
              type="text"
              value={row.alternative}
              placeholder="alternative"
              onChange={(e) =>
                updateIngredients(i, "alternative", e.target.value)
              }
            />
            <button type="button" onClick={addIngredient}>
              +
            </button>
          </div>
        ))}
      </fieldset>

      <fieldset>
        <div className="field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />

          <select name="" id="" defaultValue="" onChange={handleSelect}>
            <option value="" disabled>Виберіть категорію</option>
            {CATEGORIES.map(([label, options]) => (
              <optgroup key={label} label={label}>
                {options.map((option) => (
                  <option key={option} value={`${label}, ${option}`}>{option}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="calories">Calories:</label>
          <input
            type="number"
            id="calories"
            onChange={(e) => setCalories(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="proteins">Proteins:</label>
          <input
            type="number"
            id="proteins"
            onChange={(e) => setProteins(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="fats">Fats:</label>
          <input
            type="number"
            id="fats"
            onChange={(e) => setFats(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="carbs">Carbs:</label>
          <input
            type="number"
            id="carbs"
            onChange={(e) => setCarbs(e.target.value)}
          />
        </div>
      </fieldset>

      <fieldset>
        <label htmlFor="steps">Steps: </label>
        <textarea
          name=""
          id="steps"
          onChange={(e) => setSteps(e.target.value)}
        ></textarea>
      </fieldset>

      <button>Create</button>
      <button>Cancel</button>
    </form>
  );
};
