import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { OpenAI } from "@langchain/openai";

import { CONFIGS } from "./configs";

async function generatePetName(petType: string, petColor: string, numberOfNames: number) {
    const llm = new OpenAI({
        apiKey: CONFIGS.OPENAI_API_KEY,
        temperature: 0.7,
    });

    const prompt = new PromptTemplate({
        inputVariables: ["pet_type", "pet_color", "number_of_names"],
        template: "I have a {pet_color} {pet_type} pet and I want a cool name for it. Suggest me {number_of_names} cool names for my pet.",
    });

    const outputParser = new StringOutputParser();

    const chain = prompt.pipe(llm).pipe(outputParser);

    const petNames = await chain.invoke({
        pet_type: petType,
        pet_color: petColor,
        number_of_names: numberOfNames,
    });

    return petNames;
}

generatePetName("dog", "brown", 5).then((petNames) => {
    console.log(petNames);
});
