// Step 1: Importing Required Modules
import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Step 2: Loading Environment Variables
dotenv.config()

// Step 3: Initialize OpenAI API
const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
})

// Step 4: Define Paths to Different Files
const controllersDir = path.join(__dirname, './src/interface/controllers')
const useCasesDir = path.join(__dirname, './src/application/use_cases')
const repositoriesDir = path.join(
    __dirname,
    './src/infrastructure/repositories'
)
const portDir = path.join(__dirname, './src/application/port/repositories')
const entityDir = path.join(
    __dirname,
    './src/infrastructure/orm/typeorm/entities'
)
const dtoDir = path.join(__dirname, './src/domain/models')
const routeDir = path.join(__dirname, './src/interface/routes')

// Step 5: Define Test Output Directory
const testOutputDir = path.join(__dirname, './test/test4o')

// Step 6: Ensure Test Directory Exists
fs.mkdirSync(testOutputDir, { recursive: true })

// Step 7: Recursively Get All TypeScript Files
const getAllTsFiles = (dir: string): string[] => {
    let files: string[] = []
    fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            files = files.concat(getAllTsFiles(fullPath))
        } else if (entry.name.endsWith('.ts')) {
            files.push(fullPath)
        }
    })
    return files
}

// Step 8: Detect Controller Files
const detectedControllers = getAllTsFiles(controllersDir)

// Step 9:Define Mapping of Use Cases to Repositories
function getFileMapping(): Record<
    string,
    { repo: string; port: string; entity: string; dto: string; route: string }
> {
    return {
        getPaymentRecordByIdName: {
            repo: 'paymentRecordRepositoryMySQL.ts',
            port: 'PaymentRecordRepositoryPort.ts',
            entity: 'PaymentRecord.ts',
            dto: 'PaymentRecordDto.ts',
            route: '/paymentRecord/getPaymentRecordByIdName.ts',
        },
        // Define mappings for other use cases...
    }
}

const fileMap = getFileMapping()

// Step 10: Generate Use Case to Repository Mapping
const detectedTestFiles = detectedControllers.map((controllerPath) => {
    const controllerFile = path.relative(controllersDir, controllerPath)
    const baseName = path
        .basename(controllerFile, '.ts')
        .replace('Controller', '')

    const useCaseFile = path.join(
        path.dirname(controllerFile),
        `${baseName}UseCase.ts`
    )
    const useCasePath = path.join(useCasesDir, useCaseFile)

    const defaultFiles = {
        repo: '',
        port: '',
        entity: '',
        dto: '',
        route: '',
    }

    const files = (fileMap[baseName] ?? defaultFiles) as {
        repo: string
        port: string
        entity: string
        dto: string
        route: string
    }

    const repoPath = files.repo ? path.join(repositoriesDir, files.repo) : null
    const portPath = files.port ? path.join(portDir, files.port) : null
    const entityPath = files.entity ? path.join(entityDir, files.entity) : null
    const dtoPath = files.dto ? path.join(dtoDir, files.dto) : null
    const routePath = files.route ? path.join(routeDir, files.route) : null

    const useCaseExists = fs.existsSync(useCasePath)
    const repoExists = repoPath && fs.existsSync(repoPath)
    const portExists = portPath && fs.existsSync(portPath)
    const entityExists = entityPath && fs.existsSync(entityPath)
    const dtoExists = dtoPath && fs.existsSync(dtoPath)
    const routeExists = routePath && fs.existsSync(routePath)

    console.log(`📝 Checking: ${baseName}`)
    console.log(`  🔹 Controller: ${controllerFile}`)
    console.log(`  🔹 Use Case: ${useCaseFile} → Exists? ${useCaseExists}`)
    console.log(`  🔹 Repository: ${files.repo || 'N/A'} → Exists? ${repoExists}`)
    console.log(`  🔹 Port: ${files.port || 'N/A'} → Exists? ${portExists}`)
    console.log(`  🔹 Entity: ${files.entity || 'N/A'} → Exists? ${entityExists}`)
    console.log(`  🔹 DTO: ${files.dto || 'N/A'} → Exists? ${dtoExists}`)
    console.log(`  🔹 Route: ${files.route || 'N/A'} → Exists? ${routeExists}`)

    return {
        name: `${baseName}.test.ts`,
        controller: controllerFile,
        useCase: useCaseExists ? useCaseFile : null,
        repo: repoExists ? files.repo : null,
        port: portExists ? files.port : null,
        entity: entityExists ? files.entity : null,
        dto: dtoExists ? files.dto : null,
        route: routeExists ? files.route : null,
    }
})

// Step 12: Read File Content
const readFileContent = (filePath: string): string | null => {
    try {
        return fs.readFileSync(filePath, 'utf-8')
    } catch (error) {
        console.warn(`⚠️ Warning: File not found - ${filePath}`)
        return null
    }
}

// Step 13: Function to Read File Content Safely
async function generateTest(
    fileName: string,
    controllerFile: string,
    useCaseFile: string,
    repositoryFile: string,
    portFile: string,
    entityFile: string,
    dtoFile: string,
    routeFile: string
) {
    const controllerPath = path.join(controllersDir, controllerFile)
    const useCasePath = path.join(useCasesDir, useCaseFile)
    const repositoryPath = path.join(repositoriesDir, repositoryFile)
    const portPath = path.join(portDir, portFile)
    const entityPath = path.join(entityDir, entityFile)
    const dtoPath = path.join(dtoDir, dtoFile)
    const routePath = path.join(routeDir, routeFile)

    const controllerCode = readFileContent(controllerPath)
    const useCaseCode = readFileContent(useCasePath)
    const repositoryCode = readFileContent(repositoryPath)
    const portCode = readFileContent(portPath)
    const entityCode = readFileContent(entityPath)
    const dtoCode = readFileContent(dtoPath)
    const routeCode = readFileContent(routePath)

    if (
        !controllerCode ||
        !useCaseCode ||
        !repositoryCode ||
        !portCode ||
        !entityCode ||
        !dtoCode ||
        !routeCode
    ) {
        console.error(
            `❌ Skipping test generation for ${fileName} due to missing files.`
        )
        return
    }

    const integrationPrompt = `
      STRICTLY FOLLOW THE INSTRUCTIONS BELOW WITHOUT EXCEPTION:

      Given the following TypeScript files:

      **Controller:**
      \`\`\`typescript
      ${controllerCode}
      \`\`\`

      **Use Case:**
      \`\`\`typescript
      ${useCaseCode}
      \`\`\`

      **Repository:**
      \`\`\`typescript
      ${repositoryCode}
      \`\`\`

      **Port:**
      \`\`\`typescript
      ${portCode}
      \`\`\`

      **Entity:**
      \`\`\`typescript
      ${entityCode}
      \`\`\`

      **DTO:**
      \`\`\`typescript
      ${dtoCode}
      \`\`\`

      **Route:**
      \`\`\`typescript
      ${routeCode}
      \`\`\`

      YOU MUST GENERATE a **complete and exhaustive integration End to End for API test Consist of minimum 20 testcases** in TypeScript.

      **MANDATORY REQUIREMENTS (DO NOT IGNORE ANY):**
      - The test **MUST** be written using **Jest** as the testing framework.
      - The test **MUST** use **fp-ts/Either** for handling errors.
      - The test **MUST** use **fp-ts/Option** for handling optional values.
      - **The Repository MUST be properly mocked** to isolate dependencies.
      - **ALL POSSIBLE CASES, including both SUCCESS and FAILURE scenarios, MUST be covered completely.**
      - **DO NOT SKIP ANY CONTENTS OR EDGE CASES.**
      - **DO NOT wrap the output inside code blocks like \`\`\`typescript**.
      - **The output MUST ONLY contain valid TypeScript Jest test code—NO COMMENTS, NO EXPLANATIONS, NO EXTRA TEXT.**
      - **FAILURE TO FOLLOW THESE INSTRUCTIONS WILL BE CONSIDERED AN ERROR.**

      **ADDITIONAL MANDATORY FIXES TO AVOID COMMON ERRORS:**
      1. **Fix 'Cannot find module' errors by enforcing correct relative imports:**
         - The test file **MUST** use '../../../src/...' instead of '@src/'.
         - Example:
           ✅ **Correct:**
           \`import { getPaymentRecordByIdNameUseCase } from '../../../src/application/use_cases/paymentRecord/getPaymentRecordByIdNameUseCase';\`  
           ❌ **Incorrect:**
           \`import { getPaymentRecordByIdNameUseCase } from '@src/application/use_cases/paymentRecord/getPaymentRecordByIdNameUseCase';\`

      2. **Ensure Jest resolves paths properly:**
         - The test **MUST** import modules using '../../../src/...' to match the actual project structure.
         - The test **MUST NOT** use Jest's 'moduleNameMapper'.

      3. **Fix 'right' does not exist error in fp-ts/Either:**
         - The test **MUST NOT** use 'result.right'. Instead, it **MUST** use 'E.getOrElse()' to extract values:
           - ✅ **Correct:**
             \'const paymentRecord = E.getOrElse<ApplicationError, PaymentRecordDto>(
                () => { throw new Error("Expected Right but got Left"); }
             )(result);\'
           - ❌ **Incorrect:**
             \'const paymentRecord = result.right;\'

      4. **Ensure Jest mocks dependencies correctly:**
         - The test **MUST** properly mock repository methods using Jest.
         - Example:
           \'jest.mock('../../../src/infrastructure/repositories/paymentRecordRepositoryMySQL');\'
         - This ensures Jest correctly isolates repository logic.
           '''

      **Final Note:**
      - The generated test file **MUST** run successfully in a TypeScript project using Jest.
      - **STRICTLY FOLLOW THESE INSTRUCTIONS OR THE OUTPUT WILL BE CONSIDERED INCORRECT.**

      NOW, GENERATE THE TEST.
    `

    try {
        // Step 16: Sending API Requests to OpenAI for Integration Test
        const integrationResponse = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'developer', content: integrationPrompt }],
            max_tokens: 4000,
            temperature: 0.0,
            top_p: 0.0,
            frequency_penalty: 0,
            presence_penalty: 0,
        })

        // Step 17: Saving the Generated Integration Test
        if (integrationResponse?.choices?.[0]?.message?.content) {
            const filePath = path.join(testOutputDir, 'integration', fileName)
            fs.mkdirSync(path.dirname(filePath), { recursive: true })
            fs.writeFileSync(
                filePath,
                integrationResponse.choices[0].message.content.trim(),
                { encoding: 'utf8' }
            )
            console.log(`✅ Generated Integration Test: ${filePath}`)
        }
    } catch (error) {
        console.error(`❌ Error generating tests for ${fileName}:`, error)
    }

    // Step 18: Creating a Unit Test Prompt
    const unitPrompt = `
    STRICTLY FOLLOW THE INSTRUCTIONS BELOW WITHOUT EXCEPTION:

    Given the following TypeScript files:

    **Controller:**
    \`\`\`typescript
    ${controllerCode}
    \`\`\`

    **Use Case:**
    \`\`\`typescript
    ${useCaseCode}
    \`\`\`

    **Repository:**
    \`\`\`typescript
    ${repositoryCode}
    \`\`\`

    **Port:**
    \`\`\`typescript
    ${portCode}
    \`\`\`

    **Entity:**
    \`\`\`typescript
    ${entityCode}
    \`\`\`

    **DTO:**
    \`\`\`typescript
    ${dtoCode}
    \`\`\`

    **Route:**
    \`\`\`typescript
    ${routeCode}
    \`\`\`

    YOU MUST GENERATE a **complete and exhaustive unit test Consist of minimum 20 testcases** in TypeScript.

    **MANDATORY REQUIREMENTS (DO NOT IGNORE ANY):**
    - The test **MUST** be written using **Jest** as the testing framework.
    - The test **MUST** use **fp-ts/Either** for handling errors.
    - The test **MUST** use **fp-ts/Option** for handling optional values.
    - **The Repository MUST be properly mocked** to isolate dependencies.
    - **ALL POSSIBLE CASES, including both SUCCESS and FAILURE scenarios, MUST be covered completely.**
    - **DO NOT SKIP ANY CONTENTS OR EDGE CASES.**
    - **DO NOT wrap the output inside code blocks like \`\`\`typescript**.
    - **The output MUST ONLY contain valid TypeScript Jest test code—NO COMMENTS, NO EXPLANATIONS, NO EXTRA TEXT.**
    - **FAILURE TO FOLLOW THESE INSTRUCTIONS WILL BE CONSIDERED AN ERROR.**

    **ADDITIONAL MANDATORY FIXES TO AVOID COMMON ERRORS:**
    1. **Fix 'Cannot find module' errors by enforcing correct relative imports:**
        - The test file **MUST** use '../../../src/...' instead of '@src/'.
        - Example:
        ✅ **Correct:**
        \`import { getPaymentRecordByIdNameUseCase } from '../../../src/application/use_cases/paymentRecord/getPaymentRecordByIdNameUseCase';\`  
        ❌ **Incorrect:**
        \`import { getPaymentRecordByIdNameUseCase } from '@src/application/use_cases/paymentRecord/getPaymentRecordByIdNameUseCase';\`

    2. **Ensure Jest resolves paths properly:**
        - The test **MUST** import modules using '../../../src/...' to match the actual project structure.
        - The test **MUST NOT** use Jest's 'moduleNameMapper'.

    3. **Fix 'right' does not exist error in fp-ts/Either:**
        - The test **MUST NOT** use 'result.right'. Instead, it **MUST** use 'E.getOrElse()' to extract values:
        - ✅ **Correct:**
            \'const paymentRecord = E.getOrElse<ApplicationError, PaymentRecordDto>(
                () => { throw new Error("Expected Right but got Left"); }
            )(result);\'
        - ❌ **Incorrect:**
            \'const paymentRecord = result.right;\'

    4. **Ensure Jest mocks dependencies correctly:**
        - The test **MUST** properly mock repository methods using Jest.
        - Example:
        \'jest.mock('../../../src/infrastructure/repositories/paymentRecordRepositoryMySQL');\'
        - This ensures Jest correctly isolates repository logic.
        '''

    **Final Note:**
    - The generated test file **MUST** run successfully in a TypeScript project using Jest.
    - **STRICTLY FOLLOW THESE INSTRUCTIONS OR THE OUTPUT WILL BE CONSIDERED INCORRECT.**

    NOW, GENERATE THE TEST.
    `

    try {
        // Step 18: Sending API Requests to OpenAI for Unit Test
        const unitResponse = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'developer', content: unitPrompt }],
            max_tokens: 14000,
            temperature: 0.0,
            top_p: 0.0,
            frequency_penalty: 0,
            presence_penalty: 0,
        })

        // Step 19: Saving the Generated Unit Test
        if (unitResponse?.choices?.[0]?.message?.content) {
            const unitFilePath = path.join(testOutputDir, 'unit', fileName)
            fs.mkdirSync(path.dirname(unitFilePath), { recursive: true })
            fs.writeFileSync(
                unitFilePath,
                unitResponse.choices[0].message.content.trim(),
                { encoding: 'utf8' }
            )
            console.log(`✅ Generated Unit Test: ${unitFilePath}`)
        }
    } catch (error) {
        console.error(`❌ Error generating tests for ${fileName}:`, error)
    }
}

// Step 20: Generate All Tests
async function generateAllTests() {
    for (const {
        name,
        controller,
        useCase,
        repo,
        port,
        entity,
        dto,
        route,
    } of detectedTestFiles) {
        if (
            controller !== null &&
            useCase !== null &&
            repo !== null &&
            port !== null &&
            entity !== null &&
            dto !== null &&
            route !== null
        ) {
            console.log(`Generating test for: ${name}`)
            console.log(`  Controller: ${controller}`)
            console.log(`  Use Case: ${useCase}`)
            console.log(`  Repository: ${repo}`)
            console.log(`  Port: ${port}`)
            console.log(`  Entity: ${entity}`)
            console.log(`  DTO: ${dto}`)
            console.log(`  Route: ${route}`)
            await generateTest(
                name,
                controller,
                useCase,
                repo,
                port,
                entity,
                dto,
                route
            )
        }
    }
}

// Step 21: Start Test Generation
generateAllTests()
