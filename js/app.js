// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

// Fetch data from API
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))


// Function to display employee information in grid-container

function displayEmployees(employeeData) {
    employees = employeeData;
    let employeeHTML = '';

    employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    employeeHTML += `
    <div class="card" data-index="${index}">
        <img class="avatar" src="${picture.large}">
        <div class="text-container">
            <h3 class="name">${name.first} ${name.last}</h3>
            <div class="info">
                <i class="fa fa-envelope-square" aria-hidden="true"></i>
                <p class="email" href="mailto:${email}">${email}</p>
            </div>
            <div class="info">
                <i class="fa fa-map-marker" aria-hidden="true"></i>
                <p class="address">${city}</p>
            </div>
        </div>
    </div>
    `
    });
    gridContainer.innerHTML = employeeHTML;
}

// Function to display modal when card is clicked

function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
    <img class="avatar-modal" src="${picture.large}" />
    <div class="text-container">
    <h3 class="name-modal">${name.first} ${name.last}</h3>
    <div class="info-modal">
    <i class="fa fa-envelope-square" aria-hidden="true"></i><p class="email-modal">${email}</p>
    </div>
    <div class="info-modal">
    <i class="fa fa-phone"></i><p class="email-modal">${phone}</p>
    </div>
    <hr />
    <div class="info-modal">
    <i class="fa fa-map-marker" aria-hidden="true"></i><p class="address-modal">${street.number} ${street.name}, ${city}, ${state} ${postcode}</p>
    </div>
    <p>Birthday:
    ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}



gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
    const card = e.target.closest(".card");
    const index = card.getAttribute('data-index');
    displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});