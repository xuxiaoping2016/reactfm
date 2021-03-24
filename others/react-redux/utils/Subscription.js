// encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

const CLEARED = null
const nullListeners = { notify() {} }
// 添加，获取，清除， 触发监听器
// 作为对外接口，分别用来清除当前存储的listener、通知、订阅，其目的就是实现一个监听者模式。
function createListenerCollection() {
  // the current/next pattern is copied from redux's createStore code.
  // TODO: refactor+expose that code to be reusable here?
  let current = []
  let next = []

  return {
    clear() {
      next = CLEARED
      current = CLEARED
    },

    notify() {
      const listeners = current = next
      console.log('notify listeners',listeners,listeners.length)
      for (let i = 0; i < listeners.length; i++) {
        listeners[i]()
      }
    },

    get() {
      return next
    },

    subscribe(listener) {
      let isSubscribed = true
      if (next === current) next = current.slice()
      next.push(listener)

      return function unsubscribe() {
        if (!isSubscribed || current === CLEARED) return
        isSubscribed = false

        if (next === current) next = current.slice()
        next.splice(next.indexOf(listener), 1)
      }
    }
  }
}

// Subscription封装了订阅的逻辑，Subscription根据构造函数中是否传入了父级的订阅类Subscription实例parentSub，订阅方法trySubscribe会有不同的行为
export default class Subscription {
  constructor(store, parentSub, onStateChange) {
    this.store = store
    this.parentSub = parentSub
    this.onStateChange = onStateChange
    this.unsubscribe = null   // 保存取消监听的函数
    this.listeners = nullListeners
  }

  addNestedSub(listener) {
    console.log('addNestedSub',listener)
    this.trySubscribe()
    return this.listeners.subscribe(listener)
  }

  notifyNestedSubs() {
    this.listeners.notify()
  }

  isSubscribed() { // 是否监听；
    return Boolean(this.unsubscribe)
  }
  // 添加监听 父级已订阅该store,则将this.onStateChange添加到父级listeners对象中去
  trySubscribe() {
    if (!this.unsubscribe) {
      console.log('trySubscribe fn log this.onStateChange',this.onStateChange)
      // 
      this.unsubscribe = this.parentSub
        ? this.parentSub.addNestedSub(this.onStateChange)  // 父级组件订阅了store，则将this.onStateChange添加到父级的订阅对象中去
        : this.store.subscribe(this.onStateChange) // 这里订阅了store
      
      this.listeners = createListenerCollection()
    }
  }
  // 取消订阅  重置this.unsubscribe ，this.listeners
  tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe()
      this.unsubscribe = null
      this.listeners.clear()
      this.listeners = nullListeners
    }
  }
}
