function loadJokes() {
    let data = JSON.parse(localStorage.getItem("jokes"));
    if (data == null) {
        return;
    }
    for (let d in data) {
        console.log(data[d]);
    }
}

loadJokes();