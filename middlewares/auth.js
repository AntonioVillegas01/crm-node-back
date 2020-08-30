const jwt = require( 'jsonwebtoken' );

module.exports = ( req, res, next ) => {

    //autorizacion por el header
    const authHeader = req.get('Authorization');

    if(!authHeader) {
        const error = new Error('No autenticado, no hay Token');
        error.statusCode = 401;
        throw error;
    }

    //obtener el token y verificarlo
    const token = authHeader.split(' ')[1];
    let revisarToken;
    try{
        revisarToken = jwt.verify(token,'LLAVESECRETA');
    }catch( e ) {
        console.log('chingo a su madre'+ e)
        e.statusCode = 500;
        throw e;
    }

    //Si es token valido pero hay un error
    if(!revisarToken){
        const error = new Error('No autenticado, error de token');
        error.statusCode = 401;
        throw error;
    }

    next();
}