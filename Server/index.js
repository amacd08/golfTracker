const express = require('express')
const app = express()
app.use(express.json())
const ht = require('./controllers/hole_tracker')

port = 3005

app.get('/api/course/', ht.getAllCourses)

app.get('/api/course/:id', ht.getCourse)

app.get('/api/course/:id/:hole', ht.getHole)

app.get('/api/golfer/:id', ht.getGolfer)

app.get('/api/round/:golferID/:courseName/:roundIndex', ht.getGolferRound)

app.post('/api/course/:id', ht.addCourse)

app.put('/api/course/:id/', ht.addHole)

app.post('/api/round/:golfer/:course', ht.addRound)

app.put('/api/round/:golfer/:roundIndex', ht.addHoleToRound)

// app.delete('api/golfer/:id/:round', ht.deleteRound)



app.listen(port, () => console.log(`Listening on ${port}`))

