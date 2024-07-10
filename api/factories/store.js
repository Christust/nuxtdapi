import instance from "@/api/instance";

const storeService = {};

storeService.list = function list(payload) {
  return instance.get("stores/", { params: payload });
};

storeService.create = function create(payload) {
  return instance.post("stores/", payload);
};

storeService.show = function show(id) {
  return instance.get(`stores/${id}/`);
};

storeService.update = function update(id, payload) {
  return instance.put(`stores/${id}/`, payload);
};

storeService.destroy = function destroy(id) {
  return instance.delete(`stores/${id}/`);
};

export default storeService;
