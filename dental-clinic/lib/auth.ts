// lib/auth.ts
import { getAuth } from 'firebase/auth'
import { app } from './firebase' // asegúrate que exportas `app` en lib/firebase.ts

export const auth = getAuth(app)
