import { useHistory } from 'react-router';



export default function Test2(){

    let history=useHistory();


    function handleTest(){
        history.push("/");
    }

    return(
        <div>
            <button type="button" class="btn btn-danger" onClick={handleTest}>Danger</button>
        </div>
    )
}