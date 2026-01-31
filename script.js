let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

renderRecipes(recipes);

function addRecipe() {
  const nameInput = document.getElementById("recipeName");
  const ingredientsInput = document.getElementById("ingredients");
  const stepsInput = document.getElementById("steps");
  const imageInput = document.getElementById("image");

  const name = nameInput.value.trim();
  const ingredients = ingredientsInput.value.trim();
  const steps = stepsInput.value.trim();

  if (name === "" || ingredients === "" || steps === "" || imageInput.files.length === 0) {
    alert("Please fill all fields and upload an image");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const recipe = {
      name: name,
      ingredients: ingredients,
      steps: steps,
      image: reader.result
    };

    recipes.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    renderRecipes(recipes);

    nameInput.value = "";
    ingredientsInput.value = "";
    stepsInput.value = "";
    imageInput.value = "";
  };

  reader.readAsDataURL(imageInput.files[0]);
}

function renderRecipes(data) {
  const recipeList = document.getElementById("recipeList");
  recipeList.innerHTML = "";

  data.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
      <img src="${recipe.image}">
      <h3>${recipe.name}</h3>
    `;

    card.onclick = () => openModal(recipe);
    recipeList.appendChild(card);
  });
}

function searchRecipes() {
  const query = document.getElementById("search").value.toLowerCase();

  const filtered = recipes.filter(r =>
    r.name.toLowerCase().includes(query) ||
    r.ingredients.toLowerCase().includes(query)
  );

  renderRecipes(filtered);
}

function openModal(recipe) {
  document.getElementById("recipeModal").style.display = "block";
  document.getElementById("modalImage").src = recipe.image;
  document.getElementById("modalName").textContent = recipe.name;
  document.getElementById("modalIngredients").textContent = recipe.ingredients;
  document.getElementById("modalSteps").textContent = recipe.steps;
}

function closeModal() {
  document.getElementById("recipeModal").style.display = "none";
}
