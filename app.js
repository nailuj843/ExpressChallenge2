const express = require('express')
const app = express()

const bodyParser = require('body-parser');
const { response } = require('express');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let database = [
    {
        'studentID' : 1,
        'name': ['Julian', 'Heinze'],
        'grades': {'math': 85, 'science':78, 'english': 89, 'social studies': 91, 'band': 96}
    },
    {
        'studentID' : 2,
        'name': ['Dorothy', 'Heinze'],
        'grades': {'math': 91, 'science':92, 'english': 93, 'social studies': 95, 'band': 88}
    },
    {
        'studentID' : 3,
        'name': ['Julian', 'Casablancas'],
        'grades': {'math': 91, 'science':92, 'english': 93, 'social studies': 95, 'band': 88}
    }
]

app.get('/', (req,res) =>{
    res.write('\t\t\t\t\t\t\t\t\t\t Welcome to Student Viewer 3001 \n \n' )
    res.write('\t\t\t\t\t GET /students \t\t\t\t\t\t will show a list of students  \n\n')
    res.write('\t\t\t\t\t GET /students/?name=<enter your search here> \t\t will show all students that match your search (not case sensitive) \n\n')
    res.write('\t\t\t\t\t GET /students/:<ID> \t\t\t\t\t will show a single student that has the ID you searched\n\n')
    res.write('\t\t\t\t\t GET /grades/:<ID> \t\t\t\t\t will show the grades for a single student that has the ID you searched\n\n')
    res.write('\t\t\t\t\t POST /grades \t\t\t\t\t\t records a new grade, returns success status in JSON response \n\n')
    res.write('\t\t\t\t\t POST /register \t\t\t\t\t creates a new user, returns success status in JSON response \n\n')
    res.end()
})

app.get('/students', (req, res) => {

    if(req.query.name){
        let name = req.query.name.toLocaleLowerCase()
        let searchName = database.filter(user => (user.name[0].toLocaleLowerCase() === name || user.name[1].toLocaleLowerCase() === name) )

        if(searchName.length !== 0 ){
            res.send(`\t${searchName[0].studentID}: ${searchName[0].name[0]} ${searchName[0].name[1]}\n`)
        }else{
            res.send('no user was found with that name')
        }
        
    }else{
        database.forEach(entry => res.write( `\t${entry.studentID}: ${entry.name[0]} ${entry.name[1]}\n` ) )

        res.end()
    }
})

app.get('/students/:id', (req, res) => {
    let ID = parseInt(req.params.id)

    let student = database.filter(student => student.studentID === ID)

    res.send(`\t${student[0].studentID}: ${student[0].name[0]} ${student[0].name[1]}\n`)
})

app.get('/grades/:id', (req, res) => {
    let ID = parseInt(req.params.id)

    console.log(ID)

    let student = database.filter(student => student.studentID === ID)

    console.log(student[0].name[0])

    res.write(`\t ${student[0].studentID} ${student[0].name[0]} ${student[0].name[1]} \n\n`)

    res.write('\t Grades: \n\n')

    Object.keys(student[0].grades).forEach(grade => res.write(`\t ${grade}:  ${student[0].grades[grade]} \n\n`))

    // student[0].grades.forEach()

    res.end()
})

app.post('/grades', (req,res) => {
    // Tou do not need to actually store the grade in a database
    // You do need to validate that the user supplied at least a grade, and a studentId)

    let ID = req.body.studentID
    let grade = req.body.grade

    if(ID === undefined || grade === undefined){
        res.send('no valid grade or ID was provided')
    }
    res.write('this is where a new grade would be recorded \n')
    res.write(`you provided these values: \n studentID: ${ID} \n grade: ${grade}`)
    res.end()
})

app.post('/register', (req, res) => {

    // You do need to validate that the user supplied username and email

    let username = req.body.username
    let email = req.body.email

    if(username === undefined || email === undefined){
        res.send('no valid username or email was provided')
    }

    res.write('this is where a new student would be recorded \n')
    res.write(`you provided these values: \n username: ${username} \n email: ${email}`)
    res.end()
})

const port = 3001
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))