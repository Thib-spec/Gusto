import "CSS/categories.scss"
import {Modal, Button} from 'react-bootstrap'
import UploadForm from "Components/FormComponent/UploadForm"
import React, { useState, useEffect }  from 'react'
import CategorieDropDownComponent from "Components/CategoryComponent/CategorieDropDownComponent"
import axios from "axios";
import UploadContainer from "Components/GestionPhoto/UploadContainer"


export default function CategoriesPage(){

    //On récupère la liste des catégories
    const [allCategories, setallCategories] = useState([]);
    useEffect(() => {
        axios.get("http://api.gustosolutions.fr/api/category")
            .then((res) =>{setallCategories(res.data)
            })
            .catch((err) => console.log(err));
    }, [])


    //Add catégorie

    //show the addCategory modal or not
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //hook value of added categorie
    const[catégorieAdd,setCategorieAdd]=useState("")
    //when the client add a categorie and save it,
    function handleAddCatégorie(){
        let token = localStorage.getItem("authToken")
        let config = {
            headers: {
              "Authorization": "Bearer "+token,
            }
          }
        try{
            //GetElementById pour les réponse du formulaire 
            let a=document.getElementById('labelCatégorie').value
            let b=document.getElementById('descriptionCategorie').value

            axios.post("http://api.gustosolutions.fr/api/category",  {
                "label":a,
                "image": "imageurl",
                "description" : b,
                
            },config)
            .then((res) => {
                console.log(res);
                setallCategories([...allCategories,res.data])
               

            })
            .catch((err) => {
                console.log(err);
            });

            handleClose()
        }
        catch(e){
            console.log(e)
        }
    }

    //Fonction appelé lors de la suppression d'une catégorie afin de supprimer l'affichage de la catégorie 
    const refreshCategorieDel = (data) => {
        const array= new Array()
        allCategories.map((el)=>

            data.id_category!=el.id_category?array.push(el):false
        )
        setallCategories(array)
    }

    //Fonction appelé lors d'une mise à jour des information d'une catégorie 
    const refreshCategorieUpdate = (data) => {
        const array= new Array()
        allCategories.map((el)=>
            data.id_category!=el.id_category?array.push(el):array.push(data)
        )
        setallCategories(array)
    }
    
    
    return(
        <div className="categories-container">
            <div className="categories-list">
                <button type="button" class="btn btn-warning categories-list-element-sub-buttons-element-addButton" onClick={handleShow}>Ajouter une catégorie</button>

                {allCategories.map((categorie) => (
                    
                    <CategorieDropDownComponent func1={refreshCategorieUpdate} func={refreshCategorieDel} categorie={categorie} key={categorie.id_category}/>
                ))}
                
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter une catégorie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="addProduct-container">
                        <div className="addProduct-container-form">
                            <input type="text" class="form-control" id="labelCatégorie" placeholder="Nom de la catégorie"/>
                            <textarea type="text" className="form-control textAreaResize" id="descriptionCategorie" placeholder="Description"></textarea>
                            <UploadContainer/>
                        </div>
                    </div> 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={()=>handleAddCatégorie()}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
                
}