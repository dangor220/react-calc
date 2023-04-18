import React, { useState } from 'react';
import './App.css';

function App() {
	return (
		<>
			<Header date={new Date()} />
			<Main date={new Date()} />
		</>
	);
}

function Header(props) {
	const date = props.date.toLocaleDateString('ru', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<header className="header">
			<div className="header_wrapper container">Показания за {date}</div>
		</header>
	);
}

function Main(props) {
	return (
		<main className="main">
			<div className="main__wrapper container">
				<Form date={props.date} />
			</div>
		</main>
	);
}

function Form() {

  const [electro, setElectro] = useState({
		t1: 0,
		t2: 0,
		t3: 0,
		'холодная вода': 0,
		'горячая вода': 0,
	});

  const handleChangeInput = (e) => {
		if (e.value < 0) e.value = '';
    setElectro(electro => ({...electro, [e.getAttribute('data-option')]: e.value }));

    console.log(electro);
  }

	const handleSubmit = (e) => {
		e.preventDefault();
		alert(`Submit`);
	};
	return (
		<form className="form" onSubmit={handleSubmit}>
			<Fieldset data="electricity" changeInputData={handleChangeInput}/>
			<Fieldset data="water" changeInputData={handleChangeInput}/>
			<button type="submit">Сформировать</button>
		</form>
	);
}

function Fieldset(props) {

	return (
		<fieldset className="form__wrapper">
			{props.data === 'water' ? (
				<Input data={props.data} onHandleChange={props.changeInputData}/>
			) : (
				<Input data={props.data} onHandleChange={props.changeInputData}/>
			)}
		</fieldset>
	);
}

function Input(props) {
	const electricity = ['T1', 'T2', 'T3'],
		water = ['Горячая вода', 'Холодная вода'];

	let items;

	

	const handleChange = (event) => {
    props.onHandleChange(event.target)
	};

	if (props.data === 'water') {
		items = water.map((item, index) => {
			return (
				<label className="form__label" key={index}>
					{item}
					<input
						className="form__input"
						type="number"
						data-option={item.toLowerCase()}
						onChange={handleChange}
					></input>
				</label>
			);
		});
	} else {
		items = electricity.map((item, index) => {
			return (
				<label className="form__label" key={index}>
					{item}
					<input
						className="form__input"
						type="number"
						min="0"
						data-option={item.toLowerCase()}
						onChange={handleChange}
					></input>
				</label>
			);
		});
	}

	return (
		<>
			{props.data === 'water'
				? 'Показания за воду'
				: 'Показания за электричество'}
			{items}
		</>
	);
}

export default App;
