import { ChatOpenAI } from "@langchain/openai";

import { CONFIGS } from "./configs";

async function generatePetName() {
    const llm = new ChatOpenAI({
        apiKey: CONFIGS.OPENAI_API_KEY,
        temperature: 0.7,
    });

    const response = await llm.invoke("I have a Cat pet and I want a cool name for it. Suggest me 5 cool names for my pet.");

    console.log(response.content);
}

generatePetName();
