import request from "./request";

const STORY_BASE = "/admin/story";

const storyService = {
  getAll: (params) => request.get(STORY_BASE, { params }),
  add: (data) => request.post(STORY_BASE, data),
  edit: (id, data) => request.put(`${STORY_BASE}/${id}`, data),
  delete: (id) => request.delete(`${STORY_BASE}/${id}`),
};

export default storyService;
