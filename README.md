# SOARS

SOARS is an AI-powered personal digital library for saving, organizing, managing, and retrieving links, files, and notes in one workspace.

It uses **Gemma 4 E2B** through Ollama to provide AI-powered resource analysis, summaries, tags, and recommendations.

## Prerequisites

Install the following before running the application:

- [Node.js](https://nodejs.org/) (LTS version)
- [Git](https://git-scm.com/)
- [Ollama](https://ollama.com/)
- npm (included with Node.js)

## Installation

**1. Clone the repository**

```bash
git clone https://github.com/codthathing/SOARS.git
```

**2. Navigate into the project directory**

```bash
cd SOARS
```

**3. Install project dependencies**

```bash
npm install
```

## Install the AI Model

SOARS uses the Gemma 4 E2B model locally through Ollama.

Download the model by running:

```bash
ollama pull gemma4:e2b
```

Make sure Ollama is installed and running before using the AI features.

## Environment Variables

Create a `.env.local` file in the root directory of the project and add the following:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:4000
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=gemma4:e2b
```

Save the file before proceeding.

## Running the Application

SOARS requires two terminal sessions to run the mock API server and the Next.js application.

**1. Start the Mock API Server**

Open a terminal in the project directory and run:

```bash
npm run mock-api
```

The mock API server will be available at:

```text
http://127.0.0.1:4000
```

Keep this terminal running.

**2. Start the Next.js Development Server**

Open a second terminal in the same project directory and run:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

Open the address in your browser to access SOARS.

**3. Ensure Ollama Is Running**

Ollama must be running locally for AI-powered features such as resource analysis, summaries, tag generation, and AI-assisted resource retrieval.

If Ollama is not already running, start the Ollama application before using these features.

## Technology Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **AI Model:** Gemma 4 E2B
- **AI Runtime:** Ollama
- **Mock Backend:** JSON Server
- **State Management:** Redux Toolkit

## Acknowledgements

ChatGPT was used during the development process for brainstorming, exploring implementation approaches, and refining ideas.

