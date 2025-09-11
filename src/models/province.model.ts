import { model, Schema } from "mongoose";
interface IProvince {
  name: String;
}
const provinceSchema = new Schema<IProvince>({
  name: {
    type: String,
    required: [true, "аймаг нэрийг заавал оруулна."],
  },
});
const Province = model<IProvince>("Province", provinceSchema);
export default Province;
