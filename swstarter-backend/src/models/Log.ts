import mongoose, { Schema, Document } from "mongoose";

export interface ILog extends Document {
  level: string;
  message: string;
  timestamp: Date;
  meta?: any;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
  service: string;
  environment: string;
}

const LogSchema: Schema = new Schema(
  {
    level: {
      type: String,
      required: true,
      enum: ["info", "error", "warn", "debug"],
    },
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    meta: {
      type: Schema.Types.Mixed,
    },
    error: {
      name: String,
      message: String,
      stack: String,
    },
    service: {
      type: String,
      required: true,
      default: "lawnstarter-backend",
    },
    environment: {
      type: String,
      required: true,
      default: process.env["NODE_ENV"] || "development",
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
LogSchema.index({ timestamp: -1 });
LogSchema.index({ level: 1 });
LogSchema.index({ service: 1 });

export const Log = mongoose.model<ILog>("Log", LogSchema);
