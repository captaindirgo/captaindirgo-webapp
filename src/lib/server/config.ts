// load config
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { getEnvOrDie } from '$lib/utils';

type CaptainDirgoConfig = {
  luciaSecret : string,
  supabaseUri : string,
  supabaseSecret : string
}

// we take the cfg from the environment
export let cfg : CaptainDirgoConfig = { 
  luciaSecret : getEnvOrDie('VITE_CAPTAINDIRGO_LUCIA_SECRET'), 
  supabaseUri : getEnvOrDie('VITE_CAPTAINDIRGO_SUPABASE_URI'), 
  supabaseSecret : getEnvOrDie('VITE_CAPTAINDIRGO_SUPABASE_SECRET') }

