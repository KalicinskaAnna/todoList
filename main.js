let todoInput
let errorInfo
let addBtn
let ulList
let newToDo

let popup
let popupInfo
let todoEdit
let popupInput
let popupAddBtn
let popupCloseBtn

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')
	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup-info')
	popupInput = document.querySelector('.popup-input')
	popupAddBtn = document.querySelector('.accept')
}
popupCloseBtn = document.querySelector('.cancel')

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewToDo)
	ulList.addEventListener('click', checkClick)
	popupCloseBtn.addEventListener('click', closeEditTodo)
	popupAddBtn.addEventListener('click', changeTodoText)
	todoInput.addEventListener('keyup', enterAdd)
}

const addNewToDo = () => {
	if (todoInput.value !== '') {
		newToDo = document.createElement('li')
		newToDo.textContent = todoInput.value
		ulList.append(newToDo)
		todoInput.value = ''
		errorInfo.textContent = ''
		createToolsDiv()
	} else {
		errorInfo.textContent = 'Wpisz treść zadania!'
	}
}

const createToolsDiv = () => {
	let divTools = document.createElement('div')
	let btnCompleteTools = document.createElement('button')
	let btnEditTools = document.createElement('button')
	let btnDeleteTools = document.createElement('button')

	divTools.classList.add('tools')
	btnCompleteTools.classList.add('complete')
	btnEditTools.classList.add('edit')
	btnDeleteTools.classList.add('delete')

	btnCompleteTools.innerHTML = '<i class="fas fa-check"></i>'
	btnEditTools.textContent = 'EDYTUJ'
	btnDeleteTools.innerHTML = '<i class="fas fa-times"></i>'

	divTools.append(btnCompleteTools, btnEditTools, btnDeleteTools)
	newToDo.append(divTools)
}

const checkClick = e => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed')
		e.target.classList.toggle('completed')
	} else if (e.target.matches('.delete')) {
		e.target.closest('li').remove()
		let allTodos = ulList.querySelectorAll('li')
		if (allTodos.length === 0) {
			errorInfo.textContent = 'Brak zadań'
		}
	} else if (e.target.matches('.edit')) {
		editTodo(e)
	}
}

const editTodo = e => {
	todoEdit = e.target.closest('li')
	console.log(todoEdit.firstChild.textContent)
	popupInput.value = todoEdit.firstChild.textContent
	console.log(popupInput.value)
	popup.style.display = 'flex'
}

const changeTodoText = params => {
	if (popupInput.value !== '') {
		todoEdit.firstChild.textContent = popupInput.value
		popup.style.display = 'none'
		popupInfo.textContent = ''
	} else {
		popupInfo.textContent = 'Musisz wprowadzić jakąś treść'
	}
}
const closeEditTodo = () => {
	popup.style.display = 'none'
	popupInfo.textContent = ''
}
const enterAdd = e => {
	if (e.key === 'Enter') {
		addNewToDo()
	}
}

document.addEventListener('DOMContentLoaded', main)
