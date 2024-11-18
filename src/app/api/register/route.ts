import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/services/supabase';
import { sessionService } from '@/services/session';
import { userService } from '@/services/user';

export async function POST(request: NextRequest) {
  const requestData = await request.json();
  const encryptedData = {
    ...requestData,
    password: userService.hashPassword(requestData.password),
  };

  const { error } = await supabase.from('users').insert({ ...encryptedData });

  if (error) {
    return NextResponse.json({ success: false });
  }

  await sessionService.deleteSession();
  await sessionService.createSession(requestData);
  console.log(userService.generateValidationCodeFromEmail(requestData.email));

  return NextResponse.json({ success: true });
}
