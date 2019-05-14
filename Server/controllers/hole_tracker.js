let golfCourse = require('./dataFolder/courses')

//Data structure = outside is an object that contains keys equal to courseNames - eg. . . mountainview, parkway, thanksgivingpoint, etc. . . 
//within each course/key is a list of objects. Each object represents a hole - 
//access example -> golfCourse.parkway[2] = This would access hole 3 information for parkway - 
//variables that will be used from the application will be courseID representing a variable equal to a string for the name
//let courseID = 'parkway' ;  golfCourse[courseID] would return all holes for parkway.

let golferList= require('./dataFolder/golfer')

//Data structure = initial access is a list of objects. In order to get access to an individual user the index in the array must be determined.
//Once determined it will be passed to the front end to be used at later points.
//Within each entry in the array is an individual user. The user will is an object with the following keys:
// id, roundIndex, name, rounds.
//Rounds contains the historical rounds for the user. Rounds is another list with each entry representing  around.
//Within the rounds data will be a roundIndex that needs to be used to access the round. In addition, there is a round titled the name of the course that contains the information for each hole.
//Within rounds is another array with all rounds associated with the user - this is accessed via - 
//golfers[golferIndex].rounds[roundIndex][courseName]
//The course name can come from the rounds Index. . .Within a specific course is the hole information that is relevant to the user - 
//This is stored in 4 arrays - round.score, round.fairway, round.gir, round.lostBall - these should be easy to reduce for totals.
let golfers = golferList.slice()

//ID is used for incrementing the userID.
let id = 2

module.exports = {
    //Collects all available course names  - does not contain course information
    //app.get('/api/course/', ht.getAllCourses)
    getAllCourses: (req,res) => {
        let courseList = Object.keys(golfCourse)
        res.send(courseList)    },
    
    // Collects specific course information for a specific golf course,
    //app.get('/api/course/:id', ht.getCourse)
    getCourse: (req,res) => {
        courseID = req.params.id
        let courseList = Object.keys(golfCourse)
        let  course = courseList.filter(courseName => {
            return courseID === courseName            
        })
        return res.send(golfCourse[courseID])
        // axios.get(`/api/course/${courseName}`).then(res => {
    },
    // Collects specific hole information from a course. Not the -1 on the hole parameter - this is an array that starts at 0.
    //app.get('/api/course/:id/:hole', ht.getHole)

    getHole: (req,res) => {
        let courseID = req.params.id
        let holeID = +req.params.hole -1
        res.send(golfCourse[courseID][holeID])
    },

    // Collects a specific golfer and historicol round information. Sends back golferID/Index and historical rounds or will create a new user if
    //the user does not yet exist
    //app.get('/api/golfer/:id', ht.getGolfer)

    getGolfer:(req,res) => {
        golferID = req.params.id
        index = 0
        todaysGolfer = golfers.find((golfer,i) => {
            if (golfer.name === golferID) {
                index = i
                return golfer
            }
        })
        if (todaysGolfer) {
            let newGolfer=false
            res.send({todaysGolfer,index,newGolfer})
        } else {
            todaysGolfer = {
                name: golferID,
                rounds: {},
            }
            let newGolfer = true
            golfers = [...golfers, todaysGolfer]
            res.send({todaysGolfer, index, newGolfer})

        }
    },
    //collects a specific round from a golfer - uses course name strings as the method of matching the request to a course. Note that the return of 
    //round index makes it so that this should only be used once.
    //app.get('/api/golfer/:id/:index/:round', ht.getGolferRound)

    getGolferRound: (req,res) => {
        index = req.params.index
        golferID = req.params.id
        golferRound = req.params.round
        let roundIndex = 0
        golfer = golfers[index]

        chosenRound = golfer.rounds.find((round, i) => {
            if (round.course === golferRound) {
                roundIndex = i
                return round
            }
        })
        if (chosenRound) {
            res.send({chosenRound, roundIndex})
        } else {
            res.send('failed')
        }
    },
    
    // Adds an entirely new course with no hole information
    //app.post('/api/course/:id', ht.addCourse)

    addCourse: (req,res) => {
        course = req.params.id
        golfCourse[course] = []
        res.status(200).send(course)
        },

    // adds a new round to a use. Returns the roundIndex for easy access later
    //app.put('/api/course/:id/', ht.addHole)

    addRound: (req,res) => {
        today = new Date()
        day = today.getDate()
        month = today.getMonth()
        date = month.toString()+ day.toString() 
        golferIndex = req.params.golfer
        courseID = req.params.course
            newRoundID =  golfers[golferIndex].roundID++
            golfers[golferIndex].rounds.push(
                {
                    'course': courseID,
                    'id': newRoundID,
                    'date': date
                })
            newRoundIndex = golfers[golferIndex].rounds.length 
            // golfers[index].rounds[newRoundIndex]['date'] = date
            // golfers[index].rounds[newRoundIndex]['id'] = newRoundID
            golfers[golferIndex].rounds[newRoundIndex -1][courseID] = []
            res.send({ newRoundIndex,})
    },
    //Adds a single hole to a round.
    //app.post('/api/round/:golfer/:course', ht.addRound)

    addHoleToRound: (req,res) => {
        console.log(golfers[0].rounds)
        golferIndex = req.params.golfer
        courseID = req.params.course
        roundIndex = Number(req.params.roundIndex)
        console.log(roundIndex)
        score = req.body
        golfers[golferIndex].rounds[newRoundIndex - 1][courseID].push(req.body)
        console.log(golfers[golferIndex].rounds[newRoundIndex - 1])

    },
    //Adds yard and par to a newCourse
    //app.put('/api/round/:golfer/:course/:roundIndex', ht.addHoleToRound)

    addHole: (req,res) => {
        let courseID = req.params.id
        let par = req.body.par
        let yard = req.body.yard
        console.log(golfCourse)
        golfCourse[courseID].push({
            par,
            yard
        })
        res.send(golfCourse[courseID])
    },
    //Adds user input for each hole they are playing
    //app.put('/api/golfer/:index/:round/:course/:hole', ht.updateRound)

    updateRound: (req,res) => { 
        fairway = req.body.fairway,
        gir = req.body.gir,
        lostBall = req.body.lostBall,
        score = req.body.score,
        index = req.params.index
        roundIndex = req.params.round
        course = req.params.course
        hole = req.params.hole
        golfers[index].rounds[roundIndex][course].push({
            hole,
            score,
            fairway,
            gir,
            lostBall,
        })

        res.send(golfers[index].rounds[roundIndex][course])
    }

}

