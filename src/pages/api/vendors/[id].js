// pages/api/vendors/[id].js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const {
    query: { id },
    method,
    body,
  } = req;

  const filePath = path.join(process.cwd(), 'data', 'vendors.json');
  const jsonData = fs.readFileSync(filePath);
  let vendors = JSON.parse(jsonData);

  const vendorIndex = vendors.findIndex((v) => v.id === parseInt(id));

  if (vendorIndex === -1) {
    return res.status(404).json({ message: 'Vendor not found' });
  }

  if (method === 'GET') {
    res.status(200).json(vendors[vendorIndex]);
  } else if (method === 'PUT') {
    const updatedVendor = { ...vendors[vendorIndex], ...body };
    vendors[vendorIndex] = updatedVendor;
    fs.writeFileSync(filePath, JSON.stringify(vendors, null, 2));
    res.status(200).json(updatedVendor);
  } else if (method === 'DELETE') {
    vendors.splice(vendorIndex, 1);
    fs.writeFileSync(filePath, JSON.stringify(vendors, null, 2));
    res.status(204).end();
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
