var canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext('2d');//incoca el objecto canvas para el dinujo
let canvas2 = document.getElementById('myCanvasGrafica'); //canvas para la grafica
let ctx2 = canvas2.getContext('2d');
limpiar();
function limpiar() //le da formato al canvas al iniciarlo
{
	ctx.strokeStyle = '#000000';
	ctx.lineWidth = 4;
	ctx2.strokeStyle = '#000000';
	ctx2.lineWidth = 4;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

	ctx.beginPath(); //liena paralela 1 
	ctx.moveTo(0,200); // xx yy
	ctx.lineTo(600,200);
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath(); // linea paralela 2
	ctx.moveTo(0,400);
	ctx.lineTo(600,400);
	ctx.stroke();
	ctx.closePath();

	ctx2.beginPath(); // linea paralela 2
	ctx2.moveTo(0,300);
	ctx2.lineTo(600,300);
	ctx2.stroke();
	ctx2.closePath();
}
function generaAgujas(argument)// al hacer click en el boton del menu ejecuta este codigo
{
	limpiar();
	let cont = 0;
	let input = document.getElementById('inputNum'); //obtiene el numero de agujas
	let total = document.getElementById('total'); // cuenta el total de agujas
	let contador = document.getElementById('contador'); // cuenta las agujas en las lienas
	let valorPi = document.getElementById('valorPi'); // muestra el valor PI
	let diferencia = document.getElementById('diferencia');
	dibujaAgujas(0,input.value,cont,contador,valorPi,total,diferencia); //dibuja las N agujas
}
function dibujaAgujas(num,inputN,cont,contador,valorPi,total,diferencia)
{
	if(num == inputN) return; // en caso de que num sea igual al numero introducio se detiene la funcion
	let num1 = (Math.random()*255);//color
	let num2 = (Math.random()*255);//color
	let num3 = (Math.random()*255);//color
	let num4 = (Math.random()*600);//posicion inicial
	let num5 = (Math.random()*600);//posicion inicial
	let num6 = (Math.random()*200);//genera un lado menor a la hipotenusa(200)
	ctx.lineWidth = 1.4;
	ctx.strokeStyle = 'rgba(' + num1+ ', ' + num2 + ', ' + num3+')';
	ctx.beginPath();
	ctx.moveTo(num4,num5);//punto inicial de la linea
	if(Math.floor(num6) % 2 ==0) num6*= -1; //varia el valor del numero generado
	let num7 = Math.sqrt(40000-Math.pow(num6,2)); //calcula el otro lado
	if(Math.floor(num7) % 2 != 0) num7*= -1; //varia el valor del numero generado
	ctx.lineTo(num6+num4,num7+num5); //punto final de la linea
	if( (num5 < 200 && num7+num5 > 200) || //valida si la aguja cruza alguna de las 2 lineas
		(num5 > 200 && num5 < 400 && num7+num5 > 400)|| 
		(num5 > 200 && num7+num5 < 200) || 
		(num5 > 200 && num5 > 400 && num7+num5 < 400))
	{
		ctx.lineWidth = 3;
		cont++;
	}
	total.innerText = "Numero de aguja: "+(num+1);
	contador.innerText = "Agujas entre lienas: " + cont;
	valorPi.innerText = "Valor aproximado de PI: "+ ((inputN*2)/cont);
	diferencia.innerText ="Diferencia: " + (((inputN*2)/cont)-Math.PI);
	ctx.stroke();
	ctx.closePath();

	ctx2.beginPath(); // dibuja la grafica
	ctx.lineWidth = 1;
	let escala = 20; // determina la escala de la grafica
	let coorY = ((inputN*2)/-cont)*escala+300;
	let coorX = (num/inputN)*600;
	ctx2.moveTo(coorX,coorY);
	ctx2.lineTo(coorX,300-Math.PI*escala);
	ctx2.stroke();
	ctx2.closePath();

	num++;
	setTimeout(() => dibujaAgujas(num,inputN,cont,contador,valorPi,total,diferencia),5);
}
