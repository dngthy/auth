const generateOTP = require('../utils/generateOTP')
const transporter = require('./credential')
const sendEmail = (RECEIVER_EMAIL, contentMsg) => {
  const { HOST_EMAIL } = process.env
  const message = {
    from: `CYBER-S <${HOST_EMAIL}>`,

    to: RECEIVER_EMAIL,
    ...contentMsg
  }

  transporter.sendMail(message, (err, info) => {
    console.log(err || info)
  })
}

const send2FAEmail = (username, RECEIVER_EMAIL, device) => {
  const OTP = generateOTP()
  const contentMsg = {
    subject: '[CYBER-S] Please verify your action',

    html: `
    <p>Hey <b>${username}</b>!</p>

    <p>A sign in attempt requires further verification because we did not recognize your device. To complete the sign in, enter the verification code on the unrecognized device.</p>

    <p>Device Type: <b>${device.deviceCategory}</b></p>
    <p>Device Type: <b>${device.userAgent}</b></p>
    <p>Verification code: <i>${OTP}</i></p>

    <p>If you did not attempt to sign in to your account, your password may be compromised. Visit https://cybers/security to create a new, strong password for your CyberS account. </p>

    <p>If you'd like to automatically verify devices in the future, consider enabling two-factor authentication on your account. Visit https://docs.cybers.com/articles/configuring-two-factor-authentication to learn about two-factor authentication.</p>

    <p>If you decide to enable two-factor authentication, ensure you retain access to one or more account recovery methods. See https://docs.cybers.com/articles/configuring-two-factor-authentication-recovery-methods in the CyberS Help.</p>

    Thanks,<br/>
    <b><i>The Cyber-S Team</i></b>
    `
  }

  sendEmail(RECEIVER_EMAIL, contentMsg)
}

const sendWelcomeMsg = (username, RECEIVER_EMAIL) => {
  const contentMsg = {
    subject: '[CYBER-S] WELCOME TO CYBER-S',

    html: `
    <table style="border-collapse:collapse;display:flex;justify-content:center" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tbody>
                          <tr>
                            <td valign="top">
                              <table style="border-collapse:collapse" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tbody>
                                  <tr>
                                    <td valign="top">
                                    </td>
                                    <td style="background-position:top;background-repeat:repeat-y" width="600" valign="top" height="675" bgcolor="#14315e" background="https://ci6.googleusercontent.com/proxy/zBxHz_PUEJ2wNn8YlJ4GUcL9zEhZ3KTMPUG9-pqUD5Z6x2TuIJHW1G2KS-5l80ZWZCwmYcW-aOoiwwMh7D0E0_ejNSflINcA5CuRGZuyBuBwGjshIKl3Jf0b3b4k4C5eLH8_HkkOjWSswm7JZN4CMDS5TX-5H-xZHPA=s0-d-e1-ft#https://gallery.mailchimp.com/01c46cd52b47e3dc7f38ee21d/images/81e869ed-d0b9-473e-8894-63b29bc1f088.jpg">
                                      
                                      <div>
                                        <table style="min-width:100%;border-collapse:collapse" width="100%" cellspacing="0" cellpadding="0" border="0">
                                          <tbody>
                                            <tr>
                                              <td vaping="top">
                                                
                                                
                                                
                                                <table style="max-width:100%;min-width:100%;border-collapse:collapse" width="100%" cellspacing="0" cellpadding="0" border="0" align="left">
                                                  <tbody>
                                                    <tr>
                                                      <td style="padding-top:44px;padding-right:120px;padding-bottom:9px;padding-left:120px;word-break:break-word;color:#5f7d95;font-family:Helvetica,Arial;font-size:16px;line-height:150%;text-align:left" valign="top">
                                                        
                                                        <div style="text-align:center">
                                                          
                                                          <table style="border-collapse:collapse" width="100%" cellspacing="0" border="0">
                                                            <tbody>
                                                              <tr>
                                                                <td align="center">
                                                                  <a href="https://mandrillapp.com/track/click/30626859/www.freepik.com?p=eyJzIjoiZnk0Y3VVb1JXQ0NYcVJrY1o5eGZwaDVKM0FzIiwidiI6MSwicCI6IntcInVcIjozMDYyNjg1OSxcInZcIjoxLFwidXJsXCI6XCJodHRwOlxcXC9cXFwvd3d3LmZyZWVwaWsuY29tXCIsXCJpZFwiOlwiMTEzZmEzYTE3MGI2NDE0MWFhNTAxZDhkNmM3ZDg1NDBcIixcInVybF9pZHNcIjpbXCIxY2Q4ZTllNTcwNDYxNTAzY2FkYTM1YzBmZTlmZThjNTI1MTFjMzhmXCJdfSJ9" style="display:block;margin-bottom:30px;color:#09e781;font-weight:normal;text-decoration:underline" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://mandrillapp.com/track/click/30626859/www.freepik.com?p%3DeyJzIjoiZnk0Y3VVb1JXQ0NYcVJrY1o5eGZwaDVKM0FzIiwidiI6MSwicCI6IntcInVcIjozMDYyNjg1OSxcInZcIjoxLFwidXJsXCI6XCJodHRwOlxcXC9cXFwvd3d3LmZyZWVwaWsuY29tXCIsXCJpZFwiOlwiMTEzZmEzYTE3MGI2NDE0MWFhNTAxZDhkNmM3ZDg1NDBcIixcInVybF9pZHNcIjpbXCIxY2Q4ZTllNTcwNDYxNTAzY2FkYTM1YzBmZTlmZThjNTI1MTFjMzhmXCJdfSJ9&amp;source=gmail&amp;ust=1666623903271000&amp;usg=AOvVaw1K8Bz9H5sXmRN2Sbmg16VK">
                                                                  <img src="https://ci5.googleusercontent.com/proxy/f7PMZEDKuowkUz9p56b-do6zKznkwXwYojISsk-tYxenvku9oLN0IWi6cE7DZQJchsdoyOWLZ-8l5wT_vHw15lU84S3UNSNW94rDMBWMlBcGF7B0lnVHWhLgv2njLgy3oMDd-5lfqL-cAnybLUFbDgnB3wgkSdwEKTU=s0-d-e1-ft#https://gallery.mailchimp.com/01c46cd52b47e3dc7f38ee21d/images/09e412eb-9d51-4175-99cb-6d31c4ac23ff.png" alt="Freepik" style="border:0;height:auto;outline:none;text-decoration:none" class="CToWUd" data-bit="iit" width="160"></a>
                                                                    <p style="text-align:center;font-size:26px;font-weight:400;color:#ffffff;margin:10px 0;padding:0;font-family:Helvetica,Arial;line-height:150%">
                                                                        <strong> <span class="il">Welcome</span> </strong> ${username}!                                                                    </p>
<p style="text-align:center;font-size:22px;font-weight:100;color:#ffffff;margin:10px 0;padding:0;font-family:Helvetica,Arial;line-height:150%">Having this tingling feeling in your belly? It’s the excitement. We’re excited, too</p>
                                                                  
                                                                
                                                                
                                                                
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                              
                                              
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    
                                  </td>
                                  
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
    `
  }

  sendEmail(RECEIVER_EMAIL, contentMsg)
}

module.exports = { send2FAEmail, sendWelcomeMsg }
