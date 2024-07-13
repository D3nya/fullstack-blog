import fs from 'fs';

export default function createDir(uploadsPath) {
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdir(uploadsPath, (err) => {
      if (err) throw err;
      console.log(`Folder ${uploadsPath} created successfully`);
    });
  } else {
    console.log(`Folder ${uploadsPath} exists`);
  }
}
