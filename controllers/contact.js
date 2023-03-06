import asyncHandler from "express-async-handler";
import Contact from "../models/contact.js";
import User from "../models/user.js";

const createContact = asyncHandler(async (req, res) => {
  const { name, mobile, email, website, linkedIn, twitter, desc } = req.body;

  const user = req.user;

  try {
    const existContact1 = await Contact.findOne({ email: email });

    if (existContact1) {
      return res
        .status(401)
        .json({ msg: "Contact with this email address is already exist" });
    }

    const contact = await Contact.create({
      userId: user._id,
      name,
      mobile,
      email,
      website,
      linkedIn,
      twitter,
      desc,
    });

    await contact.save();

    res.status(201).json({ msg: "A new contact added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

const getAllContacts = asyncHandler(async (req, res) => {
  const user = req.user;
  try {
    const contacts = await Contact.find({ userId: user._id });

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error." });
  }
});

const deleteContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const existContact = await Contact.find({ _id: id });

    if (!existContact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    await Contact.findByIdAndDelete({ _id: id });

    res.status(200).json({ msg: "Contact deleted successfully..." });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error." });
  }
});

const updateContact = asyncHandler(async (req, res) => {
  const { name, mobile, email, website, linkedIn, twitter, desc } = req.body;

  try {
    const contact = await Contact.findById(req.params.id);

    if (contact.userId.toString() !== req.user._id.toString()) {
      res.status(401).json("You can't perform this action");
    }

    if (contact) {
      contact.name = name || contact.name;
      contact.mobile = mobile || contact.mobile;
      contact.email = email || contact.email;
      contact.website = website || contact.website;
      contact.linkedIn = linkedIn || contact.linkedIn;
      contact.twitter = twitter || contact.twitter;
      contact.desc = desc || contact.desc;

      const updatedContact = await contact.save();
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json("Contact not found");
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error." });
  }
});

export { createContact, getAllContacts, deleteContact, updateContact };
