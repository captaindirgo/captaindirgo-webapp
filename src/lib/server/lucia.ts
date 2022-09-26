import lucia from "lucia-sveltekit";
import adapter from "@lucia-sveltekit/adapter-supabase";
import { dev } from "$app/environment";
// import supabase from "mongoose";
import { cfg } from '$lib/server/config'

// export const User = mongoose.model(
//     "user",
//     new mongoose.Schema(
//         {
//             _id: String,
//             identifier_token: {
//                 type: String,
//                 unique: true,
//                 required: true,
//             },
//             hashed_password: String
//             //,[user_id]: any, # any columns we want
//         },
//         { _id: false }
//     )
// );

// export const RefreshToken = mongoose.model(
//     "refresh_token",
//     new mongoose.Schema({
//         refresh_token: String,
//         user_id: String,
//     })
// );

export const auth = lucia({
    adapter: adapter(cfg.supabaseUri,cfg.supabaseSecret),
    secret: cfg.luciaSecret,
    env: dev ? "DEV" : "PROD",
});