# nodejs-backend-template

Standardized template for nodejs backend projects based on [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

|                                                                                     Development                                                                                      |                                                                                      Staging                                                                                      |                                                                                    Production                                                                                     |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [![ArgoCD Badge](https://argocd.jera.co.jp/api/badge?name=az-devops-template-backend&revision=true)](https://argocd.jera.co.jp/applications/az-devops-template-backend?resource=dev) | [![ArgoCD Badge](https://argocd.jera.co.jp/api/badge?name=az-devops-template-backend&revision=true)](https://argocd.jera.co.jp/applications/az-devops-template-backend?resource=) | [![ArgoCD Badge](https://argocd.jera.co.jp/api/badge?name=az-devops-template-backend&revision=true)](https://argocd.jera.co.jp/applications/az-devops-template-backend?resource=) |

**_This application is deployed on ArgoCD, by looking at badge you can determine the status of the application, and if you click on it, you will be redirected to this project application on ArgoCD._**

## Directory structure

<details>
    <summary>Folder Structure</summary>

```
src/
├── application/
│   ├── errors/
│   │   ├── MissingRequiredParameterError.ts
│   │   ├── TaskIDAlreadyExistsError.ts
│   │   ├── TaskIDDoesntExistError.ts
│   │   └── index.ts
│   ├── port/
│   │   └── repositories/
│   │       └── TaskRepositoryPort.ts
│   └── use_cases/
│       ├── createTaskUseCase.ts
│       ├── deleteTaskUseCase.ts
│       ├── findAllTasksUseCase.ts
│       ├── findTaskByIdUseCase.ts
│       └── updateTaskUseCase.ts
├── domain/
│   └── models/
│       └── Task.ts
├── infrastructure/
│   ├── env/
│   │   └── index.ts
│   ├── orm/
│   │   └── typeorm/
│   │       ├── config/
│   │       │   └── ormconfig.ts
│   │       └── entities/
│   │           └── Task.ts
│   ├── repositories/
│   │   ├── taskRepositoryInMemory.ts
│   │   └── taskRepositoryMySQL.ts
│   └── webserver/
│       └── express/
│           └── index.ts
└── interface/
    ├── controllers/
    │   ├── createTaskController.ts
    │   ├── deleteTaskController.ts
    │   ├── findAllTasksController.ts
    │   ├── findTaskByIdController.ts
    │   └── updateTaskController.ts
    └── routes/
        ├── apiDocs.ts
        ├── createTask.ts
        ├── deleteTask.ts
        ├── findAllTasks.ts
        ├── findTaskById.ts
        ├── index.ts
        ├── updateTask.ts
        └── util.ts
```

</details>

## Packages

We need this section because we've been facing a problem caused by minor update of package such as parcel...

### How to add a package for runtime

```sh
# Install the package as exact version in dependencies.
$ yarn add --exact PACKAGE_NAME
```

### How to add a package for development

```sh
# Install the package as exact version in devDependencies.
$ yarn add -D --exact PACKAGE_NAME
```

### How to add a package for the type definition (@types/PACKAGE_NAME)

```sh
# Install the package as exact version in devDependencies.
$ yarn add -D --exact PACKAGE_NAME
```

### How to update a package

```sh
$ yarn add PACKAGE_NAME
```

## Development

1. Install node_modules locally.

   ```bash
   $ yarn
   ```

1. Start containers.

You can choose one of:

    ```bash
    # Using existing containers.
    $ yarn container:start
    ```

    ```bash
    # Build containers before starting.
    $ yarn container:start --build
    ```

    ```bash
    # Remove images and containers and rebuild them before starting.
    $ yarn container:start:rebuild
    ```

1. Add some new changes.

## Environment variables

Because we are still using the free version of GitHub, application public environment variable should be set in the repository `Actions` environment variables. Please suffix your environment variables with the following suffix:

- `_DEV`: For environment variables that should only be set for `Development` environment.
- `_STG`: For environment variables that should only be set for `Staging` environment.
- `_PRD`: For environment variables that should only be set for `Production` environment.
- `_GLOBAL`: For environment variables that should be set for all environment.

Example: `DB_HOST_DEV`, `LOG_LEVEL_PRD`, `APP_SERVER_PORT_GLOBAL`.

This will allow the pipeline to inject your environment variable in your `Kubernetes` deployment.

As for secret variables, the application should be retrieved directly from a secret store manager. In our case, most of our secrets are in Azure Key Vault, so we are using [Azure's SDK](https://www.npmjs.com/package/@azure/keyvault-secrets).

For local development, setting `NODE_ENV=local` allows you to use `process.env` instead of Azure Keyvault. (For implementation refer [here](/src/infrastructure/env/index.ts)). Meaning you will have to set the environment variables in your current shell.

## OpenAPI & WSO2 API Manager

OpenAPI specification can be found in [here](/api-docs/). The pipeline is responsible for sending your updated version to the appropriate WSO2 API Manager application. If the validation fail of your OpenAPI fails, the pipeline will also fail and not update your service on WSO2 API Manager.

**You should be able to find your API on the WSO2 API publisher portal**

- [Development Publisher](https://wso2.dev.jera-stg.com)
- [Staging Publisher](https://wso2.stg.jera.co.jp)
- [Production Publisher](https://wso2.jera.co.jp)

## How to create and run a migration (TypeORM)

    Before executing the following scripts, change the value of environment variable `DB_HOST` to `localhost`.

    ```bash
    # Create a new migration
    $ yarn typeorm-cli migration:generate -n Task

    # Run migrations
    $ yarn typeorm-cli migration:run
    ```

## Development tools

- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Jest](https://jestjs.io/)
- [TypeORM](https://typeorm.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [husky](https://typicode.github.io/husky/#/)
- [lint-staged](https://github.com/okonet/lint-staged)
- [nodemon](https://nodemon.io/)


### AI Test Case Generation Setup

For AI automation, please follow the steps below:

### 1. Required Libraries Installation
Install the following dependencies:

   - `openai`
   - `fs`
   - `path`
   - `dotenv`

### 2. Creating Typescript File
Please create a `.ts` file in the root directory (you can choose any name).

### 3. Update the package.json for Test Command:
Update the `package.json` file with the required test commands.
```sh
"test:generate": "ts-node AIGenerate.ts"
```

### 4. Modify AI Generate File
Update the `AIGenerate.ts` file with the necessary logic.

### 5. Reference Details
For more information, please refer to `autoGenerateTestsReadMe.md`.