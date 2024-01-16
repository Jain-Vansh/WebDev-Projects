let count = 0

function addToDo(){
    const title = document.getElementById("title").value
    const desc = document.getElementById("desc").value
    const child = document.createElement("div")
    child.setAttribute("id",count)
    child.setAttribute("class","newToDo")
    const grandchild1 = document.createElement("div")
    grandchild1.innerHTML = "ToDo : "+title
    grandchild1.setAttribute("class","newBox")
    const grandchild2 = document.createElement("div")
    grandchild2.innerHTML = "Detail : "+desc
    grandchild2.setAttribute("class","newBox")
    const grandchild3 = document.createElement("button")
    grandchild3.innerHTML = "mark done"
    grandchild3.setAttribute("onclick", `done(${count})`)
    grandchild3.setAttribute("class","listButton")
    child.appendChild(grandchild1)
    child.appendChild(grandchild2)
    child.appendChild(grandchild3)
    const parent = document.getElementById("box")
    parent.appendChild(child)
    count++
}

function done(id){
    const child = document.getElementById(id)
    child.children[2].innerHTML = "done"
}