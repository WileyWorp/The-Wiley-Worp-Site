var myArray = ["1", "2", "3", "4", "5", "6"];

function roll() {
    var randomIndex = Math.floor(Math.random() * myArray.length);
    var randomItem = myArray[randomIndex];
    document.getElementById('rollNum').textContent = randomItem;
    var timer = setTimeout(function () {
        document.getElementById('rollNum').textContent = "Awaiting Roll";
    }, 5000)
}

const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: "William Shakespeare"
    },
    {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Endoplasmic Reticulum", "Golgi Apparatus"],
        correctAnswer: "Mitochondria"
    }
];

function randQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex].question;
    const randomOptions = questions[randomIndex].options;
    const correctAnswer = questions[randomIndex].correctAnswer;

    document.getElementById("randQuestion").textContent = randomQuestion;
    document.getElementById("options").style.display = "block";

    // Set the text content of labels inside buttons to the options
    for (let i = 0; i < randomOptions.length; i++) {
        const optionLabel = document.getElementById(`question${i + 1}`);
        optionLabel.textContent = randomOptions[i];

        // Add click event listener to each option button
        optionLabel.parentNode.addEventListener("click", function () {
            // Check if the selected option is correct
            if (randomOptions[i] === !correctAnswer) {
                document.getElementById("randQuestion").textContent = "Wrong! Try Again.";
            } else {
                document.getElementById("randQuestion").textContent = "Correct!";
                var timer = setTimeout(function () {
                    document.getElementById("options").style.display = "none";
                    document.getElementById("randQuestion").textContent = "Awaiting...";
                }, 2000)
            }
        });
    }
}