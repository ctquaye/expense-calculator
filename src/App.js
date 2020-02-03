import React, {useState, useEffect} from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList'
import ExpenseForm from './components/ExpenseForm'
import Alert from './components/Alert'
import uuid from 'uuid/v4'
/*const initialExpenses = [
  {id:uuid(), charge:"rent", amount:1600},
  {id:uuid(), charge:"car payment", amount:455},
  {id:uuid(), charge:"credit card bill", amount:1300}
]*/
const initialExpenses = localStorage.getItem('expenses')?
JSON.parse(localStorage.getItem("expenses")) :[]

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
  //Edit
  const [edit,setEdit]= useState(false)
  //Edit item
  const [id, setId] = useState(0)
  //------------------useEffect----------------------
  useEffect(()=>{
    console.log("we called useEffect");
    localStorage.setItem('expenses',JSON.stringify(expenses));
  },[expenses])
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
    //if edit is set 
    if(edit === true){
      let tempExpenses = expenses.map(item =>{
       return item.id === id?{...item,charge, amount}  :item
      })
      setExpenses(tempExpenses);
      setEdit(false);
    }
    else{
      const singleExpense = {id:uuid(),charge,amount};
    setExpenses([...expenses,singleExpense])
    handleAlert({type:'success', text:"item added"})    
      }  
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
    setExpenses([]);
    handleAlert({type:"danger", text:"All items deleted"})

  }
  //handle delete
  const handleDelete = (id)=>{
    let tempExpenses = expenses.filter(item => item.id !==id);
    setExpenses(tempExpenses);
    handleAlert({type:"danger", text:"item deleted"})
  }

  const handleEdit = (id)=>{
    let expense = expenses.find((item) => item.id === id)
    let {charge, amount} = expense;
    console.log(expense)
    setAmount(amount);
    setCharge(charge);
    setEdit(true);
    setId(id);
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
    handleSubmit={handleSubmit}
    edit={edit}/>

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
