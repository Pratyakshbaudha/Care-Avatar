import request from './request';

const DonateService = {
  getAll: (params) => request.get('/donationItems', { params }),
  create: (data) => request.post('/donationCategory', data),
  delete: (id) => request.delete(`/donationItems/${id}`),
  delete2: (id) => request.delete(`/donationCategory/${id}`),
  update: (id, data) => request.put(`/donationCategory/${id}`, data),
  getAll2: (params) => request.get('/donationCategory', { params }),
};

export default DonateService;
