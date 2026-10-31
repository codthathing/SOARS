# SOARS

## Prerequisites

Install the following before running the application:

- [Node.js](https://nodejs.org/) (LTS version)
- [Git](https://git-scm.com/)
- [Ollama](https://ollama.com/)
- npm (included with Node.js)

## Installation

Clone the repository:

```bash
git clone <YOUR_REPOSITORY_URL>
```

Navigate into the project directory:

```bash
cd SOARS
```

Install dependencies:

```bash
npm install
```

## Install the AI Model

Download and install the Gemma 4 E2B model using Ollama:

```bash
ollama pull gemma4:e2b
```

Ensure Ollama is running before starting the application.

## Environment Variables

Create a `.env.local` file in the project root and add:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=gemma4:e2b
```

## Running the Application

**1. Start the mock API server**

Open a terminal in the project directory:

```bash
npm run mock-api
```

The mock API server runs at:

```text
http://localhost:4000
```

**2. Start the Next.js development server**

Open another terminal in the project directory:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

**3. Ensure Ollama is running**

Ollama must be running locally for AI-powered link analysis and preview generation.

## Demo Login

Use the following credentials to access the application:

| Field | Credentials |
|---|---|
| Email | akinwunmiolusegun277@gmail.com |
| Password | #Pheezy123 |

