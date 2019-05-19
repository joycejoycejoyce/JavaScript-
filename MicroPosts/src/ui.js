class UI{
    constructor(){
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add';
    }
    showPosts(posts) {
        let output = ``;
        posts.forEach((item)=>{
            output +=`
            <div class="card text-white bg-secondary mb-3">
            <div class="card-body">
              <h4 class="card-title">${item.title}</h4>
              <p class="card-text">${item.body}</p>
              <a href="#" class="edit card-link" data-id="${item.id}">
                <i class="fas fa-pen"></i>
              </a>
              <a href="#" class="delete card-link" data-id="${item.id}">
                <i class="fas fa-times"></i>
              </a>
            </div>
          </div>
            `;
        })
        this.post.innerHTML = output;
        console.log(`is called`);
    }
    showAlert(message, className){
      this.clearAlert();
      const div = document.createElement('div');
      div.className = className;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.postsContainer');
      const posts = document.querySelector('#posts');
      container.insertBefore(div, posts);

      setTimeout(()=>{
        this.clearAlert();
      }, 3000);
    }
    clearAlert(){
      const currentAlert = document.querySelector('.alert');
      if (currentAlert){currentAlert.remove()};
    }
    clearField(){
      this.titleInput.value = ''
      this.bodyInput.value = ''
    }
}

export const ui = new UI();