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
  const local = JSON.parse(localStorage.getItem('indication'));
	const [indication, setIndication] = useState({
		t1: '',
		t2: '',
		t3: '',
		'горячая вода': '',
		'холодная вода': '',
    'горячая вода (пред. м.)': local['горячая вода'] || '',
    'холодная вода (пред. м.)': local['холодная вода'] || '',
	});

	const handleChangeInput = (e) => {
		setIndication((indication) => ({
			...indication,
			[e.getAttribute('data-option')]: e.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		localStorage.setItem('indication', JSON.stringify(indication));
	};
	return (
		<form className="form" onSubmit={handleSubmit}>
			<Fieldset data="electricity" dataState={indication} changeInputData={handleChangeInput} />
			<Fieldset data="water" dataState={indication} changeInputData={handleChangeInput} />
			<button type="submit">Сформировать</button>
		</form>
	);
}

function Fieldset(props) {
	return (
		<fieldset className="form__wrapper">
			{props.data === 'water' ? (
				<Input data={props.data} dataState={props.dataState} onHandleChange={props.changeInputData} />
			) : (
				<Input data={props.data} dataState={props.dataState} onHandleChange={props.changeInputData} />
			)}
		</fieldset>
	);
}

function Input(props) {
	const electricity = ['T1', 'T2', 'T3'],
		water = ['Горячая вода', 'Холодная вода', 'Горячая вода (пред. м.)', 'Холодная вода (пред. м.)'];

	let items;

	const handleChange = (event) => {
		props.onHandleChange(event.target);
	};
  const clearSymbol = (event) => {
    event.target.value = event.target.value.replace(/[^.\d]/g,'')
  }

	if (props.data === 'water') {
		items = water.map((item, index) => {
			return (
				<label className="form__label" key={index}>
					{item}
					<input
						className="form__input"
						type="text"
            value={props.dataState[item.toLowerCase()]}
						data-option={item.toLowerCase()}
						onChange={handleChange}
            onKeyUp={clearSymbol}
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
						type="text"
						min="0"
						data-option={item.toLowerCase()}
						onChange={handleChange}
            onKeyUp={clearSymbol}
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
