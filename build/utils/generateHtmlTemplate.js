"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GenerateHtml = (trainingType) => {
    return `
    <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #4CAF50; color: white; text-align: center; padding: 15px;">
          <strong>Таны бүртгэл амжилттай баталгаажлаа</strong>
        </div>
        <p style="margin: 10px 0;"><strong>Сайн байна уу, </strong><br>    
        </p>
        <div style="padding: 20px; text-align: center;">
          <div style="text-align: left;">
            <p style="margin: 10px 0;"><strong>📚 Сонгосон сургалт: </strong><br> 
              <span style="color: #4CAF50;">${trainingType}</span>
            </p>
           
            <p style="font-size: 0.95em; margin-top: 2em;">
              Хүндэтгэсэн, <br />
              <strong>Enjoy Ai</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
};
exports.default = GenerateHtml;
