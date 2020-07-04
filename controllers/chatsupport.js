
module.exports = (io) => {
  let users = [];

  const addUser = (socket) => {
    if(socket.handshake.headers.origin === process.env.CLIENT_URL){
      users.push(socket.id)
    }
  }

  const removeUser = (socket, next) => {
      users.pop(socket.id)
      next()
  }

  io.on('connection', (socket) => {
        addUser(socket)
      io.emit('online', users.length);
      
      socket.on('disconnect', () => {
        removeUser(socket, () => {
          io.emit('online', users.length);
          })
      })
  });
}
