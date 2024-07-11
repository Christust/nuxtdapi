import instance from "@/api/instance";

const stockService = {};

stockService.list = function list(payload) {
  return instance.get("stocks/", { params: payload });
};

stockService.create = function create(payload) {
  return instance.post("stocks/", payload);
};

stockService.show = function show(id) {
  return instance.get(`stocks/${id}/`);
};

stockService.update = function update(id, payload) {
  return instance.put(`stocks/${id}/`, payload);
};

stockService.destroy = function destroy(id) {
  return instance.delete(`stocks/${id}/`);
};

export default stockService;
