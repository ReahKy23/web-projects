// 1. global variables
let postContainer

// 2. wait for window to load
window.onload = () =>{
    //make sure that element is loaded + exists before using it
    postContainer = document.getElementById('posts')

    // populate div with all of the data from the guestbook (allMessages)
    getMessages()

}

// 3. helper functions
// asynch means that we can use fetch
// async need an "await" pair
async function getMessages(){

    // using fetch api to make a request to my server
    let response = await fetch('/all-messages')
    console.log(response)

    let json = await response.json()
    console.log(json.notes)

    for(let n of json.notes){
        let newElement = document.createElement('div')
        let title = document.createElement('h3')
        title.textContent = n.username
        let paragraph = document.createElement('p')
        paragraph.textContent += ' says ' + n.message + ' at ' + n.date

        newElement.appendChild(title)
        newElement.appendChild(paragraph)
        postContainer.appendChild(newElement)
    }

}