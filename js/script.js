import {validar, somaEMedia} from './utils.js';
import { renderAlunos, adicionarAlunoNaLista, removerTudo } from './dom.js';
// Variáveis
let alunos = JSON.parse(localStorage.getItem("alunos")) || [];
let form = document.getElementById("formAluno");
let lista = document.getElementById("lista");
let deletarTudo = document.getElementById("deletarTudo");

renderAlunos(lista, alunos); // Chamar função de Render ao iniciar o código

form.addEventListener("submit", (e) => {
    e.preventDefault(); // Anula comportamento padrão do formulário
    let nome = document.getElementById("nome").value.trim();
    let idade = parseInt(document.getElementById("idade").value);

    if(!validar(nome, idade, alunos)) return; // Se a validação passar segue o código normalmente

    // Criar objeto aluno (com Id único)
    let aluno = { id: Date.now().toString(), nome, idade }; // Criando usuário com ID único, para que ele não se perca na hora de apagar os itens no localStore
    alunos.push(aluno);
    localStorage.setItem("alunos", JSON.stringify(alunos));

    adicionarAlunoNaLista(aluno, lista, alunos); // Adiciona novo aluno na lista
    somaEMedia(alunos, lista); // Informações de soma e media no final da lista
    
    form.reset(); // Limpar formulário
});

removerTudo(deletarTudo, lista, alunos) // Zerar o array alunos
