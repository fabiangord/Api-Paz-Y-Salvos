### Prototipo de prueba en proceso

Aqui se está realizando un prototipo APIREST del aplicativo de paz y salvos

Hecho en NODEJS y REACT con TypeScript


 - Para ejecutar en el local recuerda tener instalado DOCKER, clonar el repositorio y luego:
    1. Ejecuta el comando `npm i`
    2. Ejecuta el contenedor en docker `docker-compose up --build -d` y esperar que inicie el contenedor
    3. Realizar la migracion de la DB `npx prisma migrate dev`
    4. Ejecuta el servidor de desarrollo con `npm run start:dev`

Ya con esto la aplicación funcionará con lo que se lleva hasta ahora