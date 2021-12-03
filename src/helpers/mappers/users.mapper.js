export default (el)=>{return{
    id: el.id_user,
    language: el.user_language,
    id_client: el.fk_id_client,
    id_level: el.fk_id_level,
    ...el
}}