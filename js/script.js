import {validar, somaEMedia} from './utils.js';
import { renderAlunos, adicionarAlunoNaLista } from './dom.js';
// Variáveis
let alunos = JSON.parse(localStorage.getItem("alunos")) || [];
let form = document.getElementById("formAluno");
let lista = document.getElementById("lista");
let deletarTudo = document.getElementById("deletarTudo");

renderAlunos(lista, alunos); // chamar função de Render ao iniciar o código

form.addEventListener("submit", (e) => {
    e.preventDefault(); // anula comportamento padrão do formulário
    let nome = document.getElementById("nome").value.trim();
    let idade = parseInt(document.getElementById("idade").value);

    if(!validar(nome, idade, alunos)) return; // Se a validação passar segue o código normalmente;
    //parte da validação

    // criar objeto aluno (com Id único)
    let aluno = { id: Date.now().toString(), nome, idade }; // Criando usuário com ID único, para que ele não se perca na hora de apagar os itens no localStore.
    alunos.push(aluno);
    localStorage.setItem("alunos", JSON.stringify(alunos));

    adicionarAlunoNaLista(aluno, lista, alunos); // adiciona novo aluno na lista
    somaEMedia(alunos, lista); // informações de soma e media no final da lista
    form.reset(); // limpar formulário
});




deletarTudo.addEventListener("click", () => {
    let confirmarDelete = confirm('Deseja apagar todos os dados?') // confirm, cria um alert com OK ou CANCELAR que retorna true ou false
    if(confirmarDelete){
    alunos.length = 0; // deletar todos os dados do array de objetos
    localStorage.setItem("alunos", JSON.stringify(alunos));
    renderAlunos(lista, alunos);
    }
});
