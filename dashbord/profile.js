window.addEventListener('load', () => {
    let local = JSON.parse(localStorage.getItem("loginUserData"))
    let image = document.getElementById("image")
    let name = document.getElementById("name")

    image.src = local.imageUrl
    name.innerHTML = local.fullName
})