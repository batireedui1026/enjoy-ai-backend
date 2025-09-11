import e, { Request, Response } from "express";
import Registration from "../models/register.model";
import { createInvoiceFn } from "../utils/create-invoice";
import mongoose from "mongoose";
import { sendEmail } from "../utils/send-email";
import Lesson from "../models/lesson.model";
// export const createRegistration = async (req: Request, res: Response) => {
//   const {
//     trainingType,
//     location,
//     schoolName,
//     teamName,
//     LastName,
//     FirstName,
//     ages,
//     gender,
//     contactPhone,
//     paymentAmount,
//   } = req.body;

//   try {
//     const paymentStatus = "unpaid";
//     const registration = await Registration.create({
//       trainingType: new mongoose.Types.ObjectId(trainingType),
//       location,
//       schoolName,
//       teamName,
//       LastName,
//       FirstName,
//       ages,
//       gender,
//       contactPhone,
//       paymentAmount,
//       expireAt: new Date(Date.now() + 25 * 60 * 1000),
//     });
//     console.log("Registrations:", registration._id.toHexString());
//     const id = registration._id.toHexString();
//     const invoice = await createInvoiceFn(contactPhone, id);

//     if (invoice?.status === 200) {
//       const update = await Registration.findByIdAndUpdate(id, {
//         invoiceId: invoice?.data.invoice_id,
//       });
//       res
//         .status(201)
//         .json({ message: "Бүртгэл амжилттай", data: { update, invoice } });
//     }
//     res.status(400).json({ message: "Бүртгэл амжилтгүй" });
//     // await sendEmail(` ${trainingType}`);
//   } catch (error) {
//     console;
//     res.status(500).json({ message: "Алдаа гарлаа", error });
//   }
// };
export const createRegistration = async (req: Request, res: Response) => {
  const {
    trainingType,
    location,
    schoolName,
    teamName,
    LastName,
    FirstName,
    teacherName,
    ages,
    contactPhone,
    paymentAmount,
  } = req.body;

  try {
    // 1. TrainingType буюу хичээлийг олох
    const lesson = await Lesson.findById(trainingType);
    if (!lesson) {
      return res.status(404).json({ message: "Хичээл олдсонгүй" });
    }

    // 2. Одоогийн бүртгэгдсэн хүүхдүүдийн тоо авах
    const currentCount = await Registration.countDocuments({
      trainingType: new mongoose.Types.ObjectId(trainingType),
    });

    // 3. studentNumber-оос давсан эсэх шалгах
    if (currentCount >= lesson.studentNumber) {
      return res.status(400).json({
        message: "Энэ хичээлд суух хүүхдийн тоо дүүрсэн байна.",
        registeredStudents: await Registration.find({ trainingType }).select(
          "LastName FirstName"
        ),
      });
    }

    const paymentStatus = "unpaid";
    // 4. Бүртгэл үүсгэх
    const registration = await Registration.create({
      trainingType: new mongoose.Types.ObjectId(trainingType),
      location,
      schoolName,
      teamName,
      LastName,
      FirstName,
      teacherName,
      ages,
      contactPhone,
      paymentStatus,
      expireAt: new Date(Date.now() + 25 * 60 * 1000),
    });

    console.log("Registrations:", registration._id.toHexString());
    const id = registration._id.toHexString();

    // 5. QPay Invoice үүсгэх
    const invoice = await createInvoiceFn(contactPhone, id);

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
