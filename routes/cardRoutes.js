const express = require("express");
const router = express.Router();
const CardModel = require("../models/cardModel")
const ListModel = require("../models/listModel")



//! Create New Card in List "/card/create"


router.post("/create", async (req, res) => {
    const { title, desc, admin, board, list } = req.body;
    if (!title || !desc || !admin || !board) {
        res.status(400).send({ msg: 'Povide all info' })
    }
    let newCard = new CardModel({
        title: title,
        desc: desc,
        admin: admin,
        board: board,
        list: list
    })

    try {
        let savedCard = newCard.save();
        res.status(400).send({ msg: 'success' })


    } catch (err) {
        res.status(400).send({ msg: err })

    }



});

// Move Card from List to List" /card/move"
router.post("/move", async (req, res) => {
    const { currListId, nextListId, cardId } = req.body;
    if (!currListId || !nextListId) {
        res.status(400).send{ msg:provide card id }
    }
    let updatedList = await ListModel.findOneAndUpdate({ _id: currListId }, { $pull: { cards: cardId } })
    let updatedList2 = await ListModel.findOneAndUpdate({ _id: nextListId }, { $push: { cards: cardId } })

    res.status(400).send({ msg: 'List updated' })

});

//! Get Single Card Info (including what List this card belongs to)"/card/id"
router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let currCard = await CardModel.find({ _id: id }).populate("List");

    res.status(200).send(currCard)


});

// Edit Card Info (rename title, and edit card description)
router.post("/edit", async (req, res) => {
    const { title, desc, cardId } = req.body;
    let updatedCard = "";
    if (title) {
        updatedCard = await CardModel.findOneAndUpdate({ _id: cardId }, { { title: title } })

    }
if (desc) {
    updatedCard = await CardModel.findOneAndUpdate({ _id: cardId }, { { desc: desc } })

    }
res.status(200).send(updatedBoard);

});

// Add File to Card
router.post("/file/attach", async (req, res) => {

});

// Remove File from Card
router.delete("/file/detach", async (req, res) => {

});

// Download File
router.post("/file/download", async (req, res) => {

});

// Add Comment
router.post("/comment/add", async (req, res) => {
    const { comment, cardId } = req.body;

    if (!comment || !cardId) {
        return res.send({ msg: "Provide valid info" });

    }
    let updatedCard = await CardModel.findOneAndUpdate({ _id: cardId }, { $push: { comments: comment } })

    res.status(400).send("card Updated")

});

// Remove Comment
router.delete("/comment/del", async (req, res) => {

});

// Change Card Cover
router.post("/cover", async (req, res) => {

});

// Add/Edit/Delete Labels on Card
router.post("/labels", async (req, res) => {

});

module.exports = router;
