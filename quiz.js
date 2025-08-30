document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded, initializing quiz...');
    
    // Get DOM elements
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const quizContainer = document.querySelector('.quiz-container');
    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    const restartButton = document.getElementById('restart-btn');
    const resultsContainer = document.getElementById('results');
    const finalScoreElement = document.getElementById('final-score');
    const resultMessageElement = document.getElementById('result-message');
    const currentQuestionElement = document.getElementById('current-question');
    const totalQuestionsElement = document.getElementById('total-questions');
    const scoreElement = document.getElementById('score');
    const progressBar = document.getElementById('quiz-progress-bar');
    const feedbackElement = document.getElementById('feedback');
    const feedbackText = document.getElementById('feedback-text');
    
    // Log all elements for debugging
    console.log('Quiz Elements:', {
        startQuizBtn,
        quizContainer,
        questionContainer,
        questionElement,
        optionsContainer,
        prevButton,
        nextButton,
        restartButton,
        resultsContainer,
        finalScoreElement,
        resultMessageElement,
        currentQuestionElement,
        totalQuestionsElement,
        scoreElement,
        progressBar,
        feedbackElement,
        feedbackText
    });
    
    // Quiz state
    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = [];
    let quizCompleted = false;
    
    // Show quiz and hide start button when quiz starts
    function startQuiz() {
        console.log('Start quiz button clicked');
        if (startQuizBtn) startQuizBtn.style.display = 'none';
        if (quizContainer) {
            console.log('Showing quiz container');
            quizContainer.style.display = 'block';
        } else {
            console.error('Quiz container not found!');
        }
        initQuiz();
    }
    
    // Add click event to start button
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', startQuiz);
    }
    // Complete quiz questions from the text file
    const quizQuestions = [
        {
            question: "What key problem does quantum navigation aim to solve compared to GPS?",
            options: [
                "Making satellites cheaper",
                "Operating accurately without external radio signals (GPS-denied)",
                "Reducing website load times",
                "Communicating through walls"
            ],
            answer: 1,
            explanation: "Quantum navigation provides accurate positioning without relying on external signals like GPS, making it reliable in GPS-denied environments."
        },
        {
            question: "Which physical principle is most central to quantum navigation sensors?",
            options: [
                "Thermal expansion",
                "Matter-wave interference",
                "Classical resonance only",
                "Static electricity"
            ],
            answer: 1,
            explanation: "Quantum navigation relies on matter-wave interference to make ultra-precise measurements of position and movement."
        },
        {
            question: "In atom interferometry, which quantity carries information about motion?",
            options: [
                "Color of the atoms",
                "Mass alone",
                "Phase difference between paths",
                "Temperature of the lab"
            ],
            answer: 2,
            explanation: "The phase difference between quantum paths in an atom interferometer contains information about the motion and position of the system."
        },
        {
            question: "A quantum gyroscope primarily measures which quantity?",
            options: [
                "Ambient light level",
                "Humidity",
                "Rotation rate",
                "Sound intensity"
            ],
            answer: 2,
            explanation: "Quantum gyroscopes measure rotation rates with extreme precision using quantum mechanical effects."
        },
        {
            question: "What is a major advantage of quantum inertial sensors over classical IMUs?",
            options: [
                "They need satellites to work",
                "Lower long-term drift and better stability",
                "They run only underwater",
                "They require constant Wi-Fi"
            ],
            answer: 1,
            explanation: "Quantum sensors have significantly lower drift rates compared to classical IMUs, providing more accurate measurements over time."
        },
        {
            question: "In which environment is quantum navigation especially useful?",
            options: [
                "Open fields with perfect GPS",
                "Deep underwater or underground tunnels",
                "Areas with many cell towers",
                "Mountain tops with clear skies"
            ],
            answer: 1,
            explanation: "Quantum navigation is particularly valuable in GPS-denied environments like underwater, underground, or other areas where satellite signals cannot reach."
        },
        {
            question: "The Sagnac effect used in gyroscopes relates phase shift to:",
            options: [
                "Air pressure and humidity",
                "Enclosed area and rotation rate",
                "Battery voltage only",
                "Temperature gradient only"
            ],
            answer: 1,
            explanation: "The Sagnac effect creates a phase shift proportional to the enclosed area of the interferometer and the rotation rate, which is fundamental to quantum gyroscope operation."
        },
        {
            question: "How are atoms typically prepared for high-precision interferometry?",
            options: [
                "Laser cooling and trapping",
                "Microwave heating",
                "Mechanical compression",
                "Electric arc discharge"
            ],
            answer: 0,
            explanation: "Atoms are prepared using laser cooling and trapping techniques to reduce their thermal motion and create the ideal conditions for quantum interferometry."
        },
        {
            question: "A quantum gravimeter is designed to measure:",
            options: [
                "Earth's magnetic field",
                "Local gravitational acceleration (g)",
                "Air composition",
                "Radio frequency noise"
            ],
            answer: 1,
            explanation: "Quantum gravimeters use atom interferometry to measure local gravitational acceleration with extreme precision, useful for navigation and geological surveys."
        },
        {
            question: "In light-pulse atom interferometers, what acts like beam splitters and mirrors?",
            options: [
                "Mechanical shutters",
                "Acoustic waves",
                "Laser pulses driving atomic transitions",
                "Static electric plates"
            ],
            answer: 2,
            explanation: "Laser pulses that drive atomic transitions act as the quantum equivalents of beam splitters and mirrors in atom interferometers."
        }
    ];


    // Initialize quiz
    function initQuiz() {
        console.log('Initializing quiz...');
        
        // Reset quiz state
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = new Array(quizQuestions.length).fill(null);
        quizCompleted = false;
        
        console.log('Quiz state reset:', { currentQuestionIndex, score, userAnswers });
        
        // Update UI
        if (totalQuestionsElement) {
            totalQuestionsElement.textContent = quizQuestions.length;
            console.log('Set total questions to:', quizQuestions.length);
        }
        
        if (currentQuestionElement) {
            currentQuestionElement.textContent = '1';
            console.log('Set current question to: 1');
        }
        
        if (scoreElement) {
            scoreElement.textContent = '0%';
            console.log('Reset score to 0%');
        }
        
        if (progressBar) {
            progressBar.style.width = '0%';
            console.log('Reset progress bar');
        }
        
        // Show/hide elements
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
            console.log('Hid results container');
        }
        
        if (quizContainer) {
            quizContainer.style.display = 'block';
            console.log('Showed quiz container');
        }
        
        if (questionContainer) {
            questionContainer.style.display = 'block';
            console.log('Showed question container');
        }
        
        // Show first question
        showQuestion();
        updateProgress();
        
        console.log('Quiz initialization complete');
    }

    // Display current question
    function showQuestion() {
        if (!questionElement || !optionsContainer) return;
        
        const question = quizQuestions[currentQuestionIndex];
        questionElement.textContent = question.question;
        
        // Clear previous options
        optionsContainer.innerHTML = '';
        
        // Create new options
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'quiz-option';
            input.id = `option-${index + 1}`;
            input.value = index;
            input.disabled = quizCompleted;
            
            if (userAnswers[currentQuestionIndex] === index) {
                input.checked = true;
            }
            
            const label = document.createElement('label');
            label.htmlFor = `option-${index + 1}`;
            label.className = 'option-label';
            
            const radioSpan = document.createElement('span');
            radioSpan.className = 'option-radio';
            
            const textSpan = document.createElement('span');
            textSpan.className = 'option-text';
            textSpan.textContent = option;
            
            label.appendChild(radioSpan);
            label.appendChild(textSpan);
            
            optionElement.appendChild(input);
            optionElement.appendChild(label);
            
            // Add click event to handle option selection
            optionElement.addEventListener('click', () => {
                if (!quizCompleted) {
                    selectOption(optionElement, index);
                }
            });
            
            optionsContainer.appendChild(optionElement);
        });
        
        // Update navigation buttons
        if (prevButton) prevButton.disabled = currentQuestionIndex === 0;
        if (nextButton) {
            nextButton.textContent = currentQuestionIndex === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question';
        }
        
        // Show/hide feedback
        if (userAnswers[currentQuestionIndex] !== null) {
            showFeedback();
        } else {
            hideFeedback();
        }
    }

    // Handle option selection
    function selectOption(optionElement, optionIndex) {
        // Reset all options
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected', 'correct', 'incorrect');
        });
        
        // Mark selected option
        optionElement.classList.add('selected');
        
        // Store user answer
        userAnswers[currentQuestionIndex] = optionIndex;
        
        // Show feedback
        showFeedback();
    }

    // Show feedback for selected answer
    function showFeedback() {
        const selectedOption = userAnswers[currentQuestionIndex];
        const correctAnswer = quizQuestions[currentQuestionIndex].answer;
        const isCorrect = selectedOption === correctAnswer;
        
        // Update UI based on answer
        const options = document.querySelectorAll('.option');
        options.forEach((option, index) => {
            if (index === correctAnswer) {
                option.classList.add('correct');
            } else if (index === selectedOption && !isCorrect) {
                option.classList.add('incorrect');
            }
        });
        
        // Update feedback text
        feedbackElement.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        feedbackElement.querySelector('.feedback-title i').className = `fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}`;
        feedbackElement.querySelector('.feedback-title span').textContent = isCorrect ? 'Correct!' : 'Incorrect';
        feedbackText.textContent = quizQuestions[currentQuestionIndex].explanation;
        feedbackElement.style.display = 'block';
        
        // Update score if not already answered
        if (isCorrect && userAnswers[currentQuestionIndex] === selectedOption) {
            score++;
            updateScore();
        }
    }

    // Hide feedback
    function hideFeedback() {
        feedbackElement.style.display = 'none';
    }

    // Update progress bar and score
    function updateProgress() {
        const progress = ((currentQuestionIndex) / (quizQuestions.length - 1)) * 100;
        progressBar.style.width = `${progress}%`;
        currentQuestionElement.textContent = currentQuestionIndex + 1;
        updateScore();
    }

    // Update score display
    function updateScore() {
        const percentage = Math.round((score / quizQuestions.length) * 100);
        scoreElement.textContent = `${percentage}%`;
    }

    // Show results
    function showResults() {
        const percentage = Math.round((score / quizQuestions.length) * 100);
        finalScoreElement.textContent = `${percentage}%`;
        
        // Set result message based on score
        let message = '';
        if (percentage >= 80) {
            message = 'Excellent! You have a deep understanding of quantum navigation.';
        } else if (percentage >= 60) {
            message = 'Good job! You have a solid grasp of quantum navigation concepts.';
        } else if (percentage >= 40) {
            message = 'Not bad! Review the material and try again to improve your score.';
        } else {
            message = 'Keep learning! Review the modules and try the quiz again.';
        }
        
        resultMessageElement.textContent = message;
        quizContainer.style.display = 'none';
        resultsContainer.style.display = 'block';
        
        // Animate score counter
        animateValue(finalScoreElement, 0, percentage, 1500);
    }

    // Animate value counter
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = `${current}%`;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Event Listeners
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (userAnswers[currentQuestionIndex] === null) {
                alert('Please select an answer before continuing.');
                return;
            }
            
            if (currentQuestionIndex < quizQuestions.length - 1) {
                currentQuestionIndex++;
                showQuestion();
                updateProgress();
            } else {
                showResults();
            }
        });
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                showQuestion();
                updateProgress();
            }
        });
    }
    
    if (restartButton) {
        restartButton.addEventListener('click', () => {
            // Hide results and show quiz container
            if (resultsContainer) resultsContainer.style.display = 'none';
            if (quizContainer) quizContainer.style.display = 'block';
            
            // Reset quiz state and UI
            initQuiz();
            
            // Reset options
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected', 'correct', 'incorrect');
                const input = opt.querySelector('input[type="radio"]');
                if (input) input.checked = false;
            });
            
            // Hide feedback
            hideFeedback();
        });
    }

    // Don't initialize the quiz until Start Quiz button is clicked
    console.log('Quiz system loaded and ready');
});
