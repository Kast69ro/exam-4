import { useState } from "react";
import {
  useGetTodosQuery,
  useDeleteCategoryMutation,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useGetCategoryByIdQuery,
} from "../api/category-todo";
import './category.css'

export default function CategoryTodo() {
  const [addName, setAddName] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [idx, setIdx] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [infoModal, setInfoModal] = useState(false);

  const { data, isLoading, isError } = useGetTodosQuery();
  const [delUser] = useDeleteCategoryMutation();
  const [addCategory] = useAddCategoryMutation();
  const [editCategory] = useEditCategoryMutation();

  const {
    data: selectedCategoryResponse,
    isLoading: infoLoading,
    isError: infoError,
  } = useGetCategoryByIdQuery(selectedId, {
    skip: selectedId === null,
  });

  const selectedCategory = selectedCategoryResponse?.data || selectedCategoryResponse || null;

  const todos = data?.data || [];

  const handleAdd = () => {
    addCategory({ name: addName });
    setAddName("");
  };

  const handleEdit = (user) => {
    setEditModal(true);
    setEditName(user.name);
    setIdx(user.id);
  };

  const editUser = () => {
    editCategory({ name: editName, id: idx });
    setEditModal(false);
  };

  const handleInfo = (user) => {
    setSelectedId(user.id);
    setInfoModal(true);
  };

  const closeInfoModal = () => {
    setInfoModal(false);
    setSelectedId(null);
  };

  return (
    <div className="category-container">
      <div className="category-controls">
        <input
          type="text"
          className="category-input"
          value={addName}
          onChange={(e) => setAddName(e.target.value)}
          placeholder="add user"
          required
        />
        <button className="btn btn-add" onClick={handleAdd}>
          Add
        </button>
      </div>

      {isLoading && <p className="loading">Загрузка...</p>}
      {isError && <p className="error">Ошибка загрузки данных</p>}

      <table className="category-table">
        <tbody>
          {todos.map((el) => (
            <tr key={el.id}>
              <td>{el.name}</td>
              <td>
                <div className="btn-group">
                  <button className="btn btn-delete" onClick={() => delUser(el.id)}>
                    Delete
                  </button>
                  <button className="btn btn-edit" onClick={() => handleEdit(el)}>
                    Edit
                  </button>
                  <button className="btn-info btn" onClick={() => handleInfo(el)}>Info</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editModal && (
        <div className="modal">
          <h3>Редактировать</h3>
          <input
            type="text"
            className="modal-input"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <div className="btn-group">
            <button className="btn btn-cancel" onClick={() => setEditModal(false)}>
              Cancel
            </button>
            <button className="btn btn-save" onClick={editUser}>
              Save
            </button>
          </div>
        </div>
      )}

      {infoModal && (
        <div className="info-box">
          <h3>Информация о категории</h3>
          {infoLoading && <p className="loading">Загрузка...</p>}
          {infoError && <p className="error">Ошибка при загрузке</p>}
          {!infoLoading && !infoError && selectedCategory && (
            <>
              <p><strong>ID:</strong> {selectedCategory.id}</p>
              <p><strong>Название:</strong> {selectedCategory.name}</p>
            </>
          )}
          <button
            className="btn btn-close"
            style={{ marginTop: "10px" }}
            onClick={closeInfoModal}
          >
            Закрыть
          </button>
        </div>
      )}
    </div>
  );
}
