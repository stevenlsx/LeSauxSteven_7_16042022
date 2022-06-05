import { createStore } from "vuex";
import axios from "axios";
import router from "@/router/";

export default createStore({
  state: {
    userCoData: {},
    userCoToken: null,
    userCoId: null,
  },
  mutations: {
    userData(state, data) {
      state.userCoData = data;
      state.userCoToken = state.userCoData.token;
      state.userCoId = state.userCoData.user.id;
      console.log(state.userCoId);
    },
  },
  actions: {
    login(context, payload) {
      axios
        .post("http://localhost:3000/api/user/login", payload)
        .then((res) => {
          router.push("/Home");
          context.commit("userData", res.data);
        })
        .catch((error) => console.log(error));
    },
  },
});
