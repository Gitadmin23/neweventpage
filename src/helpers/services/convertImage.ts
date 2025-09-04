export const convertAndCompressToPng = (
  file: File,
  maxSizeKB = 800,
  maxWidth = 1920,
  maxHeight = 1080
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;

        // Scale down if image is larger than allowed
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return reject("Canvas not supported");

        ctx.drawImage(img, 0, 0, width, height);

        const tryCompress = () =>
          new Promise<File | null>((resolveTry) => {
            canvas.toBlob(
              (blob) => {
                if (!blob) return resolveTry(null);

                if (blob.size / 1024 <= maxSizeKB) {
                  const pngFile = new File(
                    [blob],
                    file.name.replace(/\.\w+$/, ".png"),
                    { type: "image/png" }
                  );
                  resolveTry(pngFile);
                } else {
                  resolveTry(null);
                }
              },
              "image/png"
            );
          });

        (async () => {
          let result = await tryCompress();
          if (result) {
            resolve(result);
          } else {
            reject("Unable to compress image below limit");
          }
        })();
      };

      if (e.target?.result) {
        img.src = e.target.result as string;
      }
    };

    reader.onerror = () => reject("Error reading file");
    reader.readAsDataURL(file);
  });
};
