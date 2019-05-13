// var observable = Rx.Observable
//     .create(function(observer) {
//         observer.next('Jerry'); // RxJS 4.x 以前的版本用 onNext
//         observer.next('Anna');
//     })

const { Observable, range, of, from, fromEvent } = rxjs;
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

// var source = fromEvent(document.getElementById("app"), 'click');
var source = fromEvent(document.getElementById("input"), 'click');
source.subscribe({    
    next: function(value) {        console.log(value)},    
    complete: function() {        console.log('complete!');},    
    error: function(error) {        console.log(error)}
});

// source.subscribe({
//     next: function(val){ console.log(val)},
//     complete: function(){ console.log("complete")},
//     error:function(error) {console.log('Error: ', error)}
// })


//=============================================================


//=============================================================



//=============================================================


//=============================================================


//=============================================================

