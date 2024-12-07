document.getElementById('criarButton').addEventListener('click', () => {
    let nome = document.getElementById('nomeInput').value
    let valor = parseFloat(document.getElementById('valorInput').value)
    let data = document.getElementById('dataInput').value
    let categoria = document.getElementById('categoriaInput').value

    if (nome.length < 2) {
        alert('Nome invalido')
        return
    }

    if (isNaN(valor)) {
        alert('Valor invalido')
        return
    }

    if (data == '') {
        alert('Data invalido')
        return
    }

    if (categoria == '') {
        alert('Categoria invalido')
        return
    }

    let finanças = JSON.parse(localStorage.getItem('finanças') || '[]') || []

    finanças.push({
        nome: nome,
        valor: valor,
        data: data,
        categoria: categoria
    })
    localStorage.setItem('finanças', JSON.stringify(finanças))
    alert('Finança salva!')
    atualizar()
})

function atualizar() {
    document.getElementById('listagemFinanças').innerHTML = ''// reseta a pagina

    let finanças = JSON.parse(localStorage.getItem('finanças') || '[]') || []
    for (let i = 0; i < finanças.length; i++) {
        let f = finanças[i]
        let div = document.createElement('div')

        let nome = document.createElement('h2')
        nome.textContent = f.nome
        div.append(nome)

        let valor = document.createElement('p')
        valor.textContent = "Valor: " + f.valor
        div.append(valor)

        let data = document.createElement('p')
        data.textContent = "Data: " + f.data
        div.append(data)

        let categoria = document.createElement('p')
        categoria.textContent = "Categoria: " + f.categoria
        div.append(categoria)

        let editar = document.createElement('button')
        editar.textContent = 'Editar'
        editar.style.marginTop = '12px'
        editar.style.marginBottom = '10px'
        div.append(editar)

        let excluir = document.createElement('button')
        excluir.textContent = 'Excluir'
        div.append(excluir)


        excluir.addEventListener('click', function() {
            finanças.splice(i, 1)
            localStorage.setItem('finanças', JSON.stringify(finanças))
            alert('Finança excluida!')
            atualizar()
        })

        editar.addEventListener('click', function() {
            let novonome = prompt("Novo nome")
            let novadata = prompt("Nova data")
            let novovalor = prompt("Novo valor")

            if (novovalor) f.valor = parseFloat(novovalor)
            if (novonome) f.nome = novonome
            if (novadata) f.data = novadata

            alert("Salvo!")
            localStorage.setItem('finanças', JSON.stringify(finanças))
            atualizar()
        })

        
        div.className = 'finança'
        document.getElementById('listagemFinanças').append(div)
    }
}

window.addEventListener('load', function() {
    atualizar()
})