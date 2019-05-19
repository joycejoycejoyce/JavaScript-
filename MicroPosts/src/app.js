import {http} from './http';
import {ui} from './ui';


// Get posts on DOM load 
document.addEventListener('DOMContentLoaded', getPosts);
document.querySelector('.post-submit').addEventListener('click', submitPost);
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