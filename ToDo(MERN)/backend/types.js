// Using the zod library for data verification of the todos
const zod = require("zod")

const createTodo = zod.object({
    title : zod.string(),
    description : zod.string()
})

const updateTodo = zod.object({
    id : zod.string()
})

module.exports = {
    createTodo : createTodo,
    updateTodo : updateTodo
}