const { Observable, create, range, of, from, fromEvent, fromEventPattern,empty, never } = rxjs;
const { map, filter } = rxjs.operators;


var people = of('Jerry', 'Anna');

function map1(callback) {
    return Observable.create((observer) => {
        return this.subscribe(
            (value) => { 
                try{
                    observer.next(callback(value));
                } catch(e) {
                    observer.error(e);
                }
            },
            (err) => { observer.error(err); },
            () => { observer.complete() }
        )
    })
}

Observable.prototype.map1 = map1;
var helloPeople = people.map1((item) => item + ' Hello~');
// var helloPeople = map1(people, (item) => item + ' Hello~');

helloPeople.subscribe(console.log);