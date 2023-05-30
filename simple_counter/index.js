count = 0

let countElem = document.getElementById("count")
let saveString = document.getElementById("saves")

saveString.innerText = "Previous Saves: "

function increment() {
    console.log("Click Occurred")
    count += 1
    countElem.innerText = count
    console.log(count)
}

function save() {

}