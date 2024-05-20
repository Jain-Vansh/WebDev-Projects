function check(){
    fetch("http://localhost:4000/addCourse",{
        method: "POST",
        body: JSON.stringify({
            title : document.getElementById("title").value,
            description : document.getElementById("description").value,
            price : document.getElementById("price").value
        }),
        headers : {
            "Content-type" : "application/json",
            "Authorization" : localStorage.getItem("authToken")
        }
    }).then(async function(result){
        if(result.ok){
            console.log("Course added")
            const parent = document.getElementById("message")
            const error = document.createElement("div")
            error.innerHTML = "Course Added Successfully!"
            error.setAttribute("id","success")
            parent.appendChild(error)
        }
        else{
            console.log("ERROR!")
            const parent = document.getElementById("message")
            const error = document.createElement("div")
            error.innerHTML = "Missing Input Fields!"
            error.setAttribute("id","error")
            parent.appendChild(error)
        }
    })

}