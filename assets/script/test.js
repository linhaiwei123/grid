cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad() {
        cc.find('Canvas').on('socket-io-ready',this.onSocketIOReady,this)
    },

    onSocketIOReady(){
        window.ioAdapter.bindFunc('test-reply',this.onTestReply);
        window.ioAdapter.callServer('test',{
            hello:'world'
        });
    },

    onTestReply(args){
        console.log(args);
    }

});
