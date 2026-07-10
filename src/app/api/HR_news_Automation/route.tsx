import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST() {
  try {
    const webhookUrl = 'https://pritika-n8n.onrender.com/webhook/fb7e60b0-dc34-4525-98be-af7af9bc6d82';
    const response = await axios.post(webhookUrl, {}, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data || error.message }, 
      { status: error.response?.status || 500 }
    );
  }
}
