
var dotenv = require('dotenv' );
const CRIPTO_KEY = process.env.CRIPTO_KEY;

// TODO: Definir a funcao validar e retirar ela nos modulos

// exports.validar = function (err){
//     if (err){
//         console.log(err);
//         return false;
//     }
//     return true;
// }

exports.Encripta = function (dados){
	var mensx="";
	var l;
	var i;
	var j=0;
	var ch;
	ch = CRIPTO_KEY;	
	for (i=0;i<dados.length; i++){
		j++;
		l=(Asc(dados.substr(i,1))+(Asc(ch.substr(j,1))));
		if (j==50){
			j=1;
		}
		if (l>255){
			l-=256;
		}
		mensx+=(Chr(l));
	}
	return mensx;
}

exports.Descripta = function (dados){
	var mensx="";
	var l;
	var i;
	var j=0;
	var ch;
	ch = CRIPTO_KEY;	
	for (i=0; i<dados.length;i++){
		j++;
		l=(Asc(dados.substr(i,1))-(Asc(ch.substr(j,1))));
		if (j==50){
			j=1;
		}
		if (l<0){
			l+=256;
		}
		mensx+=(Chr(l));
	}	
	return mensx;
}

function Asc(String){
	return String.charCodeAt(0);
}
 
function Chr(AsciiNum){
	return String.fromCharCode(AsciiNum)
}