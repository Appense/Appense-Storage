import { Button } from '@react-email/button';
import { Html } from '@react-email/html';
import { Tailwind } from '@react-email/tailwind';
import { Heading } from '@react-email/heading';
import { Link } from '@react-email/link';

import * as React from 'react';

export default function Email() {
  return (
    <Tailwind>
      <Html lang="en">
        <Heading>Your Reset Link</Heading>
        <div className='flex flex-col gap-4 font-sans'>
          <span>Someone recently requested a password change for your Appense Storage account. If this was you, you can set a new password here:</span>
          <Button href='https://example.com'>Reset password</Button>
          <span>If you don't want to change your password or didn't request this, just ignore and delete this message.</span>
        </div>
      </Html>
    </Tailwind>
  );
}