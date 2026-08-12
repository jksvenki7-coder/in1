/* =====================================================
   V3 GROUP OF BUSINESS
   ALL IN ONE APP
   INVESTMENT INTEREST FORM

   FEATURES
   - ₹99 per unit
   - Unit calculation
   - Single mobile / WhatsApp number
   - Form validation
   - Business concept selection
   - Referral code
   - Additional concept
   - WhatsApp submission
===================================================== */


/* =====================================================
   1. SETTINGS
===================================================== */

const UNIT_PRICE = 99;

/*
   IMPORTANT:
   Put your official V3 WhatsApp receiving number here.

   Format:
   India country code + 10 digit number

   Example:
   919876543210

   Do NOT use +, spaces or -.
*/
const WHATSAPP_RECEIVER = "YOUR_WHATSAPP_NUMBER";


/* =====================================================
   2. GET FORM ELEMENTS
===================================================== */

const unitsInput = document.getElementById("units");

const totalUnitsElement =
    document.getElementById("totalUnits");

const totalAmountElement =
    document.getElementById("totalAmount");

const submitButton =
    document.getElementById("submitBtn");

const nameInput =
    document.getElementById("fullName");

const mobileInput =
    document.getElementById("mobile");

const emailInput =
    document.getElementById("email");

const cityInput =
    document.getElementById("city");

const stateInput =
    document.getElementById("state");

const addressInput =
    document.getElementById("address");

const referralInput =
    document.getElementById("referralCode");

const additionalInput =
    document.getElementById("additionalConcept");

const declarationInput =
    document.getElementById("declaration");


/* =====================================================
   3. CHECK REQUIRED ELEMENTS
===================================================== */

function checkElements() {

    const requiredElements = [
        unitsInput,
        totalUnitsElement,
        totalAmountElement,
        submitButton,
        nameInput,
        mobileInput,
        emailInput,
        cityInput,
        stateInput,
        addressInput,
        referralInput,
        additionalInput,
        declarationInput
    ];

    for (const element of requiredElements) {

        if (!element) {

            console.error(
                "V3 Form Error: Required HTML element is missing."
            );

            return false;
        }
    }

    return true;
}


/* =====================================================
   4. RUPEE FORMAT
===================================================== */

function formatRupees(amount) {

    return "₹" +
        Number(amount).toLocaleString("en-IN");

}


/* =====================================================
   5. UNIT CALCULATION
===================================================== */

function calculateInvestment() {

    let units =
        parseInt(unitsInput.value, 10);


    if (
        isNaN(units) ||
        units < 1
    ) {

        units = 1;
    }


    units =
        Math.floor(units);


    unitsInput.value =
        units;


    const total =
        units * UNIT_PRICE;


    totalUnitsElement.textContent =
        units;


    totalAmountElement.textContent =
        formatRupees(total);
}


/* =====================================================
   6. ONLY NUMBERS FOR CONTACT NUMBER
===================================================== */

function cleanContactNumber(value) {

    return String(value)
        .replace(/\D/g, "")
        .slice(0, 10);

}


mobileInput.addEventListener(
    "input",
    function () {

        this.value =
            cleanContactNumber(this.value);

    }
);


/* =====================================================
   7. VALIDATE CONTACT NUMBER
===================================================== */

function isValidContactNumber(number) {

    /*
       Accepts a normal 10 digit Indian mobile number.
    */

    return /^[6-9][0-9]{9}$/.test(number);

}


/* =====================================================
   8. GET SELECTED BUSINESS CONCEPTS
===================================================== */

function getSelectedBusinesses() {

    const selected =
        document.querySelectorAll(
            'input[name="business"]:checked'
        );


    const businesses = [];


    selected.forEach(
        function (item) {

            businesses.push(
                item.value
            );

        }
    );


    if (businesses.length === 0) {

        return "Not selected";
    }


    return businesses.join(", ");
}


/* =====================================================
   9. GET FORM DATA
===================================================== */

function getFormData() {

    const units =
        parseInt(
            unitsInput.value,
            10
        );


    return {

        name:
            nameInput.value.trim(),

        contactNumber:
            mobileInput.value.trim(),

        email:
            emailInput.value.trim(),

        city:
            cityInput.value.trim(),

        state:
            stateInput.value,

        address:
            addressInput.value.trim(),

        units:
            units,

        amount:
            units * UNIT_PRICE,

        referralCode:
            referralInput.value.trim(),

        businesses:
            getSelectedBusinesses(),

        additionalConcept:
            additionalInput.value.trim()

    };
}


/* =====================================================
   10. VALIDATE FORM
===================================================== */

function validateForm(data) {


    /* Name */

    if (!data.name) {

        alert(
            "Please enter your full name."
        );

        nameInput.focus();

        return false;
    }


    /* Contact Number */

    if (
        !isValidContactNumber(
            data.contactNumber
        )
    ) {

        alert(
            "Please enter a valid 10-digit WhatsApp number."
        );

        mobileInput.focus();

        return false;
    }


    /* City */

    if (!data.city) {

        alert(
            "Please enter your city."
        );

        cityInput.focus();

        return false;
    }


    /* State */

    if (!data.state) {

        alert(
            "Please select your state."
        );

        stateInput.focus();

        return false;
    }


    /* Address */

    if (!data.address) {

        alert(
            "Please enter your address."
        );

        addressInput.focus();

        return false;
    }


    /* Declaration */

    if (
        !declarationInput.checked
    ) {

        alert(
            "Please accept the declaration before submitting."
        );

        declarationInput.focus();

        return false;
    }


    return true;
}


/* =====================================================
   11. CREATE WHATSAPP MESSAGE
===================================================== */

function createWhatsAppMessage(data) {


    const message =

`*V3 GROUP OF BUSINESS*
*ALL IN ONE APP*

*INVESTMENT INTEREST APPLICATION*

━━━━━━━━━━━━━━━━━━━━

*INVESTOR DETAILS*

Name:
${data.name}

WhatsApp / Contact Number:
${data.contactNumber}

Email:
${data.email || "Not provided"}

City:
${data.city}

State:
${data.state}

Address:
${data.address}

━━━━━━━━━━━━━━━━━━━━

*UNIT DETAILS*

1 Unit Price:
₹${UNIT_PRICE}

Number of Units:
${data.units}

Total Amount:
₹${data.amount}

━━━━━━━━━━━━━━━━━━━━

*REFERRAL DETAILS*

Referral Code:
${data.referralCode || "Not provided"}

━━━━━━━━━━━━━━━━━━━━

*BUSINESS OPPORTUNITIES*

${data.businesses}

━━━━━━━━━━━━━━━━━━━━

*ADDITIONAL CONCEPT / MESSAGE*

${data.additionalConcept || "None"}

━━━━━━━━━━━━━━━━━━━━

*DECLARATION*

The applicant confirms that the
information provided in this form
is correct.

This form represents an expression
of interest and is subject to official
terms, eligibility and applicable
requirements.

━━━━━━━━━━━━━━━━━━━━

*V3 Group of Business*
*All in One App*`;


    return message;
}


/* =====================================================
   12. SEND TO WHATSAPP
===================================================== */

function sendToWhatsApp(message) {


    if (
        !WHATSAPP_RECEIVER ||
        WHATSAPP_RECEIVER ===
        "YOUR_WHATSAPP_NUMBER"
    ) {

        alert(
            "Please add the official V3 WhatsApp number in script.js."
        );

        return;
    }


    const encodedMessage =
        encodeURIComponent(message);


    const whatsappURL =
        "https://wa.me/" +
        WHATSAPP_RECEIVER +
        "?text=" +
        encodedMessage;


    window.location.href =
        whatsappURL;
}


/* =====================================================
   13. SUBMIT APPLICATION
===================================================== */

function submitApplication() {


    const data =
        getFormData();


    const valid =
        validateForm(data);


    if (!valid) {

        return;
    }


    const message =
        createWhatsAppMessage(data);


    sendToWhatsApp(message);
}


/* =====================================================
   14. EVENTS
===================================================== */


/* Units */

unitsInput.addEventListener(
    "input",
    calculateInvestment
);


unitsInput.addEventListener(
    "change",
    calculateInvestment
);


/* Submit */

submitButton.addEventListener(
    "click",
    submitApplication
);


/* =====================================================
   15. INITIAL LOAD
===================================================== */

if (checkElements()) {

    calculateInvestment();

}
