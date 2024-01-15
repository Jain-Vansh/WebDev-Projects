function Calculate(){
    const p = parseInt(document.getElementById("principle").value)
    const r = parseInt(document.getElementById("interest").value)
    const t = parseInt(document.getElementById("time").value)
    const ans = ((p*r*t)/100)
    const final_amount = p+ans
    document.getElementById("ans").innerHTML = ans.toString()
    document.getElementById("amount").innerHTML = final_amount.toString()

}