function bindEvent(element, type, selector, callback) {
    if (callback == null) {
        callback = selector
        selector = null
    }

    element.addEventListener(type, function (e) {
        var target
        if (selector) {
            // 存在selector, 则进入if判断中
            // 获取触发事件的元素, 即e.target
            target = e.target
            // 看是否符合selector这个条件
            if (target.matches(selector)) {
                callback.call(target, e)
            }
        } else {
            // 无selector, 说明不需要事件代理
            callback(e)
        }
    })
}