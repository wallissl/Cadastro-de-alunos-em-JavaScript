import { somaEMedia, validar } from "./utils.js";

export function renderAlunos(lista, alunos) {
    lista.innerHTML = ""; // Limpa lista antes de recriar

    if(!alunos.length){
    let mensagemInicial = document.createElement("li");
        mensagemInicial.innerText = `Nenhum aluno cadastro`;
        mensagemInicial.id = "mensagem-vazia";
        lista.appendChild(mensagemInicial);
        return;
    };

    alunos.forEach((aluno) => adicionarAlunoNaLista(aluno, lista, alunos)); // Adicionar na lista e renderizar apenas o novo aluno cadastrado
    somaEMedia(alunos, lista);
};

export function adicionarAlunoNaLista(aluno, lista, alunos){

    const msg = document.getElementById("mensagem-vazia");
    if(msg) msg.remove();

    // Criar lista de alunos
    let li = document.createElement("li");
    li.textContent = `${aluno.nome} - ${aluno.idade} anos`;
    li.style.marginTop = "8px";
    li.dataset.id = aluno.id; // Inserir o id do aluno no DOM
    lista.appendChild(li);

    // Criar botão de editar aluno
    let editLi = document.createElement("button");
    editLi.innerHTML = "Editar";
    editLi.style.marginLeft = "15px";
    li.appendChild(editLi);

    // Criar botão remover
    let removeLi = document.createElement("button");
    removeLi.innerHTML = "Remover";
    removeLi.style.marginLeft = "7px";
    li.appendChild(removeLi);

    // Animação de entrada
    li.style.maxHeight = '0px'; // valor de inicialização da animação
    li.style.overflow = 'hidden';
    li.style.transition = 'max-height 0.7s ease';

    requestAnimationFrame(() => li.style.maxHeight = li.scrollHeight + 'px'
    ); // Crescer até o tamanho real do elemento

    editarLi(li, editLi, alunos, lista);
    removerAluno(li, removeLi, alunos, lista); // Acessar os métodos li e removeLi dentro da função removerAluno
};

export function editarLi(li, editLi, alunos, lista){

    editLi.addEventListener("click", () => {
        const alunoId = li.dataset.id;
        const aluno = alunos.find(e => e.id == alunoId);

        const novoNome = prompt(`Digite o novo nome:`, aluno.nome);
        const novaIdade = parseInt(prompt(`Digite o novo nome:`, aluno.idade));
        
        /* if(!novoNome || !novaIdade){
            alert("Preencha os campos corretamente")
        }*/
       if(!validar(novoNome, novaIdade, alunos)) return
        aluno.nome = novoNome;
        aluno.idade = novaIdade;

        localStorage.setItem("alunos", JSON.stringify(alunos));

        somaEMedia(alunos, lista);
        renderAlunos(lista, alunos);
        alert("Informações atualizadas com sucesso")
    })

};

export function removerAluno(li, removeLi, alunos, lista){
    
    // Remover aluno correspondente ao ID cadastrado
    removeLi.addEventListener("click", () => {
    li.style.maxHeight = li.scrollHeight + 'px';
    li.style.overflow = 'hidden';
    li.style.transition = 'max-height 0.7s ease';

    requestAnimationFrame(() => li.style.maxHeight = '0px' ); // Animação de saída

    // Remover o item e renderizar só depois da animação
    li.addEventListener('transitionend', () => {
        const id = li.dataset.id;
        const idx = alunos.findIndex(e => e.id === id); // O findIndex encontra o índice corresponde e retorna sua posição, caso não encontro retorna -1 por padrão
        if (idx !== -1){
        alunos.splice(idx, 1); // Remove do array, splice(valor inicial, total de itens a remover, e terceiro argumento caso queira adicionar informações ao array, após o item removido
        localStorage.setItem("alunos", JSON.stringify(alunos)); // Atualiza o localStorage
        }

        somaEMedia(alunos, lista);

        if(!alunos.length) renderAlunos(lista, alunos);

    }, { once:true }); // Realizar animações do evento de escuta (transitionend) apenas uma vez, dependendo do número de animações o comando pode duplicar
    });
};

export function removerTudo(deletarTudo, lista, alunos){
    deletarTudo.addEventListener("click", () => {
    let confirmarDelete = confirm('Deseja apagar todos os dados?') // Criar um alert com OK ou CANCELAR que retorna true ou false
    if(confirmarDelete){
    alunos.length = 0; // Deletar todos os dados do array de objetos
    localStorage.setItem("alunos", JSON.stringify(alunos));
    renderAlunos(lista, alunos);
    }
});
}
