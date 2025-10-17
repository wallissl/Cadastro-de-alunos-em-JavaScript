export function validar(nome, idade, alunos){
    
    console.log('entrei aqui');
    if (nome === "" || isNaN(idade) || idade <=0) {
        alert("Preencha corretamente os campos!");
        return false;
    };

    let alunoExiste = alunos.some(e => e.nome === nome); // método some(), verifica se algum item do array atende à condição

    if(alunoExiste){
         alert("Já existe um cadastro com esse nome!");
        return false;
    };

    return true;
}

export function somaEMedia(alunos, lista){
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
