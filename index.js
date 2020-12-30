window.addEventListener('load', start);

//declarando variaveis globais
var globalNames = ["um", "dois", "tres", "quatro", "cinco"];
var nomes = document.querySelector('#nomes');
var ul = document.createElement('ul');
var input = document.getElementById('Input')
var form = document.getElementById('Formulario');
var isEditing = false;
var Posicao;

function start() {
  PrevenirComportamentoDefault(form);
  AplicarFoco(input);
  CapturarValorDigitado(input);
  ExibirVetor();
}

function PrevenirComportamentoDefault(Objeto) {
  Objeto.addEventListener('submit', function (event) {
    event.preventDefault();
  });
}

function AplicarFoco(Objeto) {
  Objeto.focus();
}

function CapturarValorDigitado(Objeto) {
  Objeto.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      var ValorDigitado = event.target.value //obtem conteudo digitado

      // se algum valor tiver sido digitado, entao posso editar ou inserir
      if (ValorDigitado) {
        if (isEditing) {
          // Editando valores
          globalNames.splice(Posicao, 1, ValorDigitado);
          isEditing = false; //desativando modo edição
        } else {
          //inserir valores
          globalNames.push(ValorDigitado); //insere o nome no array
        }
      }
      ExibirVetor();
    }
  });
}

function ExibirVetor() {
  //limpa conteudo da ul e input p receber novos valores
  ul.innerHTML = '';
  input.value = '';

  //para cada posição do vetor, executar a funçao PercorrerVetor
  globalNames.forEach(PercorrerVetor);
  nomes.appendChild(ul); //add ul na div nomes p ser exibida
}

function PercorrerVetor(item) {
  var li = document.createElement('li');

  li.appendChild(CriarBotao()); // cria e add o btn X na li
  li.appendChild(CriarSpan(item));
  ul.appendChild(li);
}

function CriarBotao() {
  var botao = document.createElement('button');

  // add class delete button
  botao.classList.add('DeleteButton');
  botao.textContent = 'x';

  return botao;
}

function CriarSpan(valor) {
  var span = document.createElement('span');
  span.textContent = valor;
  span.classList.add('clicavel');
  span.addEventListener('click', EditarItem);

  return span;
}

function EditarItem(event) {
// captura valor do elemento clicado
var valor = event.target.innerHTML;

var index = globalNames.indexOf(valor);
input.value = globalNames[index];
AplicarFoco(input);
isEditing = true;
Posicao = index;
}
//delete elements

ul.addEventListener('click', function (event) {

  //realizar evento so qnd usuario clicar no btn
  if (event.target.localName === 'button') {
    //captura valor do elemento clicaldo
    var valor = event.srcElement.nextElementSibling.innerHTML;

    //delete element from globalNames
    var index = globalNames.indexOf(valor); //identifica o index
    globalNames.splice(index, 1);

    var ancestral = event.target.parentElement;
    ancestral.remove();
    ExibirVetor();
  }
});



