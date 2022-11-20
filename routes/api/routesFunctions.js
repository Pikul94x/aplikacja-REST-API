const Contact = require("../../models/schema");

const getContacts = async () => await Contact.find();

const getContactById = async id => await Contact.findOne({ _id: id });

const removeContact = async id => await Contact.findByIdAndRemove({ _id: id });

const addContact = async (name, email, phone, favorite) =>
	await Contact.create({ name, email, phone, favorite });

const updateContact = async (id, fields) =>
	await Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });

const updateStatusContact = async (id, fields) =>
	await Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });

module.exports = {
	getContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
	updateStatusContact,
};
