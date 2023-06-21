// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  addDoc,
  arrayUnion,
  arrayRemove,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADfC3ZegZu9TG1Cwn3O8C3kSEZOXloP0M",
  authDomain: "onethreetwo-a87e0.firebaseapp.com",
  projectId: "onethreetwo-a87e0",
  storageBucket: "onethreetwo-a87e0.appspot.com",
  messagingSenderId: "472438557576",
  appId: "1:472438557576:web:6d30b0d47aefe532a9083d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

if(islogin==false) {
  document.getElementById("logout").onclick = function(){
    auth.signOut();
    alert("logged out");
    window.location.href="../login/login.html";
  }
}

if (islogin) {
  console.log("hello!");
  document.getElementById("loginbtn").addEventListener("click", function () {
    console.log("hello3!");
    const loginemail = document.getElementById("email1").value;
    const password = document.getElementById("password1").value;
    console.log(loginemail);
    console.log(password);
    signInWithEmailAndPassword(auth, loginemail, password)
      .then((userCredential) => {
        const user = userCredential.user;
        location.replace("../home/index.html");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.errorMessage;
        alert(error);
      });
  });

  //----------------- user signup authentication ------------------------//
  const f =document.querySelector('#signUp-form');
  f.addEventListener('submit',(ev)=>{
  
  //document.getElementById("reg").addEventListener("click", (e) => {
    console.log("ho");
    const email_signup = document.getElementById("email").value;
    const pass_sgn = document.getElementById("pwd").value;
    const pass_sgn1 = document.getElementById("cpwd").value;
    const name=document.getElementById("user1").value;
    const phn=document.getElementById("phn").value;
    const dob=document.getElementById("date").value;
    const clg=document.getElementById("clg").value;
    const deg=document.getElementById("deg").value;
    const year=document.getElementById("year").value;
     //const profileImg=document.getElementById("profileImg").value;
   // const Img=ev.target.files[0];
    if (pass_sgn == pass_sgn1 && email_signup != "") {
      ev.preventDefault();

      createUserWithEmailAndPassword(auth, email_signup, pass_sgn)
        .then((cred) => {
          const userref=doc(db,"users",cred.user.uid);
          setDoc(userref,{
            name:name,
            email: email_signup,
            hacksAttended: 0,
            phone:phn,
            dob:dob,
            clg:clg,
            deg:deg,
            year:year
            
          })
          .then(()=>{
            const storageref=ref(storage,`userimg/${cred.user.uid}/profilepic`)
            uploadBytes(storageref,profileImg)
            .then(()=>{
              getDownloadURL(storageref)
              .then((link)=>{
                updateDoc(userref,{
                  profileImg:link,
                })
                .then(()=>{
                  console.log("image added!");
                }
                )
                .catch((e)=>{
                  alert(e);
                  console.log("link can't be added!")
                })
              })
              .catch((e)=>{
                alert(e);
                console.log("link can't be get!")
              })
            })
            .catch((e)=>{
              alert(e);
              console.log("img can't be uploaded!")
            })
            console.log("user Added");
            location.reload();
          })
          .catch(()=>{
            alert("user cannot be added!");
          })
          // location.replace("index.html");
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  });
} else if (ishome) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      //----------------- ongoing events details printing ------------------------//
      const eventdb = collection(db, "event");
      getDocs(eventdb).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
        //----------------- upcoming events details printing ------------------------//

        var date=Date.now();
        var start=doc.data().starthack;
        var end=doc.data().endhack;
        if(date>=start && date<=end){
                const upcomingMain = document.querySelector("#liv");
                const upcomingCard = document.createElement("div");
                upcomingCard.classList = "swiper-slide card";
                const eventupcomingCard = `
                <div class="card-content">
                  <div class="image">
                    <img src="${doc.data().eventImg}" alt="" class="card-img">
                  </div>
      
                  <div class="media-icons">
                    <i class="fab fa-facebook"></i>
                    <i class="fab fa-twitter"></i>
                    <i class="fab fa-github"></i>
                  </div>
      
                  <div class="name-profession">
                    <span class="name">${doc.data().name}</span>
                    <span class="profession">${doc.data().description}</span>
                  </div>

                  <div class="button">
                    <button class="aboutMe">More</button>
                    <!-- <button class="hireMe">Register</button> -->
                  </div>
                </div>
                  `;
                upcomingCard.innerHTML += eventupcomingCard;
                upcomingMain.appendChild(upcomingCard);
                const detailbutton=upcomingCard.querySelector('.aboutMe');
                detailbutton.addEventListener('click',()=>{
                  localStorage.setItem("s",doc.id);
                  console.log(localStorage.getItem("s"));
                  window.location.href="../hackathon/hackathon.html";
                });
        }
        else if(date>end)
        {
                const upcomingMain = document.querySelector("#pst");
                const upcomingCard = document.createElement("div");
                upcomingCard.classList = "swiper-slide card";
                const eventupcomingCard = `   
                <div class="card-content">
                  <div class="image">
                    <img src="${doc.data().eventImg}" alt="" class="card-img">
                  </div>
      
                  <div class="media-icons">
                    <i class="fab fa-facebook"></i>
                    <i class="fab fa-twitter"></i>
                    <i class="fab fa-github"></i>
                  </div>
      
                  <div class="name-profession">
                    <span class="name">${doc.data().name}</span>
                    <span class="profession">${doc.data().description}</span>
                  </div>

                  <div class="button">
                    <button class="aboutMe">More</button>
                    <!-- <button class="hireMe">Register</button> -->
                  </div>
                </div>
                  `;
                upcomingCard.innerHTML += eventupcomingCard;
                upcomingMain.appendChild(upcomingCard);
                const detailbutton=upcomingCard.querySelector('.aboutMe');
                detailbutton.addEventListener('click',()=>{
                localStorage.setItem("s",doc.id);
                console.log(localStorage.getItem("s"));
                // if(doc.data().host==auth.currentUser.uid)window.location.href="../event-for-hackathon/homei.html";
                // else 
                window.location.href="../past/hackathon.html";
          });
        }
        else
        {
          const upcomingMain = document.querySelector("#up");
          const upcomingCard = document.createElement("div");
          upcomingCard.classList = "swiper-slide card";
          const eventupcomingCard = `   
          <div class="card-content">
            <div class="image">
              <img src="${doc.data().eventImg}" alt="" class="card-img">
            </div>

            <div class="media-icons">
              <i class="fab fa-facebook"></i>
              <i class="fab fa-twitter"></i>
              <i class="fab fa-github"></i>
            </div>

            <div class="name-profession">
              <span class="name">${doc.data().name}</span>
              <span class="profession">${doc.data().description}</span>
            </div>

            <div class="button">
              <button class="aboutMe">More</button>
              <!-- <button class="hireMe">Register</button> -->
            </div>
          </div>
            `;
          upcomingCard.innerHTML += eventupcomingCard;
          upcomingMain.appendChild(upcomingCard);
          const detailbutton=upcomingCard.querySelector('.aboutMe');
          detailbutton.addEventListener('click',()=>{
          localStorage.setItem("s",doc.id);
          console.log(localStorage.getItem("s"));
          // if(doc.data().host==auth.currentUser.uid)window.location.href="../event-for-hackathon/homei.html";
          // else 
          window.location.href="../upcoming/hackathon.html";
          });
        }
          
        });
      });


      //----------------- Showing feedbacks from user ------------------------//
      // let feedref=collection(db, "feedback");
      // getDocs(feedref).then((snapshot)=>{
      //   snapshot.docs.forEach((feeds) => {
      //     const main = document.querySelector("#feedList");
      //     const card = document.createElement('tr');
      //     card.classList = 'row-schedule-item';
      //     const feedCard = `
      //       <th>${feeds.data().user}</th>
      //       <th>${feeds.data().feedback}</th>
      //     `;
      //     card.innerHTML += feedCard;
      //     main.appendChild(card);
      //   })
      // })

      const notifydb = collection(db, 'notification');
      getDocs(notifydb)
      .then((snapshot) => {
        let i=0;
        snapshot.docs.forEach((dok) => {
          if(dok.data().user==auth.currentUser.uid) {
            i++;
            const main = document.querySelector("#notification_bell");
            const card = document.createElement('li');
              const content = `
                <p>
                  ${dok.data().message}
                </p>
                <button id="eveDetail">Click to go!!</button>
              `;
              card.innerHTML += content;
              main.appendChild(card);
              const viewMoreButton = card.querySelector('#eveDetail');
                viewMoreButton.addEventListener('click', () => {
                    localStorage.setItem("r",dok.data().eventId);
                    console.log(localStorage.getItem("r"));
                    const del = doc(db, "notification", dok.id);
                    deleteDoc(del)
                      .then(()=>{
                        console.log("deleted");
                        window.location.href="../hackathon/hackathon.html";
                      })
                      .catch((e)=>{
                        console.log(e);
                      })
                });
          }
        })
        // document.getElementById('count').innerHTML=i;
        document.getElementById('cnt').innerHTML=i;
        if(i==0) {
          const main = document.querySelector("#notification_bell");
          const card = document.createElement('li');
          const content = `
            NO NOTIFICATION
          `;
          card.innerHTML += content;
          main.appendChild(card);
          // const par=document.querySelector('#notify');
          // par.style.display='none';
        }
      })



      // const upcomingMain = document.querySelector("#reviews-row row-first");
      // const upcomingCard = document.createElement("div");
      // upcomingCard.classList = "reviews-card";
      // const eventupcomingCard = `
      // <img src="${doc.data().eventImg}" class="card-img"  >
      // <h3>${doc.data().name}</h3>
     
      // <p class="commu">
      //    ${doc.data().description}
      // </p>
      // <button type="button" class="details">Details</button>
      //   `;
      // upcomingCard.innerHTML += eventupcomingCard;
      // upcomingMain.appendChild(upcomingCard);
      // const detailbutton=upcomingCard.querySelector('.details');
      // detailbutton.addEventListener('click',()=>{
      // localStorage.setItem("s",doc.id);
      // console.log(localStorage.getItem("s"));
      // window.location.href="../hackathon/hackathon.html";



      //----------------- Taking feedbacks from user ------------------------//
      document.querySelector("#btn").addEventListener('click', (e)=> {
        e.preventDefault()
        const feedref=collection(db, "feedback");
        const user_feedback=document.getElementById("feed_msg").value;
        const user_name=document.getElementById("feed_name").value;
        if(user_feedback!="") {
          const userid=auth.currentUser.uid;
          const userRef = doc(db, 'users',userid);
          getDoc(userRef).then((doc) => {
            const img=doc.data().profileImg;
            addDoc(feedref, {
              user_name: user_name,
              img: img,
              feedback: user_feedback,
            })
          }).then(()=>{
              alert("feedback sent");
            })
        }
      });
    }
     else {
      location.replace("../login/login.html");
    }
  });
}
else if(isFeedShow) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const feeddb = collection(db, "feedback");
      getDocs(feeddb).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            const upcomingMain = document.querySelector("#pahla");
            const upcomings = document.querySelector("#dusra");
            const upcomingt = document.querySelector("#tisra");
            const upcomingCard = document.createElement("div");
            upcomingCard.classList = "reviews-card";
            const eventupcomingCard = `
                    <div class="card-text">
                        <div class="card-title">
                            <p>Feedback:</p>
                        </div>
                        <div class="card-para">
                          ${doc.data().feedback}
                        </div>

                        <div class="card-author">
                            <svg width="9" height="2" viewBox="0 0 9 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.526123 1.13867H8.25949" stroke="black" stroke-width="0.822209" />
                            </svg>
                            <p>${doc.data().user_name}</p>
                        </div>
                    </div>
              `;
            upcomingt.innerHTML += eventupcomingCard;
            upcomingMain.appendChild(upcomingCard);


            // const upcomingCard2 = document.createElement("div");
            // upcomingCard2.classList = "reviews-card";
            // const eventupcomingCard2 = `
            //         <div class="card-text">
            //             <div class="card-title">
            //                 <p>Feedback:</p>
            //             </div>
            //             <div class="card-para">
            //               ${doc.data().feedback}
            //             </div>

            //             <div class="card-author">
            //                 <svg width="9" height="2" viewBox="0 0 9 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            //                     <path d="M0.526123 1.13867H8.25949" stroke="black" stroke-width="0.822209" />
            //                 </svg>
            //                 <p>${doc.data().user_name}</p>
            //             </div>
            //         </div>
            //   `;
            // upcomingCard2.innerHTML += eventupcomingCard2;
            // upcomings.appendChild(upcomingCard);
        })
      }
      )
    }
     else {

      location.replace("../home/index.html");
    }
  });
}
else if(ishost)
{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          
        }
         else {

          location.replace("../login/login.html");
        }
      });
      const hostform= document.querySelector('#host1')
      hostform.addEventListener('submit',(e1)=>{
        e1.preventDefault()
    
        const eventname = document.getElementById('firstName').value;
        const eventdes = document.getElementById('description').value;
        const startreg = document.getElementById('date1').value;
        const endreg = document.getElementById('date2').value;
        const starthack = document.getElementById('date3').value;
        const endhack = document.getElementById('date4').value;
        if(eventname=="" || eventdes=="" || !starthack|| !startreg || !endhack || !endreg){
          alert("Enter All Fields");
        }
        else{ 
            const StartdatetimeValue = startreg;
            const Sdatetime = new Date(StartdatetimeValue);
            const Stimestamp = Sdatetime.getTime();

            const EtartdatetimeValue = endreg;
            const Edatetime = new Date(EtartdatetimeValue);
            const Etimestamp = Edatetime.getTime();

            const SHtartdatetimeValue = starthack;
            const SHdatetime = new Date(SHtartdatetimeValue);
            const SHtimestamp = SHdatetime.getTime()

            const EHartdatetimeValue = endhack;
            const EHdatetime = new Date(EHartdatetimeValue);
            const EHtimestamp = EHdatetime.getTime()

            var host=auth.currentUser.uid;
            const eventDataRef = collection(db, "event");
            addDoc(eventDataRef, {
              name: eventname,
              host: host,
              description: eventdes,
              startreg: Stimestamp,
              endreg: Etimestamp,
              starthack: SHtimestamp,
              endhack: EHtimestamp,
            })
            
            .then((eventRef) => {
              const attenderef=doc(db,"registration", eventRef.id);
                    setDoc(attenderef,{

                        reguser : arrayUnion(host)
                    }).then(()=>{
                      console.log("added data!")
                    }).catch((e)=>{
                      alert(e);
                    })
              const stgref=ref(storage,`eventimg/${eventRef.id}/eventpic`)
              console.log(eventImg);
              uploadBytes(stgref,eventImg)
              .then(()=>{
                getDownloadURL(stgref)

                .then((lik)=>{
                  updateDoc(eventRef,{
                    eventImg:lik,
                  })
                  .then(()=>{
                    alert("Event added!");
                    window.location.href="../home/index.html";
                    
                  })
                  .catch((e)=>{
                    alert(e);
                    console.log("link can't be added!")
                  })
                })
                  .catch((e)=>{
                    alert(e);
                    console.log("can't get url");
                  })
                .catch((e)=>{
                  alert(e);
                  console.log("img can't be uploaded!");
                })
                
                console.log("user Added");
              })
             
                // alert("Event added!");
                // if(alert("Event added")){}
                          // else   
                          // window.location.href="../home/index.html";
                          // window.location.reload(); 
                // location.replace("index.html")
            })
              .catch((err) => {
                alert(err.message);
              })
        }
      })
}
else if(isprofile)
{
  onAuthStateChanged(auth, (user) => {

    if (user) {
      const userId=user.uid;
      const userref=doc(db,"users", userId);
      getDoc(userref)
      .then((userdata)=>{
        document.getElementById("name").innerHTML=userdata.data().name;
        document.getElementById("clg").innerHTML=userdata.data().clg;
        document.getElementById("deg").innerHTML=userdata.data().deg;
        document.getElementById("NoOfReg").innerHTML=userdata.data().hacksAttended;
        // document.getElementById("email").innerHTML=userdata.data().email;
        document.getElementById("img").src=userdata.data().profileImg;
      })
    }
     else {
      location.replace("../login/login.html");
    }
  });

}else if(isevedetail)
{
  let x,y;
  onAuthStateChanged(auth,(user)=>{
    
    if(user) {
       x=user.uid;
      const eventId=localStorage.getItem("s");
      console.log(eventId);
      const eventref=doc(db,"event", eventId);
      getDoc(eventref)
      .then((eventdetail)=>{
        let timestamp = eventdetail.data().startreg;
        let date = new Date(timestamp);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let var1= day+"/"+month+"/"+year;
        let var2=var1+" "+ hours+":"+minutes+":"+seconds;

        document.getElementById("regs").innerHTML=var2;

         timestamp = eventdetail.data().endreg;
         date = new Date(timestamp);
         year = date.getFullYear();
         month = date.getMonth() + 1;
         day = date.getDate();
         hours = date.getHours();
         minutes = date.getMinutes();
         seconds = date.getSeconds();
        var1= day+"/"+month+"/"+year;
        var2=var1+" "+ hours+":"+minutes+":"+seconds;        
        document.getElementById("rege").innerHTML=var2;

        timestamp = eventdetail.data().starthack;
         date = new Date(timestamp);
         year = date.getFullYear();
         month = date.getMonth() + 1;
         day = date.getDate();
         hours = date.getHours();
         minutes = date.getMinutes();
         seconds = date.getSeconds();
        var1= day+"/"+month+"/"+year;
        var2=var1+" "+ hours+":"+minutes+":"+seconds;
        document.getElementById("hacks").innerHTML=var2;

        timestamp = eventdetail.data().endhack;
         date = new Date(timestamp);
         year = date.getFullYear();
         month = date.getMonth() + 1;
         day = date.getDate();
         hours = date.getHours();
         minutes = date.getMinutes();
         seconds = date.getSeconds();
        var1= day+"/"+month+"/"+year;
        var2=var1+" "+ hours+":"+minutes+":"+seconds;
        document.getElementById("Hacke").innerHTML=var2;
        document.getElementById("detail").innerHTML=eventdetail.data().description;
        document.getElementById("hackname").innerHTML=eventdetail.data().name;
        document.getElementById("hackimg").src=eventdetail.data().eventImg;
        y=eventdetail.data().name;
      })


      // const eventId =localStorage.getItem("s");
      const userID=auth.currentUser.uid;
     
      const regref=doc(db,"registration",eventId);
      const notificationref=collection(db,"notification");
      getDoc(regref)
      .then((event)=>{
        if(event.data().reguser.includes(userID))
        {
          document.getElementById("reg").style.display='none';
          
         
        }
        else
        {
          document.getElementById("unreg").style.display='none';
         
        }
        document.getElementById("reghack").addEventListener('click',()=>{
          console.log("sneha")
          updateDoc(regref,{
            reguser : arrayUnion(x)
          })
          .then(()=>{
            var  tempMsg="You have succesfully registerd for :";
            tempMsg+=y;
            addDoc(notificationref, {
              user: x,
              eventId: eventId,
              message: tempMsg,
            })
            .then(()=>{
              let h;
              const userref=doc(db,"users",auth.currentUser.uid);
              getDoc(userref)
              .then((userdata)=>{
                h=userdata.data().hacksAttended;
              })
              h++;
              updateDoc(userref, {
                hacksAttended: h,
              })
              .then(()=> {

                alert("Redirecting you to register page!");
                window.location.href="../event_register/register.html";
              })
            })
            // alert("You are successfully registered!");


            
          })
          .catch((e)=>{
            alert(e);
          })
        })



        document.getElementById("cancelreg").addEventListener('click',()=>{
          updateDoc(regref,{
            reguser : arrayRemove(x)
          })
          .then(()=>{
            let h;
            const userref=doc(db,"users",auth.currentUser.uid);
            getDoc(userref)
            .then((userdata)=>{
              h=userdata.data().hacksAttended;
            })
            h--;
              updateDoc(userref, {
                hacksAttended: h,
              })
              .then(()=> {
                alert("Your registeration is Cancelled!");
                window.location.reload();
              })
            
          })
          .catch((e)=>{
            alert(e);
          })
        })
      })
    }else{
      location.replace("../login/login.html");
    }

  })
 

}
else if(attendeeList) {
  onAuthStateChanged(auth,(user)=>{
    
    if(user) {
      const q=localStorage.getItem("s");
      console.log(q);
      let attendeeRef=doc(db, 'registration', q);
      getDoc(attendeeRef)
      .then((list)=> {
        const arr=list.data().reguser;
        arr.forEach((element) => {
          const userRef=doc(db, 'users', element);
          getDoc(userRef).then((d)=>{
            const parentDiv = document.querySelector("#feedList");
              const upcomingCard = document.createElement('tr');
              const content = `
                <th>${d.data().name}</th>
              `;
              upcomingCard.innerHTML += content;
              parentDiv.appendChild(upcomingCard);
          })
        })
      })
      .catch(()=>{
        alert("cannot get all attendees");
      })

    }
    else
    {
      location.replace("../login/login.html");
    }
  }
  )
}
