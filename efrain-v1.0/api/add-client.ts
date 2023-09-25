import { sql } from '@vercel/postgres';
import { VercelRequest, VercelResponse } from '@vercel/node';
 
export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    const clientName = request.query.clientName as string;
    const clientEmail = request.query.clientEmail as string;
    const clientSubject = request.query.clientSubject as string;
    const clientMessage = request.query.clientMessage as string;
    if (!clientName || !clientEmail) throw new Error('Name and email required');
    await sql`INSERT INTO Clients (Name, Email, Subject, Message) VALUES (${clientName}, ${clientEmail}, ${clientSubject}, ${clientMessage});`;
  } catch (error) {
    return response.status(500).json({ error });
  }
 
  const clients = await sql`SELECT * FROM Clients;`;
  return response.status(200).json({ clients });
}