import request from "./request";

const alzheimerService = {
  createAdminGame: (data) =>
    request.post("/assesment/admin/game/alzheimer/create", data),
  getAdminGames: (params) =>
    request.get("/assesment/admin/game/alzheimer", { params }),
  getAdminGameById: (id) =>
    request.get(`/assesment/admin/game/alzheimer/${id}`),
  updateAdminGame: (id, data) =>
    request.put(`/assesment/admin/game/alzheimer/${id}`, data),
  deleteAdminGame: (id) =>
    request.delete(`/assesment/admin/game/alzheimer/${id}`),
  // -------------------------------
  // 🧠 Alzheimer Questions
  // -------------------------------
  createQuestion: (data) => request.post("/", data),
  getAllQuestions: () => request.get("/"),
  getQuestionById: (id) => request.get(`/${id}`),
  updateQuestion: (id, data) => request.put(`/${id}`, data),
  deleteQuestion: (id) => request.delete(`/${id}`),

  // -------------------------------
  // 📂 Question Categories
  // -------------------------------
  createQuestionCategory: (data) => request.post("/", data),
  getAllQuestionCategorys: () => request.get("/"),
  getQuestionCategoryById: (id) => request.get(`/${id}`),
  updateQuestionCategory: (id, data) => request.put(`/${id}`, data),
  deleteQuestionCategory: (id) => request.delete(`/${id}`),

  // -------------------------------
  // 🎥 Videos
  // -------------------------------
  createVideo: (data) => request.post("/assesment/alzheimer/videos", data),
  getAllVideos: () => request.get("/assesment/alzheimer/videos?sort=old"),
  deleteVideo: (id) => request.delete(`/${id}`),

  // -------------------------------
  // 🧘 Meditation
  // -------------------------------
  createMeditation: (data) => request.post("/", data),
  getAllMeditations: () => request.get("/"),
  getMeditationById: (id) => request.get(`/${id}`),
  deleteMeditation: (id) => request.delete(`/${id}`),

  // -------------------------------
  // ✅ Tasks
  // -------------------------------
  createTask: (data) => request.post("/", data),
  getAllTasks: () => request.get("/"),
  getTaskById: (id) => request.get(`/${id}`),
  updateTask: (id, data) => request.put(`/${id}`, data),
  deleteTask: (id) => request.delete(`/${id}`),

  // -------------------------------
  // 🎨 Activities
  // -------------------------------
  createActivity: (data) => request.post("/", data),
  getAllActivities: () => request.get("/"),
  getActivityById: (id) => request.get(`/${id}`),
  updateActivity: (id, data) => request.put(`/${id}`, data),
  deleteActivity: (id) => request.delete(`/${id}`),

  // -------------------------------
  // 🎮 Games
  // -------------------------------
  createGame: (data) => request.post("/", data),
  getAllGames: () => request.get("/"),
  getGameById: (id) => request.get(`/${id}`),
  updateGame: (id, data) => request.put(`/${id}`, data),
  deleteGame: (id) => request.delete(`/${id}`),

  // -------------------------------
  // 👨‍⚕️ Doctors
  // -------------------------------
  createDoctor: (data) => request.post("/assesment/alzheimer/doctors", data),
  getAllDoctors: () => request.get("/admin/getAllDoctors"),
  getDoctorById: (id) => request.get(`/${id}`),
  updateDoctor: (id, data) => request.put(`/${id}`, data),
  deleteDoctor: (id) => request.delete(`/${id}`),

  // -------------------------------
  // 🧍‍♂️ Caregivers
  // -------------------------------
  getAllCaregivers: () => request.get("/assesment/alzheimer/caregivers/list"),
  createCaregiver: (data) => request.post("/assesment/alzheimer/caregiver", data),
  updateCaregiver: (id, data) => request.patch(`/assesment/alzheimer/caregiver/${id}`, data),
  deleteCaregiver: (id) => request.delete(`/assesment/alzheimer/caregiver/${id}`),

  // -------------------------------
  // 🧍‍♂️ Caregivers
  // -------------------------------
  getAppointments: () => request.post("/assesment/alzheimer/doctors/getAppointments"),
  appointment: (data) => request.post("/assesment/alzheimer/doctors/appointment", data),

};

export default alzheimerService;
