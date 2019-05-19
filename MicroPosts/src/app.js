import {http} from './http';
import {ui} from './ui';


// Get posts on DOM load 
document.addEventListener('DOMContentLoaded', getPosts);
document.querySelector('.post-submit').addEventListener('click', submitPost);
document.querySelector('#posts').addEventListener('click', deletePost);
document.querySelector('#posts').addEventListener('click', enableEdit);
document.querySelector('.card-form').addEventListener('click', cancalEdit);

function getPosts(){
    http.get('http://localhost:3000/posts')
    .then(data=>{ui.showPosts(data)})
    .catch(err=> console.log(err));
}

function submitPost(){
    let title = document.getElementById('title').value;
    let body = document.getElementById('body').value;

    if (title == "" || body==""){
        ui.showAlert('Please fill in field', 'alert alert-danger');
        return;
    }
    let obj = {
        title: title,
        body : body,
    };
    if (document.getElementById("id").value === ''){
     
        window.fetch( 'http://localhost:3000/posts/', {
            method: 'POST',
            headers:{'Content-Type' : 'application/json'},
            body: JSON.stringify(obj)}
        )
        .then(data=>{
            ui.showAlert('Post added', 'alert alert-success');
            ui.clearField();
            getPosts()
        })
        .catch(err=>{console.log('error when post to server', err)}); 
    }else{
        window.fetch( `http://localhost:3000/posts/${document.getElementById('id').value}`, {
            method: 'PUT',
            headers:{'Content-Type' : 'application/json'},
            body: JSON.stringify(obj)}
        )
        .then(data=>{
            ui.showAlert('Post added', 'alert alert-success');
            ui.changeFormState('add');
            getPosts()
        })
        .catch(err=>{console.log('error when post to server', err)}); 

    }
    
    
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

function enableEdit(e){
    if (e.target.parentElement.classList.contains('edit')){
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;
        const data = {
            id : id,
            title: title,
            body: body
        }
        ui.fillForm(data);
        
    }

    console.log(`e target `, id);
    e.preventDefault();
}

function cancalEdit(e){
    if (e.target.classList.contains('post-cancel')){
        ui.changeFormState('add');
    }
    e.preventDefault();
}