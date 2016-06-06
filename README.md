# EMailToSms

Safest possible option to receive SMS notifications of incoming E-Mails. Powered by Google Apps Script.

### Why use it?

It is safest possible option for someone who want to receive SMS notification for incoming E-Mails. Traditional E-Mail to SMS providers requires you to forward E-Mail to them. It is not a safe option as they can read your E-Mails with malicious intents and can easily gain access to your accounts.

Unlike traditional approach, it doesn't forward your E-Mail to a 3rd party. It process the incoming E-Mails on Google servers, extract less useful subject line and send it to API providers.

Most of the sane web applications never include any important content in subject line. So the worst an evil API provider can get is your E-Mail subject line. It protects you against password reset attempts, as well as them creating account on your behalf.

Note: It doesn't protect you against social engineering. Any API provider can see who sends you E-Mail the most, time when you receive an E-Mail,.. But by little configuration, you can easily spoof your E-Mail ID for additional security.

### Use cases

- A safe option to get SMS notification of your incoming E-Mails
- If you use a master GMail account to manage other Google Apps/Domain registrar accounts, you can use it to get notification of new incoming E-Mails without being actually logged into it for security reason

### Limitations
It only works with a Google account

### Installation

1) Visit [script.google.com](https://script.google.com/intro) into your browser and create new project "EMail to SMS"

2) Paste the content of `Code.gs.js` into the editor

3) Fill the settings and credentials of the API's you are planning to use (more information and comparison among them later in this guide)

4) Click `Resource -> All your triggers` in menu bar. Click on `Add new trigger`. 

5) Choose `process_email` option in `Run` field and set how often script should execute. Note: The quickest duration that can be set is 1 minute.

6) Optionally click on notification if you wish to get notified about failed execution of script.

7) Save it and click on `process_email` in `Run` menu. It will ask for all necessary permissions required to execute script only once.


## Available API's

### E-Mail:

#### GMailApp
Installation:
- No installation needed

Notes:
- Send E-Mail using Google servers
- No additional configuration required
- It has 100 messages per day limit
- It doesn't hide your E-Mail ID. It send E-Mail using your real E-Mail ID. For Google Apps user, it use no-reply@YourDomain.com. Receiver can easily see your E-Mail ID.

#### Mailgun
Installation:
- Visit mailgun.com, create an account. Click on `Domains -> Sandbox domain`. Copy API details from there.
- Now click on `Manage Authorized Recipients`. Add your `to_email` address in complete lower case (important! it has some issue with upper case addresses) and then verify it.

Notes:
- It spoofs your E-Mail ID
- Have a larger per day limit even in free tier.


### SMS:

#### Sinch
Installation:
- Visit [sinch.com](https://sinch.com/), create an account, and then create an app.
- Request full SMS access (can take upto 1-2 days) if you used a different phone number than `to_phone` while creating an account. 

#### Plivo
Installation:
- Visit [plivo.com](https://plivo.com/), and create an account.
- You need to upgrade to full SMS access (by depositing money) if you used a different phone number than `to_phone` while creating an account.
