import { Request, Response } from "express";
import Province from "../models/province.model";

export const createProvince = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body;
    const province = await Province.create({
      name,
    });
    res.status(201).json({ message: "Province created", province });
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getProvince = async (req: Request, res: Response) => {
  try {
    const location = await Province.find({});
    res.status(200).json({ message: "Бүртгэлүүд олдлоо", location });
    console.log("location", location);
  } catch (error) {
    res.status(500).json({ message: "Алдаа гарлаа", error });
  }
};
