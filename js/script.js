// Variáveis
let alunos = JSON.parse(localStorage.getItem("alunos")) || [];
let form = document.getElementById("formAluno");
let lista = document.getElementById("lista");
let deletarTudo = document.getElementById("deletarTudo");

renderAlunos(); // chamar função de Render ao iniciar o código

form.addEventListener("submit", (e) => {
    e.preventDefault(); // anula comportamento padrão do formulário

    let nome = document.getElementById("nome").value.trim();
    let idade = parseInt(document.getElementById("idade").value);

    // validação
    if (nome === "" || isNaN(idade) || idade <=0) {
        alert("Preencha corretamente os campos!");
        return;
    }

    let alunoExiste = alunos.some(e => e.nome === nome); // método some(), verifica se algum item do array atende à condição

    if(alunoExiste){
        return alert("Já existe um cadastro com esse nome!");
    }

    // criar objeto aluno (com Id único)
    let aluno = { id: Date.now().toString(), nome, idade }; // Criando usuário com ID único, para que ele não se perca na hora de apagar os itens no localStore.
    alunos.push(aluno);
    localStorage.setItem("alunos", JSON.stringify(alunos));

    adicionarAlunoNaLista(aluno); // adiciona novo aluno na lista
    somaEMedia(); // informações de soma e media no final da lista
    form.reset(); // limpar formulário
});

function renderAlunos() {
    lista.innerHTML = ""; // limpa lista antes de recriar

    if(!alunos.length){
    let mensagemInicial = document.createElement("li");
        mensagemInicial.innerText = `Nenhum aluno cadastro`;
        mensagemInicial.id = "mensagem-vazia";
        lista.appendChild(mensagemInicial);
        return;
    }

    alunos.forEach((aluno, index) => adicionarAlunoNaLista(aluno, index)); // Adicionar na lista e renderizar apenas o novo aluno cadastrado
    somaEMedia();
};

function adicionarAlunoNaLista(aluno){

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

    removerAluno(li, removeLi); // Acessar os métodos li e removeLi dentro da função removerAluno
};

function removerAluno(li, removeLi){
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

        somaEMedia();

        if(!alunos.length) renderAlunos();

    }, { once:true });
    });
};

function somaEMedia(){
    // Remover lista antiga
    const antigo = lista.querySelectorAll(".info-extra");
    antigo.forEach(e => e.remove());

    if(!alunos.length) return;
    
    // soma das idades para tirar média
    let soma = alunos.reduce((acc, aluno) => acc + aluno.idade, 0);
    let media = soma / alunos.length;
    let mediaDeIdades = document.createElement("div");
    mediaDeIdades.classList.add("info-extra");
    mediaDeIdades.textContent = `Media de idades: ${media}`;

    // contagem de itens na lista
    let contadorDeItens = document.createElement("div");
    contadorDeItens.classList.add("info-extra");
    contadorDeItens.style.marginTop = "15px";
    contadorDeItens.textContent = `Total de alunos: ${alunos.length}`;

    // exibir na lista se o array não estiver vazio
    if(alunos.length){
    lista.appendChild(contadorDeItens); 
    lista.appendChild(mediaDeIdades);
    };
};

deletarTudo.addEventListener("click", () => {
    alunos.length = 0; // deletar todos os dados do array de objetos
    localStorage.setItem("alunos", JSON.stringify(alunos));
    renderAlunos();
});
