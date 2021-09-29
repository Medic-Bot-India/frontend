

// import Register from "../components/Register";
// import Login from "../components/Login";


const form = document.querySelector('#form')
// // const search = document.querySelector('#input')
// // const msg1 = document.querySelector('#msg1')
// // const msg2 = document.querySelector('#msg2')


const temp = document.getElementById("account")
temp.innerHTML = "prateek"
console.log("hello")

// if(username){
//     console.log("prateek")
// }


form.addEventListener('submit', (e) => {
//    e.preventDefault()
   console.log('reached here')
})
// //     const location = search.value
// //     msg1.textContent = 'Loading.....'

// //     msg2.textContent = ''


// //     fetch('/weather?address=' + location).then((response) => {
// //         response.json().then((data) => {
// //             if (data.error) {
// //                 msg1.textContent = data.error
// //             } else {
// //                 msg1.textContent = data.location
// //                 msg2.textContent = data.forecastData
// //                 // console.log(data.location)
// //                 // console.log(data.forecastData)
// //             }
// //         })
// //     })
// // })

// function App() {
//     return (
//         <div className="bg-gray-900 min-h-screen">
//             <BrowserRouter>
//                 <Switch>
//                     <Route component={Register} exact path="/register"/>
//                     <Route component={Login}  exact path="/login"/>
//                 </Switch>
//                 <Footer/>
//             </BrowserRouter>
//         </div>
//     );
// }

// export default App;