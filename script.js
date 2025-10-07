// declaração de variáveis
let alunos = [];
let form = document.getElementById("formAluno");
let lista = document.getElementById("listaAlunos");
let deletarTudo = document.getElementById("deletarTudo");

renderAlunos(); // chamar função de Render ao iniciar o código

form.addEventListener("submit", (e) => {
    e.preventDefault(); // anula comportamento padrão do formulário

    let nome = document.getElementById("nome").value.trim();
    let idade = parseInt(document.getElementById("idade").value);
    
    // validação
    if (nome === "" | isNaN(idade) || idade <=0) {
        alert("Preencha corretamente os campos!");
        return;
    }

    let alunoExiste = alunos.some(aluno => aluno.nome === nome);

    if(alunoExiste){
        return alert("Já existe um cadastro com esse nome!");
    }

    // criar objeto aluno
    let aluno = { nome, idade };
    alunos.push(aluno);

    // atualizar lista no HTML
    renderAlunos();

    // limpar formulário
    form.reset();
});

function renderAlunos() {
    lista.innerHTML = ""; // limpa lista antes de recriar

    if(!alunos.length){
    let mensagemInicial = document.createElement("li");
        mensagemInicial.innerText = `Nenhum aluno cadastro`;
        lista.appendChild(mensagemInicial);       
    }

    alunos.forEach((aluno, index) => {

        // criar lista de alunos
        let li = document.createElement("li");
        li.textContent = `${aluno.nome} - ${aluno.idade} anos`;
        lista.appendChild(li);

        // criar botão remover
        let removeLi = document.createElement("button");
        removeLi.innerHTML = "Remover";
        li.appendChild(removeLi);

        // animação
        li.style.maxHeight = '0px'; // Valor inicial
        li.style.overflow = 'hidden';
        li.style.transition = 'max-height 1s ease';
        requestAnimationFrame(() => li.style.maxHeight = li.scrollHeight + 'px'); // Crescer até o tamanho real do elemento

        // remover aluno correspondente
        removeLi.addEventListener("click", () => {
        li.style.maxHeight = li.scrollHeight + 'px'; // Valor inicial
        li.style.overflow = 'hidden';
        li.style.transition = 'max-height 0.3s ease';

        requestAnimationFrame(() => li.style.maxHeight = '0px');

        // remover o item e renderizar só depois da animação
        li.addEventListener('transitionend', () => {
            alunos.splice(index,1); // remove do array
            renderAlunos(); // renderizar a lista novamente.
        }, { once:true})
        }); 
    })

    // soma das idades para tirar média
    let soma = alunos.reduce((acc, aluno) => acc + aluno.idade, 0);
    let media = soma / alunos.length
    let mediaDeIdades = document.createElement("div");
    mediaDeIdades.textContent = `Media de idades: ${media}`

    // contagem de itens na lista
    let contadorDeItens = document.createElement("div");
    contadorDeItens.textContent = `Total de alunos: ${alunos.length}`;

    // exibir na lista se o array não estiver vazio
    if(alunos.length){
    lista.appendChild(contadorDeItens); 
    lista.appendChild(mediaDeIdades)
    }
}

// deletar todos os dados do array de objetos
deletarTudo.addEventListener("click", () => {
    alunos.length = 0;
    renderAlunos();
})

