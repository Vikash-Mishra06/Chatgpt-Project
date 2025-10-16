const { Pinecone } = require("@pinecone-database/pinecone");

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

const ChatGptIndex = pc.Index("chat-gpt-project");

async function createMemory({ vectors, metadata, messageId }) {
  await ChatGptIndex.upsert([{
    id: messageId,
    values: vectors,
    metadata,
  }]);
}

async function queryMemory({ queryVector, limit = 5, metadata }) {
  const data = await ChatGptIndex.query({
    vector: queryVector,
    topK: limit,
    filter: metadata ? { metadata } : undefined,
    includeMetadata: true,
  });

  return data.matches;
}

module.exports = { createMemory, queryMemory };
