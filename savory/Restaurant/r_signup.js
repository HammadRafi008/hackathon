function signup() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var Country = document.getElementById("Country").value;
    var City = document.getElementById("City").value;
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(Country);
    console.log(City);



    // var db = firebase.firestore();

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log("Login Successfull");

            firebase.firestore().collection("Restaurant").doc(user.uid).set({
                    username: username,
                    email: email,
                    uid: user.uid,
                    password: password,
                    Country: Country,
                    City:City

                })
                .then(function() {
                    console.log("Data Succesfull");
                }).catch(error => {
                    console.log(error);
                })
            swal({
                title: "Good job!",
                text: "Successfully sign up",
                icon: "success",
                button: "next",
            }).then((value) => {
                location.href = "R_login_page.html"
            })


            // location.href = ("./login.html")
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Error", errorMessage)
            swal("OOpS!", errorMessage, "error");

            // ..
        });



}


// Login

let Login = (e) => {

    console.log(e);
    e.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    // console.log(email);
    // console.log(password);
    var form = document.getElementById('needs-validation')

    if (!form) {
        return
    }
    form.classList.add('was-validated')


    if (!email || !password) {
        swal({
            title: "Empty Fields",
            text: "please fill input fields",
            icon: "error",
            button: "Try Again",
        });
    } else {

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log("Login Successfull")
                location.href = ("../menu.html")
                    // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log("error", errorMessage)

                swal({
                    title: "Error",
                    text: errorMessage,
                    icon: "error",
                    button: "Try Again",
                });
            });
    }






}