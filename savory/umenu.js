let logout=() => {
    firebase.auth().signout()
    .then(function(){
        location.href="../Restaurant/U_login_page.html"
    })
    .catch(function(er){
        console.log(er);
    })
}



var userID;
var todoArray = []

firebase.auth().onAuthStateChanged((user) => {
    const username = document.getElementById("username");
    if (user) {
        userID = user.uid;

        firebase.firestore().collection("todos").doc(user.uid).get()
            .then((snapshot) => {
                // console.log("Snapshot", snapshot);
                // console.log("Snapshot Data", snapshot.data());
                // console.log("Snapshot username Data", snapshot.data().username);
                username.innerText = snapshot.data().username;
                getTodo(userID);

            }).catch((er) => {
                console.log("Error", er);
            })

    } else {
        location.href("./Restaurant/R_login_page.html")

        // ...
        // console.log('user is not signed in to retrive username');
    }
});


let addTodo = () => {

    var todo = document.getElementById("itemi").value;

    firebase.firestore().collection("todos").add({
            todo: todo,
            uid: userID
        })
        .then(function() {
            console.log(userID);
            console.log("Data Added");
            getTodo(userID);
        })
        .catch(function(error) {
            console.log(error);
        })

}


let getTodo = (userID) => {
    todoArray = []
    firebase.firestore().collection("todos").where("uid", "==", userID)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                todoArray.push(doc.data());

                document.getElementById("main").innerHTML = "";

            });
            todoArray.forEach((item, index) => {
                // yahn pe console
                console.log(index, item.todo);

                // document.getElementById("main").innerHTML = "";

                var mainDiv = document.createElement("div")
                var para = document.createElement("p")
                var text = document.createTextNode(item.todo)

                para.appendChild(text)
                mainDiv.appendChild(para)
                document.getElementById("main").appendChild(mainDiv)


            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}