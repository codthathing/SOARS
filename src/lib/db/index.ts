
import "server-only";

import {
  readFile,
  writeFile,
  rename,
  mkdir,
} from "node:fs/promises";
import path from "node:path";
import type { Database } from "./types";

const DB_DIR = process.cwd();
const DB_PATH = path.join(DB_DIR, "db.json");

let writeQueue: Promise<void> = Promise.resolve();

async function ensureDatabase() {
  await mkdir(DB_DIR, { recursive: true });

  try {
    await readFile(DB_PATH, "utf-8");
  } catch {
    await writeFile(
      DB_PATH,
      JSON.stringify(
        { resources: [], collections: [], tags: [] },
        null,
        2
      )
    );
  }
}

export async function readDatabase(): Promise<Database> {
  await ensureDatabase();

  const content = await readFile(DB_PATH, "utf-8");
  return JSON.parse(content) as Database;
}

export function writeDatabase(database: Database): Promise<void> {
  const nextWrite = writeQueue.then(async () => {
    const tempPath = `${DB_PATH}.tmp`;

    await writeFile(
      tempPath,
      JSON.stringify(database, null, 2),
      "utf-8"
    );

    await rename(tempPath, DB_PATH);
  });

  writeQueue = nextWrite.catch(() => {});

  return nextWrite;
}
