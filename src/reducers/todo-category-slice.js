import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const todoGetcategory = createAsyncThunk(
  "todoCategory/todoGetcategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://to-dos-api.softclub.tj/api/to-dos"
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      } else {
        return rejectWithValue("Неизвестная ошибка");
      }
    }
  }
);
export const delUser = createAsyncThunk(
  "todoCategory/todoGetcategory",
  async (id, { dispatch }) => {
    await axios.delete(`https://to-dos-api.softclub.tj/api/to-dos?id=${id}`);
    dispatch(todoGetcategory());
  }
);

export const addUser = createAsyncThunk(
  "todoCategory/todoGetcategory",
  async (newUser, { dispatch, rejectWithValue }) => {
    try {
      await axios.post("https://to-dos-api.softclub.tj/api/to-dos", newUser, {
        
      });
      await dispatch(todoGetcategory());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      } else {
        return rejectWithValue("ошибка");
      }
    }
  }
);
export const editUser = createAsyncThunk(
  "todoCategory/todoGetcategory",
  async (editedUser, { dispatch, rejectWithValue }) => {
    try {
      await axios.put("https://to-dos-api.softclub.tj/api/to-dos", editedUser);
      await dispatch(todoGetcategory());
    } catch (error) {
      axios.isAxiosError(error)
        ? rejectWithValue(error.response?.data || error.message)
        : rejectWithValue("Ошибка");
    }
  }
);

export const delImage = createAsyncThunk(
  "todoCategory/todoGetcategory",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(
        `https://to-dos-api.softclub.tj/api/to-dos/images/${id}`
      );
      dispatch(todoGetcategory());
    } catch (error) {
      axios.isAxiosError(error)
        ? rejectWithValue(error.response?.data || error.message)
        : rejectWithValue("Ошибка");
    }
  }
);


export const addImages = createAsyncThunk(
  "todoCategory/todoGetcategory",
  async({todoId,Images},{dispatch,rejectWithValue})=>{
    try {
      await axios.post(`https://to-dos-api.softclub.tj/api/to-dos/${todoId}/images`,Images,{
          headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      dispatch(todoGetcategory())
      
      
    } catch (error) {
        axios.isAxiosError(error)
        ? rejectWithValue(error.response?.data || error.message)
        : rejectWithValue("Ошибка");
      
    }
  }

)

export const todoCategorySlice = createSlice({
  name: "todoCategorySlice",
  initialState: {
    data: [],
    errors: false,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(todoGetcategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(todoGetcategory.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
    });
    builder.addCase(todoGetcategory.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
  },
});

export default todoCategorySlice.reducer;
