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
      res.status(200).json({ message: "Item incluido com sucesso!" });
      return;
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async getAllItens(req, res) {
    const itens = await Itens.find().sort("name");

    res.status(200).json({
      itens: itens,
    });
  }
  static async gettItemId(req, res) {
    console.log(req.params.id);
    const id = req.params.id;

    const itemid = await Itens.findById({ _id: id });

    res.status(200).json({ message: itemid });
  }
  static async editItem(req, res) {
    const id = req.params.id;

    const Item = await Itens.findById(id);

    const { name, barcode, unit, amount } = req.body;
    if (Item) {
      (Item.name = name), (Item.unit = unit);
    }
    if (typeof barcode !== "number") {
      res.status(422).json({ message: "O codigo do item deve ser um numero!" });
      return;
    } else {
      Item.barcode = barcode;
    }

    if (typeof amount !== "number") {
      res
        .status(422)
        .json({ message: "A quantidade deve ser um numero real!" });
      return;
    } else {
      Item.amount = amount;
    }

    try {
      const updatedItem = await Itens.findByIdAndUpdate(
        { _id: id },
        { $set: Item },
        { new: true }
      );
      res.status(200).json({ message: "Item atualizado com sucesso" });
      return;
    } catch (err) {
      res.status(500).json({ message: err });
      return;
    }
  }
  static async deleteItem(req, res) {
    const id = req.params.id;

    const checkItem = await Itens.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ message: "Item " + checkItem.name + " deletado com sucesso" });
  }
};
