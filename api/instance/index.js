import axios from "axios";
import swal from "sweetalert";
import authService from "../factories/auth";
import { useLoaderStore } from "@/stores/loader";
import { useAuthStore } from "@/stores/auth";

const config = useRuntimeConfig()

const instance = axios.create({
  baseURL: config.public.backend_url,
  timeout: 5000,
});

instance.interceptors.request.use((config) => {
  const useAuth = useAuthStore();
  const useLoader = useLoaderStore();
  if (useAuth.isLoggedIn) {
    config.headers.Authorization = `Bearer ${useAuth.token}`;
  }
  useLoader.setLoader(+1);
  return config;
});

instance.interceptors.response.use(
  (res) => {
    const useLoader = useLoaderStore();
    setTimeout(() => {
      useLoader.setLoader(-1);
    }, 500)
    return res;
  },
  (error) => {
    const useLoader = useLoaderStore();
    const authStore = useAuthStore();
    setTimeout(() => {
      useLoader.setLoader(-1);
    }, 500)
    if (error.response.data.code === 'token_not_valid') {
      const payload = {
        refresh_token: authStore.refresh_token
      }
      authService.logout(payload).then(() => {
        authStore.logout()
      })
      return error
    }
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
