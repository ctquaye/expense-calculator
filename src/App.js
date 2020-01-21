import React, {useState} from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList'
import ExpenseForm from './components/ExpenseForm'
import Alert from './components/Alert'
import uuid from 'uuid/v4'
const initialExpenses = [
  {id:uuid(), charge:"rent", amount:1600},
  {id:uuid(), charge:"car payment", amount:455},
  {id:uuid(), charge:"credit card bill", amount:1300}
]

function App() {
  //----------------state values---------------------
  //alll expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);
  //single expense
  const [charge, setCharge] = useState('')
  //single amount
  const [amount,setAmount] = useState('')
  //alert
  const [alert, setAlert] = useState({show:false})
  //----------------functionality--------------------
  const handleCharge = e =>{
    setCharge(e.target.value);
  }
  const handleAmount = e =>{
    setAmount(e.target.value);
  }
  const handleAlert=({type, text}) => {
    setAlert({show:true, type, text})
    setTimeout(()=>{
      setAlert({show:false})
    },3000);
  }
  const handleSubmit = e =>{
   e.preventDefault();
   if(charge !==""&& amount > 0){
    const singleExpense = {id:uuid(),charge,amount};
    setExpenses([...expenses,singleExpense])
    handleAlert({type:'success', text:"item added"})
    setCharge("");
    setAmount("");
   }
   else{
     //handle alert called
     handleAlert({
     type:'danger',
     text:`Charge can't be empty/
     amount must be greater than zero`})

   }
   console.log(charge,amount);
  }

  //clear all items
  const clearItems = ()=>{
    console.log("clear all items");
  }
  //handle delete
  const handleDelete = (id)=>{
    console.log(`item deleted: ${id}`);
  }

  const handleEdit = (id)=>{
    console.log(`item edited: ${id}`)
  }

  return (
    <>
    {alert.show && <Alert
    type={alert.type} 
    text={alert.text}/>}
   
    <h1>budget calculator</h1>
    <main className="App">
    <ExpenseForm 
    charge={charge} 
    amount={amount}
    handleAmount={handleAmount}
    handleCharge={handleCharge}
    handleSubmit={handleSubmit}/>

    <ExpenseList 
    expenses={expenses}
    clearItems={clearItems}
    handleDelete={handleDelete}
    handleEdit={handleEdit}/>   
    </main>
    <h1>
      total spending: <span className="total">
        ${expenses.reduce((acc, curr)=>{
          return (acc+= parseFloat(curr.amount));
        },0)}
        </span>
    </h1>
    
    </>
  );
}

export default App;
