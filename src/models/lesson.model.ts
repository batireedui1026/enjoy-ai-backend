import { model, Schema } from "mongoose";

interface ILesson {
  name: string;
  studentNumber: number;
  amount: number;
  ageLimitMin: number;
  ageLimitMax: number;
}

const lessonSchema = new Schema<ILesson>({
  name: {
    type: String,
    required: [true, "Хичээл нэрийг заавал оруулна."],
  },
  studentNumber: {
    type: Number,
    required: [true, "Сурагчдийн тоог заавал оруулна."],
  },
  amount: {
    type: Number,
    required: [true, "Хичээлийн үнийн дүнг заавал оруулна."],
  },
  ageLimitMin: {
    type: Number,
    required: [true, "Доод нас заавал оруулна."],
  },
  ageLimitMax: {
    type: Number,
    required: [true, "Дээд нас заавал оруулна."],
  },
});

const Lesson = model<ILesson>("Lesson", lessonSchema);

export default Lesson;
