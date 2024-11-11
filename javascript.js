document.addEventListener("DOMContentLoaded", () => {
    var timerInteractionCount = 0;
    
    setTimeout(() => {
        timer();
    }, 20700);

    const names = [
        "Pedro Henrique Fabiano de Almeida",
        "Sahmuel Hidalgo",
        "Pedro Henrique Oliveira Sena",
        "Vitor Rafael de Almeida",
        "Renan Augusto"
    ];
    let currentIndex = 0;

    function changeName() {
        currentIndex = (currentIndex + 1) % names.length;
        document.querySelector('footer h1').textContent = `Por: ${names[currentIndex]}`;
    }
    setInterval(changeName, 3000);

    var answeredQuestions = 0;
    var currentQuestion = 0;
    var answer = null;
    var rightAnswers = 0;
    var correctAnswer = null;
    const answerButtons = document.querySelectorAll(".retangulos");

    const questions = [
        {
            question: "Como interagir com outras pessoas nas redes sociais?",
            answers: { 
                    a: "Ridicularizar a aparência da pessoa",
                    b: "Interagir de forma positiva com os outros",
                    c: "Falar mentiras para deixar os outros mau", 
                    d: "Tentar ganhar uma discussão com xingamentos" },
            correct: "b",
            answered: 0
        },
        {
            question: "Qual a forma responsável de se usar a tecnologia?",
            answers: { 
                    a: "Ficar o dia todo no celular",
                    b: "Compartilhar dados de outras pessoas na rede",
                    c: "Ter consciência de quanto tempo deve ficar no aparelho eletrônico", 
                    d: "Espalhar noticias falsas" },
            correct: "c",
            answered: 0
        },
        {
            question: "Quais os direitos digitais?",
            answers: { 
                    a: "São as garantias legais que protegem as pessoas no ambiente online",
                    b: "Você pode fazer o que quiser online",
                    c: "Tudo o que você compartilha pode ser usado por empresas", 
                    d: "Os direitos digitais são irrelevantes" },
            correct: "a",
            answered: 0
        },
        {
            question: "Qual das alternativas que falam sobre sustentabilidade digital ",
            answers: { 
                    a: "Sustentabilidade digital não é importante, já que a tecnologia não tem impacto na vida",
                    b: "A sustentabilidade digital só se aplica a grandes empresas",
                    c: "A prioridade deve ser sempre a inovação tecnológica, não a sustentabilidade", 
                    d: "É o conceito de utilizar a tecnologia de maneira que minimize os impactos ambientais e sociais" },
            correct: "d",
            answered: 0
        },
        {
            question: "Selecione o que é inclusão nas redes",
            answers: { 
                    a: "Significa que só as pessoas de alto escalão podem postar coisas nas redes",
                    b: "Significa garantir que todas as pessoas, independente de suas condições, possam participar de maneira igualitária",
                    c: "A inclusão só é necessária para alguns grupos, nem todos devem participar", 
                    d: "Quem não consegue acompanhar o ritmo ou as tendências das redes sociais, não deve fazer parte delas" },
            correct: "b",
            answered: 0
        },
        {
            question: "Qual o modo mais responsável de postar um conteúdo na web",
            answers: { 
                    a: "Envolve verificar a veracidade das informações antes de publicá-las, respeitar os direitos autorais entre outras",
                    b: "Poste qualquer coisa que chame atenção, mesmo que você não tenha certeza se é verdadeira",
                    c: "Basta copiar e colar, ninguém vai se importar com os direitos autorais na internet", 
                    d: "O objetivo principal de postar na web é provocar reações fortes, então não importa se o conteúdo é ofensivo" },
            correct: "a",
            answered: 0
        },
        {
            question: "Até onde vai a liberdade de expressão na internet",
            answers: { 
                    a: "A liberdade de expressão na internet é ilimitada",
                    b: "A liberdade de expressão é um direito absoluto",
                    c: "Não inclui o direito de disseminar discurso de ódio, violência, desinformação ou calúnia", 
                    d: "Na internet, você tem o direito de ofender, humilhar ou ameaçar quem quiser" },
            correct: "c",
            answered: 0
        },
    ];

    function updateProgress() {
        const progress = document.querySelector("#progresso div")
        var progessQtty = ((answeredQuestions) / questions.length) * 100;
        while(progessQtty > 100){
            progessQtty / 10
        }
        progessQtty = Math.round(progessQtty)
        progress.style.width = progessQtty + "%";
        if(progessQtty === 100){
            progress.style.setProperty('--contentLeft', "39px");
        }
        if(progessQtty != 0){
            progress.style.setProperty('--afterContent', `"${progessQtty + "%"}"`);
        }
            
    }

    updateTexts();
    
    updateProgress();

    var answeredQuestions = null;

    answerButtons.forEach(function(answerButton, index) {
            answerButton.addEventListener("click", () => {
                answer = index;
                checkAnswer();
                setTimeout(() => {nextQuestion();}, 3000);
            })
    })

    const arrowBack = document.getElementById("voltar")
    const forwardArrow = document.getElementById("avancar")
    const final = document.getElementById("final");
    forwardArrow.addEventListener("click", () => {
        
        if((questions[(currentQuestion - 1)].answered === 1) || (answeredQuestions != questions.length - 1)){
            nextQuestion();
        }
        
    })
    arrowBack.addEventListener("click", () => {
        lastQuestion();
        final.classList.remove("show")
    })

    function checkAnswer() {

        console.log(currentQuestion + "> CurrentQuestion");
        

        if(questions[currentQuestion].answered === 0){
            answeredQuestions ++;
            
                    switch (questions[currentQuestion].correct){
                        case "a":
                            correctAnswer = 0
                            break;
                        case "b":
                            correctAnswer = 1
                            break;
                        case "c":
                            correctAnswer = 2
                            break;
                        case "d":
                            correctAnswer = 3
                            break;
                
                        default:
                            break;
                    }
            
                    if(answer === correctAnswer){
                        rightAnswers ++;
                    }
                    
                    answerButtons.forEach((retangle, index) => {
                        retangle.style.border = "solid 2px red";
                        if(index === correctAnswer){
                            retangle.style.border = "solid 2px green";
                        }
                        
                    });

            questions[currentQuestion].answered = 1;
        }


    }

    var finalFirstInteraction = 0;

    function nextQuestion() {
        // Verifica se estamos na última pergunta e retorna para a primeira se necessário
        if (currentQuestion >= questions.length) {
            currentQuestion = 0;
            while((questions[(currentQuestion)] != undefined) && (questions[(currentQuestion)].answered === 1) && (finalFirstInteraction === 0)){
                currentQuestion++
            }
        } else {
            currentQuestion++
            while((questions[(currentQuestion)] != undefined) && (questions[(currentQuestion)].answered === 1) && (finalFirstInteraction === 0)){
                currentQuestion++
            }
        }

        console.log("currentQuestion" + currentQuestion);
        
    
        // Atualiza o progresso na barra de progresso
        updateProgress();
    
        // Atualiza os textos da pergunta e das respostas
        updateTexts();
    
        // Checa se a pergunta atual já foi respondida e ajusta as bordas dos botões
        checkIfAnswered();
    
        console.log("Pergunta atual:", currentQuestion);
        var congratsText = "";

        // Verifica se todas as perguntas foram respondidas para mostrar o resultado final
        if (answeredQuestions >= questions.length) {
            var score = (rightAnswers / questions.length) * 100;
            console.log(seconds + " aqui3");
            if(finalFirstInteraction === 0){
                    clearInterval(timerId);
                    console.log("entrouScore");
                    
                timerInteractionCount = 1;
                seconds = seconds - (questions.length * 3); // Ajusta o tempo total, retirando o tempo de transição
        
                    console.log(seconds + " aqui1");
                    
                // Ajusta a pontuação de acordo com o tempo
                if (seconds <= (6 * questions.length)) {
                    score = "Invalido"; // Muito rápido, resultado inválido
                    congratsText = "Você fez muito rápido"
                } else if(seconds <= (11 * questions.length)){
                    //Score 100
                }else if (seconds <= ((20 * questions.length) - 10)) {

                    score -= questions.length * 1; // MB

                } else if (seconds <= (35 * questions.length)) {

                    score -= questions.length * 2; // B

                } else if (seconds <= (50 * questions.length)) {

                    score -= questions.length * 3; // R

                } else {

                    score -= questions.length * 5; // I

                }



                if(score >= ((questions.length / 4) * 3)){

                    congratsText = "Parabéns, você foi muito bom"

                }else if(score >= ((questions.length / 4) * 2)){

                    congratsText = "Parabéns, você foi bom"

                }else if(score >= ((questions.length / 4) * 1)){

                    congratsText = "Não fez mais do que a obrigação"

                }else if(score != "Invalido"){

                    congratsText = "Você não foi nada bem"
                    
                }
            }

            console.log(seconds + " aqui2");
    
            // Calcula minutos e segundos restantes
            const minutes = Math.floor(seconds / 60);
            seconds = seconds % 60;
    
            console.log(`Tempo final: ${minutes}:${seconds}`);
    
            // Mostra o resultado final
            if(finalFirstInteraction === 0){
                finalFirstInteraction = 1;
                final.classList.add("show");
                console.log(finalFirstInteraction + "FFI 1");
            }else if((finalFirstInteraction === 1) && (currentQuestion === questions.length)){
                console.log(finalFirstInteraction + "FFI 2");
                final.classList.add("show");
            }
            const rightAnswersText = document.getElementById("acertos")
            const scoreText = document.getElementById("pontuacao")

            rightAnswersText.innerHTML = rightAnswers + "/" + questions.length;
            if(typeof score === "string"){
                scoreText.innerHTML = score
            }else{
                scoreText.innerHTML = Math.floor(score)
            }
            const congratulations = document.getElementById("parabens")
            congratulations.innerHTML = congratsText
            const timeTxt = document.getElementById("tempo")
            if(seconds <= 6 * questions.length){
                console.log('minsec' + minutes + "oi" + seconds);
                
                timeTxt.innerHTML = "Tempo Invalido"
            }else{
                timeTxt.innerHTML = minutes + " Min : " + seconds + " Seg"
            }
        }
    }

    function lastQuestion() {
        if(currentQuestion > 0){
            currentQuestion --;
        }
        console.log(currentQuestion);
        updateTexts();
        checkIfAnswered();
    }

    function checkIfAnswered(){
        if(questions[currentQuestion] != undefined){
            if(questions[currentQuestion].answered === 1){
                answerButtons.forEach((retangle, index) => {
                    retangle.style.border = "solid 2px red";
                    if(index === correctAnswer){
                        retangle.style.border = "solid 2px green";
                    }
                    
                });
            }
        }
    }

    function updateTexts() {
        const questionHTML = document.getElementById("pergunta");
    
        if((questions[currentQuestion] != undefined) && (questions[currentQuestion].answered === 0)){
            answerButtons.forEach((retangle) => {
                retangle.style.border = "solid 1px rgb(107, 107, 107)";
            });
        }

        // Verifica se a pergunta atual existe no array de perguntas
        if (questions[currentQuestion] != undefined) {
            // Atualiza o texto da pergunta
            questionHTML.innerHTML = questions[currentQuestion].question;
    
            // Atualiza o texto das respostas
            answerButtons.forEach((retangle, index) => {
                retangle.innerHTML = Object.values(questions[currentQuestion].answers)[index];
            });
        }
    }
    
    var seconds = 0;
    var minutes = 0;

    let timerId

    function timer(){
        console.log("entrou");
        
        if(finalFirstInteraction === 0){
            console.log("entrou2");
            timerId = setInterval(() => {
                seconds ++;
                console.log("oi");
                
            }, 1000);
        }
    }

});


