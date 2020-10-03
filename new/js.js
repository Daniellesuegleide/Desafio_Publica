class Tabela {
    constructor(ano, mes, dia, placar, min_temporada, max_temporada, record_min, record_max) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.placar = placar
        this.min_temporada = min_temporada
        this.max_temporada = max_temporada
        this.record_min = record_min
        this.record_max = record_max
    }

    validarDados (){
        for(var i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}

class Bd {

    constructor() {
        var id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id', 0)
        }
    }
    getProximoId() {
        var proximoId = localStorage.getItem('id') 
        return parseInt(proximoId) + 1
    }
    gravar(d) {
        var id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {

        //array de jogos
       var registros = Array()

       var id = localStorage.getItem('id')

       //recuperar todos os jogos cadastrados em localStorage
       for(var i = 1; i <= id; i++) {

        //recuperar jogos
        var registroJogos = JSON.parse(localStorage.getItem(i))
        
        //existe possibilidade de haver indices q foram pulados 
        if(registroJogos === null){
            continue

        }
        registroJogos.id = i
        registros.push(registroJogos)
       }
       
       return registros
    }

    pesquisar(tabela){

        var jogosFiltrados = Array()

        jogosFiltrados = this.recuperarTodosRegistros()

        console.log(tabela)

        console.log(jogosFiltrados)

        //ano
    if(tabela.ano != '') {
            console.log('filtro de ano')
            jogosFiltrados =jogosFiltrados.filter(d => d.ano == tabela.ano)
    }

        //mes
    if(tabela.mes != ''){
            console.log('filtro de mês')
            jogosFiltrados.filter(d => d.mes == tabela.mes)
    }

        //dia
    if(tabela.dia != ''){
        console.log('filtro de dia')
        jogosFiltrados.filter(d => d.dia == tabela.dia)
    }

        //placar
    if(tabela.placar != ''){
        console.log('filtro de placar')
        jogosFiltrados.filter(d => d.placar == tabela.placar)
    }

        //min_temporada
    if(tabela.min_temporada != ''){
        console.log('filtro de mínimo de temporada')
        jogosFiltrados.filter(d => d.min_temporada == tabela.min_temporada)
    }

        //max_temporada
    if(tabela.max_temporada != ''){
        console.log('filtro de máximo de temporada')
        jogosFiltrados.filter(d => d.max_temporada == tabela.max_temporada)
    }

        //record_min
    if(tabela.record_min != ''){
        console.log('filtro de recorde mínimo de temporada')
        jogosFiltrados.filter(d => d.record_min == tabela.record_min)
    }

        //record_max
    if(tabela.record_max != ''){
        console.log('filtro de recorde máximo de temporada')
        jogosFiltrados.filter(d => d.record_max == tabela.record_max)
    }

        return jogosFiltrados

    }

    remover(id) {
        localStorage.removeItem(id)
    }
}

var bd = new Bd()

function cadastrarJogos() {
      
    var ano = document.getElementById('ano')
    var mes = document.getElementById('mes')
    var dia = document.getElementById('dia')
    var placar = document.getElementById('placar')
    var min_temporada = document.getElementById('min_temporada')
    var max_temporada = document.getElementById('max_temporada')
    var record_min = document.getElementById('record_min')
    var record_max = document.getElementById('record_max')

    console.log(ano.value, mes.value, dia.value, placar.value, min_temporada.value, max_temporada.value, record_min.value, record_max.value) 
    
    var tabela = new Tabela(
        ano.value, 
        mes.value, 
        dia.value, 
        placar.value, 
        min_temporada.value, 
        max_temporada.value, 
        record_min.value, 
        record_max.value,
    )

    if (tabela.validarDados()){
        bd.gravar(tabela)

        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-sucess'
        //dialog de sucesso
        $('#registraTabela').modal('show')

        ano.value = ''
        mes.value = ''
        dia.value = ''
        placar.value = ''
        min_temporada.value = ''
        max_temporada.value = ''
        record_min.value = ''
        record_max.value = ''
    } else {
        
        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal_btn').className = 'btn btn-danger'
        //dialog error
        $('#registraTabela').modal('show')
    }

    
    }


function listaJogos(registros = Array(), filtro = false) {
    
    if(registros.length == 0 && filtro == false) {
        registros = bd.recuperarTodosRegistros()
}
    //selecinonando o elemento tbody da tabela    
    var tabelaJogos = document.getElementById('tabelaJogos')
    tabelaJogos.innerHTML = ''

    //percorrer o array registros, listando cada registro de forma dinâmica

    registros.forEach(function(d){
        //console.log(d)

        //criando a linha (tr)
        var linha = tabelaJogos.insertRow()

        //colunas(td)
        linha.insertCell(0).innerHTML = d.dia + '/' + d.mes +'/' + d.ano
        linha.insertCell(1).innerHTML = d.placar
        linha.insertCell(2).innerHTML = d.min_temporada
        linha.insertCell(3).innerHTML = d.max_temporada
        linha.insertCell(4).innerHTML = d.record_min
        linha.insertCell(5).innerHTML = d.record_max

        //criar botão de excluir
        var btn = document.createElement("button")
        btn.className =  'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = 'id_registroJogos' + d.id
        btn.onclick = function() {

            //remover os registros
            var id = this.id.replace('id_registroJogos', '')

            //alert(id)

            bd.remover(id)

            window.location.reload()
        }
        linha.insertCell(6).append(btn)
        
        console.log(d)
        
       
    })

}

function pesquisarJogos(){
    var ano = document.getElementById('ano').value
    var mes = document.getElementById('mes').value
    var dia = document.getElementById('dia').value
    /*var placar = document.getElementById('placar').value
    var min_temporada = document.getElementById('min_temporada').value
    var max_temporada = document.getElementById('max_temporada').value
    var record_min = document.getElementById('record_min').value
    var record_max = document.getElementById('record_max').value*/

    var tabela = new Tabela(ano, mes, dia/*, placar, min_temporada, max_temporada, record_min, record_max*/)

    var registros = bd.pesquisar(tabela)

    this.listaJogos(registros, true)

}

