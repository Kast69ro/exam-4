import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategories,
  setCategoriesLoading,
  setCategoriesError,
} from "../reducers/classic-todo-slice";
import axios from "axios";

export default function ClassicTodo() {
  const [addModal, setAddModal] = useState(false);
  const [addName, setAddName] = useState("");
  const [addImage, setAddImage] = useState([]);
  const [addDescription, setAddDescription] = useState("");

  const [editModal, setEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [idx, setIdx] = useState(null);

  const [Image, setImage] = useState([]);

  const {
    data: categories,
    loading: categoriesLoading,
    errors: categoriesError,
  } = useSelector((state) => state.classicTodo);

  const dispatch = useDispatch();

  async function get() {
    dispatch(setCategoriesLoading(true));
    try {
      const { data } = await axios.get(
        "https://to-dos-api.softclub.tj/api/to-dos"
      );
      dispatch(setCategories(data.data));

      dispatch(setCategoriesLoading(false));
    } catch (error) {
      dispatch(setCategoriesLoading(false));
      dispatch(setCategoriesError(true));
    }
  }
  useEffect(() => {
    get();
  }, []);

  async function delUser(id) {
    dispatch(setCategoriesLoading(true));
    try {
      await axios.delete(`https://to-dos-api.softclub.tj/api/to-dos?id=${id}`);
      get();
      dispatch(setCategoriesLoading(false));
    } catch (error) {
      dispatch(setCategoriesLoading(false));
      dispatch(setCategoriesError(true));
    }
  }
  async function handleAdd(e) {
    e.preventDefault();
    const newUser = new FormData();
    newUser.append("Name", addName);
    newUser.append("Description", addDescription);
    for (let i = 0; i < addImage.length; i++) {
      newUser.append("Images", addImage[i]);
    }
    dispatch(setCategoriesLoading(true));
    try {
      await axios.post("https://to-dos-api.softclub.tj/api/to-dos", newUser, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      get();
      setAddModal(false);
    } catch (error) {
      setCategoriesLoading(false);
      setCategoriesError(true);
    }
  }

  const handleEdit = (user) => {
    setEditModal(true);
    setEditName(user.name);
    setEditDescription(user.description);
    setIdx(user.id);
  };
  async function handleEditSave(e) {
    e.preventDefault();
    let editedUser = {
      name: editName,
      description: editDescription,
      id: idx,
    };
    dispatch(setCategoriesLoading(true));
    try {
      await axios.put("https://to-dos-api.softclub.tj/api/to-dos", editedUser);
      dispatch(setCategoriesLoading(false));
      get();
      setEditModal(false);
    } catch (error) {
      dispatch(setCategoriesLoading(false));
      dispatch(setCategoriesError(true));
    }
  }

  async function delImage(id) {
    setCategoriesLoading(true);
    try {
      await axios.delete(
        `https://to-dos-api.softclub.tj/api/to-dos/images/${id}`
      );
      get();
      setCategoriesLoading(false);
    } catch (error) {
      dispatch(setCategoriesLoading(false));
      dispatch(setCategoriesError(true));
    }
  }

  async function handleAddImage(id) {
    const newImage = new FormData();
    for (let i = 0; i < Image.length; i++) {
      newImage.append("Images", Image[i]);
      dispatch(setCategoriesLoading(true));
      try {
        await axios.post(
          `https://to-dos-api.softclub.tj/api/to-dos/${id}/images`,
          newImage,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        get();
        dispatch(setCategoriesLoading(false));
      } catch (error) {
        dispatch(setCategoriesLoading(false));
        dispatch(setCategoriesError(true));
      }
    }
  }

  return (
    <div className="task-container">
  <input
    type="file"
    onChange={(e) => setImage(e.target.files)}
    className="task-file-input"
  />
  <button onClick={() => setAddModal(true)} className="task-button">Add</button>

  {categoriesLoading && <p className="task-loading">Загрузка...</p>}
  {categoriesError && <p className="task-error">Ошибка загрузки данных</p>}

  <table className="task-table">
    <tbody>
      {categories?.map((el) => (
        <tr key={el.id}>
           <td>
            {el.images.map((foto) => (
              <div key={foto.id} className="task-image-wrapper">
                <img
                  width={50}
                  className="task-image"
                  src={`https://to-dos-api.softclub.tj/images/${foto.imageName}`}
                  alt=""
                />
              </div>
            ))}
          </td>
          <td>{el.name}</td>
          <td>{el.description}</td>
          <td>{el.isComplete ? "Active" : "Inactive"}</td>
          <td>
            <div className="task-actions">
              <button onClick={() => delUser(el.id)} className="task-button">Delete</button>
              <button onClick={() => handleEdit(el)} className="task-button">Edit</button>
              <button onClick={() => handleAddImage(el.id)} className="task-button">Add Image</button>
              <button
                onClick={() => delImage(el.images.map((e) => e.id))}
                className="task-button task-button-cancel"
              >
                Delete Image
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {addModal && (
    <div className="task-modal">
      <form onSubmit={handleAdd} className="task-modal-form">
        <input
          type="file"
          multiple
          name="img"
          required
          onChange={(e) => setAddImage(e.target.files)}
          className="task-input"
        />
        <input
          type="text"
          name="name"
          value={addName}
          required
          onChange={(e) => setAddName(e.target.value)}
          placeholder="Name"
          className="task-input"
        />
        <input
          type="text"
          name="description"
          value={addDescription}
          required
          onChange={(e) => setAddDescription(e.target.value)}
          placeholder="Description"
          className="task-input"
        />
        <div className="task-form-actions">
          <button
            type="button"
            className="task-button task-button-cancel"
            onClick={() => setAddModal(false)}
          >
            Cancel
          </button>
          <button type="submit" className="task-button">Save</button>
        </div>
      </form>
    </div>
  )}

  {editModal && (
    <div className="task-modal">
      <form onSubmit={handleEditSave} className="task-modal-form">
        <input
          type="text"
          name="name"
          value={editName}
          required
          onChange={(e) => setEditName(e.target.value)}
          placeholder="Name"
          className="task-input"
        />
        <input
          type="text"
          name="description"
          value={editDescription}
          required
          onChange={(e) => setEditDescription(e.target.value)}
          placeholder="Description"
          className="task-input"
        />
        <div className="task-form-actions">
          <button
            type="button"
            className="task-button task-button-cancel"
            onClick={() => setEditModal(false)}
          >
            Cancel
          </button>
          <button type="submit" className="task-button">Save</button>
        </div>
      </form>
    </div>
  )}
</div>

  );
}
