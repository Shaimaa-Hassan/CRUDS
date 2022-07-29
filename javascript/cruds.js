//1//get total
//2//create products
//3//save localstorage
//4//clear inputs
//5//read
//6//count
//7//delete
//8//update
//9//search
//10//clean data
////////////////////////////////////////////////////////////////////////////////////////////
let title = document.getElementById("title"),
price =document.getElementById("price"),
taxes =document.getElementById("taxes"),
ads =document.getElementById("ads"),
discount =document.getElementById("discount"),
total =document.getElementById("total"),
count =document.getElementById("count"),
category =document.getElementById("category"),
submit =document.getElementById("submit");
let mode ="create";
let tmb ;
// console.log(title,price,taxes,ads,discount,total,count,category,submit);
///////////////////////////////////////
//get total
function getTotal(){
    // console.log("done");
    if(price.value!=""){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        // let result = parseInt((+price.value + +taxes.value + +ads.value) - +discount.value);//another correct code
        total.innerHTML=result;
        total.style.background="green";
    }
    else{
        total.innerHTML="";
        total.style.background="rgb(155, 4, 4)";
    }
}
/////////////////////////////////////////////////////
//create
let dataarr;
// if(localStorage.getItem("products")){//another correct code
if(localStorage.products!=null){
  dataarr= JSON.parse(localStorage.products);//return to it's object value 
}
else{
 dataarr =[];
}

submit.onclick = function(){
    let dataobj ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    };
    // console.log(dataobj);
    //count
if(title.value !="" && price.value!="" && dataobj.count<=100 && category.value!=""){//if title value is not equal null only you can create or update
if(mode==="create"){
       if(dataobj.count>1){
          for(let i=0; i<(dataobj.count);i++){
            dataarr.push(dataobj);
        }
    }
      else{
    dataarr.push(dataobj);
    }
}
else{
    dataarr[tmb]=dataobj;
    mode ="create";
    submit.innerHTML="create";
    count.style.display="block";
}
clearData();

}

    // console.log(dataarr);
    //save localstorage
    localStorage.setItem("products", JSON.stringify(dataarr));//localstorage take only string value 

    showData();
}
/////////////////////////////////////////////////////////
//clear inputs

function clearData(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}
/////////////////////////////////////////////
//read
function showData(){
    getTotal();
    let table="";
    for(let i=0; i<dataarr.length;i++){
        table+=`<tr>    
                        <td class="p-2">${i+1}</td>
                        <td class="p-2">${dataarr[i].title}</td>
                        <td class="p-2">${dataarr[i].price}</td>
                        <td class="p-2">${dataarr[i].taxes}</td>
                        <td class="p-2">${dataarr[i].ads}</td>
                        <td class="p-2">${dataarr[i].discount}</td>
                        <td class="p-2">${dataarr[i].total}</td>
                        <td class="p-2">${dataarr[i].category}</td>
                        <td class="p-2"><button onclick="updateData(${i});" class="text-capitalize inpbtn border-0 text-white-50 p-2 rounded" style="transition: 0.5s;background: #390053 ;height: 30px;" id="update">update</button></td>
                        <td class="p-2"><button onclick="deleteData(${i});" class="text-capitalize inpbtn border-0 p-2 text-white-50 rounded" style="transition: 0.5s;background: #390053 ;height: 30px;" id="delete">delete</button></td>
                    </tr>`
    }
   document.getElementById("tbody").innerHTML=table; 
   let btnDelete=  document.getElementById("delete-all");
   if(dataarr.length>0){
    btnDelete.innerHTML=` <button onclick="deleteAll();" class="p-2 my-2 text-capitalize p-2 inpbtn w-100 border-0 text-white-50 rounded " style="transition: 0.5s;background: #390053 ;height: 30px;" id="delete-all-done">delete all(${dataarr.length})</button> `
   }
   else{
    btnDelete.innerHTML="";
   }
}
showData();
/////////////////////////////////////////////////////
//delete
function deleteData(id){
// console.log(id);
dataarr.splice(id,1);
localStorage.products=JSON.stringify(dataarr);
showData();
}
/////////////////////////////////////////////////////////
//delete all
function deleteAll(){
    dataarr.splice(0);//dataarr=[];//another correct code
    localStorage.products=JSON.stringify(dataarr);
showData();
}
///////////////////////////////////////////////////
//update
function updateData(id){
    // console.log(id);
title.value= dataarr[id].title;
price.value= dataarr[id].price;
taxes.value= dataarr[id].taxes;
ads.value= dataarr[id].ads;
discount.value= dataarr[id].discount;
getTotal();
count.style.display="none";
category.value= dataarr[id].category;
submit.innerHTML="update";
mode ="update";
tmb =id;
scroll({top:0,
         behavior:"smooth"});
}
///////////////////////////////////////////////////////////
//search mode
let searchmode="title";

function getSearchMode(id){
// console.log(id);
let search = document.getElementById("search");
if(id==="search-title"){
    searchmode ="title";
    // search.placeholder="search by title ";//another correct code
}
else{
    searchmode="category";
    // search.placeholder="search by category ";//another correct code
}
search.placeholder="search by" +" "+ searchmode;

// console.log(searchmode);
search.focus();
search.value="";
showData();
}
/////////////////////////////////////////////////////////////////////////////////
//search
function searchData(valued){
// console.log(valued);
let table="";


for(let i=0;i<dataarr.length;i++){

if(searchmode=="title"){

   if(dataarr[i].title.includes(valued.toLowerCase())){
    console.log(i);

    table+=`<tr>    
    <td class="p-2">${i}</td>
    <td class="p-2">${dataarr[i].title}</td>
    <td class="p-2">${dataarr[i].price}</td>
    <td class="p-2">${dataarr[i].taxes}</td>
    <td class="p-2">${dataarr[i].ads}</td>
    <td class="p-2">${dataarr[i].discount}</td>
    <td class="p-2">${dataarr[i].total}</td>
    <td class="p-2">${dataarr[i].category}</td>
    <td class="p-2"><button onclick="updateData(${i});" class="text-capitalize inpbtn border-0 text-white-50 p-2 rounded" style="transition: 0.5s;background: #390053 ;height: 30px;" id="update">update</button></td>
    <td class="p-2"><button onclick="deleteData(${i});" class="text-capitalize inpbtn border-0 p-2 text-white-50 rounded" style="transition: 0.5s;background: #390053 ;height: 30px;" id="delete">delete</button></td>
    </tr>`;
   }

}
else{

        if(dataarr[i].category.includes(valued.toLowerCase())){
         console.log(i);
     
         table+=`<tr>    
         <td class="p-2">${i}</td>
         <td class="p-2">${dataarr[i].title}</td>
         <td class="p-2">${dataarr[i].price}</td>
         <td class="p-2">${dataarr[i].taxes}</td>
         <td class="p-2">${dataarr[i].ads}</td>
         <td class="p-2">${dataarr[i].discount}</td>
         <td class="p-2">${dataarr[i].total}</td>
         <td class="p-2">${dataarr[i].category}</td>
         <td class="p-2"><button onclick="updateData(${i});" class="text-capitalize inpbtn border-0 text-white-50 p-2 rounded" style="transition: 0.5s;background: #390053 ;height: 30px;" id="update">update</button></td>
         <td class="p-2"><button onclick="deleteData(${i});" class="text-capitalize inpbtn border-0 p-2 text-white-50 rounded" style="transition: 0.5s;background: #390053 ;height: 30px;" id="delete">delete</button></td>
         </tr>`;
        }
     
      
     }   

}

document.getElementById("tbody").innerHTML=table; 

}


