// LOGIN

function login(event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const error =
        document.getElementById("loginError");


    // Demo credentials

    if (
        username === "Hemanth" &&
        password === "12345"
    ) {

        localStorage.setItem(
            "studentLoggedIn",
            "true"
        );

        localStorage.setItem(
            "studentUsername",
            username
        );

        window.location.href =
            "dashboard.html";

    } else {

        error.textContent =
            "Invalid username or password.";

    }

}


// LOGIN PROTECTION

if (
    window.location.pathname.includes(
        "dashboard.html"
    )
) {

    const loggedIn =
        localStorage.getItem(
            "studentLoggedIn"
        );

    if (loggedIn !== "true") {

        window.location.href =
            "index.html";

    }

}

// STUDENT DATA

let students = [

    {
        registerNo: "23IT001",
        name: "Arun Kumar",
        email: "arun@example.com",
        phone: "9876543210",
        department: "IT",
        year: "III",
        semester: "V"
    },

    {
        registerNo: "23CSE002",
        name: "Priya Sharma",
        email: "priya@example.com",
        phone: "9876543211",
        department: "CSE",
        year: "III",
        semester: "V"
    },

    {
        registerNo: "24ECE003",
        name: "Rahul Kumar",
        email: "rahul@example.com",
        phone: "9876543212",
        department: "ECE",
        year: "II",
        semester: "III"
    },

    {
        registerNo: "22MECH004",
        name: "Divya Raj",
        email: "divya@example.com",
        phone: "9876543213",
        department: "MECH",
        year: "IV",
        semester: "VII"
    },

    {
        registerNo: "24IT005",
        name: "Karthik S",
        email: "karthik@example.com",
        phone: "9876543214",
        department: "IT",
        year: "II",
        semester: "III"
    },

    {
        registerNo: "23CSE006",
        name: "Sneha R",
        email: "sneha@example.com",
        phone: "9876543215",
        department: "CSE",
        year: "III",
        semester: "V"
    }

];


// PAGE NAVIGATION


function showPage(pageId, button) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove(
                "active-page"
            );

        });


    const page =
        document.getElementById(pageId);

    if (page) {

        page.classList.add(
            "active-page"
        );

    }


    document
        .querySelectorAll(".menu")
        .forEach(menu => {

            menu.classList.remove(
                "active"
            );

        });


    if (button) {

        button.classList.add(
            "active"
        );

    }


    // Highlight correct sidebar button

    const menus =
        document.querySelectorAll(".menu");

    if (pageId === "dashboardPage") {

        menus[0].classList.add("active");

        setTitle("Dashboard");

    }

    if (pageId === "studentPage") {

        menus[1].classList.add("active");

        setTitle("Students");

        renderStudents();

    }

    if (pageId === "addPage") {

        menus[2].classList.add("active");

        setTitle("Add Student");

    }

    if (pageId === "profilePage") {

        menus[3].classList.add("active");

        setTitle("Profile");

    }

    if (pageId === "settingsPage") {

        menus[4].classList.add("active");

        setTitle("Settings");

    }

}


// PAGE TITLE


function setTitle(title) {

    const titleElement =
        document.getElementById(
            "pageTitle"
        );

    if (titleElement) {

        titleElement.textContent =
            title;

    }

}


// DASHBOARD

function updateDashboard() {

    const total =
        document.getElementById(
            "totalStudents"
        );

    const it =
        document.getElementById(
            "itCount"
        );

    const cse =
        document.getElementById(
            "cseCount"
        );

    const ece =
        document.getElementById(
            "eceCount"
        );


    if (!total) return;


    total.textContent =
        students.length;

    it.textContent =
        countDepartment("IT");

    cse.textContent =
        countDepartment("CSE");

    ece.textContent =
        countDepartment("ECE");


    renderDepartment();

    renderYears();

}


// COUNT DEPARTMENT


function countDepartment(department) {

    return students.filter(
        student =>
            student.department === department
    ).length;

}


// DEPARTMENT DISPLAY


function renderDepartment() {

    const container =
        document.getElementById(
            "departmentChart"
        );

    if (!container) return;


    container.innerHTML = "";


    const departments = [
        "IT",
        "CSE",
        "ECE",
        "MECH"
    ];


    const total =
        students.length || 1;


    departments.forEach(department => {

        const count =
            countDepartment(
                department
            );

        const percent =
            (count / total) * 100;


        container.innerHTML += `

            <div class="department-item">

                <div class="department-info">

                    <span>
                        ${department}
                    </span>

                    <strong>
                        ${count}
                    </strong>

                </div>

                <div class="progress">

                    <div
                        class="progress-bar"
                        style="width:${percent}%"
                    ></div>

                </div>

            </div>

        `;

    });

}




// YEAR SUMMARY


function renderYears() {

    const container =
        document.getElementById(
            "yearSummary"
        );

    if (!container) return;


    container.innerHTML = "";


    const years = [
        "I",
        "II",
        "III",
        "IV"
    ];


    years.forEach(year => {

        const count =
            students.filter(
                student =>
                    student.year === year
            ).length;


        container.innerHTML += `

            <div class="year-row">

                <span>
                    ${year} Year
                </span>

                <span class="year-count">
                    ${count} Students
                </span>

            </div>

        `;

    });

}


// RENDER STUDENTS


function renderStudents() {

    const table =
        document.getElementById(
            "studentTable"
        );

    if (!table) return;


    let list =
        [...students];


    // SEARCH

    const searchElement =
        document.getElementById(
            "search"
        );

    const search =
        searchElement
            ? searchElement.value
                .toLowerCase()
                .trim()
            : "";


    if (search) {

        list =
            list.filter(student =>

                student.name
                    .toLowerCase()
                    .includes(search)

                ||

                student.registerNo
                    .toLowerCase()
                    .includes(search)

            );

    }


    // DEPARTMENT

    const departmentElement =
        document.getElementById(
            "departmentFilter"
        );

    const department =
        departmentElement
            ? departmentElement.value
            : "";


    if (department) {

        list =
            list.filter(
                student =>
                    student.department ===
                    department
            );

    }


    // YEAR

    const yearElement =
        document.getElementById(
            "yearFilter"
        );

    const year =
        yearElement
            ? yearElement.value
            : "";


    if (year) {

        list =
            list.filter(
                student =>
                    student.year === year
            );

    }


    // SORT

    const sortElement =
        document.getElementById(
            "sortFilter"
        );

    const sort =
        sortElement
            ? sortElement.value
            : "";


    if (sort === "nameAsc") {

        list.sort(
            (a, b) =>
                a.name.localeCompare(
                    b.name
                )
        );

    }


    if (sort === "nameDesc") {

        list.sort(
            (a, b) =>
                b.name.localeCompare(
                    a.name
                )
        );

    }


    if (sort === "regAsc") {

        list.sort(
            (a, b) =>
                a.registerNo.localeCompare(
                    b.registerNo
                )
        );

    }


    if (sort === "regDesc") {

        list.sort(
            (a, b) =>
                b.registerNo.localeCompare(
                    a.registerNo
                )
        );

    }


    table.innerHTML = "";


    const empty =
        document.getElementById(
            "empty"
        );


    if (list.length === 0) {

        empty.style.display =
            "block";

        return;

    }


    empty.style.display =
        "none";


    list.forEach(student => {

        const index =
            students.indexOf(student);


        table.innerHTML += `

            <tr>

                <td>
                    ${student.registerNo}
                </td>

                <td>
                    ${student.name}
                </td>

                <td>

                    <span class="badge">
                        ${student.department}
                    </span>

                </td>

                <td>
                    ${student.year}
                </td>

                <td>
                    ${student.semester}
                </td>

                <td>
                    ${student.email}
                </td>

                <td>
                    ${student.phone}
                </td>

                <td>

                    <div
                        class="action-buttons"
                    >

                        <button
                            class="edit-button"
                            onclick="editStudent(${index})"
                        >
                            ✏️
                        </button>

                        <button
                            class="delete-button"
                            onclick="deleteStudent(${index})"
                        >
                            🗑️
                        </button>

                    </div>

                </td>

            </tr>

        `;

    });

}




// SAVE / ADD STUDENT


function saveStudent(event) {

    event.preventDefault();


    clearErrors();


    const registerNo =
        document.getElementById(
            "registerNo"
        ).value.trim();


    const name =
        document.getElementById(
            "studentName"
        ).value.trim();


    const email =
        document.getElementById(
            "email"
        ).value.trim();


    const phone =
        document.getElementById(
            "phone"
        ).value.trim();


    const department =
        document.getElementById(
            "department"
        ).value;


    const year =
        document.getElementById(
            "year"
        ).value;


    const semester =
        document.getElementById(
            "semester"
        ).value;


    const editIndex =
        document.getElementById(
            "editIndex"
        ).value;


    let valid = true;


    // REGISTER

    if (!registerNo) {

        showError(
            "regError",
            "Register number is required."
        );

        valid = false;

    }


    const duplicate =
        students.some(
            (student, index) =>

                student.registerNo
                    .toLowerCase() ===
                registerNo.toLowerCase()

                &&

                index != editIndex
        );


    if (duplicate) {

        showError(
            "regError",
            "Register number already exists."
        );

        valid = false;

    }


    // NAME

    if (!name) {

        showError(
            "nameError",
            "Name is required."
        );

        valid = false;

    }


    // EMAIL

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        showError(
            "emailError",
            "Enter a valid email."
        );

        valid = false;

    }


    // PHONE

    if (!/^[0-9]{10}$/.test(phone)) {

        showError(
            "phoneError",
            "Enter 10 digit phone number."
        );

        valid = false;

    }


    // DEPARTMENT

    if (!department) {

        showError(
            "deptError",
            "Select department."
        );

        valid = false;

    }


    // YEAR

    if (!year) {

        showError(
            "yearError",
            "Select year."
        );

        valid = false;

    }


    // SEMESTER

    if (!semester) {

        showError(
            "semError",
            "Select semester."
        );

        valid = false;

    }


    if (!valid) return;


    const student = {

        registerNo,
        name,
        email,
        phone,
        department,
        year,
        semester

    };


    // EDIT

    if (editIndex !== "") {

        students[
            Number(editIndex)
        ] = student;


        showToast(
            "Student updated successfully."
        );

    }


    // ADD

    else {

        students.push(student);


        showToast(
            "Student added successfully."
        );

    }


    updateDashboard();

    clearForm();

    showPage("studentPage");

}




// EDIT STUDENT


function editStudent(index) {

    const student =
        students[index];


    document.getElementById(
        "registerNo"
    ).value =
        student.registerNo;


    document.getElementById(
        "studentName"
    ).value =
        student.name;


    document.getElementById(
        "email"
    ).value =
        student.email;


    document.getElementById(
        "phone"
    ).value =
        student.phone;


    document.getElementById(
        "department"
    ).value =
        student.department;


    document.getElementById(
        "year"
    ).value =
        student.year;


    document.getElementById(
        "semester"
    ).value =
        student.semester;


    document.getElementById(
        "editIndex"
    ).value =
        index;


    document.getElementById(
        "formHeading"
    ).textContent =
        "Edit Student";


    document.getElementById(
        "saveText"
    ).textContent =
        "Update Student";


    showPage("addPage");

}



// DELETE STUDENT


function deleteStudent(index) {

    const student =
        students[index];


    const confirmDelete =
        confirm(
            "Are you sure you want to delete " +
            student.name +
            "?"
        );


    if (!confirmDelete) return;


    students.splice(
        index,
        1
    );


    updateDashboard();

    renderStudents();


    showToast(
        "Student deleted successfully."
    );

}




// CLEAR FORM


function clearForm() {

    const form =
        document.querySelector(
            "#addPage form"
        );


    if (form) {

        form.reset();

    }


    document.getElementById(
        "editIndex"
    ).value = "";


    document.getElementById(
        "formHeading"
    ).textContent =
        "Add Student";


    document.getElementById(
        "saveText"
    ).textContent =
        "Add Student";


    clearErrors();

}




// ERROR

function showError(
    id,
    message
) {

    document.getElementById(
        id
    ).textContent =
        message;

}



// CLEAR ERRORS


function clearErrors() {

    document
        .querySelectorAll(".error")
        .forEach(error => {

            error.textContent = "";

        });

}



// TOAST


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) return;


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 2500);

}




// LOGOUT


function logout() {

    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmLogout) return;


    localStorage.removeItem(
        "studentLoggedIn"
    );

    localStorage.removeItem(
        "studentUsername"
    );


    window.location.href =
        "index.html";

}




// PAGE LOAD


document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateDashboard();


        const username =
            localStorage.getItem(
                "studentUsername"
            );


        const loggedUser =
            document.getElementById(
                "loggedUser"
            );


        const profileUsername =
            document.getElementById(
                "profileUsername"
            );


        if (username) {

            if (loggedUser) {

                loggedUser.textContent =
                    username;

            }

            if (profileUsername) {

                profileUsername.textContent =
                    username;

            }

        }

    }
);