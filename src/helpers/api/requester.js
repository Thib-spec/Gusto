const requester = (thiss)=>{
    return async ({method, path, body}={
        method:'GET', 
        path:'/', 
        body:null, 
    }) => {
        try {
          const response = await fetch(thiss.url+path, {
            method : method,
            headers : {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization' : thiss.authToken instanceof String ? thiss.authToken : null,
            },
            body : body instanceof Object ? JSON.stringify(body) : null
          })
          return (await response.json())
        } catch (err) {
          return {
              success: 0,
              err
          }
        }
    }
}


export default requester
