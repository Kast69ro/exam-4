import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getcategory = createAsyncThunk(
  "category/getcategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://to-dos-api.softclub.tj/api/categories"
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
  "category/delUser",
  async (id, { dispatch }) => {
    await axios.delete(
      `https://to-dos-api.softclub.tj/api/categories?id=${id}`
    );
    dispatch(getcategory());
  }
);

export const addUser = createAsyncThunk(
  "category/addUser",
  async (user, { dispatch, rejectWithValue }) => {
    try {
      await axios.post("https://to-dos-api.softclub.tj/api/categories", user);
      await dispatch(getcategory());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      } else {
        return rejectWithValue("Неизвестная ошибка");
      }
    }
  }
);
export const editUser = createAsyncThunk(
  "category/editCategory",
  async ({ id, name }, { dispatch, rejectWithValue }) => {
    try {
      await axios.put(`https://to-dos-api.softclub.tj/api/categories`, {
        id,
        name,
      });
      await dispatch(getcategory());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      } else {
        return rejectWithValue("Неизвестная ошибка");
      }
    }
  }
);
export const search = createAsyncThunk(
  "category/search",
  async (value, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://to-dos-api.softclub.tj/api/categories?query=${value}`
      );
      console.log(response.data.data);

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

export const getCategoryById = createAsyncThunk(
  "category/getCategoryById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://to-dos-api.softclub.tj/api/categories/${id}`
      );
      console.log(response.data.data);

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      } else {
        return rejectWithValue("Неизвестная ошибка");
      }
    }
  }
);

export const categorySlice = createSlice({
  name: "category",

  initialState: {
    data: [],
    errors: false,
    loading: false,
    selected: null,
  },
  reducers: {
    closeInfo: (state, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getcategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getcategory.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getcategory.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
    builder
      .addCase(search.pending, (state) => {
        state.loading = true;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(search.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
    builder
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.errors = action.payload;
      });
  },
});

export default categorySlice.reducer;
export const { closeInfo } = categorySlice.actions;
