import API from "helpers/api";
import userActions from "store/actions/userActions";

const api = new API({});

const controller = {
  login:
    ({ dispatch, history, body }) =>
    async () => {
      const res = await api.login({ body });
      dispatch(userActions.login(res.user));
      localStorage.setItem("authToken",res.user.authToken)
      history.push("/");
    },
  logout:
    ({ dispatch, history }) =>
    async () => {
      const res = await api.logout();
      dispatch(userActions.logout());
      localStorage.setItem("authToken","")
      history.push("/");
    },
};
export default controller;
