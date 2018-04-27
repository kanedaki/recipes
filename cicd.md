
Integración Contínua/Despliegue continuo
=====

Se ha implementado una solución para la integración/despliegue continuo de la aplicación. Al pushear los cambios a GitHub, se instala el proyecto y se pasan los test.
Si se hace de manera exitosa, se realiza un despliegue autómático en el servidor en el que se encuentra alojada la aplicación.

## Servidor

La aplicación se encuentra alojada en un droplet de Digital Ocean. Este se encuentra accesible a traves de la IP 206.189.116.211. Para conectar con el mismo:

~~~~
  ssh root@206.189.116.42
~~~~

Dentro de la carpeta root existe un fichero *deployRecipes.sh* y una carpeta *recipes*. El primero contiene las instrucciones necesarias para desplegar automáticamente la aplicación si se pasan los tests. Si hubiera de modificarse el proceso de despliegue, se habría de hacer en este archivo. El segundo es la carpeta donde se almacena el paquete npm que contiene la aplicación.

#### SSH

Al momonto de escribir estas lineas, se encuentran autorizados Miguel, Victor, Fran y TravisCI. Si se quiere acceder a la máquina, se habrá de facilitar la sshkey del cliente a alguno de ellos para que la añadan desde dentro.

#### MongoDB

La aplicación depende de mongoDB como base de datos. Para arrancarla:

~~~~
  sudo service mongod start
~~~~

Existen varios scripts dentro del paquete npm que pueblan de datos las base de idem. Para ejecutarlos:

~~~~
  cd recipes
  npm run store-users
  npm run store-ingredients
  npm run store-recipes
~~~~


#### PM2

El servidor utiliza el gestor de procesos para node PM2. El proceso que sirve la aplicación se denomina *server*. Este no se puede ejecutar normalmente con node, sino que se requiere de babel-node para transpilar y ejecutar. Se pueden controlar los procesos con los siguientes comandos:

~~~~
  pm2 start --interpreter babel-node src/server.js
~~~~

Añade el proceso al gestor. Es importante indicar que el interprete debe ser babel-node. Se puede añadir el flag *--name [nombre-del-proceso]* para darle un nombre distinto a *server*.

~~~~
  pm2 ps
~~~~

Muestra la lista de procesos añadidos al gestor y su estado.

~~~~
  pm2 stop server
~~~~

Para el servidor. Cambiar *server* por el nombre asignado al proceso con *--name* en caso de haberlo hecho.

~~~~
  pm2 start server
~~~~

Iniciar el servidor en caso de que esté parado.

~~~~
  pm2 restart server
~~~~

Combinación de las dos anteriores.

~~~~
  pm2 delete server
~~~~

Elimina el servidor de la lista de procesos de pm2.

### Nginx

La aplicación se expone en el puerto 3000 en localhost. Sin embargo, para acceder remotamente se expone el puerto 80. Para ello se utiliza el servidor de aplicaciones Nginx.

Este redirige todo el tráfico del puerto 80 al 3000, permitiendo la correcta interacción con la aplicación. El servidor node expone el contenido de carpeta *~/recipes/public* por lo que es ahí donde se deben colocar los estáticos. Se puede interactuar con Nginx con los siguientes comandos:

~~~~
  sudo systemctl stop nginx
~~~~
Parar Nginx
~~~~
  sudo systemctl start nginx
~~~~
Arrancar Nginx
~~~~
  sudo systemctl restart nginx
~~~~
Reiniciar Nginx
~~~~
  sudo systemctl reload nginx
~~~~
Recargar configuración de Nginx
~~~~
  sudo systemctl disable nginx
~~~~
Desactivar el inicio automático de Nginx al arrancar el sistema
~~~~
  sudo systemctl enable nginx
~~~~
Activar el inicio automático de Nginx al arrancar el sistema

Se pueden configurar los servicios que expone Nginx mediante los ficheros existentes en la carpeta.

~~~~
  /etc/nginx/sites-enabled/
~~~~

Cada fichero se refiere a un servicio, por lo que podría ser necesario en un futuro añadir mas ficheros. Tras modificarlo, es necesario recargar Nginx para actualizar la configuración.

## Travis

Travis CI es un servicio que permite instalar, testear y desplegar aplicaciones que utilizan GitHub como repositorio para control de versiones. El proceso es el siguiente:

- Se realiza un push a GitHub
- GitHub notifica a Travis
- Travis instala la aplicación y corre los tests
- Si estos se pasan sin errores, se llama al script *deployRecipes.sh* en el servidor

~~~~
  Contenido de deployRecipes.sh:

  cd recipes
  echo "Stoping process"
  pm2 stop server
  pm2 delete server
  echo "Updating package"
  git fetch
  git pull
  npm install
  echo "Starting services"
  pm2 start --interpreter babel-node src/server.js
  echo "Done ;)"
~~~~


- Este último para pm2, actualiza el repositorio, reinstala las dependencias y rearranca el proceso.

Se puede monitorizar todo el proceso accediendo al siguiente enlace: [recipes](https://travis-ci.org/redradix/recipes). Para modificar la configuración de Travis, contactar con Fran.