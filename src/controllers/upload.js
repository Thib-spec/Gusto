const uploadFile = require("../middleware/upload");

exports.upload =  async (req, res) => {
  
    
    try {
        await uploadFile(req, res);
    
        if (req.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
        }
    
        res.status(200).send({
        message: "Uploaded the file successfully",
        });
    } catch (err) {
        res.status(500).send({
        message: `Could not upload the file: ${req.file}. ${err}`,
        });
    }
      
}


