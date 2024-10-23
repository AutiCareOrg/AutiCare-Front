const OpenAI = require("openai");
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
  });

async function main() {
    const myThread = await openai.beta.threads.create();
    console.log("This is the thread object: ", myThread, "\n");

    const myThreadMessage = await openai.beta.threads.messages.create(
        (thread_id = myThread.id),
        {
            role: "user",
            content: "Existe relação entre seletividade alimentar e autismo?",
        }
    );
    console.log("This is the message object: ", myThreadMessage, "\n");

    const myRun = await openai.beta.threads.runs.create(
        (thread_id = myThread.id),
        {
            assistant_id: 'asst_x72FMQeaye8irRUn0ohzY8pn'
        }
    );
    console.log("This is the run object: ", myRun, "\n");

    const retrieveRun = async () => {
        let keepRetrievingRun;

        while (myRun.status === "queued" || myRun.status === "in_progress") {
            keepRetrievingRun = await openai.beta.threads.runs.retrieve(
                (thread_id = myThread.id),
                (run_id = myRun.id)
            );
            console.log(`Run status: ${keepRetrievingRun.status}`);

            if (keepRetrievingRun.status === "completed") {
                console.log("\n");

                const allMessages = await openai.beta.threads.messages.list(
                    (thread_id = myThread.id)
                );

                console.log(
                    "------------------------------------------------------------ \n"
                );

                console.log("User: ", myThreadMessage.content[0].text.value);
                console.log("Assistant: ", allMessages.data[0].content[0].text.value);

                break;
            } else if (
                keepRetrievingRun.status === "queued" ||
                keepRetrievingRun.status === "in_progress"
            ) {
            } else {
                console.log(`Run status: ${keepRetrievingRun.status}`);
                break;
            }
        }
    };
    retrieveRun();
}

main();