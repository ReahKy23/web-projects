window.onload = () => {
  const sugBtn = document.querySelector(".modalBtn");
  const modal = document.querySelector(".modal");
  const closeBtn = document.querySelector(".close");
  const oldLikeBtns = document.querySelectorAll('.old-post .likeBtn');
  const oldLikeCounts = document.querySelectorAll('.old-post .likeCount');
  const subBtn = document.getElementById('subBtn')
  const alert = document.getElementById('alert-modal')
  const alertClsd = document.getElementById('alert-close')
  const aboutBtn = document.getElementById('aboutpgBtn')

  // about page button
  aboutBtn.addEventListener('click',()=>{
    window.location.href = "about.html"
  })

  sugBtn.addEventListener("click", openModal);

  function openModal() {
    modal.style.display = "block";
  }

  closeBtn.addEventListener("click", closeModal);
  function closeModal() {
    modal.style.display = "none";
    alert.style.display = "none";
  }

   // Assign random like numbers to old posts
   oldLikeCounts.forEach((count) => {
    const randomLikes = Math.floor(Math.random() * 100); // 0–99
    count.textContent = randomLikes;
  });

  // Add click functionality for old posts
  oldLikeBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      let count = parseInt(oldLikeCounts[index].textContent);
      count++;
      oldLikeCounts[index].textContent = count;
    });
  });
  
  getPosts()
  
  subBtn.addEventListener("click", ()=>{
    modal.style.display = 'none';
    alert.classList.remove('hidden')
  })
  
  alertClsd.addEventListener("click", ()=>{
    alert.style.display = "none";
  })

  


  

};

async function getPosts() {
  let container = document.getElementById('postContainer')
  let response = await fetch('/all-posts')
  let json = await response.json()
  console.log(json.posts)

  for (let p of json.posts) {
    let newPost = document.createElement('div')
    newPost.classList.add('postUpload')

    let name = document.createElement('p')
    name.classList.add('postName')
    name.textContent = p.name + ' says:'
    newPost.appendChild(name)

    if (p.imgSrc) {
      let img = document.createElement('img')
      img.src = p.imgSrc
      newPost.appendChild(img)
    }

    let comment = document.createElement('div')
    comment.classList.add('postComment')
    comment.textContent = p.comment
    newPost.appendChild(comment)

    let likes = document.createElement('div')
    likes.classList.add('postLikes')

    let likeBtn = document.createElement('span')
    likeBtn.classList.add('likeBtn')
    likeBtn.textContent = "♡"

    let likeCount = document.createElement('span')
    likeCount.classList.add('likeCount')
    likeCount.textContent = "0"

    let likeText = document.createElement('span')
    likeText.textContent = " likes"

    likes.appendChild(likeBtn)
    likes.appendChild(likeCount)
    likes.appendChild(likeText)

    likeBtn.addEventListener('click', () => {
      let count = parseInt(likeCount.textContent)
      likeCount.textContent = count + 1
    })

    newPost.appendChild(likes)
    container.appendChild(newPost)
  }
}



