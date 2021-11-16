import API from "helpers/api";
import userActions from "store/actions/userActions";

const api = new API({fake:true});

const controller = {
  login:
    ({ dispatch, history, body }) =>
    async () => {
      const res = await api.login({ body });
      dispatch(userActions.login(res));
      localStorage.setItem("authToken",res.authToken)
      history.push("/");
    },
  logout:
    ({ dispatch, history }) =>
    async () => {
      const res = await api.logout();
      dispatch(userActions.logout());
      localStorage.removeItem("authToken")
      history.push("/");
    },
    getInfo:
    ({ dispatch }) =>
    async () => {
      const res = await api.getInfo();
      dispatch(userActions.update(res));
    },
};
export default controller;
