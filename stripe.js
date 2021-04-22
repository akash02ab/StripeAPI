const readlineSync = require("readline-sync");
const Stripe = require("stripe");
const stripe = Stripe(
	"sk_test_51IitLvSC99kgiUulI5qQ2XyGivEPtJJ6s5BmTbFKm1JOsGpDf82PLKDIhHyxVLCGq3WAqmNNytqtxSxYWCh6dgjL00pxFNx9eS"
);

async function getToken(cardNum, exp_mnt, exp_yr, cvc, amt) {
    try {
        const token = await stripe.tokens.create({
            card: {
                number: cardNum.toString(),
                exp_month: exp_mnt,
                exp_year: exp_yr,
                cvc: cvc.toString(),
            },
        });
    
        tokenData = await token;
        tokenID = tokenData.id;
        console.log(tokenData.id);
    }
    catch(error) {
        console.log(error.raw.message);
        return;
    }
	
	try {
        const charge = await stripe.charges.create({
            amount: amt,
            currency: "inr",
            source: tokenID,
            description: "My First Test Charge (created for API docs)",
        });
    
        let chargeData = await charge;
        console.log(chargeData.id);
        console.log('Payment Sucessful');
    }
    catch(error) {
        console.log(error.raw.message);
    }
	
}

let cardNum = readlineSync.question('Enter your card number: ');
let exp_mnt = readlineSync.question('Enter card expiry month: ');
let exp_yr = readlineSync.question('Enter card expiry year: ');
let cvc = readlineSync.question('Enter card CVC code: ');
let amt = readlineSync.question('Enter amount: ');
getToken(cardNum, exp_mnt, exp_yr, cvc, amt);
