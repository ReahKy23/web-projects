window.onload = () =>{
    getPosts()
}

async function getPosts() {
    let container = document.getElementById('all-posts')
    let response = await fetch('/all-posts')
    let json = await response.json()
    console.log(json.posts)

    for(let p of json.posts){
        let newElement = document.createElement('div')
        newElement.classList.add('post')
        
        let title = document.createElement('h2')
        title.textContent = p.title
        
        let img = document.createElement('img')
        img.src = p.imgSrc
        
        let caption = document.createElement('p')
        caption.textContent = p.caption

        newElement.appendChild(title)
        newElement.appendChild(img)
        newElement.appendChild(caption)
        
        container.appendChild(newElement)
    }
}