import React, { useEffect,useState } from "react"
import axios from "axios";



export default function Test(){
    const [allCategories, setallCategories] = useState([]);
    useEffect(() => {
        axios.get("http://api.gustosolutions.fr/api/category")
            .then((res) =>{setallCategories(res.data)
            })
            .catch((err) => console.log(err));
    }, [])


    
    const list =[allCategories.map((element)=>element.label)] 
    console.log("data",list)


    const tabinit = new Array()
    list[0].map((el)=>tabinit.push([false]))
    
        // tabinit[step]=[list[0][step],false]
     

    console.log(tabinit,typeof(tabinit))
    const[openCategories, setopenCategories] = useState(tabinit);
    console.log("testopen : ",openCategories)


    return(
    <div onClick={()=>setopenCategories(tabinit)}>
        {allCategories.map((categorie)=>
            <div>
                test
            </div>
        )
        }
           
    </div>
    )
}