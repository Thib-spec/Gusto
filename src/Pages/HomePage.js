import { useHistory } from 'react-router';



export default function HomePage(){

    let history=useHistory();

    function handleLogin(){
        history.push("/Login");
    }
    function handleProducts(){
        history.push("/Products");
    }
    function handleCategories(){
        history.push("/Categories");
    }
    


    return(
       <div></div>
    )
}