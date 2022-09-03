import { useState } from "react";
import styled from "styled-components";
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
function AddCurrencyButton() {
	const [showModal, setShowModal] = useState<boolean>(false);
	return (
		<>
			<AddButton onClick={() => setShowModal(!showModal)}>+</AddButton>
			{showModal ? (
				<ModalWrapper>
					<ModalWindow>
         
						<span onClick={() => setShowModal(false)}>х</span>
            <h2>Добавление криптовалюты в портфель</h2>
						<label>Количество криптовалюты</label>
						<input type="number" step=".1" />
						<div>
							<button>Добавить в портфель</button>{" "}
						</div>
					</ModalWindow>
				</ModalWrapper>
			) : null}
		</>
	);
}

export default AddCurrencyButton;
