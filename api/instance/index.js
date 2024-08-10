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
      if (error.config.url === 'token/refresh/') return Promise.reject(error)
      // Refresh
      if (authStore.refresh_flag) {
        authStore.deactivateRefresh()
        authService.refreshToken({
          refresh: authStore.refresh_token
        }).then((res) => {
          authStore.refresh(res)
          authStore.activateRefresh()
          location.reload()
        }).catch(() => {
          authStore.logout()
          authStore.activateRefresh()
        })
      }
      return Promise.reject(error)
    }
    if (error.code == "ERR_NETWORK") {
      swal({ icon: "error", title: "Error de conexión", text: "No se pudo establecer conexión con el servidor" });
    } else {
      swal({ icon: "error", title: "Error", text: error.response.data.error });
    }
    return Promise.reject(error);
  }
);

export default instance;
