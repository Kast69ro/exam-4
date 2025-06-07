import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  todoGetcategory,
  delUser,
  addUser,
  editUser,
  delImage,
  addImages
} from "../reducers/todo-category-slice";
import './todo-category.css'

export default function TodoCategorySlice() {
  const [addModal, setAddModal] = useState(false);
  const [addName, setAddName] = useState("");
  const [addImage, setAddImage] = useState([]);
  const [addDescription, setAddDescription] = useState("");

  const [editModal, setEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [idx,setIdx] = useState(null)
  
  const [Image, setImage] = useState([]);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.todoCategorySlice.data);
  const loading = useSelector((state) => state.todoCategorySlice.loading);
  const errors = useSelector((state) => state.todoCategorySlice.errors);

  useEffect(() => {
    dispatch(todoGetcategory());
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    const newUser = new FormData();
    newUser.append("Name", addName);
    newUser.append("Description", addDescription);
    for (let i = 0; i < addImage.length; i++) {
      newUser.append("Images", addImage[i]);
    }

    dispatch(addUser(newUser));
    setAddModal(false)
    setAddName('')
    setAddDescription('')
    setAddImage([])
  };

  const handleEdit = (user)=>{
    setEditModal(true)
    setEditName(user.name)
    setEditDescription(user.description)
    setIdx(user.id)
  }
  const handleEditSave=(e)=>{
    e.preventDefault()
    let editedUser = {
        name:editName,
        description:editDescription,
        id:idx

    }
    dispatch(editUser(editedUser))
    setEditModal(false)

}
const handleAddImage = (id)=>{

    const newImage = new FormData()
 for(let i =0;i<Image.length;i++){
    newImage.append('Images', Image[i])

 }
 dispatch(addImages({todoId:id, Images:newImage}))
 setImage([])
} 

  return (
    <div className="task-container">
  <input
    type="file"
    onChange={(e) => setImage(e.target.files)}
    className="task-file-input"
  />

  <button className="task-button" onClick={() => setAddModal(true)}>
    Add
  </button>

  <table className="task-table">
    <tbody>
      {data?.map((el) => (
        <tr key={el.id}>
          <td>
            {el.images.map((foto) => (
              <div key={foto.id} className="task-image-wrapper">
                <img
                  className="task-image"
                  width={50}
                  src={`https://to-dos-api.softclub.tj/images/${foto.imageName}`}
                  alt=""
                />
              </div>
            ))}
          </td>
          <td>{el.name}</td>
          <td>{el.description}</td>
          <td>{el.isCompelete ? "Active" : "Inactive"}</td>
          <td>
            <div className="task-actions">
              <button
                className="task-button task-button-cancel"
                onClick={() => dispatch(delUser(el.id))}
              >
                Delete
              </button>
              <button
                className="task-button"
                onClick={() =>
                  dispatch(delImage(el.images.map((e) => e.id)))
                }
              >
                Delete Image
              </button>
              <button
                className="task-button"
                onClick={() => handleEdit(el)}
              >
                Edit
              </button>
              <button
                className="task-button"
                onClick={() => handleAddImage(el.id)}
              >
                Add Image
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {loading && <div className="task-loading">Загрузка...</div>}
  {errors && <div className="task-error">Упс, что-то пошло не так</div>}

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
