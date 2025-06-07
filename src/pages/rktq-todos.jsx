import {
  useGetTodosQuery,
  useDeleteTodoMutation,
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteImageMutation,
  useAddImageMutation,
} from "../api/todolist";
import { useState } from "react";
import './todo-category.css'

export default function TodoListPage() {
  const { data, isLoading, isError } = useGetTodosQuery();
  const [delUser] = useDeleteTodoMutation();
  const [addTodo] = useAddTodoMutation();
  const [editTodo] = useEditTodoMutation();
  const [deleteImage] = useDeleteImageMutation();
  const [addImageTodo] = useAddImageMutation();

  const [addModal, setAddModal] = useState(false);
  const [addName, setAddName] = useState("");
  const [addImage, setAddImage] = useState([]);
  const [addDescription, setAddDescription] = useState("");

  const [editModal, setEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [idx, setIdx] = useState(null);

  const [Image, setImage] = useState([]);

  const todos = data?.data || [];

  const handleAdd = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Name", addName);
    formData.append("Description", addDescription);
    let files = addImage;
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      formData.append("Images", files[i]);
    }
    addTodo(formData);
    setAddModal(false);
  };
  const handleEdit = (user) => {
    setEditModal(true);
    setEditName(user.name);
    setEditDescription(user.description);
    setIdx(user.id);
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    let editedUser = {
      id: idx,
      name: editName,
      description: editDescription,
    };
    editTodo(editedUser);
    setEditModal(false);
  };

  const handleAddImage=(id)=>{
      const newImage = new FormData();
    for (let i = 0; i < Image.length; i++) {
      newImage.append("Images", Image[i]);
  }
  addImageTodo({ id, formData: newImage })
}

  return (
    <div className="task-container">
      <input
        type="file"
        className="task-file-input"
        onChange={(e) => setImage(e.target.files)}
      />
      <button onClick={() => setAddModal(true)} className="task-button">
        Add
      </button>

      {isLoading && <p className="task-loading">Загрузка...</p>}
      {isError && <p className="task-error">Ошибка загрузки данных</p>}

      <table className="task-table">
        <tbody>
          {todos.map((el) => (
            <tr key={el.id}>
              <td>
                {el.images?.map((foto) => (
                  <div key={foto.id} className="task-image-wrapper">
                    <img
                      width={50}
                      className="task-image"
                      src={`https://to-dos-api.softclub.tj/images/${foto.imageName}`}
                      alt={foto.imageName || "todo image"}
                    />
                  </div>
                ))}
              </td>
              <td>{el.name}</td>
              <td>{el.description}</td>
              <td>{el.isComplete ? "Active" : "Inactive"}</td>
              <td>
                <div className="task-actions">
                  <button
                    className="task-button"
                    onClick={() => delUser(el.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="task-button"
                    onClick={() => handleEdit(el)}
                  >
                    Edit
                  </button>
                  <button className="task-button" onClick={()=>handleAddImage(el.id)}>Add Image</button>
                  <button
                    className="task-button task-button-cancel"
                    onClick={() => deleteImage(el.images.map((e) => e.id))}
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
              <button type="submit" className="task-button">
                Save
              </button>
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
              <button type="submit" className="task-button">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
