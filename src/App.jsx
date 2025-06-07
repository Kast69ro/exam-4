import { BrowserRouter, Route, Routes } from "react-router";

import Category from "./pages/category";
import Layout from "./layout";
import TodoCategory from "./pages/todo-category";
import ClassicCategories from "./pages/classicCategory";
import ClassicTodo from "./pages/classic-todo";
import TodoListPage from "./pages/rktq-todos";
import CategoryTodo from "./pages/categoty-todo";

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="category" element={<Category />} />
          <Route path="todo-category" element={<TodoCategory />} />
          <Route path="classic-category" element={<ClassicCategories />} />
          <Route path="classic-todo-category" element={<ClassicTodo />} />
          <Route path="rktq-todo" element={<TodoListPage />} />
          <Route path="rktq-todo-category" element={<CategoryTodo />} />
        </Route>
      </Routes>
    </BrowserRouter>

    
    </>
  );
}
