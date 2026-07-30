import React from "react";
import styles from "./HomePage.module.scss";
import { HomeSearch } from "@/pages/home/components/home-search";
import { Hero } from "@/pages/home/components/hero";
import { FridgeSection } from "@/pages/home/components/fridge-section";
import { RecipesSection } from "@/pages/home/components/recipes-section";

export const HomePage: React.FC = () => {
  return (
    <div className={styles.home}>
      <Hero />
      <HomeSearch />
      <RecipesSection />
      <FridgeSection />
    </div>
  );
};
