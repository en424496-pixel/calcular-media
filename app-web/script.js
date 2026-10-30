const formulario = document.getElementById("formulario");
const campoMissao = document.getElementById("campo-missao");
const lista = document.getElementById("lista"); 
const textoProgresso = document.getElementById("progresso"); 
const textovazio = document.getElementById("vazio"); 

// Os dados do app. Cada missão é um objeto com texto e feita (true/false). 

const missoes = [ 
{texto: "Capturar um Pikachu", feita: true },
{ texto: "Coletar 100 anéis", feita: false } 

]; 

// Desenha a lista inteira na tela a partir do array "missoes" 
function renderizar() { 
// 1. Limpa a lista antiga 
lista.innerHTML = "";
// 2. Cria um <li> para cada missão 
missoes.forEach(function (missao, indice) {
const item = document.createElement("li");
item.classList.add("item");
if (missao.feita) {
item.classList.add("feita");
}
 // Caixinha de marcar
const caixa = document.createElement("input");
 caixa.type = "checkbox";
caixa.checked = missao.feita;
caixa.addEventListener("change", function () {
missao.feita = caixa.checked; // muda o objeto
renderizar();
// redesenha
 });

// Texto da missão (textContent é seguro: mostra o texto como está)
const texto = document.createElement("span");
texto.textContent = missao.texto;
const botaoRemover = document.createElement("button");
botaoRemover.textContent = "X";
botaoRemover.classList.add("botao-remover");
botaoRemover.addEventListener("click", function () {
missoes.splice(indice, 1); // tira 1 item na posição "indice"
renderizar();
});

// Coloca as peças dentro do <li> e o <li> dentro da lista
item.appendChild(caixa);
 item.appendChild(texto);
item.appendChild(botaoRemover);
lista.appendChild(item);

});


 // 3. Atualiza o progresso
const concluidas = missoes.filter(function (missao) {
 return missao.feita;
 }).length;
 textoProgresso.textContent = `${concluidas} de ${missoes.length} missões concluídas`;

// 4. Mostra a mensagem de "vazio" só quando não há missões
if (missoes.length === 0) {
textovazio.style.display = "block";
 } else {
textovazio.style.display = "none";
}
}

 // Quando o formulário é enviado (botão ou Enter)
 formulario.addEventListener("submit", function (evento) {
evento.preventDefault(); // impede a página de recarregar
const texto = campoMissao.value.trim();
if (texto === "") {
 return;

 }



 missoes.push({ texto: texto, feita: false });
 campoMissao.value = "";
 campoMissao.focus();
 renderizar();
 });

 // Desenha a lista assim que a página abre
renderizar();