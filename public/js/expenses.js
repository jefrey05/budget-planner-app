const addExpense = document.querySelector('#addExpenses');
addExpense.addEventListener('click',add)

async function add(){
    const expenses = document.querySelector('input').value;

    try {
        const response = await fetch('addExpense',{
         method:'put',
         headers:{'Content-type':'application/json'},
         body:JSON.stringify({
            expense:expenses,
         }),
        })

        const data = await response.json();
        console.log(data);
        location.reload();
        
    } catch (error) {
        console.log(error)
    }
}