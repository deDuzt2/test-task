const selects = document.querySelectorAll('select');

selects.forEach(function (select) {
	const options = select.querySelectorAll('option');
	const span = select.previousElementSibling.querySelector('span');
	let ul = document.createElement('ul');
	select.after(ul);
	const clear = ul.nextElementSibling.querySelector('.clear');
	const confirm = ul.nextElementSibling.querySelector('.button');
	const block = select.parentElement;
	const buttonCounter = block.previousElementSibling.querySelector('.button-counter');
	const mainCounter = buttonCounter.querySelector('span');
	const mainInput = block.nextElementSibling;
	const back = block.querySelector('img');





	buttonCounter.addEventListener('click', function () {
		block.style.display = 'block';
	})



	confirm.addEventListener('click', function () {																//back with change selected
		block.style.display = 'none';
		inputChoise();
		link();
	})

	back.addEventListener('click', function () {
		block.style.display = 'none';
		for (let i = 0; i < options.length; i++) {
			console.log(options[i].getAttribute('selected') === 'true')											//back without change selected
			if (options[i].getAttribute('selected') === 'true') {
				list[i].classList.add('selected');
			} else {
				list[i].classList.remove('selected');
			}
		}
		reCounter();
	})


	function createList() {
		options.forEach(function (item) {
			let li = document.createElement('li');
			li.innerText = item.text;																			//create list items
			if (item.selected === true) {
				li.classList.add('selected');
			}
			ul.append(li);
		})
	}
	createList();


	const list = ul.querySelectorAll('li');

	function link() {
		for (let i = 0; i < list.length; i++) {
			if (list[i].classList.value === 'selected') {
				options[i].setAttribute('selected', 'true');
			} else {
				options[i].setAttribute('selected', 'false');
			}
		}
	}
	link();

	function reCounter() {
		let counter = 0;
		list.forEach(function (item) {
			if (item.classList.value === 'selected') {																//started value of counter
				counter++;
			}
		})
		span.innerHTML = counter;
		mainCounter.innerHTML = counter;
	}
	reCounter();


	function inputChoise() {																						//change main input when confirm
		let textInput = '';
		list.forEach(function (item) {
			if (item.classList.value === 'selected') {
				textInput += item.textContent + ', '
			}
		})
		textInput = textInput.slice(0, -2);
		mainInput.value = textInput;
		if (textInput) {
			mainInput.classList.add('main-input_fill')
		} else {
			mainInput.classList.remove('main-input_fill')
		}
	}
	inputChoise();


	const input = select.previousElementSibling.querySelector('input');

	input.addEventListener('input', ({ target }) => {
		list.forEach(function (item) {
			let reg = new RegExp(target.value, 'gi');
			if (reg.test(item.textContent)) {
				item.innerHTML = item.textContent.replace(reg, match => `<b>${match}</b>`);						//search and highlight 
				item.style.display = 'block';
			} else {
				item.style.display = 'none';
			}
		})
	})

	list.forEach(function (item) {

		item.addEventListener('click', function (e) {
			if (e.target === list[0]) {
				if (item.classList.value) {
					list.forEach(function (item) {																//select other list item when selected 'all objects'
						item.classList.remove('selected')
					})
				} else {
					list.forEach(function (item) {
						item.classList.add('selected')
					})
				}
			} else {
				item.classList.toggle('selected');
			}

			let countSelected = 0;
			for (let i = 1; i < list.length; i++) {																//select 'all objects' when selected other items
				if (list[i].classList.value === 'selected') {
					countSelected++;
				}
			}
			if (countSelected >= list.length - 1) {
				list[0].classList.add('selected');
			} else {
				list[0].classList.remove('selected');
			}

			reCounter();
		})
	})


	clear.addEventListener('click', function () {																// button remove all choice
		list.forEach(function (item) {
			item.classList.remove('selected');
		})
		reCounter();
	})

})