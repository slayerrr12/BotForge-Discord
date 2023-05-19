const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration)


async function start() {

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Say this is a test",
        temperature: 1,
        max_tokens: 99,
    });
    return response.data.choices[0].text
}


console.log(start())
