import { Request, Response } from "express";
import Lesson from "../models/lesson.model";
import mongoose from "mongoose";

export const createLesson = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, studentNumber, amount, ageLimitMin, ageLimitMax } = req.body;
    const lesson = await Lesson.create({
      name,
      studentNumber,
      amount,
      ageLimitMin,
      ageLimitMax,
    });

    res.status(201).json({ message: "Lesson created", lesson });
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
export const getLesson = async (req: Request, res: Response): Promise<void> => {
  try {
    const subjects = await Lesson.find({});
    res.status(200).json({ message: "Хичээлүүд олдлоо", subjects });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ message: "Алдаа гарла", error });
  }
};
