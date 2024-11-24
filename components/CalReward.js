import {
   connect,
   createDataItemSigner
   // message, createDataItemSigner, dryrun, result, spawn
} from "@permaweb/aoconnect";

const { result, results, message, spawn, monitor, unmonitor, dryrun } = connect(
   {
      // MU_URL: "https://mu.ao-testnet.xyz",
      // CU_URL: "https://cu.ao-testnet.xyz",
      // GATEWAY_URL: "https://localhost:1984",
   },
);

// Function to send a message to the "calReward" process
const privateKey = "";

const calReward = async (req, res) => {
   const { fieldsOfStudy, domains, tasksOrMethods, cleanOrUnclean } = req.query;

   if (!fieldsOfStudy || !domains || !tasksOrMethods || !cleanOrUnclean) {
      return res.status(400).json({ error: 'Missing required parameters.' });
   }

   const processId = await spawn({
      // The Arweave TXID of the ao Module (your Lua script)
      module: "module TXID",  // Replace with the TXID of the Lua script you uploaded
      scheduler: "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA",  // wallet address of the Scheduler Unit
      signer: createDataItemSigner(privateKey),
      tags: [
         { name: "Authority", value: "fcoN_xJeisVsPXA-trzVAuIiqO3ydLQxM-L4XbrQKzY" }, // Messaging Unit for receiving messages
         { name: "Category", value: "calReward" },  // Your custom tag for this process, can be adjusted
      ],
   });

   console.log("Process ID:", processId);

   const messageId = await message({
      process: processId,
      tags: [
         { name: "Action", value: "calReward" }, // Required action name
         { name: "fieldsOfStudy", value: "Computer Science" },
         { name: "domains", value: "NLP" },
         { name: "tasksOrMethods", value: "Classification" },
         { name: "cleanOrUnclean", value: "Unclean" },
      ],
      signer: createDataItemSigner(privateKey),
      data: "",
   });

   console.log("Message ID:", messageId);

   let { Messages, Spawns, Output, Error } = await result({
      message: messageId,
      process: processId,
   });

   // console.log("Messages:", Messages);
   // console.log("Spawns:", Spawns);
   // console.log("Output:", Output);
   // console.log("Error:", Error);
   const removeAnsiEscapeSequences = (str) => {
      return str.replace(/\x1B\[[0-9;]*m/g, ''); 
   };
   const cleanedData = removeAnsiEscapeSequences(Output.data);
   const numberData = parseFloat(cleanedData);

   res.json({ totalPoints:numberData });
}
// calReward({ query: { fieldsOfStudy: "Computer Science", domains: "NLP", tasksOrMethods: "Classification", cleanOrUnclean: "Unclean" } }, { json: console.log });
export { calReward };
