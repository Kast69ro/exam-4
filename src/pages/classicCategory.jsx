import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategories,
  setCategoriesLoading,
  setCategoriesError,
} from "../reducers/classic-category-slice";
import axios from "axios";

export default function ClassicCategories() {
  const [addName, setAddName] = useState("");
  
  const [editModal, setEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [idx, setIdx] = useState(null);

  const [infoModal, setInfoModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [infoLoading, setInfoLoading] = useState(false);
  const [infoError, setInfoError] = useState(false);

  const {
    data: categories,
    loading: categoriesLoading,
    errors: categoriesError,
  } = useSelector((state) => state.classicCategories);

  const dispatch = useDispatch();

  async function get() {
    dispatch(setCategoriesLoading(true));
    try {
      const { data } = await axios.get(
        "https://to-dos-api.softclub.tj/api/categories"
      );
      dispatch(setCategories(data.data));
    } catch (error) {
      dispatch(setCategoriesError(true));
      console.error(error);
    } finally {
      dispatch(setCategoriesLoading(false));
    }
  }

  useEffect(() => {
    get();
  }, []);

  async function deleteUs(id) {
    dispatch(setCategoriesLoading(true));
    try {
      await axios.delete(
        `https://to-dos-api.softclub.tj/api/categories?id=${id}`
      );
      get();
    } catch (error) {
      dispatch(setCategoriesError(true));
    } finally {
      dispatch(setCategoriesLoading(false));
    }
  }

  async function addUser() {
    let newUser = {
      name: addName,
    };
    dispatch(setCategoriesLoading(true));
    try {
      await axios.post(
        "https://to-dos-api.softclub.tj/api/categories",
        newUser
      );
      get();
      setAddName("");
    } catch (error) {
      dispatch(setCategoriesError(true));
    } finally {
      dispatch(setCategoriesLoading(false));
    }
  }

  const handleEdit = (el) => {
    setEditModal(true);
    setEditName(el.name);
    setIdx(el.id);
  };

  async function editUser() {
    let editedUser = {
      name: editName,
      id: idx,
    };
    dispatch(setCategoriesLoading(true));
    try {
      await axios.put(
        "https://to-dos-api.softclub.tj/api/categories",
        editedUser
      );
      get();
      setEditModal(false);
    } catch (error) {
      dispatch(setCategoriesError(true));
    } finally {
      dispatch(setCategoriesLoading(false));
    }
  }

  async function getCategoryById(id) {
    setInfoModal(true);
    setInfoLoading(true);
    setInfoError(false);
    try {
      const res = await axios.get(
        `https://to-dos-api.softclub.tj/api/categories/${id}`
      );
      setSelectedCategory(res.data.data);
    } catch (err) {
      setInfoError(true);
    } finally {
      setInfoLoading(false);
    }
  }

  return (
    <div className="category-container">
      <div className="category-controls">
        <input
          type="text"
          className="category-input"
          value={addName}
          onChange={(e) => setAddName(e.target.value)}
          placeholder="New category"
        />
        <button className="btn btn-add" onClick={addUser}>
          Add
        </button>
      </div>

      {categoriesLoading && <p className="loading">Загрузка...</p>}
      {categoriesError && <p className="error">Ошибка загрузки данных</p>}
      {!categoriesLoading && !categoriesError && categories.length === 0 && (
        <p className="loading">Нет доступных категорий</p>
      )}

      <table className="category-table">
        <tbody>
          {categories.map((el) => (
            <tr key={el.id}>
              <td>{el.name}</td>
              <td>
                <div className="btn-group">
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteUs(el.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-edit"
                    onClick={() => handleEdit(el)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-info"
                    onClick={() => getCategoryById(el.id)}
                  >
                    Info
                  </button>
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
          <div className="btn-group" style={{ marginTop: "10px" }}>
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
          <h3>Информация о пользователе</h3>
          {infoLoading && <p className="loading">Загрузка...</p>}
          {infoError && <p className="error">Ошибка загрузки</p>}
          {!infoLoading && !infoError && selectedCategory && (
            <>
              <p>
                <strong>ID:</strong> {selectedCategory.id}
              </p>
              <p>
                <strong>Название:</strong> {selectedCategory.name}
              </p>
            </>
          )}
          <button
            className="btn btn-close"
            style={{ marginTop: "10px" }}
            onClick={() => setInfoModal(false)}
          >
            Закрыть
          </button>
        </div>
      )}
    </div>
  );
}
