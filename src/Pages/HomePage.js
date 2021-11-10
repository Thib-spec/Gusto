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
       <div>
           <button type="button" class="btn btn-primary" onClick={handleLogin}>LoginPage</button>
           <button type="button" class="btn btn-primary" onClick={handleProducts}>ProductPage</button>
           <button type="button" class="btn btn-primary" onClick={handleCategories}>CategoriesPage</button>
       </div> 
    )
}