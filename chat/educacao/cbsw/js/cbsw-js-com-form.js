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

    var url = "https://assistente.freire.com.br/sofia/respondemobileportal.rule?proj=e865764a-db3b-4d1f-b55e-4b9c624d2237&sys=SSA&pergunta=&latitude=&longitude=&id=undefined&ini=s&usu=APA91bEMuk931CWQUeu340pyKgQ83jR1lcZLMWlYZZNIgkQcI-n65Roxauy_ukoOJe4sNGm9C3HvtB6RWr-es6UZ0n0JnHf6Dr3FjHmqdOJQREzwJ_kYHt8&sessao="+sessao
    
    var data = new Date();
    
    if((data.getHours() > 0) && (data.getHours() < 13)){
    //BOM DIA
    document.getElementById('cbsw_dialogue').innerHTML = "<div class='cbsw_rr cbsw_return my-2'><span class='cbsw_bubble alert alert-info d-inline-block shadow'><strong class='d-block'>Sofia</strong>Bom dia, eu sou a Sofia! O que você deseja saber sobre o Maker?</span></div>";   
        }else if((data.getHours() > 13) && (data.getHours() < 18)){
    //BOA TARDE
    document.getElementById('cbsw_dialogue').innerHTML = "<div class='cbsw_rr cbsw_return my-2'><span class='cbsw_bubble alert alert-info d-inline-block shadow'><strong class='d-block'>Sofia</strong>Boa tarde, eu sou a Sofia! O que você deseja saber sobre o Maker?</span></div>";     
        }else{
    //BOA NOITE
    document.getElementById('cbsw_dialogue').innerHTML = "<div class='cbsw_rr cbsw_return my-2'><span class='cbsw_bubble alert alert-info d-inline-block shadow'><strong class='d-block'>Sofia</strong>Boa noite, eu sou a Sofia! O que você deseja saber sobre o Maker?</span></div>"; 
        }
    
    /* var retorno = $.get(encodeURI(url), function(data, status) {
           var indice = data.indexOf('||||');
           var res = data.substr(0,indice);
                
         //document.getElementById('cbsw_input').disabled  = false;
    })
    .done(function() {  
        //alert('done');
    })
    .fail(function() {
        // alert('fail');;
    }) */
  }
  
}

/********************************************************/
function mensage() {
      solicitacao(document.getElementById('cbsw_input').value);
      document.getElementById('cbsw_input').value='';
      document.getElementById('cbsw_input').placeholder='Posso te ajudar em algo mais?';
      maximizar();
      scroll();
      forminactive();
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
    forminactive();
}

/********************************************************/

function toggleform() {
    document.getElementById('cbsw_scroll').classList.toggle('cbsw_form-active');
    scroll();
}

/********************************************************/

function forminactive() {
    document.getElementById('cbsw_scroll').classList.remove('cbsw_form-active');
    scroll();
}


/********************************************************/

function solicitacao(texto) {    
    var historico = document.getElementById('cbsw_dialogue').innerHTML;
     
    if(texto==''){}
      else{    
        document.getElementById('cbsw_dialogue').innerHTML = historico +
        "<div class='cbsw_rr cbsw_request my-2'><span class='cbsw_bubble alert alert-warning d-inline-block'><strong class='d-block'>Você</strong>"+texto+"</span></div>";

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
    var url = "https://assistente.freire.com.br/sofia/respondemobileportal.rule?proj=e865764a-db3b-4d1f-b55e-4b9c624d2237&sys=SSA&pergunta="+URLEncode2(texto)+"&latitude=&longitude=&id=undefined&ini=n&usu=APA91bEMuk931CWQUeu340pyKgQ83jR1lcZLMWlYZZNIgkQcI-n65Roxauy_ukoOJe4sNGm9C3HvtB6RWr-es6UZ0n0JnHf6Dr3FjHmqdOJQREzwJ_kYHt8&sessao="+sessao
    //var url = "http://127.0.0.1:8039/webrun/respondemobileportal.rule?proj=e865764a-db3b-4d1f-b55e-4b9c624d2237&sys=SSA&pergunta="+texto+"&latitude=&longitude=&id=undefined&ini=n&usu=APA91bEMuk931CWQUeu340pyKgQ83jR1lcZLMWlYZZNIgkQcI-n65Roxauy_ukoOJe4sNGm9C3HvtB6RWr-es6UZ0n0JnHf6Dr3FjHmqdOJQREzwJ_kYHt8&sessao="+sessao

	var retorno = $.get(url, function(data, status) {  
    	var indice = data.indexOf('||||');
    	var res = data.substr(0,indice);
    	document.getElementById('cbsw_dialogue').innerHTML = historico + "<div class='cbsw_rr cbsw_return my-2'><span class='cbsw_bubble alert alert-info d-inline-block shadow'><strong class='d-block'>Sofia</strong>"+res+"</span></div>";
    })

    .done(function() {  
        document.getElementById(id).style.display="none";
        document.getElementById('cbsw_dialogue').scrollTop = 100000000;
    })

    .fail(function() {
        document.getElementById('cbsw_dialogue').innerHTML = historico + "<div class='cbsw_rr cbsw_return my-2'><span class='cbsw_bubble alert alert-info d-inline-block shadow'><strong class='d-block'>Sofia</strong>"+'Não foi possível enviar a sua dúvida para a Sofia. Aqui está uma lista de possíveis motivos: bloqueio de palavras em seu firewall ou proxy ou sem conexão entre você e o servidor.'+"</span></div>";
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

function Acessar(login,senha){
    var historico = document.getElementById('cbsw_dialogue').innerHTML;
	//var login = document.getElementById('ilogin').value;
    //var senha = document.getElementById('isenha').value;
    //document.getElementById('isenha').id = 'isenhaOld';
    
    var url = "https://assistente.freire.com.br/sofia/SofiaLogarFalaSSA.rule?sys=SSA&workspace=e865764a-db3b-4d1f-b55e-4b9c624d2237&login="+login+"&senha="+senha+"&sessao="+sessao
    //var url = "http://127.0.0.1:8039/webrun/SofiaLogarFalaSSA.rule?sys=SSA&workspace=e865764a-db3b-4d1f-b55e-4b9c624d2237&login="+login+"&senha="+senha+"&sessao="+sessao

    var retorno = $.get(encodeURI(url), function(data, status) {              
        document.getElementById('cbsw_dialogue').innerHTML = historico + "<div class='cbsw_rr cbsw_request my-2'><span class='cbsw_bubble alert alert-warning d-inline-block'><strong class='d-block'>Você</strong>"+data+"</span></div>";
    })

    .done(function() {    
        document.getElementById('cbsw_dialogue').scrollTop = 100000000;
    })

    .fail(function() {
        document.getElementById('cbsw_dialogue').innerHTML = historico + " <div class='cbsw_rr cbsw_request my-2'><span class='cbsw_bubble alert alert-warning d-inline-block'><strong class='d-block'>Você</strong>"+'Não foi possível enviar a sua dúvida para a Sofia. Aqui está uma lista de possíveis motivos: bloqueio de palavras em seu firewall ou proxy ou sem conexão entre você e o servidor.'+"</span></div>";     
        document.getElementById('cbsw_dialogue').scrollTop = 100000000;
    })
}