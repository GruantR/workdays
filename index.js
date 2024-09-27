// Регистрируем пользователя
async function registration(userRegistration) {
  try {
    const response = await fetch(
      "https://todo-redev.herokuapp.com/api/users/register",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userRegistration),
      }
    );

    // Проверяем, успешен ли запрос
    if (response.ok) {
      const data = await response.json();
      return data; // Если успешно, возвращаем данные
    } else {
      // Если не удалось, обрабатываем ошибку
      const errorData = await response.json();
      console.error("Ошибка:", response.status, response.statusText, errorData);
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}
const user1ForRegistration = {
  username: "Rusya",
  email: "ruworv@gmail.com",
  password: "Qwe123!!",
  gender: "male",
  age: 30,
};
// Авторизация
async function login(userLog) {
  try {
    const response = await fetch(
      "https://todo-redev.herokuapp.com/api/auth/login",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLog),
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      console.error(response.status, response.statusText);
      return errorData;
    }
  } catch (error) {
    console.error("Ошибка:", error);
  }
}
let userLogin = {
  email: "ruworv@gmail.com",
  password: "Qwe123!!",
};
// Создаем таски
async function createTask(taskTitle, token) {
  try {
    const response = await fetch("https://todo-redev.herokuapp.com/api/todos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: taskTitle }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
// Получить все таски:
async function getTasks(bool, token) {
  try {
    const responce = await fetch(
      `https://todo-redev.herokuapp.com/api/todos?isCompleted=${bool}`,
      {
        metod: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await responce.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Выбрать выполненные либо не выполненные задания
const bool = false;

//Редактируем таску
async function editTask(srtFromTitle, id, token) {
  try {
    const response = await fetch(
      `https://todo-redev.herokuapp.com/api/todos/${id}`,
      {
        method: "PATCH",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: srtFromTitle }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
// Удаляем таску
async function deleteTask(id, token) {
  try {
    const response = await fetch(
      `https://todo-redev.herokuapp.com/api/todos/${id}`,
      {
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(id),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  // зарегистрировать пользователя
  await registration(user1ForRegistration)

  // авторизоваться
  const { token } = await login(userLogin);

  // создать таску
  const { id } = await createTask("Купить рыбу", token);

  // список всех тасок
  const tasks = await getTasks(bool, token);

  // изменить таску
  await editTask("Купить мясjmkjjojojjojokojjо", id, token);

  // удалить таску
  await deleteTask(id, token);
}

main().then((data) => console.log(data));
