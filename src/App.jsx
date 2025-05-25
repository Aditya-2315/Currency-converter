import { useState } from 'react'
import './App.css'
import InputBox from './components/InputBox'
import useCurrencyInfo from './hooks/CurrencyInfo'

function App() {
  
  const [amount,setAmount] = useState();
  const [from,setFrom] = useState("usd");
  const [to,setTo] = useState("inr");
  const [converted,setConverted] = useState(0)

  const currencyInfo = useCurrencyInfo(from)
  console.log(currencyInfo)

  const options = Object.keys(currencyInfo)
  console.log(options)

  const swap = ()=>{
    setFrom(to)
    setTo(from)
    setConverted(amount)
    setAmount(converted)
  }

  const convert = () =>{
    setConverted(amount * currencyInfo[to])
  }

  return (
   
        <div className="w-full h-screen flex flex-wrap flex-col justify-center items-center bg-gradient-to-r overscroll-none from-slate-900 to-slate-700">
            <h1 className=' text-white font-extrabold text-2xl mb-6'>Your Currency Converter</h1>
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                       convert()
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount = {amount}
                            onAmountChange={(amount)=>setAmount(amount)}
                            currencyOptions = {options}
                            onCurrencyChange = {(currency)=>setAmount(amount)}
                            selectCurrency= {from}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount = {converted}
                            currencyOptions = {options}
                            onCurrencyChange = {(currency)=>setTo(currency)}
                            selectCurrency= {to}
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()}to{to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
);
}

export default App
