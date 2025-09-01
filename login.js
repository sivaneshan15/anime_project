 const form=document.forms[0]
 const username=document.getElementById("username")
 const eru=document.getElementsByClassName("error")[0]


 // email
const email=document.getElementById("email")
const ere=document.getElementsByClassName("error")[1]

// password
const pass=document.getElementById("password")
const erp=document.getElementsByClassName("error")[2]
 

form.addEventListener("submit",(u)=>{
u.preventDefault()
  const user= username.value.trim()
  let valid=0
if(user === ""){
    eru.innerHTML="*username required"
    eru.style.color="red"
    valid=1
}
else if(user.length < 8){
eru.innerHTML="*must be atleast 8 characters"
eru.style.color="red"
valid=1
}
else if(!/[A-Z]/.test(user)){
    eru.innerHTML="*atleast 1 uppercase letter"
    eru.style.color="red"
    valid=1
}
else if(!/[a-z]/.test(user)){
    eru.innerHTML="*atleast 1 lowercase letter"
    eru.style.color="red"
    valid=1
}
else if(!/[0-9]/.test(user)){
    eru.innerHTML="*atleast 1 number"
    eru.style.color="red"
    valid=1
}

else if(!/_/.test(user)){
    eru.innerHTML="*atleast 1 underscore(_)"
    eru.style.color="red"
    valid=1
}


else{
   eru.innerHTML=""

}


const emailvalue=email.value.trim()
const emailpattern= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
 if(emailvalue === ""){
ere.innerHTML="*email required"
ere.style.color="red"
valid=1
 }
 else if(!emailpattern.test(emailvalue)){
    ere.innerHTML="*invalid email"
    ere.style.color="red"
    valid=1
 }
 else{
    ere.innerHTML=""
 }

 const passval= pass.value.trim()
if(passval === ""){
    erp.innerHTML="*password required"
    erp.style.color="red"
    valid=1
}

 else if(passval.length<8){
    erp.innerHTML="*must be atleast 8 characters"
    erp.style.color="red"
    valid=1
 }
 else if(!/[A-Z]/.test(passval)){
    erp.innerHTML="*atleast 1 uppercase letter"
    erp.style.color="red"
    valid=1
}
else if(!/[a-z]/.test(passval)){
    erp.innerHTML="*atleast 1 lowercase letter"
    erp.style.color="red"
    valid=1
}
 else if(!/[0-9]/.test(passval)){
    erp.innerHTML="*atleast 1 number"
    erp.style.color="red"
 }

 else{
    erp.innerHTML=""
 }

 if (valid === 0) {
    window.location.href = "header.html";
 }
} )

window.addEventListener("load", () => {

  setTimeout(() => {
    const chidori = document.getElementById("chidori");
    const rasengon = document.getElementById("rasengon");


    chidori.style.opacity = "1";
    rasengon.style.opacity = "1";
  }, 2600);
});