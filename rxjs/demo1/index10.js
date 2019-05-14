
const { Observable, create, range, of, from, fromEvent, fromEventPattern,empty, never } = rxjs;
const { take,combineLatest, zip, withLatestFrom } = rxjs.operators;

// var source = rxjs.interval(500).pipe(take(3));
// var newest = rxjs.interval(300).pipe(take(6));
// var example = source.pipe( // 0// 1// 2// 3// 4// 5// 6// 7// complete
//     combineLatest(newest, (x, y) => x + y)
// );

// var example = source.pipe(
//     zip(newest, (x, y) => x + y)
// );


var main = from('hello').pipe(
    zip(rxjs.interval(500), (x, y) => x)
);
var some = from([0,1,0,0,0,1]).pipe(
    zip(rxjs.interval(300), (x, y) => x)
);
var example = main.pipe(
    withLatestFrom(some, (x, y) => {    return y === 1 ? x.toUpperCase() : x;})
);


example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });

    // http://www.imooc.com/article/79084