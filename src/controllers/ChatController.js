import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI('https://api.openai.com/v1/assistants', process.env.OPEN_AI_API_KEY, 'org-crYRH6NMuttjcTeEX8dfVUjq',);

async function main() {
    const messageThread = await openai.beta.threads.create({
        messages: [
            {
                role: "user",
                content: "Hello, what is AI?"
            },
        ],
    });

    console.log(messageThread);
}

main();
async function main() {
    const threadMessages = await openai.beta.threads.messages.create(
        "thread_abc123",
        { role: "user", content: "How does AI work? Explain it in simple terms." }
    );

    console.log(threadMessages);
}

main();