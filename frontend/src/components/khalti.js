import axios from "axios";

let config = {
   // replace this key with yours
   publicKey: "test_public_key_f9717cc6cab34bf6842ec2080385c408",
   productIdentity: "1234567890",
   productName: "Food",
   productUrl: "localhost:3000/order/:id/pay",
   eventHandler: {
      onSuccess(payload) {
         // hit merchant api for initiating verfication
         let data = {
            token: payload.token,
            amount: payload.amount,
         };

         let config = {
            headers: {
               Authorization: "test_secret_key_41dbbf68a6f2429c992eb9222b0b57f",
            },
         };

         axios
            .post("https://khalti.com/api/v2/payment/verify/", data, config)
            .then((response) => {
               console.log(response.data);
            })
            .catch((error) => {
               console.log(error);
            });
      },
      // onError handler is optional
      onError(error) {
         // handle errors
         console.log(error);
      },
      onClose() {
         console.log("widget is closing");
      },
   },
   paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
   ],
};

export default config;
