import {createDataItemSigner,message, result} from "@permaweb/aoconnect";

const calReward = async (req, res) => {
   const { fieldsOfStudy, domains, tasksOrMethods, cleanOrUnclean,privateKey } = req.body;
   // console.log("req.body : ",req.body);
   
   if (!fieldsOfStudy || !domains || !tasksOrMethods || !cleanOrUnclean || !privateKey) {
      return res.status(400).json({ error: 'Missing required parameters.' });
   }

   const processId = "tKALrCUqCkJvlDLFO5fuifrfmbyNti1rkYxZDr89yXE";
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
