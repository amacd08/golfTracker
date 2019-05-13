let golfers = [
    {
        id:2,
        roundID: 3,
        name: "andrew",
        rounds: [
            {
            id:1,
            date: 0401,
            course: 'parkway',
            parkway:{'score': [5, 6, 2, 7, 4, 3, 5, 5, 5], 
            fairway: ['yes', 'no', 'no', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes'], 
            gir: ['no', 'yes', 'yes', 'no', 'no', 'no', 'no', 'no', 'no'], 
            lostBall: ['no', 'yes', 'no', 'no', 'no', 'no', 'no', 'no', 'no'],
            numOfHoles: 9,
            goal: 48,}

        },
        {
            id: 2,
            date: 0415,
            course: 'parkway',
            mountainview: {'score': [5, 5, 5, 5, 5, 5, 5, 5, 5], 
            fairway: ['yes', 'yes', 'yes', 'yes', 'yes', 'yes','yes', 'yes', 'yes'], 
            gir: ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no'], 
            lostBall: ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no'],
            numOfHoles: 9,
            goal: 45,

        }}
    ]},
    {
        id:2,
        roundID: 3,
        name: "mike",
        rounds: [
            {
            id:1,
            date: 0401,
            course: 'thanksgivingpoint',
            thanksgivingpoint:{'score': [5, 5, 5, 5, 5, 5, 5, 5, 5], 
            'fairway': ['yes', 'yes', 'yes', 'yes', 'yes', 'yes','yes', 'yes', 'yes'], 
            'gir': ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no'], 
            'lostBall': ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no']},
            numOfHoles: 9,
            goal: 52
        },
            {
            id: 2,
            date: 0415,
            course: 'parkway',
            parkway:{'score': [5, 4, 3, 2, 5, 4, 3, 2, 1], 
            'fairway': ['yes', 'no', 'yes', 'no', 'yes', 'yes','yes', 'yes', 'yes'], 
            'gir': ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no'], 
            'lostBall': ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no']},
            numOfHoles: 9,
            goal: 42
        }]

    }
]

module.exports = golfers