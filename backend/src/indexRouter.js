const express = require('express')

const app = express()

app.use('/auth', require('./auth/auth.route'))
app.use('/course', require('./course/course.router'))
app.use('/teacher', require('./teacher/teacher.router'))
app.use('/student', require('./student/student.router'))
app.use('/question', require('./question/question.router'))
app.use('/answer', require('./answers/answer.router'))
app.use('/courseFlows', require('./courseFlows/courseFlows.router'))
app.use('/test', require('./tests/tests.router'))
app.use('/edit', require('./edit/edit.router'))
app.use('/topics', require('./topics/topics.router'))
app.use('/studentsFollows', require('./studentsFollows/studentFollows.router'))
app.use('/rules', require('./rules/rules.router'))
app.use('/doc', require('./doc/doc.router'))

module.exports = app
