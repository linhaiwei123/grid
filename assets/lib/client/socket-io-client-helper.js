cc.Class({
    extends: cc.Component,
    onLoad(){
        //let io = require('socket.io');
        window.ioAdapter = null;
        let ioAdapter = {};
        let socket = window.io.connect('http://localhost:80');
        ioAdapter.socket = socket;

        ioAdapter.bindFuncArray = [];

        ioAdapter.bindFunc = function(name,cb){
            ioAdapter.bindFuncArray[name] = cb;
        }

        ioAdapter.unbindFunc = function(name){
            delete ioAdapter.bindFuncArray[name]
        }

        ioAdapter.socket.on('call-client',function(tick){
            if(ioAdapter.bindFuncArray[tick.name] === undefined){return;}
            ioAdapter.bindFuncArray[tick.name](tick.args);
        })

        ioAdapter.callServer = function(name,args){
            let tick = {
                name:name,
                socketId:ioAdapter.socketId,
                args:args,
            }
            ioAdapter.socket.emit('call-server',tick);
        },

        ioAdapter.socket.on('socket-id-sync',function(data){
            ioAdapter.socketId = data;
            window.ioAdapter = ioAdapter;
            cc.find('Canvas').emit('socket-io-ready');
        })
        //socket.emit('socket-id-sync');
    }   
});






