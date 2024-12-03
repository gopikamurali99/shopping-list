import { useState } from 'react'

import './App.css'

function App() {
 const[item,setItem] = useState('')
 const[quantity,setQty] = useState('')
 const[items,setItems] = useState([])
 const[filter,setfilter] = useState("all")
 const[editValue,setEditValue] = useState(" ")
 const[editIndex,setEditIndex] = useState(" ")
 const handleInput=(e)=>{
   setItem(e.target.value);

 }

 const handleQty = (e) =>{
  setQty(e.target.value)
 }
const handleItemAdd=()=>{
  if(item.trim()){
    setItems([...items,{itemName:item,quantity:quantity,purchased:false}])
    console.log(items)
    console.log(items)
    setItem('')
    setQty(1)
  }
}

const handleTogglePurchased = (i)=>{
       const updatedItems = items.map((it,index)=>
      i===index?{...it,purchased:!it.purchased}:it)

       setItems(updatedItems)
       console.log(updatedItems);

}

const handleQuantityChange = (index,newqty)=>{
  const updatedItems = items.map((it,i)=>
    i===index?{...it,quantity:newqty}:it
);
  
  setItems(updatedItems)
  console.log(updatedItems)
}

const handleDelete = (index) =>{
  const deleteItems = items.filter((_,i)=> i !==index)
  setItems(deleteItems)
};

const filteredItems = items.filter((item)=>{
  if(filter==='all') return true;
  return filter === "purchased"?item.purchased:!item.purchased;

})

const handleEditItem = (index,newName) =>{
  const updatedItems = items.map((item,i)=>
  i===index?{...item,itemName: newName}:item)
  setItems(updatedItems)
}


  return (
    <>
      <div>
        <h1>Shopping List</h1>
        <input type="text" 
        value={item}
        onChange={handleInput}
        placeholder='Enter an Item'/>

        <input type="number"
        value={quantity}
        onChange={handleQty} 
        min={1}
        placeholder='Enter quantity'/>

        <button onClick={handleItemAdd}>Add Item</button>
        <div>
          <ul>
          {items.map((it,index)=>(
            <li key = {index} style={{textDecoration:it.purchased?'line-through':'none'}}>
              <input type="checkbox"
              checked={it.purchased}
              onChange={()=>handleTogglePurchased(index)} />
              {`${it.itemName}(x${it.quantity})`}
              <input type="number"
              value={it.quantity}
              min={1}
              onChange={(e)=>handleQuantityChange(index,Number(e.target.value))} />
              <button onClick={()=>handleDelete(index)}>Delete</button>
              {editIndex === index?(<input type="text" 
              value={editValue}
              onChange = {(e)=>setEditValue(e.target.value)} onBlur={()=>{handleEditItem(index,editValue); setEditIndex(null)}}/>):(<>{item.name}<button onClick={()=>setEditIndex(index)}>Edit</button></>)}
            </li>

          ))}
          </ul>
          <div>
            <select onChange={(e)=>setfilter(e.target.value)}>
              <option value="all">All</option>
              <option value="purchased">Purchased</option>
              <option value="notPurchased">Not Purchased</option>
            </select>
            {filteredItems.map((item,index)=>(
              <li key={index}>{item.itemName}-{item.purchased?"purchased":"not purchased"}</li>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
