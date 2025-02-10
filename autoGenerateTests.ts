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
function getRepositoryMapping(): Record<string, string> {
  return {
    // Task
    createTask: 'taskRepositoryMySQL.ts',
    deleteTask: 'taskRepositoryMySQL.ts',
    findAllTasks: 'taskRepositoryMySQL.ts',
    findTaskById: 'taskRepositoryMySQL.ts',
    updateTask: 'taskRepositoryMySQL.ts',

    //Payment Record
    createPaymentRecord: 'paymentRecordRepositoryMySQL.ts',
    getPaymentRecords: 'paymentRecordRepositoryMySQL.ts',
    getPaymentRecordByIdName: 'paymentRecordRepositoryMySQL.ts',
    updatePaymentRecord: 'paymentRecordRepositoryMySQL.ts',

    // User
    getAllUsers: 'userRepositoryMySQL.ts',
  }
}

// Step 10: Generate Use Case to Repository Mapping
const repositoryMap: Record<string, string> = getRepositoryMapping()

// Step 11: Process Each Controller
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

  const repoFile = repositoryMap[baseName] || null
  const repoPath = repoFile ? path.join(repositoriesDir, repoFile) : null

  const useCaseExists = fs.existsSync(useCasePath)
  const repoExists = repoPath && fs.existsSync(repoPath)

  console.log(`📝 Checking: ${baseName}`)
  console.log(`  🔹 Controller: ${controllerFile}`)
  console.log(`  🔹 Use Case: ${useCaseFile} → Exists? ${useCaseExists}`)
  console.log(`  🔹 Repository: ${repoFile} → Exists? ${repoExists}`)

  return {
    name: `${baseName}.test.ts`,
    controller: controllerFile,
    useCase: useCaseExists ? useCaseFile : null,
    repo: repoExists ? repoFile : null,
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
  repositoryFile: string
) {
  const controllerPath = path.join(controllersDir, controllerFile)
  const useCasePath = path.join(useCasesDir, useCaseFile)
  const repositoryPath = path.join(repositoriesDir, repositoryFile)

  const controllerCode = readFileContent(controllerPath)
  const useCaseCode = readFileContent(useCasePath)
  const repositoryCode = readFileContent(repositoryPath)

  if (!controllerCode || !useCaseCode || !repositoryCode) {
    console.error(
      `❌ Skipping test generation for ${fileName} due to missing files.`
    )
    return
  }

  // Step 14: Creating an Integration Test Prompt
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
    
    YOU MUST GENERATE a **complete and exhaustive integration test** in TypeScript".
    
    MANDATORY REQUIREMENTS (DO NOT IGNORE ANY):  
    - The test **MUST** be written using **Jest** as the testing framework.  
    - The test **MUST** use **fp-ts/Either** for handling errors.  
    - The **Repository MUST be properly mocked** to isolate dependencies.  
    - **ALL POSSIBLE CASES, including both SUCCESS and FAILURE scenarios, MUST be covered completely.**  
    - **DO NOT SKIP ANY CONTENTS OR EDGE CASES.**  
    - **DO NOT wrap the output inside code blocks like \`\`\`typescript**.  
    - **The output MUST ONLY contain valid TypeScript Jest test code—NO COMMENTS, NO EXPLANATIONS, NO EXTRA TEXT.**  
    - **FAILURE TO FOLLOW THESE INSTRUCTIONS WILL BE CONSIDERED AN ERROR.**
    
    NOW, GENERATE THE TEST.
  `

  // Step 15: Creating a Unit Test Prompt
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

    YOU MUST GENERATE a **complete and exhaustive unit test** in TypeScript".

    MANDATORY REQUIREMENTS (DO NOT IGNORE ANY):  
    - The test **MUST** be written using **Jest** as the testing framework.  
    - The test **MUST** use **fp-ts/Either** for handling errors.  
    - The **Repository MUST be properly mocked** to isolate dependencies.  
    - **ALL POSSIBLE CASES, including both SUCCESS and FAILURE scenarios, MUST be covered completely.**  
    - **DO NOT SKIP ANY CONTENTS OR EDGE CASES.**  
    - **DO NOT wrap the output inside code blocks like \`\`\`typescript**.  
    - **The output MUST ONLY contain valid TypeScript Jest test code—NO COMMENTS, NO EXPLANATIONS, NO EXTRA TEXT.**  
    - **FAILURE TO FOLLOW THESE INSTRUCTIONS WILL BE CONSIDERED AN ERROR.**

    NOW, GENERATE THE TEST.
  `

  try {
    // Step 16: Sending API Requests to OpenAI for Integration Test
    const integrationResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: integrationPrompt }],
      max_tokens: 4000,
    })

    // Step 17: Sending API Requests to OpenAI for Unit Test
    const unitResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: unitPrompt }],
      max_tokens: 4000,
    })

    // Step 18: Saving the Generated Integration Test
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
  for (const { name, controller, useCase, repo } of detectedTestFiles) {
    if (controller !== null && useCase !== null && repo !== null) {
      await generateTest(name, controller, useCase, repo)
    }
  }
}

// Step 21: Start Test Generation
generateAllTests()
