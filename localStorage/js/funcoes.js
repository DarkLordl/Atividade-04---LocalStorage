$(function(){
    var operacao = "A"; //"A"=Adição; "E"=Edição
    var indice_selecionado = -1; //Índice do item selecionado na lista
    var tbClientes = localStorage.getItem("tbClientes");// Recupera os dados armazenados
    tbClientes = JSON.parse(tbClientes); // Converte string para objeto
    if(tbClientes == null) // Caso não haja conteúdo, iniciamos um vetor vazio
    tbClientes = [];
});
 
function Adicionar(){
    var cliente = JSON.stringify({
        Nome: $("#NomeUsuario").val(),
        Email: $("#email").val(),
        Foto: $("#foto").val(),
        Repositorio: $("#repGit").val()
    });
    tbClientes.push(cliente);
    localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
    alert("Registro adicionado.");
    return true;
}
 

function Excluir(){
    tbClientes.splice(indice_selecionado, 1);
    localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
    alert("Registro excluído.");
}

function Editar(){
    tbClientes[indice_selecionado] = JSON.stringify({
        Nome: $("#NomeUsuario").val(),
        Email: $("#email").val(),
        Foto: $("#foto").val(),
        Repositorio: $("#repGit").val()
        });//Altera o item selecionado na tabela
    localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
    alert("Informações editadas.")
    operacao = "A"; //Volta ao padrão
    return true;
}
 
function Listar(){
    $("#tblListar").html("");
    $("#tblListar").html(
        "<thead>"+
        "   <tr>"+
        "   <th></th>"+
        "   <th>Nome</th>"+
        "   <th>Email</th>"+
        "   <th>Foto<th>"+
        "   <th>Repositorio</th>"+
        "   </tr>"+
        "</thead>"+
        "<tbody>"+
        "</tbody>"
        );
    for(var i in tbClientes){
        var cli = JSON.parse(tbClientes[i]);
        $("#tblListar tbody").append("<tr>");
        $("#tblListar tbody").append("<td><img src='edit.png' alt='"+i+"'class='btnEditar'/><img src='delete.png' alt='"+i+"' class='btnExcluir'/></td>");
        $("#tblListar tbody").append("<td>"+cli.Nome+"</td>");
        $("#tblListar tbody").append("<td>"+cli.Email+"</td>");
        $("#tblListar tbody").append("<td>"+cli.Foto+"</td>");
        $("#tblListar tbody").append("<td>"+cli.Repositorio+"</td>");
        $("#tblListar tbody").append("</tr>");
    }
}
 
$("#frmCadastro").on("submit",function(){
    if(operacao == "A")
        return Adicionar();
    else
        return Editar();       
});
 
 
$("#tblListar").on("click", ".btnEditar", function(){
    operacao = "E";
    indice_selecionado = parseInt($(this).attr("alt"));
    var cli = JSON.parse(tbClientes[indice_selecionado]);
    $("#NomeUsuario").val(cli.Nome);
    $("#email").val(cli.Email);
    $("#foto").val(cli.Foto);
    $("#repGit").val(cli.Repositorio);
$("#txtCodigo").attr("readonly","readonly");
    $("#txtNome").focus();
});
 
$("#tblListar").on("click", ".btnExcluir",function(){
    indice_selecionado = parseInt($(this).attr("alt"));
    Excluir();
    Listar();
});