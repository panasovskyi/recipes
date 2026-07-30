import { uploadCloudinary } from '@/config/cloudinary';

export const imageService = {
  async createImageUrl(buffer: Buffer<ArrayBufferLike>, name: string) {
    const res = uploadCloudinary(buffer, name);

    return res;
  },
};