import e, { Request, Response } from "express";
import Registration from "../models/register.model";
import { createInvoiceFn } from "../utils/create-invoice";
import mongoose from "mongoose";
import { sendEmail } from "../utils/send-email";
import Lesson from "../models/lesson.model";

export const createRegistration = async (req: Request, res: Response) => {
  const {
    trainingType,
    location,
    schoolName,
    teamName,
    lastNames,
    firstNames,
    teacherName,
    ages,
    contactPhone,
  } = req.body;

  try {
    const paymentStatus = "unpaid";

    const lesson = await Lesson.findById(trainingType);
    if (!lesson) {
      return res.status(404).json({ message: "Хичээл олдсонгүй" });
    }

    const paymentAmount = Number(lesson.amount);

    const registration = await Registration.create({
      trainingType: new mongoose.Types.ObjectId(trainingType),
      location,
      schoolName,
      teamName,
      lastNames,
      firstNames,
      teacherName,
      ages,
      contactPhone,
      paymentStatus,
      paymentAmount,
      expireAt: new Date(Date.now() + 2 * 60 * 1000),
      // expireAt: new Date(Date.now() + 25 * 60 * 1000),
    });

    console.log("Registrations:", registration._id.toHexString());
    const id = registration._id.toHexString();

    const invoice = await createInvoiceFn(contactPhone, id, paymentAmount);

    if (invoice?.status === 200) {
      const update = await Registration.findByIdAndUpdate(id, {
        invoiceId: invoice?.data.invoice_id,
      });
      return res
        .status(201)
        .json({ message: "Бүртгэл амжилттай", data: { update, invoice } });
    }

    return res.status(400).json({ message: "Бүртгэл амжилтгүй" });
  } catch (error) {
    res.status(500).json({ message: "Алдаа гарлаа", error });
  }
};

export const getAllRegistration = async (req: Request, res: Response) => {
  try {
    const registrations = await Registration.find({});
    // .populate("province")
    // .populate({
    //   path: "trainingType",
    //   select: "trainingType",
    //   populate: { path: "course_id", select: "name" },
    // });
    res.status(200).json({ message: "Бүртгэлүүд олдлоо", registrations });
  } catch (error) {
    res.status(500).json({ message: "Алдаа гарлаа", error });
  }
};
