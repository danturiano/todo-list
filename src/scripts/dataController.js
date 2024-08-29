export function DataController() {
  function storeData(key, data) {
    const dataString = JSON.stringify(data);
    localStorage.setItem(key, dataString);
  }

  // Function to retrieve data from localStorage
  function retrieveData(key) {
    const dataString = localStorage.getItem(key);
    return dataString ? JSON.parse(dataString) : [];
  }

  function addTodoInData(key, newTodo) {
    // Step 1: Retrieve the existing array from localStorage
    const existingArrayString = localStorage.getItem(key);

    // Step 2: Parse the JSON string to an array
    let existingArray = [];
    if (existingArrayString) {
      existingArray = JSON.parse(existingArrayString);
    }

    // Step 3: Add the new object to the array
    existingArray.push(newTodo);

    // Step 4: Convert the updated array back to a JSON string
    const updatedArrayString = JSON.stringify(existingArray);

    // Step 5: Store the updated array back to localStorage
    localStorage.setItem(key, updatedArrayString);
  }

  function removeTodoInData(key, element) {
    const existingArrayString = localStorage.getItem(key);

    let existingArray = [];
    if (existingArrayString) {
      existingArray = JSON.parse(existingArrayString);
    }

    existingArray = existingArray.filter((todo) => {
      return todo.id !== element.id;
    });

    const updatedArrayString = JSON.stringify(existingArray);

    // Step 5: Store the updated array back to localStorage
    localStorage.setItem(key, updatedArrayString);
  }

  return { storeData, retrieveData, addTodoInData, removeTodoInData };
}
