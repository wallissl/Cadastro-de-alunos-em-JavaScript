import {validar, somaEMedia} from './utils.js';
import { renderAlunos, adicionarAlunoNaLista, removerTudo } from './dom.js';
import Aluno from './alunos.js'

// Variáveis
let alunos = JSON.parse(localStorage.getItem("alunos")) || []; // Retornar dados dentro do localStorage ou um array vazio.
let form = document.getElementById("formAluno");
let lista = document.getElementById("lista");
let deletarTudo = document.getElementById("deletarTudo");

renderAlunos(lista, alunos); // Chamar função de Render ao iniciar o código

form.addEventListener("submit", (e) => {
    e.preventDefault(); // Anula comportamento padrão do formulário
    let nome = document.getElementById("nome").value.trim(); // Trim, quebrar o texto para validar depois se não tem espaços vazios.
    let idade = parseInt(document.getElementById("idade").value);

    if(!validar(nome, idade, alunos)) return; // Se a validação passar segue o código normalmente

    // Criar objeto aluno (com Id único)
    let aluno = new Aluno(Date.now().toString(), nome, idade); // Criando usuário com ID único, para que ele não se perca na hora de apagar os itens no localStore. Instanciado a classe Aluno para criação do no aluno.
    alunos.push(aluno)
    localStorage.setItem("alunos", JSON.stringify(alunos));

    adicionarAlunoNaLista(aluno, lista, alunos); // Adiciona novo aluno na lista
    somaEMedia(alunos, lista); // Informações de soma e media no final da lista
    
    form.reset(); // Limpar formulário
});

removerTudo(deletarTudo, lista, alunos) // Zerar o array alunos
