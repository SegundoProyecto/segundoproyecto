const isLoggedIn = (req,res,next) => {
    console.log(res)
    if(req.user){
        next();
    }else{
        console.log("[Forbidden] User cannot access this page");
        res.redirect('/home');
    }
}

module.exports = isLoggedIn;