import {http} from './http';
import {ui} from './ui';


// Get posts on DOM load 
document.addEventListener('DOMContentLoaded', getPosts);
document.querySelector('.post-submit').addEventListener('click', submitPost);
document.querySelector('#posts').addEventListener('click', deletePost);

function getPosts(){
    http.get('http://localhost:3000/posts')
    .then(data=>{ui.showPosts(data)})
    .catch(err=> console.log(err));
}

function submitPost(){
    let title = document.getElementById('title').value;
    let body = document.getElementById('body').value;
    let obj = {
        title: title,
        body : body,
    }
    window.fetch('http://localhost:3000/posts', {
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then(data=>{
        ui.showAlert('Post added', 'alert alert-success');
        ui.clearField();
        getPosts()
    })
    .catch(err=>{console.log('error when post to server', err)});
}

function deletePost(e){
    if (e.target.parentElement.classList.contains('delete')){
        const id = e.target.parentElement.dataset.id;
        if (confirm(`Are you sure you want to delete the post?`)){
            http.delete(`http://localhost:3000/posts/${id}`)
            .then(data=>{
                ui.showAlert(data, 'alert alert-success');
                getPosts();
            })
            .catch(err=>{
                ui.showAlert(err, 'alert alert-danger');
            })
            ;
        }
    }
    e.preventDefault();
}