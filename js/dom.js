import { somaEMedia } from "./utils.js";

export function renderAlunos(lista, alunos) {
    lista.innerHTML = ""; // limpa lista antes de recriar

    if(!alunos.length){
    let mensagemInicial = document.createElement("li");
        mensagemInicial.innerText = `Nenhum aluno cadastro`;
        mensagemInicial.id = "mensagem-vazia";
        lista.appendChild(mensagemInicial);
        return;
    };

    alunos.forEach((aluno) => adicionarAlunoNaLista(aluno, lista)); // Adicionar na lista e renderizar apenas o novo aluno cadastrado
    somaEMedia(alunos, lista);
};

export function adicionarAlunoNaLista(aluno, lista){

    const msg = document.getElementById("mensagem-vazia");
    if(msg) msg.remove();

    // criar lista de alunos
    let li = document.createElement("li");
    li.textContent = `${aluno.nome} - ${aluno.idade} anos`;
    li.style.marginTop = "8px";
    li.dataset.id = aluno.id; // Inserir o id do aluno no DOM
    lista.appendChild(li);

    // criar botão remover
    let removeLi = document.createElement("button");
    removeLi.innerHTML = "Remover";
    removeLi.style.marginLeft = "7px";
    li.appendChild(removeLi);

    // animação
    li.style.maxHeight = '0px'; // valor de inicialização da animação
    li.style.overflow = 'hidden';
    li.style.transition = 'max-height 0.7s ease';

    requestAnimationFrame(() => li.style.maxHeight = li.scrollHeight + 'px'
    ); // crescer até o tamanho real do elemento

    /* removerAluno(li, removeLi); */ // Acessar os métodos li e removeLi dentro da função removerAluno
};

export function removerAluno(li, removeLi){
    // remover aluno correspondente ao ID cadastrado
    removeLi.addEventListener("click", () => {
    li.style.maxHeight = li.scrollHeight + 'px';
    li.style.overflow = 'hidden';
    li.style.transition = 'max-height 0.7s ease';

    requestAnimationFrame(() => li.style.maxHeight = '0px' );

    // remover o item e renderizar só depois da animação
    li.addEventListener('transitionend', () => {
        const id = li.dataset.id;
        const idx = alunos.findIndex(e => e.id === id); // findIndex encontra o índice corresponde e retorna sua posição, caso não encontro retorna -1 por padrão
        if (idx !== -1){
        alunos.splice(idx, 1); // remove do array, splice(valor inicial, total de itens a remover, e terceiro argumento caso queira adicionar informações ao array, após o item removido.)
        localStorage.setItem("alunos", JSON.stringify(alunos)); // atualiza o localStorage
        }

        somaEMedia(alunos, lista);

        if(!alunos.length) renderAlunos(lista, alunos);

    }, { once:true });
    });
};
