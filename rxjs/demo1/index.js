function Producer() {    // 这个 if 只是避免使用者不小心把 Producer 当作函式来调用
    if(!(this instanceof Producer)) {
        throw new Error('请用 new Producer()!');      // 仿 ES6 行为可用： throw new Error('Class constructor Producer cannot be invoked without 'new'')
    }
    
    this.listeners = [];
}
    
// 加入监听的方法
Producer.prototype.addListener = function(listener) {    
    if(typeof listener === 'function') {
        this.listeners.push(listener)
    } else {
        throw new Error('listener 必须是 function')
    }
}
// 移除监听的方法
Producer.prototype.removeListener = function(listener) {
    this.listeners.splice(this.listeners.indexOf(listener), 1)
}

// 发送通知的方法
Producer.prototype.notify = function(message) {
    this.listeners.forEach(listener => {
        listener(message);
    })
}

var egghead = new Producer(); 
// new 出一个 Producer 实例叫 egghead
function listener1(message) {
    console.log(message + 'from listener1');
}

function listener2(message) {
    console.log(message + 'from listener2');
}

egghead.addListener(listener1); 
// 注册监听
egghead.addListener(listener2);

egghead.notify('A new course!!') // 当某件事情方法时，执行



// class Producer {
//     constructor() {
//         this.listeners = [];
//     }

//     addListener(listener) {
//         if(typeof listener === 'function') {
//             this.listeners.push(listener)
//         } else {
//             throw new Error('listener 必须是 function')
//         }
//     }
//     removeListener(listener) {
//         this.listeners.splice(this.listeners.indexOf(listener), 1)
//     }
//     notify(message) {
//         this.listeners.forEach(listener => {
//             listener(message);
//         })
//     }
// }