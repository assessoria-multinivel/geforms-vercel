import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class GoogleSheetsService {
  private sheets: any;

  constructor() {
    this.initializeSheets();
  }

  private async initializeSheets() {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets'
      ],
    });

    this.sheets = google.sheets({ auth , version: 'v4'});
  }

  async appendToSheet(spreadsheetId: string, range: string, values: any[][]) {
    await this.sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
  }
}

// export default async function handler(req, res) {
//   try {
//     const auth = await google.auth.getClient({
//       projectId: keys.project_id,
//       credentials: {
//         type: "service_account",
//         private_key: keys.private_key,
//         client_email: keys.client_email,
//         client_id: keys.client_id,
//         token_url: keys.token_uri,
//         universe_domain: keys.universe_domain,
//       },
//       scopes: ['https://www.googleapis.com/auth/spreadsheets'],
//     });

//     const sheets = google.sheets({ version: 'v4', auth });

//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: CONSTANTES.GOOGLE_SHEETS_SPREADSHEET_ID,
//       range: CONSTANTES.GOOGLE_SHEETS_RANGE,
//     });

//     return res.status(200);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Error getting spreadsheet data', success: false });
//   }
// }
