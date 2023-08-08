# Juego de Simon Dice

## Este repositorio se trata de un proyecto realizado para la materia Lengujes de Programacion para la Administracion (LPPA) que consiste en el juego "Simon"

### Un pantallazo al juego
![image](https://github.com/FacuKopech/simon-dice/assets/63883859/7d6e20ae-dfc8-4a0c-b603-b2a9fa791694)

### Las reglas son simples:
* Para comenzar a jugar, el jugador debe ingresar su nombre en el Input que dice 'Nombre'
* El jugador debe repetir en el orden correcto la secuencia de luces y sonidos generada por el juego de manera aleatoria. A medida que completa cada secuencia, el jugador avanza de nivel.
* Si el jugador oprime un boton que no corresponde al orden de la secuencia generada, finaliza el juego. 
* Para cada nivel, el jugador dispondra de una cierta cantidad de segundos para repetir la secuencia. El nivel 1 comienza con 5 segundos, y a medida que avanza de nivel, se le agrega un segundo. 
* Si el tiempo finaliza y el jugador aun no completo la secuencia, finaliza el juego
* CUIDADO! Si el jugador repite la secuencia de manera exitosa y dentro del rango de tiempo disponible, hay que tener en cuenta la penalizacion: al puntaje acumulado en ese nivel, se le descontara un porcentaje acorde a la cantidad de segundos que demoro en completar la secuencia. Por ejemplo, el jugador se encuentra en el nivel 4, completo la secuencia de manera correcta y de los 8 segundos que tiene disponible, tardo 3, por ende, se le descuenta un 3% a su puntaje en dicho nivel.

![image](https://github.com/FacuKopech/simon-dice/assets/63883859/fd63f7f4-2580-4cd7-95ce-24577c2d4527)

## Ranking
### El jugador puede oprimir en el boton 'Ranking' para visualizar las partidas que ha jugado, junto con el numero de partida, nombre del jugador, el puntaje obtenido, el maximo nivel al cual ha llegado en dicha partida, la cantidad de segundos que demoro en todas las secuencias, y la fecha.
![image](https://github.com/FacuKopech/simon-dice/assets/63883859/1aead99a-b92f-46cf-b60c-c772cee5c259)

### No solo se visualizara sus partidas, sino la de todos los jugadores que ingresen su nombre en el campo de mas arriba. De esta forma, el jugador puede competir con sus amigos y todos llevar un registro de quien ha sido el mas victorioso!

### Ademas, es posible ordenar el Ranking por puntaje (por defecto) o si se oprime la etiqueta con el titulo 'Fecha', el popup del Ranking se ordenara por fecha de mayor a menor. Oprimiento la etiqueta con el titulo 'Puntaje', se retornara al orden original, es decir, por puntaje de mayor a menor.

## Maximos valores
### En el lado izquierdo del tablero, se puede visualizar los maximos valores alcanzados. Esto indica:
* El maximo puntaje alcanzado
* A quien pertenece el maximo puntaje alcanzado
* El maximo nivel alcanzado
* A quien pertenece el maximo nivel alcanzado

![image](https://github.com/FacuKopech/simon-dice/assets/63883859/ab26dd7c-a465-46eb-a2de-3c2c93a3d153)

### Si asi lo desea, el jugador puede oprimir el boton 'Resetear', para eliminar absolutamente todos los datos guardados y eliminar el Ranking, comenzando desde cero.

## Contacto

### Si el jugador dispone de alguna queja o comentario sobre el juego, en la esquina superior derecha se encuentra un boton de 'Contacto':
![image](https://github.com/FacuKopech/simon-dice/assets/63883859/d27576a3-8373-44b6-8a9a-da3158d9413d)

### Dicho boton lo redirigira a la siguiente pagina
![image](https://github.com/FacuKopech/simon-dice/assets/63883859/82748cc6-363b-4ade-9404-869c994e4654)

### Aqui el jugador podra ingresar su nombre, email e ingresar alguna pregunta, queja o comentario acerca del juego, y enviarla.

