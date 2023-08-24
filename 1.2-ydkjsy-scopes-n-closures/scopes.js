// RED global
var students = [
    { id: 1, name: "Sebas", course: "JS" },
];

function getStudentName(studentId) {
    // BLUE function
    for (const student of students) {
        // GREEN block
        if (student.id === studentId) {
            return student.name;
        }
    }
}

function getStudentCourse(studentId) {
    // CYAN function
    for (const student of students) {
        // MAGENTA block
        if (student.id === studentId) {
            return student.course;
        }
    }
}

{
    // YELLOW block
    let studentName = getStudentName(1);
    let studentCourse = getStudentCourse(1);

    console.log(studentName, studentCourse);
}
