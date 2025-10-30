export function validar(nome, idade, alunos){
    
    if (nome === "" || isNaN(idade) || idade <=0) {
        alert("Preencha corretamente os campos!");
        return false;
    };

    let alunoExiste = alunos.some(e => e.nome === nome); // Método some(), verifica se algum item do array atende à condição

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
    
    // Soma das idades para tirar média
    let soma = alunos.reduce((acc, itemArray) => acc + itemArray.idade, 0);
    let media = soma / alunos.length;
    let mediaDeIdades = document.createElement("div");
    mediaDeIdades.classList.add("info-extra");
    mediaDeIdades.textContent = `Media de idades: ${media}`;

    // Contagem de itens na lista
    let contadorDeItens = document.createElement("div");
    contadorDeItens.classList.add("info-extra");
    contadorDeItens.style.marginTop = "15px";
    contadorDeItens.textContent = `Total de alunos: ${alunos.length}`;

    // Exibir na lista se o array não estiver vazio
    if(alunos.length){
    lista.appendChild(contadorDeItens);
    lista.appendChild(mediaDeIdades);
    };
};
