let jogarNovamente = true;
let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let palavras = [];
let jogoAutomatico = true;

carregaListaAutomatica();

criarPalavraSecreta();
function criarPalavraSecreta(){
    const indexPalavra = parseInt(Math.random() * palavras.length)
    
    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;

    // console.log(palavraSecretaSorteada);
}

montarPalavraNaTela();
function montarPalavraNaTela(){
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = palavraSecretaCategoria;

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";
    
    for(i = 0; i < palavraSecretaSorteada.length; i++){  
        if(listaDinamica[i] == undefined){
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                listaDinamica[i] = "&nbsp;"
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }     
        }
        else{
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }    
        }
    }   
}

function verificaLetraEscolhida(letra){
    document.getElementById("tecla-" + letra).disabled = true;
    if(tentativas > 0)
    {
        mudarStyleLetra("tecla-" + letra, false);
        comparalistas(letra);
        montarPalavraNaTela();
    }    
}

function mudarStyleLetra(tecla, condicao){
    if(condicao == false)
    {
        document.getElementById(tecla).style.background = "#C71585";
        document.getElementById(tecla).style.color = "#ffffff";
    }
    else{
        document.getElementById(tecla).style.background = "#008000";
        document.getElementById(tecla).style.color = "#ffffff";
    }

    
}

function comparalistas(letra){
    const pos = palavraSecretaSorteada.indexOf(letra)
    if(pos < 0){
        tentativas--
        carregaImagemForca();

        if(tentativas == 0){
            abreModal("OPS!", "Não foi dessa vez ... A palavra secreta era <br>" + palavraSecretaSorteada);
            piscarBotaoJogarNovamente(true);
        }
    }
    else{
        mudarStyleLetra("tecla-" + letra, true);
        for(i = 0; i < palavraSecretaSorteada.length; i++){
            if(palavraSecretaSorteada[i] == letra){
                listaDinamica[i] = letra;
            }
        }
    }
    
    let vitoria = true;
    for(i = 0; i < palavraSecretaSorteada.length; i++){
        if(palavraSecretaSorteada[i] != listaDinamica[i]){
            vitoria = false;
        }
    }

    if(vitoria == true)
    {
        abreModal("PARABÉNS!", "Você venceu...");
        tentativas = 0;
        piscarBotaoJogarNovamente(true);
    }
}

// async function piscarBotaoJogarNovamente(){
//     while (jogarNovamente == true) {
//         document.getElementById("btnReiniciar").style.backgroundColor = 'red';
//         document.getElementById("btnReiniciar").style.scale = 1.3;
//         await atraso(500)
//         document.getElementById("btnReiniciar").style.backgroundColor = 'yellow';
//         document.getElementById("btnReiniciar").style.scale = 1;
//         await atraso(500)
//     }
// }

async function atraso(tempo){
    return new Promise(x => setTimeout(x, tempo))     
}

function carregaImagemForca(){
    switch(tentativas){
        case 5:
            document.getElementById("imagem").style.background  = "url('./img/forca01.png')";
            break;
        case 4:
            document.getElementById("imagem").style.background  = "url('./img/forca02.png')";
            break;
        case 3:
            document.getElementById("imagem").style.background  = "url('./img/forca03.png')";
            break;
        case 2:
            document.getElementById("imagem").style.background  = "url('./img/forca04.png')";
            break;
        case 1:
            document.getElementById("imagem").style.background  = "url('./img/forca05.png')";
            break;
        case 0:
            document.getElementById("imagem").style.background  = "url('./img/forca06.png')";
            break;
        default:
            document.getElementById("imagem").style.background  = "url('./img/forca.png')";
            break;
    }
}

function abreModal(titulo, mensagem){
    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;

    $("#myModal").modal({
        show: true
    });
}

let bntReiniciar = document.querySelector("#btnReiniciar")
bntReiniciar.addEventListener("click", function(){
    jogarNovamente = false;
    location.reload();
});

function listaAutomatica(){ // ativa o modo manual
    if (jogoAutomatico == true) {
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-play-circle'></i>"
        palavras = [];
        jogoAutomatico = false;

        document.getElementById("abreModalAddPalavra").style.display = "block";
        document.getElementById("status").innerHTML = "Modo Manual";
    }
    else if(jogoAutomatico == false){ // ativa o modo automático
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-pause-circle'></i>"
        jogoAutomatico = true;

        document.getElementById("abreModalAddPalavra").style.display = "none";
        document.getElementById("status").innerHTML = "Modo Automático";
        
    }
}

const modall = document.getElementById("modall-alerta");

const btnAbreModall = document.getElementById("abreModalAddPalavra");
btnAbreModal.onclick = function(){
    modal.style.display = "block";
}

const btnFechaModall = document.getElementById("fechaModal");
btnFechaModal.onclick = function(){ 
    modal.style.display = "none";
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = ""; 
}

window.onclick = function(){ 
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("addPalavra").value = "";
        document.getElementById("addCategoria").value = ""; 
    }  
}

function carregaListaAutomatica(){
    palavras = [
        palavra001 = { 
            nome: "BANCO DE DADOS",
            categoria: "ARMAZENAMENTO"
        },
        
        palavra002 = { 
            nome: "FLASK",
            categoria: "FRAMEWORK"
        },
        
        palavra003 = { 
            nome: "SERVIDORES",
            categoria: "INFRAESTRUTURA"
        },
        
        palavra004 = { 
            nome: "FRAMEWORKS",
            categoria: "DESENVOLVIMENTO"
        },
        
        palavra005 = { 
            nome: "PROTOCOLS",
            categoria: "COMUNICAÇÃO"
        },
        
        palavra006 = { 
            nome: "HTTP",
            categoria: "PROTOCOLO"
        },
        
        palavra007 = { 
            nome: "HTTPS",
            categoria: "SEGURANÇA"
        },
        
        palavra008 = { 
            nome: "PHP",
            categoria: "Linguagem"
        },
        
        palavra009 = { 
            nome: "LARAVEL",
            categoria: "FRAMEWORK"
        },
        
        palavra010 = { 
            nome: "JAVASCRIPT",
            categoria: "Linguagem"
        },
        
        palavra011 = { 
            nome: "MYSQL",
            categoria: "BANCO DE DADOS"
        },
        
        palavra012 = { 
            nome: "CRUD",
            categoria: "DESENVOLVIMENTO"
        },
        
        palavra013 = { 
            nome: "MONGODB",
            categoria: "BANCO DE DADOS"
        },
        
        palavra014 = { 
            nome: "FIREBASE",
            categoria: "BANCO DE DADOS"
        },
        
        palavra015 = { 
            nome: "JQUERY",
            categoria: "FERRAMENTA"
        },
        
        palavra016 = { 
            nome: "BOOTSTRAP",
            categoria: "FERRAMENTA"
        },
        
        palavra017 = { 
            nome: "CSS",
            categoria: "ESTILO"
        },
        
        palavra018 = { 
            nome: "HTML",
            categoria: "ESTRUTURA"
        },
        
        palavra019 = { 
            nome: "WIREFRAME",
            categoria: "DESIGN"
        },
        
        palavra020 = { 
            nome: "UX DESIGN",
            categoria: "DESIGN"
        },
        
        palavra021 = { 
            nome: "UI DESIGN",
            categoria: "DESIGN"
        },
        
        palavra022 = { 
            nome: "FLEXBOX",
            categoria: "DESIGN"
        },
        
        palavra023 = { 
            nome: "RESPONSIVO",
            categoria: "DESIGN"
        },
        
        palavra024 = { 
            nome: "DOMINIO",
            categoria: "INFRAESTRUTURA"
        },
        
        palavra025 = { 
            nome: "GITHUB",
            categoria: "REPOSITÓRIO"
        },
        
        palavra026 = { 
            nome: "ORACLE",
            categoria: "BANCO DE DADOS"
        },
        
        palavra027 = { 
            nome: "PYTHON",
            categoria: "LINGUAGEM"
        },
        
        palavra028 = { 
            nome: "HTML5",
            categoria: "LINGUAGEM"
        },
        
        palavra029 = { 
            nome: "FRONTEND",
            categoria: "DESENVOLVIMENTO"
        },
        
        palavra030 = { 
            nome: "BACKEND",
            categoria: "DESENVOLVIMENTO"
        },
        
        palavra031 = { 
            nome: "CLOUD",
            categoria: "INFRAESTRUTURA"
        },
        
        palavra032 = { 
            nome: "BANCO DE DADOS",
            categoria: "ARMAZENAMENTO"
        },
        
        palavra033 = { 
            nome: "DELIMITER",
            categoria: "MYSQL"
        },
        
        palavra034 = { 
            nome: "PROCEDURE",
            categoria: "MYSQL"
        },
        
        palavra035 = { 
            nome: "TRIGGER",
            categoria: "MYSQL"
        },
        
        palavra036 = { 
            nome: "GOOGLE CLOUD",
            categoria: "NUVEM"
        },
        
        palavra037 = { 
            nome: "INNER JOIN",
            categoria: "MYSQL"
        },
        
        palavra038 = { 
            nome: "LEFT JOIN",
            categoria: "MYSQL"
        },
        
        palavra039 = { 
            nome: "RIGHT JOIN",
            categoria: "MYSQL"
        },
        
        palavra040 = { 
            nome: "WEB DESIGN",
            categoria: "DESIGN"
        },
        
        palavra041 = { 
            nome: "RESPONSIVO",
            categoria: "DESIGN"
        },
        
        palavra042 = { 
            nome: "DIV",
            categoria: "HTML"
        },
        
        palavra043 = { 
            nome: "HEADER",
            categoria: "HTML"
        },
        
        palavra044 = { 
            nome: "FOOTER",
            categoria: "HTML"
        },
        
        palavra045 = { 
            nome: "ARTICLE",
            categoria: "HTML"
        },
        
        palavra046 = { 
            nome: "CLASS",
            categoria: "HTML"
        },
        
        palavra047 = { 
            nome: "TEXTAREA",
            categoria: "HTML"
        },
        
        palavra048 = { 
            nome: "BACKGROUND",
            categoria: "CSS"
        },
        
        palavra049 = { 
            nome: "FONT FAMILY",
            categoria: "CSS"
        },
        
        palavra050 = { 
            nome: "PADDING",
            categoria: "CSS"
        },
        
        palavra051 = { 
            nome: "FLOAT",
            categoria: "CSS"
        },
        
        palavra052 = { 
            nome: "TEXT ALIGN",
            categoria: "CSS"
        },
        
        palavra053 = { 
            nome: "THEMES",
            categoria: "WORDPRESS"
        },
        
        palavra054 = { 
            nome: "PLUGINS",
            categoria: "WORDPRESS"
        },
        
        palavra055 = { 
            nome: "WP ADMIN",
            categoria: "WORDPRESS"
        },
        
        palavra056 = { 
            nome: "SESSION",
            categoria: "CONCEITO PHP"
        },
        
        palavra057 = { 
            nome: "FORM",
            categoria: "CONCEITO PHP"
        },
        
        palavra058 = { 
            nome: "EXCEPTIONS",
            categoria: "CONCEITO PYTHON"
        },
        
        palavra059 = { 
            nome: "WIREFRAME",
            categoria: "UI"
        },
        
        palavra060 = { 
            nome: "PROTOTYPE",
            categoria: "UX"
        }
        
        
    ];
}

function adicionarPalavra(){
    let addPalavra = document.getElementById("addPalavra").value.toUpperCase();
    let addCategoria = document.getElementById("addCategoria").value.toUpperCase();

    if (isNullOrWhiteSpace(addPalavra) || isNullOrWhiteSpace(addCategoria) || addPalavra.length < 3 || addCategoria.length < 3) {
        abreModal("ATENÇÃO"," Palavra e/ou Categoria inválidos");
        return;
    }

    let palavra = {
        nome: addPalavra,
        categoria: addCategoria
    }

    palavras.push(palavra);  
    sortear();
    
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = "";
}

function isNullOrWhiteSpace(input){
    return !input || !input.trim();
}

function sortear(){
    if(jogoAutomatico == true){
        location.reload();  
    }
    else{
        if(palavras.length > 0){
            listaDinamica=[];
            criarPalavraSecreta();
            montarPalavraNaTela();
            resetaTeclas();
            tentativas = 6;
            piscarBotaoJogarNovamente(false);
        }
    }
}

function resetaTeclas(){
    let teclas = document.querySelectorAll(".teclas > button")
    teclas.forEach((x) =>{
        x.style.background = "#FFFFFF";
        x.style.color = "#8B008B";
        x.disabled = false;
    });
}


async function piscarBotaoJogarNovamente(querJogar){
    if(querJogar){
        document.getElementById("jogarNovamente").style.display = "block";
    }
    else{
        document.getElementById("jogarNovamente").style.display = "none";
    }
}


