import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import bodyParser from "body-parser";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
// app.use(express.json());

app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "100mb",
    parameterLimit: 100000,
  })
);
app.use(bodyParser.text({ limit: "500mb" }));

app.post("/", async (req, res) => {
  try {
    const input = req.body.content;
    const response = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: input,
            },
          ],
        },
      ],
      max_tokens: 256,
      top_p: 1,
      response_format: {
        type: "text",
      },
    });
    res.status(200).send({
      res: response.data.choices[0].message.content,
    });
    console.log(response.data.choices[0].message.content);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});
// app.post("/", async (req, res) => {
//   try {
//     // const content = req.body.messages[0].content; // for Postman test
//     const content = req.body.content;
//     console.log("content:", content);
//     const response = await openai.createChatCompletion({
//       messages: [{ role: "system", content: messages_default + content }],
//       model: "gpt-4-turbo",
//     });
//     res.status(200).send({
//       res: response.data.choices[0].message.content,
//     });
//     console.log(response.data.choices[0].message.content);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error });
//   }
// });

const port = 4000;
app.listen(port, () => console.log("Server is running on port 4000."));
