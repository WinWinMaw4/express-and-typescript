import { Request, Response } from "express";
import Contact from "../models/contacts";


export const getContacts = async (_req: Request, res: Response) => {
  try {
    const contacts = await Contact.findAll({
      order: [["id", "ASC"]], // sort by 'id' ascending
    });
    res.json({ success: true, data: contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: (error as Error).message });
  }
};



export const getContact = async (req: Request, res: Response) => {
  const contact = await Contact.findByPk(req.params.id);
  if (!contact) return res.status(404).json({ message: "Not found" });
  res.json({ success: true, data: contact });
};

export const createContact = async (req: Request, res: Response) => {
  const contact = await Contact.create(req.body);
  res.status(201).json({ success: true, data: contact });
};

export const updateContact = async (req: Request, res: Response) => {
  const contact = await Contact.findByPk(req.params.id);
  if (!contact) return res.status(404).json({ message: "Not found" });

  await contact.update(req.body);
  res.json({ success: true, data: contact });
};

export const deleteContact = async (req: Request, res: Response) => {
  const contact = await Contact.findByPk(req.params.id);
  if (!contact) return res.status(404).json({ message: "Not found" });

  await contact.destroy();
  res.json({ success: true, message: "Deleted successfully" });
};
