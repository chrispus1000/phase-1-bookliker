const apiHeader = {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
  //api
  const get = (url) => {
    return fetch(url).then(resp => resp.json())
  }
  const patch = (url, id, bodyObj) => {
    return fetch(url + id, {
      method: "PATCH",
      headers: apiHeader,
      body: JSON.stringify(bodyObj)
    }).then(resp => resp.json())
  }
  const API = {get, patch}
  //const
  const booksUrl = 'http://localhost:3000/books/'
  const listEl = document.querySelector('#list')
  const showPanel = document.querySelector('#show-panel')
  const currentUser = {"id":1, "username":"pouros"}
  //functions (don't forget to call the main fuction!)
  const getAllBooks = () => {
    API.get(booksUrl).then(books => books.forEach(book => bookPreview (book)))
  }
  const bookPreview = (book) => {
    const li = document.createElement('li')
    li.innerText = book.title
    li.addEventListener('click', () => bookDetails(book))
    listEl.append(li)
  }
  const bookDetails = (book) => {
    while (showPanel.firstChild) showPanel.removeChild(showPanel.firstChild)
    const h2 = document.createElement('h2')
    h2.innerText = book.title
    const p = document.createElement('p')
    p.innerText = book.description
    const img = document.createElement('img')
    img.src = book.img_url
    const button = document.createElement('button')
    if (readBook) {button.innerText = "Like"} else {
      button.innerText = "Liked"
    }
    const usersUl = document.createElement('ul')
    usersUl.id = 'users-ul'
    button.addEventListener('click', () => handleButtonClick(book, usersUl))
    book.users.forEach(bookUser => {
      const li = document.createElement('li')
      li.innerText = bookUser.username
      li.id =`user-${bookUser.id}`
      usersUl.append(li)
    })
    showPanel.append(img, h2, p, button , usersUl)
  }
    const handleButtonClick = (book, ul) => {
      if (!readBook(book)) {
        book.users.push(currentUser)
        API.patch(booksUrl, book.id, book).then(makeLi(ul))
      }
      else {
         book.users = book.users.filter(bkUsr => bkUsr.id !== currentUser.id)
        API.patch(booksUrl, book.id, book).then(removeLi)
      }
  }
  const makeLi = (ul) => {
    const li = document.createElement('li')
    li.innerText = currentUser.username
    li.id = `user-${currentUser.id}`
    ul.append(li)
  }
  const removeLi = () => {
    const foundLi = document.querySelector(`#user-${currentUser.id}`)
    foundLi.remove()
  }
    const readBook = (book) => {
      return book.users.find(bookUsr => bookUsr.id === currentUser.id)
  }
  getAllBooks()
 
  
  
  
  
  
  