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
            question: "Como privacidade e segurança digital se distinguem em suas funções no ambiente online?",
            answers: { 
                    a: "Privacidade trata do controle de dados pessoais, enquanto segurança foca na proteção contra ameaças externas.",
                    b: "Privacidade é irrelevante no cenário atual, sendo a segurança essencial para evitar vazamentos.",
                    c: "Privacidade restringe-se a credenciais, enquanto segurança aborda ferramentas técnicas.", 
                    d: "Não há diferença prática, ambas visam proteger dados pessoais de forma integrada." },
            correct: "a",
            answered: 0
        },
      
        {
            question: "Quais os efeitos predominantes do uso excessivo de redes sociais sobre a saúde mental e o bem-estar social?",
            answers: { 
                    a: "O uso intensivo das redes sociais fomenta a saúde mental ao fortalecer vínculos e mitigar o isolamento social.",
                    b: "O uso excessivo contribui para o aumento da ansiedade, depressão e alienação social, sobretudo em contextos de constante comparação.",
                    c: "O impacto das redes sociais na saúde mental é irrelevante e de curta duração.", 
                    d: "O uso moderado das redes sociais promove equilíbrio emocional e bem-estar psicológico." },
            correct: "b",
            answered: 0
        },
        {
            question: "Quando o compartilhamento de dados pessoais online é eticamente inaceitável?",
            answers: { 
                    a: "Divulgar informações verificadas para informar o público.",
                    b: "Participar de discussões públicas online de forma construtiva.",
                    c: "Publicar conteúdo educativo para promover o debate social.", 
                    d: "Expor dados pessoais sem consentimento, infringindo a privacidade e potencialmente causando danos." },
            correct: "d",
            answered: 0
        },
        {
            question: "Qual a relevância da ética na implementação de inteligência artificial nas redes sociais, sobretudo no que tange aos direitos dos usuários?",
            answers: { 
                    a: "A ética na IA não impacta a funcionalidade das redes sociais, já que os algoritmos operam sem considerar aspectos éticos.",
                    b: "A ética na IA é uma responsabilidade exclusiva dos desenvolvedores, sem efeitos diretos sobre a experiência do usuário.",
                    c: "A ética na IA é essencial para garantir decisões justas, prevenindo discriminação e protegendo os direitos fundamentais dos usuários.", 
                    d: "A ética na IA não influencia as interações dos usuários nas plataformas sociais." },
            correct: "c",
            answered: 0
        },
        {
            question: "Como a cultura do cancelamento afeta a liberdade de expressão e a diversidade de opiniões nas redes sociais?",
            answers: { 
                    a: "A cultura do cancelamento silencia vozes dissidentes, promove autocensura e limita a liberdade de expressão.",
                    b: "A cultura do cancelamento não impacta significativamente a expressão pública.",
                    c: " A cultura do cancelamento promove a inclusão e a diversidade de opiniões nas redes sociais.", 
                    d: "A cultura do cancelamento fortalece o debate público ao eliminar discursos prejudiciais." },
            correct: "a",
            answered: 0
        },
        {
            question: "Qual deve ser o papel das plataformas digitais na mitigação do cyberbullying e na salvaguarda do bem-estar dos usuários?",
            answers: { 
                    a: "As plataformas não possuem obrigação legal ou moral de intervir no comportamento dos usuários ou no conteúdo gerado por eles.",
                    b: "A responsabilidade sobre os atos dos usuários deve ser exclusivamente atribuída aos próprios indivíduos, sem qualquer intervenção ou regulamentação por parte das plataformas.",
                    c: "As plataformas têm o dever de adotar políticas proativas e transparentes no enfrentamento do cyberbullying, incluindo a implementação de sistemas robustos de denúncia, monitoramento e penalização de condutas abusivas.", 
                    d: "As plataformas devem garantir liberdade absoluta de expressão, sem restrições a conteúdos, independentemente de seu potencial danoso ou abusivo." },
            correct: "c",
            answered: 0
        },
        {
            question: "Como a ética digital influencia a construção e a preservação da reputação profissional de indivíduos em ambientes virtuais?",
            answers: { 
                    a: "Comportamentos éticos digitais têm impacto marginal na reputação profissional, sendo irrelevantes no contexto das interações virtuais.",
                    b: "A adesão a princípios éticos digitais reforça a reputação profissional, cultivando confiança e ampliando oportunidades, especialmente em redes digitais interconectadas.",
                    c: "A ética digital pode comprometer a reputação profissional ao restringir excessivamente a liberdade de expressão no contexto online, limitando o debate.", 
                    d: "A reputação profissional é indissociável do desempenho no ambiente corporativo, não sendo afetada pela conduta ou imagem digital de um indivíduo." },
            correct: "b",
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
        
        if (
            (questions[currentQuestion - 1] && questions[currentQuestion - 1].answered === 1) || 
            answeredQuestions !== questions.length - 1
        ) {
            nextQuestion();
        }
        
    })
    arrowBack.addEventListener("click", () => {
        lastQuestion();
        final.classList.remove("show")
    })

    function checkAnswer() {   

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
        
    
        // Atualiza o progresso na barra de progresso
        updateProgress();
    
        // Atualiza os textos da pergunta e das respostas
        updateTexts();
    
        // Checa se a pergunta atual já foi respondida e ajusta as bordas dos botões
        checkIfAnswered();
    
        var congratsText = "";

        // Verifica se todas as perguntas foram respondidas para mostrar o resultado final
        if (answeredQuestions >= questions.length) {
            var score = (rightAnswers / questions.length) * 100;
            if(finalFirstInteraction === 0){
                    clearInterval(timerId);
                    
                timerInteractionCount = 1;
                seconds = seconds - (questions.length * 3); // Ajusta o tempo total, retirando o tempo de transição
        
                    
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

    
            // Calcula minutos e segundos restantes
            const minutes = Math.floor(seconds / 60);
            seconds = seconds % 60;
    
    
            // Mostra o resultado final
            if(finalFirstInteraction === 0){
                finalFirstInteraction = 1;
                final.classList.add("show");
            }else if((finalFirstInteraction === 1) && (currentQuestion === questions.length)){
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
                
                timeTxt.innerHTML = "Tempo Invalido"
            }else{
                timeTxt.innerHTML = minutes + " Min : " + seconds + " Seg"
            }
        }
        console.log(currentQuestion + "> CurrentQuestion");
    }

    function lastQuestion() {
        if(currentQuestion > 0){
            currentQuestion --;
        }
        updateTexts();
        checkIfAnswered();
        console.log(currentQuestion + "> CurrentQuestion");
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
        
        if(finalFirstInteraction === 0){
            timerId = setInterval(() => {
                seconds ++;
                
            }, 1000);
        }
    }

});


