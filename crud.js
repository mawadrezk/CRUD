
// هنعمل دالة تحسب السعر بعد اضافة الضرايب والاعلانات تخصم الخصم وتطلع السعر الاجمالى 
// 1-get total
// 2-function create product
// 3-function save data in local storage
// function clear input 
//read product in table
//count
//delete
//update
//search
//clean data

//اول شى هنادى ع الداتا  المدخلات وامسكها

let title=document.getElementById('title')
let price=document.getElementById('price')
let taxes=document.getElementById('taxes')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let total=document.getElementById('total')
let count=document.getElementById('count')
let category=document.getElementById('category')
let submit=document.getElementById('submit')
let mood ='create'
let tmp;
//للتاكد من مسكهم نعملهم كونسل لوج

// console.log(title,price,taxes,ads,discount,total,count,category,submit)

// 1-get total
// هنعمل دالة تحسب السعر بعد اضافة الضرايب والاعلانات تخصم الخصم وتطلع السعر الاجمالى 
//هنا هيجمع السعر مع الضرايب مع الاعلانات ويخصم منها الخصم

function getTotal(){
   // console.log("done")   للتاكد من تشغيل الدالةة عندما نكتب اى رقم ف الخانات يظهر done
    if(price.value !='' && taxes.value !='' && ads.value!='' ){
        let result =(+price.value  + +taxes.value + +ads.value)
         - + discount.value;
     total.innerHTML=result;
     total.style.background ="#040"

    }else{
        total.innerHTML='';
        total.style.background ="#a00d02"


    }
}

// 2-function create product
//افضل مكان لحفظ الداتا هو مصفوفة اريى

let datapro ;
if(localStorage.product !=null){
    datapro=JSON.parse(localStorage.product)
}else{
    datapro=[];
}


submit.onclick =function(){
    let newpro ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),

    }

//COUNT


if(mood=='create'){
if(newpro.count >1){
    for(let i=0;i<newpro.count;i++){
    datapro.push(newpro)

    }
}else{
        datapro.push(newpro)


}



}else{
    datapro[tmp]=newpro;  //لما المود بيكون تحديث بيعدل ف الصف فقط ولا ينشي صف جديد
   mood= 'create';
   submit.innerHTML="create"  //رجع الزار لكلمة  انشاء
   count.style.display='block'  //اظهر العدد

}



    localStorage.setItem('product',JSON.stringify(datapro))

    console.log(datapro)
ClearData()
    showdata()


}


// function clear input 


   function ClearData(){
       title.value ='';
        price.value ='';
       taxes.value ='';
       ads.value ='';
       discount.value ='';
       total.innerHTML ='';
       count.value ='';
       category.value ='';

        
}

//read product in table


function showdata(){
    getTotal()
    let table ='';
    for(let i=0 ;i<datapro.length;i++){
        table+= `
            <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>

                       <td> <button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>



                    </tr>
        
        `
    }

    document.getElementById('tbody').innerHTML=table;

    //عمل زرار مسح كل الداتا لو فية بيانات 
    let btnDelete =document.getElementById('DeleteALL')
    if(datapro.length> 0){
        btnDelete.innerHTML=`
        <button onclick= "deleteAll()" >delete All(${datapro.length}) </button>
        `
    }else{
        btnDelete.innerHTML=''
    }




}

    showdata()




    


//delete data 
function deleteData(i){
    //حذف العنصر من خلال رقمة
datapro.splice(i,1);
//تحديث الذاكرة بعد المسح
localStorage.product=JSON.stringify(datapro)
//نستدعى اظهار الداتا الجدول مرة اخرى بعد الحذف 
showdata()
}
 


function deleteAll(){
    //البيانات علشان تمسحها لازم من  من (array ,  localstorge)
    localStorage.clear()
    datapro.splice(0)
    //كدا مسحنا الداتا  من الصفر للاخر 
    showdata()


}


//update

function updateData(i){
  title.value =datapro[i].title;
        price.value =datapro[i].price;
       taxes.value =datapro[i].taxes;
       ads.value =datapro[i].ads;
       discount.value = datapro[i].discount;
       getTotal()    //شغل الدالة دى
      count.style.display ='none'    //لاتظهر    خانة العد
     category.value = datapro[i].category;
     submit.innerHTML='update'
     mood = 'update'
     tmp =i;
     scroll(       //لما احدث  اعمل سكرول لفوق
        { top:0,
            behavior:'smooth'   //اطلع براحة
        }
     )


    }


//search   by mood

let searchMood = 'title'
function getSearchMood(id){    //لما يشغل الدالة يمرر  id

    let search =document.getElementById('search')
if (id=='searchtitle'){
    searchMood = 'title'
    search.placeholder ='search by title'


}else{

    searchMood='category'
        search.placeholder ='search by category'  // لما اضغط ع زرار البحث  بالنوع تظهر الكلمة ف زرار البحث

}
search.focus()  //;كبر زرار الشيرش لما تضغط
search.value='';
showdata();
}

    function searchData(value){
        // console.log(value) كدا بقولة اى حاجة بكتبها ف السيرش اطبعها ف الكونسل 
        let table ='';
   
        if(searchMood == 'title'){
      for(let i=0 ; i< datapro.length;i++){  //هنعمل لوب ع المصفوفة الداتا ونشوف هل فيها الداتا  للى بنبحث عنها 
        if(datapro[i].title.includes(value.toLowerCase())){
            table+= `
             <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>

                       <td> <button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>



                    </tr>

            `

        }
      }

    }else{
         for(let i=0 ; i< datapro.length;i++){  //هنعمل لوب ع المصفوفة الداتا ونشوف هل فيها الداتا  للى بنبحث عنها 
        if(datapro[i].category.includes(value.toLowerCase())){  //البحث من خلال النوع كاتوجرى بنفس الكود الباقى
            table+=`
             <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>

                       <td> <button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>



                    </tr>
        
            
            
            
            `

        }
      }


    }
     
   
       document.getElementById('tbody').innerHTML=table;

   
    }


































// //


// let title = document.getElementById('title');
// let price = document.getElementById('price');
// let taxes = document.getElementById('taxes');
// let ads = document.getElementById('ads');
// let discount = document.getElementById('discount');
// let total = document.getElementById('total');
// let count = document.getElementById('count');
// let category = document.getElementById('category');
// let submit = document.getElementById('submit');

// // قراءة البيانات من localStorage
// let datapro = JSON.parse(localStorage.getItem('product')) || [];

// // 1- حساب السعر الإجمالي
// function getTotal() {
//     if (price.value !== '') {
//         let result =
//             Number(price.value || 0) +
//             Number(taxes.value || 0) +
//             Number(ads.value || 0) -
//             Number(discount.value || 0);

//         total.innerHTML = result;
//         total.style.background = '#040';
//     } else {
//         total.innerHTML = '';
//         total.style.background = '#a00d02';
//     }
// }

// // 2- مسح المدخلات
// function ClearData() {
//     title.value = '';
//     price.value = '';
//     taxes.value = '';
//     ads.value = '';
//     discount.value = '';
//     total.innerHTML = '';
//     count.value = '';
//     category.value = '';
//     total.style.background = '#a00d02';
// }

// // 3- إضافة منتج
// submit.onclick = function () {
//     if (title.value.trim() === '' ||
//         price.value === '' ||
//         category.value.trim() === '') {
//         alert('من فضلك أدخل اسم المنتج والسعر والتصنيف');
//         return;
//     }

//     let newpro = {
//         title: title.value,
//         price: price.value,
//         taxes: taxes.value || 0,
//         ads: ads.value || 0,
//         discount: discount.value || 0,
//         total: total.innerHTML,
//         count: count.value === '' ? 1 : Number(count.value),
//         category: category.value
//     };

//     let amount = newpro.count;

//     if (amount < 1) {
//         alert('العدد يجب أن يكون 1 على الأقل');
//         return;
//     }

//     for (let i = 0; i < amount; i++) {
//         datapro.push({ ...newpro, count: 1 });
//     }

//     localStorage.setItem('product', JSON.stringify(datapro));

//     ClearData();
//     showdata();
// };

// // 4- عرض المنتجات
// function showdata() {
//     let table = '';

//     for (let i = 0; i < datapro.length; i++) {
//         table += `
//             <tr>
//                 <td>${i + 1}</td>
//                 <td>${datapro[i].title}</td>
//                 <td>${datapro[i].price}</td>
//                 <td>${datapro[i].taxes}</td>
//                 <td>${datapro[i].ads}</td>
//                 <td>${datapro[i].discount}</td>
//                 <td>${datapro[i].total}</td>
//                 <td>${datapro[i].category}</td>
//                 <td>
//                     <button onclick="updateData(${i})">تعديل</button>
//                 </td>
//                 <td>
//                     <button onclick="deleteData(${i})">حذف</button>
//                 </td>
//             </tr>
//         `;
//     }

//     document.getElementById('tbody').innerHTML = table;
// }

// // 5- حذف منتج
// function deleteData(i) {
//     datapro.splice(i, 1);

//     localStorage.setItem('product', JSON.stringify(datapro));

//     showdata();
// }

// // 6- تعديل منتج
// function updateData(i) {
//     title.value = datapro[i].title;
//     price.value = datapro[i].price;
//     taxes.value = datapro[i].taxes;
//     ads.value = datapro[i].ads;
//     discount.value = datapro[i].discount;
//     count.value = 1;
//     category.value = datapro[i].category;

//     getTotal();

//     submit.innerHTML = 'تحديث';

//     submit.onclick = function () {
//         datapro[i].title = title.value;
//         datapro[i].price = price.value;
//         datapro[i].taxes = taxes.value || 0;
//         datapro[i].ads = ads.value || 0;
//         datapro[i].discount = discount.value || 0;
//         datapro[i].total = total.innerHTML;
//         datapro[i].category = category.value;

//         localStorage.setItem('product', JSON.stringify(datapro));

//         ClearData();
//         submit.innerHTML = 'creat';
//         submit.onclick = addProduct;
//         showdata();
//     };
// }

// // فصل الإضافة في دالة مستقلة لإعادة ربط الزر بعد التعديل
// function addProduct() {
//     if (title.value.trim() === '' ||
//         price.value === '' ||
//         category.value.trim() === '') {
//         alert('من فضلك أدخل اسم المنتج والسعر والتصنيف');
//         return;
//     }

//     let amount = Number(count.value || 1);

//     if (!Number.isInteger(amount) || amount < 1) {
//         alert('العدد يجب أن يكون عددًا صحيحًا أكبر من صفر');
//         return;
//     }

//     let newpro = {
//         title: title.value,
//         price: price.value,
//         taxes: taxes.value || 0,
//         ads: ads.value || 0,
//         discount: discount.value || 0,
//         total: total.innerHTML,
//         count: 1,
//         category: category.value
//     };

//     for (let i = 0; i < amount; i++) {
//         datapro.push({ ...newpro });
//     }

//     localStorage.setItem('product', JSON.stringify(datapro));
//     ClearData();
//     showdata();
// }

// // ربط زر الإضافة بالدالة
// submit.onclick = addProduct;

// // عرض البيانات عند فتح الصفحة
// showdata();
