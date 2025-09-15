// this is a comment in javascript

// this is the loading event using an anonymous function
window.onload = () =>{
    // alert('page has loaded')
    console.log('page is loaded')
    
    //gives us an array, which is a data structure made up of a collection of variables, 
    //you can't easily modify a paragraph using getElementsByTagNames

    let allMyParagraphs = document.getElementsByTagName('p')
    console.log(allMyParagraphs)

    let blueParagraphs = document.getElementsByClassName('blue-paragraph')
    console.log(blueParagraphs)

    // we don't want to manipulate an array, it is harder to retrieve the data 
    //arrays are comprised of a series of data IN ORDER
    // #1 element = 0, #2 element = 1

    console.log(allMyParagraphs[0])
    
    // ids are the best way to retrieve individual elements on the page
    let importantParagraph = document.getElementById('important-paragraph')
    console.log(importantParagraph)

    //modify content with js
    importantParagraph.innerHTML = 'this is my new paragraph text <span>this is in a span</span>'
    importantParagraph.style.color = "violet"

    importantParagraph.classList.add("red-paragraph")
    
    let button = document.getElementById('click')
    button.addEventListener("click", ()=>{
        // 1st step: we need to create a variable that is an instance of the element
        //this creates a reference to the p temaplate that js has, but not adding anythign to it yet 
        let newElement = document.createElement('p')
        // add contetn to element
        newElement.textContent = "hi"
        newElement.classList.add('greetings')
        // reference to where we are adding the new element
        let container = document.body //body has a shorthand because it is used often
        // add the element to the page
        container.appendChild(newElement)
    })
    // button.onclick

    let byeButton = document.getElementById('bye')
    byeButton.addEventListener('click', ()=>{
        // retrieving all of the paragraphs that  contain "greetings" class
        let allMyGreetings = document.getElementsByClassName("greetings")
        console.log(allMyGreetings)
        allMyGreetings[0].remove()

    })
}