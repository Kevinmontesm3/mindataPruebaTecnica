# Usamos la imagen oficial de Node.js basada en Alpine Linux (una versión ligera)
FROM node:18.19.1-alpine AS build

# Instalamos las dependencias necesarias para compilar código nativo (como Python, make y g++)
RUN apk update && apk add --no-cache python3 make g++

# Establecemos el directorio de trabajo dentro del contenedor. Todas las operaciones posteriores serán relativas a este directorio.
WORKDIR /app

# Copiamos los archivos de configuración de npm (package.json y package-lock.json) al contenedor para instalar dependencias
COPY package*.json ./

# Ejecutamos npm install para instalar las dependencias definidas en el package.json
RUN npm install

# Copiamos todo el contenido del proyecto (el código fuente) al contenedor
COPY . .

# Ejecutamos el comando `npm run build` para compilar la aplicación Angular, generando los archivos estáticos
RUN npm run build

# Usamos la imagen oficial de Nginx para servir la aplicación Angular en producción
#Ngix
FROM nginx:latest AS nginx

# Copiamos los archivos generados por el build (ubicados en /app/dist/angular-signals) al directorio donde Nginx espera servir los archivos estáticos
COPY --from=build /app/dist/angular-signals /usr/share/nginx/html

# Copiamos el archivo de configuración de Nginx al contenedor, para personalizar la configuración del servidor web
COPY nginx.conf /etc/nginx/nginx.conf

# Exponemos el puerto 80 para que Nginx pueda servir la aplicación a través de este puerto
EXPOSE 80
