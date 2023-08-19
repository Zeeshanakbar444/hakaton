import { db, doc, setDoc, onSnapshot, collection, addDoc, updateDoc, deleteDoc } from '../firebase.js'
let current = document.getElementById('current')
window.addEventListener("load", async () => {

    let loacal = JSON.parse(localStorage.getItem('loginUserData'))
    current.innerHTML = loacal.fullName

    const unsubscribe = onSnapshot(collection(db, "blogs"), (data) => {
        data.forEach(element => {
            let getData = element.data()

            if (loacal.uid === getData.uid) {
                let parent = document.getElementById('parent')
                let data = ` <div class="row zee">
                <div class="col-sm-6 mb-3 mb-sm-0">
                  <div class="card ">
                    <div class="card-body ">
                        <img src="${loacal.imageUrl}" width="50px" height="50px" alt="">
                      <h5 class="card-title">${getData.title}</h5>
                      <p class="card-text">
                      ${getData.description}</p>
                      <button id=${getData.uid} onclick = "edit(this)">edit</button>
                      <button id=${getData.uid} onclick = "deleteFun(this)">delete</button>
                    </div>
                  </div>
                </div>
               
                `
                parent.innerHTML += data
            }
        });

    });







})


let submit = document.getElementById("submit")

submit.addEventListener("click", async () => {
    try {
        event.preventDefault()
        let title = document.getElementById("title").value
        let description = document.getElementById("description").value

        let local = JSON.parse(localStorage.getItem("loginUserData"))
        let uid = local.uid





        const docRef = await addDoc(collection(db, "blogs"), {
            title: title,
            description: description,
            uid: uid,
            image:local.imageUrl
        });


        


        console.log("successFully add in firebase")
        alert("successFully add in firebase")
    } catch (error) {
        console.log(error.message)
        alert(error.message)
    }

})












let logOut = document.getElementById("logOut")
logOut.addEventListener("click", () => {
    localStorage.removeItem('loginUserData')
    window.location.href = '/'
})
let profile = document.getElementById('profile');
profile.addEventListener("click", () => {
    window.location.href = "./profile.html"
})

async function edit(e) {
    try {
        let title = prompt("enter your ubdate title")
        let decs = prompt("enter your ubdate desc")
        const updateData = await updateDoc(doc(db, "blogs", e.id), {
            title: title,
            description: decs

        });
        window.location.reload();
    } catch (error) {
        console.log(error.message)
        alert(error.message)
    }

}

async function deleteFun(e) {
    try {
        const deleteItem = await deleteDoc(doc(db, "blogs", e.id));
        window.location.reload()
    }
    catch (error) {
        console.log("error", error.message)
        alert(error.message)
    }
}

window.edit = edit
window.deleteFun = deleteFun