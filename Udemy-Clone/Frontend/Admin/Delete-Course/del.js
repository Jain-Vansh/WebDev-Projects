function createElement(Ctitle,Cdesc,Cid){
    const parent = document.getElementById("container")
    const child = document.createElement("div")
    child.setAttribute("class","CourseInfo")
    
    const title = document.createElement("div")
    title.setAttribute("id","title")
    title.innerHTML = Ctitle
    const desc = document.createElement("div")
    desc.setAttribute("id","desc")
    desc.innerHTML = Cdesc
    const del = document.createElement("button")
    del.setAttribute("class","delButton")
    del.setAttribute("id",Cid)
    del.setAttribute("onclick",`del(${Cid})`)
    del.innerHTML = "Delete"

    child.appendChild(title)
    child.appendChild(desc)
    child.appendChild(del)

    parent.appendChild(child)
}

function display(){
    fetch("http://localhost:4000/home",{
        method: "GET",
        headers : {
            "Content-type" : "application/json",
        }
    }).then(async function(result){
        if(result.ok){
            const ans = await result.json()
            for (let index = 0; index < ans.msg.length; index++) {
                createElement(ans.msg[index].title,ans.msg[index].description,ans.msg[index].cid,)
                console.log(ans.msg[index].cid)
                
            }
            
        }
        else{
            console.log("ERROR!")
            
        }
    })
}

function del(cid){
    console.log(cid)
    fetch("http://localhost:4000/removeCourse",{
        method: "DELETE",
        body: JSON.stringify({
            cid : cid
        }),
        headers : {
            "Content-type" : "application/json",
        }
    }).then(async function(result){
        if(result.ok){
            console.log("Course Deleted Successfully!")
            const message = document.getElementById("message")
            const success = document.createElement("div")
            success.innerHTML = "Course Deleted Successfully!"
            success.setAttribute("id","success")
            message.appendChild(success)
            setTimeout(function(){
                window.location.reload()
            },1000)
            
        }
        else{
            console.log("ERROR!")
            
        }
    })
}