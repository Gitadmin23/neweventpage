import heic2any from "heic2any";

export const convertAndCompressToPng = async (
  file: File,
  maxSizeKB = 800,
  maxWidth = 1920,
  maxHeight = 1080,
  quality = 0.9,
  onProgress?: (msg: string) => void // 👈 progress callback
): Promise<File> => {
  let workingFile = file;

  onProgress?.("Checking file type...");

  // 🔹 Step 1: Convert HEIC → JPEG
  if (
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    file.name.toLowerCase().endsWith(".heic") ||
    file.name.toLowerCase().endsWith(".heif")
  ) {
    onProgress?.("Converting HEIC → JPEG...");
    const convertedBlob = (await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality,
    })) as Blob;

    workingFile = new File(
      [convertedBlob],
      file.name.replace(/\.\w+$/, ".jpg"),
      { type: "image/jpeg" }
    );
  }

  onProgress?.("Compressing image...");

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = async () => {
        let { width, height } = img;

        let scale = 1;
        let jpgFile: File | null = null;
        let currentQuality = quality;

        while (true) {
          const targetWidth = Math.round(width * scale);
          const targetHeight = Math.round(height * scale);

          const canvas = document.createElement("canvas");
          canvas.width = targetWidth;
          canvas.height = targetHeight;

          const ctx = canvas.getContext("2d");
          if (!ctx) return reject("Canvas not supported");

          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          const blob: Blob | null = await new Promise((res) =>
            canvas.toBlob((b) => res(b), "image/jpeg", currentQuality)
          );

          if (!blob) return reject("Failed to create JPEG");

          jpgFile = new File(
            [blob],
            workingFile.name.replace(/\.\w+$/, ".jpg"),
            { type: "image/jpeg" }
          );

          const sizeKB = jpgFile.size / 1024;
          onProgress?.(`Compressing... ${Math.round(sizeKB)} KB`);

          if (sizeKB <= maxSizeKB || (scale <= 0.3 && currentQuality <= 0.5)) {
            onProgress?.("");
            break;
          }

          if (currentQuality > 0.5) {
            currentQuality -= 0.1;
          } else {
            scale *= 0.9;
          }
        }

        resolve(jpgFile!);
      };

      if (e.target?.result) {
        img.src = e.target.result as string;
      }
    };

    reader.onerror = () => reject("Error reading file");
    reader.readAsDataURL(workingFile);
  });
};


// import heic2any from "heic2any";

// export const convertAndCompressToPng = async (
//   file: File,
//   maxSizeKB = 800,
//   maxWidth = 1920,
//   maxHeight = 1080
// ): Promise<File> => {
//   let workingFile = file;

//   // 🔹 Step 1: Convert HEIC → JPEG (so canvas can read it)
//   if (
//     file.type === "image/heic" ||
//     file.type === "image/heif" ||
//     file.name.toLowerCase().endsWith(".heic") ||
//     file.name.toLowerCase().endsWith(".heif")
//   ) {
//     const convertedBlob = (await heic2any({
//       blob: file,
//       toType: "image/jpeg",
//       quality: 0.9,
//     })) as Blob;

//     workingFile = new File(
//       [convertedBlob],
//       file.name.replace(/\.\w+$/, ".jpg"),
//       { type: "image/jpeg" }
//     );
//   }

//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const img = new Image();
//       img.onload = async () => {
//         let { width, height } = img;

//         // 🔹 Start with target max dimensions
//         let scale = 1;
//         let pngFile: File | null = null;

//         // Loop: reduce size step by step if too large
//         while (true) {
//           const targetWidth = Math.round(width * scale);
//           const targetHeight = Math.round(height * scale);

//           const canvas = document.createElement("canvas");
//           canvas.width = targetWidth;
//           canvas.height = targetHeight;

//           const ctx = canvas.getContext("2d");
//           if (!ctx) return reject("Canvas not supported");

//           ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

//           const blob: Blob | null = await new Promise((res) =>
//             canvas.toBlob((b) => res(b), "image/png")
//           );

//           if (!blob) return reject("Failed to create PNG");

//           pngFile = new File(
//             [blob],
//             workingFile.name.replace(/\.\w+$/, ".png"),
//             { type: "image/png" }
//           );

//           const sizeKB = pngFile.size / 1024;

//           if (sizeKB <= maxSizeKB || scale <= 0.1) {
//             // ✅ Good enough, or reached minimum scale
//             break;
//           }

//           // 🔹 Reduce further (progressively shrink by 10%)
//           scale *= 0.9;
//         }

//         resolve(pngFile!);
//       };

//       if (e.target?.result) {
//         img.src = e.target.result as string;
//       }
//     };

//     reader.onerror = () => reject("Error reading file");
//     reader.readAsDataURL(workingFile);
//   });
// };
