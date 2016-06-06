/**
 * EMailToSms
 * Safest possible option to receive SMS notifications of incoming E-Mails. Powered by Google Apps Script.
 * 
 * ReadMe: https://github.com/VarunAgw/EMailToSms/blob/master/README
 * GitHub: https://github.com/VarunAgw/EMailToSms
 */

var sinch = {
    api_key: 'xxxxxxxxxxxxx-xxxx-xxxx-xxxxxxxxxxxx',
    secret: 'xxxxxxxxxxxxxxxxxxxxxx=='
};
var plivo = {
    auth_id: 'xxxxxxxxxxxxxxxxxxxx',
    auth_token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
};
var mailgun = {
    api_key: 'key-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    domain: 'sandboxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.mailgun.org',
};

// Phone Number or SenderID used to send SMS
// Format: Country Code + Phone Number (No "+" sign) or alphanumberic characters
// Works only if API provider allows it
var from_phone = "919123456789";

// Phone number of the receiver
// Format: Country Code + Phone Number (No "+" sign)
var to_phone = "919123456789";

// E-Mail ID used to send the E-Mail
// Works only with Mailgun (Not GMailApp)
var from_email = "mailgun@sandbox.mailgun.org";

// E-Mail ID of the receiver
var to_email = "You@YourDomain.com";

// Process E-Mail received only after this date.
// You don't ideally want to process 1000's of E-Mail you received \
// from back in the day when you created the E-Mail account.
// Choose it to today's date or 2001/01/01 if you really want that
var start_from = "yyyy/mm/dd";

// Send only unread messages
var only_unread = true;

function process_email() {
    var sms = "";
    GmailApp.createLabel("sms");
    var threads = GmailApp.search("in:inbox -Label:sms After:" + start_from + (only_unread ? " is:unread" : ""));
    for (index in threads) {
        var thread = threads[index];
        var from_name = "Important - " + thread.getMessages()[0].getFrom().split("<")[0];
        var subject = thread.getFirstMessageSubject();
        var email = "From: " + thread.getMessages()[0].getFrom() + "\n\n" + "Subject: " + thread.getFirstMessageSubject() + "\n";
        var message = ("-" + thread.getMessages()[0].getFrom().split("<")[0].trim() + ": " + thread.getFirstMessageSubject()).substring(0, 60) + "\n\n";

        if ((sms + message).length > 900) {
//            send_sinch(from_phone, to_phone, sms);
//            send_plivo(from_phone, to_phone, sms);
            sms = message;
        } else {
            sms = sms + message;
        }
//        send_email(from_name, to_email, subject, email);
//        send_mailgun(from_name, from_email, to_email, subject, email);

        thread.addLabel(GmailApp.getUserLabelByName("sms"));
    }
    if (sms.length > 0) {
//        send_sinch(from_phone, to_phone, sms);
//        send_plivo(from_phone, to_phone, sms);
    }
}


function send_sinch(from, to, message) {
    UrlFetchApp.fetch("https://messagingapi.sinch.com/v1/sms/+" + to, {
        method: "post",
        contentType: "application/json",
        headers: {
            Authorization: "Basic " + Utilities.base64Encode(sinch.api_key + ":" + sinch.secret),
        },
        payload: JSON.stringify({
            from: "+" + from,
            message: message,
        }),
    });
}

function send_plivo(from, to, message) {
    UrlFetchApp.fetch("https://api.plivo.com/v1/Account/" + plivo.auth_id + "/Message/", {
        method: "post",
        contentType: "application/json",
        headers: {
            Authorization: "Basic " + Utilities.base64Encode(plivo.auth_id + ":" + plivo.auth_token),
        },
        payload: JSON.stringify({
            src: from,
            dst: to,
            text: message,
        }),
    });
}

function send_email(from_name, to, subject, body) {
    GmailApp.sendEmail(to, subject, body, {name: from_name, noReply: true});
}

function send_mailgun(from_name, from_email, to, subject, body) {
    UrlFetchApp.fetch("https://api.mailgun.net/v3/" + mailgun.domain + "/messages", {
        method: "post",
        headers: {
            Authorization: "Basic " + Utilities.base64Encode("api:" + mailgun.api_key),
        },
        payload: {
            from: from_name + " <" + from_email + ">",
            to: to,
            subject: subject,
            text: body,
        },
    });
}