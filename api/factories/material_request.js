import instance from "@/api/instance";
import { config } from "@fortawesome/fontawesome-svg-core";

const materialRequestService = {};

materialRequestService.list = function list(payload) {
  return instance.get("material_requests/", { params: payload });
};

materialRequestService.create = function create(payload) {
  return instance.post("material_requests/", payload, { headers: { 'content-type': 'application/json' } });
};

materialRequestService.show = function show(id) {
  return instance.get(`material_requests/${id}/`);
};

materialRequestService.update = function update(id, payload) {
  return instance.put(`material_requests/${id}/`, payload, { headers: { 'content-type': 'application/json' } });
};

materialRequestService.destroy = function destroy(id) {
  return instance.delete(`material_requests/${id}/`);
};

export default materialRequestService;
