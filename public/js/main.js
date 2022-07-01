const addBtn = document.querySelector('button');
addBtn.addEventListener('click',addBudget);

async function addBudget(){
    const inputValue = Number(document.querySelector('input').value)

    try{
        const response =  await fetch('addBudget',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                budget:inputValue
            })
        })

        const data = await response.json();
        console.log(data);
        document.querySelector('#div').classList.add("hide");
        //location.reload();


    }catch(err){
       console.log(erro)
    }
}