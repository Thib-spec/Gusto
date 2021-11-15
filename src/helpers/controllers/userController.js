import API from "helpers/api"
import userActions from "store/actions/userActions";

const api = new API({})

const controller = {
    login: ({dispatch, history, body}) => async ()=>{
        const res = await api.login({body})
        dispatch(userActions.login(res.user))
        history.push("/");
    }
}
export default controller