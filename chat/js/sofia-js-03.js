/********************************************************/
var sessao = aleatorio(); 
var primeiroclique = '';
  var aberto;
//PrimeiraResposta();
//document.getElementById('textofaq').disabled  = true;
//document.getElementById("textofaq").addEventListener("focus", maximizar);

function PrimeiraResposta() {
  
  if(aberto != true){
    aberto = true;
    var id = aleatorio();
    digitando(id);

    var url = "http://sofia.softwell.com.br/sofia/respondemobileportal.rule?proj=e865764a-db3b-4d1f-b55e-4b9c624d2237&sys=SSA&pergunta=&latitude=&longitude=&id=undefined&ini=s&usu=APA91bEMuk931CWQUeu340pyKgQ83jR1lcZLMWlYZZNIgkQcI-n65Roxauy_ukoOJe4sNGm9C3HvtB6RWr-es6UZ0n0JnHf6Dr3FjHmqdOJQREzwJ_kYHt8&sessao=" + sessao;
    
    var data = new Date();
    
    if((data.getHours() > 0) && (data.getHours() < 13)){
    //BOM DIA
    document.getElementById('chat-sofia').innerHTML = "<div class='solicitacao'><span class='bubble'>Bom dia, eu sou a Sofia! O que você deseja saber sobre o Maker?</span></div>";   
        }else if((data.getHours() >= 13) && (data.getHours() < 18)){
          //BOA TARDE
    document.getElementById('chat-sofia').innerHTML = "<div class='solicitacao'><span class='bubble'>Boa tarde, eu sou a Sofia! O que você deseja saber sobre o Maker?</span></div>";     
        }else{
          //BOA NOITE
    document.getElementById('chat-sofia').innerHTML = "<div class='solicitacao'><span class='bubble'>Boa noite, eu sou a Sofia! O que você deseja saber sobre o Maker?</span></div>"; 
        }
  }
  
}

/********************************************************/

function TeclaPressionada(event) {
    var tecla = event.which || event.keyCode;
    if (tecla == 13) {
      maximizar();
      solicitacao(document.getElementById('textofaq').value);
      document.getElementById('textofaq').value='';
      document.getElementById('textofaq').placeholder='Posso te ajudar em algo mais?';
	}
}

/********************************************************/

function maximizar() {
    document.getElementById('div_mom').className = "div_mom_aberto";
    document.getElementById('div-invisivel').style.display = 'block';
}

/********************************************************/

function minimizar() {    
	document.getElementById('div_mom').className = "div_mom_fechado";
    document.getElementById('div-invisivel').style.display = 'none';
}

/********************************************************/

function solicitacao(texto) {    
    var historico = document.getElementById('chat-sofia').innerHTML;
     
    if(texto==''){}
      else{    
        document.getElementById('chat-sofia').innerHTML = historico +
        " <div class='retornoCss'><span class='bubble'>"+texto+"</span></div>";

        var id = aleatorio();
        digitando(id);
        document.getElementById('chat-sofia').scrollTop = 100000000;
        resposta(texto,id);
     }
}

/********************************************************/

function resposta(texto,id) {    
    var historico = document.getElementById('chat-sofia').innerHTML;    
    var url = "http://sofia.softwell.com.br/sofia/respondemobileportal.rule?proj=e865764a-db3b-4d1f-b55e-4b9c624d2237&sys=SSA&pergunta="+encodeURI(texto)+"&latitude=&longitude=&id=undefined&ini=n&usu=APA91bEMuk931CWQUeu340pyKgQ83jR1lcZLMWlYZZNIgkQcI-n65Roxauy_ukoOJe4sNGm9C3HvtB6RWr-es6UZ0n0JnHf6Dr3FjHmqdOJQREzwJ_kYHt8&sessao=" + sessao;

	var retorno = $.get(url, function(data, status) {  
    	var indice = data.indexOf('||||');
    	var res = data.substr(0,indice);
    	document.getElementById('chat-sofia').innerHTML = historico + " <div class='solicitacao'><span class='bubble'>"+res+"</span></div>";
    })

    .done(function() {  
        document.getElementById(id).style.display="none";
        document.getElementById('chat-sofia').scrollTop = 100000000;
    })

    .fail(function() {
		setTimeout(resposta(texto,id), 5000);
    })
}

/********************************************************/

function digitando(id) {
    var historico = document.getElementById('chat-sofia').innerHTML;    
     document.getElementById('chat-sofia').innerHTML = historico +
     " <div id="+id+" class='digitando'><i>digitando</i></div>";
}

/********************************************************/

function aleatorio(){
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1) + (((1+Math.random())*0x10000)|0).toString(16).substring(1) + (((1+Math.random())*0x10000)|0).toString(16).substring(1) + (((1+Math.random())*0x10000)|0).toString(16).substring(1) + (((1+Math.random())*0x10000)|0).toString(16).substring(1) + (((1+Math.random())*0x10000)|0).toString(16).substring(1) + (((1+Math.random())*0x10000)|0).toString(16).substring(1) + (((1+Math.random())*0x10000)|0).toString(16).substring(1) + (((1+Math.random())*0x10000)|0).toString(16).substring(1) + (((1+Math.random())*0x10000)|0).toString(16).substring(1) + (((1+Math.random())*0x10000)|0).toString(16).substring(1) + (((1+Math.random())*0x10000)|0).toString(16).substring(1) + (((1+Math.random())*0x10000)|0).toString(16).substring(1) + (((1+Math.random())*0x10000)|0).toString(16).substring(1) + (((1+Math.random())*0x10000)|0).toString(16).substring(1) + (((1+Math.random())*0x10000)|0).toString(16).substring(1) + (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}

/********************************************************/