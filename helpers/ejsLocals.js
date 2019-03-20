module.exports=function(req, res, next) {
    
    if(req.session.sideMenu!==undefined){
        res.locals.sideMenu = {
            hide:true
        };
    }else{
        res.locals.sideMenu = {
            hide:false
        };
    }
    if(req.session.login_user!=undefined){
        res.locals.Auth = {
            user:req.session.login_user,
            status:true
        };
    }else{
        res.locals.Auth = {
            status:false
        };
    }
    next();
};