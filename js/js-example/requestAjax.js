var xhr = new XMLHttpRequest()
function requestAjax(){
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                alert(xhr.responseText)
            }
        }
    }
}
xhr.open('GET', '/api', false)
xhr.send(null)