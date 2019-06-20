var imagenes = [];
imagenes["50"] = "billete50.png"
imagenes["20"] = "billete20.png"
imagenes["10"] = "billete10.png"

class Billete{
	constructor(valor,cantidad){
		this.imagen = new Image();
		this.valor = valor;
		this.cantidad = cantidad;

		this.imagen.src = imagenes[this.valor];
	}
}

var caja = [];
caja.push(new Billete(50,5));
caja.push(new Billete(20,7));
caja.push(new Billete(10,20));

var saldoRestante = 0;
for(var billetes of caja){
	saldoRestante += billetes.valor * billetes.cantidad;
}

var montoSolicitado;
var division;
var papeles;

var boton = document.getElementById("extraer");
boton.addEventListener("click", entregarDinero);

var resultado = document.getElementById("resultado");

function entregarDinero(){
	var billetesAEntregar = [];
	var cuadroDeTexto = document.getElementById("dinero");
	montoSolicitado = parseInt(cuadroDeTexto.value);
	
	for(var billete of caja){
		if(montoSolicitado > 0){
			division = Math.floor(montoSolicitado / billete.valor);
			
			if(division > billete.cantidad){
				papeles = billete.cantidad;
			}else{
				papeles = division;
			}

			billetesAEntregar.push(new Billete(billete.valor,papeles));
			montoSolicitado = montoSolicitado - (billete.valor * papeles);
		}
	}

	resultado.innerHTML += "<hr/>";
	if(montoSolicitado == 0){

		for(var pos in billetesAEntregar){
			caja[pos].cantidad -= billetesAEntregar[pos].cantidad;
			saldoRestante -= billetesAEntregar[pos].cantidad * billetesAEntregar[pos].valor;
		}

		resultado.innerHTML += "Aquí tiene el dinero solicitado: <br/>";
		for(var entregado of billetesAEntregar){	
			for(var i = 0 ; i < entregado.cantidad ; i++){
				resultado.innerHTML += "<img src=" + entregado.imagen.src + "/>";
			}
			if(entregado.cantidad != 0){
				resultado.innerHTML += "<br/>"
			}
		}
		resultado.innerHTML += "Tras la extracción dispone de un saldo de: $" + saldoRestante + "<br/>";
	}else{
		resultado.innerHTML += "Este cajero no dispone de los billetes para entregar la suma solicitada, prube con otro monto. <br/>";
	}
	resultado.innerHTML += "<hr/>";
}