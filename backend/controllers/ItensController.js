const Itens = require("../models/Itens");

module.exports = class ItensControler {
  static async create(req, res) {
    const { name, barcode, unit, amount } = req.body;

    //validation
    if (!name) {
      res.status(422).json({ message: "O nome é Obrigatorio" });
      return;
    }

    if (!barcode) {
      res.status(422).json({ message: "O codigo do item é Obrigatorio" });
      return;
    }

    if (typeof barcode !== "number") {
      res.status(422).json({ message: "O codigo deve ser um numero" });
      return;
    }

    const chekExitsBarcode = await Itens.findOne({ barcode: barcode });

    if (chekExitsBarcode) {
      res.status(422).json({ message: "Codigo de barras ja existe" });
      return;
    }

    if (!unit) {
      res.status(422).json({ message: "Preencha a unidade do item" });
      return;
    }
    if (!amount) {
      res.status(422).json({ message: "A quatidade é obrigatoria" });
      return;
    }
    if (typeof amount !== "number") {
      res.status(422).json({ message: "O codigo deve ser um numero" });
      return;
    }

    // Create Item

    const item = new Itens({
      name,
      barcode,
      unit,
      amount,
    });

    try {
      const newItem = await item.save();
      console.log(newItem);
      return;
    } catch (error) {}
  }
};
