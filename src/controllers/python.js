exports.callName = (req, res) => { 
      
    var spawn = require("child_process").spawn; 
    
    var process = spawn('python',["./hello.py", 
                            req.query.firstname, 
                            req.query.lastname] ); 
  
    
    
    process.stdout.on('data', function(data) { 
        res.send(data.toString()); 
    } ) 
} 