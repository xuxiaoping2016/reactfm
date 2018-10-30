function slice(array, start, end) {
    //null undefined 的length或报错
    //数字，boolean object symbol 的length 值为 undefin；
    let length = array == null ? 0 : array.length
    if (!length) {
        return []
    }

    //走到这一步 只有非空数组 字符串 和函数需要处理
    start = start == null ? 0 : start
    end = end === undefined ? length : end

    if (start < 0) {
        start = -start > length ? 0 : (length + start)
    }
    end = end > length ? length : end
    if (end < 0) {
        end += length
    }
    length = start > end ? 0 : ((end - start) >>> 0)
    start >>>= 0

    let index = -1
    const result = new Array(length)
    while (++index < length) {
        result[index] = array[index + start]
    }
    return result
}

export default slice;