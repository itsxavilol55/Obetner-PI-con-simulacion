let canvas = document.getElementById('tablero'); //canva para el tablero
let ctx = canvas.getContext('2d');
limpiar();
function limpiar() 
{
	ctx.strokeStyle = '#000';
	ctx.clearRect(0, 0, canvas.width, canvas.height);//limpia el canvas

	ctx.beginPath(); //dibuja las lineas y el circulo
	ctx.moveTo(0,200); // xx yy
	ctx.lineTo(400,200);
	ctx.moveTo(200,0);
	ctx.lineTo(200,400);
	ctx.moveTo(400,200);
	ctx.arc(200,200,200, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.closePath();
}
function generaDardos() 
{
	limpiar();
	let totalDardos = document.getElementById('inputNum').value; //obtiene el total de dardos a lanzar
	let indexDardo = document.getElementById('total'); //muestra los dardos lanzados
	let contador = document.getElementById('contador'); //muestra los dardos acertados
	let valorPi = document.getElementById('valorPi'); //muestra el valor aproximado de pi
	let diferencia = document.getElementById('diferencia');//muestra la diferencia de pi
	let totalAciertos = 0; //cuenta los dardos acertados
	dibujaDardos(0,totalDardos, totalAciertos,indexDardo,contador,valorPi,diferencia);
}
function dibujaDardos(num,totalDardos,totalAciertos,indexDardo,contador,valorPi,diferencia)
{
	if(num == totalDardos) return; //al llegar al total de dardos cierra la funcion
	let coorX = (Math.random()*200)+200; 
	// al sumarle 200 la coordenada 200,200 equivsldria a 0,0
	let coorY = (Math.random()*200)+200;

	let hipotenusa = Math.sqrt(Math.pow(coorX-200, 2) + Math.pow(coorY-200, 2));
	if (hipotenusa <= 200) //calcula la hipotenusa y valida si es menor al radio
	{
		ctx.strokeStyle = '#2f3';
		totalAciertos++;
	}
	else ctx.strokeStyle = '#f51';

	Math.random() >= 0.5 ? coorX -= (coorX - 200)*2 : coorX*= 1; //filtra los puntos haciendolos negativos
	Math.random() >= 0.5 ? coorY -= (coorY - 200)*2 : coorY*= 1;
	
	total.innerText = "Numero de dardo: "+(num+1);//cambia los valores de las etiquetas de texto
	contador.innerText = "Dardos acertados: " + totalAciertos;
	valorPi.innerText = "Valor aproximado de PI: "+ (totalAciertos/totalDardos)*4;
	diferencia.innerText ="Diferencia: " + (((totalAciertos/totalDardos)*4)-Math.PI);

	ctx.beginPath();//dibuja el dardo en la coordenada X Y
	ctx.moveTo(coorX,coorY);
	ctx.arc(coorX,coorY,2, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.closePath();

	num++;
	setTimeout(()=> dibujaDardos(num,totalDardos,totalAciertos,indexDardo,contador,valorPi,diferencia),1);
}