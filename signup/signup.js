
import { app, auth, createUserWithEmailAndPassword, db, doc, setDoc, ref, uploadBytesResumable, getDownloadURL, storage } from "../firebase.js"



window.addEventListener("load" ,()=>{
    let localItem = localStorage.getItem('loginUserData')
    if(localItem){
        window.history.back()
        window.location.href = "./allpost.html"
    }
})


let signupBtn = document.getElementById("signupBtn")

let signupFun = async () => {
    let fullName = document.getElementById("fullName").value
    let phoneNumber = document.getElementById("phoneNumber").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    event.preventDefault()
    let image = document.getElementById("file")
    let newDate = new Date()



    if (!fullName || !phoneNumber || !email || !password) {
        console.log("please enter your required field")
        alert("please enter your required field")
        return
    }

    const imageUrl = await uploadImage(image.files[0])



    let userAuth = await createUserWithEmailAndPassword(auth, email, password)
    console.log(userAuth)
    let uid = userAuth.user.uid



    let userObj = {
        fullName,
        phoneNumber,
        email,
        accountActivate: true,
        uid,
        imageUrl: imageUrl,
        newDate
    }

    const ref = doc(db, "users", uid)
    const userInDataBase = await setDoc(ref, userObj)







}
signupBtn.addEventListener("click", signupFun)



function uploadImage(file) {
    return new Promise(function (resolve, reject) {

        // Create the file metadata
        /** @type {any} */

        let imageUrl;
        const metadata = {
            contentType: 'image/jpeg'
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, 'productImages/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            function (snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;

                }
            },

            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                console.log(error.message)
                reject({
                    message: "something went wrong"
                })
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    resolve(downloadURL)
                });
            }
        );


    })
}

function remove() {
   window.location.href = "/"
}
window.remove = remove