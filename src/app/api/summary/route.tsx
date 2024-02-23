import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../../sanity/lib/client";
import { randomUUID } from "crypto";
import { chatGpt } from "@/openai/openai";
import OpenAI from "openai";
import { error } from "console";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body: { bookId: string; title: string; author: string; lang: string } =
    await req.json();
  // The default sort is by popularity
  // Use the URL parameter "per_page" to get 100 instead of the default 30 books

  try {
    // generate summary from chat gpt
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [
        {
          role: "user",
          content: `give me summary of book "${body.title}" by ${body.author} in ${body.lang} language, it should be two part first overall summary and then chapter wise summary.`,
        },
      ],
      model: "gpt-3.5-turbo",
    };
    const chatCompletion: OpenAI.Chat.ChatCompletion =
      await chatGpt.chat.completions.create(params);

    //   console.log("ChatCompletion : ",chatCompletion);

    const summaryGen: string =
      chatCompletion?.choices[0]?.message.content || "";
    if (summaryGen.match("I'm sorry,")) {
      throw error("Chat Gpt unable to generate summary");
    }
    //await handleSummarizeRequest(body?.title,body?.author);
    // console.log("Summary : => ",summaryGen);
    // if generated successfully

    const summaryData = {
      _key: randomUUID(),
      language: body.lang,
      summary: summaryGen,
    };

    // add to santiy

    // Check if the document with the given ID exists
    // const book = await client.fetch('*[_type == "book" && id == $bookId][0]', {
    //   bookId: body.bookId,
    // });
    // if (book) {
    //   const updatedBook = Object.assign({}, book, {
    //     summaries: [...book?.summaries, summaryData],
    //   });
    //   // console.log(updatedBook);
    //   const response = await client.createOrReplace(updatedBook);
    //   //   console.log("Operation completed:", response);
    // } else {
    //   // Document does not exist, create a new document with the given ID and add the summary
    //   // console.log("New book")
    //   const newBook = {
    //     id: body.bookId,
    //     _type: "book",
    //     summaries: [summaryData],
    //     audios: [],
    //   };
    //   const response = await client.create(newBook);
    //   //   console.log("Operation completed new book:", response);
    // }
    // // if successful
    const respData = {
      status: "Generated Summary",
      summary: summaryGen,
    };
    return NextResponse.json(
      { message: "ok", respData },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1800",
        },
      }
    );
  } catch (error) {
    console.error(
      "An error has occurred with generating and saving summary.\n",
      error
    );
    return NextResponse.json(
      {
        status: "Error ",
      },
      {
        status: 404,
      }
    );
  }
};
