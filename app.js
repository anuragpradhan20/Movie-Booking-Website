// when to use js 
// when libraries are ok

// movie booking system like book my show
// we can have the total number of seats avaialable
// which seat is booked and which seat is remaining
// on which seat who is the user


    const seats = Array.from({ length: 40 }, (_, index) => ({ seatNumber: index + 1 }));
    // const seats = Array.from({ length: 40 }, (_, index) => ({ seatNumber: index + 1, status: true }));

    let cancelicon=document.querySelector(".cancel-icon");
    let seatsContainer = document.querySelector('.seats');
    let bookingBtn = document.querySelector('.book-btn');
    let bookingmodal=document.querySelector(".bookingModal");
    bookingBtn.addEventListener('click', ()=>
        {
       let seatNumber = bookingBtn.dataset.seatNumber;
        let nameInput = document.getElementById('name');
        let emailInput = document.getElementById('email')
        let emailValid=checkEmail(emailInput.value);
        if(emailValid==false)
            {
                seats[seatNumber - 1] = {
                    seatNumber : seatNumber,
                     name: nameInput.value,
                     email: emailInput.value,
                     status: true,
                       }
                       nameInput.value = '';
                       emailInput.value = '';
                       modal.classList.add('hidden');
                       displayUserdetails();
                       renderSeats();   
            }
            else{
                alert("User can not book ticket with same email id!");
            }

       })
       
       cancelicon.addEventListener("click",()=>{
           bookingmodal.classList.add("hidden");
       })


function bookSeat(seatNumber)
{
    seatNumber = parseInt(seatNumber);
    let modal = document.querySelector('#modal');
    modal.classList.remove('hidden');
    bookingBtn.dataset.seatNumber = seatNumber; 
}
function cancelSeat(seatNumber,button)
{
    let cancelbox=document.querySelector(".cancelbox");
    let yesbtn=document.querySelector(".yes-btn");
    let nobtn=document.querySelector(".no-btn");
    yesbtn.addEventListener("click",()=>{
         seats[seatNumber-1]={seatNumber: Number(seatNumber)};
         button.classList.remove("seat-booked");
         cancelbox.classList.add("hidden");
         displayUserdetails();
         renderSeats();
    })
    nobtn.addEventListener("click",()=>{
        cancelbox.classList.add("hidden");
        renderSeats();
    })
}
renderSeats=()=>{
    seatsContainer.innerHTML = ""
                seats.map((seat)=>
                    {
                    let button = document.createElement('button');
                    let messagebox=document.querySelector(".messagebox");
                    let cancelbutton=document.querySelector(".cancelbox");
                    button.classList.add('seat');
                    button.innerText = seat.seatNumber;
                    if(checkSeatAvailability()==true)
                    {
                        messagebox.classList.remove("hidden");
                        button.classList.add('seat-booked');
                        
                    }
                     else if(seat.status === true)
                    {
                            button.classList.add('seat-booked');
                            button.addEventListener("click",(e)=>{
                                cancelbutton.classList.remove("hidden");
                                let seatNumber = e.target.innerText;
                              cancelSeat(seatNumber,button);

                            })
                    }
                    else{
                        button.addEventListener('click', (e)=>{
                        let seatNumber = e.target.innerText;
                        bookSeat(seatNumber)
                    })
                    }
                    seatsContainer.appendChild(button);
                }) 
            
           
        
}
function checkEmail(emailInput)
{
   let result=seats.filter((seat)=>{
        return seat.email==emailInput;
     })

     return result.length > 0 ? true : false;
}
function checkSeatAvailability()
{
 let result=seats.filter((seat)=>{
      return seat.status==true;
  })

   return result.length==40 ? true : false;
}
function displayUserdetails() 
{
    let seatDetailsdiv=document.querySelector('.seatdetails');
    seatDetailsdiv.innerHTML="";
    let result=seats.filter((seat)=>{
        return seat.status==true;
   })
    result.forEach((res)=>{
    let userdiv = document.createElement("div");
    userdiv.classList.add("userdiv");
    let seatpara = document.createElement("p");
    seatpara.innerText = res.seatNumber;
    let namepara = document.createElement("p");
    namepara.innerText = res.name;
    let emailpara = document.createElement("p");
    emailpara.innerText =res.email;
    userdiv.appendChild(seatpara);
    userdiv.appendChild(namepara);
    userdiv.appendChild(emailpara);
    seatDetailsdiv.appendChild(userdiv);
    })
    
}
renderSeats();




// assignments
// if a seat is booked add a cancel button to cancel that seat booking
// same user should not be able to book the slot twice
// if all the seats are booked it should show housefull
// render a list of all the users with there seat names
// create the same thing using local storage // for data persistance