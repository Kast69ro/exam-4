import { Link, Outlet } from "react-router";
import './App.css'

export default function Layout() {
  return (
    <div className="layout">
      <Link to="category">
        <button>CAT Categoty</button>
      </Link>
      <Link to="todo-category">
        <button>todo-category-slice</button>
      </Link>
      <Link to="classic-category">
        <button>classic-category-slice</button>
      </Link>
      <Link to="classic-todo-category">
        <button>classic-todo-category-slice</button>
      </Link>
      <Link to="rktq-todo">
        <button>rktq-todo</button>
      </Link>
      <Link to="rktq-todo-category">
        <button>rktq-todo-category</button>
      </Link>
      <Outlet />
    </div>
  );
}
