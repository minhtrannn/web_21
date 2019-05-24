const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const NameModel = require("./NameModels");

app.use(bodyParser.urlencoded({extended:false}));

mongoose.connect(
  "mongodb://localhost/Score",
  {useNewUrlParser:true},
  function(err)
  {
    if(err) console.log(err);
    else console.log("Connect OK!");
  }
)

app.use('/',express.static(__dirname+'/'));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/CreateScreen.html");
})


app.post('/games',function(req,res){
    const { name1, name2, name3, name4 } = req.body;
    NameModel.create({
      name1: name1,
      name2: name2,
      name3: name3,
      name4: name4,
    },function(err,docCreated){
      if(err) console.log(err);
      else res.redirect('/PlayerScreen.html');
    })
})
app.get("/randomquestion", (req, res) => {
	NameModel.countDocuments({}, (err, totalDoc) => {
		if(err) console.log(err)
		else {
      // console.log(totalDoc);
      const numberIndex = totalDoc - 1;
      // console.log(randomIndex);
			NameModel
				.findOne({})
				.skip(numberIndex)
				.exec((err, name) => {
					if(err) console.log(err)
					else res.json(name);
				});
		}
	});
});
// app.get('/info',(req,res) => {
//   NameModel.countDocuments({},(err,totalDoc) =>
//   {
//       if(err) console.log(err)
//       else 
//       {
//         res.json(name1);
//       }
//   })
// })

app.listen(2020,function(error){
    if(error) console.log(error);
    else console.log("Server start success!!!");
});
