import instance from "@/api/instance";

const itemService = {};

itemService.list = function list(payload) {
  return instance.get("items/", { params: payload });
};

itemService.create = function create(payload) {
  return instance.post("items/", payload);
};

itemService.show = function show(id) {
  return instance.get(`items/${id}/`);
};

itemService.update = function update(id, payload) {
  return instance.put(`items/${id}/`, payload);
};

itemService.destroy = function destroy(id) {
  return instance.delete(`items/${id}/`);
};

export default itemService;
