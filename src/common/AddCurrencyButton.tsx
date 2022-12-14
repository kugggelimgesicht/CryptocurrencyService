import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addCurrency } from "../store/reducers/UserReducer";
const AddButton = styled.button`
	border: none;
  width:fit-content;
	color: tomato;
	background-color: transparent;
	font-size: 1.5rem;
	border-radius: 999px;
	:hover {
		background-color: #faeaeb;
	}
`;
const ModalWrapper = styled.div`
	display: flex;
	color: gray;
  
	font-weight: normal;
	font-size: 16px;
	justify-content: center;
	align-items: center;
	align-self: flex-center;
	z-index: 50;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	border: 1px black solid;
	backdrop-filter: blur(14px);
`;

const ModalWindow = styled.div`
	-webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
	-moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
	box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space around;
	width: 30vw;
	height: 25vh;
	background-color: white;

	span {
		cursor: pointer;
		align-self: flex-end;
		padding: 5px;
	}
	input {
		padding: 1% 5%;
		border-radius: 10px;
		margin-bottom: 3%;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type="number"] {
		-moz-appearance: textfield;
	}
  button{
    border:1px #3bac4e solid;
    color:#3bac4e;
    width:150px;
    padding:5px;
    background-color:transparent;
    border-radius: 5px;
  }
`;

type AddButtonPropsType = {
	id:string
	name:string
}
function AddCurrencyButton(props: AddButtonPropsType) {
	
	const dispatch = useAppDispatch()
	const [showModal, setShowModal] = useState<boolean>(false);
	const [amount, setAmount] = useState<number>(0)
	const [strAmount, setstrAmount] = useState("0")
	const user = useAppSelector(state=>state.user)
	const onInputChange = (e:ChangeEvent<HTMLInputElement>)=>{
		const inputVal = e.currentTarget.value;
		setstrAmount(inputVal)
		setAmount(Number(inputVal))
		
	}
	const onAddButtonClick = (id:string, name:string) => {
		if(amount !== 0)
		dispatch(addCurrency({id, name, amount}))
		console.log(user);
		setstrAmount('0')
		
	}
	 useEffect (()=>{console.log(user);
	}, [user])
	return (
		<>
			<AddButton onClick={() => setShowModal(!showModal)}>+</AddButton>
			{showModal ? (
				<ModalWrapper>
					<ModalWindow>
         
						<span onClick={() => setShowModal(false)}>??</span>
            <h2>???????????????????? ???????????????????????? ?? ????????????????</h2>
						<label>???????????????????? ????????????????????????</label>
						<input type="number" step=".1" value={strAmount}  onChange={(e)=>onInputChange(e)}/>
						<div>
							<button onClick={() => onAddButtonClick(props.id, props.name)}>???????????????? ?? ????????????????</button>
						</div>
					</ModalWindow>
				</ModalWrapper>
			) : null}
		</>
	);
}

export default AddCurrencyButton;
