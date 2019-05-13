// storage controller 
const StorageCtrl = (function(){
    
    return{
        storeItem: function(item){
            if (!localStorage.getItem('items')){
                items=[];
                items.push(item);
                localStorage.setItem('items', JSON.stringify(items));
            }else{
                items = JSON.parse(localStorage.getItem('items'));
                items.push(item);
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemsFromStorage: function(){
            return localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) :[];
        },
        updateItemStorage(item){
            var items = JSON.parse(localStorage.getItem('items'));
            items.forEach((i,index)=>{if (i.id === item[0].id){
                items.splice(index, 1, item[0]);
            }})
            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteItemStorage(updatedItem){
            var items = JSON.parse(localStorage.getItem('items'));
            items =items.filter((item)=> {return item.id !== updatedItem.id});
            localStorage.setItem('items',  JSON.stringify(items));
        },
        deleteAll(){
            localStorage.setItem('items', '');
        }
    }
}
)()


// item controller 
const ItemCtrl = (function(){
    // Item constructor 
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure / State 
    const data = {
        items : StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories : 0,
    }
    return {
        logData: function(){
            return data;
        },
        getItems: function(){
            return data.items;
        },
        addItem: function(name, cal){
            let ID;
            if (data.items.length > 0){
                ID = data.items[data.items.length -1].id +1;
            }else{
                ID = 0;
            }

            cal = parseInt(cal);
            let newItem = new Item(ID, name, cal);
            data.items.push(newItem);
            return newItem;
        },
        getTotalCalories: function(){
            let total= 0;
            data.items.forEach((item)=>{
                total +=item.calories;
            })
            data.totalCalories = total;
            return data.totalCalories;
        },
        getItemById: function(id){
            var found = null;
            found = data.items.filter((item)=>{
                if (item.id === id){return item}
            })
            return found[0];
        },
        setCurrentItem: function(item){
            data.currentItem = item;
        },
        getCurrentItem: function(){
            return data.currentItem;
        },
        updateItem: function(name, cal){
            cal = parseInt(cal);
            let found = null;
            found = data.items.filter((item)=>{ 
                if(item.id == data.currentItem.id){
                    item.name = name;
                    item.calories = cal;
                    return item;
                }
            });
            return found;
        },
        deleteItem: function(id){
            data.items = data.items.filter((item)=>{return item.id !== id})
        },
        clearItem: function(){
            data.items = [];
            data.currentItem = null;
            data.totalCalories = 0;
        }
    }
})()

// ui controller 
const UICtrl = (function(){
    const UISelectors ={
        itemList: '#item-list',
        itemListAll: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn:'.delete-btn',
        backBtn: '.back-btn',
        itemNameInput: '#meal',
        itemCalInput: '#cal', 
        totalCal: '#total-calories',
        clearAll: '.btn--clear-all',
    }
    // public methods 
    return {
        populateItemList: function(items){
            let html = ``;
            items.forEach(function(item){
                html +=`<li class="collection-item" id="item-${item.id}">
                        <strong>${item.name}: </strong>
                        <em> ${item.calories}</em>
                        <a href="#" class="secondary-content">
                            <i class="edit-item fas fa-pen"></i>
                        </a>
                    </li>
                `; 
            },
            );
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getSelectors: function(){
            return UISelectors;
        },
        getItemInput: function(){
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                cal: document.querySelector(UISelectors.itemCalInput).value
            }
        },
        addListItem: function(item){

            if(  document.querySelector(UISelectors.itemList).style.display === 'none'){
                document.querySelector(UISelectors.itemList).style.display = 'block';
           }
           
            const li = document.createElement('li');
            li.className = "collection-item";
            li.id = `item-${item.id}`;
            li.innerHTML = `
            <strong>${item.name}: </strong>
            <em> ${item.calories}</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fas fa-pen"></i>
            </a>
            `;
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        showTotalCalories: function(cal){
            document.querySelector(UISelectors.totalCal).innerHTML = cal;
        },
        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = ``;
            document.querySelector(UISelectors.itemCalInput).value = ``;
        },
        clearEditState: function(){
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline-block';
        },
        showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline-block';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline-block';
            document.querySelector(UISelectors.backBtn).style.display = 'inline-block';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        hindList : function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        addItemToForm: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCalInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        updateListItem: function(updated){
            let listItems = document.querySelectorAll(UISelectors.itemListAll);
            listItems=Array.from(listItems);
            listItems.forEach((item)=>{
                if (item.id ===`item-${updated[0].id}`){
                    document.querySelector(`#${item.id} strong`).innerHTML= updated[0].name;
                    document.querySelector(`#${item.id} em`).innerHTML= updated[0].calories;
                }
            })
        },
        deleteListItem: function(id){
            var item =document.querySelector(`#item-${id}`);
            item.remove();
        },
        deleteList : function(){
            document.querySelector(UISelectors.itemList).innerHTML='';
        }
    }
})()
// app controller 
const AppCtrl = (function(ItemCtrl, UICtrl, StorageCtrl){

    const loadEventListener = function(){
        const UISelectors = UICtrl.getSelectors();
        // add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateClick);
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
        document.querySelector(UISelectors.clearAll).addEventListener('click', clearAll);
    }

    const itemAddSubmit = function(e){
        // get form input from ui controller
        const input = UICtrl.getItemInput();
        if (input.name.trim() === "" && input.cal.trim() ===""){
            return;
        }
        const newItem = ItemCtrl.addItem(input.name, input.cal);
        UICtrl.addListItem(newItem);
        const totalCalories = ItemCtrl.getTotalCalories();
        UICtrl.showTotalCalories(totalCalories);
        UICtrl.clearInput();
        StorageCtrl.storeItem(newItem);
        e.preventDefault();
    }

    const itemEditClick= function(e){
        if (e.target.classList.contains('edit-item')){
           const listId = e.target.parentNode.parentNode.id;
           const id =  listId.split('-')[1];
           const itemToEdit = ItemCtrl.getItemById(parseInt(id));
           ItemCtrl.setCurrentItem(itemToEdit);
           UICtrl.addItemToForm();
        }
        e.preventDefault();
    }

    const itemUpdateClick = function(e){
        const input = UICtrl.getItemInput();
        const updatedItem = ItemCtrl.updateItem(input.name, input.cal);
        UICtrl.updateListItem(updatedItem);
        const totalCal = ItemCtrl.getTotalCalories();
        UICtrl.showTotalCalories(totalCal);
        StorageCtrl.updateItemStorage(updatedItem);
        UICtrl.clearEditState();
        e.preventDefault();
    }
    const itemDeleteSubmit = function(e){
        const currentItem = ItemCtrl.getCurrentItem();
        ItemCtrl.deleteItem(currentItem.id);
        UICtrl.deleteListItem(currentItem.id);
        const totalCal = ItemCtrl.getTotalCalories();
        UICtrl.showTotalCalories(totalCal);
        StorageCtrl.deleteItemStorage(currentItem);
        UICtrl.clearEditState();
        e.preventDefault();
    }

    const clearAll = function(e){
        // 1. clear all item in the itemctrl 
        ItemCtrl.clearItem();
        const totalCal = ItemCtrl.getTotalCalories();
        UICtrl.showTotalCalories(totalCal);
        UICtrl.deleteList();
        UICtrl.hindList();
        StorageCtrl.deleteAll();
        e.preventDefault();
    }
    return {
        init : function(){
            UICtrl.clearEditState();
            const items = ItemCtrl.getItems();
            items.length >0 ? UICtrl.populateItemList(items) : UICtrl.hindList();
            const totalCalories = ItemCtrl.getTotalCalories();
            UICtrl.showTotalCalories(totalCalories);
            loadEventListener(); 
        }
    }
})(ItemCtrl, UICtrl, StorageCtrl);

AppCtrl.init();