const formContainer = document.getElementById('formContainer');
const myForm = document.getElementById('myForm');
const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn')
// Open the bookmark form 
openBtn.addEventListener('click',()=>{
    formContainer.classList.toggle('show');
})




// close the bookmark form 
closeBtn.addEventListener('click',()=>{
    formContainer.classList.remove('show')
})


// Google Search 
const googleForm = document.getElementById('googleForm');

googleForm.addEventListener('submit',searchGoogle);

function searchGoogle(e){
    e.preventDefault()
    let googleInput = document.getElementById('googleInput').value;
    if(!googleInput){
        alert("please enter the term to search")
        return false;
    }

    location.href=`https://www.google.com/search?q=${googleInput}`
}




// **************** Bookmark  Stuff ***************

myForm.addEventListener('submit',saveBookmark)



// save Bookmark 
function saveBookmark(e){
    e.preventDefault()
    console.log('hello')
    let siteName = document.getElementById("siteName").value ;
    let siteUrl = document.getElementById('siteUrl').value;

    if(!siteName || !siteName ){
        alert("Please fill in the form")
        return false;    
    }

    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);
    
    if(!siteUrl.match(regex)){
        alert("Invalid url, Please fill the form correctly")
        return false;
    }

    let bookmark = {
        name:siteName,
        url:siteUrl,
    }

    // console.log(bookmark)
    if(localStorage.getItem('bookmarks')===null){
        let bookmarks = []
        bookmarks.push(bookmark)
        console.log(bookmarks)
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
        console.log("added...")
    }else{

        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
        bookmarks.push(bookmark)
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
        console.log("added...")
        
    }
    formContainer.classList.remove('show')
  fetchBookmarks()
}


// Fetching Bookmark 
function fetchBookmarks(){

    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    const bookmarkResults = document.getElementById('bookmarkResults')
    bookmarkResults.innerHTML= "" ;
    
    for(let i=0;i<bookmarks.length;i++){
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;
        bookmarkResults.innerHTML+=`    <div class="bookmarkResult">
        <button class="btn"> <a href=${url}><i class="fas fa-bookmark"></i></a></a></button>
        <small>${name} </small>
    </div>`
        
    }


    
}


