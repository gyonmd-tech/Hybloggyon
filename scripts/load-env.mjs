import { config } from 'dotenv';

config({
  path: ['.env.local', '.env'],
  override: false,
  quiet: true,
});
