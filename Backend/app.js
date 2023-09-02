
// http://localhost:7070

const Express = require("express")
const app = Express()
app.use(Express.urlencoded()) 
const Bcrypt = require("bcrypt")
const cookiesParser = require('cookie-parser')
const session = require("express-session")
const MongodbSession = require("connect-mongodb-session")
const connectedData = MongodbSession(session)
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(cookiesParser())
const multer = require('multer')
const Cors = require("cors")
app.use(Cors())
app.use('/uploads',Express.static('uploads'))

const Mongoose = require("mongoose")

const storeData = new connectedData({
    uri: "mongodb://127.0.0.1:27017",
    databaseName: "blog-database",
    collection:"session-data"
})

app.use(session({
    key:'email',
    secret:"HJK123%^$",
    resave: true,
    saveUninitialized: false, 
    store: storeData

}))

Mongoose.connect("mongodb://127.0.0.1:27017/blog-database")

const SignupSchema = new Mongoose.Schema({
    username:String,
    email:String,
    password:String,
    confirmPassword:String

})
const SignupData = Mongoose.model("signup", SignupSchema)

app.post("/signup", async function(request, response)
{
    //collect json data which is comming from the frontend
    const message = request.body.message
    console.log(message)
    if(message.password === message.confirmpassword)
    {
       const securedPassword = await Bcrypt.hash(message.password, 15)
        // salt
        const signupData = new SignupData({
            username: message.username,
            email: message.email,
            password: securedPassword
        })
        signupData.save()
    }
    else
    {
        console.log("Passwords are not Equal!!!")
    }
    response.send("You task saved successfully!!")
})

app.get("/signup/data", async function(request, response){
    const findSingup = await SignupData.find()
    response.send(findSingup)
})




app.post("/", async(request, response)=>{
    
    const {email, password} = request.body
    // console.log(request.body)
    const output = await SignupData.findOne({email:email})
    if(output == null)
        {
            response.json("not exist")
        }
        else{
        
        const databasePassword = output.password  
            //somehow we need to check the plain text == hashed password
           const result = await Bcrypt.compare(password, databasePassword)

           if(result == true)
           {
                console.log("password matched")

                //create details in the session
                request.session.status = { email: output.email, isLoggedIn: true }
                // request.session.email = userEmail
                response.json("exist")
           }
           else
           {
                console.log("password not matched")
                response.json("not exist")
           }
        }
}) 

//create Post Schema

const CreatePostSchema =  new Mongoose.Schema({
    userEmail:String,
    title:String,
    imageUrl: String,
    description:String
})
const CreatePostData = Mongoose.model("post",CreatePostSchema)

const  storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
 
const upload = multer({ storage: storage })  

app.post("/create/post", upload.single('image'), function(request, response)
{
    //collect json data which is comming from the frontend
    const message = request.body
    console.log(message)
    // const Image = request.body.image

    if(message)
    {
        const CreatePostSave = new  CreatePostData({
            userEmail:request.body.email,
            title:request.body.title,
            imageUrl:request.file.originalname,
            description:request.body.description
        })
        CreatePostSave.save()
        .then((res)=>{
            console.log("image is saved")
        })
        .catch((error)=>{
            console.log(error,"error")
        })
    }

    response.send("You task saved successfully!!")
    
})
app.get("/display/post", function(request, response)
{
    const title = CreatePostData.find()
    console.log(title)

    CreatePostData.find().then(function(output)
    {
        response.send(output)
        // console.log(output)
    }
    ).catch(function(error)
    {
        response.send(error)
    })
})

//delete Post

app.delete("/delete/:id", function(request, response)
{
    const id = request.params.id
    console.log(id)

   try{
    CreatePostData.deleteOne({_id:id})
    response.send({status:"OK", data: "Deleted"})
   }
   catch (error){
        console.log(error)
   }
    // CreatePostData.deleteOne({_id:id}).then(function(output)
    // {
    //     response.send(output)
    // }
    // ).catch(function(error)
    // {
    //     response.send(error)
    // })
    
})


//create Comment Schema


const CreateCommentSchema =  new Mongoose.Schema({
    userEmail:String,
    postId:String,
    comment: String,
})
const CreateCommentData = Mongoose.model("comment",CreateCommentSchema)


app.post("/create/comment", function(request, response)
{
    //collect json data which is comming from the frontend
    const message = request.body.message
    console.log(message)
    // const Image = request.body.image

    if(message)
    {
        const CreateCommentSave = new  CreateCommentData({
            userEmail:message.email,
            postId:message.postId,
            comment:message.comment
        })
        CreateCommentSave.save()
        .then((res)=>{
            console.log("image is saved")
        })
        .catch((error)=>{
            console.log(error,"error")
        })
       
    }
    response.send("You task saved successfully!!"+message)
    
})


app.get("/comment/data", async function(request, response){
    const findSingup = await CreateCommentData.find()
    response.send(findSingup)
})



app.listen(5000, function()
{
    console.log("server is running at 5000")
})