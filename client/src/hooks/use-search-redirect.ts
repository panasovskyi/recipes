import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSearchRedirect = (paramName: string) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/recipes?${paramName}=${encodeURIComponent(query.trim())}`);
  };

  return { query, handleChange, handleSubmit };
};
