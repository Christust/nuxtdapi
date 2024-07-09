import axios from "axios";
import swal from "sweetalert";
import { useCounterStore } from "@/stores/counter";
import { useAuthStore } from "@/stores/auth";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  timeout: 5000,
});

instance.interceptors.request.use((config) => {
  const useAuth = useAuthStore();
  const useCounter = useCounterStore();
  if (useAuth.isLoggedIn) {
    config.headers.Authorization = `Bearer ${useAuth.token}`;
  }
  useCounter.setCounter(+1);
  return config;
});

instance.interceptors.response.use(
  (res) => {
    const useCounter = useCounterStore();
    setTimeout(() => {
      useCounter.setCounter(-1);
    }, 500)
    return res;
  },
  (error) => {
    const useCounter = useCounterStore();
    setTimeout(() => {
      useCounter.setCounter(-1);
    }, 500)
    if (error.code == "ERR_NETWORK") {
      swal({ icon: "error", title: "Error de conexión", text: "No se pudo establecer conexión con el servidor" });
      return error;
    } else {
      swal({ icon: "error", title: "Error", text: error.response.data.error });
    }
    return error;
  }
);

export default instance;
