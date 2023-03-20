import React from "react";
import { Routes, Route } from "react-router-dom";
import { AddCategory } from "./AddCategory";
import { AllCategories } from "./AllCategories";
import { Category } from "./Category";
import { EditCategory } from "./EditCategory";

export const Categories = () => {
  return (
    <Routes>
      <Route path="/" element={<AllCategories />} />
      {/* <Route path="category-:categoryId" element={<Category />} /> */}
      <Route path="category/:categoryId" element={<Category />} />
      <Route path="add-category" element={<AddCategory />} />
      <Route path="edit-category/:categoryId" element={<EditCategory />} />
    </Routes>
  );
};
