window.addEventListener('load', start);

//declarando variaveis globais
var globalNames = ["um", "dois", "tres", "quatro", "cinco"];
var nomes = document.querySelector('#nomes');
var ul = document.createElement('ul');
var input = document.getElementById('Input')
var form = document.getElementById('Formulario');
var isEditing = false;
var Posiçao;

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
