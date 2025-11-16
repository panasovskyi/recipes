import { Ingredient } from "../../../../types/ingredient";
import './IngredientsTable.scss';

type Props = {
  ingredients: Ingredient[];
};

export const IngredientsTable: React.FC<Props> = ({ ingredients }) => {
  return (
    <table className="ingredientsTable">
      <thead className="ingredientsTable__head">
        <tr>
          <th>Інгредієнт</th>
          <th>Кількість</th>
          <th>Альтернатива</th>
        </tr>
      </thead>
      <tbody className="ingredientsTable__body">
        {ingredients.map((ing) => (
          <tr key={ing.id} className="ingredientsTable__row">
            <td className="ingredientsTable__data">{ing.name}</td>
            <td className="ingredientsTable__data">{ing.quantity}</td>
            <td className="ingredientsTable__data">{ing.alternative}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
