import { useEffect, useState } from "react";
import './category.css'
import { useDispatch, useSelector } from "react-redux";
import {
  getcategory,
  delUser,
  addUser,
  editUser,
  search,
  getCategoryById,
  closeInfo,
} from "../reducers/category-slice";

export default function Category() {
  const [addName, setAddName] = useState("");

  const [editModal, seteditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [idx, setIdx] = useState(null);

  const [query, setQuery] = useState("");

  const { selected } = useSelector((state) => state.category);
  const data = useSelector((state) => state.category.data);
  const loading = useSelector((state) => state.category.loading);
  const errors = useSelector((state) => state.category.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getcategory());
  }, []);

  const handleAdd = () => {
    let newUser = {
      name: addName,
    };
    dispatch(addUser(newUser));
    setAddName('')
  };
  const handleEdit = (user) => {
    seteditModal(true);
    setEditName(user.name);
    setIdx(user.id);
  };
  const handleEditSave = () => {
    const editedUs = {
      id: idx,
      name: editName,
    };
    dispatch(editUser(editedUs));
    seteditModal(false);
  };
  const handlSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    dispatch(search(value));
  };
  const handleInfo = (id) => {
    dispatch(getCategoryById(id));
  };

  return (
   <div className="category-container">
  <div className="category-controls">
    <input
      type="text"
      className="category-search"
      placeholder="Поиск..."
      value={query}
      onChange={handlSearch}
    />
    <input
      type="text"
      className="category-input"
      value={addName}
      onChange={(e) => setAddName(e.target.value)}
    />
    <button className="btn btn-add" onClick={handleAdd}>
      Add
    </button>
  </div>

  <table className="category-table">
    <tbody>
      {data.data?.map((el) => (
        <tr key={el.id}>
          <td>{el.name}</td>
          <td>
            <div className="btn-group">
              <button className="btn btn-delete" onClick={() => dispatch(delUser(el.id))}>
                delete
              </button>
              <button className="btn btn-edit" onClick={() => handleEdit(el)}>
                edit
              </button>
              <button className="btn btn-info" onClick={() => handleInfo(el.id)}>
                info
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {loading && <div className="loading">Загрузка...</div>}
  {errors && <div className="error">Упс, что то пошло не так </div>}

  {editModal && (
    <div className="modal">
      <input
        type="text"
        className="modal-input"
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
      /> <br /> <br />
      <button className="btn btn-cancel" onClick={() => seteditModal(false)}>
        Cancel
      </button>
      <button className="btn btn-save" onClick={handleEditSave}>
        Save
      </button>
    </div>
  )}

  {selected && (
    <div className="info-box">
      <h2>Информация</h2>
      <p>ID: {selected.id}</p>
      <p>Название: {selected.name}</p>
      <button className="btn btn-close" onClick={() => dispatch(closeInfo(null))}>
        Close
      </button>
    </div>
  )}
</div>

  );
}
