const expressapp = require('express')();
const router = express.Router();
const path = require('path');

expressapp.use(express.static(path.join(__dirname+'/public/')));

router.get('/createRoom',(req,res)=>{
  res.send(__dirname+'/createRoom.html');
});

router.get('/joinRoom',(req,res)=>{
  res.send(__dirname+'/joinRoom.html');
});

router.get('/favouriteSettings',(req,res)=>{
  res.send(__dirname+'/favouriteSettings.html');
});

module.exports = router;