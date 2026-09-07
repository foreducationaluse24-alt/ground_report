import { pipeline } from "@huggingface/transformers";

const extractorPromise = await pipeline("feature-extraction","Xenova/all-MiniLM-L6-v2");


export async function generateEmbeddings(text : string){

    const extractor = await extractorPromise;
    const result =  await extractor(text,{
        normalize : true,
        pooling : `mean`
    });

    return Array.from(result.data); //Float32Array([a,b,c])   => [a,b,c]
}