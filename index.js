import { app, auth, signInWithEmailAndPassword, getDoc, doc, db } from "./firebase.js"
console.log(app)


window.addEventListener("load", () => {
    let localItem = localStorage.getItem('loginUserData')
    if (localItem) {
        // window.location.replace( "./signup/allpost.html")

    } else {
        //  window.location.href = "./index.html"
    }
})





let loginBtn = document.getElementById('loginBtn')

let loginFun = async () => {
    try {
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
        event.preventDefault();

        let loginUser = await signInWithEmailAndPassword(auth, email, password)
        let uid = loginUser.user.uid

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            console.log("no found document");
            alert("invalid user");
            return
        }
        let userData = docSnap.data()
        console.log(userData)
        localStorage.setItem("loginUserData", JSON.stringify(userData))
        window.location.href = "./allpost.html"
        




    } catch (error) {
        console.log(error.message)
        alert(error.message)
    }

}


loginBtn.addEventListener("click", loginFun)

let remove = () => {
    window.location.href = "../signup/signup.html"
}
window.remove = remove