document.addEventListener("DOMContentLoaded", () => {
    // Constants for API endpoints
    const API_URL = "http://localhost:3000/monsters";
    const MONSTERS_PER_PAGE = 50;
  
    // Select DOM elements
    const monsterContainer = document.querySelector("#monster-container");
    const createMonsterDiv = document.querySelector("#create-monster");
    const backButton = document.querySelector("#back");
    const forwardButton = document.querySelector("#forward");
  
    // Initialize page number
    let currentPage = 1;
  
    // Function to fetch and display monsters
    function fetchAndDisplayMonsters(page) {
      fetch(`${API_URL}/?_limit=${MONSTERS_PER_PAGE}&_page=${page}`)
        .then((response) => response.json())
        .then((monsters) => {
          monsterContainer.innerHTML = ""; // Clear existing monsters
          monsters.forEach((monster) => createMonsterCard(monster));
        });
    }
  
    // Function to create a monster card
    function createMonsterCard(monster) {
      const monsterCard = document.createElement("div");
      monsterCard.classList.add("monster-card");
  
      const monsterName = document.createElement("h2");
      monsterName.textContent = monster.name;
  
      const monsterAge = document.createElement("h4");
      monsterAge.textContent = `Age: ${monster.age}`;
  
      const monsterDescription = document.createElement("p");
      monsterDescription.textContent = `Bio: ${monster.description}`;
  
      monsterCard.appendChild(monsterName);
      monsterCard.appendChild(monsterAge);
      monsterCard.appendChild(monsterDescription);
  
      monsterContainer.appendChild(monsterCard);
    }
  
    // Function to create a new monster
    function createMonsterForm() {
      const monsterForm = document.createElement("form");
      monsterForm.id = "monster-form";
  
      const nameInput = createInput("name", "Name...");
      const ageInput = createInput("age", "Age...");
      const descriptionInput = createInput("description", "Description...");
      const createButton = document.createElement("button");
      createButton.textContent = "Create Monster";
  
      monsterForm.appendChild(nameInput);
      monsterForm.appendChild(ageInput);
      monsterForm.appendChild(descriptionInput);
      monsterForm.appendChild(createButton);
  
      createMonsterDiv.appendChild(monsterForm);
  
      // Add event listener for form submission
      monsterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = {
          name: nameInput.value,
          age: parseFloat(ageInput.value),
          description: descriptionInput.value,
        };
        postNewMonster(formData);
        clearForm(monsterForm);
      });
    }
    function postNewMonster(monsterData) {
        const url = 'http://localhost:3000/monsters';
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(monsterData),
        };
      
        fetch(url, options)
          .then((response) => response.json())
          .then((newMonster) => {
            console.log('New monster:', newMonster);
            // You can add any additional code here to handle the new monster data
          });
      }
      
    // Function to create an input field
    function createInput(id, placeholder) {
      const input = document.createElement("input");
      input.id = id;
      input.setAttribute("placeholder", placeholder);
      return input;
    }
  
    // Function to clear form inputs
    function clearForm(form) {
      form.reset();
    }
  
    // Function to add navigation event listeners
    function addNavListeners() {
      backButton.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          fetchAndDisplayMonsters(currentPage);
        } else {
          alert("No monsters on the previous page.");
        }
      });
  
      forwardButton.addEventListener("click", () => {
        currentPage++;
        fetchAndDisplayMonsters(currentPage);
      });
    }
  
    // Initial setup
    fetchAndDisplayMonsters(currentPage);
    createMonsterForm();
    addNavListeners();
  });
  