import { useHistory } from 'react-router';


export default function Test1(){


    let history=useHistory();



    function handleTest(){
        history.push("/testHistory");
    }

    return(
        <div>
          <button type="button" class="btn btn-primary" onClick={handleTest}>Primary</button>
        </div>

    )
}