const express = require('express');
const fs = require("fs")
const app = express();
const { AccountProvider } = require("./accountProvider"); //access mongodb js file
const { ShoesCreator } = require("./shoesProvider");
const { Roles } = require("./constants");
const { off } = require('process');
//allows for server to have access to post/put requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const provider = new AccountProvider(); //mongodb class instance

const creator = new ShoesCreator();

// creator.addShoe("patelom1022@gmail.com", "Sike", "Sir Force", 10, "shoe1", 124.99, 100, "Black");
// creator.addShoe("gbarn","SIKE","oldskool",11,"this",1000,100,"purple");
//  app.post("/getName", async (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     console.log(email + " " + password)
//     const name = await provider.getUserName(email, password);
//     res.json({message: name});;
//  }); 

app.get("/members", (req, res) => { //gets all members 

})

app.post("/apiPost", async (req, res) => { //sign in post request
    const email = req.body.email; //get emails
    const password = req.body.password; //get password

    console.log(email, password);

    var role = await provider.getUserRole(email, password);
    console.log(role);

    provider.checkMembers(email, password)//check membership
        .then(result => {
            if (result >= 1) {
                if (role === Roles.User) {
                    res.json({ message: Roles.User }); //respond with success message
                } else if (role === Roles.Manufacturer) {
                    res.json({ message: Roles.Manufacturer }); //respond with success message
                } else if (role === Roles.Admin) {
                    res.json({ message: Roles.Admin }); //respond with success message
                } else {
                    res.json({ message: "Contact Sike Devs, You have an invalid role!" });
                }
                //res.json({ message: "found" }); //respond with success message
            } else {
                res.json({ message: "Account not found" }); //respond with error message
            }
        })


})


app.post("/apiNewAccount", (req, res) => { //create new account post request
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    console.log(email, password);

    provider.checkMemberExists(email)
        .then(result => {
            if (result >= 1) { //account already exists
                res.json({ message: "Account already exists" }); //respond with error message
            }
            else { //account doesn't exist
                provider.createAccount(firstName, lastName, email, password, "user"); //save account to database
                res.json({ message: "Account created successfully" }); //respond with success message
            }
        })


})


app.post("/apiForgotPassword", (req, res) => { //forgot password post request (in progress)
    const email = req.body.email;
    const newPassword = req.body.newPassword;

    console.log(email);
    console.log(newPassword);

    provider.checkMemberExists(email)

        .then(result => {
            if (result == 1) {
                res.json({ message: "An email has been sent to update password" });
                provider.forgotPassword(email, newPassword);
            }
            else {
                res.json({ message: "Account not found" });
            }
        })
});

app.post("/api/updateRole", (req, res) => {
    const email = req.body.email;
    const newRole = req.body.role;
    console.log(newRole);
    provider.checkMemberExists(email)
        .then(result => {
            if (result == 1) {
                res.json({ message: "Role has been changed!" });
                provider.updateRole(email, newRole);

            } else {
                res.json({ message: "Account Not Found!" });
            }
        })
});

app.post("/api/addShoe", (req, res) => {
    const providerEmail = req.body.email;
    const brandName = req.body.brand;
    const shoeName = req.body.shoeName;
    const shoeSize = req.body.shoeSize;
    const shoePicURL = req.body.shoePicURL;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const color = req.body.color;


    creator.checkShoeExists(providerEmail, brandName, shoeName, shoeSize, shoePicURL, price, quantity, color)
        .then(result => {
            if (result == 1) {
                // creator.updateShoe();
                res.json({ message: "Shoe already exists!" });
            }
            else {
                creator.addShoe(providerEmail, brandName, shoeName, shoeSize, shoePicURL, price, quantity, color);
                res.json({ message: "Shoe has been added!" });
                return;
            }
        })
});

app.get('/shop/shoes', (req, res) => {
    creator.getShoes().then(result => res.json(result));
});


app.listen(3081, () => {
    console.log(`listening at http://localhost:${3081}`);
});

process.on("unhandledRejection", err => {
    console.log(`an error occurred: ${err.message}`)
})