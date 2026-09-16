let students = JSON.parse(localStorage.getItem("students")) || [];


// CREATE
document.getElementById("studentForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let regno = document.getElementById("regno").value.trim();
    let email = document.getElementById("email").value.trim();
    let department = document.getElementById("department").value;
    let year = document.getElementById("year").value;
    let studentId = document.getElementById("studentId").value;

    // Validation
    if (name === "" || regno === "" || email === "" ||
        department === "" || year === "") {

        alert("Please fill all fields.");
        return;
    }

    // Email validation
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email.");
        return;
    }


    // UPDATE
    if (studentId !== "") {

        let index = students.findIndex(
            student => student.id == studentId
        );

        students[index] = {
            id: Number(studentId),
            name: name,
            regno: regno,
            email: email,
            department: department,
            year: year
        };

        alert("Student updated successfully.");

    }

    // CREATE
    else {

        // Check duplicate register number
        let duplicate = students.some(
            student => student.regno === regno
        );

        if (duplicate) {
            alert("Register number already exists.");
            return;
        }

        let newStudent = {
            id: Date.now(),
            name: name,
            regno: regno,
            email: email,
            department: department,
            year: year
        };

        students.push(newStudent);

        alert("Student added successfully.");
    }


    saveStudents();

    document.getElementById("studentForm").reset();

    document.getElementById("studentId").value = "";

    document.getElementById("submitBtn").innerText = "Add Student";

    displayStudents();

});


// READ
function displayStudents() {

    let table = document.getElementById("studentTable");

    let searchValue =
        document.getElementById("search").value.toLowerCase();

    table.innerHTML = "";

    let filteredStudents = students.filter(student =>

        student.name.toLowerCase().includes(searchValue) ||

        student.regno.toLowerCase().includes(searchValue)

    );


    if (filteredStudents.length === 0) {

        document.getElementById("noData").style.display = "block";

        return;

    }

    document.getElementById("noData").style.display = "none";


    filteredStudents.forEach((student, index) => {

        let row = document.createElement("tr");

        row.innerHTML = `

            <td>${index + 1}</td>

            <td>${student.name}</td>

            <td>${student.regno}</td>

            <td>${student.email}</td>

            <td>${student.department}</td>

            <td>${student.year}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editStudent(${student.id})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                </button>

            </td>
        `;

        table.appendChild(row);

    });

}


// UPDATE - Edit
function editStudent(id) {

    let student = students.find(
        student => student.id === id
    );

    document.getElementById("studentId").value = student.id;

    document.getElementById("name").value = student.name;

    document.getElementById("regno").value = student.regno;

    document.getElementById("email").value = student.email;

    document.getElementById("department").value =
        student.department;

    document.getElementById("year").value =
        student.year;

    document.getElementById("submitBtn").innerText =
        "Update Student";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// DELETE
function deleteStudent(id) {

    let confirmDelete =
        confirm("Are you sure you want to delete this student?");

    if (!confirmDelete) {
        return;
    }

    students = students.filter(
        student => student.id !== id
    );

    saveStudents();

    displayStudents();

    alert("Student deleted successfully.");
}


// SAVE DATA
function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


// CANCEL EDIT
function cancelEdit() {

    document.getElementById("studentForm").reset();

    document.getElementById("studentId").value = "";

    document.getElementById("submitBtn").innerText =
        "Add Student";

}


// Display existing students
displayStudents();
