const mongoose = require("mongoose");
const { Roles } = require("./constants");

// the link below contained the username and password, so I had to clear it out of the link. The database part won't work.
const MongoDB_URL = "mongodb+srv://@sikewearcluster.r7rsoch.mongodb.net/?retryWrites=true&w=majority";


const connectDB = async () => {
    await mongoose.connect(MongoDB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}


connectDB();

const newAccountSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String,
});



const AccountCreation = mongoose.model("Accounts", newAccountSchema);

const AccountProvider = class {

    async setMemberAdmin(email) {

    }

    async getUserRole(email, password) {

        return await AccountCreation.findOne({ email, password }).then(result => result.role).catch(_ => null);
        //return userRole;
    }

    async getUserName(email, password) {
        return await AccountCreation.findOne({ email, password }).then(result => result.firstName + " " + result.lastName).catch(_ => null);
    }


    // {res == "found" ? [navigate("/"),localStorage.setItem("user",true)]:res}
    //checks to see if user exists (sign in)
    async checkMembers(email, password) {

        let result;

        result = await AccountCreation.count({ email: email, password: password });

        return result;
    }

    //checks to see if user has an account already (create account)
    async checkMemberExists(email) {

        let result;

        result = await AccountCreation.count({ email: email });

        return result;

    }



    login(email, password) {
        // this doesn't do shit. sometgin else acually handles the log in functionality
    }

    createAccount(firstName, lastName, email, password, role) {

        const newAccount = new AccountCreation({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            role: role
        });
        newAccount.save();

    }

    updateRole(email, newRole) {
        AccountCreation.updateOne(
            { email: { $eq: email } },
            { $set: { role: newRole } },
            function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Updated Role");
                }
            }
        )
    }

    forgotPassword(email, newPassword) {
        //new password update
        const update_user_info = mongoose.model("Accounts", newAccountSchema);

        // doing the query to update password. 
        update_user_info.updateOne(
            { email: { $eq: email } },
            { $set: { password: newPassword } },
            function (err, result) {
                if (err) {
                    console.log("Something went wrong");
                }
                else {
                    console.log("updated:", newPassword)
                }
            }
        )
    }
}
module.exports = { AccountProvider };