# Automated Test File Generation

## Overview
This script automates the process of generating **unit tests** and **integration tests** for a Node.js TypeScript project. It detects controllers, maps them to their corresponding use cases and repositories, and then generates Jest-based test cases using OpenAI's GPT-4o model.

## Features
- **Automated Detection**: Scans the project directories to detect controllers, use cases, and repositories.
- **Integration & Unit Tests**: Generates both integration and unit tests separately.
- **Jest Framework**: Ensures all tests are written using Jest.
- **Error Handling with fp-ts/Either**: Implements error handling patterns for functional programming.
- **Mocking Repositories**: Uses mocked repositories to isolate dependencies during integration and unit tests.
- **Edge Case Coverage**: Ensures exhaustive test coverage for both success and failure scenarios.

## Directory Structure
```
/project-root
│── src/
│   ├── interface
│           ├── /controllers/
│   ├── application
│           ├── /use_cases/
│   ├── infrastructure
│           ├── /repositories/
│── test/
│   ├── test4o/
│   │   ├── integration/
│   │   ├── unit/
│── .env
│── package.json
│── AIGenerate.ts (this script)
```

## Installation
Ensure you have the required dependencies:
```sh
npm install openai dotenv fs path
```
Also, set up your OpenAI API key in a `.env` file:
```sh
OPENAI_API_KEY=your_openai_api_key
```

## Script Creation
### Explanation of the Code

This script is an **automated test generator** for a **Node.js** and **TypeScript** project. It uses **OpenAI’s GPT-4o** model to generate **unit and integration tests** for detected controllers, their corresponding use cases, and repository files. 

---

### Step-by-Step Breakdown

### Step 1: Importing Required Modules
```typescript
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
```
- **OpenAI**: Used to interact with OpenAI’s API.
- **fs (File System)**: Helps in reading/writing files.
- **path**: Manages file and directory paths.
- **dotenv**: Loads environment variables from a `.env` file.

---

### Step 2: Loading Environment Variables
```typescript
dotenv.config();
```
- Loads API keys and other sensitive information from a `.env` file.

---

### Step 3: Initialize OpenAI API
```typescript
const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});
```
- Initializes OpenAI with the API key stored in the `.env` file.

---

### Step 4: Define Paths to Different Files
```typescript
const controllersDir = path.join(__dirname, "./src/interface/controllers");
const useCasesDir = path.join(__dirname, "./src/application/use_cases");
const repositoriesDir = path.join(__dirname, "./src/infrastructure/repositories");
```
- Defines paths for **controllers, use cases, and repositories** within the project.

---

### Step 5: Define Test Output Directory
```typescript
const testOutputDir = path.join(__dirname, "./test/test4o");
```
- Specifies where generated test files will be saved.

---

### Step 6: Ensure Test Directory Exists
```typescript
fs.mkdirSync(testOutputDir, { recursive: true });
```
- Creates the test output directory if it doesn't already exist.

---

### Step 7: Recursively Get All TypeScript Files
```typescript
const getAllTsFiles = (dir: string): string[] => {
  let files: string[] = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getAllTsFiles(fullPath));
    } else if (entry.name.endsWith(".ts")) {
      files.push(fullPath);
    }
  });
  return files;
};
```
- Scans the given directory and **recursively** collects all `.ts` (TypeScript) files.

---

### Step 8: Detect Controller Files
```typescript
const detectedControllers = getAllTsFiles(controllersDir);
```
- Calls the function to get all **controller** files.

---

### Step 9: Define Mapping of Use Cases to Repositories
```typescript
function getRepositoryMapping(): Record<string, string> {
  return {
    "createTask": "taskRepositoryMySQL.ts",
    "deleteTask": "taskRepositoryMySQL.ts",
    "findAllTasks": "taskRepositoryMySQL.ts",
    "findTaskById": "taskRepositoryMySQL.ts",
    "updateTask": "taskRepositoryMySQL.ts",
    "createPaymentRecord": "paymentRecordRepositoryMySQL.ts",
    "getPaymentRecords": "paymentRecordRepositoryMySQL.ts",
    "getPaymentRecordByIdName": "paymentRecordRepositoryMySQL.ts",
  };
}
```
- Returns a **mapping** that links **use case methods** to their respective **repository files**.

---

### Step 10: Generate Use Case to Repository Mapping
```typescript
const repositoryMap: Record<string, string> = getRepositoryMapping();
```
- Calls the function to generate a **repository mapping**.

---

### Step 11: Process Each Controller
```typescript
const detectedTestFiles = detectedControllers.map((controllerPath) => {
  const controllerFile = path.relative(controllersDir, controllerPath);
  const baseName = path.basename(controllerFile, ".ts").replace("Controller", "");

  const useCaseFile = path.join(path.dirname(controllerFile), `${baseName}UseCase.ts`);
  const useCasePath = path.join(useCasesDir, useCaseFile);

  const repoFile = repositoryMap[baseName] || null;
  const repoPath = repoFile ? path.join(repositoriesDir, repoFile) : null;

  const useCaseExists = fs.existsSync(useCasePath);
  const repoExists = repoPath && fs.existsSync(repoPath);

  return {
    name: `${baseName}.test.ts`,
    controller: controllerFile,
    useCase: useCaseExists ? useCaseFile : null,
    repo: repoExists ? repoFile : null,
  };
});
```
- Maps each detected **controller** to its respective **use case** and **repository**.
- Checks if the respective files exist.

---

### Step 12: Read File Content
```typescript
const readFileContent = (filePath: string): string | null => {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    return null;
  }
};
```
- Reads the content of a file and returns it as a string.
- Returns `null` if the file is not found.


---

## Step 13: Function to Read File Content Safely
```typescript
const readFileContent = (filePath: string): string | null => {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    console.warn(`⚠️ Warning: File not found - ${filePath}`);
    return null;
  }
};
```
### Explanation
- This function **reads the content** of a given TypeScript file.
- If the file is missing, it **logs a warning** instead of crashing the program.
- The function ensures that missing files **do not stop the script execution**.

---

## Step 14: Creating an Integration Test Prompt
```typescript
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
  `;
```
### Explanation
- The prompt is **strictly structured** to ensure that OpenAI follows **Jest** and **fp-ts/Either** patterns.
- It **provides the controller, use case, and repository code** so OpenAI can generate relevant tests.
- **It enforces complete coverage**, including **success and failure scenarios**.
- The output is **pure TypeScript code**, with **no comments or extra text** to keep it clean.

---

## Step 15: Creating a Unit Test Prompt
```typescript
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
  `;
```
### Explanation
- This prompt is similar to the **integration test prompt**, but it focuses on **unit testing**.
- The tests must **fully cover success and failure scenarios**.

---

## Step 16: Sending API Requests to OpenAI for Integration Test
```typescript
const integrationResponse = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: integrationPrompt }],
  max_tokens: 4000,
});
```
### Explanation
- This sends the **integration test prompt** to OpenAI’s **GPT-4o** model.
- The model is instructed to **return only valid TypeScript Jest code**.
- **max_tokens: 4000** ensures the response is long enough to cover all scenarios.

---

## Step 17: Sending API Requests to OpenAI for Unit Test
```typescript
const unitResponse = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: unitPrompt }],
  max_tokens: 4000,
});
```
### Explanation
- This sends the **unit test prompt** to OpenAI’s **GPT-4o** model.
- The model is instructed to **return only valid TypeScript Jest code**.
- **max_tokens: 4000** ensures the response is long enough to cover all scenarios.

---

## Step 18: Saving the Generated Integration Test
```typescript
if (integrationResponse?.choices?.[0]?.message?.content) {
  const filePath = path.join(testOutputDir, "integration", fileName);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, integrationResponse.choices[0].message.content.trim(), { encoding: "utf8" });
  console.log(`✅ Generated Integration Test: ${filePath}`);
}
```
### Explanation
- **Checks if OpenAI returned a valid response**.
- Constructs the **file path** for the integration test.
- **Creates the directory if it doesn't exist**.
- **Writes the generated test to a file**.

---

## Step 19: Saving the Generated Unit Test
```typescript
if (unitResponse?.choices?.[0]?.message?.content) {
  const unitFilePath = path.join(testOutputDir, "unit", fileName);
  fs.mkdirSync(path.dirname(unitFilePath), { recursive: true });
  fs.writeFileSync(unitFilePath, unitResponse.choices[0].message.content.trim(), { encoding: "utf8" });
  console.log(`✅ Generated Unit Test: ${unitFilePath}`);
}
```
### Explanation
- **Checks if OpenAI returned a valid response**.
- Constructs the **file path** for the unit test.
- **Creates the directory if it doesn't exist**.
- **Writes the generated test to a file**.


### Step 20: Generate All Tests
```typescripe
async function generateAllTests() {
  for (const { name, controller, useCase, repo } of detectedTestFiles) {
    if (controller !== null && useCase !== null && repo !== null) {
      await generateTest(name, controller, useCase, repo);
    }
  }
}
```
- Iterates over detected test files and generates tests for each.

---

### Step 21: Start Test Generation
```typescript
generateAllTests();
```
- **Runs the entire process**, automatically generating tests.



## Running the Script
To execute the test generation process, run:
```sh
yarn test:generate
```
OR

```sh
npm test:generate
```
This will generate test files automatically and store them in the `test/test4o/` directory.

## Note
- Please review the generated testcases for correctness and completeness.
- If any issues are found, adjust the test generation process accordingly.

