const { Observable, create, range, of, from, fromEvent, fromEventPattern,empty, never } = rxjs;
const { map, filter, takeUntil, concatAll } = rxjs.operators;

// var source = rxjs.interval(1000);
// var click = fromEvent(document.body, 'click');
// var example = source.pipe(
//     takeUntil(click)
// );     

// example.subscribe({
//     next: (value) => { console.log(value); },
//     error: (err) => { console.log('Error: ' + err); },
//     complete: () => { console.log('complete'); }
// });// 0// 1// 2// 3// complete (点击body了

//==============================================================

// var click = fromEvent(document.body, 'click');
// var source = click.pipe(
//     map(e => of(1,2,3)),
//     concatAll()
// );
// source.subscribe({
//     next: (value) => { console.log(value); },
//     error: (err) => { console.log('Error: ' + err); },
//     complete: () => { console.log('complete'); }
// });

//================================================================
const dragDOM = document.getElementById('drag');
const body = document.body;

const mouseDown = fromEvent(dragDOM, 'mousedown');
const mouseUp = fromEvent(body, 'mouseup');
const mouseMove = fromEvent(body, 'mousemove');

const source = mouseDown.pipe(
    map(event => mouseMove.pipe( takeUntil(mouseUp) )),
    concatAll(),
    map(m => ({x: m.clientX, y: m.clientY})),
).subscribe(pos => {
    dragDOM.style.left = pos.x + 'px';
    dragDOM.style.top = pos.y + 'px';
})

               


//=============================================================


//===============================
