var timer;
var deleteFirstPhotoDelay;

async function start() {

    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all")
        const data = await response.json()
        createBreedList(data.message)
    } catch (e) {
        console.log("There was a problem fetching the breed list")
    }
}

start();

function createBreedList(breedList) {
    document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
            <option>Choose a Dog Breed</option>
            ${Object.keys(breedList).map(function (breed) {
        return `<option>${breed}</option>`
    }).join('')}
    </select>
        `
    // "https://dog.ceo/api/breed/Affenpinscher/images/random"
}

async function loadByBreed(breed) {
    if (breed != "Choose a Dog Breed") {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        console.log(data.message)
        createSlideshow(data.message)

    }
}

function createSlideshow(images) {
    let currentPos = 0;
    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)

    if (images.length == 1) {
        document.getElementById("slideshow").innerHTML =
            `
        <div class="slide" style="background-image: url('${images}')"></div>
        <div class="slide" "></div>

        `
    } else {
        document.getElementById("slideshow").innerHTML =
            `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide" style="background-image: url('${images[1]}')"></div>
        `
        currentPos += 2;
        if (images.length == 2) currentPos == 0;
        timer = setInterval(nextSlide, 3000);

        function nextSlide() {
            document.getElementById('slideshow').insertAdjacentHTML("beforeend", `<div class="slide" style = "background-image: url('${images[currentPos]}')" ></div > `);
            deleteFirstPhotoDelay = setTimeout(function () {
                document.querySelector(".slide").remove()
            }, 1000);
            console.log(currentPos)
            if (currentPos + 1 >= images.length) {
                currentPos = 0;
            }
            else {
                currentPos++;
            }
        }
    }
}
