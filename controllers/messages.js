import * as messageService from '../services/messages.js';


export const encryptMessage=async(req,res)=>{
    try {
    const { mysqlConn, mongoDbConn } = req;
    const message = await messageService.encryptMessage(mysqlConn, mongoDbConn, req.body);
    res.status(201).json(message);
  } catch (error) {
   
    if (error.message === 'Invalid product ID' || error.message === 'message not found') {
      return res.status(404).json({ error: error.message }); 
    }
    res.status(500).json({ error: error.message });
  }
}
export const decryptMessage=async(req,res)=>{
    try {
    const { mysqlConn, mongoDbConn } = req;
    const message = await messageService.decryptMessage(mysqlConn, mongoDbConn, req.body);
    res.status(201).json(message);
  } catch (error) {
    if (error.message === 'Invalid product ID' || error.message === 'message not found') {
      return res.status(404).json({ error: error.message }); 
    }
    res.status(500).json({ error: error.message });
  }
}