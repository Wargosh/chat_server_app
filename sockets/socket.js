const { io } = require('../index');

const Constants = require('../constants/constants');
const { validateJWT } = require('../helpers/jwt');
const { setUserStatusConnection, saveMessage } = require('../controllers/socket');


// Mensajes de Sockets
io.on(Constants.CONECCTION, (client) => {
    console.log('Cliente conectado');

    const [isValid, uid] = validateJWT(client.handshake.headers['x-token']);

    if (!isValid) return client.disconnect();

    console.log('Cliente autenticado');
    setUserStatusConnection(uid, true);

    // Join client to own room with uid
    client.join(uid);

    client.on(Constants.DISCONNECT, () => {
        console.log('Cliente desconectado');
        setUserStatusConnection(uid, false);
    });

    client.on(Constants.MSG_PRIVATE, async (payload) => {
        console.log('New msg', payload);

        await saveMessage(payload);

        io.to(payload.to).emit(Constants.MSG_PRIVATE, payload);
    });
});
