import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./common/Header/Header";
import CurrencyPage from "./Pages/Main/CurrencyPage";
import Main from "./Pages/Main/Main";
import Wallet from "./Pages/Wallet/Wallet";

function App() {
	return (
   

			
	
			<div className="App"> 
      <Routes>
      <Route path='/' element={<Main/>} />
      <Route path='/wallet' element={<Wallet/>} />
      <Route path='/currency/:id' element={<CurrencyPage/>}/>
			</Routes>
			</div>
		
	);
}

export default App;
