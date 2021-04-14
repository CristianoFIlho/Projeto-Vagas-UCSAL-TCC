/********************************************************/
var sessao = aleatorio(); 
var primeiroclique = '';
var aberto;
//PrimeiraResposta();
//document.getElementById('cbsw_input').disabled  = true;
//document.getElementById("textofaq").addEventListener("focus", maximizar);

function PrimeiraResposta() {
  
  if(aberto != true){
    aberto = true;
    var id = aleatorio();
    digitando(id);

    var url = "http://sofia.softwell.com.br:8039/assistente/respondemobileportal.rule?proj=970e5c92-674e-4e55-9d0d-6f8411fc8177&sys=SSA&pergunta=&latitude=&longitude=&id=undefined&ini=s&usu=APA91bEMuk931CWQUeu340pyKgQ83jR1lcZLMWlYZZNIgkQcI-n65Roxauy_ukoOJe4sNGm9C3HvtB6RWr-es6UZ0n0JnHf6Dr3FjHmqdOJQREzwJ_kYHt8&sessao="+sessao
    
    var data = new Date();
    
    if((data.getHours() > 0) && (data.getHours() < 13)){
    //BOM DIA
    document.getElementById('cbsw_dialogue').innerHTML = "<div class='cbsw_rr cbsw_return my-2'><span class='cbsw_bubble alert alert-info d-inline-block shadow'>Bom dia, eu sou o <b>Eduardo</b>! O que você deseja saber ?</span></div>";   
        }else if((data.getHours() > 13) && (data.getHours() < 18)){
    //BOA TARDE
    document.getElementById('cbsw_dialogue').innerHTML = "<div class='cbsw_rr cbsw_return my-2'><span class='cbsw_bubble alert alert-info d-inline-block shadow'>Boa tarde, eu sou o <b>Eduardo</b>!</span></div>";     
        }else{
    //BOA NOITE
    document.getElementById('cbsw_dialogue').innerHTML = "<div class='cbsw_rr cbsw_return my-2'><span class='cbsw_bubble alert alert-info d-inline-block shadow'>Boa noite, eu sou o <b>Eduardo</b>!</span></div>"; 
        }
    
  }
  
}

/********************************************************/
function mensage() {
      solicitacao(document.getElementById('cbsw_input').value);
      document.getElementById('cbsw_input').value='';
      document.getElementById('cbsw_input').placeholder='Posso te ajudar em algo mais?';
      maximizar();
      scroll();
}

function TeclaPressionada(event) {
    var tecla = event.which || event.keyCode;
    if (tecla == 13) {
        mensage();
	}
}

/********************************************************/
function scroll() {
       var objDiv = document.getElementById('cbsw_scroll');
       objDiv.scrollTop = objDiv.scrollHeight;
       console.log(objDiv.scrollTop);
    }

function toggle() {
    document.getElementById('cbsw').classList.toggle('cbsw_collapsed');
    document.getElementById('cbsw_submit').classList.toggle('rounded-right');
    PrimeiraResposta();
    scroll();
}

/********************************************************/

function maximizar() {    
    document.getElementById('cbsw').classList.remove('cbsw_collapsed');    
    document.getElementById('cbsw_submit').classList.remove('rounded-right');
    PrimeiraResposta();
    scroll();
}


/********************************************************/

function solicitacao(texto) {    
    var historico = document.getElementById('cbsw_dialogue').innerHTML;
     
    if(texto==''){}
      else{    
        document.getElementById('cbsw_dialogue').innerHTML = historico +
        "<div class='cbsw_rr cbsw_request my-2'><span class='cbsw_bubble alert alert-warning d-inline-block'>"+texto+"</span></div>";

        var id = aleatorio();
        digitando(id);
        document.getElementById('cbsw_dialogue').scrollTop = 100000000;
        resposta(texto,id);
     }
}

/********************************************************/

function URLEncode2(plaintext) {
    if (plaintext == null || typeof(plaintext) == 'undefined' || plaintext === '' || plaintext.toString() == 'NaN') {
        return "";
    }
    plaintext = plaintext.toString();
  
    // The Javascript escape and unescape functions do not correspond
    // with what browsers actually do...
    var SAFECHARS = "0123456789" +                  // Numeric
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +  // Alphabetic
                    "abcdefghijklmnopqrstuvwxyz" +
                    "-_.!~*'()?";                   // RFC2396 Mark characters
    var HEX = "0123456789ABCDEF";

    var encoded = "";
    for (var i = 0; i < plaintext.length; i++ ) {
        var ch = plaintext.charAt(i);
        if (ch == " ") {
            encoded += "+";                         // x-www-urlencoded, rather than %20
        } else if (SAFECHARS.indexOf(ch) != -1) {
            encoded += ch;
        } else {
            var charCode = ch.charCodeAt(0);
            if (charCode > 255) {
            encoded += "+";
            } else {
                encoded += "%";
                encoded += HEX.charAt((charCode >> 4) & 0xF);
                encoded += HEX.charAt(charCode & 0xF);
            }
        }
    }
    return encoded;
}

function resposta(texto,id) {    
    var historico = document.getElementById('cbsw_dialogue').innerHTML;    
    var url = "http://sofia.softwell.com.br:8039/assistente/respondemobileportal.rule?proj=970e5c92-674e-4e55-9d0d-6f8411fc8177&sys=SSA&pergunta="+URLEncode2(texto)+"&latitude=&longitude=&id=undefined&ini=n&usu=APA91bEMuk931CWQUeu340pyKgQ83jR1lcZLMWlYZZNIgkQcI-n65Roxauy_ukoOJe4sNGm9C3HvtB6RWr-es6UZ0n0JnHf6Dr3FjHmqdOJQREzwJ_kYHt8&sessao="+sessao
    //var url = "http://127.0.0.1:8039/webrun/respondemobileportal.rule?proj=e865764a-db3b-4d1f-b55e-4b9c624d2237&sys=SSA&pergunta="+texto+"&latitude=&longitude=&id=undefined&ini=n&usu=APA91bEMuk931CWQUeu340pyKgQ83jR1lcZLMWlYZZNIgkQcI-n65Roxauy_ukoOJe4sNGm9C3HvtB6RWr-es6UZ0n0JnHf6Dr3FjHmqdOJQREzwJ_kYHt8&sessao="+sessao

	var retorno = $.get(url, function(data, status) {  
    	var indice = data.indexOf('||||');
    	var res = data.substr(0,indice);
    	document.getElementById('cbsw_dialogue').innerHTML = historico + "<div class='cbsw_rr cbsw_return my-2'><span class='cbsw_bubble alert alert-info d-inline-block shadow'>"+res+"</span></div>";
    })

    .done(function() {  
        document.getElementById(id).style.display="none";
        document.getElementById('cbsw_dialogue').scrollTop = 100000000;
    })

    .fail(function() {
        document.getElementById('cbsw_dialogue').innerHTML = historico + "<div class='cbsw_rr cbsw_return my-2'><span class='cbsw_bubble alert alert-info d-inline-block shadow'>"+'Não foi possível enviar a sua dúvida para a Sara. Aqui está uma lista de possíveis motivos: bloqueio de palavras em seu firewall ou proxy ou sem conexão entre você e o servidor.'+"</span></div>";
        document.getElementById(id).style.display="none";
        document.getElementById('cbsw_dialogue').scrollTop = 100000000;
    })
}

/********************************************************/

function digitando(id) {
    var historico = document.getElementById('cbsw_dialogue').innerHTML;    
     document.getElementById('cbsw_dialogue').innerHTML = historico +
     " <div id="+id+" class='digitando text-black-50'><i>digitando</i></div>";
}

/********************************************************/

function aleatorio() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}

/********************************************************/