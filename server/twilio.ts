import twilio from 'twilio';

// Initialize Twilio client
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const notificationPhoneNumber = process.env.NOTIFICATION_PHONE_NUMBER || '5877074990'; // Default to the number in requirements

let twilioClient: ReturnType<typeof twilio> | null = null;

// Initialize the Twilio client only if credentials are available
if (twilioAccountSid && twilioAuthToken && twilioPhoneNumber) {
  twilioClient = twilio(twilioAccountSid, twilioAuthToken);
}

/**
 * Send an SMS notification about a new client request
 */
export async function sendNewClientNotification(
  name: string,
  projectType: string,
  email: string
): Promise<boolean> {
  if (!twilioClient || !twilioPhoneNumber) {
    console.warn('Twilio not configured. SMS notification not sent.');
    return false;
  }

  try {
    const message = await twilioClient.messages.create({
      body: `New Client Request! 🎉\nName: ${name}\nProject: ${projectType}\nEmail: ${email}\nCheck your admin dashboard for details.`,
      from: twilioPhoneNumber,
      to: `+${notificationPhoneNumber.replace(/\D/g, '')}` // Ensure format is correct (+15877074990)
    });

    console.log('SMS notification sent:', message.sid);
    return true;
  } catch (error) {
    console.error('Error sending SMS notification:', error);
    return false;
  }
}

/**
 * Send an SMS notification about a new website analysis request
 */
export async function sendWebsiteAnalysisNotification(
  websiteUrl: string,
  email: string
): Promise<boolean> {
  if (!twilioClient || !twilioPhoneNumber) {
    console.warn('Twilio not configured. SMS notification not sent.');
    return false;
  }

  try {
    const message = await twilioClient.messages.create({
      body: `New Website Analysis Request! 🔍\nWebsite: ${websiteUrl}\nEmail: ${email}\nCheck your admin dashboard for details.`,
      from: twilioPhoneNumber,
      to: `+${notificationPhoneNumber.replace(/\D/g, '')}`
    });

    console.log('SMS notification sent:', message.sid);
    return true;
  } catch (error) {
    console.error('Error sending SMS notification:', error);
    return false;
  }
}
