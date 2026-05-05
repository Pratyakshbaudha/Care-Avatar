import axios from "axios";
import { API_URL } from "../../Config/AppConstant";

const initialState = {
  loading: false,
  dietCharts: [],
  error: null,
  uploadLoading: false,
  pagination: {},
};

// Action types
const FETCH_DIETCHART_REQUEST = "FETCH_DIETCHART_REQUEST";
const FETCH_DIETCHART_SUCCESS = "FETCH_DIETCHART_SUCCESS";
const FETCH_DIETCHART_FAILURE = "FETCH_DIETCHART_FAILURE";

const UPLOAD_DIETCHART_REQUEST = "UPLOAD_DIETCHART_REQUEST";
const UPLOAD_DIETCHART_SUCCESS = "UPLOAD_DIETCHART_SUCCESS";
const UPLOAD_DIETCHART_FAILURE = "UPLOAD_DIETCHART_FAILURE";

// Fetch diet charts
export const fetchDietCharts =
  (page = 1, limit = 10) =>
  async (dispatch) => {
    const token1= await localStorage.getItem("token")
    if (!token1) {
      dispatch({ type: FETCH_DIETCHART_FAILURE, payload: "No token found. Please log in again." });
      return;
    }
    dispatch({ type: FETCH_DIETCHART_REQUEST });
    try {
      const { data } = await axios.get(
        `${API_URL}/fitness/dietCalorieData?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token1}`,
          },
        }
      );
      dispatch({ type: FETCH_DIETCHART_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_DIETCHART_FAILURE, payload: error.message });
    }
  };

// Upload diet chart file (Excel)
export const uploadDietChart = (formData) => async (dispatch) => {
  dispatch({ type: UPLOAD_DIETCHART_REQUEST });
  try {
    const response = await axios.post(
      `${API_URL}/fitness/dietCalorieData`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch({ type: UPLOAD_DIETCHART_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: UPLOAD_DIETCHART_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

// Reducer
export const dietChartReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Diet Charts
    case FETCH_DIETCHART_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_DIETCHART_SUCCESS:
      return {
        ...state,
        loading: false,
        dietCharts: Array.isArray(action.payload.data)
          ? action.payload.data
          : [],
        pagination: { total: action.payload.total, page: action.payload.page, limit: action.payload.limit,totalPages: action.payload.totalPages },
        error: null,
      };
    case FETCH_DIETCHART_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Upload Diet Chart
    case UPLOAD_DIETCHART_REQUEST:
      return { ...state, uploadLoading: true };
    case UPLOAD_DIETCHART_SUCCESS:
      return {
        ...state,
        uploadLoading: false,
        dietCharts: [action.payload, ...state.dietCharts], // Add newly uploaded chart
      };
    case UPLOAD_DIETCHART_FAILURE:
      return { ...state, uploadLoading: false, error: action.payload };

    default:
      return state;
  }
};
