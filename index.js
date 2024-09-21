// async function abc() {
//     let responce = await fetch('https://dog.ceo/api/breeds/image/random')
//     let result = await responce.json();
//     console.log(result.message)
    
// }
// abc();

async function registration(userObj) {
    try {
        const response = await fetch('https://todo-redev.herokuapp.com/api/users/register',{
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObj)
        });
        const data = await response.json();
        return data
    } 
    catch (error) {
        console.error(error);
    }
  }


const user = {
    "username": "Rusya",
    "email": "ruworv@gmail.com",
    "password": "Qwe123!!",
    "gender": "male",
    "age": 30
  };

  registration(user).then(data=>console.log(data))



