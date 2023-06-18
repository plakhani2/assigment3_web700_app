const { log } = require('console');
const fs = require('fs');

class Data {
  constructor(students, courses) {
    this.students = students;
    this.courses = courses;
  }
}

let dataCollection = null;

function initialize() {
  return new Promise((resolve, reject) => {
    fs.readFile('./data/students.json', 'utf8', (err, studentDataFromFile) => {
      if (err) {
        reject("Unable to read students.json");
        return;
      }

      fs.readFile('./data/courses.json', 'utf8', (err, courseDataFromFile) => {
        if (err) {
          reject("Unable to read courses.json");
          return;
        }

        const studentData = JSON.parse(studentDataFromFile);
        const courseData = JSON.parse(courseDataFromFile);

        dataCollection = new Data(studentData, courseData);
        resolve();
      });
    });
  });
}

function getAllStudents() {
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.students.length > 0) {
      resolve(dataCollection.students);
    } else {
      reject("No results returned");
    }
  });
}

function getTAs() {
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.students.length > 0) {
      const tas = dataCollection.students.filter(student => student.TA);
      resolve(tas);
    } else {
      reject("No results returned");
    }
  });
}

function getCourses() {
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.courses.length > 0) {
      resolve(dataCollection.courses);
    } else {
      reject("No results returned");
    }
  });
}

function getStudentsByCourse(course) {
  return new Promise(async(resolve, reject) => {
    const students = await this.getAllStudents();
    console.log(students)
    const studentsData = students.filter(student => student.course == course);
    console.log(studentsData)
    if (studentsData.length > 0) {
        resolve(studentsData);
    } else {
        reject('No results returned');
    }
  });
}

function getStudentByNum(num) {
  return new Promise(async (resolve, reject) => {
    const students = await this.getAllStudents();
    console.log(students)
    const student = students.find(student => student.studentNum == num);
    if (student) {
        resolve(student);
    } else {
        reject('No results returned');
    }
  });
}

module.exports = {
  initialize,
  getAllStudents,
  getTAs,
  getCourses,
  getStudentsByCourse,
  getStudentByNum
};