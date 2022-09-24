import lucia from "lucia-sveltekit";
import adapter from "@lucia-sveltekit/adapter-mongoose";
import { dev } from "$app/environment";
import mongoose from "mongoose";
import { cfg } from '$lib/server/config'

export const User = mongoose.model(
    "user",
    new mongoose.Schema(
        {
            _id: String,
            identifier_token: {
                type: String,
                unique: true,
                required: true,
            },
            hashed_password: String
            //,[user_id]: any, # any columns we want
        },
        { _id: false }
    )
);

export const RefreshToken = mongoose.model(
    "refresh_token",
    new mongoose.Schema({
        refresh_token: String,
        user_id: String,
    })
);

export const auth = lucia({
    adapter: adapter(mongoose,cfg.mongodbUri),
    secret: cfg.luciaSecret,
    env: dev ? "DEV" : "PROD",
});