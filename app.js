const express = require('express')
const mongoose = require('mongoose')
const Address = require('./Address')

const app = express()
const PORT = 225

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose
  .connect("mongodb://localhost/addressbook", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('mongodb connected'))
  .catch((err) => {
    console.log(err);
  });

  app.get('/', (req, res) => {
    res.status(200).json({
      status: 200,
      message: 'addressbook service up and running!',
      timestamp: new Date(),
    });
  });

  app.post('/addressbook', async (req,res)=>{
      try {
          const {name, address} = req.body
          const result = await new Address({
              name: name,
              address: address
          }).save()

          res.status(200).json({
              msg: 'successfully add addressbook',
              data: result
          })

      } catch (error) {
          res.status(500).json({
              msg: 'internal server error'
          })
      }
  })

  app.get('/addressbook/list',async (req, res)=>{
      try {
          const address = await Address.find({})
          res.status(200).json({
              msg: 'addressbook succesfully found',
              data: address
          })
      } catch (error) {
          res.status(500).json({
              msg: 'internal server error'
          })
      }
  })

  app.listen(PORT, console.log(`listening on port ${PORT}`))