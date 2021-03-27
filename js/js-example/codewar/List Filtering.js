function filter_list(l) {
    return l.filter(function (element) {
        return typeof element === "number";
    })
}