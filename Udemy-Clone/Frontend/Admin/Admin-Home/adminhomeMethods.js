function get(){
    fetch("http://localhost:4000/users",{
        method: "GET",
        headers : {
            "Content-type" : "application/json"
        }
    }).then(async function(result){
        const data = await result.json()
        const ans = data.msg
        const parent = document.getElementById("parent")
        for (let index = 0; index < ans.length; index++) {
            const final = ans[index];
            console.log(final.token)
            const newdiv = document.createElement("div")
            newdiv.innerHTML = final.token
            parent.appendChild(newdiv)
        }
        
    })
}