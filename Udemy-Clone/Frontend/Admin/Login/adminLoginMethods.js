function Login(){
    fetch("http://localhost:4000/adminLogin",{
        method: "POST",
        body : JSON.stringify({
            username : document.getElementById("email").value,
            password : document.getElementById("password").value
        }),
        headers : {
            "Content-type" : "application/json"
        }
    }).then(async function(result){
        if(result.ok){
            console.log("website loaded successfully")
            const ans = await result.json()
            localStorage.setItem("authToken",ans.msg)
            window.location.replace("http://127.0.0.1:3000/Udemy-Clone/Frontend/Admin/Admin-Home/adminhome.html");
        }
        else{
            console.log("ERROR!")
            alert("Invalid Login Credentials!")
        }
    })
}