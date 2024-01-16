let count = 0

function addToDo(){
    const title = document.getElementById("title").value
    const desc = document.getElementById("desc").value
    const child = document.createElement("div")
    child.setAttribute("id",count)
    const grandchild1 = document.createElement("div")
    grandchild1.innerHTML = title
    const grandchild2 = document.createElement("div")
    grandchild2.innerHTML = desc
    const grandchild3 = document.createElement("button")
    grandchild3.innerHTML = "mark done"
    grandchild3.setAttribute("onclick", `done(${count})`)
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