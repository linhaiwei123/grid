let main = function(tick,io){
    console.log(tick);
    io.callClient('test-reply',{
        socketId:tick.socketId,
        args:'test-reply-args'
    });
}

module.exports = {main};