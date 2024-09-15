export function onlyAdmin(req, res, next){
    if(req.user.role === "Admin"){
        next()
    }else{
        res.status(403).send("Acceso denegado. No eres administrador.")
    }
}

export function onlyUser(req, res, next){
    if(req.user.role === "User"){
        next()
    }else{
        res.status(403).send("Acceso denegado. Sólo para administradores.")
    }
}