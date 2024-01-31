

export function Todos({todo}){
    return(
        <div>
            {
                todo.map(function(todos){
                    return(
                        <div>
                            <h1>{todos.title}</h1>
                            <h2>{todos.description}</h2>
                            <button>{todos.completed == true ? "Completed" : "Mark as done"}</button>
                        </div>
                    )
                })
            }
        </div>
    )
}