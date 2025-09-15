import mongoose, { model, Schema, Document } from "mongoose";

interface IRegistration extends Document {
  _id: mongoose.Types.ObjectId;
  trainingType: mongoose.Types.ObjectId;
  location: mongoose.Types.ObjectId;
  schoolName: string;
  teamName: string;
  lastNames: string[];
  firstNames: string[];
  teacherName?: string;
  ages: string;
  contactPhone: string;
  invoiceId?: string;
  paidAt?: Date;
  paymentStatus: "paid" | "unpaid";
  paymentAmount?: number;
  createdAt?: Date;
  updatedAt?: Date;
  expireAt?: Date | null;
}

const registrationSchema = new Schema<IRegistration>(
  {
    trainingType: {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
      required: [true, "Сургалтын төрлийг заавал оруулна."],
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "Province",
      required: [true, "Байршлыг заавал оруулна."],
    },
    schoolName: {
      type: String,
      required: [true, "Сургуулийг заавал оруулна."],
    },
    teamName: {
      type: String,
      required: [true, "Багийн нэрийг заавал оруулна."],
    },
    lastNames: {
      type: [],
      required: [true, "Овог заавал оруулна."],
    },
    firstNames: {
      type: [],
      required: [true, "Нэр заавал оруулна."],
    },
    teacherName: {
      type: String,
      required: [true, "Багшийн нэр заавал оруулна."],
    },
    ages: {
      type: String,
      required: [true, "Насыг заавал оруулна."],
    },
    contactPhone: {
      type: String,
      required: [true, "Утасны дугаарыг заавал оруулна."],
    },
    invoiceId: {
      type: String,
    },
    paidAt: {
      type: Date,
      default: null,
    },
    expireAt: {
      type: Date,
      default: null,
      index: { expires: 0 },
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      required: [true, "Төлбөрийн төлөвийг заавал оруулна."],
    },
    paymentAmount: {
      type: Number,
      required: [false, "Төлбөрийн дүн"],
    },
  },
  { timestamps: true }
);

const Registration = model<IRegistration>("Registration", registrationSchema);

export default Registration;
