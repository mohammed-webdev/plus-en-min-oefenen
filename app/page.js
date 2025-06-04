"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";


export default function Home() {
  const [num1,setNum1] = useState()
  const [num2,setNum2] = useState()
  const [plusOfMin,setPlusOfMin] = useState([true,false])
  const [sign,setSign] = useState()
  const [inputVal,setInputVal] = useState("")
  const [goedCounter,setGoedCounter] = useState(0)
  const [foutCounter,setFoutCounter] = useState(0)

  const inputRef = useRef()
  const btnRef = useRef()

  useEffect(()=>{
    let fNumber = Math.floor(Math.random() * 21)
    let sNumber = Math.floor(Math.random() * 11)
    inputRef.current.focus()
    // console.log(fNumber,sNumber);
    btnRef.current.disabled = true
   

checkNumbers()

  },[goedCounter])
  let checkNumbers = ()=>{
        inputRef.current.focus()
         btnRef.current.disabled = true
       
       btnRef.current.style.color = "gray"
         //console.log(btnRef);
         
  //  console.log(goedCounter);
   if(goedCounter == 25){
    alert(`🌞🌈GOED GEDAAN MINNA. Jij hebt ${goedCounter} goed antworden en ${foutCounter} niet goed antwoorden.✅ Klik op 'OK' om opnieuw te spelen🎈🎁`)
   
      setGoedCounter(0)
      setFoutCounter(0)
    
   } else {
        let fNumber = Math.floor(Math.random() * 21)
    let sNumber = Math.floor(Math.random() * 11)
if(fNumber < sNumber  ){
  
checkNumbers()

} else {
  setNum1(fNumber)
setNum2(sNumber)
setSign(Math.floor(Math.random() * plusOfMin.length))
setInputVal("")
}
   }
    


 
}
  // console.log(num1,num2);
  const inputHandlar = (e)=>{
    let inputValue = e.target.value;
    
    
    setInputVal(inputValue)
    //console.log(inputVal);
    if(inputValue.length>0){
      btnRef.current.disabled = false
       btnRef.current.style.color = "white"
      btnRef.current.style.backgroundColor = "black"

    } else if(inputValue.length==0) {
       btnRef.current.disabled = true
       btnRef.current.style.backgroundColor = "black"
       btnRef.current.style.color = "gray"
    }
  }
  
  const chackHandelaer = (e)=>{
     e.preventDefault()
    // console.log(inputVal);
    //console.log(goedCounter);
    
    if(sign){
      if(inputVal == num1 + num2){
      //console.log("OK")
      var audio = new Audio('./good_answer.mp3');
          audio.play();
          setGoedCounter(prev => prev +1)
      checkNumbers()
    } else {
        // console.log("FOUT ANSTWROD")
      var audio = new Audio('./not_good_answer.mp3');
          audio.play();
          setFoutCounter(prev => prev +1)
      checkNumbers()
    }
    } else {
if(inputVal == num1 - num2){
     // console.log("OK")
      var audio = new Audio('./good_answer.mp3');
        audio.play();
  
      setGoedCounter(prev => prev +1)

      checkNumbers()

    } else {
        // console.log("FOUT ANSTWROD")
      var audio = new Audio('./not_good_answer.mp3');
          audio.play();
          setFoutCounter(prev => prev +1)
      checkNumbers()
    }
    
  }
}
  return (
   <>
   <h2>Hello Minna 👋</h2>
   <h3 style={{textAlign:"center",padding:"20px",color:"rgb(243, 58, 106)"}}>JIJ MOET 10 GOEDE ANTWOORD MAKEN.</h3>
    <section>
  <h1>{num1}{sign ? " + " : " - "} {num2} =  </h1>
  <form>
      <input ref={inputRef} type="number" value={inputVal} onChange={inputHandlar} />
  <button ref={btnRef} onClick={chackHandelaer}>CHECK🚦</button>
  </form>

  <div>
    <h1 className="antwoord">Good antwoord :<span className="green">{goedCounter} </span>✅</h1>
    <h1 className="antwoord">fout antwoord :<span className="red"> {foutCounter} </span>❌</h1>
  </div>
   </section>
   </>
  );
}
