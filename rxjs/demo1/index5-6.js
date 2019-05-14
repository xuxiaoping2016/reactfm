// var observable = Rx.Observable
//     .create(function(observer) {
//         observer.next('Jerry'); // RxJS 4.x 以前的版本用 onNext
//         observer.next('Anna');
//     })

const { Observable, range, of, from, fromEvent, fromEventPattern,empty, never } = rxjs;
const { map, filter } = rxjs.operators;

// range(1, 200).pipe(
//     filter(x => x % 2 === 1),
//     map(x => x + x)
//   ).subscribe(x => console.log(x));


//======================================================
// var observable = Observable.create(function(observer) {
//     observer.next('Jerry'); // RxJS 4.x 以前的版本用 onNext
//     observer.next('Anna');
//     setTimeout(() => {
//         observer.next('RxJS 30 days!');
//     }, 30)
// })
    
// console.log("start")
// observable.subscribe(function(value) {
//     console.log(value);
// })
// console.log('end');
//=======================================================
// var observable = Observable
//     .create(function(observer) {
//             observer.next('Jerry');
//             observer.next('Anna');
//             observer.complete();
//             observer.next('not work');
//     })
//     // 宣告一个观察者，具备 next, error, complete 三个方法
//     var observer = {
//         next: function(value) {console.log(value);},   
//         error: function(error) {console.log(error)},    
//         complete: function() {console.log('complete')}
//     }
// // 用我们定义好的观察者，来订阅这个 observable  
// observable.subscribe(observer)

//=============================================================
// var observable = Observable
//   .create(function(observer) {    
//     try {
//       observer.next('Jerry');
//       observer.next('Anna');      
//       throw 'some exception';
//     } catch(e) {
//       observer.error(e)
//     }
//   });
//   // 宣告一个观察者，具备 next, error, complete 三个方法
//   var observer = {    next: function(value) {        console.log(value);
//     },    error: function(error) {        console.log('Error: ', error)
//     },    complete: function() {        console.log('complete')
//     }
// }// 用我们定义好的观察者，来订阅这个 observable  
// observable.subscribe(observer)


//=============================================================
// var source = of(1,2,3)
// var source = from(["jhon",'fdfdf'])  // jhon fdfdf complete
// var source = from("zxcvbnn") // z x c v b n n complete

// var source = from(new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('Hello RxJS!');
//     },3000)
//   }))

// var source = fromEvent(document.body, 'click');
// var source = fromEvent(document.getElementById("app"), 'click');
// var source = fromEvent(document.getElementById("input"), 'click');

// source.subscribe({
//     next: function(val){ console.log(val)},
//     complete: function(){ console.log("complete")},
//     error:function(error) {console.log('Error: ', error)}
// })


//=============================================================
class Producer {    
    constructor() {
        this.listeners = [];
    }
    addListener(listener) {
        if(typeof listener === 'function') {
            this.listeners.push(listener)
        } else {
            throw new Error('listener 必须是 function')
        }
    }
    removeListener(listener) {
        this.listeners.splice(this.listeners.indexOf(listener), 1)
    }
    notify(message) {
        this.listeners.forEach(listener => {
            listener(message);
        })
    }
}// ------- 以上都是之前的程式码 -------- //
var egghead = new Producer(); 
// egghead 同时具有 注册监听者及移除监听者 两种方法
var source = fromEventPattern(
    (handler) => egghead.addListener(handler), 
    (handler) => egghead.removeListener(handler)
);

// source.subscribe({
//     next: function(val){ console.log(val)},
//     complete: function(){ console.log("complete")},
//     error:function(error) {console.log('Error: ', error)}
// })

// egghead.notify('Hello! Can you hear me?');// Hello! Can you hear me?

//==============================================================
// var source = rxjs.empty()
// var source = rxjs.never()
// var source = rxjs.throw('oop')
// var source = rxjs.interval(1000);
var source = rxjs.timer(1000,1000);
var subscription = source.subscribe({
    next: function(val){ console.log(val)},
    complete: function(){ console.log("complete")},
    error:function(error) {console.log('Error: ', error)}
})
setTimeout(()=>{
    subscription.unsubscribe()
},5000)
//=============================================================


//=============================================================


//=============================================================


//=============================================================

// this.subscribeScoll = fromEvent(window, 'scroll')
//       .debounceTime(50)
//       .throttle(ev => Observable.interval(50))
//       .subscribe((event) => {
//         this.onWindowScroll();
//       })



