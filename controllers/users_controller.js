const User = require('../models/user');

module.exports.profile = (req, res)=>{
    return res.render('users_profile', {
        title : 'Users Profile'
    });
}

//render the sign up page
module.exports.signup = (req, res)=>{
    res.render('user_sign_up', {
        title : 'Codeial | Sign Up'
    });
}

//render the sign in page
module.exports.signin = (req, res)=>{
    res.render('user_log_in', {
        title : 'Codeial | Sign In'
    });
}


//get the sign up data
module.exports.create = (req, res)=>{
    //check if password and confirm password match
    if(req.body.password !== req.body.confirmPassword){
        return res.redirect('back');    
    }

    //find similar user id
    User.findOne({email : req.body.email}, (err, user)=>{
        if(err){
            console.log('error in finding user in sign up');
            return; 
        }

        if(!user){//if user does not exist in the database
                User.create(req.body, (err, user)=>{
                    if(err){
                        console.log('Error in creating user : ', err);
                        return;
                    }

                    //go to sign-in page when new user is created
                    return res.redirect('/users/sign-in');  
                });
        }
        else
        {   
            //user exists already
            return res.redirect('back');
        }
    })
}

//sign in and create a session for the user
module.exports.createSession = (req, res)=>{
    
    
    return res.redirect('/');
}

module.exports.logout = (req, res)=>{
    
    res.clearCookie('user_id');

    return res.redirect('/users/sign-in');
}