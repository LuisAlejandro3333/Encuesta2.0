let elQuestionScreen = document.getElementById("questionscreen")
let elScreenResult = document.getElementById("resultscreen")
let usuarioId = document.getElementById("textHistorial")
let historial = [];

//localStorage.setItem('userData',"")


// resetear rapido sessionStorage y localStorge seleccionar y dar ctrl+k y luego ctrl+u para descomentar, lo mismo pero con ctrl+k y luego ctrl+c para comentar

// localStorage.setItem('userData',"")

// result = []
// result.push({ "username": "prueba", "points": 0, "currentIndex" : 0, "questionActual" : 1,"stage" : "process"})
// localStorage.setItem("userData", JSON.stringify(result));

// sessionStorage.setItem('userActual',"prueba")
// sessionStorage.setItem('userStage',"process")
// sessionStorage.setItem('userPoints',0)
// sessionStorage.setItem('userQuestionActual',1)
// sessionStorage.setItem('userCurrentIndex',0)

//localStorage.setItem('userData','');
//if(sessionStorage.getItem() ==)
console.log('sessionStorage')
console.log(sessionStorage)
console.log('\n\n\n')
console.log('localStorage')
console.log(localStorage)
console.log('\n\n\n')
//let sumador = 0
if(localStorage.userData){
    var userData = JSON.parse(localStorage.userData);
}else{
    var userData = [];
}

console.log('userData')
console.log(userData)

function Quiz() {
    this.questions = []
    this.counter = 0
    this.indexCurrentQuestion = 0
    this.questionsAnswered = 0
    this.addQuestion = function(question) {
        this.questions.push(question)
    }
    this.showCurrentQuestion = function() {
        
    console.log(this.indexCurrentQuestion);
        
        userName = document.getElementById("usuario").value        
        console.log(sessionStorage)
        
        stage= sessionStorage.getItem('userStage')

        if(sessionStorage.getItem('userActual')!="") sessionStorage.setItem("userActual", userName)

        
        currentIndex = sessionStorage.getItem('userCurrentIndex');
        questionActual = sessionStorage.getItem('userQuestionActual');

        
        points = sessionStorage.getItem('userPoints')
        sessionStorage.setItem("userPoints", points)

        if (this.indexCurrentQuestion < this.questions.length && stage!="finish" ) {
            this.questions[this.indexCurrentQuestion].getElement()
            sessionStorage.setItem('userStage','process')
            stage = "process"
            const result = userData.findIndex(element  => element.username == userName);
            if(result==-1){
                userDataNew= {"username": userName, "points": 0, "currentIndex" : 0, "questionActual" : 1, "stage" : stage}
                userData.push(userDataNew)
                console.log("userDataNew")
                localStorage.setItem("userData", JSON.stringify(userData));
            }else{
                console.log("estoy aqui")
                userData[result]= {"username": userName, "points": points, "currentIndex" : currentIndex, "questionActual" : questionActual, "stage" : stage}
                localStorage.setItem("userData", JSON.stringify(userData));
            }
            //userData= {"username": userName, "points": points, "currentIndex" : currentIndex, "questionActual" : questionActual, "stage" : stage}
            //result.push({ "username": userName, "points": points, "currentIndex" : userCurrentIndex, "questionActual" : questionActual,"stage" : "finish"})
            //localStorage.setItem("userData", JSON.stringify(userData));
        } else {
            sessionStorage.setItem('userStage','finish')
            
            elQuestionScreen.classList.add('hidden')
            
            let elCorrectAnswers = document.querySelector("#correctAnswers")
            elCorrectAnswers.innerHTML = points
            historial[historial.length - 1].points = quiz.counter;
            
            const result = userData.findIndex(element  => element.username == userName);
            userData[result]= {"username": userName, "points": points, "currentIndex" : currentIndex, "questionActual" : questionActual, "stage" : "finish"}
            //result.push({ "username": userName, "points": points, "currentIndex" : userCurrentIndex, "questionActual" : questionActual,"stage" : "finish"})
            localStorage.setItem("userData", JSON.stringify(userData));
            // elScreenResult.classList.add('block')
            elScreenResult.style.display = "block"
        }
        
        console.log(localStorage)

    }
}

function Question(title, answers, correctAnswer) {
    this.title = title
    this.answers = answers
    this.correctAnswer = correctAnswer
    this.getBody = function() {
        let body = this.title.toUpperCase() + '\n'
        for (let i=0; i<this.answers.length; i++) {
             body += (i+1) + '. ' + this.answers[i] + '\n'
        }
        return body
    }
    this.addAnswer = function(answer) {
        // this.answers[this.answers.length] = answer
        this.answers.push(answer)
    }
    this.isCorrectAnswer = function(userAnswer) {
        if (this.correctAnswer == userAnswer) return true
        else return false
    }

    this.getElement = function() {
        // console.log(quiz)
        let questionNumber = document.createElement("h2")
        questionNumber.textContent = `pregunta ${quiz.question} de 5`
        
        elQuestionScreen.append(questionNumber)
        let questionTitle = document.createElement("h3")
        questionTitle.textContent = this.title
        elQuestionScreen.append(questionTitle)

        let questionAnswers = document.createElement("ul")
        questionAnswers.classList.add("question__awswers")

        this.answers.forEach((answer, index) => {
            let elAnswer = document.createElement("li")
            elAnswer.classList.add("awswer")
            elAnswer.textContent = answer
            elAnswer.id = index+1
            elAnswer.addEventListener("click", this.checkAnswer)
            questionAnswers.append(elAnswer)
        })

        elQuestionScreen.append(questionAnswers)
    }

    this.checkAnswer = (event) => {
        // console.log("quizAnswered :"+ quiz.questionsAnswered)
        quiz.questionsAnswered ++
        // console.log('questionsAnswered: '+quiz.questionsAnswered)
        sessionStorage.setItem("userQuestionActual", quiz.questionsAnswered)
        let anwserSelected = event.target
        let isCorrectAnswer = this.isCorrectAnswer(anwserSelected.id);
        if (isCorrectAnswer) {
            anwserSelected.classList.add('answer--correct')
            quiz.counter++
            sessionStorage.setItem('userPoints',quiz.counter)
        } else {
            anwserSelected.classList.add('answer--wrong')
            let elCorrectAnswer = document.getElementById(this.correctAnswer)
            
        }        
        
        let incrementQuestionNumber = 1;
        
        console.log(historial)
        if (!isCorrectAnswer)
            switch (quiz.indexCurrentQuestion) {
                case 0:
                    incrementQuestionNumber = 4;
                    break;
            
                case 4:
                    incrementQuestionNumber = 5;
                    break;

                case 10:    
                    incrementQuestionNumber = 5;
                    break;
            }
            

            console.log(quiz.indexCurrentQuestion);
        if (quiz.questionsAnswered === 5) incrementQuestionNumber = quiz.questions.length;

        console.log("🚀 ~ file: index.js ~ line 86 ~ Question ~ incrementQuestionNumber", incrementQuestionNumber)
        setTimeout(function() {
            elQuestionScreen.textContent = ''
            quiz.indexCurrentQuestion += incrementQuestionNumber     
            sessionStorage.setItem("userCurrentIndex", quiz.indexCurrentQuestion)    
            console.log(quiz.indexCurrentQuestion)   
            quiz.showCurrentQuestion() 
        }, 1000)
        quiz.question++
        sessionStorage.setItem("userQuestionActual", quiz.question)
        
    }
            
}

let question1 = new Question('¿Cuánto tiempo llevas usando el producto?', ["primera vez", "1 Mes" ,"1 año"], 3)
let question2 = new Question('¿Qué alternativas consideraste antes de comprar el producto?', ['	Métodos de Pago', '	Disponibilidad', '	Tiempo en despacho', '	Atencion al cliente'], 1)
let question3 = new Question('¿Con qué frecuencia utilizas el producto o servicio?', ['	poca frecuencia', '	Mensualmente', 'Mucha Frecuencia'], 1)
let question4 = new Question('¿El producto te ayuda a lograr tus objetivos?', ['si', 'no'], 1)
let question5 = new Question('¿Cuál es tu rango de edad?', ["Mayor a 20 años", "Entre 40 y 50 años", "Mayor a 60 años"], 1)
let question6 = new Question('¿Cuál es tu situación laboral?', ['Trabajo actualmente', 'casado', 'Pensionado'], 1)
let question7 = new Question('¿Tiene Hijos?', ['Si ','NO' ], 1)
let question8 = new Question('¿Cuál es tu estado civil y si tienes hijos?', ['Soltero', 'Casado', 'Divorciado'], 1)
let question9 = new Question('¿Cuál es tu nivel de educación?', ['Profesional Universitario', 'Estudiante Universitario', 'Clase media completa'], 1)
let question10 = new Question('¿Cuál es tu ingreso familiar anual aproximado?', ['Menos de 10Mill', 'Mas de 10mill'], 2)
let question11 = new Question('¿Qué tan satisfecho estás hoy con tu experiencia en la tienda?', ["No estoy satisfecho", "Poco satisfecho", "Satisfecho"], 3)
let question12 = new Question('¿Qué tan probable es que recomiendes (inserta el producto o servicio) a otras personas?', ['	No lo recomendaría','Poco Probable', 'Probable', 'Muy Probable'], 4)
let question13 = new Question('Califica tu satisfacción respecto a nuestro equipo para resolver tu problema.', ['1-3 baja satisfacción', '3-5 media satisfacción','5-7 satisfecho o/a'], 3)
let question14 = new Question('¿Sentiste que nuestro equipo respondió con prontitud tu consulta?', ['si', 'no'], 1)
let question15 = new Question('¿Estás de acuerdo o en desacuerdo con que tu problema fue resuelto efectivamente?', ["De acuerdo", "En desacuerdo"], 1)
let question16 = new Question('¿Qué posibilidades hay de que vuelvas a comprarnos?', ['	Ninguna posibilidad', '	Posiblemente', 'Totalmente Posible'], 3)
let question17 = new Question('¿Qué posibilidades hay de que vuelvas a nuestro sitio web?', ['Ninguna posibilidad', 'Posiblemente', 'Totalmente Posible'], 3)
let question18 = new Question('¿Podemos comunicarnos contigo para dar seguimiento a estas respuestas?', ['Si', 'No'], 1)
let question19 = new Question('En el futuro, ¿estarías dispuesto a volver a realizar esta encuesta?', ['Si', 'No'], 1)
let question20 = new Question('Si tuviéramos que actualizar (inserta la función del producto aquí), ¿podríamos comunicarnos contigo para hablar sobre estos cambios?', ['Si', 'No'], 1)

let quiz = new Quiz()
quiz.addQuestion(question1)
quiz.addQuestion(question2)
quiz.addQuestion(question3)
quiz.addQuestion(question4)
quiz.addQuestion(question5)
quiz.addQuestion(question6)
quiz.addQuestion(question7)
quiz.addQuestion(question8)
quiz.addQuestion(question9)
quiz.addQuestion(question10)
quiz.addQuestion(question11)
quiz.addQuestion(question12)
quiz.addQuestion(question13)
quiz.addQuestion(question14)
quiz.addQuestion(question15)
quiz.addQuestion(question16)
quiz.addQuestion(question17)
quiz.addQuestion(question18)
quiz.addQuestion(question19)
quiz.addQuestion(question20)
 



function seeFirstQuestion() {
    userName = document.getElementById("usuario").value
    if(sessionStorage.getItem('userActual')!=userName){
        const result = userData.find(element  => element.username === userName);
        if(result){
            sessionStorage.setItem('userCurrentIndex',result.currentIndex)
            sessionStorage.setItem('userPoints',result.points)
            sessionStorage.setItem('userStage',result.stage)
            sessionStorage.setItem('userQuestionActual',result.questionActual)
            sessionStorage.setItem('userActual',result.username)
        }else{
            resetSesionStorage()
        }
    }

    

    currentIndex = sessionStorage.getItem('userCurrentIndex')
    if(currentIndex==""){
        currentIndex=0
    }
    questionsActual = sessionStorage.getItem('userQuestionActual')
    if(questionsActual==""){
        questionsActual=1
    }
    points = sessionStorage.getItem('userPoints')
    if(points==""){
        points=0
    }

    if(points==""){
        points=0
    }

    let elWelcomeScr = document.getElementById("welcomescreen")
    // elWelcomeScr.style.display = 'none'
    elWelcomeScr.classList.remove('block')
    elWelcomeScr.classList.add('hidden')

    elQuestionScreen.classList.remove('hidden')
    quiz.indexCurrentQuestion = currentIndex*1
    quiz.questionsAnswered = (questionsActual*1)-1
    quiz.counter = points*1
    quiz.question = questionsActual*1
    
    quiz.showCurrentQuestion()    
}

let elWelcomeBtn = document.getElementById("welcome_btn")
elWelcomeBtn.addEventListener("click", seeFirstQuestion)



// para el botton del iniciar sesion 
function respuesta (){    
    let formulario = document.getElementById("contenedor")
    formulario.classList.remove('block')
    formulario.classList.add('hidden')

    let quizSreen = document.getElementById("quiz")
    quizSreen.classList.add('block')

    historial.push({user: document.getElementById("usuario").value})    
}

let laRespuesta = document.getElementById("boton")
laRespuesta.addEventListener("click", respuesta)

function respuestaId2() {
    resultado = document.getElementById("usuario").value
    document.getElementById("textHistorial").innerHTML= ""
   
}

    
function mostrar() {
    let mostrarUsuarios = document.getElementById("textHistorial")
    mostrarUsuarios.innerHTML = '';
    mostrarUsuarios.removeChild
    mostrarUsuarios.classList.add('block')
    mostrarUsuarios.classList.add('hidden')
    
    let laRespuesta2 = document.getElementById("boton")
    laRespuesta2.addEventListener("click", respuestaId2)

    userData.forEach((use) =>{
        let elHistorial = document.getElementById("textHistorial")
        let liHistorial = document.createElement("li")
            liHistorial.append(`${use.username}`)
            let response = ""
            let resposne2 = ""
            if(use.stage=="finish"){
                response= "obtuvo"
            }else{
                response= "lleva"
                resposne2= `, va por la pregunta: ${use.questionActual}`
            }
            liHistorial.append(` ${response} ${use.points} de 5 preguntas${resposne2}`)
        
        if (use.points !== undefined) {
            elHistorial.append(liHistorial)
        }
    })
    
}
    let mostrarHistorial = document.getElementById("buttonHistorial")
    mostrarHistorial.addEventListener("click", mostrar)


function reset() {
    let formulario = document.getElementById("contenedor")
    formulario.classList.add('block')

    
    let elTextHistorial = document.getElementById("textHistorial")
    elTextHistorial.classList.remove('hidden')

    let elWelcomeScr = document.getElementById("welcomescreen")
    elWelcomeScr.classList.remove('hidden')
    elWelcomeScr.classList.add('block')

    elScreenResult.style.display = "none";

    let quizz = document.getElementById('quiz')
    quizz.classList.remove('block')
    quizz.classList.add('none')
}

let reset1 = document.getElementById("regresar")
reset1.addEventListener("click", reset)



function resetSesionStorage(){
    sessionStorage.setItem('userCurrentIndex',0)
    sessionStorage.setItem('userPoints',0)
    sessionStorage.setItem('userStage',"process")
    sessionStorage.setItem('userQuestionActual',1)
    sessionStorage.setItem('userActual',userName)
    
}

