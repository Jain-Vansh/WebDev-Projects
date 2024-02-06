function signUp(){
    fetch("http://localhost:3000/signUp",{
        method : "POST",
        body : JSON.stringify({
            email : document.getElementById("email").value,
            password : document.getElementById("password").value
        }),
        headers : {
            "Content-type" : "application/json"
        }
    }).then(async function(res){
        const ans = await res.json()
        document.getElementById("result").innerHTML = ans.msg
        const continueButton = document.createElement("button")
        continueButton.innerHTML = "Continue"
        const nextPage = document.createElement("a")
        nextPage.href = "https://www.google.com/"
        nextPage.appendChild(continueButton)
        document.getElementById("result").appendChild(nextPage)
        
    })
}