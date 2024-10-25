window.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.getElementById('imageUpload') as HTMLInputElement;
    const imageElement = document.getElementById('uploadedImage') as HTMLImageElement;
    const canvasElement = document.getElementById('grayscaleImage') as HTMLCanvasElement;
    const buttonElement = document.getElementById('convertGrayscale') as HTMLButtonElement;
    const ctx = canvasElement.getContext('2d');
    let uploadedImageData: ImageData | null = null;
    
    inputElement.addEventListener('input', () => {
        const file = inputElement.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                imageElement.src = reader.result as string;
                imageElement.onload = () => {
                    canvasElement.width = imageElement.width;
                    canvasElement.height = imageElement.height;
                };
            };
            reader.readAsDataURL(file);
        }
    });
    
    buttonElement.addEventListener('click', () => {
        if (!ctx) return;
        
        const width = imageElement.width;
        const height = imageElement.height;
        canvasElement.width = width;
        canvasElement.height = height;

        ctx.drawImage(imageElement, 0, 0, width, height);

        const imageData = ctx.getImageData(0, 0, width, height);
        const imageBytes = imageData.data;

        for (let i = 0; i < imageBytes.length; i += 4) {
            const red = imageBytes[i];
            const green = imageBytes[i + 1];
            const blue = imageBytes[i + 2];
            const value = (red + green + blue) / 3;

            imageBytes[i] = value;
            imageBytes[i + 1] = value;
            imageBytes[i + 2] = value;
        }
        
        ctx.putImageData(imageData, 0, 0);
    });
});
