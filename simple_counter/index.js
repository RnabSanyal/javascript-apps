let count = 0
let saved = 0

let countElem = document.getElementById("count")
let saveString = document.getElementById("saves")

saveString.innerText = "Previous Saves: "

function increment() {
    console.log("Click Occurred")
    count += 1
    countElem.innerText = count
    console.log(count)
}

function decrement() {
    console.log("Click Occurred")
    if(count > 0) {
        count -= 1
    }
    countElem.innerText = count
    console.log(count)
}

function save() {
    if (saved == 0){
        saveString.textContent += " " + count
    } else {
        saveString.textContent += " - " + count
    }
    saved += 1
}

