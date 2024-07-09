import instance from "@/api/instance";

const branchService = {};

// CRUD
branchService.list = function list(payload) {
  return instance.get("branches/", { params: payload });
};

branchService.create = function create(payload) {
  return instance.post("branches/", payload);
};

branchService.show = function show(id) {
  return instance.get(`branches/${id}/`);
};

branchService.update = function update(id, payload) {
  return instance.put(`branches/${id}/`, payload);
};

branchService.destroy = function destroy(id) {
  return instance.delete(`branches/${id}/`);
};
// No CRUD
branchService.listCountries = function listCountries() {
  return instance.get("branches/countries/");
}
branchService.listStates = function listStates(payload) {
  return instance.get("branches/states/", { params: payload });
}
branchService.listCities = function listCities(payload) {
  return instance.get("branches/cities/", { params: payload });
}
export default branchService;
