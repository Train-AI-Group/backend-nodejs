const fetch = require('node-fetch');

const walletAddress = '4p6-PFZPeZy5izieR9z35aDvyTHBCXZbkLQjfFNoZDg';
const privateKey = {
  "kty": "RSA",
  "e": "AQAB",
  "n": "p3Z-46OXT6SBQuHk57xgOMrWsGKhkYkZ3taLZqKx4T5lUGxCNSjo6WJQB75dMCRPbCnH7q7mV5QCJOQhX-ArnNMucSB-c35V8Pt5jVcE06DHlQRxiH56kcH4LSS_KjA-2-B8RMI9Fgg_W1x_ETT740F44kjR9ATonTRz4qDZHShjie0QI55MnXtghEJ_mJcTgiT0M9B-NphVMbMBna4bGroEHbp0mGbbvEzwfzWJAB65BjDPOe7InjQIEUSFbprgUedVqofmzekuE2VLaS3R7DgNXgb4lCb7Hu9bZC37x_MPHjlpkR5oTq7Uery2Q9VpT_efFwL43uQR7rk5QsMmuJdkn_rTIdBQR4EXXIa4GDIlTg-Tf651cMEMNsZU9l1IZ44ShzT4eJ_U8YXg1QITidTZq4AWmD4d5khgH2qLmLY85yHmzXVcqLDrH2IoFlItQZlIyZqKvXnMmh-4tSMaFvJvZt39cYsD-fPZjlmXSMqXHdZwL6v_-tV1jetGQpjnfMqq7aeJye--ecOozeb9PFGFw8jVKVMh42JGosdeNUQdAFQJmQFcYeNCgpEjx3Esl5pmblOjRCV5EZl8PzaXk3IkzSRYNM47IamL10_gzvFAeERzdlBfVops-iGcGOKBP79HPfOKkBKNYrLwBlaT2E7WK89OOfbsZfxJe-09Rwc",
  "d": "DakK3MLheuuuZ6hJpeWl67wQGz9QcrC-XYEeyfaHkBoo5ZCPLgryROdyI8-RhnXPzMDzwDKgM5CtRBkf59Q_eoF3jl7aMc2icQ_ycGciy6iX3z4HjNzUXsN13SjcNzLMTd9YA7vcg8mUcX1wGBU8XuNeWwcZqVAlMX2v3lLEoy5CQGQIJv-ovEfuLZvHEMlyG_GrwfZF9WojuPQjM5uaNmnqIAqvrCbn0cps69OQI2ReL3UX0l_6GX2hEteGEumrVsMKJ-kCGNXmnkprBl9oel5wKLVk3aD4ZyObTua5XSwklZCVXfMfCxwT1RdDvvDPsGhAn_3sEzKDi_esBhgpNk_K8Gce2DIgqLHzJW4Ezig4aZ4IeDWyHN5GdWD2uDmEAjicI4Kdy_Tg0h2ZrewK5GlJEYxXLH8s3xzJg98JqRmXB4VEl4lSk7zrJRUICKOZ4-2uax59B1QhtyCxI4OtXxr3Q0bTKIVqd0q8fZcqPrjXI_IAHFjNpvUIJgeZ3Wap6D8JeN_XzqnIcbM2XaAZvhEBOAfwlVI0IQV2SiZ1EKGUcPnPVHgEA1OFUagBMY9Dgr75I-kELWis_5lLWSrQlg8gISGVdcjD0wfVJAjaMGr3gL23IU00xjmxJ-a5zG0eXUsVKMtYp6QwO29c-9MV2pELbtMK81u3Z_zBLKE87qE",
  "p": "0YZofDwVRA8BL-JxipKflV3HtNiqlIsGrAOZ1hawaL4-3UKUlstUbhBJJo7apDlS_uCADAgB-5XnspdN_KCqFxvJnwCcfjL-IEJLtEwNXWBYvCvs4qEatju3XQtmfBgcvYSqK3gwjXfRtvSXBm3s7RBlx4TY4fidw8KaCzux_gQvEUdVwCeecoLI7VmtpcqmniJVjNlEQ7oDlr-OR1pDOwb7EicSMdwLDe3ZWksDcOkF2YoalY5Iu5GZKVzD1kyzFIS6VaxCV1DHYxFDcgqkG46CPNnRnPuI_FWI2iynxBq1Eh8zYdagJKTu1QHM_NxUvELsRjGaMbU4nz7BZnuMXw",
  "q": "zJulPzmDEVZ_LUyy_3y2JSHYmggDcn1l8gNcs-bfLhZ6c2elSxQ2jOgLw5qYsSKxOYGCifROIF7k7zS44pdQ64y13wboLrSU2U7-AI21dcfbMFKNYBUHjo3CwL-viP0ONP698C1dsdcEdQcLpSaWPA9xzWh_QdcbDJH0v8VefZ1YmNcA50FLsDoWX1s_vdP0GL_-OIG5cixvwr_kSmudb_155XMhOis6mk3OBfZI0M4m2Ri3oDJdKBbE2bb41JJ48ffJ8CnrFEnY_7HYP5wRftVQqv6J9s9h-us3DhT6OJq3z83s2v7It812eN7X8kxD78MLgiGVxzCtyWaanUjGWQ",
  "dp": "Q2MtO7e_RzJkOVhlGCJsPQf6cQm2YywLq0tFMPv_JND7OwJs88rVjsiiHkqXu3XMYbkmtbflm1rtOB09seCik-gWApOZwWT5Irrvyj8jlUKlh2_BMmqKQs4V_VDrV0ISDEocyPpQ8070HhmwcRrttpktguwRLSxe4VU3YiGC76W81ZvR0olrhnzVzrCnDsmMqRN13GUMdZPgD53wTraTJOrr2TzDt1GEJKi43Td_FdN8VCj8v9kRP3Jmhk0Vl1j3x8OggmlytM6AMjadMJKHkW1WKegMaKblufJwn2r5UjMcxYVPa0oyG1cIkW2Q1kqu3hXQFAtkAlS8r0rpvOJDlQ",
  "dq": "fJTIqRZ7l7Ly_MIWuzlULofNOvxmHO_9gr5JU8DfY1CMfng9TNmh3Wnsv80B69kTz8_ri9QVPeCJxJx1doJr4wBqPMIX3VhWyXovbmbadjyaWXHqYvZrA4GNc49DckWiwOHbBMKaqg4hyJ_hl01HbIp64HcgBRbUgXLdc2bZgeKsb2N6SVSYoVS9CpKk3RCRMAC26fES2VH1Or9cYXPlCKtt7SeMs75ekFWPfFHZREpBnS5PoFsKHb6_XVDrcYM94Rbe_jyHxnKwjf_bi9-bR37a_0K8_mqHXiCaBRkAwjZydTUNYsp_rGqOGEqXchC9zN8VwsZwTDh3mInA2sPVAQ",
  "qi": "VthMHhoj8UMr7jz_QAZB57Hui2m6kJvDoAJaStd_9RMk5HCrgRa4BOdz9rEgy7uxTBfPDGZ8NLGtPyIKQLuXJ03y_WK7NN-B_bWTJ8KisRu8xGl1DPe3YpPDLPUlnRaQip-e-G0-CeFCJ9t-owvEccwNnX94d51EngZT2tUckJu0HzTBLEU3QrhhlwCKvKFr3AgbdKFmWmEfJBArSMIQY66Jd8ScmNKwMbRynf_tod6k5pJMGZGrTciuTkhiTnTg90rAatM92Jkl4ez_-5-chhhINwTNf0APJHtakEFHP8FN6cpvvjsUFqiS6DQTV-RMPodALnbsvRvi3ltXsizB9Q"
};
var data = 'Sample dataset to upload to Arweave';

const backendUrl = 'http://localhost:3000/upload';

async function testUpload() {
  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ walletAddress, privateKey, data }),
    });

    const textResponse = await response.text();
    console.log("Raw response:", textResponse);

    const result = JSON.parse(textResponse);

    if (response.ok) {
      console.log('Success:', result.message);
      console.log('Transaction ID:', result.transactionId);
    } else {
      console.log('Error:', result.message);
    }
  } catch (error) {
    console.error('Request failed', error);
  }
}

testUpload();
