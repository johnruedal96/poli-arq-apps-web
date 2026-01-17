# Guía Detallada (Basada en Git) para Integrar GraphQL en NestJS

Este documento se generó analizando los cambios pendientes en el repositorio de Git. Describe con precisión los pasos técnicos que se siguieron para añadir una interfaz de GraphQL a la aplicación, excluyendo las modificaciones en las carpetas `src/product/api` y `src/product/domain`.

---

### Paso 1: Instalación de Dependencias de GraphQL

El primer paso fue añadir todas las librerías necesarias al proyecto. El archivo `package.json` muestra las siguientes adiciones clave:

-   **`@nestjs/graphql` y `@nestjs/apollo`**: Módulos de NestJS para la integración con GraphQL y Apollo Server.
-   **`@apollo/server`**: El servidor de GraphQL que se ejecuta junto a NestJS.
-   **`graphql`**: La librería principal de JavaScript para GraphQL.
-   **`@as-integrations/express5`**: Un paquete de integración necesario para que Apollo Server funcione correctamente con la versión de Express que usa NestJS.

```json
// package.json:
"dependencies": {
  "@apollo/server": "^5.2.0",
  "@as-integrations/express5": "^1.1.2",
  "@nestjs/apollo": "^13.2.3",
  "@nestjs/graphql": "^13.2.3",
  "graphql": "^16.12.0",
  // ... otras dependencias
},
```

---

### Paso 2: Configuración del Módulo Principal (`app.module.ts`)

El archivo `app.module.ts` fue modificado significativamente para configurar y ajustar el comportamiento de GraphQL.

1.  **Importación de `GraphQLModule`**: Se importó y configuró el módulo principal de GraphQL.
2.  **Generación de Esquema (`autoSchemaFile`)**: Se añadió la opción `autoSchemaFile` para que NestJS genere automáticamente el archivo `schema.gql` a partir de nuestro código (estrategia *code-first*). La ruta se configuró para guardarlo en `src/schema.gql`.
3.  **Configuración de Seguridad y Depuración**:
    *   `csrfPrevention: false`: Se desactivó la protección CSRF de Apollo Server, que estaba causando errores en las peticiones desde clientes como Postman si no se configuraban bien las cabeceras.
    *   `graphiql: false`: Se desactivó la interfaz de GraphiQL en el navegador.
4.  **Formateo de Errores (`formatError`)**: Se implementó una función `formatError` para tomar control total sobre la respuesta de error. Esto se hizo para evitar exponer `stacktraces` y otros detalles internos, devolviendo únicamente un objeto limpio con el mensaje y el código del error.

```typescript
// src/app.module.ts:
GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  graphiql: false,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  csrfPrevention: false,
  formatError: (error: GraphQLError) => {
    const { message, extensions } = error;
    return {
      message,
      code: extensions?.code,
    };
  },
}),
```

---

### Paso 3: Creación de la Capa de GraphQL para Productos

Se creó una nueva carpeta `src/product/graphql` para albergar toda la lógica del adaptador de GraphQL.

1.  **El Resolver (`product.resolver.ts`)**:
    *   Se creó el archivo `ProductResolver` para manejar las queries y mutaciones.
    *   Se inyectó `ProductService` para comunicarse con la lógica de la aplicación.
    *   Se implementó el CRUD completo:
        *   **Queries**: `products` y `product(id:)` para leer datos.
        *   **Mutaciones**: `createProduct`, `updateProduct` y `deleteProduct` para escribir datos.

2.  **DTOs de Entrada y Modelos de Respuesta**:
    *   Se creó la carpeta `src/product/graphql/dto` para los DTOs de entrada (`CreateProductInput`, `UpdateProductInput`). Estos usan el decorador `@InputType`.
    *   Se creó la carpeta `src/product/graphql/models` para los modelos de respuesta (`ProductModel`), que usan el decorador `@ObjectType`. Esto fue parte de la refactorización para desacoplar el dominio.

3.  **Integración en `ProductModule`**:
    *   Finalmente, se añadió `ProductResolver` a la lista de `providers` en `src/product/product.module.ts` para que NestJS lo reconociera e integrara en la aplicación.

    ```typescript
    // src/product/product.module.ts
    providers: [
      ProductService,
      ProductResolver, // <-- Se añadió el resolver
      {
        provide: 'ProductRepository',
        useClass: ProductRepositoryPostgres,
      },
    ],
    ```

---

### Paso 4: Generación del Esquema (`schema.gql`)

Como resultado de la configuración `autoSchemaFile`, se generó un nuevo archivo `src/schema.gql` que contiene la definición completa de nuestra API de GraphQL. Este archivo es un artefacto de compilación y no debe ser modificado manualmente.

---

### Resumen de Cambios (Excluyendo `api` y `domain`)

-   **Dependencias**: Se añadieron 5 paquetes clave para habilitar GraphQL.
-   **Módulo Principal**: Se configuró `GraphQLModule` con generación de esquema, ajustes de seguridad y un formateador de errores personalizado.
-   **Capa de GraphQL**: Se construyó un `Resolver` con el CRUD completo, junto a sus DTOs de entrada y modelos de respuesta.
-   **Módulo de Producto**: Se registró el nuevo `ProductResolver`.
-   **Artefacto de Esquema**: Se generó el `schema.gql` en la carpeta `src/`.
