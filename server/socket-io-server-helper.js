let io = require('socket.io')(80);
io.socketMap = [];
io.on('connection',onConnection);
function onConnection(socket){
    io.socketMap[socket.id] = socket;
    //socket.on('socket-id-sync',function(){
        socket.emit('socket-id-sync',socket.id);
    //});
    socket.on('call-server',callServer);
}
function callClient(name,tick){
    //tick.name(-)
    //tick.socketId
    //tick.args
    //tick.invert = false
    tick.name = name;
    if(typeof tick.socketId === Array){
        if(tick.invert === undefined || tick.invert === false){
            let socketIdArray = [];
            for(let idx in tick.socketId){
                let socketId = tick.socketId[idx];
                let socket = io.socketMap[socketId];
                socket.emit('call-client',tick);
            }
        }else{
            if(tick.socketId.length === 0){
                io.emit('call-client',tick);
            }else{
                //TODO
                console.log('tick.invert with socketIdArray is developing');
            }
        }
    }else{
        if(tick.invert === undefined ||tick.invert === false){
            let socket = io.socketMap[tick.socketId];
            socket.emit('call-client',tick);
        }else{
            let socket = io.socketMap[tick.socketId];
            socket.broadcast.emit('call-client',tick);
        }
    }
}
io.callClient = callClient;
function callServer(tick){
    //tick.name
    //tick.socketId
    //tick.args
    require('./'+tick.name+'.js').main(tick,io);
}

//io.listen(3000);
console.log('server ready in port 3000');



