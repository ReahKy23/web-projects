window.onload = () => {
  // 1. we need to make a fetch request to the server/database to retrieve the posts that currently exist
  loadPosts();
};

async function loadPosts() {
  const postContainer = document.getElementById("all-posts");

  // retrieves the data from the database on my server
  const response = await fetch("/populate-posts");

  // converts teh response to json data
  const postsArray = await response.json();

  for (let post of postsArray) {
    // creates div that will hold all the post data and post class
    let newDiv = document.createElement('div')
    newDiv.classList.add('post')
    
    // span that holds the time
    let span = document.createElement('span')
    span.textContent = post.postTime

    // para that holds the text from the text from the database
    let paragraphText = document.createElement('p')
    paragraphText.textContent = post.postText

    // create a button to delete posts
    let deleteButton = document.createElement('button')
    deleteButton.textContent = 'x'
    // grab the individual id by using post._id
    deleteButton.addEventListener('click', ()=>{
        handleClick(post._id)
    })

    newDiv.append(deleteButton)
    newDiv.append(span)
    newDiv.append(paragraphText)

    postContainer.append(newDiv)
    
  }
}
// want to pass in the unique id created by the db
async function handleClick(postId){
    console.log('button was clicked: ' + postId)

    // the {} is the object(?) feature of fetch
    // making the delete request
    await fetch ('/delete-post', {
        // method is the type of request
        method: "DELETE",
        // body is the data sent in json format
        body: JSON.stringify({id: postId}),
        // headers are what type of data should the server expect 
        headers: {
            "Content-Type": "application/json"
        }
    }).then(()=>{
        window.location.href='/'
    })
    
}