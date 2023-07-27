const fullName = document.getElementById('fname');
const email = document.querySelector('input[id="email"]');
const message = document.getElementById('message');;
const fullNameError = document.querySelector('span[id="nameError"]');
const emailError = document.querySelector('span[id="emailError"]');
const messageError = document.querySelector('span[id="messageError"]'); 
const btnSubmit = document.querySelector('button[id="submitBtn"]'); 

fullName.addEventListener("blur", (event) => { 
    var alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;       
    if(!alphanumericRegex.test(event.target.value)){                
        fullNameError.textContent = "El nombre debe ser alfanumerico!";
        fullNameError.style.display = "flex";
        fullNameError.style.color  = "red";      
        messageError.style.fontWeight = "bold";         
    }else{
        fullNameError.textContent = "";
        fullNameError.style.display = "none";
    }
});

fullName.addEventListener("focus", (event) => { 
    fullNameError.textContent = "";       
  });

email.addEventListener("blur", (event) => {         
    if(!event.target.value.includes("@") || !event.target.value.includes(".com") || event.target.value.includes(" ")){                
        emailError.textContent = "El email debe tener un formato valido!";
        emailError.style.display = "flex";
        emailError.style.color  = "red";     
        messageError.style.fontWeight = "bold";            
    }else{
        emailError.textContent = "";
        emailError.style.display = "none";        
    }
});

email.addEventListener("focus", (event) => { 
    emailError.textContent = "";       
  });

  message.addEventListener("blur", (event) => {         
    if(event.target.value.length <= 5){       
        messageError.textContent = "El mensaje debe contener mas de 5 caracteres!";
        messageError.style.display = "flex";
        messageError.style.color  = "red";     
        messageError.style.fontWeight = "bold";          
    }else{
        messageError.textContent = "";
        messageError.style.display = "none";        
    }
});

message.addEventListener("focus", (event) => { 
    messageError.textContent = "";       
  });


  btnSubmit.addEventListener("click", function(){
    if(fullName.value == ""){        
        fullNameError.textContent = "Debe ingresar su nombre!";
        fullNameError.style.display = "flex";
        fullNameError.style.color  = "red";     
        fullNameError.style.fontWeight = "bold";  
    }else if(email.value == ""){
        emailError.textContent = "Debe ingresar un Email!";
        emailError.style.display = "flex";
        emailError.style.color  = "red";     
        emailError.style.fontWeight = "bold";  
    }else if(message.value == ""){
        messageError.textContent = "Debe ingresar un mensaje!";
        messageError.style.display = "flex";
        messageError.style.color  = "red";     
        messageError.style.fontWeight = "bold";  
    }else if(fullName.value.length > 0 && email.value.length > 0 && message.value.length > 0){
         var subject = `Simon Game Question/Complain - ${fullName.value}`;
         var mailtoUrl = `mailto:${email.value}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message.value)}`;
         
         window.open(mailtoUrl);
    }
  });
