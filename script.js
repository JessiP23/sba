
/*let newMovies = ['shrek', 'Interstellar']

const indexOfMovie = newMovies.lastIndexOf('Shrek');
console.log(indexOfMovie);

newMovies.forEach((movie) => {
    console.log(movie);
})

for (let movie of newMovies) {
    console.log(movie);
    if (movie === 'Batman') break;
}

const vehicle = {
    interiorColor: 'red',
    year: '2024',
    mileage: 1000,
    isElectric: false,
    brand: "Toyota",
    model: 'Tundra',
    exteriorColor: 'blue',
    "active registration": true,
};

console.log(vehicle);
console.log(vehicle.interiorColor);
console.log(vehicle.mileage);

console.log(vehicle["year"]);
//Delete an object's property
delete vehicle["active registration"];
//Add a new property
vehicle.activeRegistraion = false;

vehicle.package = "Tech Package";
vehicle.model = 'Carry';
console.log(vehicle);

myOldCar.brand = 'Honda';
myOldCar.year = '2000';

for(const key in vehicle) {
    console.log(`${key}: ${vehicle[key]}`);
}
//key is a variable, not a literal, so that is why key is betweem the square brackets. 


//object inside of an object 
const cars = {
    color: 'blue',
    year: '1989',
    make: 'Audi',
    engine: {
        cylinders: 6,
        hp: 4000,
        size: 3.2,
    }
}

console.log(cars.engine.size);
//to get access into one element inside the object that is inside of the object is just add another dot.



//04/12/2024

function setColor(bycicle, wheels, size, color = 'Yellow') {
    console.log(color);
    bycicle.color = color;
    bycicle.wheels = wheels;
    bycicle.size = size;
}

const bikeObj = {};

setColor(bikeObj, 2, '20 inches');

console.log(bikeObj);
*/


//function that takes as parameters courseInfo, assignmentGroup, and learnerSubmissions
function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
    //Check if assignment group corresponds to course
    BelongToCourse(courseInfo, assignmentGroup, learnerSubmissions);

    //store the data for each user/learner
    const learnerData = [];

    //iterate over each submission the learnerSubmissions
    learnerSubmissions.forEach(submission => {
        //info about the submission
        const learnerId = submission.learner_id;
        const learnerSubmission = submission.submission;
        const learnerScores = {};
        //iterate over each assignment in the assigments array
        assignmentGroup.assignments.forEach(assignment => {
            const assignmentId = assignment.id;
            const dueDate = new Date(assignment.due_at);
            const pointsPossible = assignment.points_possible;
            //variable to update scores in case of late submission
            const submittedDate = new Date(learnerSubmission.submitted_at);

            if (submittedDate <= dueDate) {
                //if assignment was submitted on time
                let score = learnerSubmission.score;
                
                // Reduce grade for late submission
                if (submittedDate > dueDate) {
                    //Reduce 20% for late submissions
                    score -= pointsPossible * 0.2;
                }

                // Calculate score percentage
                const percentage = (score / pointsPossible) * 100;

                learnerScores[assignmentId] = percentage;
            }
        });

        const weightedAverage = calculateWeightedAverage(assignmentGroup, learnerScores);

        learnerData.push({
            id: learnerId,
            avg: weightedAverage,
            ...learnerScores
        });
    });

    return learnerData;
}

function BelongToCourse(courseInfo, assignmentGroup, learnerSubmissions) {
    // Validate if assignment group belongs to its course
    if (courseInfo.id !== assignmentGroup.course_id) {
        throw new Error("Invalid input: Assignment group does not belong to its course.");
    }

}

function calculateWeightedAverage(assignmentGroup, learnerScores) {
    //initialize variables for totalScore and totalWeight
    let totalScore = 0;
    let totalWeight = 0;

    assignmentGroup.assignments.forEach(assignment => {
        const assignmentId = assignment.id;
        const assignmentWeight = (assignment.points_possible / 100) * assignment.group_weight;

        // Calculate total score
        if (learnerScores.hasOwnProperty(assignmentId)) {
            totalScore += (learnerScores[assignmentId] / 100) * assignmentWeight;
            totalWeight += assignmentWeight;
        }
    });

    // Calculate weighted average
    const weightedAverage = (totalScore / totalWeight) * 100;

    return weightedAverage;
}


const courseInfo = { id: 1, name: "Course A" };
const assignmentGroup = {
    id: 1,
    name: "Group A",
    course_id: 1,
    group_weight: 50,
    assignments: [
        { id: 1, name: "Assignment 1", due_at: "2024-04-30", points_possible: 100 },
        { id: 2, name: "Assignment 2", due_at: "2024-05-15", points_possible: 200 }
    ]
};
const learnerSubmissions = [
    { learner_id: 1, assignment_id: 1, submission: { submitted_at: "2024-04-28", score: 90 } },
    { learner_id: 1, assignment_id: 2, submission: { submitted_at: "2024-05-14", score: 180 } }
];

const result = getLearnerData(courseInfo, assignmentGroup, learnerSubmissions);
console.log(result);




/*

let numArray = [10, 20, 0, -10, 15, 20, -1000, 42, 7];

function returnEven(array) {
    for (let i in array) {
        if (array[i] % 2 !== 0) {
        array.splice(i,1);
        }
    }
    return array;
}

console.log(numArray);
let newArray = returnEven(numArray);
console.log(newArray);
console.log(newArray);


document.title = 'Intro to the DOM';

const h1 = document.querySelector('#heading-1');
const navbar = document.querySelector('.navbar');
const h2 = document.querySelector('h2');

const ul = document.getElementById('todo-list');

const lis = document.querySelectorAll('li');

const visitedLinks = document.querySelectorAll('nav > a');

const footer = ul.nextElementSibling; //element

console.log(footer);

console.log(h1.innerText);
console.log(ul);
console.log(navbar);
console.log(h2);
console.log(lis);

console.log(visitedLinks);

//NodeLIst
visitedLinks.forEach(el => console.log(el));
console.log(visitedLinks.length);

//array
const visitedLinksArr = Array.from(visitedLinks);
visitedLinksArr.map(el => console.log(el));



//The firstChild and lastChild properties of each node point at the first and last child of that node. 
//The previousSibling and nextSibling properties of each node point at the nodes immediately before or after them, respectively, that share the same parent.
//Which method is most efficient for selecting an element that has an id attribute? it is by its performance


const taskInput = document.getElementById("task-input");
const createTaskBtn = document.getElementById('create-task-btn');
const taskListUl = document.getElementById('task-list');

createTaskBtn.addEventListener('click', addTask);
document.body.addEventListener('pointermove', handleMove);

function handleMove(event) {
    console.log('Pointer X:', event.x);
    console.log('Pointer Y:', event.y);
}

function addTask(event) {

}

*/