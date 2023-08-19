import { db, doc, setDoc, onSnapshot, collection, addDoc } from '../firebase.js'
window.addEventListener('load', () => {

    const unsubscribe = onSnapshot(collection(db, "blogs"), (data) => {
        data.forEach(element => {
            let getData = element.data();
            console.log(getData)
            let parent = document.getElementById("parent")
            let data = `<div class="parent"> <div class="card w-75 mb-3">
             <div class="card-body">
                 <img src="${getData.image}" width="50px " height="50px" alt="">
                 <h5 class="card-title">${getData.title}</h5>
                 <p class="card-text">${getData.description}</p>
                 <a href="#" class="btn btn-primary">Button</a>
             </div></div>
             `
            parent.innerHTML += data

        });

    });
})

let logOut = document.getElementById("logOut")
logOut.addEventListener('click', () => {
    localStorage.removeItem("loginUserData")
    window.location.href = "/"
})


