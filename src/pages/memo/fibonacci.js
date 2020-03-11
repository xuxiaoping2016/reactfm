let fibonacci = (function() {
    let memory = {}    //memory设定为对象
    
    return function(n) {
        console.log(memory)
        if(memory[n] !== undefined) {
            return memory[n]
        }
        return memory[n] = (n === 0 || n === 1) ? n : fibonacci(n-1) + fibonacci(n-2)
    }
})()


export default fibonacci;