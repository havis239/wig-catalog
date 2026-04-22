import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Gunakan 127.0.0.1 untuk menghindari delay DNS localhost di Windows
const API_URL = 'http://127.0.0.1:5000/api/inquiries';

export const fetchInquiries = createAsyncThunk('inquiry/fetchInquiries', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Gagal mengambil data pesan';
    return thunkAPI.rejectWithValue(message);
  }
});

export const submitInquiry = createAsyncThunk('inquiry/submitInquiry', async (inquiryData, thunkAPI) => {
  try {
    const response = await axios.post(API_URL, inquiryData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Gagal mengirim pesan. Pastikan server backend berjalan.';
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteInquiry = createAsyncThunk('inquiry/deleteInquiry', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    await axios.delete(`${API_URL}/${id}`, config);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const inquirySlice = createSlice({
  name: 'inquiry',
  initialState: {
    inquiries: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetInquiryStatus: (state) => {
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInquiries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInquiries.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiries = action.payload;
      })
      .addCase(fetchInquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitInquiry.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitInquiry.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteInquiry.fulfilled, (state, action) => {
        state.inquiries = state.inquiries.filter(iq => iq._id !== action.payload);
      });
  },
});

export const { resetInquiryStatus } = inquirySlice.actions;
export default inquirySlice.reducer;
