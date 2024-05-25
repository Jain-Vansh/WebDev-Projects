function create(name, email){
    const parent = document.getElementById("container")
    const child = document.createElement("div")
    child.setAttribute("class","box")

    const fullname = document.createElement("div")
    fullname.setAttribute("class","name")
    fullname.innerHTML = name
    const username = document.createElement("div")
    username.setAttribute("class","email")
    username.innerHTML = email
    child.appendChild(fullname)
    child.appendChild(username)
    parent.appendChild(child)
}

function getuser(){
    fetch("http://localhost:4000/users",{
        method: "GET",
        headers : {
            "Content-type" : "application/json",
        }
    }).then(async function(result){
        if(result.ok){
            const ans = await result.json()
            for (let index = 0; index < ans.msg.length; index++) {
                create(ans.msg[index].fullname, ans.msg[index].username)
                console.log(ans.msg[index].fullname, ans.msg[index].username)
                
            }
            
        }
        else{
            console.log("ERROR!")
            
        }
    })
}