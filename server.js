/*********************************************************************************
*  WEB700 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: PRAKASH LAKHANI Student ID: 117302224 Date: 06/17/2023
*
********************************************************************************/ 

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var myApp = express();
var path = require("path");
const collegeData = require('./modules/collegeData'); 
const { log } = require("console");


myApp.get('/students', (req, res) => {
  const { course } = req.query;
  if (course) {
    console.log(course)
    collegeData.getStudentsByCourse(course)
      .then(students => {
        if (students.length === 0) {
          res.json({ message: 'no results' });
        } else {
          res.json(students);
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
      });
  } else {
    collegeData.getAllStudents()
      .then(students => {
        if (students.length === 0) {
          res.json({ message: 'no results' });
        } else {
          res.json(students);
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'Internal server error' });
      });
  }
});

myApp.get('/student/:num', (req, res) => {
  const num = req.params.num;

  collegeData.getStudentByNum(num)
    .then(student => {
      if (student) {
        res.json(student);
      } else {
        res.json({ message: 'no results' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Internal server error' });
    });
});



myApp.get('/courses', (req, res) => {
  collegeData.getCourses()
    .then(courses => {
      if (courses.length === 0) {
        res.json({ message: 'no results' });
      } else {
        res.json(courses);
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Internal server error' });
    });
});




myApp.get('/tas', (req, res) => {
  collegeData.getTAs()
    .then(tas => {
      if (tas.length === 0) {
        res.json({ message: 'no results' });
      } else {
        res.json(tas);
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Internal server error' });
    });
});



myApp.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});


myApp.get('/about', (req, res) => {
  res.sendFile(__dirname + '/views/about.html');
});


myApp.get('/htmlDemo', (req, res) => {
  res.sendFile(__dirname + '/views/htmlDemo.html');
});


collegeData.initialize()
  .then(() => {
    
    myApp.listen(8080, () => {
      console.log('Server is running on port 8080');
    });
  })
  .catch((err) => {
    console.error('Error initializing data:', err);
  });


myApp.use((req, res) => {
  res.status(404).send('Page Not Found');
});