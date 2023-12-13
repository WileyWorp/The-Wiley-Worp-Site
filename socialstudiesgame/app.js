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
        question: "What is the law of the land?",
        options: ["The Globe", "George Washington", "The Constitution"],
        correctAnswer: "The Constitution",
        incorrectAnswers: ["The Globe", "George Washington"]
    },
    {
        question: "What kind of trial does someone have the right to?",
        options: ["Fair and Speedy", "Heavily armed", "Slow and Unconstitutional"],
        correctAnswer: "Fair and Speedy",
        incorrectAnswers: ["Heavily armed", "Slow and Unconstitutional"]
    },
    {
        question: "What are the branches of government?",
        options: ["Pentagon, Joe Biden, British Parliament", "Executive, Judicial, Legislative", "The Pentagon, Executive, Legislative"],
        correctAnswer: "Executive, Judicial, Legislative",
        incorrectAnswers: ["Pentagon, Joe Biden, British Parliament", "The Pentagon, Executive, Legislative"]
    },
    {
        question: "What group was for the constitution, pre-Bill of Rights?",
        options: ["Federalists", "Anti-federalists", "Communists"],
        correctAnswer: "Federalists",
        incorrectAnswers: ["Anti-federalists", "Communists"]
    },
    {
        question: "How many amendments are there?",
        options: ["34", "23", "27"],
        correctAnswer: "27",
        incorrectAnswers: ["34", "23"]
    },
    {
        question: "Who is the head of the executive branch?",
        options: ["The Governernor", "The Senate", "The President"],
        correctAnswer: "The President",
        incorrectAnswers: ["The Governernor", "The Senate"]
    },
    {
        question: "What does the legislative branch do?",
        options: ["Enforce the laws", "Make the laws", "Push the laws to the public"],
        correctAnswer: "Make the laws",
        incorrectAnswers: ["Enforce the laws", "Push the laws to the public"]
    },
    {
        question: "What does the Judicial branch do?",
        options: ["Enforce the laws", "Make the laws", "Push the laws to the public"],
        correctAnswer: "Enforce the laws",
        incorrectAnswers: ["Make the laws", "Push the laws to the public"]
    },
    {
        question: "What does the executive branch do?",
        options: ["Enforce the laws", "Make the laws", "Push the laws to the public"],
        correctAnswer: "Push the laws to the public",
        incorrectAnswers: ["Make the laws", "Push the laws to the public"]
    },
    {
        question: "People have the right to bear ___?",
        options: ["Cows", "Firearms (Guns)", "Bananas"],
        correctAnswer: "Firearms (Guns)",
        incorrectAnswers: ["Cows", "Bananas"]
    },
    {
        question: "True or false: The amendments protect the government",
        options: ["T", "F"],
        correctAnswer: "F",
        incorrectAnswers: ["T"]
    },
    {
        question: "True or false: Senate is based on population",
        options: ["T", "F"],
        correctAnswer: "F",
        incorrectAnswers: ["T"]
    },
    {
        question: "True or false: House of Representative is based on population",
        options: ["T", "F"],
        correctAnswer: "T",
        incorrectAnswers: ["F"]
    },
    {
        question: "True or false: The bill of rights was in the original draft of the constitution",
        options: ["T", "F"],
        correctAnswer: "F",
        incorrectAnswers: ["T"]
    },
    {
        question: "True or false: The executive branch has more power than the other branches",
        options: ["T", "F"],
        correctAnswer: "F",
        incorrectAnswers: ["T"]
    },
    {
        question: "True or false: Abraham Lincoln was the 5th president",
        options: ["T", "F"],
        correctAnswer: "F",
        incorrectAnswers: ["T"]
    },
    {
        question: "True or false: I can believe in my own religion",
        options: ["T", "F"],
        correctAnswer: "T",
        incorrectAnswers: ["F"]
    },
    {
        question: "True or false: The government can search me without a warrant",
        options: ["T", "F"],
        correctAnswer: "F",
        incorrectAnswers: ["T"]
    },
    {
        question: "True or false: The house of representatives is part of the Senate",
        options: ["T", "F"],
        correctAnswer: "F",
        incorrectAnswers: ["T"]
    },
    {
        question: "True or false: Everyone approved of the first draft of the constitution",
        options: ["T", "F"],
        correctAnswer: "F",
        incorrectAnswers: ["T"]
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
            if (randomOptions[i] === correctAnswer) {
                document.getElementById("randQuestion").textContent = "Correct!";
                var timer = setTimeout(function () {
                    document.getElementById("options").style.display = "none";
                    document.getElementById("randQuestion").textContent = "Awaiting...";
                }, 2000)
            } else {
                document.getElementById("randQuestion").textContent = "Wrong! Try Again.";
            }
        });
    }
}