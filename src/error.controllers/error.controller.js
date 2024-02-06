function handleErrors(err, req, res, next) {
    if(err.status){
        res.status(err.status).send({msg: err.msg})
    } else {
        res.status(500).send('Internal server error')
    }
}

module.exports = handleErrors;