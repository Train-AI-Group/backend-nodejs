import {
   connect,
   createDataItemSigner,
   message,dryrun, result, spawn
} from "@permaweb/aoconnect";

// Function to send a message to the "calReward" process
const privateKey = "";

const calReward = async (req, res) => {
   const { fieldsOfStudy, domains, tasksOrMethods, cleanOrUnclean } = req.body;
   // console.log("req.query : ",req.body);
   
   if (!fieldsOfStudy || !domains || !tasksOrMethods || !cleanOrUnclean) {
      return res.status(400).json({ error: 'Missing required parameters.' });
   }

   const processId = await spawn({
      // The Arweave TXID of the ao Module (your Lua script)
      module: "",  // Replace with the TXID of the Lua script you uploaded
      scheduler: "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA",  // wallet address of the Scheduler Unit
      signer: createDataItemSigner(privateKey),
      tags: [
         { name: "Authority", value: "fcoN_xJeisVsPXA-trzVAuIiqO3ydLQxM-L4XbrQKzY" }, // Messaging Unit for receiving messages
         { name: "Category", value: "calReward" },  // Your custom tag for this process, can be adjusted
      ],
   });

   console.log("Process ID:", processId);
   await new Promise((resolve) => setTimeout(resolve, 5000)); // wait for 5 seconds

   const messageId = await message({
      process: processId,
      tags: [
         { name: "Action", value: "calReward" }, // Required action name
         { name: "fieldsOfStudy", value: fieldsOfStudy },
         { name: "domains", value: domains },
         { name: "tasksOrMethods", value: tasksOrMethods },
         { name: "cleanOrUnclean", value: cleanOrUnclean },
      ],
      signer: createDataItemSigner(privateKey),
      data: "",
   });

   console.log("Message ID:", messageId);

   let { Messages, Spawns, Output, Error } = await result({
      message: messageId,
      process: processId,
   });

   // console.log("Output:", Output);
   // console.log("Error:", Error);
   const removeAnsiEscapeSequences = (str) => {
      return str.replace(/\x1B\[[0-9;]*m/g, ''); 
   };
   const cleanedData = removeAnsiEscapeSequences(Output.data);
   console.log("cleanedData : ",cleanedData);
   
   const numberData = parseFloat(cleanedData);

   res.json({ totalPoints:numberData });
}
export { calReward };
