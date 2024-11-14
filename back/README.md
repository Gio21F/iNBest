
# Prueba tecnica

1. Clonar proyecto
2. Instalar dependencias 
```bash
npm install
```
3. Clonar el archivo ```.env.template``` y renombrarlo a ```.env```
4. Cambiar las variables de entorno a necesidad
5. Levantar la base de datos
```bash
docker-compose up -d
```

6. Levantar server
*Dev:*
```bash
npm run dev
```

*Prod:*  
```bash
npm run build
&&
npm run start
```