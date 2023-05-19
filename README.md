# Data Models

El proyecto se basa en objetos del modelo que manejan y gestionan las consultas recibidas de tipo objetos. Existe un objeto base llamado DataModel que se encarga de cargar los modelos definidos con sequelize o sequelize-auto, proporcionando una interfaz sencilla para interactuar con ellos. Por otro lado, la clase Action define las acciones que se deben realizar en la base de datos para efectuar el impacto deseado.

Para utilizar este proyecto, simplemente importa el DataModel en tus modelos y el objeto Action en tus acciones. De esta manera, podrás hacer uso de las consultas en cualquier parte del código, manteniendo una estructura clara y coherente.

A medida que avances en el proyecto, se proporcionarán más detalles sobre el funcionamiento y las mejores prácticas para su uso.


## Índice

1. [Instalación](#instalación)
2. [Uso](#uso)
5. [Agradecimientos](#agradecimientos)


## Instalación

1. Dentro de tu proyecto clonar este repositorio e incluirlo en el proyecto
2. Instalar las dependencias usando: npm i o npm install


## Uso
Una vez tengas incorporado en el data-models en tu proyecto se debe realizar la importación de la siguiente manera:

    **import {DataModel, actions} from "data-model/db"**

Ya obteniendo ambos objetos podemos comenzar con el funcionamiento. A continuación se indicará el uso de cada método para el Data Model

    - conexión a la BD de datos:

        ```
        const dbConnected = DataModel.connectDB(credentials);
        ```

        En donde credentials tiene las siguientes propiedad:

        * dbName: Indica el nombre de la BD a conectar
        * dbUser: Usuario
        * dbPass: Contraseña
        * dbHost: Dirección de la BD de datos
        * dbTimeZone: EL horario del lugar (opcional)
        * dialect: gestor de base datos a usar. Opciones: mysql, mariadb, sqlite, postgres, oracle
    - Modelos

        ```
        const models = DataModel.models;
        ```

        Contiene los modelos de la BD
    
    - sequelize: Usa toda funcionalidad de sequelize que requieras hacer. Por ejemplo:

        ```
        const query = await DataModel.sequelize.query('
            SELECT * FROM user;
        ')
        ```

Ahora para actions

    - La propiedad DEFAULT puedes modificar los valores por defecto del order, limit, start (offset). Tiene por defecto "timeCreated", 30, 0, respectivamente
    
        ```
        Actions.DEFAULT = { order: "timeCreated", limit: 30, start: 0 };
        ```

    - La propiedad OPERATORS devuelve la lista de operadores soportados como key en el objeto para las consultas

        ```
        console.log(actions.OPERATORS)
        ```

    - La propiedad op permite usar los demás operadores de sequelize para consultas personalizadas

    - La función processFilters te permite construir el filtrado para realizar la consulta por sequelize

        ```
        const where = { 
            id: [10,30,40,50],
            date: {
                between: ['2020-01-01','2020-12-31']
            },
            and: {
                name: "pedro",
                quatity: {
                    gt: 10
                },
                or: {status: 1}
            },
        }

        const filter = actions.processFilters(DataModel.models.Modelo, where);
        ```
    - La función list permite listar una consulta. Por ejemplo:

        ```
        const results = await actions.list(model, params, target)
        ```

    En donde model son los modelos que contiene DataModel.models, target el lugar donde se realizó el error y params que está distribuído de la siguiente manera:
        * limit: limite de elementos, por defecto 30
        * start: desplazamiento de los elementos a traer, por defecto 0
        * order: campo a ordenar
        * asc: boleano para indicar si es ascendente o descendente
        * where: formato where como el ejemplo anterior
        * attributes: indicar por un arreglo de string los atributos a mostrar
    
    - La función data toma la información de un solo registro de la base de datos por medio de un id. Por ejemplo:

        ```
        const data = await actions.data(model, params, target)
        ```

    En donde model son los modelos que contiene DataModel.models, target el lugar donde se realizó el error y params es el id del registro

    - La función remove tiene como objetivo borrar un registro por id

        ```
        const remove = await actions.remove(params, model, target);
        ```

    En donde model son los modelos que contiene DataModel.models, target el lugar donde se realizó el error y params es el id del registro

    - La función publish en donde se pasará los atributos para actualizar el registro o crearlo. En los parámetros si se incluye el id se actualiza el registro, sino lo crea. Ejemplo

        ```
        const create = {
            name: "Tomas",
            phone: "+xxxxxxxxxxxx"
        }

        const update = {
            id: 1,
            name: "Pedro"
        }

        const publish = await actions.publish(model, create, target);

        const publish = await actions.publish(model, update, target)
        ```

    - La función bulkSave permite hacer un upsert para una cantidad masiva

        ```
        const params = [
            {
                name: "Maria"
            },
            {
                id: 2,
                name: "tomas"
            }
        ]

        const saveAll = await actions.bulkSave(model, params, target)
        ```

## Agradecimientos

Queremos agradecer a todas las personas que han contribuido a este proyecto y a los recursos que hemos utilizado.

- Moisés Rodriguez
- Jorge Contreras