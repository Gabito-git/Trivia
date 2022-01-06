# TRIVIA

Una web app en la que puedes poner a prueba tu conocimiento y ganar mucho dinero (virtual)

## Ejecutar en local


1. Crea un archivo .env en el root del proyecto:

```
PORT=4000
DB_CNN= tu cadena de conexión a mongo DB. Ejemplo:  mongodb://localhost:27017/trivia

```

2. Instala dependencias (frontend and backend) desde el root

```
npm install
cd client
npm install
``` 

3. Alimentar la base de datos con las preguntas pre establecidas:

```
npm run data:import
```

4. Ejecútalo

```
# Run frontend (:3000) & backend (:4000)
npm run dev

# Run backend only
npm run server
```

- NotaL: Para destruir la data existente en la base de datos
```
npm run data:destroy
```