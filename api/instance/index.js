import axios from "axios";
// import swal from "sweetalert";
import { useCounterStore } from "@/stores/counter";
import { useAuthStore } from "@/stores/auth";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  timeout: 5000,
});

instance.interceptors.request.use((config) => {
  const useAuth = useAuthStore();
  const useCounter = useCounterStore();
  const token = useAuth.token;
  console.log(token);
  if (useAuth.isLoggedIn) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  useCounter.setCounter(+1);
  return config;
});

instance.interceptors.response.use(
  (res) => {
    const useCounter = useCounterStore();
    useCounter.setCounter(-1);
    return res;
  },
  (error) => {
    const useCounter = useCounterStore();
    useCounter.setCounter(-1);
    console.log(error);
    swal("Error!");
    return error;
  }
);

export default instance;
