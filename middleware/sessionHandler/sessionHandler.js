function clientSide(req, res, next) {
    next();
}
function adminSide(req, res, next) {
    next();
}


module.exports = {
    client: clientSide,
    admin: adminSide
}