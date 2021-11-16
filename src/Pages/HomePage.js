import CheckboxForm from 'Components/FormComponent/CheckboxForm';
import { useHistory } from 'react-router';

import "CSS/test.css"
import 'react-dropdown/style.css';

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
       <div className="">
           

            
       </div>
    )
}