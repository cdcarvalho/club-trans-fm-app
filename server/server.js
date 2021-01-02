require('dotenv/config')

const express = require('express')
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const auth = require('../server/middlewares/auth')
const jwt = require('jsonwebtoken');
const httpEnum = require('../server/enum/Ehttp')
var User = require('./models/user')
var Commercial = require('./models/commercial')
var Schedule = require('./models/schedule')
var Speaker = require('./models/speaker')
var Expense = require('./models/expense')

mongoose.connect(process.env.URL_MONGODB, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var router = express.Router();

router.get('/authenticate', function (request, response) {

    const [, hash] = request.headers.authorization.split(' ')
    const [username, password] = Buffer.from(hash, 'base64').toString().split(":");

    try {
        User.findOne({ 'login': username, 'password': password }, function (error, user) {
            if (error)
                response.send(error);

            if (user == null) {
                response.sendStatus(httpEnum.httpStatusCode.UNAUTHORIZED);
            }

            const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: 7200 });

            return response.json({ 'token': token });
        });
    } catch (error) {
        response.sendStatus(httpEnum.httpStatusCode.SERVER_ERROR);
    }
})

router.get('/token-valid', function (request, response) {
    const authHeader = request.headers.authorization;

    try {

        if (!authHeader) {
            return response.status(httpEnum.httpStatusCode.UNAUTHORIZED).json({ message: 'Token is required!' });
        }

        const [, token] = authHeader.split(' ');

        try {
            jwt.verify(token, process.env.SECRET);
            return response.send(true)
        } catch (error) {
            return response.send(false)
        }

    } catch (error) {
        response.sendStatus(httpEnum.httpStatusCode.SERVER_ERROR);
    }
})

//router.use(auth);

router.get('/users', function (request, response) {
    User.find(function (error, users) {
        if (error)
            response.send(error);

        response.json(users);
    });
});

router.route('/user')

    .post(function (request, response) {
        var user = new User();

        user.login = request.body.login;
        user.password = request.body.password;
        user.name = request.body.name;
        user.email = request.body.email;

        user.save(function (error) {
            if (error) {
                console.log(error)
                response.status(500).json({ message: error });
            } else {
                response.status(200).json({ message: 'User createded.' });
            }
        });
    })

router.route('/user/:id')

    .get(function (request, response) {
        User.findById(request.params.id, function (error, user) {
            if (error)
                response.send(error);

            response.json(user);
        });
    })

    .put(function (request, response) {
        User.findById(request.params.id, function (error, user) {
            if (error)
                response.send(error);

            user.login = request.body.login;
            user.password = request.body.password;
            user.name = request.body.name;
            user.email = request.body.email;

            user.save(function (error) {
                if (error)
                    response.send(error);

                response.json({ message: 'User updateded.' });
            });
        });
    })

    .delete(function (request, response) {
        User.deleteOne({
            _id: request.params.id
        }, function (error) {
            if (error)
                response.send(error);

            response.json({ message: 'User deleted.' });
        });
    });


//api commercial
router.get('/commercials', function (request, response) {
    Commercial.find(function (error, users) {
        if (error)
            response.send(error);

        response.json(users);
    });
});

router.route('/commercial')
    .post(function (request, response) {
        var commercial = new Commercial();

        commercial.name = request.body.name;
        commercial.address = request.body.address;
        commercial.number = request.body.number;
        commercial.neighborhood = request.body.neighborhood;
        commercial.cnpj_cpf = request.body.cnpj_cpf;
        commercial.phone = request.body.phone;
        commercial.mobile_number = request.body.mobile_number;
        commercial.email = request.body.email;
        commercial.price = request.body.price;
        commercial.due_date = request.body.due_date;
        commercial.total_calls = request.body.total_calls;
        commercial.speaker = request.body.speaker;
        commercial.percentage = request.body.percentage;
        commercial.typeCommercial = request.body.typeCommercial;

        commercial.save(function (error) {
            if (error) {
                console.log(error)
                response.status(500).json({ message: error });
            } else {
                response.status(200).json({ message: 'Commercial createded.' });
            }
        });
    })

router.route('/commercial/:id')
    .get(function (request, response) {
        Commercial.findById(request.params.id, function (error, commercial) {
            if (error)
                response.send(error);

            response.json(commercial);
        });
    })

    .put(function (request, response) {
        Commercial.findById(request.params.id, function (error, commercial) {
            if (error)
                response.send(error);

            commercial.name = request.body.name;
            commercial.address = request.body.address;
            commercial.number = request.body.number;
            commercial.neighborhood = request.body.neighborhood;
            commercial.cnpj_cpf = request.body.cnpj_cpf;
            commercial.phone = request.body.phone;
            commercial.mobile_number = request.body.mobile_number;
            commercial.email = request.body.email;
            commercial.price = request.body.price;
            commercial.due_date = request.body.due_date;
            commercial.total_calls = request.body.total_calls;
            commercial.speaker = request.body.speaker;
            commercial.percentage = request.body.percentage;
            commercial.typeCommercial = request.body.typeCommercial;

            commercial.save(function (error) {
                if (error)
                    response.send(error);

                response.json({ message: 'Commercial updateded.' });
            });
        });
    })

    .delete(function (request, response) {
        Commercial.deleteOne({
            _id: request.params.id
        }, function (error) {
            if (error)
                response.send(error);

            response.json({ message: 'Commercial deleted.' });
        });
    });

//Schedule
router.route('/schedule')
    .post(function (request, response) {
        var schedule = new Schedule();

        schedule.schedule = request.body.schedule;
        schedule.id_commercial = request.body.idCommercial;

        schedule.save(function (error) {
            if (error) {
                console.log(error)
                response.status(500).json({ message: error });
            } else {
                response.status(200).json({ message: 'Schedule createded.' });
            }
        });
    })

router.get('/schedules', function (request, response) {
    Schedule.find(function (error, schedules) {
        if (error)
            response.send(error);

        response.json(schedules);
    });
});

router.route('/schedule/commercial/:idCommercial')

    .get(function (request, response) {
        try {
            Schedule.find({ 'id_commercial': request.params.idCommercial }, function (error, schedules) {
                if (error)
                    response.send(error);

                if (schedules == null) {
                    response.sendStatus(httpEnum.httpStatusCode.UNAUTHORIZED);
                }

                response.json(schedules);
            });
        } catch (error) {
            response.sendStatus(httpEnum.httpStatusCode.SERVER_ERROR);
        }
    })

router.route('/schedule/:id')
    .delete(function (request, response) {
        Schedule.deleteOne({
            _id: request.params.id
        }, function (error) {
            if (error)
                response.send(error);

            response.json({ message: 'Schedule deleted.' });
        });
    });


//Speaker
router.route('/speaker')
    .post(function (request, response) {
        var speaker = new Speaker();

        speaker.name = request.body.name;
        speaker.mobile_number = request.body.mobile_number;
        speaker.schedule = request.body.schedule;

        speaker.save(function (error) {
            if (error) {
                console.log(error)
                response.status(500).json({ message: error });
            } else {
                response.status(200).json({ message: 'Speaker createded.' });
            }
        });
    })

router.get('/speakers', function (request, response) {
    Speaker.find(function (error, speakers) {
        if (error)
            response.send(error);

        response.json(speakers);
    });
});

router.route('/speaker/:id')

    .get(function (request, response) {
        Speaker.findById(request.params.id, function (error, speaker) {
            if (error)
                response.send(error);

            response.json(speaker);
        });
    })

    .put(function (request, response) {
        Speaker.findById(request.params.id, function (error, speaker) {
            if (error)
                response.send(error);

            speaker.name = request.body.name;
            speaker.mobile_number = request.body.mobile_number;
            speaker.schedule = request.body.schedule;

            speaker.save(function (error) {
                if (error)
                    response.send(error);

                response.json({ message: 'Speaker updateded.' });
            });
        });
    })


router.route('/speaker/:id')
    .delete(function (request, response) {
        Speaker.deleteOne({
            _id: request.params.id
        }, function (error) {
            if (error)
                response.send(error);

            response.json({ message: 'Speaker deleted.' });
        });
    });

//Expense
router.route('/expense')
    .post(function (request, response) {
        var expense = new Expense();

        expense.description = request.body.description;
        expense.phone = request.body.phone;
        expense.month = request.body.month;
        expense.price = request.body.price;

        expense.save(function (error) {
            if (error) {
                console.log(error)
                response.status(500).json({ message: error });
            } else {
                response.status(200).json({ message: 'Expense createded.' });
            }
        });
    })

router.get('/expenses', function (request, response) {
    Expense.find(function (error, expenses) {
        if (error)
            response.send(error);

        response.json(expenses);
    });
});

router.route('/expense/:id')

    .get(function (request, response) {
        Expense.findById(request.params.id, function (error, expense) {
            if (error)
                response.send(error);

            response.json(expense);
        });
    })

    .put(function (request, response) {
        Expense.findById(request.params.id, function (error, expense) {
            if (error)
                response.send(error);

            expense.description = request.body.description;
            expense.phone = request.body.phone;
            expense.month = request.body.month;
            expense.price = request.body.price;

            expense.save(function (error) {
                if (error)
                    response.send(error);

                response.json({ message: 'Expense updateded.' });
            });
        });
    })


router.route('/expense/:id')
    .delete(function (request, response) {
        Expense.deleteOne({
            _id: request.params.id
        }, function (error) {
            if (error)
                response.send(error);

            response.json({ message: 'Expense deleted.' });
        });
    });

app.use('/api', router);

app.listen(process.env.PORT);
console.log('Running port '.concat(process.env.PORT));
