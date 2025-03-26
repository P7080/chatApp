function createuserlist({avatar, name, time}, index){
    const newUser = document.createElement("div");
    if(index === 0){
        newUser.classList.add("user-list");
        newUser.classList.add("active");
    }else{
        newUser.classList.add("user-list");

    }
    newUser.innerHTML = `<div class = "user-list-sub" onclick = "checkScreen(this, ${index})">
    
    <div class = "avatar">
        <img
           src = ${avatar}
           alt = ${name}
           loading = "lazy"
           />
           <div class = "profile-highlight">
              <div class = "user-name">
                <p class = "title"> ${name}</p>
                <p class = "time"> ${time}</p>
              </div>
              <p class = "highlights">
                Lorem, ipsum dolor sit amet consectetur...
                </p>
            </div>
    </div>`;

    document.querySelector(".left-userlist").appendChild(newUser);
}



function setList(arr){
    arr.map((item, index) => createuserlist(item, index));
}

setList(usersData);

function checkScreen(element, index){
    if(window.innerWidth <= 750){
        document.querySelector(".left-container").style.display = "none";
        document.querySelector(".right-container").style.display = "block";
        document.querySelector(".right-container").style.width = "100%"
    }
    currentUser(element, index);
}

function currentUser(element, index){
    const userList = document.querySelectorAll(".user-list");
    userList.forEach((element) => element.classList.remove("active"));
    element.parentElement.classList.add("active");

    const name = element.children[1].children[0].children[0].innerHTML;
    const currentUserData = usersData.filter((item) => item.name === name);
    let selectedChat = undefined;
    Object.keys(JsonData).forEach((element, i) =>{
        if(+element.charAt(element.length - 1) == index + 1){
            selectedChat = Object.values(JsonData)[i];
        }
    });
    UpdateChat(currentUserData, selectedChat);
}   




// Function for Updating Data for selected User .......................
function UpdateChat([{ avatar, name, status }], chat) {
  const current_user = document.createElement("div");
  current_user.classList.add("current-user");
  current_user.innerHTML = `
      <div class="current-user-sub">
      <div class="current_avatar">
       <span>
       <img
        src=${avatar}
        alt=${name}
      />
      <div class="online"></div>
       </span>
    </div>
      <div class="current_status">
        <p class="current-title">${name}</p>
        <p class="current-highlights">${status}</p>
      </div>
    </div>`;
    // console.log(current_user);
    document.querySelector(".right-chat-box").innerHTML = "";
    document.querySelector(".right-chat-box").appendChild(current_user);
    AddChat(chat)
}


//function add chat

function AddChat(chat){
    if(chat !== undefined){
        const chatData = document.createElement("div");
        chatData.classList.add("chat");
        chat.forEach((element) =>{
            const user_container = document.createElement("div");
            const user_mssg = document.createElement("p");
            user_mssg.innerText = element.msg.message;
            user_container.appendChild(user_mssg);

            if(element.from.type === "user1"){
                user_container.classList.add("user1-container");
                user_mssg.classList.add("user1-message");
            }else{
                user_container.classList.add("user2-container");
                user_mssg.classList.add("user2-message");
            }
            chatData.appendChild(user_container);
        });
        document.querySelector("right-chat-box").appendChild(chatData);
    }else{
        const chatData = document.createElement("div");
        chatData.classList.add("chat");
        
        document.querySelector("right-chat-box").appendChild(chatData);
    }
}

//Function togGo back for small screen ............................................
function goBack() {
    document.querySelector(".right-container").style.display = "none";
    document.querySelector(".left-container").style.display = "block";
    document.querySelector(".left-container").style.width = "100%";
  }

  // EventListner to autoadjust based on screen size
window.addEventListener("resize", function () {
    if (window.innerWidth <= 750) {
      document.querySelector(".left-container").style.display = "block";
      document.querySelector(".left-container").style.width = "100%";
      document.querySelector(".right-container").style.display = "none";
    } else if (window.innerWidth > 750) {
      document.querySelector(".left-container").style.width = "32%";
      document.querySelector(".left-container").style.display = "block";
      document.querySelector(".right-container").style.width = "68%";
      document.querySelector(".right-container").style.display = "block";
    }
  });

  function serachUser(event) {
    document.querySelector(".left-userlist").innerHTML = "";
    input = event.target.value;
    if (input === "") {
      setList(usersData);
    } else {
      const newList = usersData.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      if (newList.length === 0) {
        document.querySelector(".left-userlist").innerHTML = "No Data Found";
        document.querySelector(".left-userlist").style.fontWeight = "bolder";
      } else {
        setList(newList);
      }
    }
  }

  // function to change theme
function selectTheme(event) {
    let r = document.querySelector(":root");
    let color = event.target.value;
    if (color === "Change theme") {
      r.style.setProperty("--my-mssg", "#00A0AE");
    } else {
      r.style.setProperty("--my-mssg", color);
    }
  }
  
  // function to change Background image
  function changeBackground(event) {
    let r = document.querySelector(":root");
    let bg = event.target.value;
    switch (bg) {
      case "Change background":
        r.style.setProperty("--background-img", 'url("https://i.pinimg.com/originals/f5/05/24/f50524ee5f161f437400aaf215c9e12f.jpg")');
      
        break;
      case "image1":
        r.style.setProperty("--background-img", 'url("https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg")');
       
        break;
      case "image2":
        r.style.setProperty("--background-img", 'url("https://wallpaperaccess.com/full/1288076.jpg")');
      break;
      case "image3":
        r.style.setProperty("--background-img", 'url("https://i.pinimg.com/736x/78/1e/21/781e212cb0a891c6d8a3738c525e235d.jpg")');
      break;
    }
  }
  //  function for char and word count
  function calculate(event) {
    const str=event.value
    if(str===""){
      document.querySelector('.count-character').innerText=`Current characters:${0} and current words:${0}`
    }
    else{
      const length=str.length
    const arrlength=str.split(" ").length
    document.querySelector('.count-character').innerText=`Current characters:${length} and current words:${arrlength}`
    }
  }
  
  // function to send Message 
  function sendMessage() {
    const inpMssg=document.querySelector("messageInput")
    if(inpMssg.value===""){
      alert("Please Enter Ssome Text")
    }
    else{
    const arr=document.querySelectorAll(".user-list")
    let index=0;
    for(let i=0;i<arr.length;i++){
      if(arr[i].className==="user-list active"){
        index=i+1
        break
      }
    }
    let name=`chat${index}` 
    const newMssg=[{
      from: {
        type: "user2",
      },
      msg: {
        message:inpMssg.value
      },
    },]
    if(JsonData[name]){
      JsonData[name]=[...JsonData[name],...newMssg]
    }
    else{
      JsonData[name]=newMssg
    }
    document.querySelector('.chat').remove()
    AddChat(JsonData[name])
    inpMssg.value=""
    calc(document.querySelector('messageInput'))
    }
    
  }

   function showOption() {
    const menu = document.querySelector(".dropdown");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
};

