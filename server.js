const express = require("express")   //importing express library
const app = express();               //calling the express() function and assigning it to the variable called app
const bcrypt = require("bcrypt")
const contactUs = require("./controllers/contact-us");
const passport = require("passport");
const initializePassport = require("./passport-config");
initializePassport(passport);
const users =[];

//This is used to tell the node application to get/extract the form data from the text fields
app.use(express.urlencoded({extended:false})); 


//Setting the view engine to ejs. In order to use ejs syntax, we have to tell our Server that we are using ejs
//this is why we installed view engine ejs dependency.
app.set("view-engine", "ejs"); 

//Now our view-engine is set to ejs, we can use it in our template. For example, lets say we want to pass a user
//Inside the HTML page we have to pass the user variable like <%= user %> to render the varialbe


app.get('/', (req,res) => {   //if no route is setup for the application we will get Cannon GET / in the HTML
    console.log("abhilash is bad");
    res.render("index.ejs",{user: "siva"});  

    
})



//Creating routes for login page
app.get("/login", (req, res)=>{
    res.render("login.ejs");
})

//Creating route for registration page
app.get("/register", (req,res) => {
    res.render("register.ejs");
})





//Implementing the POST methods

app.post("/login", (req,res)=>{
    req.body.username;
    
})


app.post("/register", async (req,res)=>{    //aysnc function needs to be waited until it resolve promise so, we used await which waits until hashing is done

    try{
        const hasedPassword = await bcrypt.hash(req.body.password, 10); //how many time we want to generate the hash like how secure so, 10
        //we are storing the user information in the list variable we created at the top but, in PROD ENV these details will be stored in DB
        users.push({
            id: Date.now().toString(),
            name: req.body.username,
            email: req.body.email,
            password: hasedPassword
        })
        res.redirect("/login");
    } catch{
        res.redirect("/register");
    }

    console.log(users);

})

app.listen(3000); //To start the server --> npm run devStart (devStart is configured in the package.json)