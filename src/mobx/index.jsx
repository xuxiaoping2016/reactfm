

export const OBSERVABLE = "observable"
export const OBSERVABLE_REF = "observable.ref"
export const OBSERVABLE_SHALLOW = "observable.shallow"
export const OBSERVABLE_STRUCT = "observable.struct"

export const defaultCreateObservableOptions = {
    deep: true,
    name: undefined,
    defaultDecorator: undefined,
    proxy: true
}
Object.freeze(defaultCreateObservableOptions)

export function asCreateObservableOptions(thing) {
    return thing || defaultCreateObservableOptions
}

function createObservable(v, arg2, arg3){

    if (Array.isArray(v)) return observable.array(v, arg2)
}

createObservable.annotationType_ = OBSERVABLE


const observableFactories = {
   
    // array: <T = any>(initialValues?: T[], options?: CreateObservableOptions) => IObservableArray<T>
    array(initialValues,options){
        const o = asCreateObservableOptions(options)
        return (globalState.useProxies === false || o.proxy === false
            ? createLegacyArray
            : createObservableArray)(initialValues, getEnhancerFromOption(o), o.name)
    }
}

function getEnhancerFromOption(){
    return deepEnhancer
}

export function deepEnhancer(v, _, name) {
    // it is an observable already, done
    // if (isObservable(v)) return v

    // something that can be converted and mutated?
    if (Array.isArray(v)) return observable.array(v, { name })
    // if (isPlainObject(v)) return observable.object(v, undefined, { name })
    // if (isES6Map(v)) return observable.map(v, { name })
    // if (isES6Set(v)) return observable.set(v, { name })

    return v
}