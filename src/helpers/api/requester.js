const requester = (thiss)=>{
    return async ({method, path, body}={
        method:'GET', 
        path:'/', 
        body:null, 
    }) => {
        try {
          // const response = await fetch(thiss.url+path, {
          return await fetch(thiss.url+path, {
            method : method,
            headers : {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization' : thiss.authToken instanceof String ? thiss.authToken : null,
            },
            body : body instanceof Object ? JSON.stringify(body) : null
          })
          // console.log("response : ", response)
          // return (await response.json())
          // return response
        } catch (err) {
          return {
              success: 0,
              // err
          }
        }
    }
}


export default requester
