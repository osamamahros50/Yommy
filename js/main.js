let rowData = document.querySelector("#rowData");
let search = document.querySelector(".search");
let categories_li = document.querySelector(".categories");
let area_li = document.querySelector(".area");
let ingredients_li = document.querySelector(".ingredients");
let contact_li = document.querySelector(".contact");
let nameInput = document.querySelector("#nameInput");
let emailInput = document.querySelector("#emailInput");
let phoneInput = document.querySelector("#phoneInput");
let ageInput = document.querySelector("#ageInput");
let passwordInput = document.querySelector("#passwordInput");
let repasswordInput = document.querySelector("#repasswordInput");
let loading = $(".innerLoadingScreen");

document
  .getElementById("darkModeToggle")
  .addEventListener("click", function () {
    let body = document.body;
    let currentTheme = body.getAttribute("data-bs-theme");
    if (currentTheme === "dark") {
      body.setAttribute("data-bs-theme", "light");
      $("#themeText").text("theme: Light");
    } else {
      body.setAttribute("data-bs-theme", "dark");
      $("#themeText").text("theme: Dark");
    }
  });

$(async function () {
  await searchByName("");
  $(".loading-screen").fadeOut(500);
  $("body").css("overflow", "auto");
});

function openNav() {
  $(".side-nav").animate({ left: 0 }, 500);

  $(".open-close-icon").removeClass("fa-bars");
  $(".open-close-icon").addClass(" fa-x");

  openSideNav();
}

function closeNav() {
  let sideInnerLeft = $(".side-nav .side-inner-left").outerWidth();
  $(".side-nav").animate(
    {
      left: -sideInnerLeft,
    },
    500
  );

  $(".open-close-icon").addClass("fa-bars");
  $(".open-close-icon").removeClass("fa-x");

  $(".side-nav ul li").animate({ top: 200 }, 80);
}
function openSideNav() {
  for (let i = 0; i < 6; i++) {
    $(".side-nav ul li")
      .eq(i)
      .animate({ top: 0 }, (i + 3) * 80);
  }
}

closeNav();

$(".side-nav .open-close-icon").on("click", () => {
  if ($(".side-nav").css("left") == "0px") {
    closeNav();
  } else {
    openNav();
  }
});

$(search).on("click", function () {
  showSearchInput();
  closeNav();
});
function showSearchInput() {
  searchContainer.innerHTML = `
     <div class="container w-75 ">
            <div class="row">
                <div class="col-md-6">
                    <input id='searchName' class="inputs"  onkeyup="searchByName(this.value)" type="text" placeholder="Search By Name" class="form-control bg-transparent text-white">
                </div>
                <div class="col-md-6">
                    <input id='searchLetter' class="inputs" onkeyup="searchByFirstLetter(this.value)" type="text" maxlength="1" placeholder="Search By First Letter" class="form-control bg-transparent text-white">
                </div>
            </div>
        </div>`;
  rowData.innerHTML = "";
}

async function searchByName(mealName) {
  closeNav();
  rowData.innerHTML = "";
  loading.fadeIn(300);
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );
  let response = await data.json();
  if (response.meals) {
    displayMeals(response.meals);
  } else {
    displayMeals([]);
  }
  loading.fadeOut(300);
}
async function searchByFirstLetter(firstLetter) {
  if (!/^[a-zA-Z]$/.test(firstLetter)) {
    rowData.innerHTML =
      '<p class="alert alert-danger text-center m-auto">please Enter an English letter</p>';
    return; 
  }

  closeNav();
  rowData.innerHTML = "";
  loading.fadeIn(300);
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`
  );
  let response = await data.json();
  if (response.meals) {
    displayMeals(response.meals);
  } else {
    displayMeals([]);
  }
  loading.fadeOut(300);
}

function displayMeals(meal) {
  let cartona = "";
  for (let i = 0; i < meal.length; i++) {
    cartona += `
       
        <div class="col-12 col-sm-12 col-lg-3 animate__animated animate__zoomIn">
                <div onclick="getMealDetails('${meal[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" " src="${meal[i].strMealThumb}" alt="" srcset="">
                    <div class=" meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${meal[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `;
  }


  rowData.innerHTML = cartona;
}

$(categories_li).on("click", function () {
  getCategories();
  closeNav();
});

async function getCategories() {
  rowData.innerHTML = "";
  loading.fadeIn(300);
  searchContainer.innerHTML = "";
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let response = await data.json();
  displayCategories(response.categories);
  loading.fadeOut(300);
}

async function displayCategories(categories) {
  let cartona = "";
  cartona += `
       <div class="text-end ">
            <i id="closeBtn" class="fa-solid fa-xmark p-3 mb-3 rounded-3 shadow fs-4"
                onclick="$('#rowData').html(''); searchByName('')"
                style="cursor: pointer;"></i>
        </div>
    `;
  for (let i = 0; i < categories.length; i++) {
    cartona += `
         <div class="col-12 col-sm-12 col-lg-3">
                <div onclick="getCategoryMeals('${
                  categories[i].strCategory
                }')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer  animate__animated animate__zoomIn ">
                    <img class="w-100" src="${
                      categories[i].strCategoryThumb
                    }" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${categories[i].strCategory}</h3>
                        <p>${categories[i].strCategoryDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                    </div>
                </div>
        </div>
        `;
  }
  rowData.innerHTML = cartona;
}

$(area_li).on("click", function () {
  getArea();
  closeNav();
});

async function getArea() {
  rowData.innerHTML = "";
  loading.fadeIn(300);
  searchContainer.innerHTML = "";
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let response = await data.json();
  displayArea(response.meals);
  loading.fadeOut(300);
}

async function displayArea(area) {
  let cartona = "";
  cartona += `
      <div class="text-end">
            <i id="closeBtn" class="fa-solid fa-xmark p-3 mb-3 rounded-3 shadow fs-4"
                onclick="$('#rowData').html(''); searchByName('')"
                style="cursor: pointer;"></i>
        </div>
    `;
  for (let i = 0; i < area.length; i++) {
    cartona += `
         <div class="col-12 col-sm-12 col-lg-3">
                <div onclick="getAreaMeals('${area[i].strArea}')" class="rounded-2 text-center cursor-pointer animate__animated animate__zoomIn">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${area[i].strArea}</h3>
                </div>
        </div>  
        `;
  }
  rowData.innerHTML = cartona;
}

$(ingredients_li).on("click", function () {
  getIngredients();
  closeNav();
});

async function getIngredients() {
  rowData.innerHTML = "";
  loading.fadeIn(300);
  searchContainer.innerHTML = "";
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let response = await data.json();
  displayIngredients(response.meals.slice(0, 20));
  loading.fadeOut(300);
}

function displayIngredients(ingredients) {
  let cartona = "";
  cartona += `
      <div class="text-end  ">
            <i id="closeBtn" class="fa-solid fa-xmark p-3 mb-3 rounded-3 shadow fs-4"
                onclick="$('#rowData').html(''); searchByName('')"
                style="cursor: pointer;"></i>
        </div>
    `;
  for (let i = 0; i < ingredients.length; i++) {
    cartona += `
        <div class="col-12 col-sm-12 col-lg-3 animate__animated animate__zoomIn">
                <div onclick="getIngredientsMeals('${
                  ingredients[i].strIngredient
                }')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${ingredients[i].strIngredient}</h3>
                        <p>${ingredients[i].strDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                </div>
        </div>
        `;
  }
  rowData.innerHTML = cartona;
}

$(contact_li).on("click", function () {
  showContacts();
  closeNav();
});
function showContacts() {
  rowData.innerHTML = `
    <div class="text-end">
      <i id="closeBtn" class="fa-solid fa-xmark p-3 mb-3 rounded-3 shadow fs-4"
        onclick="$('#rowData').html(''); searchByName('')"
        style="cursor: pointer;"></i>
    </div>
    <div class="contact  d-flex justify-content-center align-items-center mt-5">
      <div class="container text-center overflow-hidden">
        <form class="w-100 ">
          <div class="row row-cols-1 row-cols-md-1 row-cols-lg-2 g-4">
            <div class="col animate__animated animate__slideInLeft">
              <input id="nameInput" onkeyup="validateRegex(this)" type="text" class="form-control" placeholder="Enter Your Name">
              <div class="invalid-feedback">Special characters and numbers not allowed</div>
            </div>
            <div class="col animate__animated animate__slideInRight">
              <input id="emailInput" onkeyup="validateRegex(this)" type="email" class="form-control" placeholder="Enter Your Email">
              <div class="invalid-feedback">Email not valid *exemple@yyy.zzz</div>
            </div>
            <div class="col animate__animated animate__slideInLeft">
              <input id="phoneInput" onkeyup="validateRegex(this)" type="text" class="form-control" placeholder="Enter Your Phone">
              <div class="invalid-feedback">Enter valid Phone Number</div>
            </div>
            <div class="col animate__animated animate__slideInRight">
              <input id="ageInput" onkeyup="validateRegex(this)" type="number" class="form-control" placeholder="Enter Your Age">
              <div class="invalid-feedback">Enter valid age</div>
            </div>
            <div class="col animate__animated animate__slideInLeft">
              <input id="passwordInput" onkeyup="validateRegex(this)" type="password" class="form-control" placeholder="Enter Your Password">
              <div class="invalid-feedback">Minimum 6 chars, at least one letter & number</div>
            </div>
            <div class="col animate__animated animate__slideInRight">
              <input id="repasswordInput" onkeyup="validateRegex(this)" type="password" class="form-control" placeholder="Repassword">
              <div class="invalid-feedback">Please confirm your password</div>
            </div>
          </div>
          <button id="submitButton" class="btn btn-outline-warning mt-5 m-auto animate__animated animate__slideInUp" disabled>Submit</button>
        </form>
      </div>
    </div>
  `;
}

function checkAllValidWithoutMessages() {
  const nameValid = /^[A-Za-z ]{3,}$/.test($("#nameInput").val().trim());
  const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test($("#emailInput").val().trim());
  const phoneValid = /^[0-9]{10,15}$/.test($("#phoneInput").val().trim());
  const ageValid = /^(1[89]|[2-9][0-9])$/.test($("#ageInput").val().trim());
  
  const pass = $("#passwordInput").val().trim();
  const rePass = $("#repasswordInput").val().trim();
  const passValid = pass.length >= 6 && /\d/.test(pass) && /[A-Za-z]/.test(pass) && pass === rePass;
  
  if (nameValid && emailValid && phoneValid && ageValid && passValid) {
    $("#submitButton").removeAttr("disabled");
  } else {
    $("#submitButton").attr("disabled", true);
  }
}

function validateRegex(ele) {
  const text = ele.value;
  const password = $("#passwordInput").val();

  const regex = {
    nameInput: /^[A-Za-z ]{3,}$/,
    emailInput: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
    phoneInput: /^[0-9]{10,15}$/,
    ageInput: /^(1[89]|[2-9][0-9])$/,
    passwordInput: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
    repasswordInput: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
  };

  if (ele.id === "repasswordInput") {
    if (text === password && regex.repasswordInput.test(text)) {
      ele.classList.remove("is-invalid");
      ele.classList.add("is-valid");
    } else {
      ele.classList.remove("is-valid");
      ele.classList.add("is-invalid");
    }
  } else {
    if (regex[ele.id].test(text)) {
      ele.classList.remove("is-invalid");
      ele.classList.add("is-valid");
    } else {
      ele.classList.remove("is-valid");
      ele.classList.add("is-invalid");
    }
  }

  checkAllValidWithoutMessages();
}


async function getCategoryMeals(category) {
  rowData.innerHTML = "";
  loading.fadeIn(300);
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let response = await data.json();
  displayMeals(response.meals.slice(0, 20));
  loading.fadeOut(300);
}

async function getAreaMeals(area) {
  rowData.innerHTML = "";
  loading.fadeIn(300);
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let response = await data.json();
  displayMeals(response.meals.slice(0, 20));
  loading.fadeOut(300);
}

async function getIngredientsMeals(ingredients) {
  rowData.innerHTML = "";
  loading.fadeIn(300);
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  let response = await data.json();
  displayMeals(response.meals.slice(0, 20));
  loading.fadeOut(300);
}

async function getMealDetails(mealID) {
  closeNav();
  rowData.innerHTML = "";
  loading.fadeIn(300);
  searchContainer.innerHTML = "";
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  let response = await data.json();
  displayMealDetails(response.meals[0]);
  loading.fadeOut(300);
}

function displayMealDetails(meal) {
  searchContainer.innerHTML = "";

  let ingredients = ``;
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",") || [];
  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `<li class="alert alert-info  m-2 p-1">${tags[i]}</li>`;
  }

  let cartona = `
        <div class="text-end">
            <i id="closeBtn" class="fa-solid fa-xmark p-3 mb-3 rounded-3 shadow fs-4"
                onclick="$('#rowData').html(''); searchByName('')"
                style="cursor: pointer;"></i>
        </div>
        <div class=" col-lg-4   shadow-lg animate__animated animate__slideInLeft">
            <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
            <h2 class="text-warning mt-3">${meal.strMeal}</h2>
        </div>
        <div class="col-lg-8 animate__animated animate__slideInRight">
            <h2 class="text-warning  mb-2">Instructions</h2>
            <p>${meal.strInstructions}</p>
            <h3 class="text-white"><span class="fw-bolder text-warning ">Area : </span>${meal.strArea}</h3>
            <h3 class="text-white"><span class="fw-bolder text-warning ">Category : </span>${meal.strCategory}</h3>
            <h3 class="text-warning ">Recipes :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${ingredients}
            </ul>
            <h3 class="text-warning ">Tags :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${tagsStr}
            </ul>
            <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
            <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
        </div>`;

  rowData.innerHTML = cartona;
}
