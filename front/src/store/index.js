import { createStore } from "vuex";
import axios from "axios";
import router from "@/router/";

export default createStore({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    userData(state, data) {
      state.user = data.user;
      state.token = data.token;
    },
  },
  actions: {
    login(context, payload) {
      axios
        .post("http://localhost:3000/api/user/login", payload)
        .then((res) => {
          axios.defaults.headers.common[
            "Authorization"
          ] = `bearer ${res.data.token}`;
          localStorage.token = res.data.token;
          context.commit("userData", res.data);
          router.push("/Home");
        })
        .catch((error) => console.log(error));
    },
  },
});
