/********************************************************/
var sessao = aleatorio();
var primeiroclique = '';
var aberto;

const input = document.getElementById('cbsw_input')
const mic = document.querySelector('.input-group-text')

input.addEventListener('focus',(event)=> {

    mic.style.borderColor = '#80BDFF'
})
input.addEventListener('blur',(event)=> {
    mic.style.borderColor = ''
})

document.addEventListener ('keydown', (event) => {
  if(event.ctrlKey && event.keyCode === 81) {

    PrimeiraResposta();
    maximizar();
    mensagemVoz()

  }

});
  
function criarDialogoBot(conteudo) {
  let dialogoDiv = document.createElement('div')
  let attrClass = document.createAttribute('class')
  dialogoDiv.setAttribute('class','cbsw_rr cbsw_return my-2')

  let dialogoSpan = document.createElement('span')
  dialogoSpan.setAttribute('class','cbsw_bubble alert alert-info d-inline-block')
  
  dialogoSpan.innerHTML = conteudo
  dialogoDiv.appendChild(dialogoSpan)

  return dialogoDiv

}

function criarDiologoUsuario(conteudo) {

    //criando elemento
    let divDialogUser = document.createElement('div')

    divDialogUser.setAttribute('class','cbsw_rr cbsw_request my-2' )

    let span = document.createElement('span')
    

    span.setAttribute('class', "cbsw_bubble alert alert-warning d-inline-block")
    span.setAttribute('style', 'word-break: break-word; color: black')

    let strong =  document.createElement('strong')
    strong.setAttribute('class', 'd-block')
    

    span.appendChild(strong)
    
 
    span.innerHTML =  span.innerHTML + conteudo
    divDialogUser.appendChild(span)



  return divDialogUser
}
  
function PrimeiraResposta() {
    if (aberto!= true){
        aberto=true;
        var historico = document.getElementById('cbsw_dialogue').innerHTML;  
    
        var url = "http://sofia.softwell.com.br/sofia/respondemobileportal.rule?proj=530cb58c-ed31-47bf-a8de-ed3b31a82484&sys=SSA&pergunta=&latitude=&longitude=&id=undefined&ini=s&usu=APA91bEMuk931CWQUeu340pyKgQ83jR1lcZLMWlYZZNIgkQcI-n65Roxauy_ukoOJe4sNGm9C3HvtB6RWr-es6UZ0n0JnHf6Dr3FjHmqdOJQREzwJ_kYHt8&sessao="+sessao
        
    
        var retorno = $.get(url, function(data, status) {  
            var indice = data.indexOf('||||');
            var res = data.substr(0,indice);
            document.getElementById('cbsw_dialogue').innerHTML = historico + "<div class='cbsw_rr cbsw_return my-2'><span class='cbsw_bubble alert alert-success d-inline-block shadow'>"+res+"</span></div>";
        })
        
    }
      
    }

/********************************************************/
function mensagemVoz() {
  
  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
  if ('SpeechRecognition' in window) {
    // speech recognition API supported
    console.log('speech recognition API supported')
  } else {
    // speech recognition API not supported
    console.log('speech recognition API not supported')
  }
  const recognition =  new SpeechRecognition()
  //{event listener que chama dictate}
  recognition.start()
  recognition.onresult = (event) => {

    const speechToText = event.results[0][0].transcript //texto capturado
    //fazer algo com speechToText
    document.getElementById('cbsw_input').value = speechToText;
    mensage(); //enviar mensagem
  }


}
function mensage() {
    let mensagem = document.getElementById('cbsw_input').value;

	if(mensagem.trim() == null || mensagem.trim() == ''){
		document.getElementById('cbsw_input').value='';
		document.getElementById('cbsw_input').placeholder='Como posso te ajudar?';
		maximizar();
		return;
	}else{
		solicitacao(mensagem.trim());
		document.getElementById('cbsw_input').value='';
		document.getElementById('cbsw_input').disabled = true;
		document.getElementById('cbsw_input').placeholder='Posso te ajudar em algo mais?';
		scroll();
	}
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
    }
	


function toggle() {
		document.getElementById('cbsw').classList.toggle('cbsw_collapsed');
		document.getElementById('cbsw_submit').classList.toggle('rounded-right');
		document.getElementById('background-chat').classList.toggle('background-chat-open');
		
		scroll();
}

/********************************************************/

function maximizar() {
		document.getElementById('cbsw').classList.remove('cbsw_collapsed');
		document.getElementById('cbsw_submit').classList.remove('rounded-right');
		document.getElementById('background-chat').classList.add('background-chat-open');
		scroll();
}

function minimizar() {
		document.getElementById('cbsw').classList.add('cbsw_collapsed');
		document.getElementById('cbsw_submit').classList.add('rounded-right');
		document.getElementById('background-chat').classList.remove('background-chat-open');
		scroll();
}


/********************************************************/

function solicitacao(texto) {
    var historico = document.getElementById('cbsw_dialogue').innerHTML;
    

    if(texto==''){}
      else{
        

        document.getElementById('cbsw_dialogue').appendChild(criarDiologoUsuario(texto))
        //document.getElementById('cbsw_dialogue').innerHTML = historico +
        //"<div class='cbsw_rr cbsw_request my-2'><span class='cbsw_bubble alert alert-warning d-inline-block' style='word-break: break-word;'><strong class='d-block'>Você</strong>"+texto+"</span></div>";

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
    var url = "http://sofia.softwell.com.br/sofia/respondemobileportal.rule?proj=530cb58c-ed31-47bf-a8de-ed3b31a82484&sys=SSA&pergunta="+ encodeURI(texto) +"&latitude=&longitude=&id=undefined&ini=n&usu=APA91bEMuk931CWQUeu340pyKgQ83jR1lcZLMWlYZZNIgkQcI-n65Roxauy_ukoOJe4sNGm9C3HvtB6RWr-es6UZ0n0JnHf6Dr3FjHmqdOJQREzwJ_kYHt8&sessao=" + sessao;

	var retorno = $.get(url, function(data, status) {
    var indice = data.indexOf('||||');
    var res = data.substr(0,indice);
    if(!res) res="Desculpe, não fui capaz de entender, tente reformular a frase." 
    document.getElementById('cbsw_dialogue').innerHTML = historico + "<div class='cbsw_rr cbsw_return my-2'><span class='cbsw_bubble alert alert-info d-inline-block'>"+res+"</span></div>";
    if(res.indexOf('<!') !== -1 && res.indexOf('!>') != -1) {
      var inicio = res.indexOf('<!') + 2
      var fim = res.indexOf('!>', inicio) -2
      const evalFinal = () => {
        let subs = res.substr(inicio, fim)

        return subs
      }
      const retorno = eval(evalFinal())
      if(retorno) {
        res = res.replace(/<!.*!>/, retorno)
      }
    }
    
    
    
  })
  .done(function() {
    document.getElementById('cbsw_input').disabled = false;
    let digitando = document.getElementById(id)
    //document.getElementById(id).style.display="none";
    digitando.parentNode.removeChild(digitando)
    document.getElementById('cbsw_scroll').scrollTop = 100000000;
		document.getElementById('cbsw_input').focus();
  })
  .fail(function() {
    console.log('Falha ao enviar pergunta: "' + texto + '"');
    console.log('Enviando novamente...')
    setTimeout(resposta(texto,id), 5000);
  }) 
}

/********************************************************/

function digitando(id) {
    //var historico = document.getElementById('cbsw_dialogue').innerHTML;
    let digitando =  document.createElement('div')
    digitando.setAttribute('id', id)
    digitando.setAttribute('class','digitando text-black-50')

    let i = document.createElement('i')
    i.innerHTML = "digitando"
    digitando.appendChild(i)
    document.getElementById('cbsw_dialogue').appendChild(digitando)
    // document.getElementById('cbsw_dialogue').innerHTML = historico +
    //  " <div id="+id+" class='digitando text-black-50'><i>digitando</i></div>";
}

/********************************************************/

function aleatorio() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

/**************************************** FUNCOES SAC ****************************************/

/*Envia unidade SAC*/

function sendPw(elemento){
	
	let texto = elemento.value;
	if(!texto){
		return;
	}else{
		
		document.getElementById('cbsw_input').value='';
		document.getElementById('cbsw_input').disabled = true;
		document.getElementById('cbsw_input').placeholder='Posso te ajudar em algo mais?';
		
		elemento.disabled = true;
		elemento.parentElement.children[1].disabled = true;
		let id = aleatorio();
		digitando(id);
		document.getElementById('cbsw_dialogue').scrollTop = 100000000;
		
		var historico = document.getElementById('cbsw_dialogue').innerHTML;
    var url = "http://sofia.softwell.com.br/sofia/respondemobileportal.rule?proj=7b345987-37cc-40ad-b676-41cea96a20ca&sys=SSA&pergunta="+encodeURI(texto)+"&latitude=&longitude=&id=undefined&ini=n&usu=APA91bEMuk931CWQUeu340pyKgQ83jR1lcZLMWlYZZNIgkQcI-n65Roxauy_ukoOJe4sNGm9C3HvtB6RWr-es6UZ0n0JnHf6Dr3FjHmqdOJQREzwJ_kYHt8&sessao=" + sessao;

	var retorno = $.get(url, function(data, status) {
    	var indice = data.indexOf('||||');
    	var res = data.substr(0,indice);
    	document.getElementById('cbsw_dialogue').innerHTML = historico + "<div class='cbsw_rr cbsw_return my-2'><span class='cbsw_bubble alert alert-info d-inline-block'>"+res+"</span></div>";
    })

    .done(function() {
		document.getElementById('cbsw_input').disabled = false;
        document.getElementById(id).style.display="none";
        document.getElementById('cbsw_scroll').scrollTop = 100000000;
		document.getElementById('cbsw_input').focus();
    })

    .fail(function() {
		console.log('Falha ao enviar senha');
		console.log('Enviando novamente...')
		setTimeout(sendPw(elemento), 1000);
    })
		
	}
}

function sendPwKeyPress(event,elemento) {
    var tecla = event.which || event.keyCode;
    if (tecla == 13) {
        sendPw(elemento);
	}
}

function OpenURLOnNewWindow(link, a, b) {
  window.open(link, "_blank")
}

/********************************************************/